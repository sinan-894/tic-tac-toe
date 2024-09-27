
const game = (function Board(){
    const gameBoard = [['-','-','-'],['-','-','-'],['-','-','-']]
    console.log(gameBoard)
    const firstPlayer='X';
    const secondPlayer='O';

    const startGame = ()=>{
        console.log();
        let symbol = 'X';
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

    const playGame = (symbol)=>{
        const promptInput = prompt("00 01 02\n10 11 12\n20 21 22");
        storeInputInPosition(promptInput,symbol)
        if (checkVictory(symbol)){
            console.log('you won');
        }
        console.log(gameBoard)
    }

    const checkVictory = (symbol)=>{
        

        

        return rowCheck(symbol) || daigonalCheck(symbol) || columnCheck(symbol)
    }

    const columnCheck = (symbol)=>{

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

    const rowCheck = (symbol)=>{

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

    const daigonalCheck = (symbol)=>{
        const checkLeftDaigonal   = gameBoard[0][0]==symbol && gameBoard[2][2]==symbol;
        const checkRightDaigonal  = gameBoard[0][2]==symbol && gameBoard[2][0]==symbol;

        return (checkLeftDaigonal||checkRightDaigonal) && gameBoard[1][1]==symbol
    }

    return {gameBoard , startGame,playGame}
    

})();
