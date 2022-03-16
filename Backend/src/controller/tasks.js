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
            const response = await newTask.save();
            const taskList = await TaskList.findById(req.body.task_list_id)
            await taskList.replaceOne({tasks: [...taskList.get('tasks'), newTask]});
            return res.status(200).send(response);
        } catch (err) {
            return res
                .status(400)
                .send({ error: "Dados inválidos, tarefas não criada" });
        }
    },

    async editTask(req, res) {
        try {
            const task = await Task.findByIdAndUpdate(req.params.id, req.body, { new: true });
            return res.status(200).send(task);
        } catch (err) {
            return res.status(400).send({ error: "Dados inválidos, tarefa não editada" });
        }
    },

    async removeTask(req, res) {
        try {
            const removedTask = await Task.findByIdAndDelete(req.params.id);
            const taskList = await TaskList.findOne({ tasks: removedTask._id });
            const tasksUpdated = taskList.get('tasks').filter(taskId => taskId.valueOf() !== req.query.task_list_id)
            await taskList.replaceOne({tasks: tasksUpdated});
            return res.status(200).send(removedTask);
        } catch (err) {
            return res
                .status(400)
                .send({ error: "Dados inválidos, tarefa não removida" });
        }
    },

    async markAsDone(req, res) {
        try {
            const task = await Task.findByIdAndUpdate(req.params.id, { done: true }, { new: true });
            return res.status(200).send(task);
        } catch (err) {
            return res.status(400).send({ error: "Id inválido, tarefa não atualizada" });
        }
    },

    async unmarkDone(req, res) {
        try {
            const task = await Task.findByIdAndUpdate(req.params.id, { done: false }, { new: true });
            return res.status(200).send(task);
        } catch (err) {
            return res.status(400).send({ error: "Id inválido, tarefa não atualizada" });
        }
    },

    async changeTags(req, res) {
        try {
            const tags = await Tag.find({ 'title': { $in: req.body.tags } });
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
