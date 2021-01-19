import * as assert from 'assert';
import { CreatureService } from './../../../src/services/CreatureService';
import { Creature } from '../../../src/models/Creature';


describe('CreatureService unit tests', async () => {

  let creatureLocation: number[][];
  let gridNum: number;
  let creaturesMap: Map<string, Creature[]>;
  let instance: CreatureService;

  beforeEach(async () => {

    // reset values of properties for each test
    creatureLocation = [[0, 1], [1, 2], [3, 2]];
    gridNum = 4;
    creaturesMap = new Map();

    instance = new CreatureService();
  });

  it('Should mark a creature', () => {
    const location = [1, 1] as number[];
    const key = `${location[0]}` + '-' + `${location[1]}`;

    creaturesMap = instance.markCreature(location, creaturesMap);

    assert.strictEqual(creaturesMap.has(key), true, 'should have marked a creature');
  });

  it('Should mark creatures map', () => {
    let resultMap: Map<string, Creature[]> = new Map();
    const key = `${creatureLocation[1][0]}` + '-' + `${creatureLocation[1][1]}`;


    resultMap = instance.markCreaturesMap(creatureLocation);

    assert.strictEqual(resultMap.size, 3);
    assert.strictEqual(resultMap.has(key), true, 'should have creature at location (1,2)');

  });

});