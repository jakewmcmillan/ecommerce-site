const router = require('express').Router();
const { Category, Product, Tag } = require('../../models');

// The `/api/categories` endpoint

router.get('/', async (req, res) => {
  try {
  // find all categories
    const allCategories = await Category.findAll({
      include: [{ model: Product}]
    });
    if (!allCategories) {
      res.status(404).json({ message: 'No category found with this id!' });
      return;
    }

    res.status(200).json(allCategories);
  } catch (err) {
    res.status(500).json(err);
  // be sure to include its associated Products
  }
});

router.get('/:id', async (req, res) => {
  try {
  // find one category by its `id` value
    const category = await Category.findByPk(req.params.id, {
      include: [{ model: Product}]
    });
    if (!category) {
      res.status(404).json({ message: 'No category found with this id!' });
      return;
    }
    
    res.status(200).json(category);
  } catch (err) {
    res.status(500).json(err);
  }
  // be sure to include its associated Products
});

router.post('/', async (req, res) => {
  // create a new category
  try {
    const category = await Category.create(req.body);
    res.status(200).json(category);
  } catch (err) {
    res.status(400).json(err);
  }
});

router.put('/:id', async (req, res) => {
  // update a category by its `id` value
  try {
    const category = await Category.update(req.params.id);
    res.status(200).json(category);
  } catch (err) {
    res.status(400).json(err);
  }
});

router.delete('/:id', async (req, res) => {
  // delete a category by its `id` value
  try {
    const category = await Category.destroy({
      where: {
        id: req.params.id
      }
    });

    if (!category) {
      res.status(404).json({ message: 'No category found with this id!' });
      return;
    }

    res.status(200).json(category);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
