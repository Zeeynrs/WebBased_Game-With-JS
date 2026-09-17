// --- MOB RENDERING ---

function drawZombieMob(ctx, mob, cx, cy, groundY) {
    const time = Date.now() * 0.008 + mob.id;
    const wobble = Math.sin(time) * 2.5;

    ctx.save();
    ctx.fillStyle = 'rgba(0, 0, 0, 0.35)';
    ctx.beginPath();
    ctx.ellipse(cx, groundY - 2, mob.w * 0.5, 4, 0, 0, Math.PI * 2);
    ctx.fill();

    ctx.fillStyle = '#1b263b';
    ctx.fillRect(cx - 6, cy + 4, 5, 10);
    ctx.fillRect(cx + 1, cy + 4, 5, 10);

    ctx.fillStyle = '#3a5a40';
    ctx.fillRect(cx - 8 + wobble * 0.5, cy - 8, 16, 13);
    ctx.fillStyle = '#1e2923';
    ctx.fillRect(cx - 4 + wobble * 0.5, cy - 3, 4, 4);

    ctx.fillStyle = '#2d6a4f';
    ctx.fillRect(cx - 14 + wobble, cy - 4, 8, 4);
    ctx.fillRect(cx + 6 + wobble, cy - 4, 8, 4);

    const headY = cy - 18;
    ctx.fillStyle = '#40916c';
    ctx.fillRect(cx - 7, headY, 14, 11);

    ctx.fillStyle = '#1b4332';
    ctx.fillRect(cx - 7, headY, 14, 3);

    ctx.fillStyle = '#081c15';
    ctx.fillRect(cx - 5, headY + 4, 4, 3);
    ctx.fillRect(cx + 1, headY + 4, 4, 3);
    ctx.fillStyle = '#ef4444';
    ctx.fillRect(cx - 4, headY + 5, 2, 1.5);
    ctx.fillRect(cx + 2, headY + 5, 2, 1.5);

    ctx.fillStyle = '#081c15';
    ctx.fillRect(cx - 3, headY + 8, 6, 2);
    ctx.fillStyle = '#74c69d';
    ctx.fillRect(cx - 1, headY + 9, 2, 3);

    if (mob.type === 'boss') {
        ctx.fillStyle = '#f1c40f';
        ctx.fillRect(cx - 8, headY - 5, 16, 4);
    }

    ctx.restore();
}

function drawSkeletonMob(ctx, mob, cx, cy, groundY) {
    const time = Date.now() * 0.01 + mob.id;
    const rattle = Math.sin(time * 2) * 1.5;

    ctx.save();
    ctx.fillStyle = 'rgba(0, 0, 0, 0.35)';
    ctx.beginPath();
    ctx.ellipse(cx, groundY - 2, mob.w * 0.5, 3.5, 0, 0, Math.PI * 2);
    ctx.fill();

    ctx.fillStyle = '#e2e8f0';
    ctx.fillRect(cx - 5, cy + 5, 3, 9);
    ctx.fillRect(cx + 2, cy + 5, 3, 9);

    ctx.fillStyle = '#94a3b8';
    ctx.fillRect(cx - 1, cy - 6, 2, 11);

    ctx.fillStyle = '#f8fafc';
    ctx.fillRect(cx - 6 + rattle * 0.3, cy - 6, 12, 2);
    ctx.fillRect(cx - 5 + rattle * 0.3, cy - 3, 10, 2);
    ctx.fillRect(cx - 4 + rattle * 0.3, cy, 8, 2);

    ctx.fillStyle = '#e2e8f0';
    ctx.fillRect(cx - 9 + rattle, cy - 4, 5, 3);
    ctx.fillRect(cx + 4 + rattle, cy - 4, 5, 3);

    const bowX = cx + 8 + rattle;
    const bowY = cy - 2;

    ctx.strokeStyle = '#d97706';
    ctx.lineWidth = 2.5;
    ctx.beginPath();
    ctx.arc(bowX, bowY, 11, -Math.PI * 0.45, Math.PI * 0.45);
    ctx.stroke();

    ctx.strokeStyle = '#e2e8f0';
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.moveTo(bowX + Math.cos(-Math.PI * 0.45) * 11, bowY + Math.sin(-Math.PI * 0.45) * 11);
    ctx.lineTo(bowX - 3, bowY);
    ctx.lineTo(bowX + Math.cos(Math.PI * 0.45) * 11, bowY + Math.sin(Math.PI * 0.45) * 11);
    ctx.stroke();

    ctx.fillStyle = '#78350f';
    ctx.fillRect(bowX - 6, bowY - 1, 14, 2);
    ctx.fillStyle = '#cbd5e1';
    ctx.beginPath();
    ctx.moveTo(bowX + 11, bowY);
    ctx.lineTo(bowX + 7, bowY - 3);
    ctx.lineTo(bowX + 7, bowY + 3);
    ctx.closePath();
    ctx.fill();
    ctx.fillStyle = '#f8fafc';
    ctx.fillRect(bowX - 7, bowY - 2, 3, 4);

    const headY = cy - 17;
    ctx.fillStyle = '#f8fafc';
    ctx.fillRect(cx - 6, headY, 12, 10);

    ctx.fillStyle = '#0f172a';
    ctx.fillRect(cx - 5, headY + 3, 4, 3);
    ctx.fillRect(cx + 1, headY + 3, 4, 3);
    ctx.fillRect(cx - 1, headY + 6, 2, 2);

    ctx.fillStyle = '#64748b';
    ctx.fillRect(cx - 4, headY + 8, 8, 1.5);

    if (mob.type === 'boss') {
        ctx.fillStyle = '#f1c40f';
        ctx.fillRect(cx - 7, headY - 5, 14, 4);
        ctx.fillRect(cx - 7, headY - 8, 4, 3);
        ctx.fillRect(cx - 1, headY - 10, 3, 5);
        ctx.fillRect(cx + 3, headY - 8, 4, 3);
    }

    ctx.restore();
}

