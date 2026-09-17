// --- HUD & OVERLAY DRAWING (WITH CHARACTER SELECTION MENU) ---

function drawTopHUD() {
    const canvas = document.getElementById('gameCanvas');
    const ctx = canvas.getContext('2d');

    ctx.fillStyle = '#0c1017';
    ctx.fillRect(0, 0, canvas.width, 46);
    ctx.fillStyle = '#2b354a';
    ctx.fillRect(0, 44, canvas.width, 2);

    // 1. HP Bar
    ctx.fillStyle = '#1a202c';
    ctx.fillRect(10, 6, 125, 14);
    ctx.strokeStyle = '#4a5568';
    ctx.lineWidth = 1.5;
    ctx.strokeRect(10, 6, 125, 14);

    const hpRatio = Math.max(0, player.hp / player.maxHp);
    const hpGradient = ctx.createLinearGradient(12, 0, 133, 0);
    hpGradient.addColorStop(0, '#e74c3c');
    hpGradient.addColorStop(1, '#2ecc71');
    ctx.fillStyle = hpGradient;
    ctx.fillRect(12, 8, 121 * hpRatio, 10);

    ctx.fillStyle = '#ffffff';
    ctx.font = '8px "Press Start 2P", monospace';
    ctx.fillText(`HP ${Math.ceil(player.hp)}/${player.maxHp}`, 16, 17);

    // 2. ARMOR Bar
    ctx.fillStyle = '#1a202c';
    ctx.fillRect(10, 24, 125, 14);
    ctx.strokeStyle = '#4a5568';
    ctx.lineWidth = 1.5;
    ctx.strokeRect(10, 24, 125, 14);

    const shieldRatio = Math.max(0, player.shield / player.maxShield);
    const shieldGradient = ctx.createLinearGradient(12, 0, 133, 0);
    shieldGradient.addColorStop(0, '#0091ea');
    shieldGradient.addColorStop(1, '#00e5ff');
    ctx.fillStyle = shieldGradient;
    ctx.fillRect(12, 26, 121 * shieldRatio, 10);

    ctx.fillStyle = '#ffffff';
    ctx.font = '8px "Press Start 2P", monospace';
    ctx.fillText(`ARMOR ${Math.ceil(player.shield)}/${player.maxShield}`, 16, 35);

    // 3. STAGE TITLE
    const currentStageObj = STAGE_CONFIGS[Math.min(currentStage - 1, STAGE_CONFIGS.length - 1)];
    const stageName = currentStageObj ? currentStageObj.name : `CAVE DEPTH ${currentStage}`;

    ctx.fillStyle = '#1a202c';
    ctx.fillRect(142, 8, 220, 28);
    ctx.strokeStyle = '#f1c40f';
    ctx.lineWidth = 1.5;
    ctx.strokeRect(142, 8, 220, 28);

    ctx.fillStyle = '#f1c40f';
    ctx.font = '8px "Press Start 2P", monospace';
    ctx.textAlign = 'center';
    ctx.fillText(`STAGE ${currentStage}: ${stageName}`, 252, 25);
    ctx.textAlign = 'left';

    // 4. COINS & SCORE
    ctx.fillStyle = '#ffd700';
    ctx.font = '8px "Press Start 2P", monospace';
    ctx.fillText(`🪙 ${player.gold}`, 370, 18);

    ctx.fillStyle = '#ffffff';
    ctx.font = '8px "Press Start 2P", monospace';
    ctx.fillText(`SCORE:${score.toString().padStart(5, '0')}`, 370, 35);

    // 5. PAUSE BUTTON
    const pauseBtnX = canvas.width - 64;
    const pauseBtnY = 9;
    ctx.fillStyle = isHovering(pauseBtnX, pauseBtnY, 26, 26) ? '#3a4760' : '#1e2636';
    ctx.fillRect(pauseBtnX, pauseBtnY, 26, 26);
    ctx.strokeStyle = '#4a5568';
    ctx.lineWidth = 1.5;
    ctx.strokeRect(pauseBtnX, pauseBtnY, 26, 26);
    ctx.font = '12px sans-serif';
    ctx.fillText(gameState === 'PAUSED' ? '▶️' : '⏸️', pauseBtnX + 5, pauseBtnY + 18);

    // 6. AUDIO BUTTON
    const btnX = canvas.width - 34;
    const btnY = 9;
    ctx.fillStyle = isHovering(btnX, btnY, 26, 26) ? '#3a4760' : '#1e2636';
    ctx.fillRect(btnX, btnY, 26, 26);
    ctx.strokeStyle = '#4a5568';
    ctx.lineWidth = 1.5;
    ctx.strokeRect(btnX, btnY, 26, 26);
    ctx.font = '12px sans-serif';
    ctx.fillText(soundEnabled ? '🔊' : '🔇', btnX + 4, btnY + 18);
}

