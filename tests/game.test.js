const game = require('../game');

describe('startOver', () => {
  test('resets level, gamePattern, and userClickedPattern', () => {
    // Set up non-default state
    game.setLevel(5);
    game.setGamePattern(['red', 'blue']);
    game.setUserClickedPattern(['green']);

    game.startOver();

    expect(game.getLevel()).toBe(0);
    expect(game.getGamePattern()).toEqual([]);
    expect(game.getUserClickedPattern()).toEqual([]);
  });
});
