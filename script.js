
const game = (function Board(){
    const gameBoard = [['-','-','-'],['-','-','-'],['-','-','-']];
    let symbol = 'X';
    let numberOfTurns = 0;
    let isNotPlayable = false


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
            isNotPlayable = true
            endGame(true)
            return 0;
        }
        if(numberOfTurns==9){
            console.log('Draw');
            endGame(false)
            return 0;
        }
        symbol = (symbol=='X')?'O':'X'
        console.log('ssss'+symbol)
        gameDom.switchColorBasedOnPlayer(symbol)
        
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
        symbol = 'X'
        isNotPlayable=false
    }

    const endGame = (isWin)=>{
        if(isWin){
            let player = (isPlayerOne())?'player 1':'player 2'
            if(symbol=='X'){
               gameSeries.giveScoreToFirstPlayer();
               gameDom.showResultAndCountinue(player)

            }
            else{
               gameSeries.giveScoreToSecondPlayer();
               gameDom.showResultAndCountinue(player)
            }
        }
        else{
            gameDom.showResultAndCountinue('Draw')
        }
        gameDom.updateScores()
        gameSeries.gameEnd()
        symbol = 'X'
    }

    const isFreezed = ()=>isNotPlayable;

    const isPlayerOne = ()=>{
        let [startingPlayer,firstPlayerName,secondPlayerName] = gameSeries.getPlayerNames()
        
        if ((startingPlayer==firstPlayerName && symbol=='X') || 
            (startingPlayer==secondPlayerName && symbol=='O')){
            return true;
        }
        else{
            return false;
        }
    }


    return {gameBoard ,playGame,getCurrentSymbol,resetGame,isFreezed,isPlayerOne}
    

})();

const gameSeries = (function Series(){
    let firstPlayerScore = 0;
    let secondPlayerScore  = 0;
    let firstPlayerName  = 'player1';
    let secondPlayerName = 'player2';
    let startingPlayer = firstPlayerName;
    let gameNumber = 0;

    const gameStart = ()=>{
        gameNumber++;

        console.log("game start" + gameNumber)
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
        startingPlayer = (startingPlayer==firstPlayerName)?secondPlayerName:firstPlayerName;
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
        startingPlayer = firstPlayerName
    }

    return {gameStart,giveScoreToFirstPlayer,giveScoreToSecondPlayer,setPlayerNames,gameEnd,getPlayerNames,getScores,restartGame,getGameNumber}
})()

const gameDom = (function Playground(){
    gameSeries.gameStart()   
    switchColorBasedOnPlayer(game.getCurrentSymbol())
    let squareDiv = document.querySelectorAll('.square');
    const squareDivArray = Array.from(squareDiv);

    squareDivArray.forEach((element)=>{
        element.addEventListener('click',()=>{
            //elements id is square$$ eg 11
            if(game.isFreezed() || element.textContent !=''){
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

    const restartButton = document.querySelector('.restart');
    
    restartButton.addEventListener('click',()=>{
        console.log('restart')
        resetBoard()
        gameSeries.restartGame()
        updateScores()
        gameSeries.gameStart()
        updateGameNumber()
        updatePlayerSymbol()
        switchColorBasedOnPlayer(game.getCurrentSymbol())
    })
    
    const showResultAndCountinue = (playerWhoWon)=>{
        const dialog  = document.querySelector('.result-dialog');
        const displayResultDiv = document.querySelector('.result-text')
        displayResultDiv.textContent = `${playerWhoWon} WINS!!!!`;
        dialog.showModal();
        const countinueButton = document.querySelector('.countinue');

        countinueButton.addEventListener('click',(event)=>{
            resetBoard()
            gameSeries.gameStart()
            updateGameNumber()
            updatePlayerSymbol()
            switchColorBasedOnPlayer(game.getCurrentSymbol())
            dialog.close()
        })
    }

    const updateScores = ()=>{
        const firstPlayerScoreDisplay = document.querySelector('.player1-score');
        const secondPlayerScoreDisplay = document.querySelector('.player2-score');
        

        const [firstPlayerScore,secondPlayerScore] = gameSeries.getScores()
        

        firstPlayerScoreDisplay.textContent = firstPlayerScore
        secondPlayerScoreDisplay.textContent = secondPlayerScore
        


    }

    const updateGameNumber = ()=>{
        const gameNumberDisplay = document.querySelector('.game-number');
        const gameNumber = gameSeries.getGameNumber()
        gameNumberDisplay.textContent = gameNumber;
    }

    const updatePlayerSymbol = ()=>{
        const firstPlayerSymbolDisplay = document.querySelector('.player1-symbol');
        const secondPlayerSymbolDisplay = document.querySelector('.player2-symbol');


        if(game.isPlayerOne()==1){
            firstPlayerSymbolDisplay.textContent = 'X';
            secondPlayerSymbolDisplay.textContent =' O';
        }
        else{
            firstPlayerSymbolDisplay.textContent = 'O';
            secondPlayerSymbolDisplay.textContent =' X';
        }


    }

    function switchColorBasedOnPlayer(symbol){
        const container = document.querySelector('.container');
        console.log('symbol'+symbol)
        if(game.isPlayerOne()){
            container.classList.remove('player2');
            container.classList.add('player1');
        }
        else{
            container.classList.remove('player1');
            container.classList.add('player2');
        }

    }
    
    return {showResultAndCountinue,updateScores,switchColorBasedOnPlayer}

} )()

