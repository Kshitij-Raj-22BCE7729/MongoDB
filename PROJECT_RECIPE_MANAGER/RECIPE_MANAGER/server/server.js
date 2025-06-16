const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db.js');
const path = require('path');

const app = express();
connectDB();

app.use(cors());
app.use(express.json());
app.use('/uploads', express.static(path.join(__dirname, 'public/uploads'))); // Serve static files

const recipeRoutes = require('./routes/recipes.js');
app.use('/api/recipes', recipeRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
