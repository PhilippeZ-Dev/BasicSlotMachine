import * as pixi from 'pixi.js';

class Reel
{
    band: string[] = [];

    app: pixi.Application;
    
    position_x = 0;
    position_y = 0;
    margin = 20;

    sprites: pixi.Sprite[] = new Array(3);

    constructor(x: number, y: number, app: pixi.Application)
    {
        this.position_x = x;
        this.position_y = y;

        this.app = app;
    }

    Display(): void
    {
        for (let i = 0; i < this.sprites.length; i++) 
        {
            this.AddSprite(i);
        }
    }

    AddSprite(index:number): void
    {
        this.sprites[index].x = this.position_x;
        this.sprites[index].y = this.position_y + (this.margin * index);

        this.app.stage.addChild(this.sprites[index]);
    }
}