import * as pixi from 'pixi.js';
import { StartButton } from './StartButton';

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

        const buttonTexture = await pixi.Assets.load('assets/spin_button.png');
        const buttonSprite = new pixi.Sprite(buttonTexture);
        const startButton = new StartButton(buttonSprite, width*0.5, height*0.7);
        
        startButton.button.on('pointerdown', () =>
            {
                startButton.OnClick();
            }
        );
        app.stage.addChild(startButton.button);

        // create reels
        // display textures

        /* adding text for testing */
        const text = new pixi.Text(
            {
                text: '2',
                style: {
                    fill: "rgb(256,256,256)",
                    fontSize: 20
                } 
            }
        );
        text.x = width/7 * 2;
        text.y = height/5 * 2;
        /******************************/
        
        // add things to the screen
        //app.stage.addChild(text);
    }
)
();