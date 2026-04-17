// types works like structs
// used to wrap all the data that represent a win 
export type Result = 
{
    payLineID:number; // which pay line according to the index in the given
    symbolID:string; // which symbol won in that result
    length:number;  // length opf the wining chain
    payout:number;
};

export class PayTable
{
    // row index in each column of screen
    payLines:number[][] =
    [
        [1,1,1,1,1],
        [0,0,0,0,0],
        [2,2,2,2,2],
        [0,0,1,2,2],
        [2,2,1,0,0],
        [0,1,2,1,0],
        [2,1,0,1,2]
    ];

    // payout for a match of 3, 4 or 5 consecutive
    payTable: Record<string, number[]> =
    {
        hv1: [10, 20, 50],
        hv2: [ 5, 10, 20],
        hv3: [ 5, 10, 15],
        hv4: [ 5, 10, 15],
        lv1: [ 2,  5, 10],
        lv2: [ 1,  2,  5],
        lv3: [ 1,  2,  3],
        lv4: [ 1,  2,  3]
    };

    Calculate(screen:string[][]):Result[]
    {
        let results:Result[] = [];

        // go through all the paylines
        for(let p = 0; p < this.payLines.length; p++)
        {
            let count = 0;
            // look for first element of the current payline
            let current = screen[0][this.payLines[p][0]];
            count++; // we go to the next element

            for(let column = 1; column < this.payLines[p].length; column++) // start at 1 because current is on column 0
            {
                // check for match with current
                if(current == screen[column][this.payLines[p][column]])
                {
                    count++; // matches with current, keep going
                }
                else
                {
                    break; // no match, stop, matches must start from the fisrt column 
                }
            }

            if(count >= 3)
            {
                let payout = this.payTable[current][count - 3];
                results.push
                (
                    {
                        payLineID: p + 1, // +1 becuase in the exercise the payLines are numbered 1 to 7
                        symbolID: current,
                        length: count,
                        payout: payout
                    }
                )
            }
        }
        return results;
    }

    CalculateTotal(results:Result[]):number
    {
        let total:number = 0;

        for(let i = 0; i < results.length; i++)
        {
            total += results[i].payout;
        }

        return total;
    }

    constructor()
    {
        
    }
}