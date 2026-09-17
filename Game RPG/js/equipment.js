// --- EQUIPMENT DATA & SPRITE DEFINITIONS ---
// Each equipment has unique visual properties and belongs to a specific character role

const EQUIPMENT_CATEGORIES = ['weapon', 'armor', 'helmet', 'shield', 'boots', 'cape'];

const EQUIPMENT_DB = [
    // ==========================================
    // ===== KNIGHT EQUIPMENT (Ksatria) =====
    // ==========================================

    // --- Knight Weapons (Swords) ---
    {
        id: 'weapon_rusty_sword',
        role: 'knight',
        name: 'Pedang Berkarat',
        category: 'weapon',
        tier: 1,
        price: 0,
        stats: { atkBonus: 0 },
        description: 'Pedang awal ksatria yang sudah berkarat.',
        sprite: {
            bladeColor: '#94a3b8',
            bladeHighlight: '#cbd5e1',
            bladeShadow: '#64748b',
            crossguardColor: '#78350f',
            gripColor: '#6e4726',
            pommelColor: '#78350f',
            bladeLength: 26,
            glowColor: null,
            tipStyle: 'normal'
        }
    },
    {
        id: 'weapon_iron_sword',
        role: 'knight',
        name: 'Pedang Besi Tempa',
        category: 'weapon',
        tier: 1,
        price: 150,
        stats: { atkBonus: 5 },
        description: 'Pedang besi yang tajam dan kokoh.',
        sprite: {
            bladeColor: '#e2e8f0',
            bladeHighlight: '#f8fafc',
            bladeShadow: '#94a3b8',
            crossguardColor: '#fbbf24',
            gripColor: '#78350f',
            pommelColor: '#e74c3c',
            bladeLength: 28,
            glowColor: null,
            tipStyle: 'normal'
        }
    },
    {
        id: 'weapon_flame_blade',
        role: 'knight',
        name: 'Pedang Kobaran Api',
        category: 'weapon',
        tier: 2,
        price: 450,
        stats: { atkBonus: 12 },
        description: 'Pedang berselimut api abadi pembakar musuh.',
        sprite: {
            bladeColor: '#ef4444',
            bladeHighlight: '#fbbf24',
            bladeShadow: '#b91c1c',
            crossguardColor: '#f59e0b',
            gripColor: '#451a03',
            pommelColor: '#ff6d00',
            bladeLength: 30,
            glowColor: '#ff6d00',
            tipStyle: 'flame'
        }
    },
    {
        id: 'weapon_ice_saber',
        role: 'knight',
        name: 'Sabel Es Kuno',
        category: 'weapon',
        tier: 2,
        price: 450,
        stats: { atkBonus: 10, speedBonus: 0.2 },
        description: 'Pedang es kristal yang membekukan musuh.',
        sprite: {
            bladeColor: '#67e8f9',
            bladeHighlight: '#ecfeff',
            bladeShadow: '#0891b2',
            crossguardColor: '#06b6d4',
            gripColor: '#164e63',
            pommelColor: '#22d3ee',
            bladeLength: 31,
            glowColor: '#00e5ff',
            tipStyle: 'crystal'
        }
    },
    {
        id: 'weapon_shadow_katana',
        role: 'knight',
        name: 'Greatsword Bayangan',
        category: 'weapon',
        tier: 3,
        price: 1100,
        stats: { atkBonus: 20, speedBonus: 0.3 },
        description: 'Pedang besar bermandikan energi kegelapan.',
        sprite: {
            bladeColor: '#1e1b4b',
            bladeHighlight: '#7c3aed',
            bladeShadow: '#0f0a2e',
            crossguardColor: '#7c3aed',
            gripColor: '#1e1b4b',
            pommelColor: '#a855f7',
            bladeLength: 35,
            glowColor: '#a855f7',
            tipStyle: 'sharp'
        }
    },
    {
        id: 'weapon_dragon_slayer',
        role: 'knight',
        name: 'Pembunuh Naga (Dragon Slayer)',
        category: 'weapon',
        tier: 4,
        price: 2600,
        stats: { atkBonus: 35, maxHpBonus: 30 },
        description: 'Pedang legendaris penumpas raja naga.',
        sprite: {
            bladeColor: '#fbbf24',
            bladeHighlight: '#fef3c7',
            bladeShadow: '#d97706',
            crossguardColor: '#dc2626',
            gripColor: '#7f1d1d',
            pommelColor: '#f59e0b',
            bladeLength: 38,
            glowColor: '#fbbf24',
            tipStyle: 'dragon'
        }
    },

    // --- Knight Armor (Chest) ---
    {
        id: 'armor_cloth',
        role: 'knight',
        name: 'Baju Kain Ksatria',
        category: 'armor',
        tier: 1,
        price: 0,
        stats: { defBonus: 0 },
        description: 'Baju pelindung dasar ksatria pemula.',
        sprite: {
            bodyColor: '#334155',
            plateColor: '#94a3b8',
            highlightColor: '#e2e8f0',
            trimColor: '#fbbf24',
            pauldronColor: '#64748b',
            pauldronHighlight: '#cbd5e1',
            crestStyle: 'cross'
        }
    },
    {
        id: 'armor_chainmail',
        role: 'knight',
        name: 'Baju Rantai Besi',
        category: 'armor',
        tier: 1,
        price: 180,
        stats: { defBonus: 3, maxHpBonus: 15 },
        description: 'Anyaman cincin rantai baja yang kokoh.',
        sprite: {
            bodyColor: '#475569',
            plateColor: '#94a3b8',
            highlightColor: '#cbd5e1',
            trimColor: '#94a3b8',
            pauldronColor: '#64748b',
            pauldronHighlight: '#94a3b8',
            crestStyle: 'chain'
        }
    },
    {
        id: 'armor_knight_plate',
        role: 'knight',
        name: 'Zirah Pelat Ksatria',
        category: 'armor',
        tier: 2,
        price: 550,
        stats: { defBonus: 8, maxHpBonus: 30 },
        description: 'Zirah pelat baja kebanggaan ksatria kerajaan.',
        sprite: {
            bodyColor: '#1e3a5f',
            plateColor: '#60a5fa',
            highlightColor: '#93c5fd',
            trimColor: '#fbbf24',
            pauldronColor: '#3b82f6',
            pauldronHighlight: '#93c5fd',
            crestStyle: 'royal'
        }
    },
    {
        id: 'armor_dark_plate',
        role: 'knight',
        name: 'Zirah Baja Kegelapan',
        category: 'armor',
        tier: 3,
        price: 1300,
        stats: { defBonus: 16, maxHpBonus: 50 },
        description: 'Armor bertatahkan obsidian penangkal kutukan.',
        sprite: {
            bodyColor: '#1e1b4b',
            plateColor: '#6d28d9',
            highlightColor: '#a78bfa',
            trimColor: '#c084fc',
            pauldronColor: '#7c3aed',
            pauldronHighlight: '#a78bfa',
            crestStyle: 'skull'
        }
    },
    {
        id: 'armor_dragon_scale',
        role: 'knight',
        name: 'Zirah Sisik Naga Purba',
        category: 'armor',
        tier: 4,
        price: 3000,
        stats: { defBonus: 26, maxHpBonus: 90 },
        description: 'Zirah terbuat dari sisik naga purba yang tahan magma.',
        sprite: {
            bodyColor: '#7f1d1d',
            plateColor: '#dc2626',
            highlightColor: '#fca5a5',
            trimColor: '#f59e0b',
            pauldronColor: '#b91c1c',
            pauldronHighlight: '#f87171',
            crestStyle: 'dragon'
        }
    },

    // --- Knight Helmet ---
    {
        id: 'helmet_basic',
        role: 'knight',
        name: 'Helm Besi Ksatria',
        category: 'helmet',
        tier: 1,
        price: 0,
        stats: { defBonus: 0 },
        description: 'Helm besi standar dengan bulu helm merah.',
        sprite: {
            domeColor: '#475569',
            domeHighlight: '#cbd5e1',
            visorColor: '#0f172a',
            eyeColor: '#00e5ff',
            plumeColor: '#ef4444',
            plumeHighlight: '#f87171',
            plumeStyle: 'feather'
        }
    },
    {
        id: 'helmet_viking',
        role: 'knight',
        name: 'Helm Bertanduk Perang',
        category: 'helmet',
        tier: 2,
        price: 380,
        stats: { defBonus: 5, atkBonus: 4 },
        description: 'Helm bertanduk pemberani di medan perang.',
        sprite: {
            domeColor: '#78350f',
            domeHighlight: '#92400e',
            visorColor: '#1c1917',
            eyeColor: '#fbbf24',
            plumeColor: null,
            plumeHighlight: null,
            plumeStyle: 'horns'
        }
    },
    {
        id: 'helmet_royal',
        role: 'knight',
        name: 'Mahkota Pelindung Raja',
        category: 'helmet',
        tier: 3,
        price: 950,
        stats: { defBonus: 10, maxHpBonus: 25 },
        description: 'Helm bertabur safir dengan ornamen mahkota emas.',
        sprite: {
            domeColor: '#1e3a8a',
            domeHighlight: '#3b82f6',
            visorColor: '#0c0a09',
            eyeColor: '#fbbf24',
            plumeColor: '#fbbf24',
            plumeHighlight: '#fef3c7',
            plumeStyle: 'crown'
        }
    },
    {
        id: 'helmet_dragon_helm',
        role: 'knight',
        name: 'Helm Kepala Naga Berapi',
        category: 'helmet',
        tier: 4,
        price: 2200,
        stats: { defBonus: 18, atkBonus: 10 },
        description: 'Helm berukir kepala naga bermata emas menyala.',
        sprite: {
            domeColor: '#991b1b',
            domeHighlight: '#dc2626',
            visorColor: '#450a0a',
            eyeColor: '#fbbf24',
            plumeColor: '#f59e0b',
            plumeHighlight: '#fbbf24',
            plumeStyle: 'dragon_horns'
        }
    },

    // --- Knight Shield ---
    {
        id: 'shield_wooden',
        role: 'knight',
        name: 'Perisai Kayu Bulat',
        category: 'shield',
        tier: 1,
        price: 0,
        stats: { maxShieldBonus: 0 },
        description: 'Perisai kayu dengan lambang salib emas.',
        sprite: {
            bodyColor: '#1e3a8a',
            borderColor: '#fbbf24',
            emblemColor: '#fbbf24',
            emblemStyle: 'cross',
            glowColor: null
        }
    },
    {
        id: 'shield_iron_kite',
        role: 'knight',
        name: 'Perisai Layang Baja',
        category: 'shield',
        tier: 2,
        price: 320,
        stats: { maxShieldBonus: 25, defBonus: 3 },
        description: 'Perisai besi penangkis panah dan tombak.',
        sprite: {
            bodyColor: '#334155',
            borderColor: '#e2e8f0',
            emblemColor: '#e2e8f0',
            emblemStyle: 'chevron',
            glowColor: null
        }
    },
    {
        id: 'shield_crystal',
        role: 'knight',
        name: 'Aegis Kristal Azure',
        category: 'shield',
        tier: 3,
        price: 1000,
        stats: { maxShieldBonus: 55, defBonus: 8 },
        description: 'Perisai kristal memancarkan medan pelindung ajaib.',
        sprite: {
            bodyColor: '#0e7490',
            borderColor: '#67e8f9',
            emblemColor: '#ecfeff',
            emblemStyle: 'diamond',
            glowColor: '#00e5ff'
        }
    },
    {
        id: 'shield_dragon_aegis',
        role: 'knight',
        name: 'Aegis Tulang Naga',
        category: 'shield',
        tier: 4,
        price: 2400,
        stats: { maxShieldBonus: 85, defBonus: 15 },
        description: 'Perisai legendaris dengan mata naga yang tak pernah tidur.',
        sprite: {
            bodyColor: '#7f1d1d',
            borderColor: '#f59e0b',
            emblemColor: '#fbbf24',
            emblemStyle: 'dragon_eye',
            glowColor: '#ff6d00'
        }
    },

    // --- Knight Boots ---
    {
        id: 'boots_leather',
        role: 'knight',
        name: 'Sepatu Bot Kulit',
        category: 'boots',
        tier: 1,
        price: 0,
        stats: { speedBonus: 0 },
        description: 'Sepatu bot kulit standar yang nyaman.',
        sprite: {
            bootColor: '#1e293b',
            trimColor: '#475569',
            soleColor: '#0f172a',
            accentColor: null
        }
    },
    {
        id: 'boots_swift',
        role: 'knight',
        name: 'Bot Lari Zamrud',
        category: 'boots',
        tier: 2,
        price: 350,
        stats: { speedBonus: 0.5 },
        description: 'Sepatu bot berpelat zamrud yang gesit.',
        sprite: {
            bootColor: '#065f46',
            trimColor: '#10b981',
            soleColor: '#064e3b',
            accentColor: '#34d399'
        }
    },
    {
        id: 'boots_shadow_step',
        role: 'knight',
        name: 'Sepatu Langkah Bayang',
        category: 'boots',
        tier: 3,
        price: 900,
        stats: { speedBonus: 0.9, defBonus: 4 },
        description: 'Sepatu berpelat obsidian peredam suara hentakan.',
        sprite: {
            bootColor: '#1e1b4b',
            trimColor: '#7c3aed',
            soleColor: '#0f0a2e',
            accentColor: '#a855f7'
        }
    },
    {
        id: 'boots_dragon_stride',
        role: 'knight',
        name: 'Langkah Ksatria Naga',
        category: 'boots',
        tier: 4,
        price: 1800,
        stats: { speedBonus: 1.2, atkBonus: 6 },
        description: 'Sepatu bot cakar naga pemberi daya dorong kuat.',
        sprite: {
            bootColor: '#7f1d1d',
            trimColor: '#f59e0b',
            soleColor: '#450a0a',
            accentColor: '#fbbf24'
        }
    },

    // --- Knight Capes ---
    {
        id: 'cape_crimson',
        role: 'knight',
        name: 'Jubah Merah Pahlawan',
        category: 'cape',
        tier: 1,
        price: 0,
        stats: {},
        description: 'Jubah merah berkibar simbol keberanian ksatria.',
        sprite: {
            mainColor: '#991b1b',
            innerColor: '#dc2626',
            borderColor: null,
            particleColor: null
        }
    },
    {
        id: 'cape_royal_blue',
        role: 'knight',
        name: 'Jubah Biru Kerajaan',
        category: 'cape',
        tier: 2,
        price: 280,
        stats: { defBonus: 3, maxHpBonus: 15 },
        description: 'Jubah biru laut dengan bordir benang emas bangsawan.',
        sprite: {
            mainColor: '#1e3a8a',
            innerColor: '#3b82f6',
            borderColor: '#fbbf24',
            particleColor: null
        }
    },
    {
        id: 'cape_dragon_wings',
        role: 'knight',
        name: 'Sayap Sayap Jubah Naga',
        category: 'cape',
        tier: 4,
        price: 2200,
        stats: { atkBonus: 10, defBonus: 10, speedBonus: 0.3 },
        description: 'Jubah berbentuk sayap naga merah menyala memancarkan bara api.',
        sprite: {
            mainColor: '#7f1d1d',
            innerColor: '#dc2626',
            borderColor: '#f59e0b',
            particleColor: '#ff6d00'
        }
    },


    // ==========================================
    // ===== MAGE EQUIPMENT (Penyihir) =====
    // ==========================================

    // --- Mage Weapons (Wands & Staves) ---
    {
        id: 'weapon_apprentice_wand',
        role: 'mage',
        name: 'Tongkat Sihir Pemula',
        category: 'weapon',
        tier: 1,
        price: 0,
        stats: { atkBonus: 0 },
        description: 'Tongkat kayu pemfokus mantra dasar.',
        sprite: {
            bladeColor: '#8b5cf6',
            bladeHighlight: '#c4b5fd',
            bladeShadow: '#6d28d9',
            crossguardColor: '#fbbf24',
            gripColor: '#581c87',
            pommelColor: '#a855f7',
            bladeLength: 25,
            glowColor: '#a855f7',
            tipStyle: 'crystal'
        }
    },
    {
        id: 'weapon_crystal_wand',
        role: 'mage',
        name: 'Tongkat Kristal Safir',
        category: 'weapon',
        tier: 1,
        price: 150,
        stats: { atkBonus: 6, maxShieldBonus: 10 },
        description: 'Tongkat berkepala kristal safir penyerap mana.',
        sprite: {
            bladeColor: '#38bdf8',
            bladeHighlight: '#bae6fd',
            bladeShadow: '#0284c7',
            crossguardColor: '#0ea5e9',
            gripColor: '#0c4a6e',
            pommelColor: '#38bdf8',
            bladeLength: 27,
            glowColor: '#00e5ff',
            tipStyle: 'crystal'
        }
    },
    {
        id: 'weapon_fire_staff',
        role: 'mage',
        name: 'Staf Kobaran Neraka',
        category: 'weapon',
        tier: 2,
        price: 480,
        stats: { atkBonus: 14 },
        description: 'Staf pemanggil bara api meteor yang panas membakar.',
        sprite: {
            bladeColor: '#f97316',
            bladeHighlight: '#fdba74',
            bladeShadow: '#c2410c',
            crossguardColor: '#ef4444',
            gripColor: '#7c2d12',
            pommelColor: '#ff6d00',
            bladeLength: 30,
            glowColor: '#ff3d00',
            tipStyle: 'flame'
        }
    },
    {
        id: 'weapon_thunder_staff',
        role: 'mage',
        name: 'Staf Petir Halilintar',
        category: 'weapon',
        tier: 3,
        price: 1150,
        stats: { atkBonus: 22, speedBonus: 0.3 },
        description: 'Staf berdenyut listrik tegangan tinggi pemecah batu.',
        sprite: {
            bladeColor: '#fbbf24',
            bladeHighlight: '#fef08a',
            bladeShadow: '#d97706',
            crossguardColor: '#eab308',
            gripColor: '#713f12',
            pommelColor: '#fde047',
            bladeLength: 33,
            glowColor: '#facc15',
            tipStyle: 'sharp'
        }
    },
    {
        id: 'weapon_cosmic_archstaff',
        role: 'mage',
        name: 'Staf Kosmik Galaksi',
        category: 'weapon',
        tier: 4,
        price: 2700,
        stats: { atkBonus: 38, maxHpBonus: 25 },
        description: 'Senjata mistis para Archmage pengendali ruang dan waktu.',
        sprite: {
            bladeColor: '#ec4899',
            bladeHighlight: '#fbcfe8',
            bladeShadow: '#be185d',
            crossguardColor: '#c084fc',
            gripColor: '#4a044e',
            pommelColor: '#f472b6',
            bladeLength: 37,
            glowColor: '#e879f9',
            tipStyle: 'dragon'
        }
    },

    // --- Mage Armor (Robes) ---
    {
        id: 'armor_apprentice_robe',
        role: 'mage',
        name: 'Jubah Sutra Pemula',
        category: 'armor',
        tier: 1,
        price: 0,
        stats: { defBonus: 0 },
        description: 'Jubah kain tenun sederhana para calon penyihir.',
        sprite: {
            bodyColor: '#4c1d95',
            plateColor: '#7c3aed',
            highlightColor: '#c4b5fd',
            trimColor: '#fbbf24',
            pauldronColor: '#6d28d9',
            pauldronHighlight: '#a78bfa',
            crestStyle: 'cross'
        }
    },
    {
        id: 'armor_mystic_robe',
        role: 'mage',
        name: 'Jubah Tenun Mistis',
        category: 'armor',
        tier: 2,
        price: 450,
        stats: { defBonus: 6, maxShieldBonus: 30 },
        description: 'Jubah berdaya tolak mantra musuh.',
        sprite: {
            bodyColor: '#0c4a6e',
            plateColor: '#0284c7',
            highlightColor: '#7dd3fc',
            trimColor: '#38bdf8',
            pauldronColor: '#0369a1',
            pauldronHighlight: '#bae6fd',
            crestStyle: 'royal'
        }
    },
    {
        id: 'armor_elemental_robe',
        role: 'mage',
        name: 'Jubah Penguasa Elemen',
        category: 'armor',
        tier: 3,
        price: 1200,
        stats: { defBonus: 12, maxHpBonus: 35, atkBonus: 6 },
        description: 'Jubah bergetar dengan daya api, air, dan angin.',
        sprite: {
            bodyColor: '#701a75',
            plateColor: '#c026d3',
            highlightColor: '#f0abfc',
            trimColor: '#fbbf24',
            pauldronColor: '#a21caf',
            pauldronHighlight: '#e879f9',
            crestStyle: 'chain'
        }
    },
    {
        id: 'armor_archmage_vestment',
        role: 'mage',
        name: 'Vestmen Archmage Abadi',
        category: 'armor',
        tier: 4,
        price: 2900,
        stats: { defBonus: 22, maxHpBonus: 70, maxShieldBonus: 50 },
        description: 'Pakaian legendaris dari menara penyihir tertinggi.',
        sprite: {
            bodyColor: '#312e81',
            plateColor: '#4338ca',
            highlightColor: '#a5b4fc',
            trimColor: '#f59e0b',
            pauldronColor: '#3730a3',
            pauldronHighlight: '#c7d2fe',
            crestStyle: 'dragon'
        }
    },

    // --- Mage Helmet (Hats & Cowls) ---
    {
        id: 'helmet_wizard_hat',
        role: 'mage',
        name: 'Topi Kerucut Penyihir',
        category: 'helmet',
        tier: 1,
        price: 0,
        stats: { defBonus: 0 },
        description: 'Topi lancip khas murid akademi sihir.',
        sprite: {
            domeColor: '#581c87',
            domeHighlight: '#9333ea',
            visorColor: '#1e1b4b',
            eyeColor: '#c084fc',
            plumeColor: '#fbbf24',
            plumeHighlight: '#fde047',
            plumeStyle: 'crown'
        }
    },
    {
        id: 'helmet_mystic_cowl',
        role: 'mage',
        name: 'Tudung Kabut Indigo',
        category: 'helmet',
        tier: 2,
        price: 360,
        stats: { defBonus: 4, maxShieldBonus: 20 },
        description: 'Tudung penutup kepala peredam serangan psikis.',
        sprite: {
            domeColor: '#1e3a8a',
            domeHighlight: '#2563eb',
            visorColor: '#0f172a',
            eyeColor: '#38bdf8',
            plumeColor: '#60a5fa',
            plumeHighlight: '#93c5fd',
            plumeStyle: 'feather'
        }
    },
    {
        id: 'helmet_astral_crown',
        role: 'mage',
        name: 'Tiara Mahkota Bintang',
        category: 'helmet',
        tier: 4,
        price: 2100,
        stats: { defBonus: 15, atkBonus: 12 },
        description: 'Tiara melayang dengan kristal intan bercahaya.',
        sprite: {
            domeColor: '#831843',
            domeHighlight: '#db2777',
            visorColor: '#1f2937',
            eyeColor: '#fbbf24',
            plumeColor: '#f43f5e',
            plumeHighlight: '#fda4af',
            plumeStyle: 'dragon_horns'
        }
    },

    // --- Mage Shield / Offhand (Orbs & Grimoires) ---
    {
        id: 'shield_magic_orb',
        role: 'mage',
        name: 'Bola Kristal Pemula',
        category: 'shield',
        tier: 1,
        price: 0,
        stats: { maxShieldBonus: 0 },
        description: 'Bola kristal pemancar pelindung gaib.',
        sprite: {
            bodyColor: '#4338ca',
            borderColor: '#a5b4fc',
            emblemColor: '#818cf8',
            emblemStyle: 'diamond',
            glowColor: '#6366f1'
        }
    },
    {
        id: 'shield_ancient_grimoire',
        role: 'mage',
        name: 'Grimoire Kuno',
        category: 'shield',
        tier: 2,
        price: 380,
        stats: { maxShieldBonus: 30, atkBonus: 5 },
        description: 'Buku mantra kuno yang melayang melindungi pemiliknya.',
        sprite: {
            bodyColor: '#701a75',
            borderColor: '#f472b6',
            emblemColor: '#fbbf24',
            emblemStyle: 'cross',
            glowColor: '#d946ef'
        }
    },
    {
        id: 'shield_cosmic_nova_orb',
        role: 'mage',
        name: 'Relik Nova Kosmik',
        category: 'shield',
        tier: 4,
        price: 2300,
        stats: { maxShieldBonus: 80, atkBonus: 14, defBonus: 8 },
        description: 'Relik miniatur lubang cacing penelan bahaya.',
        sprite: {
            bodyColor: '#0369a1',
            borderColor: '#38bdf8',
            emblemColor: '#fbbf24',
            emblemStyle: 'dragon_eye',
            glowColor: '#0ea5e9'
        }
    },

    // --- Mage Boots ---
    {
        id: 'boots_cloth_shoes',
        role: 'mage',
        name: 'Sandal Sutra Halus',
        category: 'boots',
        tier: 1,
        price: 0,
        stats: { speedBonus: 0 },
        description: 'Alas kaki ringan tidak menghambat gerak merapal.',
        sprite: {
            bootColor: '#2e1065',
            trimColor: '#7c3aed',
            soleColor: '#1e1b4b',
            accentColor: null
        }
    },
    {
        id: 'boots_dimension_stride',
        role: 'mage',
        name: 'Sepatu Pelangkah Dimensi',
        category: 'boots',
        tier: 3,
        price: 950,
        stats: { speedBonus: 1.0, maxShieldBonus: 20 },
        description: 'Sepatu berdaya teleportasi mikro di setiap langkah.',
        sprite: {
            bootColor: '#0c4a6e',
            trimColor: '#0284c7',
            soleColor: '#082f49',
            accentColor: '#38bdf8'
        }
    },

    // --- Mage Capes ---
    {
        id: 'cape_mystic_cloak',
        role: 'mage',
        name: 'Jubah Astral Violet',
        category: 'cape',
        tier: 1,
        price: 0,
        stats: {},
        description: 'Jubah mengembang beraroma dupa mistis.',
        sprite: {
            mainColor: '#4c1d95',
            innerColor: '#7c3aed',
            borderColor: '#c4b5fd',
            particleColor: '#a855f7'
        }
    },
    {
        id: 'cape_eternal_nebula',
        role: 'mage',
        name: 'Selendang Nebula Bintang',
        category: 'cape',
        tier: 4,
        price: 2100,
        stats: { defBonus: 10, atkBonus: 12, maxShieldBonus: 40 },
        description: 'Jubah bercahaya bintang jatuh yang berputar anggun.',
        sprite: {
            mainColor: '#1e1b4b',
            innerColor: '#4338ca',
            borderColor: '#a855f7',
            particleColor: '#00e5ff'
        }
    },


    // ==========================================
    // ===== ASSASSIN EQUIPMENT (Pembunuh) =====
    // ==========================================

    // --- Assassin Weapons (Dual Daggers & Claws) ---
    {
        id: 'weapon_twin_daggers',
        role: 'assassin',
        name: 'Belati Ganda Karat',
        category: 'weapon',
        tier: 1,
        price: 0,
        stats: { atkBonus: 0 },
        description: 'Sepasang belati tua andalan pembunuh amatir.',
        sprite: {
            bladeColor: '#64748b',
            bladeHighlight: '#cbd5e1',
            bladeShadow: '#334155',
            crossguardColor: '#1e293b',
            gripColor: '#0f172a',
            pommelColor: '#475569',
            bladeLength: 20,
            glowColor: null,
            tipStyle: 'sharp'
        }
    },
    {
        id: 'weapon_steel_stilettos',
        role: 'assassin',
        name: 'Stiletto Baja Hitam',
        category: 'weapon',
        tier: 1,
        price: 150,
        stats: { atkBonus: 5, speedBonus: 0.2 },
        description: 'Belati tipis tajam penembus celah armor.',
        sprite: {
            bladeColor: '#94a3b8',
            bladeHighlight: '#f1f5f9',
            bladeShadow: '#475569',
            crossguardColor: '#0f172a',
            gripColor: '#1e293b',
            pommelColor: '#10b981',
            bladeLength: 22,
            glowColor: null,
            tipStyle: 'sharp'
        }
    },
    {
        id: 'weapon_venom_fang',
        role: 'assassin',
        name: 'Taring Belati Beracun',
        category: 'weapon',
        tier: 2,
        price: 460,
        stats: { atkBonus: 13, speedBonus: 0.3 },
        description: 'Bilah berlumur bisa ular beludak yang mematikan.',
        sprite: {
            bladeColor: '#10b981',
            bladeHighlight: '#6ee7b7',
            bladeShadow: '#047857',
            crossguardColor: '#064e3b',
            gripColor: '#022c22',
            pommelColor: '#34d399',
            bladeLength: 23,
            glowColor: '#10b981',
            tipStyle: 'crystal'
        }
    },
    {
        id: 'weapon_shadow_claws',
        role: 'assassin',
        name: 'Cakar Bayangan Gaib',
        category: 'weapon',
        tier: 3,
        price: 1100,
        stats: { atkBonus: 22, speedBonus: 0.5 },
        description: 'Cakar pembunuh yang membelah kegelapan tanpa suara.',
        sprite: {
            bladeColor: '#4338ca',
            bladeHighlight: '#818cf8',
            bladeShadow: '#1e1b4b',
            crossguardColor: '#312e81',
            gripColor: '#0f172a',
            pommelColor: '#c084fc',
            bladeLength: 26,
            glowColor: '#818cf8',
            tipStyle: 'sharp'
        }
    },
    {
        id: 'weapon_phantom_deathblades',
        role: 'assassin',
        name: 'Belati Maut Siluman',
        category: 'weapon',
        tier: 4,
        price: 2600,
        stats: { atkBonus: 36, speedBonus: 0.8 },
        description: 'Senjata pencabut nyawa dari jurang kegelapan terdalam.',
        sprite: {
            bladeColor: '#dc2626',
            bladeHighlight: '#f87171',
            bladeShadow: '#991b1b',
            crossguardColor: '#450a0a',
            gripColor: '#000000',
            pommelColor: '#ef4444',
            bladeLength: 28,
            glowColor: '#ef4444',
            tipStyle: 'dragon'
        }
    },

    // --- Assassin Armor (Leather & Shadowsuits) ---
    {
        id: 'armor_leather_vest',
        role: 'assassin',
        name: 'Rompi Kulit Ringan',
        category: 'armor',
        tier: 1,
        price: 0,
        stats: { defBonus: 0 },
        description: 'Rompi kulit lentur untuk mobilitas tinggi.',
        sprite: {
            bodyColor: '#18181b',
            plateColor: '#27272a',
            highlightColor: '#52525b',
            trimColor: '#10b981',
            pauldronColor: '#3f3f46',
            pauldronHighlight: '#71717a',
            crestStyle: 'skull'
        }
    },
    {
        id: 'armor_night_stalker',
        role: 'assassin',
        name: 'Zirah Pengintai Malam',
        category: 'armor',
        tier: 2,
        price: 420,
        stats: { defBonus: 5, speedBonus: 0.3, maxHpBonus: 20 },
        description: 'Zirah kulit berserat karbon yang tidak memantulkan cahaya.',
        sprite: {
            bodyColor: '#064e3b',
            plateColor: '#047857',
            highlightColor: '#34d399',
            trimColor: '#6ee7b7',
            pauldronColor: '#065f46',
            pauldronHighlight: '#10b981',
            crestStyle: 'chain'
        }
    },
    {
        id: 'armor_phantom_suit',
        role: 'assassin',
        name: 'Garb Bayangan Hantu',
        category: 'armor',
        tier: 4,
        price: 2800,
        stats: { defBonus: 18, atkBonus: 12, speedBonus: 0.6, maxHpBonus: 60 },
        description: 'Setelan yang menyamarkan detak jantung dan wujud pemakainya.',
        sprite: {
            bodyColor: '#1e1b4b',
            plateColor: '#312e81',
            highlightColor: '#6366f1',
            trimColor: '#ef4444',
            pauldronColor: '#4338ca',
            pauldronHighlight: '#818cf8',
            crestStyle: 'skull'
        }
    },

    // --- Assassin Helmet (Masks & Hoods) ---
    {
        id: 'helmet_ninja_mask',
        role: 'assassin',
        name: 'Topeng Kain Siluman',
        category: 'helmet',
        tier: 1,
        price: 0,
        stats: { defBonus: 0 },
        description: 'Kain penutup wajah hitam hanya memperlihatkan mata tajam.',
        sprite: {
            domeColor: '#18181b',
            domeHighlight: '#27272a',
            visorColor: '#09090b',
            eyeColor: '#10b981',
            plumeColor: '#10b981',
            plumeHighlight: '#34d399',
            plumeStyle: 'feather'
        }
    },
    {
        id: 'helmet_shadow_hood',
        role: 'assassin',
        name: 'Tudung Malam Kegelapan',
        category: 'helmet',
        tier: 2,
        price: 350,
        stats: { defBonus: 4, speedBonus: 0.2 },
        description: 'Tudung berbayang yang mengaburkan siluet kepala.',
        sprite: {
            domeColor: '#022c22',
            domeHighlight: '#065f46',
            visorColor: '#000000',
            eyeColor: '#34d399',
            plumeColor: null,
            plumeHighlight: null,
            plumeStyle: 'horns'
        }
    },
    {
        id: 'helmet_reaper_mask',
        role: 'assassin',
        name: 'Topeng Malaikat Maut',
        category: 'helmet',
        tier: 4,
        price: 2100,
        stats: { defBonus: 14, atkBonus: 10, speedBonus: 0.4 },
        description: 'Topeng tengkorak bersepuh darah memancarkan aura ketakutan.',
        sprite: {
            domeColor: '#450a0a',
            domeHighlight: '#991b1b',
            visorColor: '#000000',
            eyeColor: '#ef4444',
            plumeColor: '#dc2626',
            plumeHighlight: '#f87171',
            plumeStyle: 'dragon_horns'
        }
    },

    // --- Assassin Shield / Offhand (Parrying Daggers & Armguards) ---
    {
        id: 'shield_parrying_dagger',
        role: 'assassin',
        name: 'Belati Penangkis Kiri',
        category: 'shield',
        tier: 1,
        price: 0,
        stats: { maxShieldBonus: 0 },
        description: 'Belati tangan kiri untuk menepis tebasan musuh.',
        sprite: {
            bodyColor: '#18181b',
            borderColor: '#10b981',
            emblemColor: '#34d399',
            emblemStyle: 'chevron',
            glowColor: null
        }
    },
    {
        id: 'shield_steel_shuriken',
        role: 'assassin',
        name: 'Shuriken Baja Penangkis',
        category: 'shield',
        tier: 2,
        price: 360,
        stats: { maxShieldBonus: 20, atkBonus: 6 },
        description: 'Bilah bintang besi pelindung lengan dan senjata balik.',
        sprite: {
            bodyColor: '#1e293b',
            borderColor: '#94a3b8',
            emblemColor: '#f1f5f9',
            emblemStyle: 'diamond',
            glowColor: null
        }
    },
    {
        id: 'shield_shadow_guard',
        role: 'assassin',
        name: 'Aegis Cakar Siluman',
        category: 'shield',
        tier: 4,
        price: 2300,
        stats: { maxShieldBonus: 75, atkBonus: 12, defBonus: 8 },
        description: 'Pelindung lengan berbilah cakar tajam berdaya pantul tinggi.',
        sprite: {
            bodyColor: '#0f172a',
            borderColor: '#dc2626',
            emblemColor: '#ef4444',
            emblemStyle: 'dragon_eye',
            glowColor: '#ef4444'
        }
    },

    // --- Assassin Boots ---
    {
        id: 'boots_ninja_tabi',
        role: 'assassin',
        name: 'Sepatu Tabi Senyap',
        category: 'boots',
        tier: 1,
        price: 0,
        stats: { speedBonus: 0 },
        description: 'Sepatu tabi tradisional kain lembut tanpa suara.',
        sprite: {
            bootColor: '#18181b',
            trimColor: '#27272a',
            soleColor: '#09090b',
            accentColor: '#10b981'
        }
    },
    {
        id: 'boots_lightning_striders',
        role: 'assassin',
        name: 'Langkah Kilat Siluman',
        category: 'boots',
        tier: 3,
        price: 950,
        stats: { speedBonus: 1.3, atkBonus: 5 },
        description: 'Sepatu bot gesit secepat kilatan petir malam.',
        sprite: {
            bootColor: '#022c22',
            trimColor: '#059669',
            soleColor: '#064e3b',
            accentColor: '#34d399'
        }
    },

    // --- Assassin Capes ---
    {
        id: 'cape_shadow_mantle',
        role: 'assassin',
        name: 'Mantel Kabut Hitam',
        category: 'cape',
        tier: 1,
        price: 0,
        stats: {},
        description: 'Mantel hitam pekat berkibar menyatu dengan bayang-bayang.',
        sprite: {
            mainColor: '#18181b',
            innerColor: '#27272a',
            borderColor: '#10b981',
            particleColor: '#10b981'
        }
    },
    {
        id: 'cape_blood_specter',
        role: 'assassin',
        name: 'Jubah Siluman Berdarah',
        category: 'cape',
        tier: 4,
        price: 2200,
        stats: { defBonus: 8, atkBonus: 12, speedBonus: 0.6 },
        description: 'Jubah compang-camping berlumur aura kegelapan darah.',
        sprite: {
            mainColor: '#450a0a',
            innerColor: '#991b1b',
            borderColor: '#ef4444',
            particleColor: '#dc2626'
        }
    }
];

