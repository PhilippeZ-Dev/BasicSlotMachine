import * as pixi from 'pixi.js';
import { Values } from '../Utils/Values';

export class StartButton
{
    button:pixi.Sprite;

    constructor(sprite:pixi.Sprite)
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
        this.button.x = window.innerWidth * Values.START_BTN_X_ANCHOR;
        this.button.y = window.innerHeight * Values.START_BTN_Y_ANCHOR;
    }
}