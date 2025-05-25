const express = require("express");
const { validateParams, validateBody } = require("../Middleware/Validation");
const { findIdCategorieSchema, createCategorieSchema } = require("../Validations/CategorieValidation");
const router = express.Router();
const {
    getCategories,
    addCategory,
    getCategoryById,
    updateCategory,
    deleteCategory,
    checkCategoriesAssociations // Import the new controller function
} = require("../Controllers/CategorieController");

router.get("/", getCategories);
router.post("/", validateBody(createCategorieSchema), addCategory);
router.get("/:id_categorie", validateParams(findIdCategorieSchema), getCategoryById);
router.put("/:id_categorie", validateParams(findIdCategorieSchema), validateBody(createCategorieSchema), updateCategory);
router.delete("/:id_categorie", validateParams(findIdCategorieSchema), deleteCategory);
router.get("/:id_categorie/associations", validateParams(findIdCategorieSchema), checkCategoriesAssociations); // New route

module.exports = router;