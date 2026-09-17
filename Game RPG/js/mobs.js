// --- MOB MANAGEMENT & BALANCED PROGRESSION ---
let mobs = [];
let walls = [];
let torches = [];

function loadStage(stageNum) {
    currentStage = stageNum;
    mobs = [];
    walls = [];
    torches = [];
    clearParticles();

    const canvas = document.getElementById('gameCanvas');

    player.x = 40;
    player.y = canvas.height / 2 - player.h / 2;
    player.invulnerableTimer = 0;
    player.isAttacking = false;

    dungeonGate.open = false;
    dungeonGate.swirlTimer = 0;

    const configIndex = Math.min(stageNum - 1, STAGE_CONFIGS.length - 1);
    const config = STAGE_CONFIGS[configIndex];

    if (config.walls) walls = [...config.walls];
    if (config.torches) torches = [...config.torches];

    if (torches.length === 0) {
        torches = [{ x: 100, y: 64 }, { x: 320, y: 64 }, { x: 540, y: 64 }, { x: 18, y: 200 }, { x: 622, y: 200 }];
    }

    if (config.loots) {
        config.loots.forEach(l => {
            loots.push({ x: l.x, y: l.y, type: l.type, floatTimer: Math.random() * Math.PI * 2 });
        });
    }

    // Scaling multiplier for enemy strength based on stage level
    const hpScale = 1 + (stageNum - 1) * 0.07;
    const speedScale = 1 + Math.min(0.3, (stageNum - 1) * 0.012);

    if (stageNum > STAGE_CONFIGS.length) {
        const count = 4 + Math.floor(stageNum * 1.5);
        const speciesList = ['slime', 'zombie', 'skeleton', 'dragon'];
        const slimeColors = ['#2ecc71', '#3498db', '#9b59b6'];
        for (let i = 0; i < count; i++) {
            const isBoss = (i === 0 && stageNum % 3 === 0);
            const chosenSpecies = speciesList[Math.floor(Math.random() * speciesList.length)];
            let chosenColor = '#2ecc71';
            if (chosenSpecies === 'zombie') chosenColor = '#2d6a4f';
            else if (chosenSpecies === 'skeleton') chosenColor = '#f8fafc';
            else if (chosenSpecies === 'dragon') chosenColor = '#dc2626';
            else chosenColor = slimeColors[Math.floor(Math.random() * slimeColors.length)];

            if (isBoss) chosenColor = chosenSpecies === 'dragon' ? '#dc2626' : '#9b59b6';

            const baseHp = isBoss ? 300 + stageNum * 65 : 75 + stageNum * 20;
            const scaledHp = Math.round(baseHp * hpScale);

            mobs.push({
                id: i + 1,
                x: 280 + Math.random() * 240,
                y: 80 + Math.random() * 220,
                w: isBoss ? 56 : (chosenSpecies === 'dragon' ? 52 : (chosenSpecies === 'zombie' ? 24 : (chosenSpecies === 'skeleton' ? 22 : 20))),
                h: isBoss ? 56 : (chosenSpecies === 'dragon' ? 52 : (chosenSpecies === 'zombie' ? 28 : (chosenSpecies === 'skeleton' ? 26 : 20))),
                hp: scaledHp,
                maxHp: scaledHp,
                speed: isBoss ? 0.85 * speedScale : (chosenSpecies === 'skeleton' ? 1.2 * speedScale : (chosenSpecies === 'zombie' ? 0.82 * speedScale : (0.9 + Math.random() * 0.4) * speedScale)),
                color: chosenColor,
                type: isBoss ? 'boss' : 'normal',
                species: chosenSpecies,
                level: isBoss ? `Lv.${stageNum} BOSS 👑` : `Lv.${stageNum}`
            });
        }
    } else {
        config.mobs.forEach((m, idx) => {
            const species = m.species || 'slime';
            let lvlLabel = `Lv.${stageNum}`;
            if (m.type === 'boss') {
                if (stageNum === 10) lvlLabel = 'Lv.10 SLIME KING 👑';
                else if (stageNum === 15) lvlLabel = 'Lv.15 ZOMBIE WARLORD 🧟';
                else if (stageNum === 20) lvlLabel = 'Lv.20 SKELETON KING 💀👑';
                else if (stageNum === 21) lvlLabel = 'Lv.21 ANCIENT DRAGON 🐲👑';
                else lvlLabel = `Lv.${stageNum} BOSS 👑`;
            } else if (m.w && m.w > 25) {
                lvlLabel = `Lv.${stageNum} MINI-BOSS`;
            }

            let mobColor = m.color;
            if (!mobColor) {
                if (species === 'zombie') mobColor = '#2d6a4f';
                else if (species === 'skeleton') mobColor = '#f8fafc';
                else if (species === 'dragon') mobColor = '#dc2626';
                else mobColor = '#2ecc71';
            }

            const scaledHp = Math.round(m.hp * hpScale);

            mobs.push({
                id: idx + 1,
                x: m.x, y: m.y,
                w: m.w || (species === 'dragon' ? 64 : (species === 'zombie' ? 24 : (species === 'skeleton' ? 22 : 20))),
                h: m.h || (species === 'dragon' ? 64 : (species === 'zombie' ? 28 : (species === 'skeleton' ? 26 : 20))),
                hp: scaledHp,
                maxHp: scaledHp,
                speed: m.speed * speedScale,
                color: mobColor,
                type: m.type || 'normal',
                species: species,
                level: lvlLabel
            });
        });
    }
}

