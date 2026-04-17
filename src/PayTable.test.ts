import { PayTable } from './PayTable';
import { Game } from './Game';

describe('PayTable.Calculate', () => 
{
    let game:Game;
    beforeEach(() => { game = new Game(); });
    let paytable: PayTable;
    beforeEach(() => { paytable = new PayTable(); });

    test('Positions: 0, 0, 0, 0, 0: -payline 3, lv3 x3, 1', () => 
    {
        game.bandPositions = [0, 0, 0, 0, 0];
        const screen =  game.GetScreen();
        const results = paytable.Calculate(screen);
        expect(results).toHaveLength(1);
        expect(results[0]).toMatchObject({ payLineID: 3, symbolID: 'lv3', length: 3, payout: 1});
    });

    ///

    test('Positions: 0, 11, 1, 10, 14: -payline 2, hv2 x3, 5 -payline 5, lv3 x3, 1', () => 
    {
        game.bandPositions = [0, 11, 1, 10, 14];
        const screen =  game.GetScreen();
        const results = paytable.Calculate(screen);
        expect(results).toHaveLength(2);
        expect(results[0]).toMatchObject({ payLineID: 2, symbolID: 'hv2', length: 3, payout: 5});
        expect(results[1]).toMatchObject({ payLineID: 5, symbolID: 'lv3', length: 3, payout: 1});
    });

    ///
/*
    test('Positions: 5, 14, 9, 9, 16: -payline 6, lv1 x4, 5 -payline 7, lv1 x3, 2', () => 
    {
        game.bandPositions = [5, 14, 9, 9, 16];
        const screen =  game.GetScreen();
        const results = paytable.Calculate(screen);
        expect(results).toHaveLength(1);
        expect(results[0]).toMatchObject({ payLineID: 6, symbolID: 'lv1', length: 4, payout: 5});
        //expect(results[1]).toMatchObject({ payLineID: 7, symbolID: 'lv1', length: 3, payout: 2});
    });
*/

    ///

    test('Positions: 1, 16, 2, 15, 0: no results', () => 
    {
        game.bandPositions = [1, 16, 2, 15, 0];
        const screen =  game.GetScreen();
        const results = paytable.Calculate(screen);
        expect(results).toHaveLength(0);
    });
});