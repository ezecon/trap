// server.js
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
app.use(cors());
app.use(bodyParser.json());

// MongoDB connection
mongoose.connect('mongodb+srv://mdeconozzama:ocJmrqE7tKqIcIKI@cluster0.utqvo.mongodb.net/data?retryWrites=true&w=majority&appName=Cluster0', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

const locationSchema = new mongoose.Schema({
    latitude: Number,
    longitude: Number,
    timestamp: { type: Date, default: Date.now },
});

const Location = mongoose.model('Location', locationSchema);

// Route to save location
app.post('/api/location', async (req, res) => {
    const { latitude, longitude } = req.body;

    try {
        const location = new Location({ latitude, longitude });
        await location.save();
        res.status(201).send({ message: 'Location saved successfully' });
    } catch (error) {
        res.status(500).send({ message: 'Failed to save location', error });
    }
});

const PORT = 5000;
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
//ocJmrqE7tKqIcIKI