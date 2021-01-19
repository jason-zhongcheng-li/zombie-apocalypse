import { Coordinate } from './Coordinate';
import { Creature } from './Creature';
import { Zombie } from './Zombie';

export class World {

  constructor(public zombies: Zombie[],
    public creaturesMap: Map<string, Creature[]>,
    public gridNum: number,
    public zombiesAfterWar?: Zombie[]) {
  }

}

