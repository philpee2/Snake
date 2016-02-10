import $ = require('jquery');
import Game = require('./js/game');

$(function() {
  const game : any = document.getElementById("game");
  const gameContext : any = game.getContext("2d");
  const snakeGame : Game = new Game(gameContext);
  snakeGame.start();
});
