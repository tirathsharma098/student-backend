import {Router} from "express";
const router = Router();
import * as student from '../controllers/student';
import catchAsync from "../utils/catchAsync";

router.get('/', student.index);
router.post('/add', catchAsync(student.addStudent));
router.put('/edit', student.editStudent);
router.post('/view', student.viewStudent);
router.delete('/', student.deleteStudent);
export default router;