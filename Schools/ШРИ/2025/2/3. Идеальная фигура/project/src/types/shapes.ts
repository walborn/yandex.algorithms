export type ShapeType = (typeof ShapeType)[keyof typeof ShapeType];

interface BasicShape {
  id: string;
  type: ShapeType;
  x: number;
  y: number;
  color: string;
}

export const ShapeType = {
  TRIANGLE: "triangle",
  CIRCLE: "circle",
  SQUARE: "square",
  RECTANGLE: "rectangle",
} as const;

export interface Circle extends BasicShape {
  type: typeof ShapeType.CIRCLE;
  radius: number;
}

export interface Rectangle extends BasicShape {
  type: typeof ShapeType.RECTANGLE;
  width: number;
  height: number;
}

export interface Square extends BasicShape {
  type: typeof ShapeType.SQUARE;
  size: number;
}

export interface Triangle extends BasicShape {
  type: typeof ShapeType.TRIANGLE;
  base: number;
  height: number;
}

export type Shape = Circle | Rectangle | Square | Triangle;
