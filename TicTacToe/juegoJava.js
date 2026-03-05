let cells = Array.from(document.getElementsByClassName("cell"))      //Declara la clase de las cells
let singlerPlayer = document.getElementById("singlerPlayer")

let notification = document.getElementById ("notification")
let btnRestart = document.getElementById ("btnRestart")
let btnNewGame = document.getElementById ("btnNewGame")
let turn = document.getElementById ("turn")
const winCombos = [
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,3,6],
    [1,4,7],
    [2,5,8],
    [0,4,8],
    [6,4,2]
]


let ai = "O"
let player = "X"
let currentPlayer = player
let win = false
let winner = ""   
let gameOver = false
let victoriesX = parseInt(localStorage.getItem("victoriesX")) || 0;
let victoriesO = parseInt(localStorage.getItem("victoriesO")) || 0;
let drawGame = parseInt (localStorage.getItem("drawgame")) || 0;

let spaces = Array(9).fill(null)



notification.innerHTML = `Victories X: ${victoriesX} / Victories O: ${victoriesO} / Draw : ${drawGame}  `;


const startGame = () =>{
    cells.forEach((cell, index) => cell.addEventListener("click", function(){
        if(cell.innerHTML==="" && !gameOver){
            cell.innerHTML = "X"
            spaces[index] = "X"

            if (checkWinner()) { 
                winnerMsg(winner);
                return;
            }
           /* if (!checkWinner()) {                                       
                                                     
                if (win) {                                              
                    console.log("ENTRA");                           //depuracion 
                    winnerMsg(winner);                                  
                }
            } else {
                winnerMsg(winner);                                      
            }
                */
        }
        turn.innerHTML = "Your turn O"
        setTimeout (() => {
                circleMark()} ,500)
    }));
}

function circleMark (){
    let filtro = cells.filter(cell => cell.innerHTML === "")          //Filtro de Celdas
     const aleatorio = Math.floor(Math.random() * filtro.length);      //Busca una cell aleatoria
        if (filtro.length > 0 && !gameOver) {
            filtro[aleatorio].innerHTML = "O"
            checkWinner()
         }
          let index = Array.from(cells).indexOf(filtro[aleatorio])
            spaces[index] = "O"
            
            if (checkWinner()) {
                winnerMsg(winner);
             } else if (isDraw()) {
                drawMsg();
             }
            turn.innerHTML = "Your turn  X "
}

function winnerMsg(player){                         //Funcion del msj ganador
    gameOver = true;

    if (player === "X") {
        victoriesX++; // Incrementa antes de almacenar
        localStorage.setItem("victoriesX", victoriesX);
    } else if (player === "O") {
        victoriesO++;
        localStorage.setItem("victoriesO", victoriesO);
    }
    notification.innerHTML = `¡Congratulations, ${player} wins! <br> Victories X: ${victoriesX} / Victories O: ${victoriesO} / Draws: ${drawGame}`;
         /*
         if (player === "X"){
        
         localStorage.setItem("victoriasX", victoriasX)
         notificacion.innerHTML += `Victorias X: ${victoriasX}, Victorias O: ${victoriasO}`;
         victoriasX++;

         }else if (player === "O"){
         victoriasO++;
         localStorage.setItem("victoriasO", victoriasO)
         notificacion.innerHTML += `Victorias X: ${victoriasX}, Victorias O: ${victoriasO}`;
    }*/
}

function drawMsg () {
         gameOver = true; 
         drawGame++;
         localStorage.setItem("drawgame", drawGame)
        notification.innerHTML = `It's a Draw! <br> Victories X: ${victoriesX} / Victories O: ${victoriesO} / Draws: ${drawGame}`;}

function checkWinner() {                            //Funcionamiento de la funcion de checkWinner
    for (let combo of winCombos) {
        const [a, b, c] = combo;
         /* if (cells[a].innerHTML && cells[a].innerHTML === cells[b].innerHTML && cells[a].innerHTML === cells[c].innerHTML) {
            win = true
            console.log(win);
            console.log(cells[a].innerHTML);
            winner = cells[a].innerHTML;   
            return true;                             // Muestra el simbolo de ganador.
        }*/
            if (cells[a].innerHTML && cells[a].innerHTML === cells[b].innerHTML && cells[a].innerHTML === cells[c].innerHTML) { 
                win = true;
                winner = cells[a].innerHTML;
                gameOver = true; // ✅ Se evita que la IA siga jugando
                return true;  
            }
    }
    return false;                                   // No hay ganador.
}

function isDraw() {
             let draw = true;                           // Se verifica que es empate
              cells.forEach(cell => {
             if (cell.innerHTML === "") {
             draw = false;                      // Si hay cells vacias el juego continua
        } 
    });
    
    return draw ;
}

function restartGame(){
            localStorage.clear();
            window.location.reload();
}
     btnRestart.addEventListener("click", restartGame);

function newGame() {
            cells.forEach((cell) => {(cell.innerHTML = "")});                       // Reinicia las cells
            
            spaces.fill(null);                                                 // Limpiar el array spaces
            win = false;
            winner = "";
            gameOver = false;
            
            turn.innerHTML = "Your turn X";                                // Empieza new game
           
            notification.innerHTML = `Victories X: ${victoriesX} / Victories O: ${victoriesO} / Draw: ${drawGame}`;   // Muestra valores del LocalStorage
  }
      btnNewGame.addEventListener("click", newGame);



startGame()



