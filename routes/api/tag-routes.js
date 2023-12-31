const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');

// The `/api/tags` endpoint

// find all tags
// be sure to include its associated Product data
router.get('/', async (req, res) => {
  try {
    const tagData = await Tag.findAll({
      include: [{ model: Product }]
    });
    return res.status(200).json(tagData)
  } catch (err) {
    return res.status(500).json(err)
  }
});

// find a single tag by its `id`
// be sure to include its associated Product data
router.get('/:id', async (req, res) => {
  try {
    const tagDataID = await Tag.findByPk(req.params.id, {
      include: [{ model: Product }]
    });
    if (!tagDataID) {
      return res.status(404).json({ message: 'No tag found with this ID.' })
    }
    return res.status(200).json(tagDataID);
  } catch (err) {
    return res.status(500).json(err);
  }
});

// create a new tag
router.post('/', async (req, res) => {
  try {
    const createTag = await Tag.create(req.body);
    return res.status(200).json(createTag);
  } catch (err) {
    return res.status(400).json(err);
  }
});

// update a tag's name by its `id` value
router.put('/:id', async (req, res) => {
  try {
    const updateTag = await Tag.update(req.body, {
      where: {
        id: req.params.id,
      },
    });
    if (!updateTag[0]) {
      return res.status(404).json({ message: 'No tag found with this ID.' });
    }
    return res.status(200).json(updateTag);
  } catch (err) {
    return res.status(500).json(err);
  }
});

// delete on tag by its `id` value
router.delete('/:id', async (req, res) => {
  try {
    const deleteTag = await Tag.destroy({
      where: {
        id: req.params.id
      }
    });
    if (!deleteTag) {
      return res.status(404).json({ message: 'No tag found with this ID.' });
    }
    return res.status(200).json({ message: `Tag with ID of ${req.params.id} has been deleted.`});
  } catch (err) {
    return res.status(500).json(err);
  }
});

module.exports = router;
