
const game = (function Board(){
    const gameBoard = [['-','-','-'],['-','-','-'],['-','-','-']]
    console.log(gameBoard)
    const firstPlayer='X';
    const secondPlayer='O';
    let symbol = 'X';
    let numberOfTurns = 0;

    const startGame = ()=>{
        console.log();
        for(let i=0;i<9;i++){
            playGame(symbol)
            symbol = (symbol=='X')?'O':'X'
        }
        
    }

    const storeInputInPosition = (position,symbol)=>{
        let [a,b] = position.split('');
        [a,b] = [parseInt(a) , parseInt(b)]
        console.log(a,b)
        gameBoard[a][b] = symbol;
    }

    const playGame = ()=>{
        if(numberOfTurns==9){
            return false
        }
        const promptInput = prompt("00 01 02\n10 11 12\n20 21 22");
        storeInputInPosition(promptInput,symbol);
        numberOfTurns++;
        if (checkVictory(symbol)){
            console.log(symbol+'you won');
            return 0;
        }
        if(numberOfTurns==9){
            console.log('Draw');
            return 0;
        }
        console.log(gameBoard)
        symbol = (symbol=='X')?'O':'X'
    }

    const checkVictory = ()=>{
        

        

        return rowCheck() || daigonalCheck() || columnCheck()
    }

    const columnCheck = ()=>{

        const checkColumn = (column)=>{
            for(let j = 0;j<3;j++){
                if(gameBoard[j][column] != symbol){
                    return false
                }
            }
            return true
        }

        for(let i = 0 ; i<3;i++){
           if (checkColumn(i)){
            return true
           }
        }
        return false

    }

    const rowCheck = ()=>{

        const checkRow = (row)=>{
            for(let j = 0;j<3;j++){
                if(gameBoard[row][j] != symbol){
                    return false
                }
            }
            return true
        }

        for(let i = 0 ; i<3;i++){
           if (checkRow(i)){
            return true
           }
        }
        return false

    }

    const daigonalCheck = ()=>{
        const checkLeftDaigonal   = gameBoard[0][0]==symbol && gameBoard[2][2]==symbol;
        const checkRightDaigonal  = gameBoard[0][2]==symbol && gameBoard[2][0]==symbol;

        return (checkLeftDaigonal||checkRightDaigonal) && gameBoard[1][1]==symbol
    }

    return {gameBoard , startGame,playGame}
    

})();
