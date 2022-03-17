const Tag = require("@model/Tag");

TagsController = {

    async getTag(req, res) {
        try {
            const title = req.params.title.replace(/_/g, " ")
            const tag = await Tag.findOne({title});
            return res.status(200).send(tag);
        } catch (err) {
            return res
                .status(400)
                .send({ error: "Id inválido, tag não encontrada" });
        }
    },

    async getAllTags(req, res) {
        try {
            const tags = await Tag.find({});
            return res.status(200).send(tags);
        } catch (err) {
            return res
                .status(400)
                .send({ error: "Tags não encontradas" });
        }
    },
    
    async createTag(req, res) {
        try {
            const newTag = new Tag(req.body);
            const response = await newTag.save();
            return res.status(200).send(response);
        } catch (err) {
            return res
                .status(400)
                .send({ error: "Dados inválidos, tag não criada" });
        }
    },

    async editTag(req, res) {
        try {
            const title = req.params.title.replace(/_/g, " ")
            const tag = await Tag.findOneAndUpdate({title}, req.body, { new: true });
            return res.status(200).send(tag);
        } catch (err) {
            return res.status(400).send({ error: "Dados inválidos, tag não editada" });
        }
    },

    async removeTag(req, res) {
        try {
            const title = req.params.title.replace(/_/g, " ")
            const removedTag = await Task.findOneAndDelete({title});
            return res.status(200).send(removedTag);
        } catch (err) {
            return res
                .status(400)
                .send({ error: "Dados inválidos, tag não removida" });
        }
    },
};

module.exports = TagsController;
