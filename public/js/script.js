
window.addEventListener('DOMContentLoaded',function(){
    tictactoe.gameStart();
})

const tictactoe = {
    winner : '',
    gameOver : false,
    turn : 'x',
    player:'',
    bot:'',
    step : 0,
    board : [],
    availableMove : '',
    getTurn(){
        this.step++;
        this.getAvailableMove();
        if(this.turn === 'x') return this.turn = 'o';
        return this.turn = 'x';
    },
    getBoard(){
        this.board = [];
        getAll('.item').forEach((el)=>{
            this.board.push(el.innerText);
        })
    },
    checkWinner(){
        this.getBoard();
        //check horizontal
        (function(){
            for(let chunk of arrayChunk.horizontalChunk(tictactoe.board)){
                if(tictactoe.isWinner(chunk))break;
            }
        })();
        //check vertical
        (function(){
            for(let chunk of arrayChunk.verticalChuck(tictactoe.board)){
                if(tictactoe.isWinner(chunk))break;
            }
        })();
        //check X
        (function(){
            let arrayX = [arrayChunk.xleftChunk(tictactoe.board),arrayChunk.xrightChunk(tictactoe.board)];
            for(let chunk of arrayX){
                if(tictactoe.isWinner(chunk))break;
            }
        })();
        this.winner = !this.winner&&this.step===9?'Draw':this.winner;

        if(this.winner){
            if(this.winner==='Draw') return this.displayWinner('Draw')
            if(this.winner==='player') return this.displayWinner('You Win')
            this.displayWinner('Bot Win');
        }

    },
    isWinner(chunk){
        if(chunk.every(val=>val===this.player)){
            tictactoe.winner = 'player';
            return true
        }
        if(chunk.every(val=>val===this.bot)){
            tictactoe.winner = 'bot';
            return true
        }
    },
    displayWinner(msg){
        get('.display').style.display = 'flex';
        get('.winner').innerText = msg;
    },
    gameOver(){

    },
    gameStart(){
        this.gameOver = false;
        this.winner = '';
        this.step = 0;
        this.player = this.turn==='x'?'o':'x';
        this.bot = this.player==='x'?'o':'x';
        get('.player').innerText = this.player;
        get('.bot').innerText = this.bot;
        get('.display').style.display = 'none';
        getAll('.item').forEach((el)=>{
            el.textContent = '';
            el.classList.remove('active');
        })
    },
    botMove(){
        this.getAvailableMove();
        let randomMove = Math.floor(Math.random()*this.availableMove.length)
        this.availableMove[randomMove].innerText = this.getTurn();
        this.availableMove[randomMove].classList.add('active');
        // if(tictactoe.step>=5){
        //     tictactoe.checkWinner();
        // }
    },
    getAvailableMove(){
        this.availableMove =  document.querySelectorAll('.item:not(.active)');
    }
}

document.querySelectorAll('.item').forEach(function(el){
    el.addEventListener('click',function(){
        if(!this.innerText){
            this.classList.add('active');
            this.innerText = tictactoe.getTurn();
        }
        tictactoe.checkWinner();
        if(tictactoe.step<9&&!tictactoe.winner){
            tictactoe.botMove();
        }
        tictactoe.checkWinner();
    })
})

function get(dom){
    return document.querySelector(dom);
}
function getAll(dom){
    return document.querySelectorAll(dom);
}

let arrayChunk = {
    horizontalChunk(arr){
        let cloneArray = [...arr];
        let chunkArray = [];
        while(cloneArray.length>0){
            chunkArray.push(cloneArray.splice(0,3));
        }
        return chunkArray;
    },
    verticalChuck(arr){
        let cloneArray = [...arr];
        let chunkArray = [];
        for(let i=0;i<3;i++){
            let index = i;
            let tempArray = [];
            for(let j=0;j<3;j++){
                tempArray.push(cloneArray[index]);
                index +=3;
            }
            chunkArray.push(tempArray);
        }
        return chunkArray;
    },
    xleftChunk(array){
        let cloneArray = [...array];
        let chunkArray = [];
        let index = 0;
        for(let i=0;i<3;i++){
            chunkArray.push(cloneArray[index]);
            index+=4;
        }
        return chunkArray
    },
    xrightChunk(array){
        let cloneArray = [...array];
        let chunkArray = [];
        let index = 2;
        for(let i=0;i<3;i++){
            chunkArray.push(cloneArray[index]);
            index+=2;
        }
        return chunkArray
    }
}
