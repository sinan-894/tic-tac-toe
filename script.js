
const game = (function Board(){
    const gameBoard = [['-','-','-'],['-','-','-'],['-','-','-']];
    let symbol = 'X';
    let numberOfTurns = 0;


    const storeInputInPosition = (position)=>{
        let [a,b] = position.split('');
        [a,b] = [parseInt(a) , parseInt(b)]
        gameBoard[a-1][b-1] = symbol;
    }

    const playGame = (position)=>{
        if(numberOfTurns==9){
            return false
        }
        storeInputInPosition(position);
        numberOfTurns++;
        if (checkVictory()){
            console.log(symbol+'you won');
            endGame(true)
            return 0;
        }
        if(numberOfTurns==9){
            console.log('Draw');
            endGame(false)
            return 0;
        }
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

    const getCurrentSymbol = ()=>symbol;

    const resetGame = ()=>{
        for(let i = 0;i<3;i++){
            for(let j=0;j<3;j++){
                gameBoard[i][j] = '-';
            }
        }
        numberOfTurns = 0
    }

    const endGame = (isWin)=>{
        if(isWin){
            if(symbol=='X'){
               gameSeries.giveScoreToFirstPlayer();
               gameDom.showResultAndCountinue('X')

            }
            else{
               gameSeries.giveScoreToSecondPlayer();
               gameDom.showResultAndCountinue('O')
            }
        }
    gameDom.updateScoresAndGameNumber()
    gameSeries.gameEnd()
    }


    return {gameBoard ,playGame,getCurrentSymbol,resetGame}
    

})();






const gameSeries = (function Series(){
    let firstPlayerScore = 0;
    let secondPlayerScore  = 0;
    let firstPlayerName  = 'player1';
    let secondPlayerName = 'player2';
    let startingPlayer = firstPlayerName;
    const startingPlayerSymbol  = 'X';
    let gameNumber = 0;

    const gameStart = ()=>{
        gameNumber++;
        return gameNumber
    }
    const giveScoreToFirstPlayer = ()=>{
        (startingPlayer==firstPlayerName)?firstPlayerScore++:secondPlayerScore++
    }
    const giveScoreToSecondPlayer = ()=>{
        (startingPlayer==firstPlayerName)?secondPlayerScore++:firstPlayerScore++
    }
    const setPlayerNames = (first,second)=>{
        startingPlayer = (startingPlayer==firstPlayerName)?first:second
        firstPlayerName = first;
        secondPlayerName = second;
    }

    const gameEnd = ()=>{
        startingPlayer = (startingPlayer==firstPlayerName)?secondPlayerName:firstPlayerName
        gameNumber = 0
    }

    const getPlayerNames = ()=>{
        return [startingPlayer,firstPlayerName,secondPlayerName]
    }

    const getScores = ()=>{
        return [firstPlayerScore,secondPlayerScore]
    }

    const getGameNumber = ()=>{
        return gameNumber
    }

    const restartGame = ()=>{
        gameNumber = 0;
        firstPlayerScore = 0;
        secondPlayerScore  = 0;
    }

    return {gameStart,giveScoreToFirstPlayer,giveScoreToSecondPlayer,setPlayerNames,gameEnd,getPlayerNames,getScores,restartGame,getGameNumber}
})()


const gameDom = (function Playground(){
    gameSeries.gameStart()
    let squareDiv = document.querySelectorAll('.square');
    const squareDivArray = Array.from(squareDiv);

    squareDivArray.forEach((element)=>{
        element.addEventListener('click',()=>{
            //elements id is square$$ eg 11
            if(element.textContent !=''){
                return 0;
            }
            let position  = element.id.slice(-2);
            element.textContent = game.getCurrentSymbol()
            game.playGame(position)
        })
    })
    const resetBoard = ()=>{
        squareDivArray.forEach((element)=>{
            element.textContent = '';
        })
        game.resetGame()
    }
    const resetButton = document.querySelector('.reset')
    resetButton.addEventListener('click',resetBoard)
    
    const showResultAndCountinue = (playerWhoWon)=>{
        const resultDiv  = document.querySelector('.result');
        const displayResultDiv = document.querySelector('.who-won');
        displayResultDiv.textContent = playerWhoWon;

        const countinueButton = document.createElement('button');
        countinueButton.classList.add('countinue');
        countinueButton.textContent = 'Countinue'

        countinueButton.addEventListener('click',()=>{
            resetBoard()
            gameSeries.gameStart()
            displayResultDiv.textContent = '';
            resultDiv.removeChild(countinueButton);
        })
        resultDiv.appendChild(countinueButton);
    }

    const updateScoresAndGameNumber = ()=>{
        const firstPlayerScoreDisplay = document.querySelector('.player1-score');
        const secondPlayerScoreDisplay = document.querySelector('.player2-score');
        const gameNumberDisplay = document.querySelector('.game-number');

        const [firstPlayerScore,secondPlayerScore] = gameSeries.getScores()
        const gameNumber = gameSeries.getGameNumber()

        firstPlayerScoreDisplay.textContent = firstPlayerScore
        secondPlayerScoreDisplay.textContent = secondPlayerScore
        gameNumberDisplay.textContent = gameNumber;


    }
    
    return {showResultAndCountinue,updateScoresAndGameNumber}

} )()

