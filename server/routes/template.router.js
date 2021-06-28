//#region ⬇⬇ All document setup below:
const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();
//#endregion ⬆⬆ All document setup above. 

//#region ⬇⬇ All CRUD routes below:

/**
 * GET route template
 */
router.get('/', (req, res) => {
  // GET route code here
});

/**
 * POST route template
 */
router.post('/', (req, res) => {
  // POST route code here
});
//#endregion ⬆⬆ All CRUD routes above. 


module.exports = router;
