// Obtém uma referência para o elemento canvas
const canvas = document.getElementById('myCanvas');
const context = canvas.getContext('2d');
const sfx = document.getElementById('sfxPoint');
const points = [
    document.getElementById('player0points'),
    document.getElementById('player1points')
];


// Cria uma classe bola
class Ball {
    constructor(color, x, y, d, dx, dy) {
        this.color = color;
        this.x = x;
        this.y = y;
        this.d = d;
        this.dx = dx;
        this.dy = dy;
    }
}

const ballRadius = 30;

// Define as coordenadas iniciais
let initialWidth = canvas.width / 2;
let initialHeight = canvas.height / 2;

// Define os jogadores
let players = [
    new Ball('red', initialWidth, initialHeight, -1, 0, 0),
    new Ball('blue', initialWidth, initialHeight, -1, 0, 0)
];

// Função para desenhar a bola no canvas
function drawBall(player) {
    context.beginPath();
    context.fillStyle = player.color;
    context.arc(player.x, player.y, ballRadius, 0, Math.PI * 2);
    context.fill();
    context.closePath();
}

// Função para verificar a colisão entre as bolas
function checkCollision(start, player, i) {
    d = Math.sqrt(Math.pow(Math.abs((fruitX - player.x)), 2) + Math.pow(Math.abs((fruitY - player.y)), 2), 2);

    if (start) {
        generateFruit();
    } else {
        if (d <= ballRadius) {
            var value = points[i].innerText;
            value++;
            points[i].innerText = value;

            sfx.play();
            generateFruit();
        }
    }
}

// Função para atualizar a posição da bola
function updatePosition() {
    players.forEach(
        player => {
            player.x += player.dx;
            player.y += player.dy;

            if (player.x >= canvas.width + ballRadius) {
                player.x = 0;
            } else if (player.x < -ballRadius) {
                player.x = canvas.width;
            }

            if (player.y > canvas.height + ballRadius) {
                player.y = 0;
            } else if (player.y < -ballRadius) {
                player.y = canvas.height;
            }
        }
    )
}

// Desenha uma fruta
var fruitX, fruitY;

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
    players.forEach(player => { drawBall(player); })
}

// Função para lidar com os eventos de teclado
function handleKeyDown(event) {
    // Player 0
    // Move para a esquerda
    if (event.keyCode === 65) {
        players[0].dx = -4;
    }
    // Move para cima
    else if (event.keyCode === 87) {
        players[0].dy = -4;
    }
    // Move para a direita
    else if (event.keyCode === 68) {
        players[0].dx = 4;
    }
    // Move para baixo
    else if (event.keyCode === 83) {
        players[0].dy = 4;
    }

    // Player 1
    // Move para a esquerda
    if (event.keyCode === 37) {
        players[1].dx = -4;
    }
    // Move para cima
    else if (event.keyCode === 38) {
        players[1].dy = -4;
    }
    // Move para a direita
    else if (event.keyCode === 39) {
        players[1].dx = 4;
    }
    // Move para baixo
    else if (event.keyCode === 40) {
        players[1].dy = 4;
    }
}

// Função para lidar com a liberação das teclas
function handleKeyUp(event) {
    // Player 0
    // Para a movimentação na direção horizontal
    if (event.keyCode === 65 || event.keyCode === 68) {
        players[0].dx = 0;
    }
    // Para a movimentação na direção vertical
    else if (event.keyCode === 87 || event.keyCode === 83) {
        players[0].dy = 0;
    }

    // Player 1
    // Para a movimentação na direção horizontal
    if (event.keyCode === 37 || event.keyCode === 39) {
        players[1].dx = 0;
    }
    // Para a movimentação na direção vertical
    else if (event.keyCode === 38 || event.keyCode === 40) {
        players[1].dy = 0;
    }
}

// Adiciona listeners de eventos de teclado
document.addEventListener('keydown', handleKeyDown);
document.addEventListener('keyup', handleKeyUp);

// Função de animação
let start = true;
function animate() {
    updatePosition();
    updateCanvas();

    checkCollision(start, players[0], 0);
    start = false;
    checkCollision(start, players[1], 1);

    requestAnimationFrame(animate);
}

// Inicia a animação
animate();
