import * as controllers from "../controllers"
import express from "express"
import verifyToken from "../middlewares/verify_token"
import { isAdmin } from "../middlewares/verify_roles"

const router = express.Router()

//PUBLIC ROUTES
//router.get('/', controllers.getCurrent)

//PRIVATE ROUTES
router.use(verifyToken)
router.get('/', controllers.getCurrent)

module.exports = router