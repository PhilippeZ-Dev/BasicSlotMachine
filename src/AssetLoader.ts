import * as pixi from 'pixi.js';

export class AssetLoader
{
    // Load every asset from a list of paths
    // static to not create an object for a one time use function
    // async must be added to use await within the function
    static async Load(assetlist:string[], text:pixi.Text)
    {
        let assets = [];
        for(let i=0; i<assetlist.length; i++)
        {
            const texture = await pixi.Assets.load(assetlist[i]);
            assets.push(texture);
            const percent = Math.round(((i + 1) / assetlist.length) * 100);
            text.text = `${percent}%`;
        }
        return assets
    }
}