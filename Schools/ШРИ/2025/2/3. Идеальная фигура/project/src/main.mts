import "./components/error-display"
import { Renderer } from "./controllers/renderer"
import { ThemeController } from "./controllers/theme-controller"
import { FiguresController } from "./controllers/figures-controller"
import { ShapeType } from "./types/shapes"
import { Storage } from "./storage"
import { ColorController } from "./controllers/color-controller"
import { GameState, SpeechController } from "./controllers/solution"

class Game {
  private gameState: GameState
  private renderer: Renderer
  private themeController: ThemeController
  private figuresController: FiguresController
  private storage: Storage
  private colorController: ColorController

  constructor() {
    this.storage = new Storage()

    this.gameState = new GameState(this.storage)

    this.figuresController = new FiguresController("gameCanvas", this.storage)

    this.colorController = new ColorController(
      this.storage.read("selectedColor"),
      this.storage,
    )

    this.themeController = new ThemeController(this.storage)

    this.renderer = new Renderer("gameCanvas", this.storage)

    this.initialize()

    setInterval(() => {
      this.renderer.render(this.storage.read("shapes"))
      const store = this.storage.getAll()

      this.colorController.setColor(store.selectedColor)
      this.themeController.setTheme(store.selectedTheme)
      this.gameState.updateState(store)
    }, 100)
  }

  private initialize() {
    const DEFAULT_COLOR = "#ff0000"

    new SpeechController(
      this.storage,
      this.figuresController,
      this.themeController,
      this.colorController,
      this.onUnsupported.bind(this),
    )

    document.getElementById("addCircle")?.addEventListener("click", () => {
      const color = this.storage.read("selectedColor")
      this.figuresController.addShape(ShapeType.CIRCLE, color)
    })

    document.getElementById("addSquare")?.addEventListener("click", () => {
      const color = this.storage.read("selectedColor")
      this.figuresController.addShape(ShapeType.SQUARE, color)
    })

    document.getElementById("addRectangle")?.addEventListener("click", () => {
      const color = this.storage.read("selectedColor")
      this.figuresController.addShape(ShapeType.RECTANGLE, color)
    })

    document.getElementById("addTriangle")?.addEventListener("click", () => {
      const color = this.storage.read("selectedColor")
      this.figuresController.addShape(ShapeType.TRIANGLE, color)
    })

    document
      .getElementById("deleteLastShape")
      ?.addEventListener("click", () => {
        this.figuresController.deleteLastShape()
      })

    document.querySelectorAll(".color-button").forEach((button) => {
      button.addEventListener("click", (e) => {
        const color =
          (e.target as HTMLButtonElement).getAttribute("data-color") ??
          DEFAULT_COLOR
        this.storage.write("selectedColor", color);
        (e.target as HTMLButtonElement).classList.add("color-button__selected")
      })
    })

    document.getElementById("becomeMainTab")?.addEventListener("click", () => {
      this.gameState.becomeMainTab()
    })

    document
      .getElementById("becomeSecondaryTab")
      ?.addEventListener("click", () => {
        this.gameState.becomeSecondaryTab()
      })

    setInterval(() => {
      const status = document.getElementById("tabStatus")!
      const deleteLast = document.getElementById("deleteLastShape")!

      if (this.gameState.isMain()) {
        status.textContent = "Main tab"
        deleteLast.classList.remove("control-button-delete__hidden")
      } else {
        status.textContent = "Secondary tab"
        deleteLast.classList.add("control-button-delete__hidden")
      }
    }, 10)
  }

  private onUnsupported(feature: string): void {
    const errorDisplay = document.createElement("error-display")
    errorDisplay.textContent = `Your browser does not support ${feature}`
    document.body.appendChild(errorDisplay)
  }
}

new Game()
