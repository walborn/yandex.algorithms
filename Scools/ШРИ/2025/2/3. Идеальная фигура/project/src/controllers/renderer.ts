import {
  Circle,
  Rectangle,
  Shape,
  ShapeType,
  Square,
  Triangle,
} from "../types/shapes";
import type { IStorage } from "../types/storage";

export class Renderer {
  private canvas: HTMLCanvasElement;
  private ctx: CanvasRenderingContext2D;
  private storage: IStorage;

  constructor(canvasId: string, storage: IStorage) {
    this.canvas = document.getElementById(canvasId) as HTMLCanvasElement;
    if (!this.canvas) {
      throw new Error(`Canvas element with id '${canvasId}' not found`);
    }
    this.ctx = this.canvas.getContext("2d")!;
    this.storage = storage;

    this.setupCanvas();
  }

  private setupCanvas() {
    const resizeCanvas = () => {
      this.canvas.width = window.innerWidth * 0.6;
      this.canvas.height = window.innerHeight * 0.6;

      this.render(this.storage.read("shapes"));
    };

    window.addEventListener("resize", resizeCanvas);
    resizeCanvas();
  }

  public render(shapes: Shape[]) {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

    shapes.forEach((shape) => {
      this.ctx.fillStyle = shape.color;
      this.ctx.strokeStyle =
        this.storage.read("strokeStyle") ?? "rgba(0, 0, 0, 0)";
      this.ctx.lineWidth = 1;

      switch (shape.type) {
        case ShapeType.CIRCLE:
          this.drawCircle(shape);
          break;
        case ShapeType.SQUARE:
          this.drawSquare(shape);
          break;
        case ShapeType.RECTANGLE:
          this.drawRectangle(shape);
          break;
        case ShapeType.TRIANGLE:
          this.drawTriangle(shape);
          break;
      }
    });
  }

  private drawCircle(circle: Circle) {
    this.ctx.beginPath();
    this.ctx.arc(circle.x, circle.y, circle.radius, 0, Math.PI * 2);
    this.ctx.fill();
    this.ctx.stroke();
  }

  private drawSquare(square: Square) {
    this.ctx.beginPath();
    this.ctx.rect(
      square.x - square.size / 2,
      square.y - square.size / 2,
      square.size,
      square.size
    );
    this.ctx.fill();
    this.ctx.stroke();
  }

  private drawRectangle(rectangle: Rectangle) {
    this.ctx.beginPath();
    this.ctx.rect(
      rectangle.x - rectangle.width / 2,
      rectangle.y - rectangle.height / 2,
      rectangle.width,
      rectangle.height
    );
    this.ctx.fill();
    this.ctx.stroke();
  }

  private drawTriangle(triangle: Triangle) {
    this.ctx.beginPath();
    this.ctx.moveTo(triangle.x, triangle.y - triangle.height / 2);
    this.ctx.lineTo(
      triangle.x - triangle.base / 2,
      triangle.y + triangle.height / 2
    );
    this.ctx.lineTo(
      triangle.x + triangle.base / 2,
      triangle.y + triangle.height / 2
    );
    this.ctx.closePath();
    this.ctx.fill();
    this.ctx.stroke();
  }
}
