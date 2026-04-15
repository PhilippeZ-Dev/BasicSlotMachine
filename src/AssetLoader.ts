import * as pixi from 'pixi.js';

export class AssetLoader
{
    static async Load(assetlist:string[], text:pixi.Text)
    {
        let assets = [];
        for(let i=0; i<assetlist.length; i++)
        {
            const tex = await pixi.Assets.load(assetlist[i]);
            assets.push(tex);
            const percent = Math.round(((i + 1) / assetlist.length) * 100);
            text.text = `${percent}%`;
        }
        return assets
    }
}