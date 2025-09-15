const express = require("express");
const router = express.Router();
const { getAnswerFromAI } = require("../Controllers/Chat");

require("dotenv").config();


router.post("/", getAnswerFromAI);

module.exports = router;
