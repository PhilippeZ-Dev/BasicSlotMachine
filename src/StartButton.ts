import * as pixi from 'pixi.js';

export class StartButton
{
    button:pixi.Sprite;

    constructor(sprite:pixi.Sprite, posX:number, posY:number)
    {
        // pass in the sprite created in and added to the scene in main
        this.button = sprite;

        // enable standard interaction
        this.button.eventMode = 'static';
        // change the cursor
        this.button.cursor = 'pointer';

        this.button.anchor.set(0.5);
        this.button.scale = 0.5;
        this.UpdatePosition();
    }

    UpdatePosition()
    {
        this.button.x = window.innerWidth*.5;
        this.button.y = window.innerHeight*.65;
    }
}