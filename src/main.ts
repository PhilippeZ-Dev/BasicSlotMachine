import * as pixi from 'pixi.js';
import { StartButton } from './StartButton';
import { Game } from './Game';
import { AssetLoader } from './AssetLoader';
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

        // #region Reels Container
        const container = new pixi.Container();
        container.x = 250;
        container.y = 100;
        
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
        const startButton = new StartButton(buttonSprite, width*0.5, height*0.75);
        
        // Button Onclick
        startButton.button.on('pointerdown', () =>
            {
                game.RandomizeBands();
                //console.log('band positions: ', game.bandPositions);
                //console.log('game results: ', game.gameResults);
                text.text = game.gameResults;


                const screen = game.GetScreen();
                
                //update display reels
                for(let i = 0; i < reels.length; i++)
                {
                    for(let j = 0; j < reels[i].sprites.length; j++)
                    {
                        reels[i].sprites[j].texture = texturesSprites[screen[i][j]];
                    }
                }
            }
        );
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