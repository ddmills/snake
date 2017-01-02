(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';

var _Menu = require('./states/Menu');

var _Menu2 = _interopRequireDefault(_Menu);

var _Game = require('./states/Game');

var _Game2 = _interopRequireDefault(_Game);

var _GameOver = require('./states/GameOver');

var _GameOver2 = _interopRequireDefault(_GameOver);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Main = function (_Phaser$Game) {
  _inherits(Main, _Phaser$Game);

  function Main() {
    _classCallCheck(this, Main);

    var _this = _possibleConstructorReturn(this, (Main.__proto__ || Object.getPrototypeOf(Main)).call(this, 512, 512, Phaser.AUTO, '', null));

    _this.state.add('Menu', _Menu2.default);
    _this.state.add('Game', _Game2.default);
    _this.state.add('GameOver', _GameOver2.default);

    _this.state.start('Menu');
    return _this;
  }

  return Main;
}(Phaser.Game);

new Main();

},{"./states/Game":2,"./states/GameOver":3,"./states/Menu":4}],2:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Game = function (_Phaser$State) {
  _inherits(Game, _Phaser$State);

  function Game() {
    _classCallCheck(this, Game);

    return _possibleConstructorReturn(this, (Game.__proto__ || Object.getPrototypeOf(Game)).apply(this, arguments));
  }

  _createClass(Game, [{
    key: 'preload',
    value: function preload() {
      this.game.load.image('snake', './img/snake.png');
      this.game.load.image('apple', './img/apple.png');
    }
  }, {
    key: 'create',
    value: function create() {
      this.snake = [];
      this.apple = {};
      this.squareSize = 16;
      this.score = 0;
      this.speed = 0;
      this.updateDelay = 0;
      this.direction = 'right';
      this.newDirection = null;
      this.addNew = null;
      this.cursors = this.game.input.keyboard.createCursorKeys();
      this.game.stage.backgroundColor = '#061f27';

      for (var i = 0; i < 10; i++) {
        var sprite = this.game.add.sprite(i * this.squareSize, 128, 'snake');

        sprite.smoothed = false;
        sprite.width = this.squareSize;
        sprite.height = this.squareSize;

        this.snake[i] = sprite;
      }

      this.generateApple();

      var style = { font: 'bold 14px sans-serif', fill: '#fff' };

      this.game.add.text(30, 20, 'SCORE', style);
      this.scoreTextValue = this.game.add.text(90, 20, this.score.toString(), style);
      this.game.add.text(350, 20, 'SPEED', style);
      this.speedTextValue = this.game.add.text(410, 20, this.speed.toString(), style);
    }
  }, {
    key: 'generateApple',
    value: function generateApple() {
      var randomX = Math.floor(Math.random() * 32) * this.squareSize;
      var randomY = Math.floor(Math.random() * 32) * this.squareSize;
      this.apple = this.game.add.sprite(randomX, randomY, 'apple');
      this.apple.width = this.squareSize;
      this.apple.height = this.squareSize;
      this.apple.smoothed = false;
    }
  }, {
    key: 'update',
    value: function update() {
      if (this.cursors.right.isDown && this.direction != 'left') {
        this.newDirection = 'right';
      } else if (this.cursors.left.isDown && this.direction != 'right') {
        this.newDirection = 'left';
      } else if (this.cursors.up.isDown && this.direction != 'down') {
        this.newDirection = 'up';
      } else if (this.cursors.down.isDown && this.direction != 'up') {
        this.newDirection = 'down';
      }

      this.speed = Math.min(10, Math.floor(this.score / 5));
      this.speedTextValue.text = this.speed.toString();

      this.updateDelay++;

      if (this.updateDelay % (7 - this.speed) == 0) {
        var firstCell = this.snake[this.snake.length - 1];
        var lastCell = this.snake.shift();

        var oldLastCellX = lastCell.x;
        var oldLastCellY = lastCell.y;

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

        if (this.addNew) {
          var newPart = this.game.add.sprite(oldLastCellX, oldLastCellY, 'snake');
          newPart.height = this.squareSize;
          newPart.width = this.squareSize;
          this.snake.unshift(newPart);
          this.addNew = false;
        }

        this.appleCollision();
        this.selfCollision(firstCell);
        this.wallCollision(firstCell);
      }
    }
  }, {
    key: 'appleCollision',
    value: function appleCollision() {
      var _this2 = this;

      this.snake.forEach(function (part) {
        if (part.x == _this2.apple.x && part.y == _this2.apple.y) {
          _this2.addNew = true;
          _this2.apple.destroy();
          _this2.generateApple();
          _this2.score++;
          _this2.scoreTextValue.text = _this2.score.toString();
        }
      });
    }
  }, {
    key: 'selfCollision',
    value: function selfCollision(head) {
      for (var i = 0; i < this.snake.length - 1; i++) {
        if (head.x == this.snake[i].x && head.y == this.snake[i].y) {
          this.gameOver();
        }
      }
    }
  }, {
    key: 'wallCollision',
    value: function wallCollision(head) {
      if (head.x >= 512 || head.x < 0 || head.y >= 512 || head.y < 0) {
        this.gameOver();
      }
    }
  }, {
    key: 'gameOver',
    value: function gameOver() {
      this.game.state.start('GameOver', true, false, { score: this.score });
    }
  }]);

  return Game;
}(Phaser.State);