function drawDragonMob(ctx, mob, cx, cy, groundY) {
    const time = Date.now() * 0.006 + mob.id;
    const flyZ = 16 + Math.sin(time * 3) * 8;
    const wingFlap = Math.sin(time * 6) * 0.35;

    const drawY = cy - flyZ;

    ctx.save();

    ctx.fillStyle = 'rgba(0, 0, 0, 0.35)';
    ctx.beginPath();
    ctx.ellipse(cx, groundY - 2, mob.w * 0.55 * (1 - flyZ * 0.015), 6, 0, 0, Math.PI * 2);
    ctx.fill();

    ctx.strokeStyle = '#991b1b';
    ctx.lineWidth = 6;
    ctx.lineCap = 'round';
    ctx.beginPath();
    ctx.moveTo(cx + mob.w * 0.2, drawY + 10);
    ctx.quadraticCurveTo(cx + mob.w * 0.6 + Math.sin(time * 2) * 8, drawY + 22, cx + mob.w * 0.7, drawY + 30);
    ctx.stroke();

    ctx.fillStyle = '#7f1d1d';
    ctx.beginPath();
    ctx.moveTo(cx + mob.w * 0.7, drawY + 30);
    ctx.lineTo(cx + mob.w * 0.8, drawY + 26);
    ctx.lineTo(cx + mob.w * 0.75, drawY + 36);
    ctx.closePath();
    ctx.fill();

    ctx.save();
    ctx.translate(cx - 10, drawY - 6);
    ctx.rotate(-0.2 + wingFlap);
    ctx.fillStyle = '#b91c1c';
    ctx.beginPath();
    ctx.moveTo(0, 0);
    ctx.quadraticCurveTo(-26, -28, -42, -14);
    ctx.quadraticCurveTo(-28, 4, 0, 10);
    ctx.closePath();
    ctx.fill();
    ctx.strokeStyle = '#7f1d1d';
    ctx.lineWidth = 2;
    ctx.stroke();
    ctx.restore();

    ctx.save();
    ctx.translate(cx + 10, drawY - 6);
    ctx.rotate(0.2 - wingFlap);
    ctx.fillStyle = '#b91c1c';
    ctx.beginPath();
    ctx.moveTo(0, 0);
    ctx.quadraticCurveTo(26, -28, 42, -14);
    ctx.quadraticCurveTo(28, 4, 0, 10);
    ctx.closePath();
    ctx.fill();
    ctx.strokeStyle = '#7f1d1d';
    ctx.lineWidth = 2;
    ctx.stroke();
    ctx.restore();

    ctx.fillStyle = '#dc2626';
    ctx.beginPath();
    ctx.ellipse(cx, drawY + 4, mob.w * 0.38, mob.h * 0.32, 0, 0, Math.PI * 2);
    ctx.fill();
    ctx.strokeStyle = '#7f1d1d';
    ctx.lineWidth = 2;
    ctx.stroke();

    ctx.fillStyle = '#f59e0b';
    ctx.beginPath();
    ctx.ellipse(cx - 2, drawY + 7, mob.w * 0.22, mob.h * 0.22, 0, 0, Math.PI * 2);
    ctx.fill();

    ctx.fillStyle = '#7f1d1d';
    ctx.fillRect(cx - 3, drawY - mob.h * 0.28, 6, 8);
    ctx.fillRect(cx - 3, drawY - mob.h * 0.15, 6, 8);

    const headY = drawY - mob.h * 0.28;

    ctx.fillStyle = '#b91c1c';
    ctx.beginPath();
    ctx.ellipse(cx, headY, mob.w * 0.28, mob.h * 0.2, 0, 0, Math.PI * 2);
    ctx.fill();
    ctx.stroke();

    ctx.fillStyle = '#fbbf24';
    ctx.shadowColor = '#fbbf24';
    ctx.shadowBlur = 8;
    ctx.beginPath(); ctx.arc(cx - 8, headY - 3, 3.5, 0, Math.PI * 2); ctx.fill();
    ctx.beginPath(); ctx.arc(cx + 8, headY - 3, 3.5, 0, Math.PI * 2); ctx.fill();
    ctx.fillStyle = '#000000';
    ctx.fillRect(cx - 9, headY - 4, 2, 3);
    ctx.fillRect(cx + 7, headY - 4, 2, 3);

    ctx.fillStyle = '#111111';
    ctx.fillRect(cx - 4, headY + 3, 2, 2);
    ctx.fillRect(cx + 2, headY + 3, 2, 2);

    if (mob.dragonTimer && mob.dragonTimer > 40) {
        ctx.fillStyle = '#ff6d00';
        ctx.shadowColor = '#ff6d00';
        ctx.shadowBlur = 12;
        ctx.beginPath();
        ctx.arc(cx, headY + 5, 5, 0, Math.PI * 2);
        ctx.fill();
    }

    ctx.fillStyle = '#f1c40f';
    ctx.beginPath();
    ctx.moveTo(cx - 10, headY - 6);
    ctx.lineTo(cx - 18, headY - 18);
    ctx.lineTo(cx - 6, headY - 8);
    ctx.closePath();
    ctx.fill();

    ctx.beginPath();
    ctx.moveTo(cx + 10, headY - 6);
    ctx.lineTo(cx + 18, headY - 18);
    ctx.lineTo(cx + 6, headY - 8);
    ctx.closePath();
    ctx.fill();

    if (mob.type === 'boss') {
        ctx.fillStyle = '#f1c40f';
        ctx.fillRect(cx - 10, headY - 12, 20, 5);
        ctx.fillRect(cx - 10, headY - 17, 5, 5);
        ctx.fillRect(cx - 2, headY - 20, 4, 8);
        ctx.fillRect(cx + 5, headY - 17, 5, 5);
    }

    ctx.restore();

    if (mob.clawTimer && mob.clawTimer > 0) {
        ctx.save();
        ctx.shadowColor = '#ef4444';
        ctx.shadowBlur = 16;
        ctx.strokeStyle = '#ef4444';
        ctx.lineWidth = 4;
        ctx.lineCap = 'round';

        const clawProgress = (18 - mob.clawTimer) / 18;
        const clawX = player.x + player.w / 2;
        const clawY = player.y + player.h / 2;

        for (let k = -1; k <= 1; k++) {
            ctx.beginPath();
            ctx.moveTo(clawX - 18 + k * 10, clawY - 20 + clawProgress * 15);
            ctx.lineTo(clawX - 6 + k * 10, clawY + 15 + clawProgress * 15);
            ctx.stroke();
        }
        ctx.restore();
    }
}

