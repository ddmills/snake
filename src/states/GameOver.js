export default class GameOver extends Phaser.State {
  init(params) {
    this.score = params.score;
  }

  preload() {
    this.game.load.image('gameover', './img/gameover.png');
  }

  create() {
    const btn = this.add.button(0, 0, 'gameover', this.startGame, this);
    btn.height = 512;
    btn.width = 512;
    btn.smoothed = false;

    const style = {
      font: 'bold 14px sans-serif',
      fill: '#fff',
      boundsAlignH: 'center',
      boundsAlignV: 'middle',
    };

    this.game.add.text(0, 20, 'GAME OVER', style).setTextBounds(0, 380, 512, 0);
    this.game.add.text(0, 40, this.score.toString(), style).setTextBounds(0, 390, 512, 0);
  }

  startGame() {
    this.state.start('Game');
  }
}
