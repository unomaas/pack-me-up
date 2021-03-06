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
  console.log('In GET /api/items/:id', req.body, req.params, req.user);
  // ⬇ Declaring SQL commands to send to DB: 
  const query = `
    SELECT * 
    FROM "items" 
    WHERE "items".kit_id = $1 AND "items".user_id = $2
    ORDER BY "items".item_name ASC;
  `; // End query
  const values = [
    req.params.id,
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
      res.sendStatus(500);
    }); // End .catch
}); // End GET

/** ⬇ POST /api/items:
 * Router function to handle the POST part of the server-side logic.  Will send SQL query to add a new item to the DB.
 */
router.post('/:id', (req, res) => {
  console.log('In POST api/items/:id');
  // ⬇ Declaring SQL commands to send to DB: 
  const query = `
    INSERT INTO "items" ("item_name", "kit_id", "user_id")
    VALUES ($1, $2, $3)
  `; // End query
  const values = [
    req.body.item_name,
    req.params.id,
    req.user.id
  ]; // End values
  // ⬇ Sending query to DB:
  pool.query(query, values)
    .then(result => {
      console.log('POST items result:', result.rows);
      // ⬇ Sending back the kit id to refresh with:
      res.send(req.params.id);
    }) // End .then
    // ⬇ Catch for first query:
    .catch(error => {
      console.error('POST items error:', error);
      res.sendStatus(500);
    }); // End .catch
}) // End POST

/** ⬇ PUT /api/items/id:
 * Router will send SQL query to edit entries in the DB.
 */
router.put('/:id/:kit_id', (req, res) => {
  console.log('In /api/items/:id/:kit_id PUT', req.body, req.params, req.user);
  // ⬇ Declaring variables to send to SQL: 
  const itemId = req.body.id;
  const kitId = { id: req.body.kit_id };
  const query = `
    UPDATE "items" 
    SET "item_is_packed" = NOT "item_is_packed"
    WHERE "id" = $1 AND "items".user_id = $2;
  `; // End query
  const values = [
    itemId,
    req.user.id
  ]; // End values
  // ⬇ Sending query to DB:
  pool.query(query, values)
    .then(result => {
      console.log('PUT item result:', result.rows);
      res.send(kitId);
    }) // End .then
    .catch(error => {
      console.error('PUT item error:', error);
      res.sendStatus(500);
    }) // End .catch
}); // End PUT

/** ⬇ PUT /api/items/id:
 * Router will send SQL query to edit entries in the DB.
 */
router.put('/packall', (req, res) => {
  console.log('In /api/items/packall PUT', req.body, req.params, req.user);
  // ⬇ Declaring variables to send to SQL: 
  const kitId = req.body.id;
  const query = `
    UPDATE "items" 
    SET "item_is_packed" = TRUE
    WHERE "kit_id" = $1 AND "user_id" = $2;
  `; // End query
  const values = [
    kitId,
    req.user.id
  ]; // End values
  // ⬇ Sending query to DB:
  pool.query(query, values)
    .then(result => {
      console.log('PUT all items result:', result);
      res.send({ id: kitId });
    }) // End .then
    .catch(error => {
      console.error('PUT all items error:', error);
      res.sendStatus(500);
    }) // End .catch
}); // End PUT

/** ⬇ PUT /api/items/id:
 * Router will send SQL query to edit entries in the DB.
 */
router.put('/unpackall', (req, res) => {
  console.log('In /api/items/unpackall PUT', req.body, req.params, req.user);
  // ⬇ Declaring variables to send to SQL: 
  const kitId = req.body.id;
  const query = `
   UPDATE "items" 
   SET "item_is_packed" = FALSE
   WHERE "kit_id" = $1 AND "user_id" = $2;
 `; // End query
  const values = [
    kitId,
    req.user.id
  ]; // End values
  // ⬇ Sending query to DB:
  pool.query(query, values)
    .then(result => {
      console.log('PUT all items result:', result);
      res.send({ id: kitId });
    }) // End .then
    .catch(error => {
      console.error('PUT all items error:', error);
      res.sendStatus(500);
    }) // End .catch
}); // End PUT

/** ⬇ PUT /api/items/id:
 * Router will send SQL query to edit entries in the DB.
 */
 router.put('/eventpacked', (req, res) => {
  console.log('In /api/items/eventpacked PUT', req.body, req.params, req.user);
  // ⬇ Declaring variables to send to SQL: 
  const kitId = req.body.id;
  const query = `
    UPDATE "items"
    SET "item_is_packed" = FALSE
    WHERE "user_id" = $1;
 `; // End query
  const values = [
    req.user.id
  ]; // End values
  // ⬇ Sending query to DB:
  pool.query(query, values)
    .then(result => {
      console.log('PUT all items result:', result);
      res.send({ id: kitId });
    }) // End .then
    .catch(error => {
      console.error('PUT all items error:', error);
      res.sendStatus(500);
    }) // End .catch
}); // End PUT

/** ⬇ DELETE /api/items/id:
 * Router will send SQL query to delete entries in the DB.
 */
router.delete('/:id/:kit_id', (req, res) => {
  console.log('In /api/items/:id/:kit_id DELETE', req.body, req.params, req.user);
  // ⬇ Declaring variables to send to SQL: 
  const itemId = req.params.id;
  const kitId = req.params.kit_id;
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
      console.log('DELETE item result:', result.rows);
      res.send(kitId);
    }) // End .then
    .catch(error => {
      console.error('DELETE item error:', error);
      res.sendStatus(500);
    }) // End .catch
}); // End DELETE
//#endregion ⬆⬆ All CRUD routes above. 


module.exports = router;
