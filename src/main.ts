import * as pixi from 'pixi.js';
import { AssetLoader } from './AssetLoader';
import { StartButton } from './StartButton';
import { Game } from './Game';
import { Result } from './PayTable';
import { PayTable } from './PayTable';
import { Reel } from './Reel';

import { Values } from './Values';

let width = window.innerWidth;
let height = window.innerHeight;

const backgroundColor = Values.BACKGROUND_COLOR;

let app:pixi.Application = new pixi.Application();;
let startButton:StartButton;

let container:pixi.Container = new pixi.Container();
container.x = width * Values.CONTAINER_X_ANCHOR;
container.y = height * Values.CONTAINER_Y_ANCHOR;
app.stage.addChild(container);

// #region Texts
let text:pixi.Text;
text = new pixi.Text(
{
    text: 'Total wins:',
    style: 
    {
        fill: "rgb(0,0,0)",
        fontSize: 40
    } 
});
text.anchor.set(.5);
text.x = width * Values.TEXT_X_ANCHOR;
text.y = height * Values.TEXT_Y_ANCHOR;
app.stage.addChild(text);

let loadingText = new pixi.Text(
{
    text: '0%',
    style: 
    {
        fill: "rgb(0,0,0)",
        fontSize: 60
    }
});
loadingText.anchor.set(.5);
loadingText.x = width * Values.LOADING_X_ANCHOR;
loadingText.y = height * Values.LOADING_Y_ANCHOR;
app.stage.addChild(loadingText);

// #endregion

(async()=> 
    {
        // #region Initialize app
        await app.init(
            {
                resizeTo: window,
                background: backgroundColor
            }
        );
        document.body.appendChild(app.canvas);
        // #endregion

        // #region asset loading
        // list of assets
        const assetPaths:string[] = 
        [
            'assets/hv1_symbol.png',
            'assets/hv2_symbol.png',
            'assets/hv3_symbol.png',
            'assets/hv4_symbol.png',
            'assets/lv1_symbol.png',
            'assets/lv2_symbol.png',
            'assets/lv3_symbol.png',
            'assets/lv4_symbol.png',
            'assets/spin_button.png'
        ]
        const textures:pixi.Texture[] = await AssetLoader.Load(assetPaths, loadingText);
        
        // Added a delay to keep the text around longer, the assets load too quickly
        setTimeout(() => 
            {
                app.stage.removeChild(loadingText);
            }, Values.LOADING_TEXT_DELAY);
        
        // #endregion
 
        const game = new Game();
        const paytable = new PayTable();

        // #region Reels
        const reels:Reel[] = [];
        let reelCount = 5;
        for(let i = 0; i < reelCount; i++) 
        {
            let reel = new Reel((container.x + Values.REEL_X_MARGIN * (i-2)), (container.y));
            reels.push(reel);
            
            for(let j = 0; j < reel.sprites.length; j++)
            {
                reel.sprites[j] = new pixi.Sprite();
                reel.sprites[j].anchor = .5;
                reel.sprites[j].scale = Values.REEL_SCALE;
                reel.sprites[j].x = reel.position_x;
                reel.sprites[j].y = reel.position_y + Values.REEL_Y_MARGIN * j;
                app.stage.addChild(reel.sprites[j]);
            }
        }
        // #endregion

        // #region Reel result link to assets
        const texturesSprites:Record<string, pixi.Texture> = 
        {
            'hv1': textures[0],
            'hv2': textures[1],
            'hv3': textures[2],
            'hv4': textures[3],
            'lv1': textures[4],
            'lv2': textures[5],
            'lv3': textures[6],
            'lv4': textures[7]
        };
        // #endregion

        // #region Button
        const buttonTexture = textures[textures.length-1];
        const buttonSprite = new pixi.Sprite(buttonTexture);
        startButton = new StartButton(buttonSprite);
        app.stage.addChild(startButton.button);

        // Button Onclick
        startButton.button.on('pointerdown', () =>
        {
            /// Run game ///
            //game.RandomizeBands();
            game.bandPositions = [18,9,2,0,12];
            
            const screen = game.GetScreen();
            
            //update display reels
            for(let i = 0; i < reels.length; i++)
            {
                for(let j = 0; j < reels[i].sprites.length; j++)
                {
                    reels[i].sprites[j].texture = texturesSprites[screen[i][j]];
                }
            }
                    
            let results = paytable.Calculate(screen);
            let total = paytable.CalculateTotal(results);
            
            // update text
            let resultText:string = '';
            resultText += `Total wins: ${total} \n`;
            
            for(let i = 0; i < results.length; i++)
            {
                let res:Result = results[i];
                resultText += `payline ${res.payLineID}, ${res.symbolID} x${res.length}, ${res.payout}\n`;
            }
            
            text.text = resultText;
        });
        // #endregion        
    }
)
();

window.addEventListener('resize', Resize);
function Resize()
{
    width = window.innerWidth;
    height = window.innerHeight;

    app.renderer.resize(width, height);
    
    startButton.UpdatePosition();

    container.x = width  * Values.CONTAINER_X_ANCHOR;
    container.y = height * Values.CONTAINER_Y_ANCHOR;

    text.x = width * Values.TEXT_X_ANCHOR;
    text.y = height * Values.TEXT_Y_ANCHOR;

    loadingText.x = width * Values.LOADING_X_ANCHOR;
    loadingText.y = height * Values.LOADING_Y_ANCHOR;
}