// --- EFFECTS RENDERING ---

function drawCoins(ctx) {
    coins.forEach(c => {
        const drawY = c.y - c.z;
        ctx.save();
        ctx.translate(c.x, drawY);

        ctx.fillStyle = 'rgba(0,0,0,0.35)';
        ctx.beginPath();
        ctx.ellipse(0, c.z, 6, 3, 0, 0, Math.PI * 2);
        ctx.fill();

        ctx.fillStyle = '#f1c40f';
        ctx.beginPath();
        ctx.arc(0, 0, 6, 0, Math.PI * 2);
        ctx.fill();

        ctx.strokeStyle = '#d4ac0d';
        ctx.lineWidth = 1.5;
        ctx.stroke();

        ctx.fillStyle = '#fff59d';
        ctx.fillRect(-2, -2, 4, 4);

        ctx.restore();
    });
}

function drawLoots(ctx) {
    loots.forEach(l => {
        const floatOffset = Math.sin(l.floatTimer) * 4;
        ctx.save();
        ctx.translate(l.x, l.y + floatOffset);

        ctx.fillStyle = 'rgba(0,0,0,0.35)';
        ctx.beginPath();
        ctx.ellipse(0, 9 - floatOffset, 8, 3.5, 0, 0, Math.PI * 2);
        ctx.fill();

        if (l.type === 'health') {
            ctx.shadowColor = '#ff1744';
            ctx.shadowBlur = 10;
            ctx.fillStyle = '#ff1744';
            ctx.beginPath();
            ctx.moveTo(0, 6);
            ctx.bezierCurveTo(-9, -2, -9, -11, 0, -4);
            ctx.bezierCurveTo(9, -11, 9, -2, 0, 6);
            ctx.closePath();
            ctx.fill();

            ctx.strokeStyle = '#ffffff';
            ctx.lineWidth = 1.5;
            ctx.stroke();

            ctx.fillStyle = '#ffffff';
            ctx.fillRect(-3, -6, 2, 2);
        } else if (l.type === 'shield') {
            ctx.shadowColor = '#00e5ff';
            ctx.shadowBlur = 10;
            ctx.fillStyle = '#00e5ff';
            ctx.beginPath();
            ctx.moveTo(-8, -8);
            ctx.lineTo(8, -8);
            ctx.lineTo(8, -1);
            ctx.quadraticCurveTo(8, 9, 0, 13);
            ctx.quadraticCurveTo(-8, 9, -8, -1);
            ctx.closePath();
            ctx.fill();

            ctx.strokeStyle = '#ffffff';
            ctx.lineWidth = 1.8;
            ctx.stroke();

            ctx.fillStyle = '#ffea00';
            ctx.fillRect(-2, -5, 4, 11);
            ctx.fillRect(-6, -2, 12, 4);
        }

        ctx.restore();
    });
}

function drawEnemyProjectiles(ctx) {
    enemyProjectiles.forEach(arr => {
        ctx.save();
        ctx.translate(arr.x, arr.y);
        ctx.rotate(arr.angle);

        if (arr.type === 'fireball') {
            ctx.shadowColor = '#ff6d00';
            ctx.shadowBlur = 14;

            ctx.fillStyle = '#ff3d00';
            ctx.beginPath();
            ctx.arc(0, 0, 9, 0, Math.PI * 2);
            ctx.fill();

            ctx.fillStyle = '#ffc107';
            ctx.beginPath();
            ctx.arc(0, 0, 5.5, 0, Math.PI * 2);
            ctx.fill();

            ctx.fillStyle = '#ffffff';
            ctx.beginPath();
            ctx.arc(0, 0, 2.5, 0, Math.PI * 2);
            ctx.fill();
        } else {
            ctx.strokeStyle = 'rgba(0, 0, 0, 0.35)';
            ctx.lineWidth = 2;
            ctx.beginPath();
            ctx.moveTo(-16, 2);
            ctx.lineTo(4, 2);
            ctx.stroke();

            ctx.fillStyle = '#78350f';
            ctx.fillRect(-10, -1, 16, 2);

            ctx.fillStyle = '#e2e8f0';
            ctx.beginPath();
            ctx.moveTo(9, 0);
            ctx.lineTo(5, -3);
            ctx.lineTo(5, 3);
            ctx.closePath();
            ctx.fill();

            ctx.fillStyle = '#ffffff';
            ctx.beginPath();
            ctx.moveTo(-10, -1);
            ctx.lineTo(-13, -4);
            ctx.lineTo(-8, -1);
            ctx.closePath();
            ctx.fill();

            ctx.beginPath();
            ctx.moveTo(-10, 1);
            ctx.lineTo(-13, 4);
            ctx.lineTo(-8, 1);
            ctx.closePath();
            ctx.fill();
        }

        ctx.restore();
    });
}

