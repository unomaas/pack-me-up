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
  console.log('In /api/events GET all:', req.body, req.params, req.user);
  // ⬇ Declaring SQL commands to send to DB: 
  const query = `
    SELECT * FROM events 
    WHERE events.user_id = $1;
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
      console.error('Error with GET all:', error);
      res.sendStatus(500)
    }); // End .catch
}); // End GET

/** ⬇ GET /api/events/categories:
 * Router will send SQL query to pull all categories from the DB to update on the DOM.
 */
router.get('/categories', rejectUnauthenticated, (req, res) => {
  console.log('In /api/events/categories GET');
  // ⬇ Declaring SQL commands to send to DB: 
  const query = `SELECT * FROM event_categories`;
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

/** ⬇ POST /api/events:
 * Router will send SQL query to add a new entry to the DB.
 */
router.post('/', (req, res) => {
  console.log('In api/events POST:', req.body, req.params, req.user);
  // ⬇ Declaring SQL commands to send to DB: 
  const query = `
    INSERT INTO "events" ("name", "description", "event_category", "date_start", "date_end", "user_id")
    VALUES ($1, $2, $3, $4, $5, $6)
  `; // End query
  const values = [req.body.name, req.body.description, req.body.event_category, req.body.date_start, req.body.date_end, req.user.id];
  // ⬇ Sending query to DB:
  pool.query(query, values)
    .then(result => {
      console.log('POST events result:', result);
      res.sendStatus(201);
    }) // End .then
    // ⬇ Catch for first query:
    .catch(error => {
      console.error('Post events error:', error);
      res.sendStatus(500);
    }); // End .catch
}) // End POST

/** ⬇ POST /api/events/categories:
 * Router will send SQL query to pull all categories from the DB to update on the DOM.
 */
 router.post('/categories', rejectUnauthenticated, (req, res) => {
  console.log('In /api/events/categories POST');
  // ⬇ Declaring SQL commands to send to DB: 
  const query = `
    INSERT INTO "event_categories" ("name")
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
