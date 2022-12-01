import './style.css'
import Phaser, {Game} from "phaser";

const windowWidth = window.innerWidth;
const windowHeight = window.innerHeight;
const creatureNames = ["octopus", "transparent", "eel", "isopod", "purple", "squid", "blobfish", "shark", "crab", "angler", "fangtooth", "orb", "green", "yellow", "prawn", "spider", "bulb", "air", "ghost", "viper", "coral", "pincers", "blue", "snake", "antennas", "mollusk", "puffer", "jaw", "worm", "teeth", "normie"];
let player, cursors, enter, title, subtitle, octopus;
let gameStart = false;

var myGame = new Game({
  type: Phaser.AUTO,
  width: windowWidth,
  height: windowHeight,
  physics: {
    default: "arcade",
    arcade: {
      gravity: {y: 0},
      debug: true
    }
  },
  scene: {
    preload: preload,
    create : create,
    update: update,
    addOctopus: addOctopus
  }
})

function hitCreature (creature, player) {
  // stop everything
  this.physics.pause();
}

function addOctopus (scope) {
  // creature sprite
  let game;
  if (scope) {
    game = scope;
  }
  else {
    game = this;
  }
  octopus = game.physics.add.sprite(Phaser.Math.Between(0, windowWidth), Phaser.Math.Between(0, windowHeight), "creatures");

  // can go off-screen
  octopus.setCollideWorldBounds(false);
  // set collision box
  octopus.setSize(30, 30, true);
  const randomVel = Phaser.Math.Between(10, 100);
  octopus.setVelocityY(-randomVel);

  // octopus collides with player
  game.physics.add.collider(octopus, player, hitCreature, null, game);

  game.anims.create({
    key: "octopus",
    frame: 35,
    repeat: -1,
    frames: game.anims.generateFrameNumbers("creatures", {start: 2, end: 3})
  });
}

function preload () {
  // load assets
  this.load.image("bg", "./assets/bg.png");
  this.load.spritesheet("idle", "./assets/player-idle.png", {frameWidth: 80, frameHeight: 80});
  this.load.spritesheet("horizontal", "./assets/player-swimming.png", {frameWidth: 80, frameHeight: 80});
  this.load.spritesheet("vertical", "./assets/player-rush.png", {frameWidth: 80, frameHeight: 80});
  this.load.spritesheet("creatures", "./assets/creatures.png", {frameWidth: 48, frameHeight: 48});

  // arrow keys
  cursors = this.input.keyboard.createCursorKeys();
  // enter key
  enter = this.input.keyboard.addKey("enter");
}

function create () {
  addOctopus(this);

  let timer = this.time.addEvent({
    // every 2 seconds (2000 ms)
    delay: 2000,
    // call this function
    callback: addOctopus,
    callbackScope: this,
    loop: true
  });

  // make bg image fill screen
  const background = this.add.image(windowWidth/2, windowHeight/3.5, "bg");
  background.displayWidth = windowWidth;
  background.scaleY = background.scaleX;

  title = this.add.text(windowWidth/2, windowHeight/2-50, "Deep See", {font: "100px Helvetica"}).setOrigin(0.5);
  subtitle = this.add.text(windowWidth/2, windowHeight/2+50, "Press Enter to start", {font: "50px Helvetica"}).setOrigin(0.5);

  // player sprite
  player = this.physics.add.sprite(windowWidth/2, 100, "idle");
  // first spawn --> face right
  player.flipX = false;
  // can't go off-screen
  player.setCollideWorldBounds(true);
  // set collision box
  player.setSize(40, 40, true);

  // swim up
  this.anims.create({
    key: "up",
    frame: 35,
    repeat: -1,
    frames: this.anims.generateFrameNumbers("vertical", {start: 0, end: 5})
  });

  // swim down
  this.anims.create({
    key: "down",
    frame: 35,
    repeat: -1,
    frames: this.anims.generateFrameNumbers("vertical", {start: 0, end: 5})
  });

  // swim left
  this.anims.create({
    key: "left",
    frame: 35,
    repeat: -1,
    frames: this.anims.generateFrameNumbers("horizontal", {start: 0, end: 5})
  });

  // swim right
  this.anims.create({
    key: "right",
    frame: 35,
    repeat: -1,
    frames: this.anims.generateFrameNumbers("horizontal", {start: 0, end: 5})
  });

  // idle
  this.anims.create({
    key: "idle",
    frameRate: 10,
    repeat: -1,
    frames: this.anims.generateFrameNumbers("idle", {start: 0, end: 4})
  })
}

function update () {
  if (gameStart === false) {
    this.physics.pause();

    if (enter.isDown) {
      gameStart = true;
    }
  }

  // press enter to start game
  if (enter.isDown) {
    gameStart = true;
    title.destroy();
    subtitle.destroy();
    // everything starts moving
    this.physics.resume();
    // constant gravitational acceleration downwards
    player.setVelocityY(20);
  }

  console.log(typeof octopus);
  octopus.anims.play("octopus", true);

  if (cursors.up.isDown) {
    player.setVelocityX(0);
    player.setVelocityY(-20);
    // if facing right and first spawn
    // --> upwards still facing right
    if (player.flipX === false) {
      player.angle = 270;
    }
    else {
      // if facing left -->
      // upwards still facing left
      player.angle = 90;
    }
    player.anims.play("up", true);
  }
  else if (cursors.down.isDown) {
    player.setVelocityX(0);
    player.setVelocityY(20);
    // if facing left & first spawn
    if (player.flipX === true) {
      player.angle = 270;
    }
    else {
      // if facing right
      player.angle = 90;
    }
    player.anims.play("down", true);
  }
  else if (cursors.left.isDown) {
    player.setVelocityX(-20);
    player.setVelocityY(0);
    // face left
    player.flipX = true;
    player.angle = 0;
    player.anims.play("left", true);
  }
  else if (cursors.right.isDown) {
    player.setVelocityX(20);
    player.setVelocityY(0);
    player.flipX = false;
    player.angle = 0;
    player.anims.play("right", true);
  }
  else { // stay idle
    player.flipY = false;
    player.angle = 0;
    player.anims.play("idle", true);
  }
}
