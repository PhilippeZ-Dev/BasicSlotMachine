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

        const band1 = ["hv2", "lv3", "lv3", "hv1", "hv1", "lv1", "hv1", "hv4", "lv1", "hv3", "hv2", "hv3", "lv4", "hv4", "lv1", "hv2", "lv4", "lv1", "lv3", "hv2"];
        const band2 = ["hv1", "lv2", "lv3", "lv2", "lv1", "lv1", "lv4", "lv1", "lv1", "hv4", "lv3", "hv2", "lv1", "lv3", "hv1", "lv1", "lv2", "lv4", "lv3", "lv2"];
        const band3 = ["lv1", "hv2", "lv3", "lv4", "hv3", "hv2", "lv2", "hv2", "hv2", "lv1", "hv3", "lv1", "hv1", "lv2", "hv3", "hv2", "hv4", "hv1", "lv2", "lv4"];
        const band4 = ["hv2", "lv2", "hv3", "lv2", "lv4", "lv4", "hv3", "lv2", "lv4", "hv1", "lv1", "hv1", "lv2", "hv3", "lv2", "lv3", "hv2", "lv1", "hv3", "lv2"];
        const band5 = ["lv3", "lv4", "hv2", "hv3", "hv4", "hv1", "hv3", "hv2", "hv2", "hv4", "hv4", "hv2", "lv2", "hv4", "hv1", "lv2", "hv1", "lv2", "hv4", "lv4"];

        const bands = [band1, band2, band3, band4, band5];
        const bandCount = 5;
        let bandLength = band1.length;
        let bandPositions = [0,0,0,0,0];

        // Button
        const buttonTexture = await pixi.Assets.load('assets/spin_button.png');
        const buttonSprite = new pixi.Sprite(buttonTexture);
        const startButton = new StartButton(buttonSprite, width*0.5, height*0.7);
        
        startButton.button.on('pointerdown', () =>
            {
                startButton.OnClick();
            }
        );
        app.stage.addChild(startButton.button);
        //


        // create reels
        // display textures

        /* adding text for testing */
        /*
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
        */
        
        // add things to the screen
        //app.stage.addChild(text);
    }
)
();