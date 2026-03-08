import cors from 'cors';
import app from './app.js';

// CORS sabse pehle - routes se pehle
app.use(cors({
  origin: 'http://localhost:5173',
  credentials: true
}));

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

export default app;
//need for running server.js directly with node command