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
router.get('/:id', rejectUnauthenticated, (req, res) => {
  console.log('In GET /api/eventsKits/:id');
  // ⬇ Declaring SQL commands to send to DB: 
  const query = `
    SELECT "events_kits".id, "events_kits".event_id, "events".name, "events".event_category, "events".date_start, "events_kits".kit_id, "kits".name, "kits".kit_category, "kits".event_category, "events_kits".is_packed
    FROM kits
    JOIN events_kits on kits.id = events_kits.kit_id
    JOIN events ON events.id = events_kits.event_id
    WHERE "events".id = $1 AND events.user_id = $2
    ORDER BY "kits".event_category ASC;
  `; // End query
  const values = [
    req.params.id,
    req.user.id
  ]; // End query
  // ⬇ Sending query to DB:
  pool.query(query, values)
    .then(result => {
      console.log('GET eventsKits result:', result.rows);
      // ⬇ Sends back the results in an object, we always want rows:
      res.send(result.rows);
    }) // End .then
    .catch(error => {
      console.error('GET eventsKits error:', error);
      res.sendStatus(500);
    }); // End .catch
}); // End GET

/** ⬇ POST /api/items:
 * Router function to handle the POST part of the server-side logic.  Will send SQL query to add a new item to the DB.
 */
router.post('/:id', (req, res) => {
  console.log('In POST api/eventsKits/:id', req.body, req.params, req.user);
  // ⬇ Declaring SQL commands to send to DB: 
  const query = `
    INSERT INTO "events_kits" ("event_id", "kit_id", "user_id")
    VALUES ($1, $2, $3)
  `; // End query
  const values = [
    req.params.id,
    req.body.kit_id,
    req.user.id
  ]; // End values
  // ⬇ Sending query to DB:
  pool.query(query, values)
    .then(result => {
      console.log('POST eventsKits result:', result.rows);
      // ⬇ Sending back the kit id to refresh with:
      res.send(req.params.id);
    }) // End .then
    // ⬇ Catch for first query:
    .catch(error => {
      console.error('POST eventsKits error:', error);
      res.sendStatus(500);
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
      console.log('PUT item result:', result.rows);
      res.send(req.params.id);
    }) // End .then
    .catch(error => {
      console.error('PUT item error:', error);
      res.sendStatus(500);
    }) // End .catch
}); // End PUT

/** ⬇ DELETE /api/items/id:
 * Router will send SQL query to delete entries in the DB.
 */
router.delete('/:id/:event_id', (req, res) => {
  console.log('In /api/eventsKits/:id/:event_id DELETE', req.body, req.params, req.user);
  // ⬇ Declaring variables to send to SQL: 
  const eventsKitsId = req.params.id;
  const eventId = req.params.event_id;
  const query = `
    DELETE FROM "events_kits" 
    WHERE "id" = $1 AND "events_kits".user_id = $2;
  `; // End query
  const values = [
    eventsKitsId,
    req.user.id
  ]; // End values
  pool.query(query, values)
    .then(result => {
      console.log('DELETE item result:', result.rows);
      res.send(eventId);
    }) // End .then
    .catch(error => {
      console.error('DELETE item error:', error);
      res.sendStatus(500);
    }) // End .catch
}); // End DELETE
//#endregion ⬆⬆ All CRUD routes above. 


module.exports = router;