exports.default = Game;

},{}],3:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var GameOver = function (_Phaser$State) {
  _inherits(GameOver, _Phaser$State);

  function GameOver() {
    _classCallCheck(this, GameOver);

    return _possibleConstructorReturn(this, (GameOver.__proto__ || Object.getPrototypeOf(GameOver)).apply(this, arguments));
  }

  _createClass(GameOver, [{
    key: 'init',
    value: function init(params) {
      this.score = params.score;
    }
  }, {
    key: 'preload',
    value: function preload() {
      this.game.load.image('gameover', './img/gameover.png');
    }
  }, {
    key: 'create',
    value: function create() {
      var btn = this.add.button(0, 0, 'gameover', this.startGame, this);
      btn.height = 512;
      btn.width = 512;
      btn.smoothed = false;

      var style = {
        font: 'bold 14px sans-serif',
        fill: '#fff',
        boundsAlignH: 'center',
        boundsAlignV: 'middle'
      };

      this.game.add.text(0, 20, 'GAME OVER', style).setTextBounds(0, 380, 512, 0);
      this.game.add.text(0, 40, this.score.toString(), style).setTextBounds(0, 390, 512, 0);
    }
  }, {
    key: 'startGame',
    value: function startGame() {
      this.state.start('Game');
    }
  }]);

  return GameOver;
}(Phaser.State);

exports.default = GameOver;

},{}],4:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Menu = function (_Phaser$State) {
  _inherits(Menu, _Phaser$State);

  function Menu() {
    _classCallCheck(this, Menu);

    return _possibleConstructorReturn(this, (Menu.__proto__ || Object.getPrototypeOf(Menu)).apply(this, arguments));
  }

  _createClass(Menu, [{
    key: 'preload',
    value: function preload() {
      this.game.load.image('splash', './img/splash.png');
    }
  }, {
    key: 'create',
    value: function create() {
      var btn = this.add.button(0, 0, 'splash', this.startGame, this);
      btn.height = 512;
      btn.width = 512;
      btn.smoothed = false;

      var style = {
        font: 'bold 16px sans-serif',
        fill: 'rgb(255, 255, 255)',
        boundsAlignH: 'center',
        boundsAlignV: 'middle'
      };

      var text = this.game.add.text(0, 0, 'CLICK TO START', style);
      text.setTextBounds(0, 256, 512, 0);
      text.smoothed = false;
    }
  }, {
    key: 'startGame',
    value: function startGame() {
      this.state.start('Game');
    }
  }]);

  return Menu;
}(Phaser.State);

exports.default = Menu;

},{}]},{},[1]);
