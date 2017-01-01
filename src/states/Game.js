export default class Game extends Phaser.State {
  preload() {
    this.game.load.image('snake', './img/snake.jpg');
    this.game.load.image('apple', './img/apple.jpg');
  }

  create() {
    this.snake = [];
    this.apple = {};
    this.squareSize = 15;
    this.score = 0;
    this.speed = 0;
    this.updateDelay = 0;
    this.direction = 'right';
    this.newDirection = null;
    this.addNew = null;
    this.cursors = this.game.input.keyboard.createCursorKeys();
    this.game.stage.backgroundColor = '#061f27';

    for (let i = 0; i < 10; i++) {
      const sprite = this.game.add.sprite(150 + i * this.squareSize, 150, 'snake');

      sprite.width = this.squareSize;
      sprite.height = this.squareSize;

      this.snake[i] = sprite;
    }

    this.generateApple();

    const style = { font: 'bold 14px sans-serif', fill: '#fff' };

    this.game.add.text(30, 20, 'SCORE', style);
    this.scoreTextValue = this.game.add.text(90, 20, this.score.toString(), style);
    this.game.add.text(400, 20, 'SPEED', style);
    this.speedTextValue = this.game.add.text(458, 20, this.speed.toString(), style);
  }

  generateApple() {
    const randomX = Math.floor(Math.random() * 40) * this.squareSize;
    const randomY = Math.floor(Math.random() * 30) * this.squareSize;
    this.apple = this.game.add.sprite(randomX, randomY, 'apple');
    this.apple.width = this.squareSize;
    this.apple.height = this.squareSize;
  }

  update() {
    if (this.cursors.right.isDown && this.direction != 'left') {
        this.newDirection = 'right';
    } else if (this.cursors.left.isDown && this.direction != 'right') {
        this.newDirection = 'left';
    } else if (this.cursors.up.isDown && this.direction != 'down') {
        this.newDirection = 'up';
    } else if (this.cursors.down.isDown && this.direction != 'up') {
        this.newDirection = 'down';
    }

    this.speed = Math.min(10, Math.floor(this.score/5));
    this.speedTextValue.text = `${this.speed}`;

    this.updateDelay++;

    if (this.updateDelay % (10 - this.speed) == 0) {
      console.log('tick');
      let firstCell = this.snake[this.snake.length - 1];
      let lastCell = this.snake.shift();

      let oldLastCellX = lastCell.x;
      let oldLastCellY = lastCell.y;

      if (this.newDirection) {
        this.direction = this.newDirection;
        this.newDirection = null;
      }

      if (this.direction == 'right') {
        lastCell.x = firstCell.x + this.squareSize;
        lastCell.y = firstCell.y;
      } else if (this.direction == 'left') {
        lastCell.x = firstCell.x - this.squareSize;
        lastCell.y = firstCell.y;
      } else if (this.direction == 'up') {
        lastCell.x = firstCell.x;
        lastCell.y = firstCell.y - this.squareSize;
      } else if (this.direction == 'down') {
        lastCell.x = firstCell.x;
        lastCell.y = firstCell.y + this.squareSize;
      }

      this.snake.push(lastCell);
      firstCell = lastCell;
    }
  }
}
