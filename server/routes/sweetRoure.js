const express = require("express")
const router = express.Router()

const verifyJWT =require("../middleware/verifyJWT")

const sweetsController=require("../controller/sweetsController")

router.get("/getAll",sweetsController.getAllSweets)
router.post("/create",verifyJWT, sweetsController.createNewSweet)
router.delete("/:id",verifyJWT,sweetsController.deleteSweet)
router.put("/update",verifyJWT,sweetsController.updateSweet)
router.put("/updateInventory/:id",verifyJWT,sweetsController.updateInInventory)

module.exports = router