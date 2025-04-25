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
  constructor(storage) {}

  becomeMainTab() {}
  becomeSecondaryTab() {}
  isMain() {
    return false;
  }

  updateState(storage) {}
}

/*
export class GameState {
  constructor(storage) {
    this.storage = storage
    // Создаем Broadcast Channel
    this.channel = new BroadcastChannel('game_channel')
    // Уникальный ID для вкладки (генерируется случайно)
    this.tabId = Math.random().toString(36).slice(2)
    // Текущее состояние вкладки - secondary
    this.isMain = false

    this.broadcast('ping')

    // Инициализация
    this.init()

    // Обработка закрытия вкладки
    window.addEventListener('beforeunload', this.onBeforeUnload)

    // Слушаем сообщения из соседних вкладок
    this.channel.onmessage(this.listen)
  }

  onBeforeUnload() {
    if (this.isMain) this.broadcast('main_is_closed')
  }

  broadcast(type) {
    const tabId = this.tabId
    const isMain = this.isMain
    this.channel.postMessage({ type, tabId, isMain })
  }

  init() {
    // Проверяем, есть ли другие вкладки
    this.broadcast('ping')
  
    // Если через 100 мс нет ответа, текущая вкладка становится лидером
    setTimeout(() => {
      if (!this.isMain) {
        this.isMain = true
        broadcast('status')
      }
    }, 100)
  
    // Периодическая проверка активных вкладок
    setInterval(() => this.broadcast('ping'), 5000)
  }

  becomeMainTab() {
    this.broadcast('request_main')
    this.isMain = true
  }
  becomeSecondaryTab() {
    this.isMain = false
  }
  isMain() {
    return this.isMain
  }

  updateState(storage) {
    this.storage = storage
  }

  listen(event) {
    const { type, tabId: senderId, isMain: senderIsMain } = event.data

    if (type === 'status') {
      // Когда мы главные и другая тоже заявляет, что она главная
      if (this.isMain && senderIsMain && senderId !== this.tabId) {
        // Например, вкладка с меньшим tabId становится лидером
        this.isMain = this.tabId < senderId
      }
    } else if (type === 'request_main') {
      this.isMain = senderId === this.tabId
      broadcast('status')
    } else if (type === 'ping') {
      // Ответ на пинг для проверки активных вкладок
      broadcast('status')
    }
  }
}
*/