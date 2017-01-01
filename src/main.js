import Menu from './states/Menu';
import Game from './states/Game';
import GameOver from './states/GameOver';

class Main extends Phaser.Game {
  constructor() {
    super(450, 450, Phaser.AUTO, '', null);

    this.state.add('Menu', Menu);
    this.state.add('Game', Game);
    this.state.add('GameOver', GameOver);

    this.state.start('Menu');
  }
}

new Main();
