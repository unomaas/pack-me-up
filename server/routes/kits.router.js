//#region ⬇⬇ All document setup below:
const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();
const { rejectUnauthenticated } = require('../modules/authentication-middleware');
//#endregion ⬆⬆ All document setup above. 


//#region ⬇⬇ All CRUD routes below:
/** ⬇ GET /api/kits:
 * Router function to handle the GET part of the server-side logic.  Will send SQL query to pull all of the entries from the DB to update on the DOM.
 */
 router.get('/', rejectUnauthenticated, (req, res) => {
  console.log('In /api/kits GET all:', req.body, req.params, req.user);
  // ⬇ Declaring SQL commands to send to DB: 
  const query = `
    SELECT * FROM kits 
    WHERE kits.user_id = $1;
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

/**
 * POST route template
 */
 router.post('/', (req, res) => {
  console.log('In api/kits POST:', req.body, req.params, req.user);
  // ⬇ RETURNING "id" will give us back the id of the created kit:
  const insertKitQuery = `
    INSERT INTO "kits" ("name", "description", "kit_category", "event_category", "user_id")
    VALUES ($1, $2, $3, $4, $5)
    RETURNING "id";
  `; // End insertMovieQuery
  const values = [req.body.name, req.body.description, req.body.kit_category, req.body.event_category, req.user.id];
  // ⬇ FIRST QUERY MAKES KIT:
  pool.query(insertKitQuery, values)
    .then(result => {
      console.log('POST kit result:', result); 
      res.sendStatus(201); 
    }) // End .then
    // ⬇ Catch for first query:
    .catch(err => {
      console.log(err);
      res.sendStatus(500)
    }); // End .catch
}) // End POST
//#endregion ⬆⬆ All CRUD routes above. 


module.exports = router;
