import Colors from "@/utils/Colors";
import { convertBase } from "@/utils/Convertor";
import { contextWrapper } from "@/utils/Drawable";
import chroma from "chroma-js";

interface VectorProperties {
  amplitude: number;
  frequency: number;
  phi: number;
  vectorColor?: string;
  vectorName?: string;
}

interface VectorPolarCoordinates {
  polarX: number;
  polarY: number;
}

class Vector {
  // ATTRIBUTES
  private amp: number;
  private fq: number;
  private phi: number;
  private vectorName: string;
  private vectorColor: string;
  private currentPolar: VectorPolarCoordinates;
  private ctx: CanvasRenderingContext2D | null;
  private latestYCoordinates: Array<number>;

  private static globalVectorCounter: number = 0;
  private static readonly VECTOR_LINE_WIDTH: number = 2;
  private static readonly LINK_WIDTH: number = 1;

  constructor(
    vectorProp: VectorProperties = {
      amplitude: 50,
      frequency: 0.005,
      phi: 0,
    }
  ) {
    // Must have
    this.amp = vectorProp.amplitude;
    this.fq = vectorProp.frequency;
    this.phi = (vectorProp.phi * Math.PI) / 180;
    this.currentPolar = { polarX: 0, polarY: 0 };
    this.latestYCoordinates = [];
    this.ctx = null;

    // Optionals
    this.vectorName = vectorProp.vectorName || `V${Vector.globalVectorCounter}`;
    this.vectorColor = vectorProp.vectorColor || Colors.randomColor();

    Vector.globalVectorCounter++;
  }

  // METHODS

  public drawVector(
    ctx: CanvasRenderingContext2D,
    time: number,
    vectorPosition: {
      x: number;
      y: number;
    }
  ): Vector {
    this.ctx = ctx;

    const vectorPhase = this.fq * 2 * Math.PI * time + this.phi;
    const polarX = this.amp * Math.cos(vectorPhase);
    const polarY = this.amp * Math.sin(vectorPhase);

    contextWrapper(
      this.ctx,
      {
        strokeStyle: this.vectorColor,
        lineWidth: Vector.VECTOR_LINE_WIDTH,
      },
      () => {
        ctx.moveTo(vectorPosition.x, vectorPosition.y);
        ctx.lineTo(polarX + vectorPosition.x, polarY + vectorPosition.y);
      }
    );

    this.currentPolar = {
      polarX: polarX + vectorPosition.x,
      polarY: polarY + vectorPosition.y,
    };

    this.latestYCoordinates.push(this.currentPolar.polarY);

    // Permette il chaining dei metodi
    return this;
  }

  public showSupportLine(len: number, ctx: CanvasRenderingContext2D): void {
    contextWrapper(
      ctx,
      {
        lineWidth: 1,
        strokeStyle: chroma("white").hex(),
      },
      () => {
        ctx.moveTo(ctx.canvas.width / 4 - len / 2, ctx.canvas.height / 2);
        ctx.lineTo(ctx.canvas.width / 4 + len / 2, ctx.canvas.height / 2);
      }
    );
  }

  public showLinkLine(): Vector {
    if (this.ctx === null) {
      throw new Error(
        "linkLineToOrdinateAxis() method called before drawVector(). Make sure to draw the vector before linking lines."
      );
    }

    contextWrapper(
      this.ctx,
      {
        strokeStyle: this.vectorColor + convertBase(50, 16),
        lineWidth: Vector.LINK_WIDTH,
      },
      (ctx: CanvasRenderingContext2D) => {
        ctx.moveTo(this.currentPolar.polarX, this.currentPolar.polarY);
        ctx.lineTo(ctx.canvas.width / 2, this.currentPolar.polarY);
      }
    );

    return this;
  }

  public showSineWave(): void {
    if (this.ctx === null) {
      throw new Error(
        "drawSineWave() method called before drawVector(). Make sure to draw the vector before drawing the resulting sine wave."
      );
    }

    contextWrapper(
      this.ctx,
      {
        strokeStyle: this.vectorColor,
        lineWidth: Vector.VECTOR_LINE_WIDTH,
      },
      (ctx: CanvasRenderingContext2D) => {
        for (let x = 0; x < this.latestYCoordinates.length; x++) {
          ctx.lineTo(
            ctx.canvas.width / 2 + x,
            this.latestYCoordinates[this.latestYCoordinates.length - x]
          );
        }
        if (this.latestYCoordinates.length > ctx.canvas.width) {
          this.latestYCoordinates.splice(0, ctx.canvas.width / 2);
        }
      }
    );
  }

  public drawSineWave(
    ctx: CanvasRenderingContext2D,
    time: number,
    startPosition: {
      x: number;
      y: number;
    } = {
      x: 0,
      y: 0,
    }
  ): void {
    contextWrapper(
      ctx,
      {
        lineWidth: Vector.VECTOR_LINE_WIDTH,
        strokeStyle: this.vectorColor,
      },
      () => {
        for (let x = 0; x < ctx.canvas.width; x++) {
          const vectorPhase = this.fq * 2 * Math.PI * (x + time) + this.phi;
          const polarY = this.amp * Math.sin(vectorPhase);
          ctx.lineTo(startPosition.x + x, startPosition.y + polarY);
        }
      }
    );
  }

  public static drawAxxes(ctx: CanvasRenderingContext2D): void {
    const canvasWidth = ctx.canvas.width;
    const canvasHeight = ctx.canvas.height;

    contextWrapper(
      ctx,
      {
        lineWidth: 1,
        strokeStyle: chroma("white").hex() + convertBase(50, 16),
      },
      () => {
        ctx.moveTo(canvasWidth / 2, 0);
        ctx.lineTo(canvasWidth / 2, canvasHeight);

        ctx.moveTo(0, canvasHeight / 2);
        ctx.lineTo(canvasWidth, canvasHeight / 2);
      }
    );
  }

  // GETTERS

  public getVectorInfo(): VectorProperties {
    return {
      amplitude: this.amp,
      frequency: this.fq,
      phi: this.phi,
      vectorColor: this.vectorColor,
      vectorName: this.vectorName,
    };
  }

  public getAmplitude(): number {
    return this.amp;
  }

  public getFrequency(): number {
    return this.fq;
  }

  public getInitialPhase(): number {
    return this.phi;
  }

  public getVectorColor(): string {
    return this.vectorColor;
  }

  public getVectorName(): string {
    return this.vectorName;
  }

  // SETTERS

  public setVectorName(name: string): void {
    this.vectorName = name;
  }

  public setVectorColor(color: string): void {
    this.vectorColor = color;
  }

  public toString(): string {
    return `+---- ${this.vectorName} -----\n| Colore: ${this.vectorColor};\n| Formula: y(t) = ${this.amp} * sin(${this.fq} * 2 * 3.14 * t + ${this.phi})\n+-----------------------------`;
  }

  public static vectorFormula(): string {
    return `y(t) = amp * sin(2πf * t + φ)`;
  }
}

export default Vector;