function drawSkillHUD(ctx, canvas) {
    const startX = 10;
    const startY = canvas.height - 44;
    const slotW = 36;
    const slotH = 32;
    const gap = 4;

    for (let i = 0; i < skillSlots.length; i++) {
        const slot = skillSlots[i];
        const skill = getSkillData(i);
        if (!skill) continue;

        const x = startX + i * (slotW + gap);
        const unlocked = isSkillUnlocked(i);
        const onCooldown = slot.cooldownTimer > 0;

        ctx.fillStyle = unlocked ? '#1a202c' : '#0f1117';
        ctx.fillRect(x, startY, slotW, slotH);

        if (onCooldown && unlocked) {
            const ratio = slot.cooldownTimer / skill.cooldown;
            ctx.fillStyle = 'rgba(0, 0, 0, 0.65)';
            ctx.fillRect(x, startY, slotW, slotH * ratio);
        }

        ctx.strokeStyle = unlocked ? (onCooldown ? '#4a5568' : skill.color) : '#334155';
        ctx.lineWidth = unlocked && !onCooldown ? 2 : 1;
        ctx.strokeRect(x, startY, slotW, slotH);

        ctx.font = '14px sans-serif';
        ctx.textAlign = 'center';
        ctx.fillStyle = unlocked ? '#fff' : '#4a5568';
        ctx.fillText(skill.icon, x + slotW / 2, startY + 18);

        ctx.font = '7px "Press Start 2P", monospace';
        ctx.fillStyle = '#a0aec0';
        ctx.fillText(`${i + 1}`, x + slotW / 2, startY + 30);

        if (onCooldown && unlocked) {
            ctx.font = '8px "Press Start 2P", monospace';
            ctx.fillStyle = '#ff9800';
            const secs = Math.ceil(slot.cooldownTimer / 60);
            ctx.fillText(`${secs}s`, x + slotW / 2, startY + 14);
        }

        if (!unlocked) {
            ctx.font = '10px sans-serif';
            ctx.fillStyle = '#ff4d4d';
            ctx.fillText('🔒', x + slotW / 2, startY + 14);
        }

        ctx.textAlign = 'left';
    }

    if (dungeonGate.open && gameState === 'PLAYING') {
        ctx.fillStyle = 'rgba(10, 14, 23, 0.85)';
        ctx.fillRect(canvas.width - 124, canvas.height - 28, 114, 20);
        ctx.strokeStyle = '#f1c40f';
        ctx.lineWidth = 1;
        ctx.strokeRect(canvas.width - 124, canvas.height - 28, 114, 20);
        ctx.fillStyle = '#f1c40f';
        ctx.font = '7px "Press Start 2P", monospace';
        ctx.textAlign = 'center';
        ctx.fillText('[B] TOKO 🛒', canvas.width - 67, canvas.height - 14);
        ctx.textAlign = 'left';
    }
}

