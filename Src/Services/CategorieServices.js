const Categorie = require("../Model/CategorieModel");
const Vehicule = require("../Model/VehiculesModel"); // Import the Vehicule model

const getCategoriesServices = async () => {
    try {
        const categories = await Categorie.findAll();
        return categories;
    } catch (error) {
        console.error("Error fetching categories:", error);
        throw error;
    }
};

const addCategoriesServices = async (body) => {
    try {
        const data = await Categorie.create(body);
        console.log("Added category:", data);
        return data;
    } catch (error) {
        console.error("Error adding category:", error);
        throw error;
    }
};

const getCategoriesByIdServices = async (id_categorie) => {
    return await Categorie.findByPk(id_categorie);
};

const updateCategoriesService = async (id_categorie, body) => {
    const [updated] = await Categorie.update(body, { where: { id_categorie } });
    return updated ? await Categorie.findByPk(id_categorie) : null;
};

const deleteCategoriesService = async (id_categorie) => {
    return await Categorie.destroy({ where: { id_categorie } });
};

const checkCategoriesAssociationsService = async (id_categorie) => {
    try {
        const category = await Categorie.findByPk(id_categorie, {
            include: [
                { model: Vehicule, as: "vehicules" }, // Make sure the alias matches the association in CategorieModel
            ],
        });

        const hasAssociations = category && category.vehicules && category.vehicules.length > 0;
        return { hasAssociations };
    } catch (error) {
        console.error(
            "Erreur lors de la vérification des associations de la Catégorie:",
            error
        );
        throw new Error("Impossible de vérifier les associations de la Catégorie");
    }
};

module.exports = {
    getCategoriesServices,
    addCategoriesServices,
    getCategoriesByIdServices,
    updateCategoriesService,
    deleteCategoriesService,
    checkCategoriesAssociationsService // Export the new service
};