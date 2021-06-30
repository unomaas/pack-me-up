//#region ⬇⬇ All document setup below:
const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();
const { rejectUnauthenticated } = require('../modules/authentication-middleware');
//#endregion ⬆⬆ All document setup above. 


//#region ⬇⬇ All CRUD routes below:
/** ⬇ GET /api/kits:
 * Router will send SQL query to pull all of the entries from the DB to update on the DOM.
 */
router.get('/', rejectUnauthenticated, (req, res) => {
  console.log('In /api/kits GET all:', req.body, req.params, req.user);
  // ⬇ Declaring SQL commands to send to DB: 
  const query = `
    SELECT * FROM "kits" 
    WHERE "kits".user_id = $1;
  `; // End query
  const values = [req.user.id]
  // ⬇ Sending query to DB:
  pool.query(query, values)
    .then(result => {
      console.log('GET all result:', result.rows);
      // ⬇ Sends back the results in an object, we always want rows:
      res.send(result.rows);
    }) // End .then
    .catch(error => {
      console.error('GET all error:', error);
      res.sendStatus(500);
    }); // End .catch
}); // End GET

/** ⬇ GET /api/kits/categories:
 * Router will send SQL query to pull all categories from the DB to update on the DOM.
 */
router.get('/categories', rejectUnauthenticated, (req, res) => {
  console.log('In /api/kits/categories GET');
  // ⬇ Declaring SQL commands to send to DB: 
  const query = `
    SELECT * FROM "kit_categories" 
    ORDER BY "name" ASC`;
  // ⬇ Sending query to DB:
  pool.query(query)
    .then(result => {
      console.log('GET categories result:', result.rows);
      // ⬇ Sends back the results in an object, we always want rows:
      res.send(result.rows);
    }) // End .then
    .catch(error => {
      console.error('GET categories error:', error);
      res.sendStatus(500);
    }); // End .catch
}); // End GET

/** ⬇ GET /api/kits/id:
 * Router will send SQL query to pull JUST ONE of the entries from the DB to update on the DOM for detailed view.
 */
router.get('/:id', (req, res) => {
  console.log('In api/kits/:id GET');
  // ⬇ Declaring SQL commands to send to DB: 
  const query = `
    SELECT * FROM "kits" 
    WHERE "kits".id = $1 AND "kits".user_id = $2;
  `;
  const values = [req.params.id, req.user.id];
  // ⬇ Sending query to DB:
  pool.query(query, values)
    .then(result => {
      console.log('GET kits/:id result:', result.rows);
      // ⬇ Sends back the results in an object, we always want rows:
      res.send(result.rows);
    }) // End .then
    .catch(error => {
      console.error('GET kits/:id error:', error);
      res.sendStatus(500);
    }); // End .catch
}); // End GET

/** ⬇ POST /api/kits:
 * Router will send SQL query to add a new entry to the DB.
 */
router.post('/', (req, res) => {
  console.log('In api/kits POST:', req.body, req.params, req.user);
  // ⬇ Declaring SQL commands to send to DB: 
  const query = `
    INSERT INTO "kits" ("name", "description", "kit_category", "event_category", "user_id")
    VALUES ($1, $2, $3, $4, $5)
  `; // End query
  const values = [req.body.name, req.body.description, req.body.kit_category, req.body.event_category, req.user.id];
  // ⬇ Sending query to DB:
  pool.query(query, values)
    .then(result => {
      console.log('POST kits result:', result);
      res.sendStatus(201);
    }) // End .then
    // ⬇ Catch for first query:
    .catch(error => {
      console.error('POST kits error:', error);
      res.sendStatus(500);
    }); // End .catch
}) // End POST

/** ⬇ POST /api/kits/categories:
 * Router will send SQL query to pull all categories from the DB to update on the DOM.
 */
router.post('/categories', rejectUnauthenticated, (req, res) => {
  console.log('In /api/kits/categories POST');
  // ⬇ Declaring SQL commands to send to DB: 
  const query = `
    INSERT INTO "kit_categories" ("name")
    VALUES ($1)
  `;
  const values = [req.body.name];
  // ⬇ Sending query to DB:
  pool.query(query, values)
    .then(result => {
      console.log('POST categories result:', result.rows);
      // ⬇ Sends back the results in an object, we always want rows:
      res.send(result.rows);
    }) // End .then
    .catch(error => {
      console.error('POST categories error:', error);
      res.sendStatus(500);
    }); // End .catch
}); // End POST
//#endregion ⬆⬆ All CRUD routes above. 


module.exports = router;
