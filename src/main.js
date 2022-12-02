import './style.css'
import Phaser, {Game} from "phaser";

const windowWidth = window.innerWidth;
const windowHeight = window.innerHeight;
const creatureNames = ["octopus", "transparent", "eel", "isopod", "purple", "squid", "blobfish", "shark", "crab", "angler", "fangtooth", "orb", "green", "yellow", "prawn", "spider", "bulb", "air", "ghost", "viper", "coral", "pincers", "blue", "snake", "antennas", "mollusk", "puffer", "jaw", "worm", "teeth", "normie"];

let background, player, cursors, enter, title, subtitle, instruction, octopus, squid, blobfish, shark, worm, puffer, crab, timer, creatureGroup, bugCreatureGroup, prevYPos, torch, overTitle, overSubtitle;
let gameStart = false;
let tint = 1;

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
    addCreature: addCreature,
    dim: dim,
    brighten: brighten,
    illuminate: illuminate
  }
})

function hitCreature (creature, player) {
  // stop everything
  this.physics.pause();
  timer.remove();
  overTitle = this.add.text(windowWidth/2, windowHeight/2-50, "Game Over", {font: "100px Helvetica"}).setOrigin(0.5);
  overSubtitle = this.add.text(windowWidth/2, windowHeight/2+50, "Refresh page to start again", {font: "50px Helvetica"}).setOrigin(0.5);
}

function illuminate () {
  console.log("inside illuminate function");
  creatureGroup.setAlpha(0);
}

function dim () {
  // 0 is darkest, 1 is lightest
  tint -= 0.0001;
  background.setAlpha(tint);
  // make creatures dark asw
  octopus.setAlpha(tint);
  squid.setAlpha(tint);
  blobfish.setAlpha(tint);
  shark.setAlpha(tint);
  worm.setAlpha(tint);
  puffer.setAlpha(tint);
  crab.setAlpha(tint);
}

function brighten () {
  // 0 is darkest, 1 is lightest
  tint += 0.0001;
  background.setAlpha(tint);
  // make creatures bright asw
  octopus.setAlpha(tint);
  squid.setAlpha(tint);
  blobfish.setAlpha(tint);
  shark.setAlpha(tint);
  worm.setAlpha(tint);
  puffer.setAlpha(tint);
  crab.setAlpha(tint);
}

