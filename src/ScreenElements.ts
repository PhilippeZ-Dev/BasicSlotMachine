import * as pixi from 'pixi.js';
import { Reel } from './Reel';

export class ScreenElements
{
    static CreateText(txt:string, width:number, height:number, anchorX:number, anchorY:number, fontSize:number):pixi.Text
    {
        let text  = new pixi.Text(
        {
            text: txt,
            style: 
            {
                fill: "rgb(0,0,0)",
                fontSize: fontSize
            } 
        });
        text.anchor.set(.5);
        text.x = width * anchorX;
        text.y = height * anchorY;
        return text;
    }
    
    static CreateContainer(width:number, height:number, anchorX:number, anchorY:number):pixi.Container
    {
        let container = new pixi.Container;
        container.x = width * anchorX;
        container.y = height * anchorY;
        return container;
    }

    static CreateReels(container:pixi.Container, marginX:number, marginY:number, scale:number):Reel[]
    {
        let reels:Reel[] = [];
        let reelCount = 5;
        for(let i = 0; i < reelCount; i++) 
        {
            let reel = new Reel((container.x + marginX * (i-2)), (container.y));
            reels.push(reel);
            
            for(let j = 0; j < reel.sprites.length; j++)
            {
                reel.sprites[j] = new pixi.Sprite();
                reel.sprites[j].anchor = .5;
                reel.sprites[j].scale = scale;
                reel.sprites[j].x = reel.position_x;
                reel.sprites[j].y = reel.position_y + marginY * j;
            }
        }

        return reels;
    }
}