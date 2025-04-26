export class SpeechController {
  constructor(
    storage,
    figuresController,
    themeController,
    colorController,
    onUnsupported,
  ) {
    this.control = document.getElementById("speech")

    if (!this.control) {
      throw new Error("Speech control button not found")
    }

    this.initializeSpeechRecognition()
  }

  initializeSpeechRecognition() {
    if (
      !("SpeechRecognition" in window || "webkitSpeechRecognition" in window) ||
      !("SpeechGrammarList" in window || "webkitSpeechGrammarList" in window)
    ) {
      this.onUnsupported("SpeechRecognition")
      return
    }

    this.control.addEventListener("click", () => {
      if (this.isListening) {
        this.isListening = false
        this.control.classList.remove("control-button-speech__enabled")
      } else {
        this.isListening = true
        this.control.classList.add("control-button-speech__enabled")
      }
    })
  }
}

export class GameState {
  constructor(storage) {
    this.storage = storage
    this.snapshot = JSON.stringify(storage)
    this.channel = new BroadcastChannel('game_channel')
    this.tabId = Date.now() + Math.random()
    this.main = false
    this.activeTabs = new Set()
    this.broadcast('ping')

    // Обработка закрытия вкладки
    window.addEventListener('beforeunload', this.handleBeforeUnload)

    // Слушаем сообщения из соседних вкладок
    this.channel.onmessage = this.listen
  }

  handleBeforeUnload = () => {
    this.broadcast('destroy')
    // window.removeEventListener('beforeunload', this.onBeforeUnload);
    // clearInterval(this.pingInterval)
    // this.channel.close()
  }

  broadcast = (type, params) => {
    const that = { tabId: this.tabId, main: this.main }
    this.channel.postMessage({ type, that, ...params })
  }

  becomeMainTab = () => {
    if (this.main) return

    this.main = true
    this.broadcast('request::main')
  }

  becomeSecondaryTab = () => {
    if (!this.main) return

    this.main = false
    this.broadcast('request::secondary')
  }

  isMain = () => {
    return this.main
  }

  updateState = (storage) => {
    this.storage = storage
    if (this.snapshot === JSON.stringify(storage)) return
    this.snapshot = JSON.stringify(storage)
    this.broadcast('update::state', { storage })
  }

  listen = (event) => {
    const { type, that } = event.data

    if (that.tabId === this.tabId) return

    if (type === 'update::state') {
      for (const [key, value] of Object.entries(event.data.storage)) {
        this.storage[key] = value
      }
      this.snapshot = JSON.stringify(this.storage)

      // const { storage } = event.data
      // for (const key in storage) this.storage[key] = storage[key]
      return
    }
    if (type === 'destroy') {
      this.activeTabs.delete(that.tabId)
      // выборы производим только если закрыли мастера
      return that.main && this.election(that)
    }

    // в любом случае, если у нас пришло событие от другой вкладки
    // добавляем ее в список
    // возможно, что только при ping и status
    if (type === 'ping' || type === 'status')
      this.activeTabs.add(that.tabId)

    if (type === 'ping') return this.broadcast('status')

    if (type === 'status') {
      if (this.main && that.main && this.tabId > that.tabId) {
        // Если вдруг два мастера, то оставляем вкладку с меньшим id        this.main = false
        this.main = false
        this.becomeMainTab()
      }
      return
    }

    // Если другая вкладка запрашивает статус главной
    if (type === 'request::main') {
      return this.main = false
    }

    if (type === 'request::secondary') {
      this.election(that)
      return
    }
  }

  election = (that) => {
    console.log('election')
    // Главная вкладка закрылась, начинаем выбор новой
    this.main = false

    // Пингуем всех
    this.broadcast('ping')

    // Ждём 200 мс, чтобы собрать ответы от других вкладок
    setTimeout(() => {
      // Если текущая вкладка имеет наименьший tabId среди активных
      const minTabId = Math.min(...this.activeTabs)
      for (let tabId of this.activeTabs) {
        if (tabId !== that.tabId && tabId < this.tabId) return
      }
      console.log(this.tabId, 'become main')
      this.becomeMainTab()
    }, 200)
  }
}
