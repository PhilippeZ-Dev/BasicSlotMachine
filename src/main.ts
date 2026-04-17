import * as pixi from 'pixi.js';
import { AssetLoader } from './Utils/AssetLoader';
import { StartButton } from './UI/StartButton';
import { Game } from './SlotMachine/Game';
import { Result } from './SlotMachine/PayTable';
import { PayTable } from './SlotMachine/PayTable';
import { Reel } from './SlotMachine/Reel';
import { ScreenElements } from './UI/ScreenElements';
import { Values } from './Utils/Values';

let width = window.innerWidth;
let height = window.innerHeight;

const backgroundColor = Values.BACKGROUND_COLOR;

let app:pixi.Application = new pixi.Application();;
let startButton:StartButton;

let container:pixi.Container = ScreenElements.CreateContainer(width, height, Values.CONTAINER_X_ANCHOR, Values.CONTAINER_Y_ANCHOR);
let text:pixi.Text = ScreenElements.CreateText('Total wins:', width, height,  Values.TEXT_X_ANCHOR, Values.TEXT_Y_ANCHOR, 40);
let loadingText:pixi.Text =  ScreenElements.CreateText('0%', width, height, Values.LOADING_X_ANCHOR, Values.LOADING_Y_ANCHOR, 60);

const reels:Reel[] = ScreenElements.CreateReels(container, Values.REEL_X_MARGIN, Values.REEL_Y_MARGIN, Values.REEL_SCALE);

const game = new Game();
const paytable = new PayTable();
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
        const buttonTexture = textures[textures.length-1];
        const buttonSprite = new pixi.Sprite(buttonTexture);
        startButton = new StartButton(buttonSprite);
        
        // Added a delay to keep the text around longer, the assets load too quickly
        setTimeout(() => 
        {
            app.stage.removeChild(loadingText);
        }, Values.LOADING_TEXT_DELAY);

        AddElementsToScreen();
        // Button Onclick
        startButton.button.on('pointerdown', () =>
        {
            /// Run game ///
            game.RandomizeBands();
            
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
    }
)();

window.addEventListener('resize', Resize);
function Resize():void
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

function AddElementsToScreen():void
{
    app.stage.addChild(container);
    app.stage.addChild(text);
    app.stage.addChild(loadingText);
    app.stage.addChild(startButton.button);

    for(let i = 0; i < reels.length; i++) 
    {
        let reel = reels[i];
        for(let j = 0; j < reel.sprites.length; j++)
        {
        
            app.stage.addChild(reel.sprites[j]);
        }
    }
}