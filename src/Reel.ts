import * as pixi from 'pixi.js';

export class Reel
{
    position_x = 0;
    position_y = 0;
    static margin_x:number = 170;
    static margin_y:number = 120;

    sprites: pixi.Sprite[] = new Array(3);

    constructor(x: number, y: number)
    {
        this.position_x = x;
        this.position_y = y;
    }
}