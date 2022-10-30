import {Router} from "express";
const router = Router();
import studentRoute from "./student";

router.use('/student', studentRoute);

export default router;