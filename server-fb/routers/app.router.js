const router = require("express").Router()
const { addNewEntry } = require("../controllars/app.controllar.js")


router.get("/",addNewEntry)


module.exports = router