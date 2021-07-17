const express = require('express');
const router = express.Router();
const pool = require('../connection/connection');

// GET Method
router.get('/', (req, res) => {
  try {
    pool.query('SELECT * FROM users', (error, results) => {
      if (error) res.send(error);
      res.send(results);
    });
  } catch (error) {
    console.log(`Error: ${error.message}`);
  }
});

// Specific GET Method
router.get('/:id', (req, res) => {
  try {
    pool.query(
      `SELECT * FROM users WHERE id=${req.params.id}`,
      (error, results) => {
        if (error) console.log(`Error: ${error.message}`);
        res.send(results);
      }
    );
  } catch (error) {
    console.log(`Error: ${error.message}`);
  }
});

// POST Method
router.post('/', (req, res) => {
  try {
    pool.query(
      `INSERT INTO users (first_name, last_name, email, password) 
      VALUES (
          '${req.body.first_name}', 
          '${req.body.last_name}',
          '${req.body.email}',
          '${req.body.password}' 
          )`,
      (err) => {
        if (err) res.send(`Error: ${err.message}`);
        res.send('Posted successfully.');
      }
    );
  } catch (error) {
    console.log(`Error: ${error}`);
  }
});

// PUT Method
router.put('/:id', (req, res) => {
  try {
    pool.query(
      `UPDATE users SET first_name='${req.body.first_name}', last_name='${req.body.last_name}', email='${req.body.email}', password='${req.body.password}' WHERE id=${req.params.id}`,
      (err) => {
        if (err) res.send(`Error: ${err.message}`);
        res.send('Updated entry.');
      }
    );
  } catch (error) {
    console.log(`Error: ${error}`);
  }
});

// DELETE Method
router.delete('/:id', (req, res) => {
  try {
    pool.query(`DELETE FROM users WHERE id=${req.params.id}`, (err) => {
      if (err) res.send(`Error: ${err.message}`);
      res.send('Deleted entry.');
    });
  } catch (error) {
    console.log(`Error: ${error}`);
  }
});

module.exports = router;
