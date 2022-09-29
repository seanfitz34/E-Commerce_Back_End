const router = require("express").Router();
const { Tag, Product, ProductTag } = require("../../models");

// The `/api/tags` endpoint

router.get("/", async (req, res) => {
  try {
    const productData = await Product.findAll();
    res.status(200).json(productData);
  } catch (err) {
    res.status(500).json(err);
  }
  // find all tags
  // be sure to include its associated Product data
});

router.get("/:id", async (req, res) => {
  try {
    const productData = await Product.findByPk(req.params.id, {
      include: [{ model: ProductTag, through: Tag, as: "product)tags" }],
    });
    if (!productData) {
      res.status(404).json({ message: "No product found with this id!" });
      return;
    }
    res.status(200).json(productData);
  } catch (err) {
    res.status(500).json(err);
  }
});

// find a single tag by its `id`
// be sure to include its associated Product data

router.post("/", async (req, res) => {
  // create a new tag
  try {
    const productData = Tag.create(req.body);
    res.status(200).json(productData);
  } catch (err) {
    res.status(400).json(err);
  }
});

router.put("/:id", async (req, res) => {
  // update a tag's name by its `id` value
  try {
    const productData = await Tag.create(req.body.id);
    res.status(200).json(productData);
  } catch (err) {
    res.status(400).json(err);
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const productData = await Tag.destroy({
      where: {
        id: req.params.id,
      },
    });
    if (!productData) {
      res.status(404).json({ message: "No Tag found with this id!" });
      return;
    }
    res.status(404).json(productData);
  } catch (err) {
    res.status(500).json(err);
  }
  // delete on tag by its `id` value
});

module.exports = router;
