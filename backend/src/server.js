// backend/src/server.js
import app from './app.js'; // Note the .js extension
import connectDB from './config/db.js'; // Note the .js extension
import dotenv from 'dotenv';

dotenv.config({ path: './.env' }); // Ensure .env is loaded for server.js

// Connect to database
connectDB();

const PORT = process.env.PORT || 5000;



app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});

app.post('/api/test', (req, res) => {
  console.log('Test route hit:', req.body);
  res.send('Unprotected route works!');
});