function drawSlimeMob(ctx, mob, cx, cy, groundY, scaleX, scaleY, hopZ) {
    const rx = (mob.w / 2) * scaleX;
    const ry = (mob.h / 2) * scaleY;

    ctx.save();
    ctx.fillStyle = 'rgba(0, 0, 0, 0.35)';
    ctx.beginPath();
    ctx.ellipse(cx, groundY - 2, Math.max(4, (mob.w / 2 + 4) * (1.8 - scaleX * 0.7)), Math.max(2, 4.5 * (1.8 - scaleY * 0.7)), 0, 0, Math.PI * 2);
    ctx.fill();

    ctx.fillStyle = mob.color;
    ctx.beginPath();
    ctx.ellipse(cx, groundY - 3 - hopZ * 0.25, rx * 1.5, Math.max(3, ry * 0.35), 0, 0, Math.PI * 2);
    ctx.fill();

    ctx.beginPath(); ctx.ellipse(cx - rx * 1.7, groundY + 1, 5 * scaleX, 2.5 * scaleY, 0, 0, Math.PI * 2); ctx.fill();
    ctx.beginPath(); ctx.ellipse(cx + rx * 1.6, groundY + 2, 6 * scaleX, 2.2 * scaleY, 0, 0, Math.PI * 2); ctx.fill();
    ctx.beginPath(); ctx.ellipse(cx - rx * 1.2, groundY + 4, 4 * scaleX, 2 * scaleY, 0, 0, Math.PI * 2); ctx.fill();
    ctx.beginPath(); ctx.ellipse(cx + rx * 1.2, groundY + 5, 4.5 * scaleX, 2.2 * scaleY, 0, 0, Math.PI * 2); ctx.fill();

    if (mob.type === 'boss') {
        const crownY = cy - ry - 8;
        ctx.fillStyle = '#f1c40f';
        ctx.fillRect(cx - 12, crownY - 6, 24, 5);
        ctx.fillRect(cx - 12, crownY - 11, 5, 5);
        ctx.fillRect(cx - 2, crownY - 14, 4, 8);
        ctx.fillRect(cx + 7, crownY - 11, 5, 5);
        ctx.fillStyle = '#e74c3c';
        ctx.fillRect(cx - 1, crownY - 9, 2, 2);
        ctx.strokeStyle = '#111';
        ctx.lineWidth = 1;
        ctx.strokeRect(cx - 12, crownY - 6, 24, 5);
    }

    ctx.shadowColor = mob.color;
    ctx.shadowBlur = 8;
    ctx.fillStyle = mob.color;
    ctx.strokeStyle = '#142010';
    ctx.lineWidth = 2.2;

    ctx.beginPath();
    ctx.moveTo(cx - rx * 1.2, cy + ry);
    ctx.bezierCurveTo(cx - rx * 1.1, cy - ry * 0.3, cx - rx * 0.75, cy - ry * 1.1, cx, cy - ry * 1.1);
    ctx.bezierCurveTo(cx + rx * 0.75, cy - ry * 1.1, cx + rx * 1.1, cy - ry * 0.3, cx + rx * 1.2, cy + ry);
    ctx.quadraticCurveTo(cx, cy + ry * 1.2, cx - rx * 1.2, cy + ry);
    ctx.closePath();
    ctx.fill();
    ctx.stroke();
    ctx.restore();

    ctx.fillStyle = 'rgba(255, 255, 255, 0.45)';
    ctx.beginPath();
    ctx.ellipse(cx + rx * 0.3, cy - ry * 0.6, rx * 0.32, ry * 0.28, 0.2, 0, Math.PI * 2);
    ctx.fill();

    ctx.fillStyle = 'rgba(255, 255, 255, 0.75)';
    ctx.beginPath(); ctx.arc(cx - rx * 0.45, cy - ry * 0.4, 2.5 * scaleX, 0, Math.PI * 2); ctx.fill();
    ctx.beginPath(); ctx.arc(cx + rx * 0.5, cy - ry * 0.1, 2.2 * scaleX, 0, Math.PI * 2); ctx.fill();
    ctx.beginPath(); ctx.arc(cx - rx * 0.6, cy + ry * 0.3, 3.0 * scaleX, 0, Math.PI * 2); ctx.fill();

    const eyeY = cy - ry * 0.25;
    const eyeW = Math.max(3, rx * 0.28);
    const eyeH = Math.max(3, ry * 0.22);

    ctx.fillStyle = '#ffffff';
    ctx.fillRect(cx - rx * 0.45, eyeY, eyeW, eyeH);
    ctx.fillStyle = '#1c2918';
    ctx.fillRect(cx - rx * 0.45, eyeY, eyeW, Math.max(1, eyeH * 0.45));

    ctx.fillStyle = '#ffffff';
    ctx.fillRect(cx + rx * 0.17, eyeY, eyeW, eyeH);
    ctx.fillStyle = '#1c2918';
    ctx.fillRect(cx + rx * 0.17, eyeY, eyeW, Math.max(1, eyeH * 0.45));

    const mouthY = cy + ry * 0.05;
    const mouthW = rx * 0.65;
    const mouthH = ry * 0.5;

    ctx.fillStyle = '#110b1a';
    ctx.beginPath();
    ctx.ellipse(cx, mouthY + mouthH / 2, mouthW / 2, mouthH / 2, 0, 0, Math.PI * 2);
    ctx.fill();
    ctx.strokeStyle = '#1c2918';
    ctx.lineWidth = 1.2;
    ctx.stroke();

    ctx.fillStyle = mob.color;
    ctx.fillRect(cx - mouthW * 0.3, mouthY, 2.5, mouthH * 0.55);
    ctx.fillRect(cx, mouthY, 3, mouthH * 0.7);
    ctx.fillRect(cx + mouthW * 0.25, mouthY, 2.5, mouthH * 0.45);
}

