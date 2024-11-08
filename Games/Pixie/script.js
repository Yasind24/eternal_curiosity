const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');
const obstacleCountEl = document.getElementById('obstacleCount'); 
const upButton = document.getElementById('upButton');
const downButton = document.getElementById('downButton'); // Reference to the display element

let player = {
    x: 20,
    y: canvas.height / 2,
    size: 10,
    dy: 0
};

let obstacles = [];
let score = 0;
let obstaclesCrossed = 0;  // New counter for obstacles crossed
let gameInterval;

function drawPlayer() {
    ctx.fillStyle = 'green';
    ctx.fillRect(player.x, player.y, player.size, player.size);
}

function drawObstacles() {
    ctx.fillStyle = 'red';
    for (let obstacle of obstacles) {
        ctx.fillRect(obstacle.x, obstacle.y, obstacle.width, obstacle.height);
    }
}

function movePlayerUp() {
    player.dy = -15;
}

function movePlayerDown() {
    player.dy = 15;
}
upButton.addEventListener('mousedown', movePlayerUp);
upButton.addEventListener('touchstart', movePlayerUp);
upButton.addEventListener('mouseup', stopPlayer);
upButton.addEventListener('touchend', stopPlayer);
upButton.addEventListener('mouseleave', stopPlayer);
upButton.addEventListener('touchcancel', stopPlayer);
// In case the mouse leaves the button while pressed

downButton.addEventListener('mousedown', movePlayerDown);
downButton.addEventListener('touchstart', movePlayerDown);
downButton.addEventListener('mouseup', stopPlayer);
downButton.addEventListener('touchend', stopPlayer);
downButton.addEventListener('mouseleave', stopPlayer);
downButton.addEventListener('touchcancel', stopPlayer);
// Same as above

function movePlayer(e) {
    if (e.keyCode === 38) {
        player.dy = -15;
    } else if (e.keyCode === 40) {
        player.dy = 15;
    }
}

function stopPlayer() {
    player.dy = 0;
}

function updateGameArea() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    player.y += player.dy;
    
    // Boundary checks
    if (player.y < 0) {
        player.y = 0;
    } else if (player.y > canvas.height - player.size) {
        player.y = canvas.height - player.size;
    }

    for (let obstacle of obstacles) {
        obstacle.x -= 3;
    }

    // Check for off-screen obstacles and increment counter
    obstacles = obstacles.filter(obstacle => {
        if (obstacle.x + obstacle.width < 0) {
            obstaclesCrossed++;
            obstacleCountEl.innerText = 'Obstacles Crossed: ' + obstaclesCrossed;
            return false;
        }
        return true;
    });

    // Generate new obstacles
    if (Math.random() < 0.02) {
        let obstacleHeight = Math.random() * (canvas.height - 50) + 20;
        obstacles.push({
            x: canvas.width,
            y: Math.random() * (canvas.height - obstacleHeight),
            width: 10,
            height: obstacleHeight
        });
    }

    // Collision check
    for (let obstacle of obstacles) {
        if (player.x < obstacle.x + obstacle.width &&
            player.x + player.size > obstacle.x &&
            player.y < obstacle.y + obstacle.height &&
            player.y + player.size > obstacle.y) {
            clearInterval(gameInterval);
            alert('Game Over! Score: ' + obstaclesCrossed);
            document.location.reload();
        }
    } 

    score++;
    drawPlayer();
    drawObstacles();
}

document.addEventListener('keydown', movePlayer);
document.addEventListener('keyup', stopPlayer);
gameInterval = setInterval(updateGameArea, 20);
