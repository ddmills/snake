export default class GameOver extends Phaser.State {
  preload() {
    this.game.load.image('gameover', './img/gameover.jpg');
  }

  create() {
    this.add.button(0, 0, 'gameover', this.startGame, this);
  }

  startGame() {
    this.state.start('Game');
  }
}
