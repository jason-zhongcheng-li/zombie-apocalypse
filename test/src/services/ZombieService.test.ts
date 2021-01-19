import * as assert from 'assert';
import { World } from './../../../src/models/World';
import { Creature } from './../../../src/models/Creature';
import { Coordinate } from './../../../src/models/Coordinate';
import { ZombieService } from './../../../src/services/ZombieService';
import { Zombie } from '../../../src/models/Zombie';
import { Direction } from '../../../src/utils/Direction';


describe('ZombieService unit tests', async () => {

  let zombieLocation: number[];
  let creatureLocation: number[][];
  let gridNum: number;
  let directionInput: string;
  let directions: Direction[];
  let creaturesMap: Map<string, Creature[]>;
  let instance: ZombieService;

  beforeEach(async () => {
    // Initialize properties in the World for every single test
    zombieLocation = [2, 1];
    creatureLocation = [[0, 1], [1, 2], [3, 2]];
    directionInput = 'DLUURR';
    gridNum = 4;
    directions = [];
    creaturesMap = new Map();

    for (const location of creatureLocation) {
      const key = `${location[0]}` + '-' + `${location[1]}`;
      const coordinate = new Coordinate(location[0], location[1]);
      const creature = new Zombie(coordinate) as Creature;
      const creatures = [creature] as Creature[];
      creaturesMap.set(key, creatures);
    }

    for (let i = 0; i < directionInput.length; i++) {
      const direction = directionInput.charAt(i) as Direction;
      directions.push(direction);
    }

    instance = new ZombieService();
  });

  it('Should awake a zombie', () => {
    const expect = new Coordinate(zombieLocation[0], zombieLocation[1]);
    const result = instance.awake(zombieLocation);

    assert.deepStrictEqual(result.getCoordinate(), expect, 'should be correct coordinate');
  });

  it('Should walkingDead', () => {
    const coordinate = new Coordinate(zombieLocation[0], zombieLocation[1]);
    const zombie = new Zombie(coordinate);
    const world = { zombies: [zombie], creaturesMap, gridNum } as World;

    const expected = new Coordinate(3, 0);

    let newWorld = { ...world, zombiesAfterWar: [] as Zombie[] } as World;

    newWorld = instance.walkingDead(newWorld, directions, gridNum);

    assert.deepStrictEqual(newWorld.zombiesAfterWar.length === 1, true, 'should have a zombie after walking');
    assert.deepStrictEqual(newWorld.zombiesAfterWar[0].getCoordinate(), expected, 'should be expected coordinate after walking');

  });

  it('Should bite', () => {
    const coordinate = new Coordinate(1, 2);
    const zombie = new Zombie(coordinate);
    const world = { zombies: [zombie], creaturesMap, gridNum } as World;

    const key = `${coordinate.getX()}` + '-' + `${coordinate.getY()}`;

    assert.deepStrictEqual(world.creaturesMap.has(key), true, 'there are creatures before zombie`s biting');

    instance.bite(zombie, world);

    assert.deepStrictEqual(world.creaturesMap.has(key), false, 'there is no creature at this location');
  });

  it('Should walking', () => {
    const coordinate = new Coordinate(1, 2);
    const zombie = new Zombie(coordinate);

    let direction = Direction.LEFT;
    instance.walk(zombie, direction, gridNum);

    assert.deepStrictEqual(zombie.getCoordinate().getX(), 0);
    assert.deepStrictEqual(zombie.getCoordinate().getY(), 2);

    direction = Direction.UP;
    instance.walk(zombie, direction, gridNum);

    assert.deepStrictEqual(zombie.getCoordinate().getX(), 0);
    assert.deepStrictEqual(zombie.getCoordinate().getY(), 1);

    direction = Direction.RIGHT;
    instance.walk(zombie, direction, gridNum);

    assert.deepStrictEqual(zombie.getCoordinate().getX(), 1);
    assert.deepStrictEqual(zombie.getCoordinate().getY(), 1);

    direction = Direction.DOWN;
    instance.walk(zombie, direction, gridNum);

    assert.deepStrictEqual(zombie.getCoordinate().getX(), 1);
    assert.deepStrictEqual(zombie.getCoordinate().getY(), 2);

  });


});