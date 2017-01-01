import Menu from './states/Menu';
import Game from './states/Game';

class Main extends Phaser.Game {
  constructor() {
    super(500, 500, Phaser.AUTO, '', null);

    this.state.add('Menu', Menu);
    this.state.add('Game', Game);

    this.state.start('Menu');
  }
}

new Main();
