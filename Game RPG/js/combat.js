// --- COMBAT SYSTEM (DISTINCT BASIC ATTACKS PER CLASS & ENEMY SCALING) ---

function getFacingAngle(facing) {
    if (facing === 'right') return 0;
    if (facing === 'down') return Math.PI / 2;
    if (facing === 'left') return Math.PI;
    if (facing === 'up') return -Math.PI / 2;
    return 0;
}

function updateCombat() {
    const canvas = document.getElementById('gameCanvas');
    const role = player.characterRole || 'knight';
    const px = player.x + player.w / 2;
    const py = player.y + player.h / 2;
    const baseAngle = getFacingAngle(player.facing);
    
    if (player.attackCooldown > 0) player.attackCooldown--;
    if (player.invulnerableTimer > 0) player.invulnerableTimer--;

    // Start Basic Attack
    if ((keys['j'] || keys[' ']) && player.attackCooldown === 0 && !player.isAttacking) {
        player.isAttacking = true;
        player.attackTime = 0;
        player.hitMobsThisSwing.clear();

        if (role === 'mage') {
            // === MAGE BASIC ATTACK: RANGED MAGIC BOLT ===
            player.attackDuration = 9;
            player.attackCooldown = 14;
            
            const wandSprite = getEquippedSprite(player.equipped, 'weapon');
            const boltColor = (wandSprite && wandSprite.glowColor) ? wandSprite.glowColor : '#c084fc';
            const boltSpeed = 6.8;
            
            playerProjectiles.push({
                x: px + Math.cos(baseAngle) * 16,
                y: py + Math.sin(baseAngle) * 16,
                vx: Math.cos(baseAngle) * boltSpeed,
                vy: Math.sin(baseAngle) * boltSpeed,
                angle: baseAngle,
                type: 'magic_bolt',
                dmg: Math.floor(Math.random() * 6) + getPlayerDamage() + 2,
                color: boltColor,
                life: 85
            });
            
            playSound('skill');
            
        } else if (role === 'assassin') {
            // === ASSASSIN BASIC ATTACK: RAPID DUAL CROSS-SLASH & MINI-LUNGE ===
            player.attackDuration = 7;
            player.attackCooldown = 9; // very fast attack speed!
            
            // Mini forward lunge
            const lungeX = player.x + Math.cos(baseAngle) * 4;
            const lungeY = player.y + Math.sin(baseAngle) * 4;
            if (!checkWallCollision(lungeX, player.y, player.w, player.h)) player.x = lungeX;
            if (!checkWallCollision(player.x, lungeY, player.w, player.h)) player.y = lungeY;
            
            playSound('slash');
            
        } else {
            // === KNIGHT BASIC ATTACK: HEAVY BROAD ARC SWEEP ===
            player.attackDuration = 12;
            player.attackCooldown = 18;
            playSound('slash');
        }
    }

    // Process Melee Attacks (Knight & Assassin)
    if (player.isAttacking) {
        player.attackTime++;
        player.slashArcProgress = player.attackTime / player.attackDuration;

        const playerDmgBase = getPlayerDamage();

        if (role === 'knight') {
            // --- KNIGHT: HEAVY CLEAVE ARC ---
            const sweepSpan = Math.PI * 0.85;
            const currentAngle = baseAngle - sweepSpan / 2 + sweepSpan * player.slashArcProgress;
            const arcRadius = 46;

            const sparkX = px + Math.cos(currentAngle) * (arcRadius - 2 + Math.random() * 4);
            const sparkY = py + Math.sin(currentAngle) * (arcRadius - 2 + Math.random() * 4);
            particles.push({
                x: sparkX, y: sparkY,
                vx: (Math.random() - 0.5) * 1.2,
                vy: (Math.random() - 0.5) * 1.2,
                size: Math.random() * 3 + 1.5,
                color: Math.random() > 0.3 ? '#fbbf24' : '#fff',
                life: 12
            });

            mobs.forEach(mob => {
                if (player.hitMobsThisSwing.has(mob.id)) return;
                const mx = mob.x + mob.w / 2;
                const my = mob.y + mob.h / 2;
                const dist = Math.hypot(mx - px, my - py);

                if (dist <= arcRadius + mob.w / 2) {
                    let angleToMob = Math.atan2(my - py, mx - px);
                    let diffAngle = angleToMob - baseAngle;
                    while (diffAngle > Math.PI) diffAngle -= Math.PI * 2;
                    while (diffAngle < -Math.PI) diffAngle += Math.PI * 2;

                    if (Math.abs(diffAngle) < sweepSpan / 1.5) {
                        player.hitMobsThisSwing.add(mob.id);
                        const dmg = Math.floor(Math.random() * 8) + playerDmgBase;
                        mob.hp -= dmg;
                        playSound('hit');
                        screenShake = 3;

                        // Heavy knockback for knight
                        const kx = mob.x + Math.cos(angleToMob) * 18;
                        const ky = mob.y + Math.sin(angleToMob) * 18;
                        if (!checkWallCollision(kx, mob.y, mob.w, mob.h)) mob.x = kx;
                        if (!checkWallCollision(mob.x, ky, mob.w, mob.h)) mob.y = ky;

                        floatingTexts.push({
                            x: mob.x + mob.w / 2, y: mob.y - 8,
                            text: `${dmg}`, color: '#ffeb3b', life: 26
                        });

                        for (let i = 0; i < 5; i++) {
                            particles.push({
                                x: mob.x + mob.w / 2, y: mob.y + mob.h / 2,
                                vx: (Math.random() - 0.5) * 4, vy: (Math.random() - 0.5) * 4,
                                size: 3, color: '#fbbf24', life: 14
                            });
                        }
                    }
                }
            });

        } else if (role === 'assassin') {
            // --- ASSASSIN: RAPID TWIN-BLADE DOUBLE STRIKE ---
            const sweepSpan = Math.PI * 0.65;
            const currentAngle = baseAngle - sweepSpan / 2 + sweepSpan * player.slashArcProgress;
            const arcRadius = 38;

            // Emerald twin sparks
            particles.push({
                x: px + Math.cos(currentAngle) * (arcRadius + (Math.random() - 0.5) * 6),
                y: py + Math.sin(currentAngle) * (arcRadius + (Math.random() - 0.5) * 6),
                vx: (Math.random() - 0.5) * 1.5,
                vy: (Math.random() - 0.5) * 1.5,
                size: 2.5,
                color: Math.random() > 0.4 ? '#10b981' : '#34d399',
                life: 10
            });

            mobs.forEach(mob => {
                if (player.hitMobsThisSwing.has(mob.id)) return;
                const mx = mob.x + mob.w / 2;
                const my = mob.y + mob.h / 2;
                const dist = Math.hypot(mx - px, my - py);

                if (dist <= arcRadius + mob.w / 2) {
                    let angleToMob = Math.atan2(my - py, mx - px);
                    let diffAngle = angleToMob - baseAngle;
                    while (diffAngle > Math.PI) diffAngle -= Math.PI * 2;
                    while (diffAngle < -Math.PI) diffAngle += Math.PI * 2;

                    if (Math.abs(diffAngle) < sweepSpan / 1.4) {
                        player.hitMobsThisSwing.add(mob.id);

                        // Hit 1: Main hand
                        let isCrit1 = Math.random() < 0.35;
                        let dmg1 = Math.floor(playerDmgBase * 0.62) + Math.floor(Math.random() * 4);
                        if (isCrit1) dmg1 = Math.round(dmg1 * 1.75);

                        // Hit 2: Offhand
                        let isCrit2 = Math.random() < 0.35;
                        let dmg2 = Math.floor(playerDmgBase * 0.62) + Math.floor(Math.random() * 4);
                        if (isCrit2) dmg2 = Math.round(dmg2 * 1.75);

                        mob.hp -= (dmg1 + dmg2);
                        playSound('hit');

                        // Quick slice knockback
                        const kx = mob.x + Math.cos(angleToMob) * 8;
                        const ky = mob.y + Math.sin(angleToMob) * 8;
                        if (!checkWallCollision(kx, mob.y, mob.w, mob.h)) mob.x = kx;
                        if (!checkWallCollision(mob.x, ky, mob.w, mob.h)) mob.y = ky;

                        // Display twin damage numbers
                        floatingTexts.push({
                            x: mob.x + mob.w / 2 - 8, y: mob.y - 12,
                            text: isCrit1 ? `${dmg1}!` : `${dmg1}`,
                            color: isCrit1 ? '#ef4444' : '#10b981',
                            life: 24
                        });
                        floatingTexts.push({
                            x: mob.x + mob.w / 2 + 8, y: mob.y - 4,
                            text: isCrit2 ? `${dmg2}!` : `${dmg2}`,
                            color: isCrit2 ? '#ef4444' : '#34d399',
                            life: 24
                        });

                        for (let i = 0; i < 4; i++) {
                            particles.push({
                                x: mob.x + mob.w / 2, y: mob.y + mob.h / 2,
                                vx: (Math.random() - 0.5) * 3, vy: (Math.random() - 0.5) * 3,
                                size: 2.5, color: '#10b981', life: 12
                            });
                        }
                    }
                }
            });
        }

        if (player.attackTime >= player.attackDuration) {
            player.isAttacking = false;
        }
    }

    // === UPDATE PLAYER PROJECTILES (MAGE MAGIC BOLTS) ===
    for (let i = playerProjectiles.length - 1; i >= 0; i--) {
        const p = playerProjectiles[i];
        p.x += p.vx;
        p.y += p.vy;
        p.life--;

        // Trailing magical sparkle trail
        if (Math.random() < 0.6) {
            particles.push({
                x: p.x + (Math.random() - 0.5) * 4,
                y: p.y + (Math.random() - 0.5) * 4,
                vx: (Math.random() - 0.5) * 1,
                vy: (Math.random() - 0.5) * 1,
                size: Math.random() * 2.5 + 1.2,
                color: p.color,
                life: 10
            });
        }

        // Wall collision
        if (checkWallCollision(p.x - 3, p.y - 3, 6, 6) || p.life <= 0) {
            for (let k = 0; k < 5; k++) {
                particles.push({
                    x: p.x, y: p.y,
                    vx: (Math.random() - 0.5) * 2.5, vy: (Math.random() - 0.5) * 2.5,
                    size: 2.5, color: p.color, life: 10
                });
            }
            playerProjectiles.splice(i, 1);
            continue;
        }

        // Mob collision
        let hitMob = false;
        for (let m = 0; m < mobs.length; m++) {
            const mob = mobs[m];
            const mx = mob.x + mob.w / 2;
            const my = mob.y + mob.h / 2;
            if (Math.hypot(mx - p.x, my - p.y) <= mob.w / 2 + 5) {
                mob.hp -= p.dmg;
                playSound('hit');

                floatingTexts.push({
                    x: mx, y: mob.y - 8,
                    text: `${p.dmg} ✨`,
                    color: p.color,
                    life: 26
                });

                // Spark burst on hit
                for (let k = 0; k < 8; k++) {
                    const angle = Math.random() * Math.PI * 2;
                    particles.push({
                        x: p.x, y: p.y,
                        vx: Math.cos(angle) * (Math.random() * 3 + 1),
                        vy: Math.sin(angle) * (Math.random() * 3 + 1),
                        size: Math.random() * 3 + 2,
                        color: p.color,
                        life: 14
                    });
                }

                // Slight knockback
                const kx = mob.x + Math.cos(p.angle) * 7;
                const ky = mob.y + Math.sin(p.angle) * 7;
                if (!checkWallCollision(kx, mob.y, mob.w, mob.h)) mob.x = kx;
                if (!checkWallCollision(mob.x, ky, mob.w, mob.h)) mob.y = ky;

                hitMob = true;
                break;
            }
        }

        if (hitMob) {
            playerProjectiles.splice(i, 1);
        }
    }

    // Mob AI & Collision with Player (Enemy Level Scaling Applied!)
    for (let i = mobs.length - 1; i >= 0; i--) {
        const mob = mobs[i];

        if (mob.hp <= 0) {
            createSlimeExplosion(mob.x + mob.w / 2, mob.y + mob.h / 2, mob.color, mob.type === 'boss', mob.species);
            score += (mob.type === 'boss' ? 500 : 100);
            mobs.splice(i, 1);
            continue;
        }

        mob.hopTimer = (mob.hopTimer || Math.random() * Math.PI * 2) + 0.14 * (mob.speed || 1);

        const mx = mob.x + mob.w / 2;
        const my = mob.y + mob.h / 2;

        const dist = Math.hypot(px - mx, py - my);
        if (dist < 270 && dist > 12) {
            const stepMobX = mob.x + ((px - mx) / dist) * mob.speed;
            const stepMobY = mob.y + ((py - my) / dist) * mob.speed;

            if (!checkWallCollision(stepMobX, mob.y, mob.w, mob.h)) mob.x = stepMobX;
            if (!checkWallCollision(mob.x, stepMobY, mob.w, mob.h)) mob.y = stepMobY;
        }

        // Skeleton Bow Shooting AI
        if (mob.species === 'skeleton') {
            mob.shootTimer = (mob.shootTimer || Math.floor(Math.random() * 40)) + 1;
            const shootInterval = mob.type === 'boss' ? 65 : 95;
            if (mob.shootTimer >= shootInterval && dist < 280) {
                mob.shootTimer = 0;
                const angle = Math.atan2(py - my, px - mx);
                const arrowSpeed = 4.4;
                const scaledArrowDmg = Math.round((mob.type === 'boss' ? 22 : 11) + (currentStage - 1) * 1.5);
                enemyProjectiles.push({
                    x: mx, y: my,
                    vx: Math.cos(angle) * arrowSpeed,
                    vy: Math.sin(angle) * arrowSpeed,
                    angle: angle,
                    type: 'arrow',
                    dmg: scaledArrowDmg,
                    life: 110
                });
                playSound('slash');
            }
        }

        // Dragon Boss AI
        if (mob.species === 'dragon') {
            mob.dragonTimer = (mob.dragonTimer || 0) + 1;
            mob.clawTimer = Math.max(0, (mob.clawTimer || 0) - 1);

            if (dist >= 70 && dist < 320) {
                if (mob.dragonTimer >= 60) {
                    mob.dragonTimer = 0;
                    const angle = Math.atan2(py - my, px - mx);
                    const speed = 4.8;
                    const scaledFireDmg = Math.round((mob.type === 'boss' ? 26 : 16) + (currentStage - 1) * 1.8);

                    for (let f = -1; f <= 1; f++) {
                        const spreadAngle = angle + f * 0.22;
                        enemyProjectiles.push({
                            x: mx, y: my - 16,
                            vx: Math.cos(spreadAngle) * speed,
                            vy: Math.sin(spreadAngle) * speed,
                            angle: spreadAngle,
                            type: 'fireball',
                            dmg: scaledFireDmg,
                            life: 90
                        });
                    }
                    playSound('explode');
                }
            } else if (dist < 70) {
                if (mob.dragonTimer >= 38) {
                    mob.dragonTimer = 0;
                    mob.clawTimer = 18;

                    if (player.invulnerableTimer === 0) {
                        const rawClawDmg = Math.round(30 + currentStage * 2.5);
                        let clawDmg = Math.max(2, rawClawDmg - getPlayerDefense());
                        player.invulnerableTimer = 35;
                        player.shieldRechargeTimer = 240;
                        screenShake = 12;

                        if (player.shield > 0) {
                            const absorbed = Math.min(player.shield, clawDmg);
                            player.shield -= absorbed;
                            clawDmg -= absorbed;
                            player.shieldHitFlashTimer = 16;
                            floatingTexts.push({
                                x: player.x + player.w / 2, y: player.y - 18,
                                text: `-${absorbed} 🛡️`, color: '#00e5ff', life: 28
                            });
                            playSound('shield');
                        }

                        if (clawDmg > 0) {
                            player.hp -= clawDmg;
                            playSound('hit');
                            floatingTexts.push({
                                x: player.x + player.w / 2, y: player.y - 8,
                                text: `-${clawDmg} HP 🐾`, color: '#ff1744', life: 30
                            });

                            if (player.hp <= 0) {
                                player.hp = 0;
                                gameState = 'GAMEOVER';
                            }
                        }
                    }
                }
            }
        }

        // Contact Damage
        if (dist < 16 && player.invulnerableTimer === 0) {
            const rawMobDmg = Math.round((mob.type === 'boss' ? 24 : 13) + (currentStage - 1) * 1.4);
            let mobDmg = Math.max(2, rawMobDmg - getPlayerDefense());
            player.invulnerableTimer = 35;
            player.shieldRechargeTimer = 240;
            screenShake = 8;

            if (player.shield > 0) {
                const absorbed = Math.min(player.shield, mobDmg);
                player.shield -= absorbed;
                mobDmg -= absorbed;

                player.shieldHitFlashTimer = 16;

                floatingTexts.push({
                    x: player.x + player.w / 2, y: player.y - 18,
                    text: `-${absorbed} 🛡️`, color: '#00e5ff', life: 28
                });
                playSound('shield');

                for (let s = 0; s < 8; s++) {
                    particles.push({
                        x: player.x + player.w / 2, y: player.y + player.h / 2,
                        vx: (Math.random() - 0.5) * 5, vy: (Math.random() - 0.5) * 5,
                        size: 3, color: '#00e5ff', life: 14
                    });
                }
            }

            if (mobDmg > 0) {
                player.hp -= mobDmg;
                playSound('hit');
                floatingTexts.push({
                    x: player.x + player.w / 2, y: player.y - 8,
                    text: `-${mobDmg} HP`, color: '#ff4d4d', life: 28
                });

                if (player.hp <= 0) {
                    player.hp = 0;
                    gameState = 'GAMEOVER';
                }
            }
        }
    }

    // Enemy Projectiles Update
    for (let i = enemyProjectiles.length - 1; i >= 0; i--) {
        const arr = enemyProjectiles[i];
        arr.x += arr.vx;
        arr.y += arr.vy;
        arr.life--;

        if (checkWallCollision(arr.x - 3, arr.y - 3, 6, 6) || arr.life <= 0) {
            for (let p = 0; p < 4; p++) {
                particles.push({
                    x: arr.x, y: arr.y,
                    vx: (Math.random() - 0.5) * 3, vy: (Math.random() - 0.5) * 3,
                    size: 2, color: '#b45309', life: 10
                });
            }
            enemyProjectiles.splice(i, 1);
            continue;
        }

        const distToPlayer = Math.hypot(px - arr.x, py - arr.y);

        if (distToPlayer < 14 && player.invulnerableTimer === 0) {
            let dmg = Math.max(2, arr.dmg - getPlayerDefense());
            player.invulnerableTimer = 30;
            player.shieldRechargeTimer = 240;
            screenShake = 6;

            if (player.shield > 0) {
                const absorbed = Math.min(player.shield, dmg);
                player.shield -= absorbed;
                dmg -= absorbed;
                player.shieldHitFlashTimer = 16;
                floatingTexts.push({
                    x: player.x + player.w / 2, y: player.y - 18,
                    text: `-${absorbed} 🛡️`, color: '#00e5ff', life: 28
                });
                playSound('shield');
                for (let s = 0; s < 6; s++) {
                    particles.push({
                        x: player.x + player.w / 2, y: player.y + player.h / 2,
                        vx: (Math.random() - 0.5) * 4, vy: (Math.random() - 0.5) * 4,
                        size: 3, color: '#00e5ff', life: 12
                    });
                }
            }

            if (dmg > 0) {
                player.hp -= dmg;
                playSound('hit');
                floatingTexts.push({
                    x: player.x + player.w / 2, y: player.y - 8,
                    text: `-${dmg} HP 🏹`, color: '#ff4d4d', life: 28
                });
                if (player.hp <= 0) {
                    player.hp = 0;
                    gameState = 'GAMEOVER';
                }
            }

            enemyProjectiles.splice(i, 1);
        }
    }
}
