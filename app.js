import $ from 'jquery';
import Game from './js/game';

$(function() {
  const game = document.getElementById("game");
  const gameContext = game.getContext("2d");
  const snakeGame = new Game(gameContext);
  snakeGame.start();
});
