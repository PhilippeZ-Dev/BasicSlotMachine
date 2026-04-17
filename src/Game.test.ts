import { Game } from './Game';

describe('Game.GetScreen', () => 
{
    let game: Game;
    beforeEach(() => { game = new Game(); });

    test('positions [0,0,0,0,0]', () => 
    {
        game.bandPositions = [0,0,0,0,0];
        expect(game.GetScreen()).toEqual(
        [
            ['hv2','lv3','lv3'],
            ['hv1','lv2','lv3'],
            ['lv1','hv2','lv3'],
            ['hv2','lv2','hv3'],
            ['lv3','lv4','hv2']
        ]);
    });
});