// Helper function to get equipment by id
function getEquipmentById(id) {
    return EQUIPMENT_DB.find(e => e.id === id);
}

// Helper function to get equipment by category and role
function getEquipmentByCategory(category, role) {
    if (!role) {
        role = (typeof player !== 'undefined' && player.characterRole) ? player.characterRole : 'knight';
    }
    return EQUIPMENT_DB.filter(e => e.category === category && (e.role === role || e.role === 'all'));
}

// Get the default starting equipment set for each role
function getDefaultEquipment(role = 'knight') {
    if (role === 'mage') {
        return {
            weapon: 'weapon_apprentice_wand',
            armor: 'armor_apprentice_robe',
            helmet: 'helmet_wizard_hat',
            shield: 'shield_magic_orb',
            boots: 'boots_cloth_shoes',
            cape: 'cape_mystic_cloak'
        };
    } else if (role === 'assassin') {
        return {
            weapon: 'weapon_twin_daggers',
            armor: 'armor_leather_vest',
            helmet: 'helmet_ninja_mask',
            shield: 'shield_parrying_dagger',
            boots: 'boots_ninja_tabi',
            cape: 'cape_shadow_mantle'
        };
    }
    return {
        weapon: 'weapon_rusty_sword',
        armor: 'armor_cloth',
        helmet: 'helmet_basic',
        shield: 'shield_wooden',
        boots: 'boots_leather',
        cape: 'cape_crimson'
    };
}

// Calculate total stat bonuses from equipped items
function calculateEquipmentStats(equipped) {
    const totals = {
        atkBonus: 0,
        defBonus: 0,
        maxHpBonus: 0,
        maxShieldBonus: 0,
        speedBonus: 0
    };

    if (!equipped) return totals;

    for (const category of EQUIPMENT_CATEGORIES) {
        const itemId = equipped[category];
        if (itemId) {
            const item = getEquipmentById(itemId);
            if (item && item.stats) {
                for (const [stat, val] of Object.entries(item.stats)) {
                    if (totals.hasOwnProperty(stat)) {
                        totals[stat] += val;
                    }
                }
            }
        }
    }

    return totals;
}

// Get the sprite data for an equipped item
function getEquippedSprite(equipped, category) {
    if (!equipped) return null;
    const itemId = equipped[category];
    if (itemId) {
        const item = getEquipmentById(itemId);
        if (item) return item.sprite;
    }
    return null;
}
