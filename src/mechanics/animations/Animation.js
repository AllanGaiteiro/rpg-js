import { AnimationFrame } from "./AnimationFrame.js";
import { animationData } from "./animationData.js";
// animationData.js

export class Animation {
  constructor(sprite) {
    this.sprite = sprite;
    this.frameWidth = sprite.width / 3;
    this.frameHeight = sprite.height / 4;
    this.frameDuration = this.frameWidth; // Tempo padrão para cada quadro
    this.states = {};

    this.addState("walk_up", animationData.walk_up);
    this.addState("stop_up", animationData.stop_up);
    this.addState("walk_down", animationData.walk_down);
    this.addState("stop_down", animationData.stop_down);
    this.addState("walk_left", animationData.walk_left);
    this.addState("stop_left", animationData.stop_left);
    this.addState("walk_right", animationData.walk_right);
    this.addState("stop_right", animationData.stop_right);

    this.currentAnimationName = "stop_down";
    this.currentAnimationState = null;
    this.currentFrame = 0;
    this.animationInterval = 0;
  }

  addState(animationName, frameData) {
    const frames = frameData.map(
      ({ x, y }) =>
        new AnimationFrame(x * this.frameWidth, y * this.frameHeight)
    );
    this.states[animationName] = frames;
  }

  setCurrentAnimation(animationName) {
    if (this.states.hasOwnProperty(animationName)) {
      this.currentAnimationName = animationName;
      this.currentAnimationState = this.states[animationName];
      this.currentFrame = 0;
    } else {
      console.error(`Animation state '${animationName}' not found.`);
    }
  }

  animationMovement(characterMoviment, currentAnimationName) {
    if (currentAnimationName.indexOf("walk") > -1) {
      const animationName = currentAnimationName;

      if (this.currentAnimationName !== animationName) {
        this.setCurrentAnimation(animationName);
      }

      this.animationInterval += characterMoviment;
      if (this.animationInterval >= this.frameDuration) {
        this.animationInterval = 0;
        this.currentFrame =
          (this.currentFrame + 1) % this.currentAnimationState.length;
      }
    } else {
      const animationName = currentAnimationName;
      if (this.currentAnimationName !== animationName) {
        this.setCurrentAnimation(animationName);
      }
    }
  }

  getCurrentFrame() {
    return this.currentAnimationState
      ? this.currentAnimationState[this.currentFrame]
      : animationData.stop_down[0];
  }
}
