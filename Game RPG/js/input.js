// --- INPUT HANDLING WITH MENU SELECTION & SHOP WHEEL SCROLLING ---
const keys = {};
let mouseX = 0;
let mouseY = 0;
let mouseClicked = false;

function initInput() {
    window.addEventListener('keydown', (e) => {
        initAudio();
        const k = e.key.toLowerCase();
        keys[k] = true;

        if (k === 'escape' || k === 'esc' || k === 'p') {
            if (gameState === 'PLAYING') {
                gameState = 'PAUSED';
            } else if (gameState === 'PAUSED') {
                gameState = 'PLAYING';
            } else if (gameState === 'SHOP') {
                gameState = 'PLAYING';
            }
        }

        if (k === 'q' && gameState === 'PAUSED') {
            gameState = 'MENU';
        }

        if (k === 'r') {
            if (gameState === 'GAMEOVER' || gameState === 'PLAYING') {
                resetGame(1);
            } else if (gameState === 'PAUSED') {
                resetGame(currentStage);
            }
        }

        // Menu Character Selection Keybinds
        if (gameState === 'MENU') {
            if (k === '1') selectCharacter('knight');
            if (k === '2') selectCharacter('mage');
            if (k === '3') selectCharacter('assassin');
            
            if (k === 'arrowleft' || k === 'a') {
                const roles = ['knight', 'mage', 'assassin'];
                const idx = roles.indexOf(selectedRole);
                selectCharacter(roles[(idx + 2) % 3]);
            }
            if (k === 'arrowright' || k === 'd') {
                const roles = ['knight', 'mage', 'assassin'];
                const idx = roles.indexOf(selectedRole);
                selectCharacter(roles[(idx + 1) % 3]);
            }
            if (k === ' ' || k === 'enter' || k === 'j') {
                startGame();
            }
        }

        // Shop toggle
        if (k === 'b') {
            if (gameState === 'PLAYING' && dungeonGate.open) {
                gameState = 'SHOP';
                shopScrollOffset = 0;
            } else if (gameState === 'SHOP') {
                gameState = 'PLAYING';
            }
        }

        // Skill hotkeys
        if (gameState === 'PLAYING') {
            if (k === '1') activateSkill(0);
            if (k === '2') activateSkill(1);
            if (k === '3') activateSkill(2);
        }
    });

    window.addEventListener('keyup', (e) => {
        keys[e.key.toLowerCase()] = false;
    });

    const canvas = document.getElementById('gameCanvas');

    canvas.addEventListener('mousemove', (e) => {
        const rect = canvas.getBoundingClientRect();
        mouseX = (e.clientX - rect.left) * (canvas.width / rect.width);
        mouseY = (e.clientY - rect.top) * (canvas.height / rect.height);
    });

    canvas.addEventListener('mousedown', (e) => {
        initAudio();
        mouseClicked = true;
        handleCanvasClick();
    });

    // Mouse wheel scrolling for Shop
    canvas.addEventListener('wheel', (e) => {
        if (gameState === 'SHOP' && typeof handleShopScroll === 'function') {
            e.preventDefault();
            handleShopScroll(e.deltaY);
        }
    }, { passive: false });
}

function isHovering(x, y, w, h) {
    return mouseX >= x && mouseX <= x + w && mouseY >= y && mouseY <= y + h;
}

function handleCanvasClick() {
    const canvas = document.getElementById('gameCanvas');
    
    // Sound Mute Toggle Button
    if (isHovering(canvas.width - 34, 8, 28, 24)) {
        soundEnabled = !soundEnabled;
        return;
    }

    // Pause Toggle Button on HUD
    if (isHovering(canvas.width - 64, 8, 28, 24)) {
        if (gameState === 'PLAYING') gameState = 'PAUSED';
        else if (gameState === 'PAUSED') gameState = 'PLAYING';
        return;
    }

    if (gameState === 'MENU') {
        handleMenuClick();
    } else if (gameState === 'PAUSED') {
        if (isHovering(canvas.width / 2 - 110, 180, 220, 42)) {
            gameState = 'PLAYING';
        } else if (isHovering(canvas.width / 2 - 110, 236, 220, 42)) {
            resetGame(currentStage);
        } else if (isHovering(canvas.width / 2 - 110, 292, 220, 42)) {
            gameState = 'MENU';
        }
    } else if (gameState === 'GAMEOVER') {
        if (isHovering(canvas.width / 2 - 90, 230, 180, 44)) resetGame(1);
    } else if (gameState === 'SHOP') {
        handleShopClick();
    }
}

function handleMenuClick() {
    const canvas = document.getElementById('gameCanvas');
    
    // Character selection cards
    const cardW = 186;
    const cardH = 206;
    const cardY = 66;
    const gap = 14;
    const totalW = 3 * cardW + 2 * gap;
    const startX = (canvas.width - totalW) / 2;
    
    // Card 1: Knight
    if (isHovering(startX, cardY, cardW, cardH)) {
        selectCharacter('knight');
        playSound('slash');
        return;
    }
    
    // Card 2: Mage
    if (isHovering(startX + cardW + gap, cardY, cardW, cardH)) {
        selectCharacter('mage');
        playSound('slash');
        return;
    }
    
    // Card 3: Assassin
    if (isHovering(startX + 2 * (cardW + gap), cardY, cardW, cardH)) {
        selectCharacter('assassin');
        playSound('slash');
        return;
    }

    // Start Button
    const btnX = canvas.width / 2 - 100;
    const btnY = 285;
    if (isHovering(btnX, btnY, 200, 42)) {
        startGame();
    }
}
