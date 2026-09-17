// --- PLAYER RENDERING WITH EQUIPMENT SPRITES (KNIGHT, MAGE, ASSASSIN) ---

function drawPlayerModel(ctx, px, py) {
    ctx.save();
    
    const role = (player && player.characterRole) ? player.characterRole : 'knight';
    const capeSprite = getEquippedSprite(player.equipped, 'cape');
    const armorSprite = getEquippedSprite(player.equipped, 'armor');
    const helmetSprite = getEquippedSprite(player.equipped, 'helmet');
    const bootsSprite = getEquippedSprite(player.equipped, 'boots');
    const shieldSprite = getEquippedSprite(player.equipped, 'shield');
    
    if (role === 'mage') {
        drawMageModel(ctx, px, py, capeSprite, armorSprite, helmetSprite, bootsSprite, shieldSprite);
    } else if (role === 'assassin') {
        drawAssassinModel(ctx, px, py, capeSprite, armorSprite, helmetSprite, bootsSprite, shieldSprite);
    } else {
        drawKnightModel(ctx, px, py, capeSprite, armorSprite, helmetSprite, bootsSprite, shieldSprite);
    }
    
    ctx.restore();
}

// 1. KNIGHT MODEL (Ksatria)
function drawKnightModel(ctx, px, py, capeSprite, armorSprite, helmetSprite, bootsSprite, shieldSprite) {
    const time = Date.now() * 0.006;
    const capeWave = Math.sin(time) * 3.5;

    const capeMain = capeSprite ? capeSprite.mainColor : '#991b1b';
    const capeInner = capeSprite ? capeSprite.innerColor : '#dc2626';
    const capeBorder = capeSprite ? capeSprite.borderColor : null;

    // Cape
    ctx.fillStyle = capeMain;
    ctx.beginPath();
    if (player.facing === 'down') {
        ctx.moveTo(player.x + 3, player.y + 10);
        ctx.quadraticCurveTo(player.x - 4 + capeWave, player.y + player.h + 6, player.x + 4, player.y + player.h + 8);
        ctx.lineTo(player.x + player.w - 4, player.y + player.h + 8);
        ctx.quadraticCurveTo(player.x + player.w + 4 - capeWave, player.y + player.h + 6, player.x + player.w - 3, player.y + 10);
    } else if (player.facing === 'up') {
        ctx.moveTo(player.x + 1, player.y + 6);
        ctx.quadraticCurveTo(player.x - 8 + capeWave, player.y + player.h + 7, player.x - 2, player.y + player.h + 9);
        ctx.lineTo(player.x + player.w + 2, player.y + player.h + 9);
        ctx.quadraticCurveTo(player.x + player.w + 8 - capeWave, player.y + player.h + 7, player.x - 1, player.y + 6);
    } else if (player.facing === 'right') {
        ctx.moveTo(player.x + 4, player.y + 6);
        ctx.quadraticCurveTo(player.x - 12 + capeWave, player.y + player.h / 2, player.x - 8 + capeWave * 0.5, player.y + player.h + 6);
        ctx.lineTo(player.x + 6, player.y + player.h + 3);
    } else {
        ctx.moveTo(player.x + player.w - 4, player.y + 6);
        ctx.quadraticCurveTo(player.x + player.w + 12 - capeWave, player.y + player.h / 2, player.x + player.w + 8 - capeWave * 0.5, player.y + player.h + 6);
        ctx.lineTo(player.x + player.w - 6, player.y + player.h + 3);
    }
    ctx.closePath();
    ctx.fill();
    if (capeBorder) {
        ctx.strokeStyle = capeBorder;
        ctx.lineWidth = 1;
        ctx.stroke();
    }

    ctx.fillStyle = capeInner;
    ctx.beginPath();
    if (player.facing === 'right' || player.facing === 'left') {
        ctx.ellipse(player.x + player.w / 2, player.y + player.h, 6, 3, 0, 0, Math.PI * 2);
    }
    ctx.fill();

    // Boots
    const bootColor = bootsSprite ? bootsSprite.bootColor : '#1e293b';
    const bootTrim = bootsSprite ? bootsSprite.trimColor : '#475569';
    ctx.fillStyle = bootColor;
    ctx.fillRect(player.x + 3, player.y + player.h - 6, 6, 6);
    ctx.fillRect(player.x + player.w - 9, player.y + player.h - 6, 6, 6);
    ctx.fillStyle = bootTrim;
    ctx.fillRect(player.x + 4, player.y + player.h - 6, 4, 3);
    ctx.fillRect(player.x + player.w - 8, player.y + player.h - 6, 4, 3);

    // Armor
    const armorBody = armorSprite ? armorSprite.bodyColor : '#334155';
    const armorPlate = armorSprite ? armorSprite.plateColor : '#94a3b8';
    const armorHighlight = armorSprite ? armorSprite.highlightColor : '#e2e8f0';
    const armorTrim = armorSprite ? armorSprite.trimColor : '#fbbf24';
    const pauldronColor = armorSprite ? armorSprite.pauldronColor : '#64748b';
    const pauldronHighlight = armorSprite ? armorSprite.pauldronHighlight : '#cbd5e1';

    ctx.fillStyle = armorBody;
    ctx.fillRect(player.x + 2, player.y + 8, player.w - 4, player.h - 14);
    ctx.fillStyle = armorPlate;
    ctx.fillRect(player.x + 4, player.y + 9, player.w - 8, player.h - 16);
    ctx.fillStyle = armorHighlight;
    ctx.fillRect(player.x + 5, player.y + 9, 3, player.h - 16);

    ctx.fillStyle = armorTrim;
    ctx.fillRect(player.x + player.w / 2 - 2, player.y + 11, 4, 6);
    ctx.fillRect(player.x + player.w / 2 - 4, player.y + 13, 8, 2);

    // Pauldrons
    ctx.fillStyle = pauldronColor;
    ctx.fillRect(player.x - 2, player.y + 7, 5, 7);
    ctx.fillRect(player.x + player.w - 3, player.y + 7, 5, 7);
    ctx.fillStyle = pauldronHighlight;
    ctx.fillRect(player.x - 2, player.y + 7, 5, 2);
    ctx.fillRect(player.x + player.w - 3, player.y + 7, 5, 2);

    // Shield (offhand)
    if (player.facing !== 'right') {
        const sx = player.facing === 'left' ? player.x + 10 : player.x - 5;
        const sy = player.y + 9;
        const shieldBody = shieldSprite ? shieldSprite.bodyColor : '#1e3a8a';
        const shieldBorder = shieldSprite ? shieldSprite.borderColor : '#fbbf24';
        const shieldEmblem = shieldSprite ? shieldSprite.emblemColor : '#fbbf24';

        ctx.fillStyle = shieldBody;
        ctx.beginPath();
        ctx.moveTo(sx, sy);
        ctx.lineTo(sx + 10, sy);
        ctx.lineTo(sx + 10, sy + 10);
        ctx.quadraticCurveTo(sx + 5, sy + 16, sx + 5, sy + 17);
        ctx.quadraticCurveTo(sx + 5, sy + 16, sx, sy + 10);
        ctx.closePath();
        ctx.fill();
        ctx.strokeStyle = shieldBorder;
        ctx.lineWidth = 1.5;
        ctx.stroke();

        ctx.fillStyle = shieldEmblem;
        ctx.fillRect(sx + 4, sy + 3, 2, 8);
        ctx.fillRect(sx + 2, sy + 5, 6, 2);
    }

    // Helmet
    const headY = player.y - 3;
    const helmDome = helmetSprite ? helmetSprite.domeColor : '#475569';
    const helmHighlight = helmetSprite ? helmetSprite.domeHighlight : '#cbd5e1';
    const helmVisor = helmetSprite ? helmetSprite.visorColor : '#0f172a';
    const helmEyes = helmetSprite ? helmetSprite.eyeColor : '#00e5ff';
    const plumeColor = helmetSprite ? helmetSprite.plumeColor : '#ef4444';

    if (plumeColor) {
        ctx.fillStyle = plumeColor;
        ctx.beginPath();
        ctx.ellipse(player.x + player.w / 2, headY - 3, 3, 6, -0.3, 0, Math.PI * 2);
        ctx.fill();
    }

    ctx.fillStyle = helmDome;
    ctx.fillRect(player.x + 2, headY, player.w - 4, 12);
    ctx.fillStyle = helmHighlight;
    ctx.fillRect(player.x + 3, headY, player.w - 6, 3);
    ctx.fillStyle = helmVisor;
    ctx.fillRect(player.x + 3, headY + 5, player.w - 6, 4);

    ctx.fillStyle = helmEyes;
    ctx.shadowColor = helmEyes;
    ctx.shadowBlur = 8;
    if (player.facing === 'right') {
        ctx.fillRect(player.x + 10, headY + 6, 4, 2);
    } else if (player.facing === 'left') {
        ctx.fillRect(player.x + 4, headY + 6, 4, 2);
    } else if (player.facing === 'down') {
        ctx.fillRect(player.x + 5, headY + 6, 3, 2);
        ctx.fillRect(player.x + 10, headY + 6, 3, 2);
    } else {
        ctx.fillStyle = helmDome;
        ctx.fillRect(player.x + 3, headY + 4, player.w - 6, 7);
    }
}

