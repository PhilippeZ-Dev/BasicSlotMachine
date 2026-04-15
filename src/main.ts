import * as pixi from 'pixi.js';
import { StartButton } from './StartButton';
import { Game } from './Game';

const width = 800;
const height = 600;
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
        loadingText.x = width*.12;
        loadingText.y = height*.1;

        app.stage.addChild(loadingText);

        // #region asset laoding
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

        const textures:pixi.Texture[] = [];

        // async loading
        for(let i=0; i<assetPaths.length; i++)
        {
            const tex = await pixi.Assets.load(assetPaths[i]);
            textures.push(tex);
            const percent = Math.round(((i + 1) / assetPaths.length) * 100);
            loadingText.text = `${percent}%`;
        }
        // #endregion

 ////////////////////////////////////////////////////       
        const game = new Game();

        // #region Reels Container
        const container = new pixi.Container();
        container.x = 100;
        container.y = 50;
        app.stage.addChild(container);
        // #endregion

        // #region Button
        const buttonTexture = textures[textures.length-1];
        const buttonSprite = new pixi.Sprite(buttonTexture);
        const startButton = new StartButton(buttonSprite, width*0.5, height*0.7);
        
        // Button Onclick
        startButton.button.on('pointerdown', () =>
            {
                game.RandomizeBands();
                console.log('band positions: ', game.bandPositions);
                console.log('game results: ', game.gameResults);
                text.text = game.gameResults;
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
        text.y = height*.85;
        
        app.stage.addChild(text);
        // #endregion
    }
)
();