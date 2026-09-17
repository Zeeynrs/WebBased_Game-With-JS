// --- MAIN GAME ENTRY POINT ---
// This file ties all modules together and runs the game loop

const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');
ctx.imageSmoothingEnabled = false;

// --- GAME STATE & GLOBALS ---
let gameState = 'MENU';
let currentStage = 1;
let score = 0;
let screenShake = 0;
let teleportFlashTimer = 0;

// Physical Dungeon Gate / Portal
const dungeonGate = {
    x: 580,
    y: 165,
    w: 42,
    h: 58,
    open: false,
    swirlTimer: 0
};

// --- INITIALIZATION ---
function init() {
    initPlayer();
    initInput();
}

// --- GAME FLOW FUNCTIONS ---
function startGame() {
    score = 0;
    selectCharacter(selectedRole);
    player.gold = 0;
    player.hp = player.maxHp;
    player.shield = player.maxShield;
    loadStage(1);
    resetSkillCooldowns();
    gameState = 'PLAYING';
}

function resetGame(stageNum = 1) {
    if (stageNum === 1) {
        score = 0;
        selectCharacter(selectedRole);
        player.gold = 0;
    }
    player.hp = player.maxHp;
    player.shield = player.maxShield;
    loadStage(stageNum);
    resetSkillCooldowns();
    gameState = 'PLAYING';
}

function nextStage() {
    playSound('teleport');
    teleportFlashTimer = 25;
    loadStage(currentStage + 1);
    gameState = 'PLAYING';
}

// --- UPDATE LOOP ---
function update() {
    if (screenShake > 0) screenShake *= 0.85;
    if (teleportFlashTimer > 0) teleportFlashTimer--;

    if (gameState !== 'PLAYING') return;

    if (player.shieldHitFlashTimer > 0) player.shieldHitFlashTimer--;

    if (player.shieldRechargeTimer > 0) {
        player.shieldRechargeTimer--;
    } else if (player.shield < player.maxShield) {
        player.shield = Math.min(player.maxShield, player.shield + 0.12);
    }

    // Torch smoke particles
    torches.forEach(t => {
        if (Math.random() < 0.35) {
            smokeParticles.push({
                x: t.x + (Math.random() - 0.5) * 4,
                y: t.y - 6,
                vx: (Math.random() - 0.5) * 0.35,
                vy: -0.7 - Math.random() * 0.4,
                size: 3 + Math.random() * 3.5,
                life: 32,
                maxLife: 32
            });
        }
    });

    // Player movement
    let moveDx = 0;
    let moveDy = 0;
    if (keys['w'] || keys['arrowup']) { moveDy -= 1; player.facing = 'up'; }
    if (keys['s'] || keys['arrowdown']) { moveDy += 1; player.facing = 'down'; }
    if (keys['a'] || keys['arrowleft']) { moveDx -= 1; player.facing = 'left'; }
    if (keys['d'] || keys['arrowright']) { moveDx += 1; player.facing = 'right'; }

    if (moveDx !== 0 && moveDy !== 0) {
        moveDx *= 0.7071;
        moveDy *= 0.7071;
    }

    const stepSpeed = player.isAttacking ? player.speed * 0.45 : player.speed;
    const nextX = player.x + moveDx * stepSpeed;
    const nextY = player.y + moveDy * stepSpeed;

    if (!checkWallCollision(nextX, player.y, player.w, player.h)) {
        player.x = nextX;
    }
    if (!checkWallCollision(player.x, nextY, player.w, player.h)) {
        player.y = nextY;
    }

    // Combat update
    updateCombat();

    // Skills update
    updateSkills();

    // Check gate open condition
    if (mobs.length === 0) {
        if (!dungeonGate.open) {
            dungeonGate.open = true;
            playSound('victory');
            floatingTexts.push({
                x: dungeonGate.x + 20,
                y: dungeonGate.y - 14,
                text: 'GERBANG TERBUKA! \u{1F300}',
                color: '#2ecc71',
                life: 60
            });
        }

        dungeonGate.swirlTimer += 0.1;

        const px = player.x + player.w / 2;
        const py = player.y + player.h / 2;
        const gx = dungeonGate.x + dungeonGate.w / 2;
        const gy = dungeonGate.y + dungeonGate.h / 2;

        if (Math.hypot(px - gx, py - gy) < 26) {
            nextStage();
        }
    }

    // Coin pickup
    const px = player.x + player.w / 2;
    const py = player.y + player.h / 2;

    for (let i = coins.length - 1; i >= 0; i--) {
        const c = coins[i];
        c.x += c.vx; c.y += c.vy;
        c.vx *= 0.92; c.vy *= 0.92;

        c.z += c.vz; c.vz -= 0.45;
        if (c.z <= 0) {
            c.z = 0;
            if (c.bounced < 2) { c.vz = -c.vz * 0.45; c.bounced++; }
            else { c.vz = 0; }
        }

        const distToPlayer = Math.hypot(px - c.x, py - c.y);
        if (distToPlayer < 90) {
            c.x += ((px - c.x) / distToPlayer) * 4.6;
            c.y += ((py - c.y) / distToPlayer) * 4.6;
        }

        if (distToPlayer < 20) {
            const goldEarned = c.goldValue || 7;
            player.gold += goldEarned;
            score += c.value;
            playSound('coin');

            floatingTexts.push({
                x: c.x, y: c.y - 6,
                text: `+${goldEarned} \u{1FA99} (+${c.value})`, color: '#f1c40f', life: 24
            });

            for (let p = 0; p < 4; p++) {
                particles.push({
                    x: c.x, y: c.y,
                    vx: (Math.random() - 0.5) * 2, vy: (Math.random() - 0.5) * 2,
                    size: 2, color: '#ffe135', life: 10
                });
            }
            coins.splice(i, 1);
        }
    }

    // Loot pickup
    for (let i = loots.length - 1; i >= 0; i--) {
        const l = loots[i];
        l.floatTimer += 0.08;

        const distToPlayer = Math.hypot(px - l.x, py - l.y);
        if (distToPlayer < 75) {
            l.x += ((px - l.x) / distToPlayer) * 3.8;
            l.y += ((py - l.y) / distToPlayer) * 3.8;
        }

        if (distToPlayer < 20) {
            if (l.type === 'health') {
                const healAmount = 35;
                player.hp = Math.min(player.maxHp, player.hp + healAmount);
                playSound('heal');
                floatingTexts.push({
                    x: l.x, y: l.y - 8,
                    text: `+${healAmount} HP \u2764\uFE0F`, color: '#2ecc71', life: 30
                });
            } else if (l.type === 'shield') {
                const shieldAmount = 30;
                player.shield = Math.min(player.maxShield, player.shield + shieldAmount);
                playSound('shield');
                floatingTexts.push({
                    x: l.x, y: l.y - 8,
                    text: `+${shieldAmount} ARMOR \u{1F6E1}\uFE0F`, color: '#00e5ff', life: 30
                });
            }

            for (let p = 0; p < 8; p++) {
                particles.push({
                    x: l.x, y: l.y,
                    vx: (Math.random() - 0.5) * 3, vy: (Math.random() - 0.5) * 3,
                    size: 3, color: l.type === 'health' ? '#2ecc71' : '#00e5ff', life: 15
                });
            }

            loots.splice(i, 1);
        }
    }

    // Update particles
    updateParticles();
    updateSmokeParticles();
    updateFloatingTexts();
}

