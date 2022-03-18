const TaskList = require("@model/TaskList");
const Task = require("@model/Task");
const Tag = require("@model/Tag");

TaskController = {

    async getTask(req, res) {
        try {
            const task = await Task.findById(req.params.id);
            return res.status(200).send(task);
        } catch (err) {
            return res
                .status(400)
                .send({ error: "Id inválido, tarefa não encontrada" });
        }
    },

    async getAllTasks(req, res) {
        try {
            const tasks = await Task.find({});
            return res.status(200).send(tasks);
        } catch (err) {
            return res
                .status(400)
                .send({ error: "Tarefas não encontradas" });
        }
    },
    
    async addTask(req, res) {
        try {
            const newTask = new Task(req.body);
            const taskList = await TaskList.findById(req.body.task_list_id)
            await taskList.updateOne({tasks: [...taskList.get('tasks'), newTask]});
            const response = await newTask.save();
            return res.status(201).send(response);
        } catch (err) {
            console.log(err)
            return res
                .status(400)
                .send({ error: "Dados inválidos, tarefas não criada" });
        }
    },

    async editTask(req, res) {
        try {
            const updatedTask = await Task.findByIdAndUpdate(req.params.id, req.body, { new: true });
            const taskLists = await TaskList.find({});
            taskLists.forEach(async taskList => {
                const newTasks = taskList.tasks.map(task => {
                    return task._id.valueOf() == updatedTask._id.valueOf() ? updatedTask : task;
                });
                await taskList.updateOne({tasks: newTasks});
            });
            return res.status(200).send(updatedTask);
            return res.status(200).send(task);
        } catch (err) {
            return res.status(400).send({ error: "Dados inválidos, tarefa não editada" });
        }
    },

    async removeTask(req, res) {
        try {
            const removedTask = await Task.findByIdAndRemove(req.params.id);
            const taskLists = await TaskList.find({});
            taskLists.forEach(async taskList => {
                const newTasks = taskList.tasks.filter(task => {
                    return task._id.valueOf() !== removedTask._id.valueOf();
                });
                await taskList.updateOne({tasks: newTasks});
            });
            return res.status(204).send(undefined);
        } catch (err) {
            return res
                .status(400)
                .send({ error: "Dados inválidos, tarefa não removida" });
        }
    },

    async markAsDone(req, res) {
        try {
            const updatedTask = await Task.findByIdAndUpdate(req.params.id, { done: true }, { new: true });
            const taskLists = await TaskList.find({});
            taskLists.forEach(async taskList => {
                const newTasks = taskList.tasks.map(task => {
                    return task._id.valueOf() == updatedTask._id.valueOf() ? updatedTask : task;
                });
                await taskList.updateOne({tasks: newTasks});
            });
            return res.status(200).send(updatedTask);
        } catch (err) {
            return res.status(400).send({ error: "Id inválido, tarefa não atualizada" });
        }
    },

    async unmarkDone(req, res) {
        try {
            const updatedTask = await Task.findByIdAndUpdate(req.params.id, { done: false }, { new: true });
            const taskLists = await TaskList.find({});
            taskLists.forEach(async taskList => {
                const newTasks = taskList.tasks.map(task => {
                    return task._id.valueOf() == updatedTask._id.valueOf() ? updatedTask : task;
                });
                await taskList.updateOne({tasks: newTasks});
            });
            return res.status(200).send(updatedTask);
        } catch (err) {
            return res.status(400).send({ error: "Id inválido, tarefa não atualizada" });
        }
    },

    async changeTags(req, res) {
        try {
            const tags = await Tag.find({ 'title': { $in: req.body.tags } });
            await Task.exists({ "id": req.params.id })
            const response = await Task.findByIdAndUpdate(req.params.id, {tags}, { new: true });
            return res.status(200).send(response);
        } catch (err) {
            return res
                .status(400)
                .send({ error: "Dados inválidos, tarefas não criada" });
        }
    },
};

module.exports = TaskController;