function drawAllMobs(ctx) {
    mobs.forEach(mob => {
        const hopTimer = mob.hopTimer || 0;
        const bounceSin = Math.sin(hopTimer);
        const isAirborne = bounceSin > 0.2;
        const maxHop = mob.type === 'boss' ? 14 : 10;
        const hopZ = mob.species === 'slime' ? Math.max(0, bounceSin) * maxHop : 0;

        let scaleX = 1.0;
        let scaleY = 1.0;

        if (isAirborne) {
            scaleX = 0.82;
            scaleY = 1.22;
        } else {
            scaleX = 1.28;
            scaleY = 0.72;
        }

        const cx = mob.x + mob.w / 2;
        const groundY = mob.y + mob.h;
        const cy = mob.y + mob.h / 2 - hopZ;
        const rx = (mob.w / 2) * scaleX;
        const ry = (mob.h / 2) * scaleY;

        if (mob.species === 'zombie') {
            drawZombieMob(ctx, mob, cx, cy, groundY);
        } else if (mob.species === 'skeleton') {
            drawSkeletonMob(ctx, mob, cx, cy, groundY);
        } else if (mob.species === 'dragon') {
            drawDragonMob(ctx, mob, cx, cy, groundY);
        } else {
            drawSlimeMob(ctx, mob, cx, cy, groundY, scaleX, scaleY, hopZ);
        }

        // Level badge & health bar
        const barY = cy - (mob.species === 'slime' ? ry * 1.2 : mob.h * 0.5) - 16;
        const levelText = mob.level || `Lv.${currentStage}`;
        ctx.font = '7px "Press Start 2P", monospace';
        ctx.textAlign = 'center';

        const textW = ctx.measureText(levelText).width;
        const pillW = Math.max(mob.w + 6, textW + 8);
        const pillX = cx - pillW / 2;

        ctx.fillStyle = 'rgba(10, 14, 23, 0.88)';
        ctx.fillRect(pillX, barY - 10, pillW, 11);
        ctx.strokeStyle = mob.color || '#2ecc71';
        ctx.lineWidth = 1;
        ctx.strokeRect(pillX, barY - 10, pillW, 11);

        if (mob.type === 'boss') ctx.fillStyle = '#f1c40f';
        else if (mob.species === 'zombie') ctx.fillStyle = '#52b788';
        else if (mob.species === 'skeleton') ctx.fillStyle = '#f8fafc';
        else if (mob.color === '#2ecc71') ctx.fillStyle = '#2ecc71';
        else if (mob.color === '#3498db') ctx.fillStyle = '#00e5ff';
        else ctx.fillStyle = '#c084fc';

        ctx.fillText(levelText, cx, barY - 2);

        ctx.fillStyle = '#0f172a';
        ctx.fillRect(cx - pillW / 2, barY + 2, pillW, 5);
        ctx.fillStyle = mob.color || '#2ecc71';
        ctx.fillRect(cx - pillW / 2, barY + 2, pillW * Math.max(0, mob.hp / mob.maxHp), 5);
        ctx.strokeStyle = '#334155';
        ctx.lineWidth = 0.8;
        ctx.strokeRect(cx - pillW / 2, barY + 2, pillW, 5);

        ctx.textAlign = 'left';
    });
}
