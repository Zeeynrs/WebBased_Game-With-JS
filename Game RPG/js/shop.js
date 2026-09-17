// --- SHOP SYSTEM WITH SMOOTH SCROLLING & CLASS FILTERING ---

let shopSelectedCategory = 0;
let shopScrollOffset = 0;
let shopMessage = '';
let shopMessageTimer = 0;

function handleShopScroll(deltaY) {
    const category = EQUIPMENT_CATEGORIES[shopSelectedCategory];
    const items = getEquipmentByCategory(category, player.characterRole);
    const itemH = 50;
    const visibleH = 210;
    const maxScroll = Math.max(0, items.length * itemH - visibleH);
    
    shopScrollOffset = Math.max(0, Math.min(maxScroll, shopScrollOffset + Math.sign(deltaY) * 36));
}

function handleShopClick() {
    const canvas = document.getElementById('gameCanvas');
    const cx = canvas.width / 2;
    
    // Category tabs at top of shop
    const tabY = 56;
    const tabW = 88;
    const tabH = 22;
    const startX = cx - (EQUIPMENT_CATEGORIES.length * tabW) / 2;
    
    for (let i = 0; i < EQUIPMENT_CATEGORIES.length; i++) {
        const tx = startX + i * tabW;
        if (isHovering(tx, tabY, tabW - 2, tabH)) {
            shopSelectedCategory = i;
            shopScrollOffset = 0;
            return;
        }
    }
    
    // Scroll Up button (▲)
    const scrollUpX = canvas.width - 38;
    const scrollUpY = 88;
    if (isHovering(scrollUpX, scrollUpY, 24, 24)) {
        handleShopScroll(-1);
        return;
    }
    
    // Scroll Down button (▼)
    const scrollDownX = canvas.width - 38;
    const scrollDownY = canvas.height - 76;
    if (isHovering(scrollDownX, scrollDownY, 24, 24)) {
        handleShopScroll(1);
        return;
    }
    
    // Item list
    const category = EQUIPMENT_CATEGORIES[shopSelectedCategory];
    const items = getEquipmentByCategory(category, player.characterRole);
    const itemStartY = 88;
    const itemH = 50;
    
    for (let i = 0; i < items.length; i++) {
        const item = items[i];
        const iy = itemStartY + i * itemH - shopScrollOffset;
        
        if (iy < 80 || iy > canvas.height - 60) continue;
        
        // Buy/Equip button area (right side of item row)
        const btnX = cx + 115;
        const btnY = iy + 6;
        const btnW = 82;
        const btnH = 30;
        
        if (isHovering(btnX, btnY, btnW, btnH)) {
            const owned = player.inventory.includes(item.id);
            const equipped = player.equipped[item.category] === item.id;
            
            if (equipped) {
                shopMessage = 'Sudah dipakai!';
                shopMessageTimer = 60;
            } else if (owned) {
                equipItem(item.id);
                shopMessage = `${item.name} dipasang!`;
                shopMessageTimer = 60;
                playSound('buy');
            } else {
                if (player.gold >= item.price) {
                    player.gold -= item.price;
                    player.inventory.push(item.id);
                    equipItem(item.id);
                    shopMessage = `Membeli ${item.name}!`;
                    shopMessageTimer = 90;
                    playSound('buy');
                } else {
                    shopMessage = 'Gold tidak cukup!';
                    shopMessageTimer = 60;
                    playSound('error');
                }
            }
            return;
        }
    }
    
    // Close button
    const closeBtnX = cx + 180;
    const closeBtnY = 52;
    if (isHovering(closeBtnX, closeBtnY, 30, 24)) {
        gameState = 'PLAYING';
        return;
    }
}