function drawPlayerProjectiles(ctx) {
    if (typeof playerProjectiles === 'undefined') return;
    playerProjectiles.forEach(p => {
        ctx.save();
        ctx.translate(p.x, p.y);
        ctx.rotate(p.angle);

        // Glowing magical missile with radiant energy halo
        ctx.shadowColor = p.color || '#c084fc';
        ctx.shadowBlur = 12;

        // Outer magical aura
        ctx.fillStyle = p.color || '#c084fc';
        ctx.beginPath();
        ctx.ellipse(0, 0, 8, 5, 0, 0, Math.PI * 2);
        ctx.fill();

        // Bright sparkling white core
        ctx.fillStyle = '#ffffff';
        ctx.beginPath();
        ctx.ellipse(2, 0, 4, 2.5, 0, 0, Math.PI * 2);
        ctx.fill();

        // Stream trail
        ctx.strokeStyle = p.color || '#38bdf8';
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.moveTo(-4, 0);
        ctx.lineTo(-12, 0);
        ctx.stroke();

        ctx.restore();
    });
}

function drawParticles(ctx) {
    particles.forEach(p => {
        ctx.fillStyle = p.color;
        ctx.fillRect(p.x, p.y, p.size, p.size);
    });
}

function drawFloatingTexts(ctx) {
    floatingTexts.forEach(d => {
        ctx.font = 'bold 11px "Press Start 2P", monospace';
        ctx.fillStyle = '#111';
        ctx.fillText(d.text, d.x + 1, d.y + 1);
        ctx.fillStyle = d.color || '#ffeb3b';
        ctx.fillText(d.text, d.x, d.y);
    });
}

// Skill active visual effects
function drawSkillEffects(ctx) {
    const px = player.x + player.w / 2;
    const py = player.y + player.h / 2;
    
    // Whirlwind active aura (Knight Skill 1)
    if (skillSlots[0] && skillSlots[0].isActive && skillSlots[0].activeTimer > 0) {
        const skill = getSkillData(0) || getSkillData('skill_whirlwind');
        if (skill && skill.duration) {
            const progress = 1 - (skillSlots[0].activeTimer / skill.duration);
            const radius = (skill.radius || 80) * (0.5 + progress * 0.5);
            const alpha = 0.4 * (1 - progress);
            
            ctx.save();
            ctx.strokeStyle = `rgba(241, 196, 15, ${alpha})`;
            ctx.lineWidth = 3;
            ctx.beginPath();
            ctx.arc(px, py, radius, Date.now() * 0.01, Date.now() * 0.01 + Math.PI * 1.5);
            ctx.stroke();
            
            ctx.strokeStyle = `rgba(255, 255, 255, ${alpha * 0.5})`;
            ctx.lineWidth = 2;
            ctx.beginPath();
            ctx.arc(px, py, radius * 0.7, -Date.now() * 0.015, -Date.now() * 0.015 + Math.PI);
            ctx.stroke();
            ctx.restore();
        }
    }
}
