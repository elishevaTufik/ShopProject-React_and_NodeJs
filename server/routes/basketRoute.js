const express = require("express")
const router = express.Router()
const BasketController = require("../controller/basketController");

const verifyJWT = require("../middleware/verifyJWT")
router.use(verifyJWT)

router.get("/", BasketController.getAllCart)
router.get("/calculateTotalPayment", BasketController.calculateTotalPayment)
router.post("/:sweetId", BasketController.addNewProd)
router.delete("/:id", BasketController.deleteProduct)
router.delete("/", BasketController.deleteBasketById)
router.put("/", BasketController.updateQuantityOfProduct)

module.exports = router 
