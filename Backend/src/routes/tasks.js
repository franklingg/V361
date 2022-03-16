const router = require('express').Router();
const TaskController = require('@controller/tasks');

router.get('/:id', TaskController.getTask);
router.get('/', TaskController.getAllTasks);
router.post('/', TaskController.addTask);
router.put('/:id', TaskController.editTask);
router.delete('/:id', TaskController.removeTask);
router.patch('/:id/done', TaskController.markAsDone);
router.patch('/:id/not_done', TaskController.unmarkDone);

module.exports = router;