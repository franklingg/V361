const TaskList = require("@model/TaskList");

TaskListController = {
    async getAllTaskLists(req, res) {
        try {
            const taskLists = await TaskList.find({});
            return res.status(200).send(taskLists);
        } catch (err) {
            return res
                .status(400)
                .send({ error: "Listas de tarefas não encontradas" });
        }
    },

    async getAllTaskListsSorted(req, res) {
        try {
            const tasks = await TaskList.find({ }).sort({ done: -1, name: 1 })
            return res.status(200).send(tasks);
        } catch (err) {
            return res.status(400).send({ error: "Listas de tarefas não encontradas" });
        }
    },

    async getTaskList(req, res) {
        try {
            const taskLists = await TaskList.findById(req.params.id);
            return res.status(200).send(taskLists);
        } catch (err) {
            return res
                .status(400)
                .send({ error: "Id inválido, listas de tarefas não encontrada" });
        }
    },

    async createTaskList(req, res) {
        try {
            const taskList = new TaskList(req.body);
            const response = await taskList.save();
            return res.status(201).send(response);
        } catch (err) {
            return res
                .status(400)
                .send({ error: "Dados inválidos, lista de tarefas não criada" });
        }
    },

    async updateTaskList(req, res) {
        try {
            const taskList = await TaskList.findByIdAndUpdate(req.params.id, req.body, { new: true });
            return res.status(200).send(taskList);
        } catch (err) {
            return res.status(400).send({ error: "Dados inválidos, lista de tarefas não atualizada" });
        }
    },

    async deleteTaskList(req, res) {
        try {
            await TaskList.findByIdAndRemove(req.params.id);
            return res.status(204).send(undefined);
        } catch (err) {
            return res.status(400).send({ error: "Id inválido, lista de tarefas não removida" });
        }
    },
};

module.exports = TaskListController;
