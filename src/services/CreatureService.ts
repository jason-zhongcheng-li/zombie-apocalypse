import { Zombie } from './../models/Zombie';
import { Coordinate } from '../models/Coordinate';
import { Creature } from './../models/Creature';
import { BaseService } from './BaseService';

export class CreatureService extends BaseService<Creature>{

  // Mark up creatures location in the world
  public markCreaturesMap(locations: number[][]): Map<string, Creature[]> {
    let resultMap: Map<string, Creature[]> = new Map();
    for (const location of locations) {
      resultMap = this.markCreature(location, resultMap);
    }

    return resultMap;
  }

  // Add a creature into creatures array in creaturesMap
  public markCreature(location: number[], creaturesMap: Map<string, Creature[]>): Map<string, Creature[]> {

    const creature = this.init(location);

    const key = this.getKey(location[0], location[1]);

    if (creaturesMap.has(key)) {
      creaturesMap.get(key).push(creature);
    } else {
      const creatures = [creature] as Creature[];
      creaturesMap.set(key, creatures);
    }

    return creaturesMap;
  }

  // override init function in BaseService
  protected init(location: number[]): Creature {

    const coordinate: Coordinate = new Coordinate(location[0], location[1]);

    const creature: Creature = new Zombie(coordinate);

    return creature;
  }
}