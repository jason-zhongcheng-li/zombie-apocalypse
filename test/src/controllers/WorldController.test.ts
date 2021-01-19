import { LocationValidator } from './../../../src/validators/LocationValidator';
import * as assert from 'assert';
import { Zombie } from './../../../src/models/Zombie';
import { ZombieService } from './../../../src/services/ZombieService';
import { WorldController, WorldWarZResult } from './../../../src/controllers/WorldController';
import { Creature } from '../../../src/models/Creature';
import { CreatureService } from '../../../src/services/CreatureService';
import { Direction } from '../../../src/utils/Direction';
import { Coordinate } from '../../../src/models/Coordinate';
import { World } from '../../../src/models/World';

describe('WorldController unit tests', async () => {

  let zombieLocation: number[];
  let creatureLocation: number[][];
  let gridNum: number;
  let directionInput: string;
  let directions: Direction[];
  let creaturesMap: Map<string, Creature[]>;
  let instance: WorldController;
  let zombieService: ZombieService;
  let creatureService: CreatureService;
  let validator: LocationValidator;

  beforeEach(() => {

    // reset values of properties for each test
    zombieLocation = [2, 1];
    creatureLocation = [[0, 1], [1, 2], [3, 1]];
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

    zombieService = Object.create(ZombieService.prototype);
    creatureService = Object.create(CreatureService.prototype);
    validator = Object.create(LocationValidator.prototype);

    instance = new WorldController(zombieService, creatureService, validator);
  });

  it('Should init a world', () => {
    const coordinate = new Coordinate(zombieLocation[0], zombieLocation[1]);
    const zombie = new Zombie(coordinate);

    validator.validateLocation = (location, grid_num) => {
      assert.deepStrictEqual(location, zombieLocation);
      assert.strictEqual(grid_num, gridNum);
    };

    validator.validate2DLocation = (location, grid_num) => {
      assert.deepStrictEqual(location, creatureLocation);
      assert.strictEqual(grid_num, gridNum);
    };

    zombieService.awake = location => {
      assert.deepStrictEqual(location, zombieLocation);
      return zombie;
    };

    creatureService.markCreaturesMap = location => {
      assert.deepStrictEqual(location, creatureLocation);
      return creaturesMap;
    };

    const result = instance.initWorld(zombieLocation, creatureLocation, gridNum);

    assert.strictEqual(result.zombies.length, 1, 'there is initially 1 zombie ');
    assert.deepStrictEqual(result.zombies[0], zombie, 'should be a zombie');
  });

  it('Should worldWarZ', () => {

    const expected = {
      zombiesScore: 3,
      zombiesPositions: [[3, 0], [2, 1], [1, 0], [0, 0]]
    } as WorldWarZResult;

    const coordinate = new Coordinate(zombieLocation[0], zombieLocation[1]);
    const zombie = new Zombie(coordinate);
    const world = { zombies: [zombie], creaturesMap, gridNum } as World;

    validator.validateDirectionInput = input => {

      assert.strictEqual(directionInput, input, 'should be direction input');

      return directions;
    };

    const result = instance.worldWarZ(world, directionInput);

    console.log(result);

    assert.deepStrictEqual(result, expected);

  });

});