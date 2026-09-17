// --- STAGE CONFIGURATIONS WITH LABYRINTH MAPS (STAGES 1 TO 21) ---
const STAGE_CONFIGS = [
    // Stage 1
    {
        name: 'CAVE LABYRINTH', subName: 'Stage 1',
        mobs: [
            { x: 340, y: 110, hp: 50, speed: 0.9, color: '#2ecc71', type: 'normal' },
            { x: 420, y: 220, hp: 50, speed: 0.85, color: '#2ecc71', type: 'normal' },
            { x: 260, y: 290, hp: 50, speed: 0.95, color: '#2ecc71', type: 'normal' }
        ],
        loots: [{ x: 220, y: 130, type: 'health' }, { x: 260, y: 270, type: 'shield' }],
        torches: [
            { x: 100, y: 64 }, { x: 280, y: 64 }, { x: 500, y: 64 },
            { x: 18, y: 200 }, { x: 622, y: 200 }, { x: 180, y: 374 }, { x: 440, y: 374 }
        ],
        walls: [
            { x: 140, y: 66, w: 20, h: 120 }, { x: 140, y: 230, w: 20, h: 140 },
            { x: 260, y: 130, w: 120, h: 24 }, { x: 260, y: 240, w: 120, h: 24 },
            { x: 460, y: 66, w: 20, h: 110 }, { x: 460, y: 230, w: 20, h: 140 }
        ]
    },
    // Stage 2
    {
        name: 'DEEP CAVERN MAZE', subName: 'Stage 2',
        mobs: [
            { x: 300, y: 100, hp: 65, speed: 1.0, color: '#3498db', type: 'normal' },
            { x: 480, y: 110, hp: 65, speed: 0.95, color: '#3498db', type: 'normal' },
            { x: 380, y: 240, hp: 80, speed: 1.1, color: '#2ecc71', type: 'toxic' },
            { x: 510, y: 290, hp: 80, speed: 1.1, color: '#2ecc71', type: 'toxic' },
            { x: 240, y: 310, hp: 65, speed: 0.9, color: '#3498db', type: 'normal' }
        ],
        loots: [{ x: 200, y: 90, type: 'health' }, { x: 420, y: 200, type: 'shield' }],
        torches: [
            { x: 80, y: 64 }, { x: 260, y: 64 }, { x: 440, y: 64 },
            { x: 18, y: 180 }, { x: 622, y: 260 }, { x: 180, y: 374 }, { x: 520, y: 374 }
        ],
        walls: [
            { x: 120, y: 66, w: 20, h: 200 }, { x: 220, y: 140, w: 140, h: 24 },
            { x: 220, y: 240, w: 20, h: 130 }, { x: 340, y: 66, w: 20, h: 110 },
            { x: 440, y: 140, w: 20, h: 130 }, { x: 440, y: 270, w: 100, h: 24 }
        ]
    },
    // Stage 3
    {
        name: 'DARK ROCK TUNNELS', subName: 'Stage 3',
        mobs: [
            { x: 280, y: 100, hp: 70, speed: 1.0, color: '#9b59b6', type: 'normal' },
            { x: 420, y: 100, hp: 70, speed: 1.0, color: '#9b59b6', type: 'normal' },
            { x: 520, y: 220, hp: 70, speed: 1.15, color: '#3498db', type: 'speed' },
            { x: 340, y: 280, hp: 70, speed: 1.15, color: '#3498db', type: 'speed' },
            { x: 200, y: 300, hp: 75, speed: 0.95, color: '#9b59b6', type: 'normal' }
        ],
        loots: [{ x: 180, y: 120, type: 'health' }, { x: 360, y: 200, type: 'shield' }],
        torches: [{ x: 100, y: 64 }, { x: 300, y: 64 }, { x: 500, y: 64 }, { x: 18, y: 220 }, { x: 622, y: 220 }],
        walls: [
            { x: 160, y: 66, w: 24, h: 150 }, { x: 160, y: 270, w: 24, h: 100 },
            { x: 300, y: 140, w: 140, h: 24 }, { x: 480, y: 66, w: 24, h: 200 }
        ]
    },
    // Stage 4
    {
        name: 'CRYSTAL LABYRINTH', subName: 'Stage 4',
        mobs: [
            { x: 240, y: 90, hp: 80, speed: 1.05, color: '#2ecc71', type: 'toxic' },
            { x: 380, y: 90, hp: 80, speed: 1.05, color: '#2ecc71', type: 'toxic' },
            { x: 480, y: 180, hp: 75, speed: 1.2, color: '#3498db', type: 'speed' },
            { x: 320, y: 220, hp: 75, speed: 1.2, color: '#3498db', type: 'speed' },
            { x: 460, y: 300, hp: 80, speed: 1.05, color: '#2ecc71', type: 'toxic' },
            { x: 220, y: 320, hp: 75, speed: 1.2, color: '#3498db', type: 'speed' }
        ],
        loots: [{ x: 160, y: 100, type: 'health' }, { x: 400, y: 280, type: 'shield' }],
        torches: [{ x: 120, y: 64 }, { x: 320, y: 64 }, { x: 520, y: 64 }, { x: 18, y: 180 }, { x: 622, y: 240 }],
        walls: [
            { x: 130, y: 66, w: 24, h: 120 }, { x: 130, y: 220, w: 120, h: 24 },
            { x: 310, y: 120, w: 24, h: 140 }, { x: 430, y: 200, w: 120, h: 24 }
        ]
    },
    // Stage 5
    {
        name: "SLIME CAPTAIN'S HALL", subName: 'Stage 5 (MINI-BOSS)',
        mobs: [
            { x: 450, y: 200, hp: 180, speed: 0.85, color: '#8e44ad', type: 'normal', w: 32, h: 32 },
            { x: 300, y: 100, hp: 85, speed: 1.0, color: '#3498db', type: 'speed' },
            { x: 380, y: 120, hp: 85, speed: 1.0, color: '#3498db', type: 'speed' },
            { x: 300, y: 280, hp: 85, speed: 1.1, color: '#2ecc71', type: 'toxic' },
            { x: 380, y: 300, hp: 85, speed: 1.1, color: '#2ecc71', type: 'toxic' }
        ],
        loots: [{ x: 180, y: 120, type: 'health' }, { x: 260, y: 200, type: 'shield' }, { x: 180, y: 280, type: 'health' }],
        torches: [{ x: 100, y: 64 }, { x: 320, y: 64 }, { x: 540, y: 64 }, { x: 18, y: 160 }, { x: 18, y: 280 }, { x: 622, y: 160 }, { x: 622, y: 280 }],
        walls: [
            { x: 200, y: 120, w: 32, h: 60 }, { x: 200, y: 250, w: 32, h: 60 },
            { x: 400, y: 120, w: 32, h: 60 }, { x: 400, y: 250, w: 32, h: 60 }
        ]
    },
    // Stage 6
    {
        name: 'CORRIDORS OF DOOM', subName: 'Stage 6',
        mobs: [
            { x: 260, y: 90, hp: 90, speed: 1.1, color: '#2ecc71', type: 'toxic' },
            { x: 360, y: 90, hp: 90, speed: 1.1, color: '#2ecc71', type: 'toxic' },
            { x: 460, y: 90, hp: 90, speed: 1.25, color: '#3498db', type: 'speed' },
            { x: 260, y: 280, hp: 90, speed: 1.25, color: '#3498db', type: 'speed' },
            { x: 360, y: 280, hp: 90, speed: 1.1, color: '#2ecc71', type: 'toxic' },
            { x: 460, y: 280, hp: 90, speed: 1.1, color: '#2ecc71', type: 'toxic' },
            { x: 520, y: 180, hp: 95, speed: 1.0, color: '#9b59b6', type: 'normal' }
        ],
        loots: [{ x: 180, y: 100, type: 'health' }, { x: 380, y: 190, type: 'shield' }],
        torches: [{ x: 80, y: 64 }, { x: 280, y: 64 }, { x: 480, y: 64 }, { x: 18, y: 200 }, { x: 622, y: 200 }],
        walls: [
            { x: 140, y: 66, w: 20, h: 180 }, { x: 240, y: 140, w: 140, h: 24 },
            { x: 240, y: 240, w: 20, h: 130 }, { x: 440, y: 66, w: 20, h: 180 }
        ]
    },
    // Stage 7
    {
        name: 'TOXIC SLIME PIT', subName: 'Stage 7',
        mobs: [
            { x: 240, y: 90, hp: 100, speed: 1.15, color: '#2ecc71', type: 'toxic' },
            { x: 340, y: 90, hp: 100, speed: 1.15, color: '#2ecc71', type: 'toxic' },
            { x: 440, y: 90, hp: 100, speed: 1.15, color: '#2ecc71', type: 'toxic' },
            { x: 240, y: 290, hp: 100, speed: 1.15, color: '#2ecc71', type: 'toxic' },
            { x: 340, y: 290, hp: 100, speed: 1.15, color: '#2ecc71', type: 'toxic' },
            { x: 440, y: 290, hp: 100, speed: 1.0, color: '#9b59b6', type: 'normal' },
            { x: 510, y: 180, hp: 100, speed: 1.0, color: '#9b59b6', type: 'normal' },
            { x: 300, y: 190, hp: 105, speed: 1.25, color: '#3498db', type: 'speed' }
        ],
        loots: [{ x: 180, y: 190, type: 'health' }, { x: 380, y: 190, type: 'shield' }],
        torches: [{ x: 100, y: 64 }, { x: 320, y: 64 }, { x: 540, y: 64 }, { x: 18, y: 180 }, { x: 622, y: 240 }],
        walls: [
            { x: 160, y: 66, w: 24, h: 110 }, { x: 160, y: 230, w: 24, h: 140 },
            { x: 320, y: 120, w: 120, h: 24 }, { x: 320, y: 240, w: 120, h: 24 }
        ]
    },
    // Stage 8
    {
        name: 'MAGMA CAVERN', subName: 'Stage 8',
        mobs: [
            { x: 260, y: 90, hp: 115, speed: 1.05, color: '#9b59b6', type: 'normal' },
            { x: 360, y: 90, hp: 115, speed: 1.05, color: '#9b59b6', type: 'normal' },
            { x: 460, y: 90, hp: 115, speed: 1.05, color: '#9b59b6', type: 'normal' },
            { x: 260, y: 290, hp: 115, speed: 1.05, color: '#2ecc71', type: 'toxic' },
            { x: 360, y: 290, hp: 115, speed: 1.3, color: '#3498db', type: 'speed' },
            { x: 460, y: 290, hp: 115, speed: 1.3, color: '#3498db', type: 'speed' },
            { x: 520, y: 180, hp: 120, speed: 1.3, color: '#3498db', type: 'speed' },
            { x: 380, y: 190, hp: 120, speed: 1.3, color: '#3498db', type: 'speed' }
        ],
        loots: [{ x: 180, y: 100, type: 'health' }, { x: 200, y: 280, type: 'shield' }],
        torches: [{ x: 80, y: 64 }, { x: 280, y: 64 }, { x: 480, y: 64 }, { x: 18, y: 160 }, { x: 622, y: 260 }],
        walls: [
            { x: 130, y: 66, w: 24, h: 200 }, { x: 240, y: 140, w: 140, h: 24 },
            { x: 440, y: 140, w: 24, h: 140 }, { x: 240, y: 270, w: 120, h: 24 }
        ]
    },
    // Stage 9
    {
        name: 'ROYAL GUARD GATEWAY', subName: 'Stage 9',
        mobs: [
            { x: 400, y: 140, hp: 210, speed: 0.9, color: '#8e44ad', type: 'normal', w: 32, h: 32 },
            { x: 400, y: 240, hp: 210, speed: 0.9, color: '#8e44ad', type: 'normal', w: 32, h: 32 },
            { x: 260, y: 90, hp: 110, speed: 1.1, color: '#3498db', type: 'speed' },
            { x: 320, y: 90, hp: 110, speed: 1.1, color: '#3498db', type: 'speed' },
            { x: 260, y: 290, hp: 110, speed: 1.15, color: '#2ecc71', type: 'toxic' },
            { x: 320, y: 290, hp: 110, speed: 1.15, color: '#2ecc71', type: 'toxic' },
            { x: 480, y: 90, hp: 110, speed: 1.1, color: '#3498db', type: 'speed' },
            { x: 480, y: 290, hp: 110, speed: 1.15, color: '#2ecc71', type: 'toxic' }
        ],
        loots: [{ x: 180, y: 100, type: 'health' }, { x: 180, y: 280, type: 'shield' }, { x: 300, y: 190, type: 'health' }],
        torches: [{ x: 100, y: 64 }, { x: 320, y: 64 }, { x: 540, y: 64 }, { x: 18, y: 140 }, { x: 18, y: 260 }, { x: 622, y: 140 }, { x: 622, y: 260 }],
        walls: [
            { x: 180, y: 120, w: 32, h: 60 }, { x: 180, y: 250, w: 32, h: 60 },
            { x: 360, y: 66, w: 24, h: 100 }, { x: 360, y: 260, w: 24, h: 110 }
        ]
    },
    // Stage 10 - SLIME KING BOSS STAGE
    {
        name: "SLIME KING'S THRONE ROOM", subName: 'Stage 10 (SLIME KING BOSS)',
        mobs: [
            { x: 460, y: 180, hp: 600, speed: 0.8, color: '#9b59b6', type: 'boss', species: 'slime', w: 54, h: 54 },
            { x: 340, y: 90, hp: 95, speed: 1.1, color: '#3498db', type: 'speed', species: 'slime' },
            { x: 340, y: 290, hp: 95, speed: 1.1, color: '#3498db', type: 'speed', species: 'slime' },
            { x: 260, y: 120, hp: 100, speed: 1.05, color: '#2ecc71', type: 'toxic', species: 'slime' },
            { x: 260, y: 260, hp: 100, speed: 1.05, color: '#2ecc71', type: 'toxic', species: 'slime' }
        ],
        loots: [
            { x: 180, y: 100, type: 'health' }, { x: 180, y: 280, type: 'health' },
            { x: 260, y: 190, type: 'shield' }, { x: 380, y: 190, type: 'shield' }
        ],
        torches: [
            { x: 100, y: 64 }, { x: 320, y: 64 }, { x: 540, y: 64 },
            { x: 18, y: 140 }, { x: 18, y: 260 }, { x: 622, y: 140 }, { x: 622, y: 260 },
            { x: 200, y: 374 }, { x: 440, y: 374 }
        ],
        walls: [
            { x: 200, y: 120, w: 32, h: 60 }, { x: 200, y: 250, w: 32, h: 60 },
            { x: 400, y: 120, w: 32, h: 60 }, { x: 400, y: 250, w: 32, h: 60 }
        ]
    },
    // Stage 11 - ANCIENT GRAVEYARD VAULT
    {
        name: 'GRAVEYARD VAULT', subName: 'Stage 11',
        mobs: [
            { x: 280, y: 100, hp: 120, speed: 0.8, species: 'zombie' },
            { x: 440, y: 100, hp: 120, speed: 0.8, species: 'zombie' },
            { x: 320, y: 280, hp: 100, speed: 1.15, species: 'skeleton' },
            { x: 480, y: 280, hp: 100, speed: 1.15, species: 'skeleton' },
            { x: 200, y: 190, hp: 110, speed: 1.05, color: '#2ecc71', species: 'slime' }
        ],
        loots: [{ x: 180, y: 120, type: 'health' }, { x: 360, y: 200, type: 'shield' }],
        torches: [{ x: 100, y: 64 }, { x: 300, y: 64 }, { x: 500, y: 64 }, { x: 18, y: 200 }, { x: 622, y: 200 }],
        walls: [
            { x: 160, y: 66, w: 24, h: 140 }, { x: 160, y: 250, w: 24, h: 120 },
            { x: 340, y: 140, w: 120, h: 24 }, { x: 480, y: 66, w: 24, h: 200 }
        ]
    },
    // Stage 12 - BONE CRYPT CORRIDOR
    {
        name: 'BONE CRYPT CORRIDOR', subName: 'Stage 12',
        mobs: [
            { x: 260, y: 90, hp: 110, speed: 1.2, species: 'skeleton' },
            { x: 360, y: 90, hp: 110, speed: 1.2, species: 'skeleton' },
            { x: 460, y: 90, hp: 110, speed: 1.2, species: 'skeleton' },
            { x: 260, y: 290, hp: 110, speed: 1.2, species: 'skeleton' },
            { x: 460, y: 290, hp: 115, speed: 1.25, color: '#3498db', species: 'slime' }
        ],
        loots: [{ x: 200, y: 100, type: 'health' }, { x: 400, y: 200, type: 'shield' }],
        torches: [{ x: 80, y: 64 }, { x: 280, y: 64 }, { x: 480, y: 64 }, { x: 18, y: 180 }, { x: 622, y: 240 }],
        walls: [
            { x: 140, y: 66, w: 20, h: 180 }, { x: 240, y: 140, w: 140, h: 24 },
            { x: 440, y: 140, w: 20, h: 180 }
        ]
    },
    // Stage 13 - ROTTING ZOMBIE PIT
    {
        name: 'ROTTING ZOMBIE PIT', subName: 'Stage 13',
        mobs: [
            { x: 240, y: 90, hp: 140, speed: 0.8, species: 'zombie' },
            { x: 340, y: 90, hp: 140, speed: 0.8, species: 'zombie' },
            { x: 440, y: 90, hp: 140, speed: 0.8, species: 'zombie' },
            { x: 240, y: 290, hp: 140, speed: 0.8, species: 'zombie' },
            { x: 340, y: 290, hp: 140, speed: 0.8, species: 'zombie' },
            { x: 480, y: 190, hp: 120, speed: 1.05, color: '#9b59b6', species: 'slime' }
        ],
        loots: [{ x: 180, y: 190, type: 'health' }, { x: 380, y: 190, type: 'shield' }],
        torches: [{ x: 100, y: 64 }, { x: 320, y: 64 }, { x: 540, y: 64 }, { x: 18, y: 180 }, { x: 622, y: 240 }],
        walls: [
            { x: 160, y: 66, w: 24, h: 110 }, { x: 160, y: 230, w: 24, h: 140 },
            { x: 320, y: 120, w: 120, h: 24 }, { x: 320, y: 240, w: 120, h: 24 }
        ]
    },
    // Stage 14 - NECROPOLIS MAZE
    {
        name: 'NECROPOLIS MAZE', subName: 'Stage 14',
        mobs: [
            { x: 260, y: 90, hp: 130, speed: 0.82, species: 'zombie' },
            { x: 360, y: 90, hp: 130, speed: 0.82, species: 'zombie' },
            { x: 460, y: 90, hp: 120, speed: 1.2, species: 'skeleton' },
            { x: 260, y: 280, hp: 120, speed: 1.2, species: 'skeleton' },
            { x: 360, y: 280, hp: 130, speed: 0.82, species: 'zombie' },
            { x: 460, y: 280, hp: 120, speed: 1.2, species: 'skeleton' }
        ],
        loots: [{ x: 180, y: 100, type: 'health' }, { x: 380, y: 280, type: 'shield' }],
        torches: [{ x: 80, y: 64 }, { x: 280, y: 64 }, { x: 480, y: 64 }, { x: 18, y: 160 }, { x: 622, y: 260 }],
        walls: [
            { x: 130, y: 66, w: 24, h: 200 }, { x: 240, y: 140, w: 140, h: 24 },
            { x: 440, y: 140, w: 24, h: 140 }
        ]
    },
    // Stage 15 - ZOMBIE WARLORD'S TOMB (MINI-BOSS)
    {
        name: "ZOMBIE WARLORD'S TOMB", subName: 'Stage 15 (MINI-BOSS)',
        mobs: [
            { x: 450, y: 190, hp: 450, speed: 0.78, species: 'zombie', type: 'boss', w: 38, h: 42 },
            { x: 300, y: 100, hp: 125, speed: 1.2, species: 'skeleton' },
            { x: 380, y: 120, hp: 125, speed: 1.2, species: 'skeleton' },
            { x: 300, y: 280, hp: 130, speed: 0.85, species: 'zombie' },
            { x: 380, y: 300, hp: 130, speed: 0.85, species: 'zombie' }
        ],
        loots: [{ x: 180, y: 120, type: 'health' }, { x: 260, y: 200, type: 'shield' }, { x: 180, y: 280, type: 'health' }],
        torches: [{ x: 100, y: 64 }, { x: 320, y: 64 }, { x: 540, y: 64 }, { x: 18, y: 160 }, { x: 18, y: 280 }, { x: 622, y: 160 }, { x: 622, y: 280 }],
        walls: [
            { x: 200, y: 120, w: 32, h: 60 }, { x: 200, y: 250, w: 32, h: 60 },
            { x: 400, y: 120, w: 32, h: 60 }, { x: 400, y: 250, w: 32, h: 60 }
        ]
    },
    // Stage 16 - SKULL CAVERN
    {
        name: 'SKULL CAVERN', subName: 'Stage 16',
        mobs: [
            { x: 240, y: 90, hp: 135, speed: 1.25, species: 'skeleton' },
            { x: 340, y: 90, hp: 135, speed: 1.25, species: 'skeleton' },
            { x: 440, y: 90, hp: 135, speed: 1.25, species: 'skeleton' },
            { x: 240, y: 290, hp: 135, speed: 1.25, species: 'skeleton' },
            { x: 340, y: 290, hp: 135, speed: 1.25, species: 'skeleton' },
            { x: 480, y: 190, hp: 140, speed: 1.1, color: '#9b59b6', species: 'slime' }
        ],
        loots: [{ x: 180, y: 100, type: 'health' }, { x: 380, y: 190, type: 'shield' }],
        torches: [{ x: 80, y: 64 }, { x: 280, y: 64 }, { x: 480, y: 64 }, { x: 18, y: 200 }, { x: 622, y: 200 }],
        walls: [
            { x: 140, y: 66, w: 20, h: 180 }, { x: 240, y: 140, w: 140, h: 24 },
            { x: 440, y: 66, w: 20, h: 180 }
        ]
    },
    // Stage 17 - UNDEAD HORDE HALL
    {
        name: 'UNDEAD HORDE HALL', subName: 'Stage 17',
        mobs: [
            { x: 240, y: 90, hp: 150, speed: 0.85, species: 'zombie' },
            { x: 340, y: 90, hp: 140, speed: 1.25, species: 'skeleton' },
            { x: 440, y: 90, hp: 150, speed: 0.85, species: 'zombie' },
            { x: 240, y: 290, hp: 140, speed: 1.25, species: 'skeleton' },
            { x: 340, y: 290, hp: 150, speed: 0.85, species: 'zombie' },
            { x: 440, y: 290, hp: 140, speed: 1.25, species: 'skeleton' },
            { x: 520, y: 190, hp: 150, speed: 0.85, species: 'zombie' }
        ],
        loots: [{ x: 180, y: 190, type: 'health' }, { x: 380, y: 190, type: 'shield' }],
        torches: [{ x: 100, y: 64 }, { x: 320, y: 64 }, { x: 540, y: 64 }, { x: 18, y: 180 }, { x: 622, y: 240 }],
        walls: [
            { x: 160, y: 66, w: 24, h: 110 }, { x: 160, y: 230, w: 24, h: 140 },
            { x: 320, y: 120, w: 120, h: 24 }, { x: 320, y: 240, w: 120, h: 24 }
        ]
    },
    // Stage 18 - LICH ANTECHAMBER
    {
        name: 'LICH ANTECHAMBER', subName: 'Stage 18',
        mobs: [
            { x: 440, y: 190, hp: 320, speed: 1.15, species: 'skeleton', type: 'boss', w: 34, h: 36 },
            { x: 260, y: 90, hp: 155, speed: 0.88, species: 'zombie' },
            { x: 340, y: 90, hp: 155, speed: 0.88, species: 'zombie' },
            { x: 260, y: 290, hp: 145, speed: 1.3, color: '#3498db', species: 'slime' },
            { x: 340, y: 290, hp: 145, speed: 1.3, color: '#3498db', species: 'slime' }
        ],
        loots: [{ x: 180, y: 100, type: 'health' }, { x: 200, y: 280, type: 'shield' }],
        torches: [{ x: 80, y: 64 }, { x: 280, y: 64 }, { x: 480, y: 64 }, { x: 18, y: 160 }, { x: 622, y: 260 }],
        walls: [
            { x: 130, y: 66, w: 24, h: 200 }, { x: 240, y: 140, w: 140, h: 24 },
            { x: 440, y: 140, w: 24, h: 140 }
        ]
    },
    // Stage 19 - GATE OF DECAY
    {
        name: 'GATE OF DECAY', subName: 'Stage 19',
        mobs: [
            { x: 260, y: 90, hp: 160, speed: 0.9, species: 'zombie' },
            { x: 340, y: 90, hp: 150, speed: 1.3, species: 'skeleton' },
            { x: 440, y: 90, hp: 160, speed: 0.9, species: 'zombie' },
            { x: 260, y: 290, hp: 150, speed: 1.3, species: 'skeleton' },
            { x: 340, y: 290, hp: 160, speed: 0.9, species: 'zombie' },
            { x: 440, y: 290, hp: 150, speed: 1.3, species: 'skeleton' },
            { x: 500, y: 190, hp: 160, speed: 1.15, color: '#9b59b6', species: 'slime' }
        ],
        loots: [{ x: 180, y: 100, type: 'health' }, { x: 180, y: 280, type: 'shield' }, { x: 300, y: 190, type: 'health' }],
        torches: [{ x: 100, y: 64 }, { x: 320, y: 64 }, { x: 540, y: 64 }, { x: 18, y: 140 }, { x: 18, y: 260 }, { x: 622, y: 140 }, { x: 622, y: 260 }],
        walls: [
            { x: 180, y: 120, w: 32, h: 60 }, { x: 180, y: 250, w: 32, h: 60 },
            { x: 360, y: 66, w: 24, h: 100 }, { x: 360, y: 260, w: 24, h: 110 }
        ]
    },
    // Stage 20 - SKELETON KING BOSS STAGE
    {
        name: "SKELETON KING'S CATACOMB", subName: 'Stage 20 (SKELETON KING BOSS)',
        mobs: [
            { x: 460, y: 180, hp: 800, speed: 0.85, species: 'skeleton', type: 'boss', w: 56, h: 56 },
            { x: 340, y: 90, hp: 160, speed: 0.88, species: 'zombie' },
            { x: 340, y: 290, hp: 160, speed: 0.88, species: 'zombie' },
            { x: 260, y: 120, hp: 150, speed: 1.25, species: 'skeleton' },
            { x: 260, y: 260, hp: 150, speed: 1.25, species: 'skeleton' }
        ],
        loots: [
            { x: 180, y: 100, type: 'health' }, { x: 180, y: 280, type: 'health' },
            { x: 260, y: 190, type: 'shield' }, { x: 380, y: 190, type: 'shield' }
        ],
        torches: [
            { x: 100, y: 64 }, { x: 320, y: 64 }, { x: 540, y: 64 },
            { x: 18, y: 140 }, { x: 18, y: 260 }, { x: 622, y: 140 }, { x: 622, y: 260 },
            { x: 200, y: 374 }, { x: 440, y: 374 }
        ],
        walls: [
            { x: 200, y: 120, w: 32, h: 60 }, { x: 200, y: 250, w: 32, h: 60 },
            { x: 400, y: 120, w: 32, h: 60 }, { x: 400, y: 250, w: 32, h: 60 }
        ]
    },
    // Stage 21 - ANCIENT DRAGON BOSS STAGE
    {
        name: "ANCIENT DRAGON'S LAIR", subName: 'Stage 21 (ANCIENT DRAGON BOSS)',
        mobs: [
            { x: 440, y: 170, hp: 1500, speed: 0.85, species: 'dragon', type: 'boss', w: 72, h: 72 },
            { x: 300, y: 90, hp: 180, speed: 0.85, species: 'zombie' },
            { x: 300, y: 290, hp: 180, speed: 0.85, species: 'zombie' },
            { x: 220, y: 120, hp: 160, speed: 1.25, species: 'skeleton' },
            { x: 220, y: 260, hp: 160, speed: 1.25, species: 'skeleton' }
        ],
        loots: [
            { x: 160, y: 100, type: 'health' }, { x: 160, y: 280, type: 'health' },
            { x: 240, y: 190, type: 'shield' }, { x: 360, y: 190, type: 'shield' },
            { x: 480, y: 100, type: 'health' }, { x: 480, y: 280, type: 'shield' }
        ],
        torches: [
            { x: 80, y: 64 }, { x: 280, y: 64 }, { x: 480, y: 64 },
            { x: 18, y: 140 }, { x: 18, y: 260 }, { x: 622, y: 140 }, { x: 622, y: 260 },
            { x: 180, y: 374 }, { x: 460, y: 374 }
        ],
        walls: [
            { x: 180, y: 110, w: 36, h: 64 }, { x: 180, y: 250, w: 36, h: 64 },
            { x: 380, y: 110, w: 36, h: 64 }, { x: 380, y: 250, w: 36, h: 64 }
        ]
    }
];
