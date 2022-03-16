const router = require('express').Router();
const TaskListsController = require('@controller/taskLists');

router.get('/', TaskListsController.getAllTaskLists);
router.get('/sort', TaskListsController.getAllTaskListsSorted);
router.get('/:id', TaskListsController.getTaskList);
router.post('/', TaskListsController.createTaskList);
router.put('/:id', TaskListsController.updateTaskList);
router.delete('/:id', TaskListsController.deleteTaskList);

module.exports = router;