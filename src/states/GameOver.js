export default class GameOver extends Phaser.State {
  init(params) {
    this.score = params.score;
  }

  preload() {
    this.game.load.image('gameover', './img/gameover.jpg');
  }

  create() {
    this.add.button(0, 0, 'gameover', this.startGame, this);
    const style = {
      font: 'bold 14px sans-serif',
      fill: '#fff',
      boundsAlignH: 'center',
      boundsAlignV: 'middle',
    };

    this.game.add.text(0, 20, 'SCORE', style).setTextBounds(0, 60, 450, 100);
    this.game.add.text(0, 40, this.score.toString(), style).setTextBounds(0, 60, 450, 100);
  }

  startGame() {
    this.state.start('Game');
  }
}
