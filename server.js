
const express = require('express');
const cors = require('cors');
const knex = require('knex');
const bcrypt = require('bcrypt');

const knexConfig = require('./knexfile');

// Sélectionne le mode "development" pour utiliser la configuration appropriée
const db = knex(knexConfig.development);

const app = express();

// Utilise le middleware cors pour gérer les requêtes cross-origin
app.use(cors());
app.use(express.json());

// Route pour enregistrer un nouvel utilisateur avec le mot de passe haché
app.post('/register', async (req, res) => {
    const { username, password, email } = req.body;
    if (!username || !password || !email) {
      return res.status(400).json({ error: 'Missing required fields' });
    }
  
    try {
      // Génère un salt pour le hachage
      const saltRounds = 10;
      const salt = await bcrypt.genSalt(saltRounds);
  
      const hashedPassword = await bcrypt.hash(password, salt);
  
      await db('users').insert({
        username,
        password: hashedPassword,
        email,
      });
  
      res.json({ message: 'User registered successfully' });
    } catch (err) {
      res.status(500).json({ error: 'Something went wrong' });
    }
  });
  
app.post('/login', async (req, res) => {
    const { username, password } = req.body;
    console.log('Received login request with username:', username, 'and password:', password);
    if (!username || !password) {
      return res.status(400).json({ error: 'Missing required fields' });
    }
  
    try {
      const user = await db('users').where({ username }).first();
      if (!user) {
        return res.status(401).json({ error: 'Invalid credentials' });
      }
  
      const passwordMatch = await bcrypt.compare(password, user.password);
      if (!passwordMatch) {
        return res.status(401).json({ error: 'Invalid credentials' });
      }
  
      res.json({ message: 'Login successful' });
    } catch (err) {
      res.status(500).json({ error: 'Something went wrong' });
    }
  });

// Récupérer tous les passages
app.get('/passages', async (req, res) => {
    try {
      const passages = await db.select().table('passages_table');
      res.json(passages);
    } catch (err) {
      res.status(500).json({ error: 'Something went wrong' });
    }
  });
  
  // Récupérer un passage par son ID
  app.get('/passages/:id', async (req, res) => {
    const { id } = req.params;
    try {
      const passage = await db('passages_table').where({ id }).first();
      if (!passage) {
        return res.status(404).json({ error: 'Passage not found' });
      }
      res.json(passage);
    } catch (err) {
      res.status(500).json({ error: 'Something went wrong' });
    }
  });
  
  // Ajouter un nouveau passage
  app.post('/passages', async (req, res) => {
    const { passage_text, passage_type } = req.body;
    if (!passage_text || !passage_type) {
      return res.status(400).json({ error: 'Missing required fields' });
    }
    try {
      const newPassage = await db('passages_table').insert({
        passage_text,
        passage_type,
        order_number: 0 // Remplace par la valeur appropriée pour order_number
      });
      res.json({ id: newPassage[0] });
    } catch (err) {
      res.status(500).json({ error: 'Something went wrong' });
    }
  });
  
const port = 3000;

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
