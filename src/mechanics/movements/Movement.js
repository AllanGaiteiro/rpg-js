export class Movement {
  constructor(character) {
    this.character = character;
    this.pauseDuration = 1000; // Tempo de pausa em milissegundos (1 segundo)
    this.waiting = false; // Se o character está atualmente em pausa
    this.waitingStartTime = null; // Hora de início da pausa
    this.lastDirection = "down"; // Última direção de movimento padrão
  }

  move() {
    if (this.waiting) {
      this.handleWaiting();
    } else if (this.character.waypoints.length > 0) {
      this.handleMovingToWaypoint();
    }
  }

  moveWithInput(movementVector) {
    this.character.lastX = this.character.x;
    this.character.lastY = this.character.y;
    const [dx, dy, direction] = movementVector;
    if (dx !== 0 || dy !== 0) {
      const movementX = Math.abs(dx || 0);
      const movementY = Math.abs(dy || 0);
      const movement = Math.max(movementX, movementY);
      this.character.animation.animationMovement(movement, "walk_" + direction);
    } else {
      this.character.animation.animationMovement(
        this.character.speed,
        "stop_" + direction
      );
    }

    this.character.x += dx;
    this.character.y += dy;
  }

  calculateDirection(dx, dy) {
    if (Math.abs(dx) > Math.abs(dy)) {
      return dx > 0 ? "right" : "left";
    } else {
      return dy > 0 ? "down" : "up";
    }
  }

  setLastDirection(direction) {
    this.lastDirection = direction;
  }

  getLastDirection() {
    return this.lastDirection;
  }

  handleWaiting() {
    if (Date.now() - this.waitingStartTime >= this.pauseDuration) {
      this.waiting = false;
      this.waitingStartTime = null;
      this.moveToNextWaypoint();
    }
  }

  handleMovingToWaypoint() {
    const target = this.character.waypoints[0];
    const dx = target.x - this.character.x;
    const dy = target.y - this.character.y;
    const distance = Math.sqrt(dx * dx + dy * dy);

    if (distance < this.character.speed) {
      this.handleReachedWaypoint();
    } else {
      this.handleMoving(dx, dy);
    }
  }

  handleReachedWaypoint() {
    this.waiting = true;
    this.waitingStartTime = Date.now();
    const lastDirection = this.getLastDirection();
    this.character.animation.animationMovement(
      this.character.speed,
      `stop_${lastDirection}`
    );
  }

  handleMoving(dx, dy) {
    const angle = Math.atan2(dy, dx);
    const vx = Math.cos(angle) * this.character.speed;
    const vy = Math.sin(angle) * this.character.speed;
    this.character.x += vx;
    this.character.y += vy;
    const direction = this.calculateDirection(dx, dy);
    this.setLastDirection(direction);
    this.character.animation.animationMovement(
      this.character.speed,
      `walk_${direction}`
    );
  }

  moveToNextWaypoint() {
    if (this.character.waypoints.length > 0) {
      this.character.waypoints.push(this.character.waypoints.shift());
      if (this.character.waypoints.length > 0) {
        const nextWaypoint = this.character.waypoints[0];
        this.moveTowards(nextWaypoint.x, nextWaypoint.y);
      }
    }
  }

  moveTowards(targetX, targetY) {
    const dx = targetX - this.character.x;
    const dy = targetY - this.character.y;
    const distance = Math.sqrt(dx * dx + dy * dy);

    if (distance < this.character.speed) {
      this.character.x = targetX;
      this.character.y = targetY;
    } else {
      const angle = Math.atan2(dy, dx);
      const vx = Math.cos(angle) * this.character.speed;
      const vy = Math.sin(angle) * this.character.speed;
      this.character.x += vx;
      this.character.y += vy;
    }
  }

  stop() {
    this.character.isInteracting = false;
  }

  moveBackToPreviousWaypoint() {
    if (this.character.waypoints.length > 1) {
      const previousWaypoint = this.character.waypoints.shift();
      this.moveTowards(previousWaypoint.x, previousWaypoint.y);
    }
  }

  lookAt(target) {
    const dx = target.x - this.character.x;
    const dy = target.y - this.character.y;
    const direction = this.calculateDirection(dx, dy);
    this.character.animation.animationMovement(this.speed, `stop_${direction}`);
  }
}
