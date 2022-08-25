const router = require('express').Router();
const { Category, Product, Tag } = require('../../models');

// The `/api/categories` endpoint

router.get('/', async (req, res) => {
  // find all categories
  const allCategories = await Category.findAll({
    include: [{ model: Product}]
  });
  res.status(200).json(allCategories);
  // be sure to include its associated Products
});

router.get('/:id', async (req, res) => {
  // find one category by its `id` value
  const category = await Category.findByPk(req.params.id, {
    include: [{ model: Product}]
  });
  res.status(200).json(category);
  // be sure to include its associated Products
});

router.post('/', async (req, res) => {
  // create a new category
  const category = await Category.create(req.body);
  res.status(200).json(category);
});

router.put('/:id', async (req, res) => {
  // update a category by its `id` value
  const category = await Category.update(req.params.id);
  res.status(200).json(category);
});

router.delete('/:id', async (req, res) => {
  // delete a category by its `id` value
  const category = await Category.delete(req.params.id);
  res.status(200).json(category);
});

module.exports = router;
