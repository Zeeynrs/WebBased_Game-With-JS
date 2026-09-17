// --- DUNGEON DRAWING ---

function drawDungeonFloor() {
    const canvas = document.getElementById('gameCanvas');
    const ctx = canvas.getContext('2d');

    ctx.fillStyle = '#0a0d14';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    const playTop = 46;

    const tileSize = 48;
    for (let x = 0; x < canvas.width; x += tileSize) {
        for (let y = playTop; y < canvas.height; y += tileSize) {
            const isAlt = ((x / tileSize) + (y / tileSize)) % 2 === 0;
            ctx.fillStyle = isAlt ? '#0f1420' : '#0c101a';
            ctx.fillRect(x, y, tileSize, tileSize);

            ctx.strokeStyle = '#161d2d';
            ctx.lineWidth = 1;
            ctx.strokeRect(x + 1, y + 1, tileSize - 2, tileSize - 2);

            ctx.fillStyle = '#1c263b';
            ctx.fillRect(x + 8, y + 12, 3, 2);
            ctx.fillRect(x + 32, y + 28, 2, 2);
            ctx.fillRect(x + 20, y + 38, 3, 3);
            ctx.fillStyle = '#080a10';
            ctx.fillRect(x + 11, y + 14, 2, 1);
            ctx.fillRect(x + 23, y + 41, 1, 2);
        }
    }

    ctx.fillStyle = '#161d2a';
    ctx.fillRect(0, playTop, canvas.width, 18);
    ctx.fillStyle = '#2a364d';
    ctx.fillRect(0, playTop, canvas.width, 3);

    ctx.fillStyle = '#101622';
    for (let x = 0; x < canvas.width; x += 16) {
        const teethH = 4 + (x % 7);
        ctx.fillRect(x, playTop + 18, 12, teethH);
        ctx.fillStyle = '#222d40';
        ctx.fillRect(x, playTop + 18, 12, 1);
        ctx.fillStyle = '#101622';
    }

    ctx.fillStyle = '#161d2a';
    ctx.fillRect(0, playTop, 16, canvas.height - playTop);
    ctx.fillRect(canvas.width - 16, playTop, 16, canvas.height - playTop);

    ctx.fillStyle = '#253147';
    for (let y = playTop; y < canvas.height; y += 24) {
        ctx.fillRect(14, y + 4, 4, 12);
        ctx.fillRect(canvas.width - 18, y + 10, 4, 12);
    }

    ctx.fillStyle = '#161d2a';
    ctx.fillRect(0, canvas.height - 16, canvas.width, 16);
    ctx.fillStyle = '#253147';
    ctx.fillRect(0, canvas.height - 16, canvas.width, 3);

    walls.forEach(w => {
        ctx.fillStyle = 'rgba(0, 0, 0, 0.45)';
        ctx.fillRect(w.x + 4, w.y + w.h, w.w - 4, 6);

        ctx.fillStyle = '#1c2536';
        ctx.fillRect(w.x, w.y, w.w, w.h);

        const capH = Math.min(10, w.h / 2);
        ctx.fillStyle = '#334361';
        ctx.fillRect(w.x, w.y, w.w, capH);

        ctx.fillStyle = '#4c618a';
        ctx.fillRect(w.x, w.y, w.w, 2);

        ctx.fillStyle = '#111724';
        ctx.fillRect(w.x, w.y + capH, w.w, 2);

        for (let bx = w.x + 16; bx < w.x + w.w; bx += 32) {
            ctx.fillRect(bx, w.y, 2, capH);
            ctx.fillRect(bx - 8, w.y + capH, 2, w.h - capH);
        }

        for (let by = w.y + capH + 16; by < w.y + w.h; by += 16) {
            ctx.fillRect(w.x, by, w.w, 2);
        }

        ctx.strokeStyle = '#0b0f19';
        ctx.lineWidth = 2;
        ctx.strokeRect(w.x, w.y, w.w, w.h);
    });
}