function addCreature (scope) {
  // creature sprite
  let game;
  if (scope) {
    game = scope;
  }
  else {
    game = this;
  }

  creatureGroup = game.physics.add.group({
    // can go off-screen
    collideWorldBounds: false,
    // set collision box
    //setSize: {width: 5, height: 5, center: true},
  });

  octopus = game.physics.add.sprite(Phaser.Math.Between(0, windowWidth), windowHeight, "creatures");
  squid = game.physics.add.sprite(Phaser.Math.Between(0, windowWidth), windowHeight, "creatures");
  blobfish = game.physics.add.sprite(Phaser.Math.Between(0, windowWidth), windowHeight, "creatures");
  shark = game.physics.add.sprite(Phaser.Math.Between(0, windowWidth), windowHeight, "creatures");
  worm = game.physics.add.sprite(Phaser.Math.Between(0, windowWidth), windowHeight, "creatures");
  puffer = game.physics.add.sprite(Phaser.Math.Between(0, windowWidth), windowHeight, "creatures");
  crab = game.physics.add.sprite(Phaser.Math.Between(0, windowWidth), windowHeight, "creatures");

  creatureGroup.add(octopus);
  creatureGroup.add(squid);
  creatureGroup.add(blobfish);
  creatureGroup.add(shark);
  creatureGroup.add(worm);
  creatureGroup.add(puffer);
  creatureGroup.add(crab);

  creatureGroup.setSize(5, 5, true);

  game.physics.add.overlap(torch, creatureGroup, illuminate, null, this);

  let randomVel = Phaser.Math.Between(10, 100);
  octopus.setVelocityY(-randomVel);
  randomVel = Phaser.Math.Between(10, 100);
  squid.setVelocityY(-randomVel);
  randomVel = Phaser.Math.Between(10, 100);
  blobfish.setVelocityY(-randomVel);
  randomVel = Phaser.Math.Between(10, 100);
  shark.setVelocityY(-randomVel);
  randomVel = Phaser.Math.Between(10, 100);
  worm.setVelocityY(-randomVel);
  randomVel = Phaser.Math.Between(10, 100);
  puffer.setVelocityY(-randomVel);
  randomVel = Phaser.Math.Between(10, 100);
  crab.setVelocityY(-randomVel);

  // creature collides with player
  game.physics.add.collider(creatureGroup, player, hitCreature, null, game);
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
  const creatureNames = [
    "octopus", "transparent", "eel", "isopod", "purple", "squid", "blobfish", "shark", "crab", "angler", "fangtooth", "orb", "green", "yellow", "prawn", "spider", "bulb", "air", "ghost", "viper", "coral", "pincers", "blue", "snake", "antennas", "mollusk", "puffer", "jaw", "worm", "teeth", "normie"
  ];

  octopus = this.physics.add.sprite(0, 0, "creatures");
  squid = this.physics.add.sprite(0, 0, "creatures");
  blobfish = this.physics.add.sprite(0, 0, "creatures");
  shark = this.physics.add.sprite(0, 0, "creatures");
  worm = this.physics.add.sprite(0, 0, "creatures");
  puffer = this.physics.add.sprite(0, 0, "creatures");
  crab = this.physics.add.sprite(0, 0, "creatures");

  bugCreatureGroup = this.physics.add.group({
    // can go off-screen
    collideWorldBounds: false
  });

  bugCreatureGroup.add(octopus);
  bugCreatureGroup.add(squid);
  bugCreatureGroup.add(blobfish);
  bugCreatureGroup.add(shark);
  bugCreatureGroup.add(worm);
  bugCreatureGroup.add(puffer);
  bugCreatureGroup.add(crab);

  // only start timer once game has started
  timer = this.time.addEvent({
    // every 10 seconds (10000 ms)
    delay: 10000,
    // call this function
    callback: addCreature,
    callbackScope: this,
    loop: true
  });

  // make bg image fill screen
  background = this.add.image(windowWidth/2, windowHeight/3.5, "bg");
  background.displayWidth = windowWidth;
  background.scaleY = background.scaleX;
  background.setAlpha(1);

  title = this.add.text(windowWidth/2, windowHeight/2-50, "Deep See", {font: "100px Helvetica"}).setOrigin(0.5);
  subtitle = this.add.text(windowWidth/2, windowHeight/2+50, "Press Enter to start", {font: "50px Helvetica"}).setOrigin(0.5);
  instruction = this.add.text(windowWidth/2, windowHeight/2+115, "Arrow keys to move, spacebar to turn on torch", {font: "30px Helvetica"}).setOrigin(0.5);

  // player sprite
  player = this.physics.add.sprite(windowWidth/2, 100, "idle");
  // first spawn --> face right
  player.flipX = false;
  // can't go off-screen
  player.setCollideWorldBounds(true);
  // set collision box
  player.setSize(40, 40, true);

  // light circle
  torch = this.add.circle(200, 200, 80, 0xffffff);
  torch.setAlpha(0);

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

  this.anims.create({
    key: "octopus",
    frame: 35,
    repeat: -1,
    frames: this.anims.generateFrameNumbers("creatures", {start: 0, end: 1})
  });

  this.anims.create({
    key: "squid",
    frame: 35,
    repeat: -1,
    frames: this.anims.generateFrameNumbers("creatures", {start: 10, end: 11})
  });

  this.anims.create({
    key: "blobfish",
    frame: 35,
    repeat: -1,
    frames: this.anims.generateFrameNumbers("creatures", {start: 12, end: 13})
  });

  this.anims.create({
    key: "shark",
    frame: 35,
    repeat: -1,
    frames: this.anims.generateFrameNumbers("creatures", {start: 14, end: 15})
  });

  this.anims.create({
    key: "crab",
    frame: 35,
    repeat: -1,
    frames: this.anims.generateFrameNumbers("creatures", {start: 16, end: 17})
  });

  this.anims.create({
    key: "worm",
    frame: 35,
    repeat: -1,
    frames: this.anims.generateFrameNumbers("creatures", {start: 56, end: 57})
  });

  this.anims.create({
    key: "puffer",
    frame: 35,
    repeat: -1,
    frames: this.anims.generateFrameNumbers("creatures", {start: 52, end: 53})
  });
}

function update () {
  torch.setAlpha(0);

  if (gameStart === false) {
    this.physics.pause();
    // don't spawn in creatures unless
    // game has started
    timer.paused = true;

    if (enter.isDown) {
      gameStart = true;
    }
  }

  // press enter to start game
  if (enter.isDown) {
    gameStart = true;
    title.destroy();
    subtitle.destroy();
    instruction.destroy();
    // everything starts moving
    this.physics.resume();
    // constant gravitational acceleration downwards
    player.setVelocityY(20);
    bugCreatureGroup.setVelocityY(-10000);
    // start spawning in creatures once
    // game has started
    timer.paused = false;
  }

  prevYPos = 80;
  let currXPos = player.body.position.x;
  let currYPos = player.body.position.y;
  if (currYPos > prevYPos) {
    dim();
  }

  octopus.anims.play("octopus", true);
  squid.anims.play("squid", true);
  blobfish.anims.play("blobfish", true);
  shark.anims.play("shark", true);
  worm.anims.play("worm", true);
  puffer.anims.play("puffer", true);
  crab.anims.play("crab", true);

  if (cursors.up.isDown) {
    brighten();
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
    dim();
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
  else if (cursors.space.isDown) {
    console.log("pressing space");
    // this.lights.enable();
    // this.lights.setAmbientColor(0x555555);
    // light = this.lights.addLight(windowWidth/2, 100, 200).setIntensity(300);
    // lightOn();
    torch = this.add.circle(200, 200, 80, 0xffffff);
    torch.setAlpha(0.2);
    torch.x = player.x;
    torch.y = player.y;
  }
  else { // stay idle
    player.flipY = false;
    player.angle = 0;
    player.anims.play("idle", true);
    player.setVelocityX(0);
    player.setVelocityY(20);
  }
}
