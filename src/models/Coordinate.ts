export class Coordinate {

  constructor(private x: number = 0, private y: number = 0) {
  }

  // Getters to return x and y values of coordinate
  // Note: No setters to avoid changing location of zombie or creature
  public getX(): number {
    return this.x;
  }

  public getY(): number {
    return this.y;
  }

}