function drawMenuOverlay() {
    const canvas = document.getElementById('gameCanvas');
    const ctx = canvas.getContext('2d');

    ctx.fillStyle = 'rgba(6, 9, 15, 0.94)';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Title
    ctx.textAlign = 'center';
    ctx.fillStyle = '#f1c40f';
    ctx.font = '18px "Press Start 2P", monospace';
    ctx.fillText('ARC SLASH ARPG', canvas.width / 2, 34);

    ctx.fillStyle = '#e2e8f0';
    ctx.font = '8px "Press Start 2P", monospace';
    ctx.fillText('--- PILIH KARAKTER & JALUR KELAS ---', canvas.width / 2, 54);

    // 3 Character Selection Cards
    const roles = ['knight', 'mage', 'assassin'];
    const cardW = 186;
    const cardH = 206;
    const cardY = 66;
    const gap = 14;
    const totalW = 3 * cardW + 2 * gap;
    const startX = (canvas.width - totalW) / 2;

    const time = Date.now() * 0.005;

    for (let i = 0; i < roles.length; i++) {
        const roleKey = roles[i];
        const roleData = CHARACTER_ROLES[roleKey];
        const cx = startX + i * (cardW + gap);
        const isSelected = (selectedRole === roleKey);
        const hovered = isHovering(cx, cardY, cardW, cardH);

        // Card background
        ctx.fillStyle = isSelected ? 'rgba(30, 58, 138, 0.35)' : (hovered ? 'rgba(30, 41, 59, 0.7)' : 'rgba(15, 23, 42, 0.85)');
        ctx.fillRect(cx, cardY, cardW, cardH);

        // Card Border
        ctx.strokeStyle = isSelected ? '#fbbf24' : (hovered ? roleData.color : '#334155');
        ctx.lineWidth = isSelected ? 2.5 : 1;
        ctx.strokeRect(cx, cardY, cardW, cardH);

        // Selection Crown / Badge
        if (isSelected) {
            ctx.fillStyle = '#f59e0b';
            ctx.fillRect(cx + cardW / 2 - 40, cardY - 8, 80, 16);
            ctx.fillStyle = '#111827';
            ctx.font = '7px "Press Start 2P", monospace';
            ctx.fillText('DIPILIH ✓', cx + cardW / 2, cardY + 4);
        }

        // Role Title
        ctx.fillStyle = roleData.color;
        ctx.font = '9px "Press Start 2P", monospace';
        ctx.fillText(`${roleData.icon} ${roleData.name.split(' ')[0]}`, cx + cardW / 2, cardY + 24);

        ctx.fillStyle = '#94a3b8';
        ctx.font = '7px "Press Start 2P", monospace';
        ctx.fillText(roleData.title, cx + cardW / 2, cardY + 38);

        // Animated Mini Character Avatar Preview
        drawMiniCharacterAvatar(ctx, roleKey, cx + cardW / 2, cardY + 74, time);

        // Stat ratings
        ctx.font = '7px "Press Start 2P", monospace';
        ctx.textAlign = 'left';
        
        ctx.fillStyle = '#ef4444';
        ctx.fillText(`HP  ${roleData.rating.hp}`, cx + 16, cardY + 115);
        ctx.fillStyle = '#f59e0b';
        ctx.fillText(`ATK ${roleData.rating.atk}`, cx + 16, cardY + 130);
        ctx.fillStyle = '#10b981';
        ctx.fillText(`SPD ${roleData.rating.spd}`, cx + 16, cardY + 145);
        ctx.fillStyle = '#38bdf8';
        ctx.fillText(`DEF ${roleData.rating.def}`, cx + 16, cardY + 160);

        // Short Trait description
        ctx.textAlign = 'center';
        ctx.fillStyle = '#cbd5e1';
        ctx.font = '6.5px "Press Start 2P", monospace';
        ctx.fillText(roleData.desc.slice(0, 24), cx + cardW / 2, cardY + 182);
        ctx.fillText(roleData.desc.slice(24), cx + cardW / 2, cardY + 195);
    }

    // Start Button
    const btnX = canvas.width / 2 - 100;
    const btnY = 285;
    const btnHovered = isHovering(btnX, btnY, 200, 42);

    ctx.fillStyle = btnHovered ? '#22c55e' : '#16a34a';
    ctx.fillRect(btnX, btnY, 200, 42);
    ctx.strokeStyle = '#86efac';
    ctx.lineWidth = 2;
    ctx.strokeRect(btnX, btnY, 200, 42);

    ctx.fillStyle = '#ffffff';
    ctx.font = '11px "Press Start 2P", monospace';
    ctx.fillText('MULAI BERMAIN', canvas.width / 2, btnY + 26);

    // Controls hints at bottom
    ctx.fillStyle = '#94a3b8';
    ctx.font = '7px "Press Start 2P", monospace';
    ctx.fillText('Pilih Karakter: Klik / [1][2][3] | Mulai: [SPASI] / [ENTER]', canvas.width / 2, 345);
    ctx.fillText('Gerak: WASD | Tebas: J/Spasi | Skill: 1,2,3 | Toko: B | Pause: ESC', canvas.width / 2, 362);
    ctx.textAlign = 'left';
}

