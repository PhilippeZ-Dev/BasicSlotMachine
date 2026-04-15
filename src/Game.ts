export class Game
{
    band1 = ["hv2", "lv3", "lv3", "hv1", "hv1", "lv1", "hv1", "hv4", "lv1", "hv3", "hv2", "hv3", "lv4", "hv4", "lv1", "hv2", "lv4", "lv1", "lv3", "hv2"];
    band2 = ["hv1", "lv2", "lv3", "lv2", "lv1", "lv1", "lv4", "lv1", "lv1", "hv4", "lv3", "hv2", "lv1", "lv3", "hv1", "lv1", "lv2", "lv4", "lv3", "lv2"];
    band3 = ["lv1", "hv2", "lv3", "lv4", "hv3", "hv2", "lv2", "hv2", "hv2", "lv1", "hv3", "lv1", "hv1", "lv2", "hv3", "hv2", "hv4", "hv1", "lv2", "lv4"];
    band4 = ["hv2", "lv2", "hv3", "lv2", "lv4", "lv4", "hv3", "lv2", "lv4", "hv1", "lv1", "hv1", "lv2", "hv3", "lv2", "lv3", "hv2", "lv1", "hv3", "lv2"];
    band5 = ["lv3", "lv4", "hv2", "hv3", "hv4", "hv1", "hv3", "hv2", "hv2", "hv4", "hv4", "hv2", "lv2", "hv4", "hv1", "lv2", "hv1", "lv2", "hv4", "lv4"];

    bands = [this.band1, this.band2, this.band3, this.band4, this.band5];
    bandCount = 5;
    bandLength = this.band1.length;
    bandPositions = [0,0,0,0,0];
    get gameResults ()
    {
        return this.GetResults();
    }

    RandomizeBands():void
    {
        for (let i = 0; i < this.bandPositions.length; i++) 
        {
            this.bandPositions[i] = Math.floor(Math.random() * (this.bandLength));
        }
    }

    GetResults()
    {
        let results = [];
        for (let i = 0; i < this.bandPositions.length; i++) 
        {
            results[i] = this.bands[i][this.bandPositions[i]];
        }
        return results;
    }

    constructor()
    {
        console.log('game created');
    }
}