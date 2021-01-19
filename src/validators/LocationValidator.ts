import {
  E_COORDINATE_EMPTY,
  E_COORDINATE_FORMAT,
  E_COORDINATE_OUT_OF_RANGE,
  E_DIRECTION_EMPTY,
  E_DIRECTION_NOT_ALLOWED
} from '../messages';
import { Direction } from '../utils/Direction';

export class LocationValidator {

  // validate location along with the range of grid
  // gridNum is optional so we can validate location only
  public validateLocation = (location: number[], gridNum?: number) => {
    if (!location || location.length === 0) {
      throw new Error(E_COORDINATE_EMPTY);
    }

    if (location && location.length !== 2) {
      throw new Error(E_COORDINATE_FORMAT);
    }

    if (!!gridNum) {
      for (const entry of location) {
        if (entry < 0 || entry >= gridNum) {
          throw new Error(E_COORDINATE_OUT_OF_RANGE);
        }
      }
    }
  }

  // validate 2D location along with the range of grid
  // gridNum is optional so we can validate 2D location only
  public validate2DLocation = (locations: number[][], gridNum?: number) => {
    if (!locations || locations.length === 0) {
      throw new Error(E_COORDINATE_EMPTY);
    }

    for (const location of locations) {
      this.validateLocation(location, gridNum);
    }
  }

  // validate directions input and return array of direction enum
  public validateDirectionInput = (directions: string): Direction[] => {
    const result: Direction[] = [];

    if (!directions || directions.trim().length === 0) {
      throw new Error(E_DIRECTION_EMPTY);
    }

    for (const direction of directions.trim()) {
      try {
        const d = direction.toUpperCase() as Direction;
        result.push(d);
      } catch {
        throw new Error(E_DIRECTION_NOT_ALLOWED);
      }
    }

    return result;
  }

}