function drawMiniCharacterAvatar(ctx, role, x, y, time) {
    const bob = Math.sin(time * 3) * 1.5;
    ctx.save();
    ctx.translate(x, y + bob);

    if (role === 'knight') {
        // Mini Knight
        ctx.fillStyle = '#991b1b'; // cape
        ctx.fillRect(-8, -8, 16, 22);
        ctx.fillStyle = '#475569'; // body
        ctx.fillRect(-6, -6, 12, 16);
        ctx.fillStyle = '#94a3b8'; // chest
        ctx.fillRect(-4, -4, 8, 8);
        ctx.fillStyle = '#0f172a'; // visor
        ctx.fillRect(-4, -9, 8, 3);
        ctx.fillStyle = '#00e5ff'; // eye
        ctx.fillRect(0, -9, 3, 2);
        ctx.fillStyle = '#ef4444'; // plume
        ctx.fillRect(-2, -13, 4, 4);
        ctx.fillStyle = '#fbbf24'; // sword
        ctx.fillRect(8, -10, 3, 18);
        ctx.fillStyle = '#1e3a8a'; // shield
        ctx.fillRect(-12, -2, 5, 10);
    } else if (role === 'mage') {
        // Mini Mage
        ctx.fillStyle = '#4c1d95'; // robe
        ctx.fillRect(-7, -6, 14, 20);
        ctx.fillStyle = '#7c3aed'; // inner
        ctx.fillRect(-4, -4, 8, 14);
        ctx.fillStyle = '#581c87'; // hat
        ctx.beginPath();
        ctx.moveTo(-9, -7); ctx.lineTo(9, -7); ctx.lineTo(0, -18);
        ctx.closePath(); ctx.fill();
        ctx.fillStyle = '#fbbf24'; // star
        ctx.fillRect(-1, -12, 2, 2);
        ctx.fillStyle = '#c084fc'; // eye
        ctx.fillRect(1, -6, 3, 2);
        ctx.fillStyle = '#a855f7'; // staff
        ctx.fillRect(8, -14, 2.5, 22);
        ctx.shadowColor = '#00e5ff'; ctx.shadowBlur = 8;
        ctx.fillStyle = '#00e5ff'; // gem orb
        ctx.beginPath(); ctx.arc(9, -15, 3.5, 0, Math.PI*2); ctx.fill();
    } else if (role === 'assassin') {
        // Mini Assassin
        ctx.fillStyle = '#18181b'; // cloak
        ctx.fillRect(-7, -7, 14, 20);
        ctx.fillStyle = '#27272a'; // vest
        ctx.fillRect(-4, -4, 8, 14);
        ctx.fillStyle = '#10b981'; // mask straps
        ctx.fillRect(-4, 0, 8, 2);
        ctx.fillStyle = '#000000'; // hood
        ctx.fillRect(-5, -11, 10, 8);
        ctx.fillStyle = '#10b981'; // eyes
        ctx.fillRect(0, -8, 3, 1.5);
        ctx.fillStyle = '#cbd5e1'; // dual daggers
        ctx.fillRect(8, -6, 2, 12);
        ctx.fillRect(-10, -4, 2, 10);
    }

    ctx.restore();
}

