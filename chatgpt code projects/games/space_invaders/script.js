document.addEventListener('DOMContentLoaded', () => {
    const gameContainer = document.querySelector('.game-container');
    const player = document.querySelector('.player');
    const invaderRow = document.querySelector('.invader-row');
    const message = document.getElementById('message');
    let playerPosition = gameContainer.offsetWidth / 2 - player.offsetWidth / 2;
    const playerSpeed = 10;
    const bulletSpeed = 7;
    const invaderSpeed = 2;
    const shootInterval = 200;
    const alienShootInterval = 2000; // Aliens shoot every 2 seconds
    let canShoot = true;
    let invaderInterval, alienBulletInterval;

    // Create invaders
    function createInvaders() {
        for (let i = 0; i < 40; i++) { // 4 times as many invaders
            const invader = document.createElement('div');
            invader.classList.add('invader');
            invader.style.left = `${(i % 10) * 30 + 10}px`;
            invader.style.top = `${Math.floor(i / 10) * 30 + 20}px`;
            invaderRow.appendChild(invader);
        }
    }

    createInvaders();

    // Move player
    function movePlayer(e) {
        if (e.key === 'ArrowLeft' && playerPosition > 0) {
            playerPosition -= playerSpeed;
            player.style.left = `${playerPosition}px`;
        } else if (e.key === 'ArrowRight' && playerPosition < gameContainer.offsetWidth - player.offsetWidth) {
            playerPosition += playerSpeed;
            player.style.left = `${playerPosition}px`;
        } else if (e.key === ' ' && canShoot) {
            canShoot = false;
            shootBullet('player');
            setTimeout(() => canShoot = true, shootInterval);
        }
    }

    document.addEventListener('keydown', movePlayer);

    // Shoot bullet
    function shootBullet(shooter) {
        const bullet = document.createElement('div');
        bullet.classList.add('bullet');
        if (shooter === 'player') {
            bullet.style.left = `${playerPosition + player.offsetWidth / 2 - 2}px`; // Center bullet
            bullet.style.bottom = '40px';
        } else {
            const invaders = document.querySelectorAll('.invader');
            const randomInvader = invaders[Math.floor(Math.random() * invaders.length)];
            bullet.style.left = `${randomInvader.offsetLeft + randomInvader.offsetWidth / 2 - 2}px`;
            bullet.style.top = `${randomInvader.offsetTop + randomInvader.offsetHeight}px`;
        }
        gameContainer.appendChild(bullet);

        const bulletMoveInterval = setInterval(() => {
            const bulletPosition = bullet.getBoundingClientRect();
            if (shooter === 'player') {
                if (bulletPosition.top <= 0) {
                    bullet.remove();
                    clearInterval(bulletMoveInterval);
                } else {
                    bullet.style.bottom = `${parseInt(bullet.style.bottom) + bulletSpeed}px`;
                    checkBulletCollision(bullet, bulletMoveInterval, shooter);
                }
            } else {
                if (bulletPosition.top >= gameContainer.offsetHeight) {
                    bullet.remove();
                    clearInterval(bulletMoveInterval);
                } else {
                    bullet.style.top = `${parseInt(bullet.style.top) + bulletSpeed}px`;
                    checkBulletCollision(bullet, bulletMoveInterval, shooter);
                }
            }
        }, 30);
    }

    // Check bullet collision with invaders, bunkers, player, and other bullets
    function checkBulletCollision(bullet, bulletMoveInterval, shooter) {
        const bulletRect = bullet.getBoundingClientRect();
        if (shooter === 'player') {
            document.querySelectorAll('.invader').forEach(invader => {
                const invaderRect = invader.getBoundingClientRect();
                if (
                    bulletRect.top <= invaderRect.bottom &&
                    bulletRect.bottom >= invaderRect.top &&
                    bulletRect.left <= invaderRect.right &&
                    bulletRect.right >= invaderRect.left
                ) {
                    invader.remove();
                    bullet.remove();
                    clearInterval(bulletMoveInterval);
                    if (document.querySelectorAll('.invader').length === 0) {
                        endGame('You Win!');
                    }
                }
            });
        } else {
            const playerRect = player.getBoundingClientRect();
            if (
                bulletRect.top <= playerRect.bottom &&
                bulletRect.bottom >= playerRect.top &&
                bulletRect.left <= playerRect.right &&
                bulletRect.right >= playerRect.left
            ) {
                endGame('Game Over');
            }
        }

        document.querySelectorAll('.bunker').forEach(bunker => {
            const bunkerRect = bunker.getBoundingClientRect();
            if (
                bulletRect.top <= bunkerRect.bottom &&
                bulletRect.bottom >= bunkerRect.top &&
                bulletRect.left <= bunkerRect.right &&
                bulletRect.right >= bunkerRect.left
            ) {
                const bulletBottom = parseInt(bullet.style.bottom);
                const bunkerHeight = parseInt(bunker.style.height);
                const newBunkerHeight = bunkerHeight - (bunkerRect.bottom - bulletRect.top);
                if (newBunkerHeight > 0) {
                    bunker.style.height = `${newBunkerHeight}px`;
                } else {
                    bunker.remove();
                }
                bullet.remove();
                clearInterval(bulletMoveInterval);
            }
        });

        document.querySelectorAll('.bullet').forEach(otherBullet => {
            if (otherBullet !== bullet) {
                const otherBulletRect = otherBullet.getBoundingClientRect();
                if (
                    bulletRect.top <= otherBulletRect.bottom &&
                    bulletRect.bottom >= otherBulletRect.top &&
                    bulletRect.left <= otherBulletRect.right &&
                    bulletRect.right >= otherBulletRect.left
                ) {
                    otherBullet.remove();
                    bullet.remove();
                    clearInterval(bulletMoveInterval);
                }
            }
        });
    }

    // Move invaders
    function moveInvaders() {
        const invaders = document.querySelectorAll('.invader');
        invaders.forEach(invader => {
            invader.style.top = `${parseInt(invader.style.top) + invaderSpeed}px`;
            const invaderPosition = invader.getBoundingClientRect();
            const playerPosition = player.getBoundingClientRect();

            if (invaderPosition.top >= gameContainer.offsetHeight - player.offsetHeight) {
                endGame('Game Over');
            } else if (
                invaderPosition.bottom >= playerPosition.top &&
                invaderPosition.left <= playerPosition.right &&
                invaderPosition.right >= playerPosition.left
            ) {
                endGame('Game Over');
            } else {
                document.querySelectorAll('.bunker').forEach(bunker => {
                    const bunkerRect = bunker.getBoundingClientRect();
                    if (
                        invaderPosition.bottom >= bunkerRect.top &&
                        invaderPosition.left <= bunkerRect.right &&
                        invaderPosition.right >= bunkerRect.left
                    ) {
                        endGame('Game Over');
                    }
                });
            }
        });
    }

    invaderInterval = setInterval(moveInvaders, 500);
    alienBulletInterval = setInterval(() => shootBullet('invader'), alienShootInterval);

    // End the game and display message
    function endGame(text) {
        clearInterval(invaderInterval);
        clearInterval(alienBulletInterval);
        document.removeEventListener('keydown', movePlayer);
        message.textContent = text;
        message.style.display = 'block';
        message.style.fontSize = '3rem';
        message.style.textAlign = 'center';
        message.style.width = '100%';
    }
});
