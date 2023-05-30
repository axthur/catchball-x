// Obtém uma referência para o elemento canvas
const canvas = document.getElementById('myCanvas');
const context = canvas.getContext('2d');

const player1points = document.getElementById('player1points')
const player2points = document.getElementById('player2points')

// Define as coordenadas iniciais da bola
let player1x = canvas.width / 2;
let player1y = canvas.height / 2;

let player2x = canvas.width / 2;
let player2y = canvas.height / 2;
const ballRadius = 30;

// Define as variáveis para o movimento da bola
let player1dx = 0;
let player1dy = 0;

let player2dx = 0;
let player2dy = 0;

// Função para desenhar a bola no canvas
function drawBall(color, x, y) {
    context.beginPath();
    context.fillStyle = color;
    context.arc(x, y, ballRadius, 0, Math.PI * 2);
    context.fill();
    context.closePath();
}

// Função para verificar a colisão entre as bolas
let player1d = -1;
let player2d = -1;

function checkCollision(start, x, y, d, player) {
    d = Math.sqrt(Math.pow(Math.abs((fruitX - x)), 2) + Math.pow(Math.abs((fruitY - y)), 2), 2);
    if (start) {
        generateFruit();
    } else {
        if (d <= ballRadius) {
            if (player === 1) {
                var value = player1points.innerText;
                value++;
                player1points.innerText = value;
            } else if (player === 2) {
                var value = player2points.innerText;
                value++;
                player2points.innerText = value;
            }

            var sfx = document.getElementById('sfxPoint');
            sfx.play();

            generateFruit();
            console.log("GOL!");
        }
    }
}

// Função para atualizar a posição da bola
function updatePosition() {
    player1x += player1dx;
    player1y += player1dy;

    player2x += player2dx;
    player2y += player2dy;

    // Player 1
    if (player1x >= canvas.width + ballRadius) {
        player1x = 0;
    } else if (player1x < -ballRadius) {
        player1x = canvas.width;
    }

    if (player1y > canvas.height + ballRadius) {
        player1y = 0;
    } else if (player1y < -ballRadius) {
        player1y = canvas.height;
    }

    // Player 2
    if (player2x >= canvas.width + ballRadius) {
        player2x = 0;
    } else if (player2x < -ballRadius) {
        player2x = canvas.width;
    }

    if (player2y > canvas.height + ballRadius) {
        player2y = 0;
    } else if (player2y < -ballRadius) {
        player2y = canvas.height;
    }
}

// Desenha uma fruta
var fruitX;
var fruitY;

function generateFruit() {
    context.beginPath();

    fruitX = Math.floor(Math.random() * 600);
    fruitY = Math.floor(Math.random() * 600);

    context.arc(fruitX, fruitY, ballRadius / 3, 0, Math.PI * 2);
    context.fillStyle = 'white';
    context.fill();
    context.closePath();
}

function keepFruit() {
    context.beginPath();
    context.arc(fruitX, fruitY, ballRadius / 3, 0, Math.PI * 2);
    context.fillStyle = 'white';
    context.fill();
    context.closePath();
}

// Função para limpar o canvas e redesenhar a bola na nova posição
function updateCanvas() {
    context.clearRect(0, 0, canvas.width, canvas.height);

    keepFruit();
    drawBall('blue', player1x, player1y);
    drawBall('red', player2x, player2y);
}

// Função para lidar com os eventos de teclado
function handleKeyDown(event) {
    // Player 1
    // Move para a esquerda
    if (event.keyCode === 37) {
        player1dx = -4;
    }
    // Move para cima
    else if (event.keyCode === 38) {
        player1dy = -4;
    }
    // Move para a direita
    else if (event.keyCode === 39) {
        player1dx = 4;
    }
    // Move para baixo
    else if (event.keyCode === 40) {
        player1dy = 4;
    }

    // Player 2
    // Move para a esquerda
    if (event.keyCode === 65) {
        player2dx = -4;
    }
    // Move para cima
    else if (event.keyCode === 87) {
        player2dy = -4;
    }
    // Move para a direita
    else if (event.keyCode === 68) {
        player2dx = 4;
    }
    // Move para baixo
    else if (event.keyCode === 83) {
        player2dy = 4;
    }
}

// Função para lidar com a liberação das teclas
function handleKeyUp(event) {
    // Player 1
    // Para a movimentação na direção horizontal
    if (event.keyCode === 37 || event.keyCode === 39) {
        player1dx = 0;
    }
    // Para a movimentação na direção vertical
    else if (event.keyCode === 38 || event.keyCode === 40) {
        player1dy = 0;
    }

    // Player 2
    // Para a movimentação na direção horizontal
    if (event.keyCode === 65 || event.keyCode === 68) {
        player2dx = 0;
    }
    // Para a movimentação na direção vertical
    else if (event.keyCode === 87 || event.keyCode === 83) {
        player2dy = 0;
    }
}

// Adiciona listeners de eventos de teclado
document.addEventListener('keydown', handleKeyDown);
document.addEventListener('keyup', handleKeyUp);

// Função de animação
let start = true;
function animate() {
    console.log('Player 1: ', player1x, player1y)
    console.log('Player 2: ', player2x, player2y)
    updatePosition();
    updateCanvas();

    checkCollision(start, player1x, player1y, player1d, 1);
    start = false;
    checkCollision(start, player2x, player2y, player2d, 2);


    requestAnimationFrame(animate);
}

// Inicia a animação
animate();
