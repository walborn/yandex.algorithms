import type { IStore, IStorage } from "./types/storage";

export class Storage implements IStorage {
  private store: IStore;
  public read: <T extends keyof IStore>(key: T) => IStore[T];
  public setAll: (store: IStore) => void;
  public getAll: () => IStore;
  public write: <T extends keyof IStore>(key: T, value: IStore[T]) => void;

  constructor() {
    this.store = {
      selectedTheme: "system",
      strokeStyle: "#000000",
      selectedColor: "#ff0000",
      shapes: [],
    };

    this.read = <T extends keyof IStore>(key: T): IStore[T] => {
      return this.store[key];
    };

    this.getAll = (): IStore => {
      return this.store;
    };

    this.write = <T extends keyof IStore>(key: T, value: IStore[T]): void => {
      this.store[key] = value;
    };

    this.setAll = (store: IStore): void => {
      this.store = store;
    };
  }
}
