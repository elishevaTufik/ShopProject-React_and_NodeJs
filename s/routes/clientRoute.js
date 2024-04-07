const express = require("express")
const router = express.Router()
const verifyJWT =require("../middleware/verifyJWT")
const clientController=require("../controller/clientController")

router.use(verifyJWT)

router.get("/getAll",clientController.getAllClients)
router.delete("/:id",clientController.deleteClient)
router.put("/update/:id",clientController.updateClient)

module.exports = router