function checkWallCollision(x, y, w, h) {
    const canvas = document.getElementById('gameCanvas');
    if (x < 16 || x + w > canvas.width - 16 || y < 64 || y + h > canvas.height - 16) {
        return true;
    }

    if (!dungeonGate.open) {
        if (x + w > dungeonGate.x && x < dungeonGate.x + dungeonGate.w &&
            y + h > dungeonGate.y && y < dungeonGate.y + dungeonGate.h) {
            return true;
        }
    }

    for (const wall of walls) {
        if (x < wall.x + wall.w && x + w > wall.x &&
            y < wall.y + wall.h && y + h > wall.y) {
            return true;
        }
    }
    return false;
}

function createSlimeExplosion(x, y, color, isBoss, species) {
    playSound('explode');
    screenShake = isBoss ? 12 : 6;

    const particleCount = isBoss ? 35 : 18;
    for (let i = 0; i < particleCount; i++) {
        const angle = Math.random() * Math.PI * 2;
        const speed = Math.random() * (isBoss ? 5.0 : 3.5) + 1.0;
        let particleColor = color;
        if (species === 'zombie') particleColor = Math.random() > 0.4 ? '#2d6a4f' : '#ef4444';
        else if (species === 'skeleton') particleColor = Math.random() > 0.4 ? '#f8fafc' : '#94a3b8';
        else particleColor = Math.random() > 0.3 ? color : '#ffffff';

        particles.push({
            x: x, y: y,
            vx: Math.cos(angle) * speed,
            vy: Math.sin(angle) * speed,
            size: Math.random() * (isBoss ? 5 : 3.5) + 2,
            color: particleColor,
            life: Math.floor(Math.random() * 18) + 14,
            maxLife: 32
        });
    }

    // Coin drops: +7 gold bonus per 5 stages
    const stage = (typeof currentStage !== 'undefined') ? currentStage : 1;
    const coinCount = isBoss 
        ? Math.floor(Math.random() * 7) + 12 
        : Math.floor(Math.random() * 4) + 3;

    // Tambahan +7 gold setiap 5 stage (stage 5-9: +7, stage 10-14: +14, dst)
    const stageFiveBonus = Math.floor(stage / 5) * 7;

    const coinGoldVal = (isBoss 
        ? (7 + Math.floor(stage * 0.5)) 
        : (4 + Math.floor(stage * 0.25))) + stageFiveBonus;

    for (let i = 0; i < coinCount; i++) {
        const angle = Math.random() * Math.PI * 2;
        const ejectSpeed = Math.random() * 3.0 + 1.2;
        coins.push({
            x: x, y: y,
            vx: Math.cos(angle) * ejectSpeed,
            vy: Math.sin(angle) * ejectSpeed,
            z: 0,
            vz: Math.random() * 3.8 + 2.2,
            rotation: Math.random() * Math.PI * 2,
            value: 40,
            goldValue: coinGoldVal,
            bounced: 0
        });
    }

    if (Math.random() < 0.45) {
        const lootType = Math.random() < 0.6 ? 'health' : 'shield';
        loots.push({ x: x, y: y, type: lootType, floatTimer: 0 });
    }
}