// --- DRAW LOOP ---
function draw() {
    ctx.save();

    if (screenShake > 0.5) {
        const shakeX = (Math.random() - 0.5) * screenShake;
        const shakeY = (Math.random() - 0.5) * screenShake;
        ctx.translate(shakeX, shakeY);
    }

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    drawDungeonFloor();
    drawTorchesAndSmoke();
    drawDungeonGate();
    drawCoins(ctx);
    drawLoots(ctx);
    drawEnemyProjectiles(ctx);
    if (typeof drawPlayerProjectiles === 'function') drawPlayerProjectiles(ctx);

    // Draw mobs
    drawAllMobs(ctx);

    // Draw player
    const px = player.x + player.w / 2;
    const py = player.y + player.h / 2;

    drawSlashArc(ctx, px, py);

    const isVisible = player.invulnerableTimer % 6 < 3;
    if (isVisible) {
        if (player.facing === 'up') drawSword(ctx, px, py);

        if (player.shield > 0 && player.shieldHitFlashTimer > 0) {
            ctx.save();
            const ratio = player.shieldHitFlashTimer / 16;
            const radius = 24 + (1 - ratio) * 5;

            ctx.shadowColor = '#00e5ff';
            ctx.shadowBlur = 18;

            ctx.fillStyle = `rgba(0, 229, 255, ${0.4 * ratio})`;
            ctx.beginPath();
            ctx.arc(px, py, radius, 0, Math.PI * 2);
            ctx.fill();

            ctx.strokeStyle = `rgba(255, 255, 255, ${0.95 * ratio})`;
            ctx.lineWidth = 3;
            ctx.stroke();

            ctx.strokeStyle = `rgba(0, 229, 255, ${1.0 * ratio})`;
            ctx.lineWidth = 1.5;
            ctx.stroke();
            ctx.restore();
        }

        drawPlayerModel(ctx, px, py);

        if (player.facing !== 'up') drawSword(ctx, px, py);
    }

    // Draw skill effects
    drawSkillEffects(ctx);

    // Draw particles and floating texts
    drawParticles(ctx);
    drawFloatingTexts(ctx);

    ctx.restore();

    // Teleport flash
    if (teleportFlashTimer > 0) {
        ctx.fillStyle = `rgba(255, 255, 255, ${teleportFlashTimer / 25})`;
        ctx.fillRect(0, 0, canvas.width, canvas.height);
    }

    // HUD
    drawTopHUD();
    drawSkillHUD(ctx, canvas);

    // Overlays
    if (gameState === 'MENU') {
        drawMenuOverlay();
    } else if (gameState === 'PAUSED') {
        drawPauseOverlay();
    } else if (gameState === 'GAMEOVER') {
        drawGameOverOverlay();
    } else if (gameState === 'SHOP') {
        drawShopOverlay();
    }

    mouseClicked = false;
}

// --- GAME LOOP ---
function gameLoop() {
    update();
    draw();
    requestAnimationFrame(gameLoop);
}

// --- START ---
init();
gameLoop();
