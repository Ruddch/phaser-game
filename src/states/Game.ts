import * as Phaser from "phaser-ce";
import Megaman from "../sprites/Megaman";
import Mushroom from "../sprites/Mushroom";

interface Game {
    mushroom: any;
}

class Game extends Phaser.State {

  public create() {
    this.game.physics.startSystem(Phaser.Physics.ARCADE);

    this.mushroom = new Mushroom({
      asset: "mushroom",
      game: this,
      x: this.world.centerX,
      y: this.world.centerY,
    });

    this.enemy_1 = new Megaman({
      asset: "enemy",
      game: this,
      x: this.world.centerX - 300,
      y: this.world.centerY,
    });

    this.enemy_2 = new Megaman({
      asset: "enemy",
      game: this,
      x: this.world.centerX + 250,
      y: this.world.centerY - 100,
    });

    this.game.add.existing(this.mushroom);
    this.game.add.existing(this.enemy_1);
    this.game.add.existing(this.enemy_2);

    // Physics
    this.game.physics.arcade.enable(this.mushroom);
    this.mushroom.body.gravity.y = 1000;
    this.mushroom.body.bounce.y = 0.3;
    this.mushroom.body.collideWorldBounds = true;

    this.game.physics.arcade.enable(this.enemy_1);
    this.enemy_1.body.gravity.y = 800;
    this.enemy_1.body.bounce.y = 1;
    this.enemy_1.body.collideWorldBounds = true;

    this.game.physics.arcade.enable(this.enemy_2);
    this.enemy_2.body.gravity.y = 800;
    this.enemy_2.body.bounce.y = 1;
    this.enemy_2.body.collideWorldBounds = true;

    this.cursors = this.game.input.keyboard.createCursorKeys();

    this.mushroom.body.velocity.x = 0;

  }

  public update() {
    if (this.cursors.left.isDown) {
      this.mushroom.body.velocity.x = -250;
    } else if (this.cursors.right.isDown) {
      this.mushroom.body.velocity.x = 250;
    } else {
      this.mushroom.body.velocity.x = 0;
    }

    if (this.cursors.up.isDown) {
      this.mushroom.body.velocity.y = -350;
    }
  }

  public render() {
    if (__DEV__) {
      this.game.debug.spriteInfo(this.mushroom, 32, 32);
    }
  }
}

export default Game;
