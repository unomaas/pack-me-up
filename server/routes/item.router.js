//#region ⬇⬇ All document setup below:
const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();
const { rejectUnauthenticated } = require('../modules/authentication-middleware');
//#endregion ⬆⬆ All document setup above. 


//#region ⬇⬇ All CRUD routes below:
/** ⬇ GET /api/items:
 * Router function to handle the GET part of the server-side logic.  Will send SQL query to pull all of the entries from the DB to update on the DOM.
 */
 router.get('/', rejectUnauthenticated, (req, res) => {
  console.log('In /api/items GET all:', req.body, req.params, req.user);
  // ⬇ Declaring SQL commands to send to DB: 
  const query = `
    SELECT * FROM items 
    WHERE items.user_id = $1;
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

/** ⬇ POST /api/items:
 * Router function to handle the POST part of the server-side logic.  Will send SQL query to add a new item to the DB.
 */
 router.post('/', (req, res) => {
  console.log('In api/items POST:', req.body, req.params, req.user);
  // ⬇ Declaring SQL commands to send to DB: 
  const query = `
    INSERT INTO "items" ("name", "kit_id", "user_id")
    VALUES ($1, $2, $3)
  `; // End query
  const values = [req.body.name, req.body.kit_id, req.user.id];
  // ⬇ FIRST QUERY MAKES KIT:
  pool.query(query, values)
    .then(result => {
      console.log('POST items result:', result); 
      res.sendStatus(201); 
    }) // End .then
    // ⬇ Catch for first query:
    .catch(error => {
      console.error('Error in POST items:', error);
      res.sendStatus(500)
    }); // End .catch
}) // End POST
//#endregion ⬆⬆ All CRUD routes above. 




module.exports = router;
