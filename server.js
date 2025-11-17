const express = require('express');
const cors = require('cors');
const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());

app.use(express.static('.'));

// Dummy data
const playerNames = ["Avery","Cameron","Logan","Quinn","Morgan","Reese","Skyler","Peyton","Hayden","Charlie",
"Bailey","Casey","Rowan","Dakota","Hunter","Jessie","Emerson","Finley","Blake","Jamie",
"Alex","Taylor","Riley","Jordan","Sam","Drew","James","Jake","Duke","Micah",
"Adrian","Cory","Shawn","Taylor","Kai","Elliot","Devon","Shane","Spencer","Logan",
"Phoenix","Cameron","River","Rory","Toby","Blair","Sasha","Sky","Alexis","Remy",
"Chris","Reagan","Marley","Parker","Jesse","Tyler","Hunter","Morgan","Casey","Kai",
"Rowan","Emery","Dallas","Finley","Jaden","Justice","Quinn","Reese","Sawyer","Taylor"];
const serverModes = ["Race","FreeRoam","Chase", "Cop", "HotPursuit", "Showcase", "Elimination", "Drift"];
const serverTags = ["US","EU","ASIA", "China", "Casual", "Competitive", "Stunt", "NoPolice", "NoCollision", "Bonuses"];

// Servers
let servers = [
    { name: "Server Alpha", ip: "204.31.190.249", maxPlayers: 30, mode: "", tag: "", ping: "", online: true, players: [] },
    { name: "Server Beta", ip: "181.159.46.35", maxPlayers: 60, mode: "", tag: "", ping: "", online: true, players: [] },
    { name: "Server Gamma", ip: "142.34.189.239", maxPlayers: 5, mode: "", tag: "", ping: "", online: true, players: [] },
    { name: "Server Eta", ip: "187.8.149.1", maxPlayers: 25, mode: "", tag: "", ping: "", online: true, players: [] },
    { name: "Server Theta", ip: "133.22.63.96", maxPlayers: 65, mode: "", tag: "", ping: "", online: true, players: [] },
    { name: "Server Iota ", ip: "140.232.55.101", maxPlayers: 55, mode: "", tag: "", ping: "", online: true, players: [] },
    { name: "Server Nu", ip: "169.237.51.64", maxPlayers: 85, mode: "", tag: "", ping: "", online: true, players: [] },
    { name: "Server Xi", ip: "41.67.110.24", maxPlayers: 12, mode: "", tag: "", ping: "", online: true, players: [] },
    { name: "Server Omicron ", ip: "219.90.54.183", maxPlayers: 100, mode: "", tag: "", ping: "", online: true, players: [] },
];

// Random player generator
function generatePlayers(count) {
    const players = [];
    for (let i = 0; i < count; i++) {
        const name = playerNames[Math.floor(Math.random() * playerNames.length)];
        players.push({
            name: name,
            pping: Math.floor(Math.random() * 100),
            time: Math.floor(Math.random() * 1200)
        });
    }
    return players;
}

// Update servers with random values
function updateServers() {
    servers.forEach(s => {
        s.online = Math.random() > 0.05; // 5% offline chance
        s.players = s.online ? generatePlayers(Math.floor(Math.random() * 31)) : [];
        s.mode = serverModes[Math.floor(Math.random() * serverModes.length)];
        s.tag = serverTags[Math.floor(Math.random() * serverTags.length)];
        s.ping = s.players.length > 0 ? Math.floor(Math.random() * 100).toString() : "N/A";
    });
}

// API endpoint
app.get('/api/servers', (req, res) => {
    updateServers();
    res.json(servers);
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
