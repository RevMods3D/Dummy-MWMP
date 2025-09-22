const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;

// Serve static frontend (optional)
app.use(express.static('.'));

// Dummy server data
const playerNames = ["Alex","Blake","Casey","Drew","Jordan","Taylor","Sam","Riley"];
let servers = [
    { name: "Server Alpha", ip: "127.0.0.1", maxPlayers: 30, online: true, players: [] },
    { name: "Server Beta", ip: "127.0.0.2", maxPlayers: 30, online: true, players: [] }
];

// Generate random players
function generatePlayers(count) {
    const players = [];
    for (let i=0; i<count; i++) {
        const name = playerNames[Math.floor(Math.random()*playerNames.length)];
        players.push({ name, ping: Math.floor(Math.random()*100), time: Math.floor(Math.random()*120) });
    }
    return players;
}

// Update servers with random players
function updateServers() {
    servers.forEach(s => {
        s.online = Math.random() > 0.05 ? true : false; // 5% chance offline
        s.players = s.online ? generatePlayers(Math.floor(Math.random()*31)) : [];
    });
}

// API endpoint
app.get('/api/servers', (req, res) => {
    updateServers();
    res.json(servers);
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
