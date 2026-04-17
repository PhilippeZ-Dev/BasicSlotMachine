import * as pixi from 'pixi.js';
import { AssetLoader } from './AssetLoader';
import { StartButton } from './StartButton';
import { Game } from './Game';
import { Result } from './PayTable';
import { PayTable } from './PayTable';
import { Reel } from './Reel';

const width = 1280;
const height = 720;

const backgroundColor = "rgb(100, 100, 100)";

(async()=> 
    {
        // #region Initialize app
        const app = new pixi.Application();
        await app.init(
            {
                width: width, 
                height: height, 
                background: backgroundColor
            }
        );
        document.body.appendChild(app.canvas);
        // #endregion

        // #region asset loading
        const loadingText = new pixi.Text(
            {
                text: '0%',
                style: 
                {
                    fill: "rgb(0,0,0)",
                    fontSize: 60
                }
            }
        );
        loadingText.anchor.set(.5);
        loadingText.x = width*.1;
        loadingText.y = height*.1;

        app.stage.addChild(loadingText);

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
        // #endregion

 ////////////////////////////////////////////////////       
        const game = new Game();
        const paytable = new PayTable();

        // #region Reels Container
        const container = new pixi.Container();
        container.x = width*.2;
        container.y = height*.075;
        
        app.stage.addChild(container);

        const reels:Reel[] = [];
        let reelCount = 5;
        for(let i = 0; i < reelCount; i++) 
        {
            let reel = new Reel((container.x + Reel.margin_x * i), (container.y));
            reels.push(reel);
            
            for(let j = 0; j < reel.sprites.length; j++)
            {
                reel.sprites[j] = new pixi.Sprite();
                reel.sprites[j].scale = .4;
                reel.sprites[j].x = reel.position_x;
                reel.sprites[j].y = reel.position_y + Reel.margin_y * j;
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
        const startButton = new StartButton(buttonSprite, width*0.5, height*0.65);

        // Button Onclick
        startButton.button.on('pointerdown', () =>
        {
            /// Run game ///
            /*
            game.bandPositions = [0, 11, 1, 10, 14]; // works
            game.bandPositions = [0, 0, 0, 0, 0]; // works
            game.bandPositions = [5, 14, 9, 9, 16]; // faulty ???, payline 7 doesnt fit here, only payline 6 applies
            game.bandPositions = [1, 16, 2, 15, 0]; // works
            game.bandPositions = [18, 9, 2, 0, 12]; // works
            */
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
            console.log(results);
            let total = paytable.CalculateTotal(results);
            console.log('total payout: ', total);
            
            // update text
            let resultText:string = '';
            resultText += `Total wins: ${total} \n`;
            
            for(let i = 0; i < results.length; i++)
            {
                let res:Result = results[i];
                resultText += `payline ${res.payLineID}, ${res.symbolID} x${res.length}, ${res.payout}\n`;
            }
            
            console.log(resultText);
            text.text = resultText;
        });

        app.stage.addChild(startButton.button);
        // #endregion

        // #region Result Text
        const text = new pixi.Text(
            {
                text: '_',
                style: 
                {
                    fill: "rgb(0,0,0)",
                    fontSize: 40
                } 
            }
        );
        text.anchor.set(.5);
        text.x = width*.5;
        text.y = height*.9;
        
        app.stage.addChild(text);
        // #endregion
    }
)
();