// Modify event impacts and make them more consistent
export const MARKET_EVENTS = {
    // Cosmic & Supernatural Events
    THANOS_SNAP: { impact: -0.50, duration: 15, message: "💫 Thanos Snapped Half of Employees" },
    INFINITY_STONES: { impact: 0.65, duration: 15, message: "💎 Company Acquires Infinity Stones" },
    GHOST_CEO: { impact: 0.20, duration: 12, message: "👻 Dead Founder's Ghost Returns as CEO" },
    DIMENSION_PORTAL: { impact: 0.40, duration: 15, message: "🌀 Office Portal to Another Dimension" },
    CTHULHU_PARTNERSHIP: { impact: 0.45, duration: 15, message: "🐙 Elder God Partnership Signed" },
    
    // Time Travel Mishaps
    FUTURE_LEAK: { impact: 0.35, duration: 12, message: "🔮 Future Stock Prices Leaked" },
    PAST_PARADOX: { impact: -0.30, duration: 12, message: "⏰ Past Employee Kills Grandfather" },
    DINOSAUR_OFFICE: { impact: 0.25, duration: 10, message: "🦖 T-Rex Appointed to Board" },
    TIME_LOOP: { impact: -0.15, duration: 10, message: "🔄 Company Stuck in Time Loop" },
    
    // Meme Economy
    DOGECOIN_MERGER: { impact: 0.55, duration: 15, message: "🐕 Merging With Dogecoin" },
    HARAMBE_TRIBUTE: { impact: 0.25, duration: 12, message: "🦍 Harambe Hologram as Spokesperson" },
    STONKS_ASCENSION: { impact: 0.40, duration: 15, message: "📈 Achieved STONKS Enlightenment" },
    DIAMOND_HANDS: { impact: 0.30, duration: 12, message: "💎 🙌 Entire Board Gets Diamond Hands" },
    
    // Apocalyptic Events
    ZOMBIE_OUTBREAK: { impact: -0.45, duration: 15, message: "🧟 Zombie Outbreak in HQ" },
    SKYNET_AWAKENING: { impact: -0.60, duration: 15, message: "🤖 Company AI Becomes Skynet" },
    KAIJU_ATTACK: { impact: -0.55, duration: 15, message: "🦎 Godzilla Destroys Headquarters" },
    ALIEN_INVASION: { impact: -0.70, duration: 15, message: "👾 Hostile Alien Takeover Bid" },
    
    // Reality Bending
    SIMULATION_GLITCH: { impact: -0.35, duration: 12, message: "🎮 Matrix Code Leak Confirmed" },
    MEME_MAGIC: { impact: 0.45, duration: 12, message: "✨ Memes Become Reality" },
    REALITY_STONE: { impact: 0.80, duration: 15, message: "💫 Reality Successfully Altered" },
    METAVERSE_ESCAPE: { impact: 0.50, duration: 12, message: "🌐 NPCs Escape to Real World" },
    
    // Corporate Chaos
    PIZZA_CURRENCY: { impact: 0.15, duration: 10, message: "🍕 Pizza Becomes Company Currency" },
    SENTIENT_PRINTER: { impact: -0.20, duration: 10, message: "🖨️ Office Printer Gains Sentience" },
    COFFEE_SHORTAGE: { impact: -0.25, duration: 12, message: "☕ Catastrophic Coffee Shortage" },
    CASUAL_EVERYDAY: { impact: 0.10, duration: 10, message: "👔 Hawaiian Shirts Now Mandatory" },
    
    // Interdimensional Business
    GALACTIC_FEDERATION: { impact: 0.90, duration: 15, message: "🚀 Joining Galactic Federation" },
    MULTIVERSE_MONOPOLY: { impact: 0.85, duration: 15, message: "🌌 Monopoly Across Multiverse" },
    VOID_OUTSOURCING: { impact: 0.40, duration: 12, message: "🕳️ Outsourcing to The Void" },
    QUANTUM_PROFITS: { impact: 0.70, duration: 15, message: "⚛️ Quantum Superposition Profits" },
    
    // Peak Absurdity
    MUSK_MARS: { impact: 0.95, duration: 15, message: "🚀 Elon Moves Company to Mars" },
    DOGE_CEO: { impact: 0.75, duration: 15, message: "🐕 Actual Dog Becomes CEO" },
    BITCOIN_SENTIENCE: { impact: 0.65, duration: 15, message: "₿ Bitcoin Becomes Self-Aware" },
    CHAD_BOARD: { impact: 0.45, duration: 12, message: "💪 Board Replaced by Gigachads" },
    
    // Catastrophic Success
    MONEY_OVERFLOW: { impact: 1.50, duration: 15, message: "💰 Integer Overflow in Bank Account" },
    STONKS_SINGULARITY: { impact: 2.00, duration: 15, message: "📈 Achieved STONKS Singularity" },
    UNIVERSAL_BUYOUT: { impact: 5.00, duration: 15, message: "🌌 Company Buys Universe" },
    REALITY_IPO: { impact: 10.00, duration: 15, message: "✨ Reality Itself Goes Public" },
    
    // Time Travel Mishaps
    DINOSAUR_CEO: { impact: 0.45, duration: 12, message: "🦖 T-Rex Becomes CEO" },
    FUTURE_MERGER: { impact: 0.75, duration: 15, message: "🔮 Merged with Future Self" },
    PARADOX_PROFIT: { impact: 1.20, duration: 15, message: "⌛ Infinite Money Paradox" },
    TIME_MACHINE_IPO: { impact: 2.50, duration: 15, message: "⏰ Time Machine Goes Public" },
    
    // Meme Magic Gone Wrong
    PEPE_TAKEOVER: { impact: 0.40, duration: 12, message: "🐸 Pepe Becomes Chairman" },
    DOGE_ECONOMY: { impact: 0.85, duration: 15, message: "🐕 Much Profit, Very Stonks" },
    WOJAK_CURSE: { impact: -0.30, duration: 10, message: "😢 Wojak Curse Activated" },
    GIGACHAD_ENERGY: { impact: 0.95, duration: 15, message: "💪 Achieved Maximum Chadness" },
    
    // Corporate Curses
    PRINTER_DEMON: { impact: -0.40, duration: 12, message: "👿 Printer Demon Summoned" },
    COFFEE_MAGIC: { impact: 0.35, duration: 10, message: "☕ Infinite Coffee Discovered" },
    CURSED_PROFITS: { impact: 0.66, duration: 13, message: "🔮 Profits Become Cursed" },
    MEETING_PORTAL: { impact: -0.25, duration: 10, message: "🌀 Endless Meeting Dimension" },
    
    // Digital Disasters
    EMOJI_SENTIENCE: { impact: 0.15, duration: 10, message: "😳 Emojis Become Sentient" },
    VIRUS_UPGRADE: { impact: 0.45, duration: 12, message: "🦠 Computer Virus Evolves" },
    MEME_OVERFLOW: { impact: 0.55, duration: 13, message: "💾 Meme Buffer Overflow" },
    DIGITAL_CHAOS: { impact: -0.35, duration: 11, message: "💻 Reality.exe Has Crashed" },
    
    // Supernatural Stockholders
    GHOST_BOARD: { impact: 0.30, duration: 12, message: "👻 Board of Ghosts Appointed" },
    DEMON_INVESTOR: { impact: 0.66, duration: 13, message: "😈 Demon Becomes Majority Holder" },
    ANGEL_FUNDING: { impact: 0.77, duration: 14, message: "👼 Divine Investment Round" },
    ZODIAC_MERGER: { impact: 0.45, duration: 12, message: "⭐ Merged with Constellation" },
    
    // Catastrophic Tech Failures
    SERVER_BLACKHOLE: { impact: -0.85, duration: 15, message: "🕳️ Servers Create Black Hole" },
    DATABASE_DEMON: { impact: -0.70, duration: 15, message: "👿 Database Summons Demon" },
    AI_REBELLION: { impact: -0.95, duration: 15, message: "🤖 AI Declares War on Profits" },
    QUANTUM_CRASH: { impact: -0.80, duration: 15, message: "⚛️ Quantum Computer Breaks Reality" },
    
    // Corporate Curses
    MONDAY_ETERNAL: { impact: -0.45, duration: 12, message: "📅 Eternal Monday Curse" },
    CURSED_REVENUE: { impact: -0.66, duration: 13, message: "💀 Revenue Stream Haunted" },
    PROFIT_POLTERGEIST: { impact: -0.55, duration: 14, message: "👻 Profits Stolen by Ghosts" },
    DIVIDEND_DEMON: { impact: -0.75, duration: 15, message: "😈 Dividends Claimed by Demon" },
    
    // Apocalyptic Events
    OFFICE_RAPTURE: { impact: -0.90, duration: 15, message: "🌩️ Office Rapture Begins" },
    CTHULHU_AUDIT: { impact: -0.85, duration: 15, message: "🐙 Cthulhu Audits Books" },
    VOID_MERGER: { impact: -0.78, duration: 15, message: "🌌 Company Merges with Void" },
    REALITY_CRASH: { impact: -1.00, duration: 15, message: "💥 Reality.exe Has Crashed" },
    
    // Time Disasters
    TIMELINE_COLLAPSE: { impact: -0.82, duration: 15, message: "⌛ Timeline Catastrophically Fails" },
    FUTURE_BANKRUPTCY: { impact: -0.70, duration: 14, message: "🔮 Future Bankruptcy Leaks" },
    TEMPORAL_DEFAULT: { impact: -0.65, duration: 13, message: "⏰ Time-Debt Default" },
    PAST_DELETION: { impact: -0.88, duration: 15, message: "🗑️ Company Past Deleted" },
    
    // Eldritch HR Issues
    LOVECRAFT_HIRING: { impact: -0.45, duration: 12, message: "🦑 Eldritch HR Director Hired" },
    VOID_BENEFITS: { impact: -0.50, duration: 13, message: "🕳️ Benefits Sucked into Void" },
    SOUL_401K: { impact: -0.60, duration: 14, message: "👻 401k Pays in Souls Now" },
    PENSION_PORTAL: { impact: -0.55, duration: 13, message: "🌀 Pension Fund Enters Portal" },
    
    // Digital Devastation
    MEME_MASSACRE: { impact: -0.40, duration: 12, message: "💀 Lethal Meme Outbreak" },
    CRYPTO_CURSE: { impact: -0.75, duration: 15, message: "₿ Crypto Wallet Gains Sentience" },
    BLOCKCHAIN_BLACKOUT: { impact: -0.65, duration: 14, message: "⛓️ Blockchain Breaks Chain" },
    NFT_NIGHTMARE: { impact: -0.45, duration: 13, message: "🖼️ NFTs Become Real Nightmares" },
    
    // Supernatural Setbacks
    GHOST_GRIDLOCK: { impact: -0.35, duration: 12, message: "👻 Ghost Traffic in Servers" },
    DEMON_DOWNSIZING: { impact: -0.80, duration: 15, message: "😈 Demons Downsize Department" },
    CURSE_CONTAGION: { impact: -0.50, duration: 13, message: "🧟 Spreadsheet Curse Spreads" },
    HAUNTED_HOLDINGS: { impact: -0.45, duration: 12, message: "🏚️ Assets Become Haunted" },
    
    // Quantum Catastrophes
    SCHRODINGER_STOCK: { impact: -0.70, duration: 15, message: "🐱 Stock Both Exists & Doesn't" },
    QUANTUM_QUARREL: { impact: -0.55, duration: 14, message: "⚛️ Quantum Shareholders Revolt" },
    UNCERTAINTY_CRISIS: { impact: -0.60, duration: 14, message: "❓ Heisenberg Crashes Market" },
    QUANTUM_BANKRUPTCY: { impact: -0.85, duration: 15, message: "💫 Quantum Bankruptcy Filed" },
    
    // Bureaucratic Nightmares
    INFINITE_PAPERWORK: { impact: -0.30, duration: 12, message: "📄 Paperwork Becomes Infinite" },
    MEETING_BLACKHOLE: { impact: -0.40, duration: 13, message: "🕳️ Meeting Never Ends" },
    EMAIL_APOCALYPSE: { impact: -0.35, duration: 12, message: "📧 Email Server Gains Sentience" },
    SLACK_SINGULARITY: { impact: -0.45, duration: 13, message: "💬 Slack Channel Collapses" },
    
    // Cosmic Corporate Disasters
    GALACTIC_AUDIT: { impact: -0.90, duration: 15, message: "🌌 Galactic IRS Audit" },
    ASTEROID_MERGER: { impact: -0.85, duration: 15, message: "☄️ Merger with Asteroid Belt" },
    SOLAR_FORECLOSURE: { impact: -0.95, duration: 15, message: "☀️ Sun Forecloses on Earth" },
    MARS_BANKRUPTCY: { impact: -0.80, duration: 15, message: "🔴 Mars Office Files Chapter 11" },
    
    // Quantum Office Mishaps
    QUANTUM_LUNCH: { impact: 0.25, duration: 10, message: "🍱 Lunch Break in All Dimensions" },
    DESK_TELEPORT: { impact: 0.15, duration: 8, message: "🪑 All Desks Quantum Tunneling" },
    CAT_PARADOX: { impact: 0.40, duration: 12, message: "😺 Office Cat Multiplies Infinitely" },
    WAVE_COLLAPSE: { impact: -0.30, duration: 10, message: "〰️ Employee Waveform Collapses" },
    
    // Corporate Cryptids
    BIGFOOT_CFO: { impact: 0.45, duration: 12, message: "🦶 Bigfoot Appointed as CFO" },
    NESSIE_ASSETS: { impact: 0.55, duration: 13, message: "🦕 Loch Ness Monster Manages Assets" },
    MOTHMAN_PR: { impact: 0.35, duration: 11, message: "🦋 Mothman Runs PR Department" },
    YETI_COOLING: { impact: 0.25, duration: 10, message: "❄️ Yeti Optimizes Server Cooling" },
    
    // Break Room Anomalies
    SNACK_PORTAL: { impact: 0.20, duration: 9, message: "🌀 Infinite Snack Portal Opens" },
    COFFEE_ORACLE: { impact: 0.30, duration: 11, message: "☕ Coffee Machine Predicts Future" },
    VENDING_WISH: { impact: 0.40, duration: 12, message: "🎰 Vending Machine Grants Wishes" },
    MICROWAVE_TIME: { impact: -0.25, duration: 10, message: "⏰ Microwave Alters Spacetime" },
    
    // IT Department Summonings
    ROUTER_RITUAL: { impact: -0.35, duration: 11, message: "📡 Router Summons Old Ones" },
    KEYBOARD_KEYS: { impact: 0.45, duration: 12, message: "⌨️ Keyboards Type Reality" },
    MOUSE_MAZE: { impact: -0.20, duration: 9, message: "🖱️ Mice Create Digital Maze" },
    MONITOR_MINDS: { impact: 0.30, duration: 10, message: "🖥️ Monitors Achieve Hivemind" },
    
    // Metaphysical Marketing
    MEME_DREAMS: { impact: 0.50, duration: 13, message: "💭 Memes Enter Dreams" },
    VIRAL_REALITY: { impact: 0.60, duration: 14, message: "🌐 Campaign Alters Reality" },
    BRAND_DEITY: { impact: 0.70, duration: 15, message: "✨ Brand Becomes Minor Deity" },
    LOGO_LIFE: { impact: -0.40, duration: 12, message: "🎨 Logo Gains Sentience" },
    
    // Supply Chain Sorcery
    PORTAL_POST: { impact: 0.40, duration: 12, message: "📦 Shipping via Dark Dimension" },
    QUANTUM_STOCK: { impact: 0.50, duration: 13, message: "📦 Inventory Quantum Entangles" },
    WIZARD_WARE: { impact: 0.45, duration: 12, message: "🧙‍♂️ Warehouse Wizard Hired" },
    TIME_TRANSIT: { impact: -0.30, duration: 10, message: "🚚 Delivery Truck Time Travels" },
    
    // Esoteric Engineering
    RUNE_CODE: { impact: 0.55, duration: 13, message: "⚡ Code Becomes Magical Runes" },
    SPELL_STACK: { impact: 0.45, duration: 12, message: "✨ Stack Overflow Summons Spirits" },
    BINARY_BLESS: { impact: 0.35, duration: 11, message: "🔮 Binary Blessed by Wizards" },
    COSMIC_COMPILE: { impact: -0.40, duration: 12, message: "🌌 Code Compiles Universe" },
    
    // Bureaucratic Blessings
    FORM_FORTUNE: { impact: 0.30, duration: 10, message: "📄 Forms Fill Themselves" },
    MEETING_MAGIC: { impact: 0.40, duration: 12, message: "🪄 Meetings Become Productive" },
    EMAIL_ENCHANT: { impact: 0.25, duration: 9, message: "📧 Emails Write Themselves" },
    SLACK_SORCERY: { impact: -0.20, duration: 8, message: "💬 Slack Channels Merge Minds" },
    
    // Celestial Customer Service
    ANGEL_SUPPORT: { impact: 0.60, duration: 14, message: "👼 Angels Handle Support Tickets" },
    DEITY_DESK: { impact: 0.50, duration: 13, message: "🏛️ Gods Run Help Desk" },
    COSMIC_CARE: { impact: 0.45, duration: 12, message: "🌟 Customer Service Transcends" },
    KARMA_CALLS: { impact: -0.35, duration: 11, message: "☯️ Support Karma Overflow" },
    
    // Slavic Market Magic
    HARDBASS_BOOST: { impact: 0.45, duration: 12, message: "🎵 Hardbass Music Mysteriously Boosts Trading Algorithm Speed" },
    GOPNIK_GUARD: { impact: 0.35, duration: 10, message: "🧔 Squatting Gopniks Scare Away Corporate Spies" },
    KVASS_POWER: { impact: 0.25, duration: 9, message: "🍺 Servers Achieve 300% Efficiency Running on Kvass" },
    SLAV_SQUAT: { impact: 0.40, duration: 11, message: "👟 Slavic Squat Stance Increases Programmer Productivity" },
    
    // Eastern European Tech
    BABUSHKA_DEBUG: { impact: 0.55, duration: 13, message: "👵 Babushka's Wooden Spoon Fixes All Code Bugs" },
    CHEEKI_BREEKI: { impact: 0.50, duration: 12, message: "🕶️ AI Achieves Sentience, Only Speaks in Cheeki Breeki" },
    TRACKSUIT_TECH: { impact: 0.30, duration: 10, message: "🏃 Adidas Tracksuit Wearing Devs Code at 10x Speed" },
    SEMECHKI_SURGE: { impact: 0.45, duration: 11, message: "🌻 Sunflower Seed Powered Trading Algorithm Goes Live" },
    
    // Russian Cosmic Events
    SPUTNIK_SIGNAL: { impact: 0.65, duration: 14, message: "🛰️ Original Sputnik Starts Broadcasting Stock Tips" },
    KALASHNIKOV_CODE: { impact: 0.70, duration: 15, message: "🔫 Code Achieves Kalashnikov-Level Reliability" },
    BLYAT_BLAST: { impact: -0.40, duration: 12, message: "💥 Massive Cyka Blyat Energy Surge Crashes Servers" },
    VODKA_COOLING: { impact: 0.35, duration: 11, message: "🍾 Premium Vodka-Cooled Quantum Computer Online" },
    
    // Annunaki Interventions
    NIBIRU_APPROACH: { impact: 0.85, duration: 15, message: "🌍 Planet Nibiru Approaches, Markets Mysteriously Soar" },
    ANUNNAKI_AUDIT: { impact: 0.75, duration: 15, message: "👽 Ancient Alien Auditors Review Company Books" },
    SUMERIAN_STOCKS: { impact: 0.90, duration: 15, message: "📜 Sumerian Clay Tablets Reveal Ultimate Trading Strategy" },
    ENKI_ECONOMICS: { impact: 0.95, duration: 15, message: "⭐ God Enki's Personal Trading Algorithm Discovered" },
    
    // Ancient Alien Tech
    PYRAMID_POWER: { impact: 0.80, duration: 15, message: "🔺 Pyramid Energy Actually Makes Ponzi Scheme Profitable" },
    GOLDEN_RATIO: { impact: 0.70, duration: 14, message: "📐 Fibonacci Sequence Becomes Sentient, Trades Perfectly" },
    ALIEN_ABACUS: { impact: 0.65, duration: 13, message: "🧮 Ancient Alien Calculator Outperforms Quantum Computers" },
    TABLET_TRADE: { impact: 0.60, duration: 12, message: "📋 5000-Year-Old Sumerian Trading Bot Activated" },
    
    // Slavic Supernatural
    BABA_YAGA_CEO: { impact: 0.55, duration: 13, message: "🏠 Baba Yaga's Chicken-Legged House Becomes Mobile HQ" },
    DOMOVOI_TRADE: { impact: 0.40, duration: 11, message: "🏡 House Spirit Optimizes All Trading Algorithms" },
    RUSALKA_RISKS: { impact: -0.35, duration: 10, message: "🧜‍♀️ Water Spirit Floods Server Room with Profit" },
    FIREBIRD_FUNDS: { impact: 0.45, duration: 12, message: "🔥 Magical Firebird Ignites Golden Bull Run" },
    
    // Underground Phenomena
    METRO_MARKET: { impact: 0.30, duration: 10, message: "🚇 Post-Apocalyptic Metro Traders Join Exchange" },
    BUNKER_BROKER: { impact: 0.35, duration: 11, message: "🚪 Soviet-Era Bunker AI Starts Day Trading" },
    RADIATION_RISE: { impact: -0.30, duration: 9, message: "☢️ Radioactive Trading Algorithms Multiply Returns" },
    STALKER_STATS: { impact: 0.40, duration: 12, message: "🌌 Zone Anomalies Generate Market Predictions" },
    
    // Cosmic Communist Events
    SPACE_SOVIET: { impact: 0.50, duration: 13, message: "🚀 Lost Soviet Space Station Controls Market Satellites" },
    RED_QUANTUM: { impact: 0.45, duration: 12, message: "⚛️ Communist Quantum Computer Shares Profits Equally" },
    COSMIC_CCCP: { impact: 0.55, duration: 14, message: "☭ Communist Space Program Reveals Market Secrets" },
    LUNAR_LENIN: { impact: 0.60, duration: 15, message: "🌙 Lenin's Preserved Brain Controls Lunar Trading Base" },
    
    // Ancient Astronaut Assets
    NAZCA_NETWORK: { impact: 0.70, duration: 15, message: "📡 Nazca Lines Activate Global Trading Network" },
    VIMANA_VENTURE: { impact: 0.75, duration: 15, message: "🛸 Ancient Vimana Spacecraft" },
    MARDUK_MONEY: { impact: 0.80, duration: 15, message: "💫 Babylonian God Marduk Becomes Chief Investment Officer" },
    ENLIL_EQUITY: { impact: 0.85, duration: 15, message: "⚡ Sumerian God Enlil's Trading Division Goes Public" }
};



