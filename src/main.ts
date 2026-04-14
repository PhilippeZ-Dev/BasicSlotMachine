import * as pixi from 'pixi.js';

(async()=> 
    {
        const app = new pixi.Application();
        await app.init(
            {
                width: 800, 
                height: 600, 
                background: "rgb(100, 100, 100)"
            }
        );
 
        document.body.appendChild(app.canvas);
    }
)
();