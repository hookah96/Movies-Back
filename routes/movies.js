const express = require('express');
const router = express.Router();
const pool = require('../connection/connection');
const auth = require('../middlewares/auth');
const moment = require('moment');

// GET Method
router.get('/', (req, res) => {
  let totalData = 0;
  let pageLength;
  let data;

  try {
    if (Object.keys(req.query).length !== 2) {
      pool.query('SELECT * FROM movies', (error, result) => {
        if (error) res.send(`Error: ${error.message}`);
        res.send(result);
      });
    }  else {
      pool.query('SELECT COUNT(*) FROM movies;', (error, results) => {
        if (error) res.send(`Error: ${error.message}`);
        totalData = results[0]['COUNT(*)'];
      });

      pool.query(
        `SELECT m.*, u.first_name, u.last_name FROM movies m JOIN users u ON m.user_id = u.id ORDER BY m.id DESC LIMIT ${
          req.query.pageSize
        } OFFSET ${req.query.pageIndex * req.query.pageSize}`,
        (error, results) => {
          if (error) res.send(error);
          pageLength = totalData / req.query.pageSize;
          data = results;
          res.send({
            total: totalData,
            data: results,
            pages_length: pageLength,
            pageSize: Number(req.query.pageSize),
          });
        }
      );
    }
  } catch (error) {
    console.log(`Error: ${error.message}`);
  }
});

// Specific GET Method
router.get('/:id', (req, res) => {
  try {
    pool.query(
      `SELECT m.*, u.first_name, u.last_name FROM movies m JOIN users u ON WHERE user_id=${req.params.id}`,
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
router.post('/', [auth], (req, res) => {
  try {
    pool.query(
      `INSERT INTO movies (title, description, upload_date, likes, hates, user_id) 
      VALUES (
          '${req.body.title}', 
          '${req.body.description}', 
          '${req.body.upload_date}', 
          '${req.body.likes}', 
          '${req.body.hates}',
          '${req.body.user_id}')`,
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
router.put('/:id', [auth], (req, res) => {
  try {
    pool.query(
      `UPDATE movies SET 
      title='${req.body.title}', 
      description='${req.body.description}', 
      upload_date='${req.body.upload_date}', 
      likes='${req.body.likes}', 
      hates='${req.body.hates}',
      user_id='${req.body.user_id}' 
      WHERE id=${req.params.id}`,
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
router.delete('/:id', [auth], (req, res) => {
  try {
    pool.query(`DELETE FROM movies WHERE id=${req.params.id}`, (err) => {
      if (err) res.send(`Error: ${err.message}`);
      res.send('Deleted entry.');
    });
  } catch (error) {
    console.log(`Error: ${error}`);
  }
});

module.exports = router;