function drawPauseOverlay() {
    const canvas = document.getElementById('gameCanvas');
    const ctx = canvas.getContext('2d');

    ctx.fillStyle = 'rgba(6, 9, 15, 0.88)';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    ctx.textAlign = 'center';
    ctx.fillStyle = '#f1c40f';
    ctx.font = '20px "Press Start 2P", monospace';
    ctx.fillText('GAME PAUSED', canvas.width / 2, 110);

    ctx.fillStyle = '#a0aec0';
    ctx.font = '10px "Press Start 2P", monospace';
    ctx.fillText(`STAGE ${currentStage} - PENGATURAN PAUSE`, canvas.width / 2, 140);

    const btn1X = canvas.width / 2 - 110;
    const btn1Y = 180;
    const h1 = isHovering(btn1X, btn1Y, 220, 42);
    ctx.fillStyle = h1 ? '#27ae60' : '#2ecc71';
    ctx.fillRect(btn1X, btn1Y, 220, 42);
    ctx.strokeStyle = '#ffffff';
    ctx.lineWidth = 2;
    ctx.strokeRect(btn1X, btn1Y, 220, 42);
    ctx.fillStyle = '#ffffff';
    ctx.font = '10px "Press Start 2P", monospace';
    ctx.fillText('RESUME PLAY [ESC]', canvas.width / 2, btn1Y + 26);

    const btn2X = canvas.width / 2 - 110;
    const btn2Y = 236;
    const h2 = isHovering(btn2X, btn2Y, 220, 42);
    ctx.fillStyle = h2 ? '#d35400' : '#e67e22';
    ctx.fillRect(btn2X, btn2Y, 220, 42);
    ctx.strokeStyle = '#ffffff';
    ctx.lineWidth = 2;
    ctx.strokeRect(btn2X, btn2Y, 220, 42);
    ctx.fillStyle = '#ffffff';
    ctx.font = '10px "Press Start 2P", monospace';
    ctx.fillText('RESTART STAGE [R]', canvas.width / 2, btn2Y + 26);

    const btn3X = canvas.width / 2 - 110;
    const btn3Y = 292;
    const h3 = isHovering(btn3X, btn3Y, 220, 42);
    ctx.fillStyle = h3 ? '#c0392b' : '#e74c3c';
    ctx.fillRect(btn3X, btn3Y, 220, 42);
    ctx.strokeStyle = '#ffffff';
    ctx.lineWidth = 2;
    ctx.strokeRect(btn3X, btn3Y, 220, 42);
    ctx.fillStyle = '#ffffff';
    ctx.font = '10px "Press Start 2P", monospace';
    ctx.fillText('EXIT TO MENU [QUIT]', canvas.width / 2, btn3Y + 26);

    ctx.textAlign = 'left';
}

function drawGameOverOverlay() {
    const canvas = document.getElementById('gameCanvas');
    const ctx = canvas.getContext('2d');

    ctx.fillStyle = 'rgba(15, 5, 8, 0.88)';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    ctx.textAlign = 'center';
    ctx.fillStyle = '#e74c3c';
    ctx.font = '24px "Press Start 2P", monospace';
    ctx.fillText('DEFEATED', canvas.width / 2, 120);

    ctx.fillStyle = '#ecf0f1';
    ctx.font = '11px "Press Start 2P", monospace';
    ctx.fillText(`Mencapai Stage ${currentStage}`, canvas.width / 2, 160);
    ctx.fillText(`Skor Akhir: ${score}`, canvas.width / 2, 185);

    const btnX = canvas.width / 2 - 90;
    const btnY = 230;
    const hovered = isHovering(btnX, btnY, 180, 44);

    ctx.fillStyle = hovered ? '#c0392b' : '#e74c3c';
    ctx.fillRect(btnX, btnY, 180, 44);
    ctx.strokeStyle = '#ffffff';
    ctx.lineWidth = 2;
    ctx.strokeRect(btnX, btnY, 180, 44);

    ctx.fillStyle = '#ffffff';
    ctx.font = '11px "Press Start 2P", monospace';
    ctx.fillText('MAIN LAGI [R]', canvas.width / 2, btnY + 26);
    ctx.textAlign = 'left';
}