function drawShopOverlay() {
    const canvas = document.getElementById('gameCanvas');
    const ctx = canvas.getContext('2d');
    const cx = canvas.width / 2;
    
    if (shopMessageTimer > 0) shopMessageTimer--;
    
    // Darken background
    ctx.fillStyle = 'rgba(6, 9, 15, 0.94)';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    
    // Role title badge
    const roleInfo = (typeof CHARACTER_ROLES !== 'undefined' && CHARACTER_ROLES[player.characterRole])
        ? CHARACTER_ROLES[player.characterRole]
        : { name: 'Ksatria', color: '#f1c40f' };
        
    // Shop title
    ctx.textAlign = 'center';
    ctx.fillStyle = roleInfo.color;
    ctx.font = '13px "Press Start 2P", monospace';
    ctx.fillText(`TOKO PERALATAN ${roleInfo.name.toUpperCase()}`, cx, 36);
    
    // Gold display
    ctx.fillStyle = '#ffd700';
    ctx.font = '10px "Press Start 2P", monospace';
    ctx.fillText(`🪙 Gold: ${player.gold}`, cx - 175, 36);
    
    // Close button [X]
    const closeBtnX = cx + 180;
    const closeBtnY = 52;
    const hClose = isHovering(closeBtnX, closeBtnY, 30, 24);
    ctx.fillStyle = hClose ? '#e74c3c' : '#c0392b';
    ctx.fillRect(closeBtnX, closeBtnY, 30, 24);
    ctx.fillStyle = '#fff';
    ctx.font = '10px "Press Start 2P", monospace';
    ctx.fillText('X', closeBtnX + 15, closeBtnY + 17);
    
    // Category tabs with class-appropriate naming
    const tabY = 56;
    const tabW = 88;
    const tabH = 22;
    const startX = cx - (EQUIPMENT_CATEGORIES.length * tabW) / 2;
    
    let catLabels = ['⚔️ Senjata', '🛡️ Armor', '⛑️ Helm', '🛡️ Perisai', '👢 Sepatu', '🧣 Jubah'];
    if (player.characterRole === 'mage') {
        catLabels = ['🪄 Tongkat', '👘 Jubah', '🧙 Topi', '🔮 Bola Sihir', '👡 Sepatu', '✨ Jubah Astral'];
    } else if (player.characterRole === 'assassin') {
        catLabels = ['🗡️ Belati', '🦺 Rompi', '🥷 Topeng', '🗡️ Penangkis', '👟 Tabi', '🌑 Mantel'];
    }
    
    for (let i = 0; i < EQUIPMENT_CATEGORIES.length; i++) {
        const tx = startX + i * tabW;
        const isActive = i === shopSelectedCategory;
        const hover = isHovering(tx, tabY, tabW - 2, tabH);
        
        ctx.fillStyle = isActive ? '#2d6a4f' : (hover ? '#1e3a5f' : '#1a202c');
        ctx.fillRect(tx, tabY, tabW - 2, tabH);
        ctx.strokeStyle = isActive ? '#2ecc71' : '#4a5568';
        ctx.lineWidth = 1;
        ctx.strokeRect(tx, tabY, tabW - 2, tabH);
        
        ctx.fillStyle = isActive ? '#2ecc71' : '#a0aec0';
        ctx.font = '7px "Press Start 2P", monospace';
        ctx.fillText(catLabels[i], tx + tabW / 2 - 1, tabY + 15);
    }
    
    // Item list
    const category = EQUIPMENT_CATEGORIES[shopSelectedCategory];
    const items = getEquipmentByCategory(category, player.characterRole);
    const itemStartY = 88;
    const itemH = 50;
    const visibleH = 215;
    const maxScroll = Math.max(0, items.length * itemH - visibleH);
    
    // Clipping area for items list
    ctx.save();
    ctx.beginPath();
    ctx.rect(30, 84, canvas.width - 75, visibleH);
    ctx.clip();
    
    for (let i = 0; i < items.length; i++) {
        const item = items[i];
        const iy = itemStartY + i * itemH - shopScrollOffset;
        
        if (iy < 40 || iy > canvas.height - 30) continue;
        
        const owned = player.inventory.includes(item.id);
        const equipped = player.equipped[item.category] === item.id;
        
        // Item background row
        ctx.fillStyle = equipped ? 'rgba(46, 204, 113, 0.16)' : (owned ? 'rgba(59, 130, 246, 0.12)' : 'rgba(26, 32, 44, 0.85)');
        ctx.fillRect(35, iy, canvas.width - 85, itemH - 4);
        ctx.strokeStyle = equipped ? '#2ecc71' : (owned ? '#3b82f6' : '#334155');
        ctx.lineWidth = 1;
        ctx.strokeRect(35, iy, canvas.width - 85, itemH - 4);
        
        // Tier stars
        const tierColors = ['#94a3b8', '#60a5fa', '#a855f7', '#f59e0b'];
        ctx.fillStyle = tierColors[item.tier - 1] || '#94a3b8';
        ctx.font = '8px "Press Start 2P", monospace';
        ctx.textAlign = 'left';
        ctx.fillText('★'.repeat(item.tier), 44, iy + 14);
        
        // Item name
        ctx.fillStyle = '#f8fafc';
        ctx.font = '8px "Press Start 2P", monospace';
        ctx.fillText(item.name, 44, iy + 28);
        
        // Stats text
        ctx.fillStyle = '#94a3b8';
        ctx.font = '7px "Press Start 2P", monospace';
        let statText = '';
        if (item.stats.atkBonus) statText += `ATK+${item.stats.atkBonus} `;
        if (item.stats.defBonus) statText += `DEF+${item.stats.defBonus} `;
        if (item.stats.maxHpBonus) statText += `HP+${item.stats.maxHpBonus} `;
        if (item.stats.maxShieldBonus) statText += `SHD+${item.stats.maxShieldBonus} `;
        if (item.stats.speedBonus) statText += `SPD+${item.stats.speedBonus} `;
        ctx.fillText(statText || 'Peralatan Standar', 44, iy + 40);
        
        // Item preview sprite icon
        drawShopItemPreview(ctx, item, cx + 75, iy + 8, 30);
        
        // Buy / Equip button
        const btnX = cx + 115;
        const btnY = iy + 6;
        const btnW = 82;
        const btnH = 30;
        const hBtn = isHovering(btnX, btnY, btnW, btnH);
        
        if (equipped) {
            ctx.fillStyle = '#2d6a4f';
            ctx.fillRect(btnX, btnY, btnW, btnH);
            ctx.strokeStyle = '#2ecc71';
            ctx.lineWidth = 1;
            ctx.strokeRect(btnX, btnY, btnW, btnH);
            ctx.fillStyle = '#2ecc71';
            ctx.font = '7px "Press Start 2P", monospace';
            ctx.textAlign = 'center';
            ctx.fillText('DIPAKAI', btnX + btnW / 2, btnY + 19);
        } else if (owned) {
            ctx.fillStyle = hBtn ? '#2563eb' : '#1e40af';
            ctx.fillRect(btnX, btnY, btnW, btnH);
            ctx.strokeStyle = '#60a5fa';
            ctx.lineWidth = 1;
            ctx.strokeRect(btnX, btnY, btnW, btnH);
            ctx.fillStyle = '#fff';
            ctx.font = '7px "Press Start 2P", monospace';
            ctx.textAlign = 'center';
            ctx.fillText('PASANG', btnX + btnW / 2, btnY + 19);
        } else {
            const canAfford = player.gold >= item.price;
            ctx.fillStyle = hBtn ? (canAfford ? '#d97706' : '#991b1b') : (canAfford ? '#b45309' : '#7f1d1d');
            ctx.fillRect(btnX, btnY, btnW, btnH);
            ctx.strokeStyle = canAfford ? '#f59e0b' : '#ef4444';
            ctx.lineWidth = 1;
            ctx.strokeRect(btnX, btnY, btnW, btnH);
            ctx.fillStyle = '#fff';
            ctx.font = '7px "Press Start 2P", monospace';
            ctx.textAlign = 'center';
            ctx.fillText(`🪙 ${item.price}`, btnX + btnW / 2, btnY + 19);
        }
    }
    
    ctx.restore();
    
    // --- SCROLLBAR ON THE RIGHT ---
    const scrollBarX = canvas.width - 38;
    const scrollUpY = 88;
    const scrollDownY = canvas.height - 76;
    const trackY = scrollUpY + 26;
    const trackH = scrollDownY - trackY - 4;
    
    // Scroll Up Button ▲
    const hUp = isHovering(scrollBarX, scrollUpY, 24, 24);
    ctx.fillStyle = hUp ? '#3b82f6' : '#1e293b';
    ctx.fillRect(scrollBarX, scrollUpY, 24, 24);
    ctx.strokeStyle = '#4a5568';
    ctx.strokeRect(scrollBarX, scrollUpY, 24, 24);
    ctx.fillStyle = '#fff';
    ctx.font = '9px "Press Start 2P", monospace';
    ctx.textAlign = 'center';
    ctx.fillText('▲', scrollBarX + 12, scrollUpY + 16);
    
    // Scroll Down Button ▼
    const hDown = isHovering(scrollBarX, scrollDownY, 24, 24);
    ctx.fillStyle = hDown ? '#3b82f6' : '#1e293b';
    ctx.fillRect(scrollBarX, scrollDownY, 24, 24);
    ctx.strokeStyle = '#4a5568';
    ctx.strokeRect(scrollBarX, scrollDownY, 24, 24);
    ctx.fillStyle = '#fff';
    ctx.font = '9px "Press Start 2P", monospace';
    ctx.textAlign = 'center';
    ctx.fillText('▼', scrollBarX + 12, scrollDownY + 16);
    
    // Track background
    ctx.fillStyle = '#0f172a';
    ctx.fillRect(scrollBarX + 8, trackY, 8, trackH);
    
    // Thumb indicator
    if (items.length > 0) {
        const thumbH = Math.max(18, (visibleH / (items.length * itemH)) * trackH);
        const scrollRatio = maxScroll > 0 ? (shopScrollOffset / maxScroll) : 0;
        const thumbY = trackY + scrollRatio * (trackH - thumbH);
        
        ctx.fillStyle = '#38bdf8';
        ctx.fillRect(scrollBarX + 8, thumbY, 8, thumbH);
        ctx.strokeStyle = '#7dd3fc';
        ctx.strokeRect(scrollBarX + 8, thumbY, 8, thumbH);
    }
    
    // Shop message notification banner
    if (shopMessageTimer > 0 && shopMessage) {
        const msgAlpha = Math.min(1, shopMessageTimer / 20);
        ctx.fillStyle = `rgba(0, 0, 0, ${0.8 * msgAlpha})`;
        ctx.fillRect(cx - 160, canvas.height - 48, 320, 26);
        ctx.strokeStyle = `rgba(241, 196, 15, ${msgAlpha})`;
        ctx.lineWidth = 1;
        ctx.strokeRect(cx - 160, canvas.height - 48, 320, 26);
        ctx.fillStyle = `rgba(255, 255, 255, ${msgAlpha})`;
        ctx.font = '8px "Press Start 2P", monospace';
        ctx.textAlign = 'center';
        ctx.fillText(shopMessage, cx, canvas.height - 31);
    }
    
    // Hint at bottom
    ctx.fillStyle = '#64748b';
    ctx.font = '7px "Press Start 2P", monospace';
    ctx.textAlign = 'center';
    ctx.fillText('Gunakan Scroll Mouse / Tombol ▲▼ untuk melihat peralatan | Tekan [B] untuk tutup', cx, canvas.height - 10);
    ctx.textAlign = 'left';
}

