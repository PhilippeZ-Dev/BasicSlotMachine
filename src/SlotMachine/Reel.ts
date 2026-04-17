import * as pixi from 'pixi.js';

//  represent a single column in-game
export class Reel
{
    position_x = 0;
    position_y = 0;

    // the 3 sprites that represent the the rows in-game
    sprites: pixi.Sprite[] = new Array(3);

    constructor(x: number, y: number)
    {
        this.position_x = x;
        this.position_y = y;
    }
}