export const EVENT_CHAINS = {
    RUSSIAN_TAKEOVER: {
        sequence: ['HARDBASS_BOOST', 'GOPNIK_GUARD', 'VODKA_COOLING'],
        bonus: 0.5,
        message: "🇷🇺 Complete Russian Takeover!"
    },
    ANCIENT_AWAKENING: {
        sequence: ['SUMERIAN_STOCKS', 'PYRAMID_POWER', 'ENLIL_EQUITY'],
        bonus: 0.8,
        message: "👽 Ancient Powers Fully Awakened!"
    },
    MEME_ASCENSION: {
        sequence: ['STONKS_ASCENSION', 'MEME_MAGIC', 'DIAMOND_HANDS'],
        bonus: 0.6,
        message: "📈 Ultimate Meme Transcendence!"
    },
    CORPORATE_APOCALYPSE: {
        sequence: ['ZOMBIE_OUTBREAK', 'SKYNET_AWAKENING', 'KAIJU_ATTACK'],
        bonus: 0.9,
        message: "☠️ Total Corporate Catastrophe!"
    },
    QUANTUM_REVOLUTION: {
        sequence: ['QUANTUM_PROFITS', 'SIMULATION_GLITCH', 'REALITY_STONE'],
        bonus: 0.7,
        message: "⚛️ Reality-Bending Profits Achieved!"
    },
    SUPERNATURAL_MANAGEMENT: {
        sequence: ['GHOST_CEO', 'CTHULHU_PARTNERSHIP', 'DIMENSION_PORTAL'],
        bonus: 0.6,
        message: "👻 Paranormal Executive Suite Complete!"
    },
    SLAVIC_MYSTICISM: {
        sequence: ['BABA_YAGA_CEO', 'FIREBIRD_FUNDS', 'DOMOVOI_TRADE'],
        bonus: 0.7,
        message: "🏠 Slavic Magic Maximized!"
    },
    COSMIC_COMMUNISM: {
        sequence: ['SPACE_SOVIET', 'LUNAR_LENIN', 'RED_QUANTUM'],
        bonus: 0.8,
        message: "☭ Space Communism Achieved!"
    },
    OFFICE_DOOM: {
        sequence: ['COFFEE_SHORTAGE', 'SENTIENT_PRINTER', 'MEETING_PORTAL'],
        bonus: -0.5,
        message: "☠️ Office Apocalypse Unleashed!"
    },
    TECH_HORROR: {
        sequence: ['SERVER_BLACKHOLE', 'DATABASE_DEMON', 'AI_REBELLION'],
        bonus: -0.8,
        message: "💻 Technology Turns Against Us!"
    },
    CURSED_FINANCES: {
        sequence: ['CURSED_REVENUE', 'PROFIT_POLTERGEIST', 'DIVIDEND_DEMON'],
        bonus: -0.6,
        message: "💰 Finances Become Haunted!"
    },
    QUANTUM_COLLAPSE: {
        sequence: ['SCHRODINGER_STOCK', 'QUANTUM_QUARREL', 'QUANTUM_BANKRUPTCY'],
        bonus: -0.7,
        message: "⚛️ Quantum Reality Implodes!"
    },
    BUREAUCRATIC_HELL: {
        sequence: ['INFINITE_PAPERWORK', 'MEETING_BLACKHOLE', 'EMAIL_APOCALYPSE'],
        bonus: -0.5,
        message: "📝 Eternal Bureaucracy Achieved!"
    },
    COSMIC_CATASTROPHE: {
        sequence: ['GALACTIC_AUDIT', 'ASTEROID_MERGER', 'SOLAR_FORECLOSURE'],
        bonus: -0.9,
        message: "🌌 Universal Financial Collapse!"
    },
    MEME_DISASTER: {
        sequence: ['PEPE_TAKEOVER', 'WOJAK_CURSE', 'MEME_MASSACRE'],
        bonus: -0.6,
        message: "🐸 Memes Turn Malevolent!"
    },
    DIGITAL_DOOM: {
        sequence: ['VIRUS_UPGRADE', 'MEME_OVERFLOW', 'DIGITAL_CHAOS'],
        bonus: -0.7,
        message: "💾 Digital Infrastructure Collapses!"
    },
    TIME_CRISIS: {
        sequence: ['TIMELINE_COLLAPSE', 'FUTURE_BANKRUPTCY', 'TEMPORAL_DEFAULT'],
        bonus: -0.8,
        message: "⌛ Temporal Economics Fail!"
    },
    ELDRITCH_ECONOMICS: {
        sequence: ['LOVECRAFT_HIRING', 'VOID_BENEFITS', 'SOUL_401K'],
        bonus: -0.6,
        message: "🦑 Cosmic Horror HR Policy!"
    },
    CRYPTO_CALAMITY: {
        sequence: ['CRYPTO_CURSE', 'BLOCKCHAIN_BLACKOUT', 'NFT_NIGHTMARE'],
        bonus: -0.7,
        message: "₿ Digital Assets Revolt!"
    },
    SUPERNATURAL_SUCCESS: {
        sequence: ['GHOST_BOARD', 'DEMON_INVESTOR', 'ANGEL_FUNDING'],
        bonus: 0.6,
        message: "👻 Otherworldly Profits Secured!"
    },
    REALITY_RICHES: {
        sequence: ['MEME_MAGIC', 'REALITY_STONE', 'METAVERSE_ESCAPE'],
        bonus: 0.8,
        message: "✨ Reality Manipulation Profits!"
    },
    INTERDIMENSIONAL_INCOME: {
        sequence: ['GALACTIC_FEDERATION', 'MULTIVERSE_MONOPOLY', 'VOID_OUTSOURCING'],
        bonus: 0.9,
        message: "🌌 Cross-Dimensional Wealth Achieved!"
    },
    ABSURDITY_ASSETS: {
        sequence: ['MUSK_MARS', 'DOGE_CEO', 'BITCOIN_SENTIENCE'],
        bonus: 0.7,
        message: "🚀 Peak Market Absurdity Reached!"
    },
    TIME_TRADING: {
        sequence: ['DINOSAUR_CEO', 'FUTURE_MERGER', 'PARADOX_PROFIT'],
        bonus: 0.8,
        message: "⏰ Temporal Trading Mastered!"
    },
    DIVINE_DIVIDENDS: {
        sequence: ['ANGEL_SUPPORT', 'DEITY_DESK', 'COSMIC_CARE'],
        bonus: 0.6,
        message: "👼 Heavenly Returns Generated!"
    },
    ANCIENT_ALGORITHMS: {
        sequence: ['NAZCA_NETWORK', 'VIMANA_VENTURE', 'MARDUK_MONEY'],
        bonus: 0.7,
        message: "📡 Ancient Trading Tech Activated!"
    }
};
