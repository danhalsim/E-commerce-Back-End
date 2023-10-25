const router = require('express').Router();
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint

// find all categories
// be sure to include its associated Products
router.get('/', async (req, res) => {
  try {
    const getCategoryData = await Category.findAll({ include: [{ model: Product }]});
    return res.status(200).json(getCategoryData);
  } catch (err) {
    return res.status(500).json(err);
  }
});

// find one category by its `id` value
// be sure to include its associated Products
router.get('/:id', async (req, res) => {
  try {
    const oneCategoryID = await Category.findByPk(req.params.id, {
      include: [{ model: Product }]
    });
    if (!oneCategoryID) {
      return res.status(404).json({ message: 'No category found with this ID.' });
    }
    return res.status(200).json(oneCategoryID);
  } catch (err) {
    return res.status(500).json(err);
  }
  });

// create a new category
router.post('/', async (req, res) => {
  try {
    const createNewCategory = await Category.create(req.body);
    return res.status(200).json(createNewCategory)
  } catch (err) {
    return res.status(500).json(err)
  }
});

// update a category by its `id` value
router.put('/:id', async (req, res) => {
  try {
    const updateCategoryData = await Category.update(req.body, {
      where: {
        id: req.params.id,
      },
    });
    if (!updateCategoryData[0]) {
      return res.status(404).json({ message: 'No category found with this ID.' });
    }
    return res.status(200).json(updateCategoryData);
  } catch (err) {
    return res.status(500).json(err);
  }
});

// delete a category by its `id` value
router.delete('/:id', async (req, res) => {
  try {
    const deleteCategory = await Category.destroy({
      where: {
        id: req.params.id
      }
    });
    if (!deleteCategory) {
      res.status(404).json({ message: 'No category found with this ID.' });
      return;
    }
    return res.status(200).json({ message: `Category with ID of ${req.params.id} has been deleted.`});
  } catch (err) {
    return res.status(500).json(err);
  }
});

module.exports = router;
