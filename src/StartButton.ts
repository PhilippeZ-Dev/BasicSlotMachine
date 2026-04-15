import * as pixi from 'pixi.js';

export class StartButton
{
    button:pixi.Sprite;

    constructor(sprite:pixi.Sprite, posX:number, posY:number)
    {
        this.button = sprite;

        this.button.eventMode = 'static';
        this.button.cursor = 'pointer';
        this.button.anchor.set(0.5);
        this.button.scale = 0.5;
        this.button.x = posX;
        this.button.y = posY;
    }

    OnClick(): void 
    {
        console.log("something else");
    }
}