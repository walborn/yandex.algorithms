export class SpeechController {
  constructor(
    storage,
    figuresController,
    themeController,
    colorController,
    onUnsupported,
  ) {
    this.control = document.getElementById("speech");

    if (!this.control) {
      throw new Error("Speech control button not found");
    }

    this.initializeSpeechRecognition();
  }

  initializeSpeechRecognition() {
    if (
      !("SpeechRecognition" in window || "webkitSpeechRecognition" in window) ||
      !("SpeechGrammarList" in window || "webkitSpeechGrammarList" in window)
    ) {
      this.onUnsupported("SpeechRecognition");
      return;
    }

    this.control.addEventListener("click", () => {
      if (this.isListening) {
        this.isListening = false;
        this.control.classList.remove("control-button-speech__enabled");
      } else {
        this.isListening = true;
        this.control.classList.add("control-button-speech__enabled");
      }
    });
  }
}

export class GameState {
  constructor(storage) {
    this.storage = storage
    this.channel = new BroadcastChannel('game_channel')
    this.tabId = Math.random().toString(36).slice(2)
    this.isMaster = false
    this.activeTabs = new Set() 
    this.broadcast('ping')

    // Обработка закрытия вкладки
    window.addEventListener('beforeunload', this.handleBeforeUnload)

    // Слушаем сообщения из соседних вкладок
    this.channel.onmessage = this.listen
  }

  handleBeforeUnload = () => {
    this.broadcast('unmount')
  }

  broadcast = (type, data = {}) => {
    const self = { tabId: this.tabId, isMaster: this.isMaster }
    this.channel.postMessage({ type, self, ...data })
  }

  becomeMainTab = () => {
    this.isMaster = true
    this.broadcast('request::master')
  }

  becomeSecondaryTab = () => {
    if (!this.isMaster) return

    this.isMaster = false
    this.broadcast('request::slave')
  }

  isMain = () => {
    return this.isMaster
  }

  updateState = (storage) => {
    this.storage = storage
  }

  listen = (event) => {
    const { type, self: that } = event.data

    if (that.tabId === this.tabId) return

    if (type === 'ping') {
      this.activeTabs.add(that.tabId)
      this.broadcast('status')
      return
    }

    if (type === 'status') {
      this.activeTabs.add(that.tabId)
      if (this.isMaster && that.isMaster) {
        // Вкладка с меньшим tabId остаётся главной
        if (this.tabId > that.tabId) {
          this.isMaster = false
          this.broadcast('status')
        }
      }
      return
    }

    // Если другая вкладка запрашивает статус главной
    if (type === 'request::master' && this.isMaster) {
      this.isMaster = false
      this.broadcast('status')
      return
    }

    if (type === 'unmount') {
      this.activeTabs.delete(that.tabId)
      // выборы производим только если закрыли мастера
      if (!that.isMaster) return

      this.election()
      return
    }

    if (type === 'request::slave' && !this.isMaster) {
      this.election(that)
      return
    }
  }

  election = (that) => {
    console.log('election')
    // Главная вкладка закрылась, начинаем выбор новой
    this.isMaster = false

    // Пингуем всех
    this.broadcast('ping')

    // Ждём 200 мс, чтобы собрать ответы от других вкладок
    setTimeout(() => {
      // Если текущая вкладка имеет наименьший tabId среди активных
      const minTabId = Math.min(...this.activeTabs)
      for (let tabId of this.activeTabs) {
        if (tabId === that.tabId) continue
        if (tabId < this.tabId) return
      }
      console.log(this.tabId, 'become master')
      this.becomeMainTab()
    }, 200)
  }
}
