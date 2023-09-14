import express from 'express';
const router = express.Router();
import { createTask, deleteTask, getAllTask, getTask, updateTask } from '../controllers/tasksController.js'

router.route('/')
    .get(getAllTask)
    .post(createTask)

router.route('/:id')
    .get(getTask)
    .patch(updateTask)
    .delete(deleteTask)

export default router
