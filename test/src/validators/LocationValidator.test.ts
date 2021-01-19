import { Direction } from './../../../src/utils/Direction';
import { LocationValidator } from './../../../src/validators/LocationValidator';
import * as assert from 'assert';
import {
  E_COORDINATE_FORMAT,
  E_COORDINATE_OUT_OF_RANGE,
  E_COORDINATE_EMPTY,
  E_DIRECTION_EMPTY,
  E_DIRECTION_NOT_ALLOWED
} from './../../../src/messages/index';

describe('LocationValidator unit tests', async () => {

  let location: number[];
  let _2dLocation: number[][];
  let directionInput: string;
  let gridNum: number;
  let instance: LocationValidator;

  beforeEach(() => {
    gridNum = 4;
    instance = new LocationValidator();
  });

  it('Should validate location', () => {
    location = [];
    try {
      instance.validateLocation(location, gridNum);
    } catch (e) {
      assert.strictEqual(e.message, E_COORDINATE_EMPTY);
    }

    location.push(1);
    try {
      instance.validateLocation(location, gridNum);
    } catch (e) {
      assert.strictEqual(e.message, E_COORDINATE_FORMAT);
    }

    location.push(5);
    try {
      instance.validateLocation(location, gridNum);
    } catch (e) {
      assert.strictEqual(e.message, E_COORDINATE_OUT_OF_RANGE);
    }
  });

  it('Should validate 2D location', () => {
    _2dLocation = [];
    try {
      instance.validate2DLocation(_2dLocation, gridNum);
    } catch (e) {
      assert.strictEqual(e.message, E_COORDINATE_EMPTY);
    }

    _2dLocation.push([]);
    try {
      instance.validate2DLocation(_2dLocation, gridNum);
    } catch (e) {
      assert.strictEqual(e.message, E_COORDINATE_EMPTY);
    }

    _2dLocation[0].push(1);
    try {
      instance.validate2DLocation(_2dLocation, gridNum);
    } catch (e) {
      assert.strictEqual(e.message, E_COORDINATE_FORMAT);
    }

    _2dLocation[0].push(5);
    try {
      instance.validate2DLocation(_2dLocation, gridNum);
    } catch (e) {
      assert.strictEqual(e.message, E_COORDINATE_OUT_OF_RANGE);
    }
  });

  it('Should throw error for empty direction input', () => {
    directionInput = ' ';

    try {
      instance.validateDirectionInput(directionInput);
    } catch (e) {
      assert.strictEqual(e.message, E_DIRECTION_EMPTY);
    }
  });

  it('Should throw error for invalid direction input', () => {
    directionInput = 'DDLM';

    try {
      instance.validateDirectionInput(directionInput);
    } catch (e) {
      assert.strictEqual(e.message, E_DIRECTION_NOT_ALLOWED);
    }
  });

  it('Should return an array of direction enum ', () => {
    directionInput = 'DDLLRRUU';
    const expected = [
      Direction.DOWN, Direction.DOWN,
      Direction.LEFT, Direction.LEFT,
      Direction.RIGHT, Direction.RIGHT,
      Direction.UP, Direction.UP
    ] as Direction[];

    const result = instance.validateDirectionInput(directionInput);

    assert.deepStrictEqual(result, expected);
  });

});