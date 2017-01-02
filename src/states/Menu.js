export default class Menu extends Phaser.State {
  preload() {
    this.game.load.image('splash', './img/splash.png');
  }

  create() {
    const btn = this.add.button(0, 0, 'splash', this.startGame, this);
    btn.height = 512;
    btn.width = 512;
    btn.smoothed = false;

    const style = {
      font: 'bold 16px sans-serif',
      fill: 'rgb(255, 255, 255)',
      boundsAlignH: 'center',
      boundsAlignV: 'middle',
    };

    const text = this.game.add.text(0, 0, 'CLICK TO START', style);
    text.setTextBounds(0, 256, 512, 0);
    text.smoothed = false;
  }

  startGame() {
    this.state.start('Game');
  }
}
