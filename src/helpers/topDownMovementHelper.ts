import { Actor, Engine, Input, vec, Vector } from 'excalibur';
import { Keys } from 'excalibur/dist/Input';

export class TopDownMovementHelper {
  private _pc: Actor;
  private _upKeys: Keys[] = [];
  private _downKeys: Keys[] = [];
  private _leftKeys: Keys[] = [];
  private _rightKeys: Keys[] = [];

  public baseSpeed;

  /**
   *
   * @param pc The player character Actor being controlled
   * @param baseSpeed The base speed in pixels of the PC.
   * @param upKeys Array of Keys that will move the player up
   * @param downKeys Array of Keys that will move the player down
   * @param leftKeys Array of Keys that will move the player left
   * @param rightKeys Array of Keys that will move the player right
   */
  constructor(pc: Actor, baseSpeed: number, upKeys: Keys[], downKeys: Keys[], leftKeys: Keys[], rightKeys: Keys[]) {
    this._pc = pc;
    this.baseSpeed = baseSpeed;

    this._upKeys = upKeys;
    this._downKeys = downKeys;
    this._leftKeys = leftKeys;
    this._rightKeys = rightKeys;
  }

  /**
   *
   * @param engine An Excalibur.js Engine instance
   * @returns The velocity for an actor based on keyboard inputs
   */
  public GetVelocityKeyboard(engine: Engine): Vector {
    let velX: number = 0;
    let velY: number = 0;

    if (
      this._upKeys.some((key) => {
        return engine.input.keyboard.isHeld(key);
      })
    ) {
      velY -= 1;
    }

    if (
      this._downKeys.some((key) => {
        return engine.input.keyboard.isHeld(key);
      })
    ) {
      velY += 1;
    }

    if (
      this._leftKeys.some((key) => {
        return engine.input.keyboard.isHeld(key);
      })
    ) {
      velX -= 1;
    }

    if (
      this._rightKeys.some((key) => {
        return engine.input.keyboard.isHeld(key);
      })
    ) {
      velX += 1;
    }

    const vecMag = Math.sqrt(Math.abs(velX) + Math.abs(velY));

    const adjustedVelY = (velY / vecMag) * this.baseSpeed;
    const adjustedVelX = (velX / vecMag) * this.baseSpeed;

    if (vecMag > 0) {
      return vec(adjustedVelX, adjustedVelY);
    } else {
      return vec(0, 0);
    }
  }
}
