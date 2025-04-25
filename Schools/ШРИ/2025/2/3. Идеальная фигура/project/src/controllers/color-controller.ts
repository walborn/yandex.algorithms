import { IStorage } from "../types/storage";

export class ColorController {
  private colorButtons: HTMLButtonElement[];
  private storage: IStorage;

  constructor(defaultColor: string, storage: IStorage) {
    this.colorButtons = Array.from(
      document.querySelectorAll(".color-button")
    ) as HTMLButtonElement[];
    this.storage = storage;

    this.setColor(defaultColor);
  }

  public setColor(color: string) {
    this.colorButtons.forEach((button) => {
      const buttonColor = (button as HTMLButtonElement).getAttribute(
        "data-color"
      );

      if (buttonColor === color.toUpperCase()) {
        button.classList.add("color-button__selected");
      } else {
        button.classList.remove("color-button__selected");
      }
    });

    this.storage.write("selectedColor", color);
  }
}
