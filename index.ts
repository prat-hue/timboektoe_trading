interface ProfitableBoxIndices {
    profit: number;
    firstIndexBox: number;
    lastIndexBox: number;
}

function convertInputToUsableFormat(inputSplitToArraysByNewLine: string[], index: number) {
    let numberOfSchuurs = parseInt(inputSplitToArraysByNewLine[index][0]);
    let inputFlorins: number[][] = [];
    let tempMaxProfit: number[] = [];
    for (let schuurIndex = 0; schuurIndex < numberOfSchuurs; schuurIndex++) {
        inputFlorins.push(inputSplitToArraysByNewLine[index + schuurIndex + 1].split(' ').reverse().slice(0, -1).reverse().map(florijn => parseInt(florijn)));
        if (schuurIndex > 0) {
            let combinedArray = inputFlorins[schuurIndex - 1].concat(inputFlorins[inputFlorins.length - 1]);
            inputFlorins.push(combinedArray);
        }
    }
    tempMaxProfit = inputFlorins.map(() => {
        return 0
    });
    return {inputFlorins, tempMaxProfit, numberOfSchuurs}
}

function printResult(numberOfSchuurs: number, maxProfit: number, result: ProfitableBoxIndices[]): void {
    console.log('schuurs ' + numberOfSchuurs);
    console.log('Maximum profit is ' + maxProfit);
    console.log('Number of fluts to buy: ' + result.filter(el => el.profit === maxProfit).map(elem => {
        return elem.lastIndexBox - (elem.firstIndexBox - 1)
    }));
}

function calculateMaximumProfit(result: ProfitableBoxIndices[]): number {
    return result.reduce((a, b) => a.profit > b.profit ? a : b).profit;
}



function helpTrader(): void {
    let input = `1
6 12 3 10 7 16 5
2
5 7 3 11 9 10
9 1 2 3 4 10 16 10 4 16
0`;
    let inputSplitToArraysByNewLine = input.split(/\r\n|\r|\n/);
    for (let i = 0; i < inputSplitToArraysByNewLine.length; i++) {
        if (!(inputSplitToArraysByNewLine[i].length === 1 && inputSplitToArraysByNewLine[i][0] === '0')) {
            let usableData = convertInputToUsableFormat(inputSplitToArraysByNewLine, i);
            let tempMaxProfit = usableData.tempMaxProfit;
            let inputFlorins = usableData.inputFlorins;
            let numberOfSchuurs = usableData.numberOfSchuurs;
            let profitThreshold = 10;
            let result: ProfitableBoxIndices[] = [];
            for (let i = 0; i < inputFlorins[inputFlorins.length - 1].length; i++) {
                for (let input = 0; input < inputFlorins.length; input++) {
                    if (i < inputFlorins[input].length) {
                        tempMaxProfit[input] += (profitThreshold - inputFlorins[input][i])
                    }
                }
                for (let j = 0; j < tempMaxProfit.length; j++) {
                    if (tempMaxProfit[j] > 0) {
                        result.push({
                            firstIndexBox: 0,
                            lastIndexBox: i,
                            profit: tempMaxProfit[j]
                        });
                    }
                }


            }
            printResult(numberOfSchuurs, calculateMaximumProfit(result), result);
            inputFlorins = [];
            i += numberOfSchuurs;
        }
    }
}

helpTrader();
