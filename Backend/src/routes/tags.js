const router = require('express').Router();
const TagsController = require('@controller/Tags');

router.get('/:title', TagsController.getTag);
router.get('/', TagsController.getAllTags);
router.post('/', TagsController.createTag);
router.put('/:title', TagsController.editTag);
router.delete('/:title', TagsController.removeTag);

module.exports = router;