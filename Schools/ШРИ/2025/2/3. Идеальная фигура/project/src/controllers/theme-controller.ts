import type { IStorage } from "../types/storage";
import type { Theme } from "../types/theme";

export class ThemeController {
  private mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
  private control: HTMLSelectElement;

  constructor(private storage: IStorage) {
    this.control = document.getElementById("themeSelect") as HTMLSelectElement;

    this.control.value = this.storage.read("selectedTheme") ?? "system";

    this.control.addEventListener("change", () => {
      this.setTheme(this.control.value as Theme);
    });

    this.mediaQuery.addEventListener("change", (event) => {
      this.control.value = this.storage.read("selectedTheme") ?? "system";
      this.applyTheme(event.matches ? "dark" : "light");
    });

    this.applyTheme(this.control.value as Theme);
  }

  public setTheme(theme: Theme): void {
    this.control.value = theme;
    this.storage.write("selectedTheme", theme);
    this.storage.write("strokeStyle", theme === "dark" ? "#ffffff" : "#000000");
    this.applyTheme(theme);
  }

  private applyTheme(theme: Theme): void {
    const newTheme =
      theme === "system" ? (this.mediaQuery.matches ? "dark" : "light") : theme;

    document.documentElement.setAttribute("data-theme", newTheme);
    this.storage.write(
      "strokeStyle",
      newTheme === "dark" ? "#ffffff" : "#000000"
    );
  }
}
