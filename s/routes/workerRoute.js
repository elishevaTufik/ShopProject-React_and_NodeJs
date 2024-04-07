const express = require("express")
const router = express.Router()
const verifyJWT =require("../middleware/verifyJWT")
const workersController=require("../controller/workersController")

router.use(verifyJWT)

router.get("/getAllWorkers",workersController.getAllWorkers)
router.get("/getAllShiftManagers",workersController.getAllShiftManagers)
router.delete("/:id",workersController.deleteWorker)
router.put("/update/:id",workersController.updateWorkerDetails)

module.exports = router