function drawTorchesAndSmoke() {
    const canvas = document.getElementById('gameCanvas');
    const ctx = canvas.getContext('2d');

    torches.forEach(t => {
        ctx.save();
        const glowGrad = ctx.createRadialGradient(t.x, t.y, 2, t.x, t.y, 55);
        glowGrad.addColorStop(0, 'rgba(255, 120, 0, 0.22)');
        glowGrad.addColorStop(0.5, 'rgba(255, 80, 0, 0.08)');
        glowGrad.addColorStop(1, 'rgba(0, 0, 0, 0)');
        ctx.fillStyle = glowGrad;
        ctx.beginPath();
        ctx.arc(t.x, t.y, 55, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
    });

    smokeParticles.forEach(sm => {
        const opacity = (sm.life / sm.maxLife) * 0.45;
        ctx.fillStyle = `rgba(160, 175, 200, ${opacity})`;
        ctx.beginPath();
        ctx.arc(sm.x, sm.y, sm.size, 0, Math.PI * 2);
        ctx.fill();
    });

    torches.forEach(t => {
        ctx.fillStyle = '#2d3748';
        ctx.fillRect(t.x - 5, t.y + 2, 10, 6);
        ctx.fillStyle = '#1a202c';
        ctx.fillRect(t.x - 3, t.y + 3, 6, 4);

        ctx.fillStyle = '#6e4726';
        ctx.fillRect(t.x - 2, t.y - 4, 4, 12);
        ctx.fillStyle = '#4a2e16';
        ctx.fillRect(t.x, t.y - 4, 2, 12);

        ctx.fillStyle = '#3a4a63';
        ctx.fillRect(t.x - 4, t.y - 7, 8, 4);

        ctx.save();
        ctx.shadowColor = '#ff6d00';
        ctx.shadowBlur = 14;

        const flickerX = (Math.random() - 0.5) * 1.5;
        const flameSize = 6 + Math.random() * 3;

        ctx.fillStyle = '#ff3d00';
        ctx.beginPath();
        ctx.arc(t.x + flickerX, t.y - 11, flameSize, 0, Math.PI * 2);
        ctx.fill();

        ctx.fillStyle = '#ffc107';
        ctx.beginPath();
        ctx.arc(t.x + flickerX, t.y - 12, flameSize * 0.65, 0, Math.PI * 2);
        ctx.fill();

        ctx.fillStyle = '#ffffff';
        ctx.beginPath();
        ctx.arc(t.x + flickerX * 0.5, t.y - 13, flameSize * 0.35, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
    });
}

function drawDungeonGate() {
    const canvas = document.getElementById('gameCanvas');
    const ctx = canvas.getContext('2d');

    ctx.save();

    const gx = dungeonGate.x + dungeonGate.w / 2;
    const gy = dungeonGate.y + dungeonGate.h / 2;

    ctx.fillStyle = '#1c2638';
    ctx.fillRect(dungeonGate.x - 4, dungeonGate.y - 4, dungeonGate.w + 8, dungeonGate.h + 8);

    ctx.fillStyle = '#3a4b6e';
    ctx.fillRect(dungeonGate.x - 4, dungeonGate.y - 4, dungeonGate.w + 8, 4);
    ctx.fillRect(dungeonGate.x - 4, dungeonGate.y - 4, 4, dungeonGate.h + 8);
    ctx.fillRect(dungeonGate.x + dungeonGate.w, dungeonGate.y - 4, 4, dungeonGate.h + 8);

    ctx.fillStyle = '#526691';
    ctx.fillRect(gx - 6, dungeonGate.y - 6, 12, 6);
    ctx.strokeStyle = '#101622';
    ctx.lineWidth = 1;
    ctx.strokeRect(gx - 6, dungeonGate.y - 6, 12, 6);

    if (dungeonGate.open) {
        ctx.shadowColor = '#00e5ff';
        ctx.shadowBlur = 18;

        ctx.fillStyle = '#060a14';
        ctx.fillRect(dungeonGate.x, dungeonGate.y, dungeonGate.w, dungeonGate.h);

        ctx.fillStyle = '#3d2516';
        ctx.fillRect(dungeonGate.x - 3, dungeonGate.y, 6, dungeonGate.h);
        ctx.fillRect(dungeonGate.x + dungeonGate.w - 3, dungeonGate.y, 6, dungeonGate.h);
        ctx.fillStyle = '#1e120a';
        ctx.fillRect(dungeonGate.x + 1, dungeonGate.y, 2, dungeonGate.h);
        ctx.fillRect(dungeonGate.x + dungeonGate.w - 3, dungeonGate.y, 2, dungeonGate.h);

        ctx.strokeStyle = '#00e5ff';
        ctx.lineWidth = 3;
        ctx.beginPath();
        ctx.arc(gx, gy, 15, dungeonGate.swirlTimer, dungeonGate.swirlTimer + Math.PI * 1.5);
        ctx.stroke();

        ctx.strokeStyle = '#a855f7';
        ctx.lineWidth = 2.5;
        ctx.beginPath();
        ctx.arc(gx, gy, 9, -dungeonGate.swirlTimer * 1.3, -dungeonGate.swirlTimer * 1.3 + Math.PI * 1.5);
        ctx.stroke();

        ctx.fillStyle = '#ffffff';
        ctx.beginPath();
        ctx.arc(gx, gy, 4 + Math.sin(dungeonGate.swirlTimer * 2) * 1.5, 0, Math.PI * 2);
        ctx.fill();

        for (let i = 0; i < 4; i++) {
            const angle = dungeonGate.swirlTimer + i * 1.57;
            const px = gx + Math.cos(angle) * 13;
            const py = gy + Math.sin(angle) * 13;
            ctx.fillStyle = '#00e5ff';
            ctx.fillRect(px, py, 2.5, 2.5);
        }

        ctx.fillStyle = '#2ecc71';
        ctx.font = '8px "Press Start 2P", monospace';
        ctx.textAlign = 'center';
        ctx.fillText('PORTAL \u{1F300}', gx, dungeonGate.y - 9);
        ctx.textAlign = 'left';

    } else {
        const halfW = dungeonGate.w / 2;

        ctx.fillStyle = '#5c3d2e';
        ctx.fillRect(dungeonGate.x, dungeonGate.y, halfW - 1, dungeonGate.h);

        ctx.fillStyle = '#4a2e1b';
        ctx.fillRect(dungeonGate.x + halfW + 1, dungeonGate.y, halfW - 1, dungeonGate.h);

        ctx.fillStyle = '#29190e';
        ctx.fillRect(dungeonGate.x + 6, dungeonGate.y, 1.5, dungeonGate.h);
        ctx.fillRect(dungeonGate.x + 13, dungeonGate.y, 1.5, dungeonGate.h);
        ctx.fillRect(dungeonGate.x + halfW + 7, dungeonGate.y, 1.5, dungeonGate.h);
        ctx.fillRect(dungeonGate.x + halfW + 14, dungeonGate.y, 1.5, dungeonGate.h);

        ctx.fillStyle = '#110a05';
        ctx.fillRect(dungeonGate.x + halfW - 1, dungeonGate.y, 2, dungeonGate.h);

        ctx.fillStyle = '#2d3748';
        ctx.fillRect(dungeonGate.x, dungeonGate.y + 10, dungeonGate.w, 4);
        ctx.fillRect(dungeonGate.x, dungeonGate.y + dungeonGate.h - 14, dungeonGate.w, 4);

        ctx.fillStyle = '#a0aec0';
        ctx.fillRect(dungeonGate.x + 3, dungeonGate.y + 11, 2, 2);
        ctx.fillRect(dungeonGate.x + dungeonGate.w - 5, dungeonGate.y + 11, 2, 2);
        ctx.fillRect(dungeonGate.x + 3, dungeonGate.y + dungeonGate.h - 13, 2, 2);
        ctx.fillRect(dungeonGate.x + dungeonGate.w - 5, dungeonGate.y + dungeonGate.h - 13, 2, 2);

        ctx.strokeStyle = '#e2e8f0';
        ctx.lineWidth = 1.5;
        ctx.beginPath(); ctx.arc(dungeonGate.x + halfW - 4, gy + 4, 3.5, 0, Math.PI * 2); ctx.stroke();
        ctx.beginPath(); ctx.arc(dungeonGate.x + halfW + 4, gy + 4, 3.5, 0, Math.PI * 2); ctx.stroke();

        ctx.fillStyle = '#e74c3c';
        ctx.beginPath();
        ctx.moveTo(gx, gy - 10);
        ctx.lineTo(gx + 8, gy - 6);
        ctx.lineTo(gx + 8, gy + 2);
        ctx.quadraticCurveTo(gx, gy + 9, gx, gy + 11);
        ctx.quadraticCurveTo(gx, gy + 9, gx - 8, gy + 2);
        ctx.lineTo(gx - 8, gy - 6);
        ctx.closePath();
        ctx.fill();

        ctx.strokeStyle = '#f1c40f';
        ctx.lineWidth = 1.5;
        ctx.stroke();

        ctx.fillStyle = '#111827';
        ctx.beginPath();
        ctx.arc(gx, gy - 2, 2.5, 0, Math.PI * 2);
        ctx.fill();
        ctx.fillRect(gx - 1.5, gy - 2, 3, 5);

        ctx.fillStyle = '#ff4d4d';
        ctx.font = '7px "Press Start 2P", monospace';
        ctx.textAlign = 'center';
        ctx.fillText('TERKUNCI \u{1F512}', gx, dungeonGate.y - 9);
        ctx.textAlign = 'left';
    }

    ctx.restore();
}
