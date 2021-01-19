import { World } from './../models/World';
import { Direction } from './../utils/Direction';
import { BaseService } from './BaseService';
import { Coordinate } from './../models/Coordinate';
import { Zombie } from './../models/Zombie';

export class ZombieService extends BaseService<Zombie> {

  public awake(location: number[] = []): Zombie {
    return this.init(location);
  }

  public walkingDead(world: World, directions: Direction[], gridNum: number): World {

    const zombie = world.zombies.shift();

    for (const direction of directions) {

      // Zombie is walking to the next square
      this.walk(zombie, direction, gridNum);

      // Zombie is biting creatures on the same square to spread its zombieness
      this.bite(zombie, world);
    }

    world.zombiesAfterWar.push(zombie);
    return world;
  }

  public bite(zombie: Zombie, world: World) {

    const key = this.getKey(zombie.getCoordinate().getX(), zombie.getCoordinate().getY());

    // check if there is any creature on the same square as zombie walk to
    if (world.creaturesMap.has(key)) {
      for (const creature of world.creaturesMap.get(key)) {

        // the creature is transformed to Zombie
        const newZombie = creature as Zombie;

        // add this new zombie to the end of zombies array in the world
        world.zombies.push(newZombie);
      }
      // All the creatures have been transformed to zombies.
      // No creatures any more on this square
      world.creaturesMap.delete(key);
    }
  }

  public walk(zombie: Zombie, direction: Direction, gridNum: number) {

    let nextX: number = zombie.getCoordinate().getX();
    let nextY: number = zombie.getCoordinate().getY();

    // zombie can not walk out of the range of gridNum X gridNum
    // but it is able to move through the edge of the grid
    switch (direction) {
      case Direction.LEFT:
        nextX = nextX === 0 ? gridNum - 1 : nextX - 1;
        break;
      case Direction.RIGHT:
        nextX = nextX + 1 === gridNum ? 0 : nextX + 1;
        break;
      case Direction.UP:
        nextY = nextY === 0 ? gridNum - 1 : nextY - 1;
        break;
      case Direction.DOWN:
        nextY = nextY + 1 === gridNum ? 0 : nextY + 1;
        break;
    }
    const coordinate: Coordinate = new Coordinate(nextX, nextY);

    // update coordinate property to make Zombie move
    zombie.setCoordinate(coordinate);
  }

  // override init function in BaseService
  protected init(location: number[]): Zombie {
    const coordinate: Coordinate = new Coordinate(location[0], location[1]);

    const zombie: Zombie = new Zombie(coordinate);

    return zombie;
  }
}