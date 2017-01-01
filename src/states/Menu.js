export default class Menu extends Phaser.State {
  preload() {
    this.game.load.image('splash', './img/splash.jpg');
  }

  create() {
    this.add.sprite(0, 0, 'splash');
    this.add.button(0, 0, 'splash', this.startGame, this);
  }

  startGame() {
    this.state.start('Game');
  }
}
