import { ShapeType } from "../types/shapes";
import type {
  Shape,
  Circle,
  Square,
  Rectangle,
  Triangle,
} from "../types/shapes";
import { IStorage } from "../types/storage";

export class FiguresController {
  private canvas: HTMLCanvasElement;
  private storage: IStorage;

  constructor(canvasId: string, storage: IStorage) {
    this.canvas = document.getElementById(canvasId) as HTMLCanvasElement;
    if (!this.canvas) {
      throw new Error(`Canvas element with id '${canvasId}' not found`);
    }
    this.storage = storage;
  }

  public addShape(type: ShapeType, color: string): Shape {
    const getRandomSize = () => Math.floor(Math.random() * (150 - 20 + 1)) + 20;
    const getRandomPosition = (max: number) => Math.floor(Math.random() * max);

    const baseShape = {
      id: crypto.randomUUID(),
      type,
      x: getRandomPosition(this.canvas.width),
      y: getRandomPosition(this.canvas.height),
      color,
      selected: false,
    };

    let newShape: Shape;
    switch (type) {
      case ShapeType.CIRCLE:
        newShape = {
          ...baseShape,
          type: ShapeType.CIRCLE,
          radius: getRandomSize(),
        } satisfies Circle;
        break;
      case ShapeType.SQUARE:
        newShape = {
          ...baseShape,
          type: ShapeType.SQUARE,
          size: getRandomSize(),
        } satisfies Square;
        break;
      case ShapeType.RECTANGLE:
        newShape = {
          ...baseShape,
          type: ShapeType.RECTANGLE,
          width: getRandomSize(),
          height: getRandomSize(),
        } satisfies Rectangle;
        break;
      case ShapeType.TRIANGLE:
        newShape = {
          ...baseShape,
          type: ShapeType.TRIANGLE,
          base: getRandomSize(),
          height: getRandomSize(),
        } satisfies Triangle;
        break;
    }

    this.storage.write("shapes", [
      ...(this.storage.read("shapes") ?? []),
      newShape,
    ]);
    return newShape;
  }

  public deleteLastShape() {
    const shapes = Array.from(this.storage.read("shapes"));

    if (shapes.length > 0) {
      shapes.pop();
      this.storage.write("shapes", shapes);
    }
  }
}
