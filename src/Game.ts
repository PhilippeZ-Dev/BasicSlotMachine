import { Values } from "./Values";

export class Game
{
    // symbols for each column in the game
    
    bands = [Values.band1, Values.band2, Values.band3, Values.band4, Values.band5];
    bandCount = 5;
    bandLength = Values.band1.length;
    // determins the state of each column
    bandPositions = [0,0,0,0,0];
    get gameResults ()
    {
        return this.GetResults();
    }

    // randomize the state of each column
    RandomizeBands():void
    {
        for (let i = 0; i < this.bandPositions.length; i++) 
        {
            this.bandPositions[i] = Math.floor(Math.random() * (this.bandLength));
        }
    }

    // Get the symbols corresponding to each band state
    // used for testing
    GetResults()
    {
        let results = [];
        for (let i = 0; i < this.bandPositions.length; i++) 
        {
            results[i] = this.bands[i][this.bandPositions[i]];
        }
        return results;
    }

    // get the symbol for each column and row of the game
    GetScreen():string[][]
    {
        let screen:string[][] = [];

        for(let column = 0; column < this.bandCount; column++)
        {
            screen[column] = [];
            for(let row = 0; row < 3; row++)
            {
                let resultID = this.bandPositions[column] + row;
                // verufy that the band loops when the index goes out of bound
                if (resultID >= this.bandLength) 
                    {
                        resultID -= this.bandLength;
                    }

                screen[column][row] = this.bands[column][resultID];
            }
        }

        return screen;
    }

    constructor()
    {
        
    }
}