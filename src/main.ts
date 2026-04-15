import * as pixi from 'pixi.js';
import { StartButton } from './StartButton';
import { Game } from './Game';

const width = 800;
const height = 600;
const backgroundColor = "rgb(100, 100, 100)";

(async()=> 
    {
        const app = new pixi.Application();
        // creating the new 
        await app.init(
            {
                width: width, 
                height: height, 
                background: backgroundColor
            }
        );
        document.body.appendChild(app.canvas);

        const container = new pixi.Container();
        container.x = 100;
        container.y = 50;
        app.stage.addChild(container);

        const game = new Game();

        // Button
        const buttonTexture = await pixi.Assets.load('assets/spin_button.png');
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
        //

        const text = new pixi.Text(
            {
                text: '_',
                style: {
                    fill: "rgb(0,0,0)",
                    fontSize: 40
                } 
            }
        );
        text.anchor.set(.5);
        text.x = width*.5;
        text.y = height*.85;
        
        app.stage.addChild(text);
    }
)
();