// 2. MAGE MODEL (Penyihir)
function drawMageModel(ctx, px, py, capeSprite, armorSprite, helmetSprite, bootsSprite, shieldSprite) {
    const time = Date.now() * 0.006;
    const robeWave = Math.sin(time) * 2.5;

    const capeMain = capeSprite ? capeSprite.mainColor : '#4c1d95';
    const capeInner = capeSprite ? capeSprite.innerColor : '#7c3aed';
    const armorBody = armorSprite ? armorSprite.bodyColor : '#312e81';
    const armorPlate = armorSprite ? armorSprite.plateColor : '#6366f1';
    const armorTrim = armorSprite ? armorSprite.trimColor : '#fbbf24';

    // Flowing Astral Robe Back
    ctx.fillStyle = capeMain;
    ctx.beginPath();
    ctx.moveTo(player.x + 2, player.y + 8);
    ctx.quadraticCurveTo(player.x - 6 + robeWave, player.y + player.h + 8, player.x + 2, player.y + player.h + 9);
    ctx.lineTo(player.x + player.w - 2, player.y + player.h + 9);
    ctx.quadraticCurveTo(player.x + player.w + 6 - robeWave, player.y + player.h + 8, player.x + player.w - 2, player.y + 8);
    ctx.closePath();
    ctx.fill();

    // Robe hem trim
    ctx.strokeStyle = capeInner;
    ctx.lineWidth = 1.5;
    ctx.stroke();

    // Slippers / Sandals
    const bootColor = bootsSprite ? bootsSprite.bootColor : '#1e1b4b';
    ctx.fillStyle = bootColor;
    ctx.fillRect(player.x + 4, player.y + player.h - 4, 5, 4);
    ctx.fillRect(player.x + player.w - 9, player.y + player.h - 4, 5, 4);

    // Wizard Robe Body
    ctx.fillStyle = armorBody;
    ctx.fillRect(player.x + 3, player.y + 8, player.w - 6, player.h - 11);
    
    // Mystical Center Sash & Runes
    ctx.fillStyle = armorPlate;
    ctx.fillRect(player.x + player.w / 2 - 3, player.y + 9, 6, player.h - 12);
    ctx.fillStyle = armorTrim;
    ctx.fillRect(player.x + player.w / 2 - 1, player.y + 12, 2, 4);
    ctx.fillRect(player.x + player.w / 2 - 2, player.y + 17, 4, 2);
    ctx.fillRect(player.x + player.w / 2 - 1, player.y + 20, 2, 3);

    // Floating Mana Orb in offhand
    if (player.facing !== 'right') {
        const ox = player.facing === 'left' ? player.x + 12 : player.x - 7;
        const oy = player.y + 11 + Math.sin(time * 2) * 2;
        const orbColor = shieldSprite && shieldSprite.glowColor ? shieldSprite.glowColor : '#a855f7';

        ctx.save();
        ctx.shadowColor = orbColor;
        ctx.shadowBlur = 10;
        ctx.fillStyle = orbColor;
        ctx.beginPath();
        ctx.arc(ox + 4, oy + 4, 4, 0, Math.PI * 2);
        ctx.fill();
        ctx.fillStyle = '#ffffff';
        ctx.beginPath();
        ctx.arc(ox + 3, oy + 3, 1.5, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
    }

    // Wizard Pointed Hat / Cowl
    const headY = player.y - 3;
    const hatColor = helmetSprite ? helmetSprite.domeColor : '#581c87';
    const hatHighlight = helmetSprite ? helmetSprite.domeHighlight : '#9333ea';
    const hatBrim = helmetSprite ? helmetSprite.plumeColor : '#fbbf24';

    // Face / Shadow
    ctx.fillStyle = '#1e1b4b';
    ctx.fillRect(player.x + 3, headY + 3, player.w - 6, 8);

    // Glowing Magic Eyes
    const eyeColor = helmetSprite ? helmetSprite.eyeColor : '#c084fc';
    ctx.fillStyle = eyeColor;
    ctx.shadowColor = eyeColor;
    ctx.shadowBlur = 8;
    if (player.facing === 'right') {
        ctx.fillRect(player.x + 10, headY + 5, 3, 2);
    } else if (player.facing === 'left') {
        ctx.fillRect(player.x + 4, headY + 5, 3, 2);
    } else if (player.facing === 'down') {
        ctx.fillRect(player.x + 5, headY + 5, 2.5, 2);
        ctx.fillRect(player.x + 10, headY + 5, 2.5, 2);
    } else {
        ctx.fillStyle = hatColor;
        ctx.fillRect(player.x + 3, headY + 4, player.w - 6, 7);
    }

    // Wizard Hat Brim
    ctx.shadowBlur = 0;
    ctx.fillStyle = hatBrim || '#fbbf24';
    ctx.fillRect(player.x - 2, headY + 3, player.w + 4, 2);

    // Pointed Hat Cone
    ctx.fillStyle = hatColor;
    ctx.beginPath();
    ctx.moveTo(player.x, headY + 3);
    ctx.lineTo(player.x + player.w, headY + 3);
    ctx.lineTo(player.x + player.w / 2 - 3, headY - 10);
    ctx.lineTo(player.x + player.w / 2 - 6, headY - 8);
    ctx.closePath();
    ctx.fill();

    ctx.fillStyle = hatHighlight;
    ctx.fillRect(player.x + player.w / 2 - 2, headY - 1, 4, 3);
}

// 3. ASSASSIN MODEL (Pembunuh)
function drawAssassinModel(ctx, px, py, capeSprite, armorSprite, helmetSprite, bootsSprite, shieldSprite) {
    const time = Date.now() * 0.008;
    const scarfWave = Math.sin(time) * 3;

    const capeMain = capeSprite ? capeSprite.mainColor : '#18181b';
    const capeInner = capeSprite ? capeSprite.innerColor : '#27272a';
    const armorBody = armorSprite ? armorSprite.bodyColor : '#18181b';
    const armorPlate = armorSprite ? armorSprite.plateColor : '#27272a';
    const armorTrim = armorSprite ? armorSprite.trimColor : '#10b981';

    // Agile Scarf / Shadow Cloak
    ctx.fillStyle = capeMain;
    ctx.beginPath();
    if (player.facing === 'right') {
        ctx.moveTo(player.x + 2, player.y + 6);
        ctx.quadraticCurveTo(player.x - 14 + scarfWave, player.y + 12, player.x - 10, player.y + player.h + 4);
        ctx.lineTo(player.x + 4, player.y + player.h - 2);
    } else if (player.facing === 'left') {
        ctx.moveTo(player.x + player.w - 2, player.y + 6);
        ctx.quadraticCurveTo(player.x + player.w + 14 - scarfWave, player.y + 12, player.x + player.w + 10, player.y + player.h + 4);
        ctx.lineTo(player.x + player.w - 4, player.y + player.h - 2);
    } else {
        ctx.moveTo(player.x + 2, player.y + 6);
        ctx.quadraticCurveTo(player.x - 8 + scarfWave, player.y + player.h + 4, player.x + 3, player.y + player.h + 6);
        ctx.lineTo(player.x + player.w - 3, player.y + player.h + 6);
        ctx.quadraticCurveTo(player.x + player.w + 8 - scarfWave, player.y + player.h + 4, player.x + player.w - 2, player.y + 6);
    }
    ctx.closePath();
    ctx.fill();

    // Ninja Tabi Boots
    const bootColor = bootsSprite ? bootsSprite.bootColor : '#09090b';
    const bootTrim = bootsSprite ? bootsSprite.trimColor : '#10b981';
    ctx.fillStyle = bootColor;
    ctx.fillRect(player.x + 4, player.y + player.h - 6, 5, 6);
    ctx.fillRect(player.x + player.w - 9, player.y + player.h - 6, 5, 6);
    ctx.fillStyle = bootTrim;
    ctx.fillRect(player.x + 4, player.y + player.h - 6, 5, 2);
    ctx.fillRect(player.x + player.w - 9, player.y + player.h - 6, 5, 2);

    // Slim Stealth Leather Vest
    ctx.fillStyle = armorBody;
    ctx.fillRect(player.x + 3, player.y + 8, player.w - 6, player.h - 13);
    ctx.fillStyle = armorPlate;
    ctx.fillRect(player.x + 5, player.y + 9, player.w - 10, player.h - 15);

    // Crossed throwing knife harness
    ctx.fillStyle = armorTrim;
    ctx.fillRect(player.x + 4, player.y + 10, 2, 8);
    ctx.fillRect(player.x + player.w - 6, player.y + 10, 2, 8);
    ctx.fillRect(player.x + 5, player.y + 13, player.w - 10, 2);

    // Parrying Dagger / Claw in Left Hand
    if (player.facing !== 'right') {
        const dx = player.facing === 'left' ? player.x + 11 : player.x - 4;
        const dy = player.y + 9;
        ctx.fillStyle = '#64748b';
        ctx.fillRect(dx, dy, 3, 7);
        ctx.fillStyle = armorTrim;
        ctx.fillRect(dx - 1, dy + 2, 5, 2);
    }

    // Ninja Mask & Hood
    const headY = player.y - 3;
    const hoodColor = helmetSprite ? helmetSprite.domeColor : '#18181b';
    const maskColor = helmetSprite ? helmetSprite.visorColor : '#09090b';
    const eyeColor = helmetSprite ? helmetSprite.eyeColor : '#10b981';

    // Hood dome
    ctx.fillStyle = hoodColor;
    ctx.fillRect(player.x + 2, headY, player.w - 4, 11);
    ctx.fillRect(player.x + 4, headY - 2, player.w - 8, 3);

    // Lower face mask
    ctx.fillStyle = maskColor;
    ctx.fillRect(player.x + 3, headY + 5, player.w - 6, 6);

    // Piercing glowing assassin eyes
    ctx.fillStyle = eyeColor;
    ctx.shadowColor = eyeColor;
    ctx.shadowBlur = 8;
    if (player.facing === 'right') {
        ctx.fillRect(player.x + 9, headY + 4, 4, 1.8);
    } else if (player.facing === 'left') {
        ctx.fillRect(player.x + 4, headY + 4, 4, 1.8);
    } else if (player.facing === 'down') {
        ctx.fillRect(player.x + 5, headY + 4, 3, 1.8);
        ctx.fillRect(player.x + 9, headY + 4, 3, 1.8);
    } else {
        ctx.fillStyle = hoodColor;
        ctx.fillRect(player.x + 3, headY + 3, player.w - 6, 8);
    }
}

// WEAPON DRAWING (SWORD, STAFF, OR DUAL DAGGERS)
function drawSword(ctx, px, py) {
    ctx.save();
    ctx.translate(px, py);

    const role = (player && player.characterRole) ? player.characterRole : 'knight';
    const weaponSprite = getEquippedSprite(player.equipped, 'weapon');
    const bladeColor = weaponSprite ? weaponSprite.bladeColor : '#f8fafc';
    const bladeHighlight = weaponSprite ? weaponSprite.bladeHighlight : '#ffffff';
    const bladeShadow = weaponSprite ? weaponSprite.bladeShadow : '#94a3b8';
    const crossguardColor = weaponSprite ? weaponSprite.crossguardColor : '#fbbf24';
    const gripColor = weaponSprite ? weaponSprite.gripColor : '#78350f';
    const pommelColor = weaponSprite ? weaponSprite.pommelColor : '#e74c3c';
    const swordLength = weaponSprite ? weaponSprite.bladeLength : 26;
    const glowColor = weaponSprite ? weaponSprite.glowColor : null;
    const tipStyle = weaponSprite ? weaponSprite.tipStyle : 'normal';

    const baseAngle = getFacingAngle(player.facing);
    let weaponAngle = baseAngle;

    if (role === 'mage') {
        weaponAngle = player.isAttacking ? (baseAngle + Math.sin(player.slashArcProgress * Math.PI) * 0.15) : (baseAngle + 0.35);
    } else if (role === 'assassin') {
        weaponAngle = player.isAttacking ? (baseAngle - 0.35 + player.slashArcProgress * 0.7) : (baseAngle + 0.25);
    } else {
        if (player.isAttacking) {
            const sweepSpan = Math.PI * 0.85;
            weaponAngle = baseAngle - sweepSpan / 2 + sweepSpan * player.slashArcProgress;
        } else {
            weaponAngle = baseAngle + 0.35;
        }
    }

    ctx.rotate(weaponAngle);

    if (role === 'mage') {
        // --- MAGE STAFF / WAND ---
        const staffLen = player.isAttacking ? swordLength + 8 : swordLength;
        // Staff Shaft
        ctx.fillStyle = gripColor;
        ctx.fillRect(2, -2, staffLen - 8, 4);
        ctx.fillStyle = crossguardColor;
        ctx.fillRect(staffLen - 10, -3, 3, 6);
        // Crystal Gem Head
        ctx.shadowColor = glowColor || '#c084fc';
        ctx.shadowBlur = player.isAttacking ? 16 : 8;
        ctx.fillStyle = bladeColor;
        ctx.beginPath();
        ctx.arc(staffLen - 2, 0, 5.5, 0, Math.PI * 2);
        ctx.fill();
        ctx.fillStyle = bladeHighlight;
        ctx.beginPath();
        ctx.arc(staffLen - 3, -1, 2, 0, Math.PI * 2);
        ctx.fill();
        // Radiating rings during cast
        if (player.isAttacking) {
            ctx.strokeStyle = glowColor || '#c084fc';
            ctx.lineWidth = 1.8;
            ctx.beginPath();
            ctx.arc(staffLen + 4, 0, 6 + player.slashArcProgress * 6, 0, Math.PI * 2);
            ctx.stroke();
        }

    } else if (role === 'assassin') {
        // --- ASSASSIN DUAL DAGGERS ---
        const dLen = player.isAttacking ? swordLength + 4 : swordLength;
        ctx.shadowColor = glowColor || '#10b981';
        ctx.shadowBlur = player.isAttacking ? 10 : 3;
        
        // Main Dagger
        ctx.fillStyle = pommelColor;
        ctx.fillRect(2, -2, 3, 4);
        ctx.fillStyle = gripColor;
        ctx.fillRect(5, -1.5, 5, 3);
        ctx.fillStyle = crossguardColor;
        ctx.fillRect(10, -4, 2, 8);
        ctx.fillStyle = bladeColor;
        ctx.fillRect(12, -2, dLen - 12, 4);
        ctx.fillStyle = bladeHighlight;
        ctx.beginPath();
        ctx.moveTo(dLen, -2); ctx.lineTo(dLen + 4, 0); ctx.lineTo(dLen, 2);
        ctx.closePath();
        ctx.fill();

        // Offhand Second Dagger (Reverse Grip)
        if (player.isAttacking) {
            ctx.save();
            ctx.rotate(-0.85);
            ctx.fillStyle = bladeColor;
            ctx.fillRect(6, 6, dLen - 8, 3.5);
            ctx.fillStyle = bladeHighlight;
            ctx.beginPath();
            ctx.moveTo(dLen - 2, 6); ctx.lineTo(dLen + 3, 7.5); ctx.lineTo(dLen - 2, 9.5);
            ctx.closePath();
            ctx.fill();
            ctx.restore();
        }

    } else {
        // --- KNIGHT BROADSWORD ---
        const len = player.isAttacking ? swordLength + 8 : swordLength;
        ctx.fillStyle = pommelColor;
        ctx.beginPath(); ctx.arc(2, 0, 3, 0, Math.PI * 2); ctx.fill();

        ctx.fillStyle = gripColor; ctx.fillRect(4, -2.5, 5, 5);
        ctx.fillStyle = crossguardColor; ctx.fillRect(8, -6, 4, 12);
        ctx.fillStyle = bladeShadow; ctx.fillRect(10, -6, 2, 12);

        ctx.shadowColor = glowColor || '#00e5ff';
        ctx.shadowBlur = player.isAttacking ? 14 : 4;
        ctx.fillStyle = bladeColor; ctx.fillRect(12, -3.5, len - 12, 7);
        ctx.fillStyle = bladeShadow; ctx.fillRect(12, 0, len - 12, 3.5);

        ctx.fillStyle = bladeHighlight;
        ctx.beginPath();
        ctx.moveTo(len, -3.5); ctx.lineTo(len + 5, 0); ctx.lineTo(len, 3.5);
        ctx.closePath();
        ctx.fill();
        ctx.fillStyle = bladeHighlight; ctx.fillRect(12, -0.6, len - 10, 1.2);
    }

    ctx.restore();
}

function drawSlashArc(ctx, px, py) {
    if (!player.isAttacking) return;

    const role = (player && player.characterRole) ? player.characterRole : 'knight';
    const weaponSprite = getEquippedSprite(player.equipped, 'weapon');
    let slashColor = weaponSprite && weaponSprite.glowColor ? weaponSprite.glowColor : '#f1c40f';
    if (role === 'mage') slashColor = weaponSprite && weaponSprite.glowColor ? weaponSprite.glowColor : '#c084fc';
    if (role === 'assassin') slashColor = weaponSprite && weaponSprite.glowColor ? weaponSprite.glowColor : '#10b981';

    const baseAngle = getFacingAngle(player.facing);

    if (role === 'mage') {
        // MAGE CASTING SEAL (Pulsing rune ring at staff tip)
        ctx.save();
        const tipDist = 26;
        const tipX = px + Math.cos(baseAngle) * tipDist;
        const tipY = py + Math.sin(baseAngle) * tipDist;
        const ringRadius = 6 + player.slashArcProgress * 14;
        const alpha = Math.max(0, 1 - player.slashArcProgress);
        
        ctx.strokeStyle = `rgba(192, 132, 252, ${alpha})`;
        ctx.lineWidth = 2.5;
        ctx.beginPath();
        ctx.arc(tipX, tipY, ringRadius, 0, Math.PI * 2);
        ctx.stroke();

        ctx.strokeStyle = `rgba(255, 255, 255, ${alpha})`;
        ctx.lineWidth = 1.5;
        ctx.beginPath();
        ctx.arc(tipX, tipY, ringRadius * 0.5, 0, Math.PI * 2);
        ctx.stroke();
        ctx.restore();
        return;
    }

    if (role === 'assassin') {
        // ASSASSIN TWIN CROSS-SLASH (X-Cut)
        ctx.save();
        const progress = player.slashArcProgress;
        const slashLen = 18 * progress;
        const cx = px + Math.cos(baseAngle) * 22;
        const cy = py + Math.sin(baseAngle) * 22;
        
        ctx.save();
        ctx.translate(cx, cy);
        ctx.rotate(baseAngle);
        
        // Dagger 1 slash line
        ctx.strokeStyle = slashColor;
        ctx.lineWidth = 3.5;
        ctx.lineCap = 'round';
        ctx.beginPath();
        ctx.moveTo(-slashLen * 0.7, -slashLen);
        ctx.lineTo(slashLen * 0.7, slashLen);
        ctx.stroke();

        // Dagger 2 slash line
        ctx.strokeStyle = '#34d399';
        ctx.lineWidth = 3;
        ctx.beginPath();
        ctx.moveTo(-slashLen * 0.7, slashLen);
        ctx.lineTo(slashLen * 0.7, -slashLen);
        ctx.stroke();

        // Bright white core
        ctx.strokeStyle = '#ffffff';
        ctx.lineWidth = 1.5;
        ctx.beginPath();
        ctx.moveTo(-slashLen * 0.3, 0);
        ctx.lineTo(slashLen * 0.3, 0);
        ctx.stroke();

        ctx.restore();
        ctx.restore();
        return;
    }

    // KNIGHT HEAVY CLEAVE ARC
    const sweepSpan = Math.PI * 0.85;
    const startAngle = baseAngle - sweepSpan / 2;
    const currentAngle = startAngle + sweepSpan * player.slashArcProgress;
    const radius = 46;

    ctx.save();
    ctx.beginPath();
    ctx.arc(px, py, radius, startAngle, currentAngle, false);
    ctx.lineWidth = 10;
    ctx.strokeStyle = slashColor;
    ctx.lineCap = 'round';
    ctx.stroke();

    ctx.beginPath();
    ctx.arc(px, py, radius, startAngle + (currentAngle - startAngle) * 0.25, currentAngle, false);
    ctx.lineWidth = 4;
    ctx.strokeStyle = '#ffffff';
    ctx.lineCap = 'round';
    ctx.stroke();
    ctx.restore();
}
