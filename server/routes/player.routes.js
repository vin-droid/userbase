module.exports = (app) => {
    app.get('/player', (req, res) => {
        res.json({ "message": "Bulk User Creation." });
    });
}