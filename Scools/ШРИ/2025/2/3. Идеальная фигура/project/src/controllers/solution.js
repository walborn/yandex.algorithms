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
  }

  becomeMainTab() {
  }
  becomeSecondaryTab() {
  }
  isMain() {
    return false
  }

  updateState(storage) {
  }
}
