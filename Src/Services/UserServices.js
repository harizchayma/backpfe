// Src/Services/UserServices.js
const User = require("../Model/UserModel");
const argon2 = require("argon2");

const getUsersServices = async () => {
    try {
        return await User.findAll();
    } catch (error) {
        console.error('Error fetching users:', error);
        throw error;
    }
};

const addUserServices = async (body) => {
    try {
        const exists = await User.findOne({ where: { login: body.login } });
        if (exists) {
            throw new Error("L'utilisateur existe déjà.");
        }
        body.password = await argon2.hash(body.password);
        return await User.create(body);
    } catch (error) {
        console.error("Error adding user:", error);
        throw error;
    }
};

const getUserByIdServices = async (id) => {
    try {
        return await User.findByPk(id);
    } catch (error) {
        console.error('Error fetching user by ID:', error);
        throw error;
    }
};

const updateUserService = async (id, body) => {
    try {
        console.log(`Updating user with ID: ${id}`);
        // Check if the user exists
        const user = await User.findByPk(id);
        if (!user) {
            console.log(`User with ID: ${id} not found.`);
            return null; // User does not exist
        }

        // Only update fields that are present in the body
        const updates = {};
        if (body.etat !== undefined) {
            updates.etat = body.etat; // Update status
        }
        if(body.password !== undefined){
            updates.password = body.password;
        }

        const [updated] = await User.update(updates, {
            where: { id },
        });

        if (updated) {
            console.log(`User with ID: ${id} updated successfully.`);
            return await User.findByPk(id); // Retrieve the updated user
        }

        console.log(`User with ID: ${id} not updated.`);
        return null; // If not updated, return null
    } catch (error) {
        console.error("Error updating user:", error);
        throw error;
    }
};
const deleteUserService = async (id) => {
    try {
        const deleted = await User.destroy({
            where: { id }
        });
        return deleted ? true : false;
    } catch (error) {
        console.error("Error deleting user:", error);
        throw error;
    }
};

const getUserByUsername = async (userlogin) => {
    try {
        return await User.findOne({ where: { login: userlogin } });
    } catch (error) {
        console.error('Error fetching user by username:', error);
        throw error;
    }
};

module.exports = {
    getUsersServices,
    addUserServices,
    getUserByIdServices,
    updateUserService,
    deleteUserService,
    getUserByUsername
};
