import express from "express"
import { add_user,delete_user,show_users,update_user } from "../controllers/user.js";

const router=express.Router();

router.route("/show").get(show_users);
router.route("/add").post(add_user);
router.route("/update/:id").put(update_user);
router.route("/delete/:id").delete(delete_user);
export default router;