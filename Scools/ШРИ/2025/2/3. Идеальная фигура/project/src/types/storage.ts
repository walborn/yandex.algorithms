import type { Theme } from "./theme";
import type { Shape } from "./shapes";

export interface IStore {
  selectedColor: string;
  selectedTheme: Theme;
  strokeStyle: string;
  shapes: Shape[];
}

export interface IStorage {
  read<T extends keyof IStore>(key: T): IStore[T];
  setAll: (store: IStore) => void;
  getAll: () => IStore;
  write<T extends keyof IStore>(key: T, value: IStore[T]): void;
}
