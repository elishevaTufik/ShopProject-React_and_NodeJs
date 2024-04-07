const express = require("express")
const router = express.Router()
const verifyJWT =require("../middleware/verifyJWT")

const branchesController=require("../controller/branchesController")

router.get("/getAll",branchesController.getAllBranches)
router.post("/create",verifyJWT, branchesController.createBranch)
router.delete("/:id",verifyJWT,branchesController.deleteBranch)
router.put("/update/:id",verifyJWT,branchesController.updateBranch)

module.exports = router 