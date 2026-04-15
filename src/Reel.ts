import * as pixi from 'pixi.js';

class Reel
{
    position_x = 0;
    position_y = 0;

    sprites: pixi.Sprite[] = new Array(3);

    constructor(x: number, y: number, app: pixi.Application)
    {
        this.position_x = x;
        this.position_y = y;
    }
}