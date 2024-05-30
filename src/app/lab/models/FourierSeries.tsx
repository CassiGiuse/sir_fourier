import Vector from "./Vector";
import { contextWrapper } from "@/utils/Drawable";
import { randomColor } from "@/utils/Colors";

export class FourierSeries {
  private harmonics: Array<Vector>;
  private seriesName: string;
  private seriesColor: string;
  private amp0: number;
  private f0: number;
  private static readonly SERIES_LINE_WIDTH: number = 2;

  constructor(info: {
    numberHarmonics: number;
    initialFrequency?: number;
    initialAmplitude?: number;
    seriesName?: string;
    seriesColor?: string;
  }) {
    this.f0 = info.initialFrequency || 0.005;
    this.amp0 = info.initialAmplitude || 50;
    this.harmonics = [];
    this.seriesColor = info.seriesColor || randomColor();
    this.seriesName = info.seriesName || "quadrata";

    this.generateHarmonics(this.seriesName, info.numberHarmonics);
  }

  public drawSeries(
    ctx: CanvasRenderingContext2D,
    time: number,
    startingPos: { x: number; y: number }
  ): void {
    contextWrapper(
      ctx,
      {
        strokeStyle: this.seriesColor,
        lineWidth: FourierSeries.SERIES_LINE_WIDTH,
      },
      () => {
        if (this.harmonics.length > 0) {
          this.harmonics[0].drawVector(ctx, time, startingPos);
          for (let i = 1; i < this.harmonics.length; i++) {
            this.harmonics[i].drawVector(ctx, time, {
              x: this.harmonics[i - 1].getCurrentPolar().polarX,
              y: this.harmonics[i - 1].getCurrentPolar().polarY,
            });
          }
          this.harmonics[this.harmonics.length - 1]
            .showLinkLine()
            .showSineWave();
        }
      }
    );
  }

  public generateHarmonics(name: string, len: number): void {
    switch (name) {
      case "quadrata":
        for (let i = 0; i < len; i++) {
          const n: number = i * 2 + 1;
          const harmAmp: number = this.amp0 * (4 / (n * Math.PI));
          const tempVector: Vector = new Vector({
            amplitude: harmAmp,
            frequency: this.f0 * n,
            phi: 0,
            vectorColor: this.seriesColor,
            vectorName: `${this.seriesName}_arm${i}`,
          });
          this.harmonics.push(tempVector);
        }
        return;
      default:
        return;
    }
  }

  public setHarmonicsNumber(v: number): void {
    this.harmonics = [];
    this.generateHarmonics(this.seriesName, v);
  }
}
