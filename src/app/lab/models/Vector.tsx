import Colors from "@/utils/Colors";
import { convertBase } from "@/utils/Convertor";
import { contextWrapper } from "@/utils/Drawable";

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
        ctx.beginPath();
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
        ctx.beginPath();

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
        ctx.beginPath();

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
