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
  console.log('In GET /api/items:', req.body, req.params, req.user);
  // ⬇ Declaring SQL commands to send to DB: 
  const query = `
    SELECT * FROM "items" 
    WHERE "items".kit_id = $1 AND "items".user_id = $2;
  `; // End query
  const values = [
    req.body.id, // TODO: Find out where to pull kit id from. 
    req.user.id
  ]; // End query
  // ⬇ Sending query to DB:
  pool.query(query, values)
    .then(result => {
      console.log('GET all items result:', result.rows);
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
  console.log('In api/items POST');
  // ⬇ Declaring SQL commands to send to DB: 
  const query = `
    INSERT INTO "items" ("name", "kit_id", "user_id")
    VALUES ($1, $2, $3)
  `; // End query
  const values = [
    req.body.name,
    req.params.id,
    req.user.id
  ]; // End values
  // ⬇ Sending query to DB:
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

/** ⬇ PUT /api/items/id:
 * Router will send SQL query to edit entries in the DB.
 */
router.put('/:id', (req, res) => {
  console.log('In /api/items/:id PUT');
  // ⬇ Declaring variables to send to SQL: 
  const itemId = req.body.id;
  const query = `
    UPDATE "items" 
    SET "name" = $1
    WHERE "id" = $2 AND "items".user_id = $3;
  `; // End query
  const values = [
    req.body.name,
    itemId,
    req.user.id
  ]; // End values
  // ⬇ Sending query to DB:
  pool.query(query, values)
    .then(result => {
      console.log('PUT item result:', result);
      res.sendStatus(200);
    }) // End .then
    .catch(error => {
      console.error('PUT item error:', error);
      res.sendStatus(500);
    }) // End .catch
}); // End PUT

/** ⬇ DELETE /api/items/id:
 * Router will send SQL query to delete entries in the DB.
 */
router.delete('/:id', (req, res) => {
  console.log('In /api/items/:id DELETE');
  // ⬇ Declaring variables to send to SQL: 
  const itemId = req.body.id;
  const query = `
    DELETE FROM "items" 
    WHERE "id" = $1 AND "items".user_id = $2;
  `; // End query
  const values = [
    itemId,
    req.user.id
  ]; // End values
  pool.query(query, values)
    .then(result => {
      console.log('DELETE item result:', result);
      res.sendStatus(200);
    }) // End .then
    .catch(error => {
      console.error('DELETE item error:', error);
      res.sendStatus(500);
    }) // End .catch
}); // End DELETE
//#endregion ⬆⬆ All CRUD routes above. 


module.exports = router;
