const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.static('.'));

// Dummy data
const playerNames = ["Alex","Blake","Casey","Drew","Jordan","Taylor","Sam","Riley", "James", "Jake", "Duke"];
const serverModes = ["Race","FreeRoam","Chase", "Cop"];
const serverTags = ["US","EU","ASIA", "China"];

// Servers
let servers = [
    { name: "Server Alpha", ip: "127.0.0.1", maxPlayers: 30, mode: "", tag: "", ping: "", online: true, players: [] },
    { name: "Server Beta", ip: "127.0.0.2", maxPlayers: 30, mode: "", tag: "", ping: "", online: true, players: [] }
];

// Random player generator
function generatePlayers(count) {
    const players = [];
    for (let i = 0; i < count; i++) {
        const name = playerNames[Math.floor(Math.random() * playerNames.length)];
        players.push({
            name: name,
            pping: Math.floor(Math.random() * 100),   // <-- changed property name from ping to pping
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
