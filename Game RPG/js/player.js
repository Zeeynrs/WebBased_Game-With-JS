// --- CHARACTER ROLES DEFINITION ---
const CHARACTER_ROLES = {
    knight: {
        id: 'knight',
        name: 'Ksatria (Knight)',
        title: 'Pelindung Tangguh',
        icon: '⚔️',
        desc: 'Pertahanan tinggi & tebasan pedang luas melingkar.',
        baseHp: 120,
        baseShield: 60,
        baseDamage: 24,
        baseSpeed: 2.4,
        attackType: 'melee_sword',
        attackDuration: 12,
        attackCooldown: 18,
        color: '#3b82f6',
        rating: { hp: '★★★★★', atk: '★★★★☆', spd: '★★★☆☆', def: '★★★★★' }
    },
    mage: {
        id: 'mage',
        name: 'Penyihir (Mage)',
        title: 'Penguasa Elemen',
        icon: '🔮',
        desc: 'Meluncurkan proyektil sihir mistis & ledakan elemen.',
        baseHp: 85,
        baseShield: 40,
        baseDamage: 22,
        baseSpeed: 2.5,
        attackType: 'magic_bolt',
        attackDuration: 10,
        attackCooldown: 15,
        color: '#a855f7',
        rating: { hp: '★★★☆☆', atk: '★★★★★', spd: '★★★☆☆', def: '★★☆☆☆' }
    },
    assassin: {
        id: 'assassin',
        name: 'Pembunuh (Assassin)',
        title: 'Bayangan Mematikan',
        icon: '🗡️',
        desc: 'Sangat lincah, serbuan siluman & tebasan belati ganda.',
        baseHp: 95,
        baseShield: 45,
        baseDamage: 19,
        baseSpeed: 3.1,
        attackType: 'dual_dagger',
        attackDuration: 8,
        attackCooldown: 11,
        color: '#10b981',
        rating: { hp: '★★★☆☆', atk: '★★★★☆', spd: '★★★★★', def: '★★★☆☆' }
    }
};

let selectedRole = 'knight';

// --- PLAYER OBJECT & STATE ---
const player = {
    x: 60,
    y: 200,
    w: 20,
    h: 24,
    characterRole: 'knight',
    baseSpeed: 2.4,
    speed: 2.4,
    facing: 'right',
    hp: 120,
    maxHp: 120,
    baseMaxHp: 120,
    shield: 60,
    maxShield: 60,
    baseMaxShield: 60,
    shieldRechargeTimer: 0,
    shieldHitFlashTimer: 0,
    invulnerableTimer: 0,
    baseDamage: 24,

    // Attack Mechanism
    isAttacking: false,
    attackTime: 0,
    attackDuration: 12,
    attackCooldown: 0,
    attackCooldownMax: 18,
    slashArcProgress: 0,
    hitMobsThisSwing: new Set(),

    // Equipment system
    equipped: null,
    inventory: [],
    
    // Gold (coins used as currency)
    gold: 0
};

function selectCharacter(role) {
    if (!CHARACTER_ROLES[role]) role = 'knight';
    selectedRole = role;
    const roleData = CHARACTER_ROLES[role];
    
    player.characterRole = role;
    player.baseMaxHp = roleData.baseHp;
    player.baseMaxShield = roleData.baseShield;
    player.baseDamage = roleData.baseDamage;
    player.baseSpeed = roleData.baseSpeed;
    player.speed = player.baseSpeed;
    player.attackDuration = roleData.attackDuration;
    player.attackCooldownMax = roleData.attackCooldown;
    
    player.equipped = getDefaultEquipment(role);
    player.inventory = Object.values(player.equipped);
    applyEquipmentStats();
    
    if (typeof initSkillsForRole === 'function') {
        initSkillsForRole(role);
    }
}

function initPlayer() {
    selectCharacter(selectedRole);
    player.gold = 0;
    player.hp = player.maxHp;
    player.shield = player.maxShield;
}

function applyEquipmentStats() {
    if (!player.equipped) return;
    const stats = calculateEquipmentStats(player.equipped);
    player.maxHp = player.baseMaxHp + (stats.maxHpBonus || 0);
    player.maxShield = player.baseMaxShield + (stats.maxShieldBonus || 0);
    player.speed = player.baseSpeed + (stats.speedBonus || 0);
    // Clamp HP/Shield to new max
    player.hp = Math.min(player.hp, player.maxHp);
    player.shield = Math.min(player.shield, player.maxShield);
}

function getPlayerDamage() {
    const stats = calculateEquipmentStats(player.equipped);
    return player.baseDamage + (stats.atkBonus || 0);
}

function getPlayerDefense() {
    const stats = calculateEquipmentStats(player.equipped);
    return stats.defBonus || 0;
}

function equipItem(itemId) {
    const item = getEquipmentById(itemId);
    if (!item) return false;
    if (!player.inventory.includes(itemId)) return false;
    
    player.equipped[item.category] = itemId;
    applyEquipmentStats();
    return true;
}
