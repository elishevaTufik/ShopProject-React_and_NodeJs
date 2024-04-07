const express = require("express")
const router = express.Router()
const verifyJWT =require("../middleware/verifyJWT")

const orderController=require("../controller/orderController")

router.use(verifyJWT)

router.get("/",orderController.getAllOrders)
router.get("/getOrdersHistory",orderController.getOrdersHistory)
router.get("/getOrdersDone",orderController.getOrdersDone)
router.get("/getOrdersaccepted",orderController.getOrdersaccepted)
router.get("/getOrderByIdClient/:idClient",orderController.getOrderByIdClient)
router.post("/", orderController.createOrder)
router.put("/",orderController.updateOrder)
router.put("/updateStatus/",orderController.updateStatus)

module.exports = router