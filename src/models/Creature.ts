import { Coordinate } from './Coordinate';


export class Creature {

  constructor(protected coordinate: Coordinate) {
    this.coordinate = coordinate;
  }

  // Getter to return creature's coordinate
  // Note: No setter to update creature's coordinate because creature is not able to move/walk
  public getCoordinate(): Coordinate {
    return this.coordinate;
  }
}