const joi = require("joi");

const createCategorieSchema = joi.object({
    catégorie: joi.string().required()  // Assurez-vous que "catégorie" avec accent est utilisé ici
}).unknown(true);



const findIdCategorieSchema = joi.object({
    id_categorie: joi.number().integer().required()
});

module.exports = {
    findIdCategorieSchema,
    createCategorieSchema
};
