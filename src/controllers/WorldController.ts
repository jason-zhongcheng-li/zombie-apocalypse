import { LocationValidator } from './../validators/LocationValidator';
import { Coordinate } from './../models/Coordinate';
import { Creature } from './../models/Creature';
import { World } from '../models/World';
import { Zombie } from './../models/Zombie';
import { CreatureService } from './../services/CreatureService';
import { ZombieService } from './../services/ZombieService';
import { Direction } from '../utils/Direction';

export interface WorldWarZResult {
  zombiesScore: number;
  zombiesPositions: any;
}

export class WorldController {

  constructor(
    private zombieService: ZombieService,
    private creatureService: CreatureService,
    private validator: LocationValidator) {
  }

  public initWorld(zombieLocation: number[], creatureLocation: number[][], gridNum: number): World {

    // validate zombie location input, it should be number array with 2 elements only
    this.validator.validateLocation(zombieLocation, gridNum);

    // validate creature location input, it should be 2D number array
    this.validator.validate2DLocation(creatureLocation, gridNum);

    // Zombie awakes
    const zombie = this.zombieService.awake(zombieLocation);

    // Mark up those creatures in the world
    const creaturesMap: Map<string, Creature[]> = this.creatureService.markCreaturesMap(creatureLocation);

    const world: World = new World([zombie], creaturesMap, gridNum);

    return world;
  }

  public worldWarZ(world: World, direction: string): WorldWarZResult {

    // validate direction input and return an array of direction enum
    const directions: Direction[] = this.validator.validateDirectionInput(direction);

    // add an array of zombies after WorlWarZ in the new world
    let newWorld = { ...world, zombiesAfterWar: [] as Zombie[] } as World;

    // Zombies walkingDead and spreading their zombieness
    while (!!newWorld.zombies && newWorld.zombies.length > 0) {
      newWorld = this.zombieService.walkingDead(newWorld, directions, world.gridNum);
    }

    // print position info of zombies in the new world
    const zombiesPositions = newWorld.zombiesAfterWar.map(zombie => {
      return [zombie.getCoordinate().getX(), zombie.getCoordinate().getY()];
    });

    const result = { zombiesScore: zombiesPositions.length - 1, zombiesPositions } as WorldWarZResult;

    return result;
  }
}