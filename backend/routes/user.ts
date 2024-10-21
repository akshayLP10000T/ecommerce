import express from 'express';
import { applyForStore, login, logout, register, updateProfile } from '../controllers/user';
import { isAuthenticated } from '../middlewares/isAuthenticated';
const router = express.Router();

router.route("/register").post(register);
router.route("/login").post(login);
router.route("/update").put(isAuthenticated, updateProfile);
router.route("/logout").get(logout);
router.route("/store-apply").put(isAuthenticated, applyForStore);

export default router;