function drawShopItemPreview(ctx, item, x, y, size) {
    ctx.save();
    const s = item.sprite;
    if (!s) { ctx.restore(); return; }
    
    if (item.category === 'weapon') {
        ctx.fillStyle = s.bladeColor;
        ctx.fillRect(x + 4, y + size/2 - 2, size - 8, 4);
        ctx.fillStyle = s.crossguardColor;
        ctx.fillRect(x + 6, y + size/2 - 5, 4, 10);
        ctx.fillStyle = s.pommelColor;
        ctx.beginPath();
        ctx.arc(x + 4, y + size/2, 3, 0, Math.PI * 2);
        ctx.fill();
        if (s.glowColor) {
            ctx.shadowColor = s.glowColor;
            ctx.shadowBlur = 6;
            ctx.fillStyle = s.glowColor;
            ctx.fillRect(x + size - 6, y + size/2 - 1, 4, 2);
            ctx.shadowBlur = 0;
        }
    } else if (item.category === 'armor') {
        ctx.fillStyle = s.bodyColor;
        ctx.fillRect(x + 6, y + 4, size - 12, size - 8);
        ctx.fillStyle = s.plateColor;
        ctx.fillRect(x + 8, y + 6, size - 16, size - 12);
        ctx.fillStyle = s.trimColor;
        ctx.fillRect(x + size/2 - 2, y + 8, 4, 6);
    } else if (item.category === 'helmet') {
        ctx.fillStyle = s.domeColor;
        ctx.fillRect(x + 6, y + 6, size - 12, size - 12);
        ctx.fillStyle = s.domeHighlight;
        ctx.fillRect(x + 7, y + 6, size - 14, 4);
        ctx.fillStyle = s.visorColor;
        ctx.fillRect(x + 8, y + 14, size - 16, 5);
        ctx.fillStyle = s.eyeColor;
        ctx.fillRect(x + 10, y + 15, 3, 2);
        ctx.fillRect(x + 17, y + 15, 3, 2);
    } else if (item.category === 'shield') {
        ctx.fillStyle = s.bodyColor;
        ctx.beginPath();
        ctx.moveTo(x + size/2, y + 2);
        ctx.lineTo(x + size - 4, y + 8);
        ctx.lineTo(x + size - 4, y + size/2);
        ctx.quadraticCurveTo(x + size/2, y + size - 2, x + size/2, y + size - 2);
        ctx.quadraticCurveTo(x + size/2, y + size - 2, x + 4, y + size/2);
        ctx.lineTo(x + 4, y + 8);
        ctx.closePath();
        ctx.fill();
        ctx.strokeStyle = s.borderColor;
        ctx.lineWidth = 1.5;
        ctx.stroke();
    } else if (item.category === 'boots') {
        ctx.fillStyle = s.bootColor;
        ctx.fillRect(x + 6, y + 10, 8, 14);
        ctx.fillRect(x + 16, y + 10, 8, 14);
        ctx.fillStyle = s.trimColor;
        ctx.fillRect(x + 6, y + 10, 8, 4);
        ctx.fillRect(x + 16, y + 10, 8, 4);
    } else if (item.category === 'cape') {
        ctx.fillStyle = s.mainColor;
        ctx.beginPath();
        ctx.moveTo(x + 8, y + 4);
        ctx.quadraticCurveTo(x + size/2, y + size - 2, x + size - 8, y + 4);
        ctx.lineTo(x + size - 8, y + size - 6);
        ctx.quadraticCurveTo(x + size/2, y + size + 4, x + 8, y + size - 6);
        ctx.closePath();
        ctx.fill();
        if (s.borderColor) {
            ctx.strokeStyle = s.borderColor;
            ctx.lineWidth = 1;
            ctx.stroke();
        }
    }
    
    ctx.restore();
}
