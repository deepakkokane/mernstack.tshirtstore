const Category = require("../models/category");

exports.createCategory = (req, res) => {
  const category = new Category(req.body);

  category.save((err, doc) => {
    if (err) {
      return res.status(400).json({
        error: "unable to add category",
      });
    }
    res.json(doc);
  });
};

exports.getCategoryById = (req, res, next, id) => {
  Category.findById(id).exec((err, category) => {
    if (err) {
      return res.status(400).json({
        error: "unable to get category",
      });
    }
    req.category = category;
    next();
  });

};

exports.getCategory = (req, res) => {
  return res.json(req.category);
};

exports.getAllCategory = (req, res) => {
  Category.find().exec((err, categories) => {
    if (err) {
      return res.status(400).json({
        error: "unable to get categories",
      });
    }
    res.json(categories);
  });
};

exports.updateCategory = (req, res) => {
  const category = req.category;
  category.name = req.body.name;

  category.save((err, updatedCategory) => {
    if (err) {
      return res.status(400).json({
        error: "unable to update category",
      });
    }

    res.json(updatedCategory);
  });
};

exports.removeCategory = (req, res) => {
  const category = req.category;
  category.remove((err, category) => {
    if (err) {
      return res.status(400).json({
        error: "unable to delete category",
      });
    }
    res.json({
      message: "Successfull deleted",
    });
  });
};
