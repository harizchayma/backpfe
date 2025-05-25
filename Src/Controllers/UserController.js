const multer = require("multer");
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

const {
    getUsersServices,
    addUserServices,
    getUserByIdServices,
    updateUserService,
    deleteUserService,
    getUserByUsername,
} = require("../Services/UserServices");
const User = require('../Model/UserModel');
const argon2 = require("argon2");

const handleResponse = (res, statusCode, message, data = null) => {
    return res.status(statusCode).json({
        statusCode,
        message,
        data,
    });
};

const getUsers = async (req, res) => {
    try {
        const data = await getUsersServices();
        return handleResponse(res, data.length > 0 ? 200 : 404, data.length > 0 ? "Users retrieved successfully" : "No users found", data);
    } catch (error) {
        return handleResponse(res, 500, "An error occurred while retrieving users", { error: error.message });
    }
};
const addUser = async (req, res) => {
    try {
        const { login, password, role, cin_utilisateur, tel, mail, nom, prenom, etat } = req.body;

        // Log the received image for debugging
        console.log("Image received:", req.file); 

        // Hash the password
        const hashedPassword = await argon2.hash(password);

        // Create a new user
        const newUser = await User.create({
            login,
            password: hashedPassword,
            role,
            cin_utilisateur,
            tel,
            mail,
            nom,
            prenom,
            etat,
            image: req.file ? req.file.buffer : null, // Store the image as a buffer
        });

        return res.status(201).json({
            message: "User created successfully",
            user: newUser,
        });
    } catch (error) {
        console.error("Error creating user:", error);
        return res.status(500).json({ message: "Internal server error", error: error.message });
    }
};
const getUserById = async (req, res) => {
    try {
        const user = await User.findByPk(req.params.id);
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
        return res.status(200).json({ data: user });
    } catch (error) {
        console.error("Error getting user by ID:", error);
        return res.status(500).json({ message: "An error occurred", error: error.message });
    }
};
const updateUser = async (req, res) => {
    upload.single('image')(req, res, async (err) => {
        if (err) {
            console.error("Multer error:", err);
            return res.status(500).json({ message: "File upload error", error: err.message });
        }
        try {
            const { id } = req.params;
            const data = {
                ...req.body,
                image: req.file ? req.file.buffer : null,
            };
            const updatedUser = await updateUserService(id, data);
            return handleResponse(res, updatedUser ? 200 : 404, updatedUser ? "User updated successfully" : "User not found", updatedUser);
        } catch (error) {
            return handleResponse(res, 500, "An error occurred while updating user", { error: error.message });
        }
    });
};

const updateUserLogin = async (req, res) => {
    try {
        const { id } = req.params;
        const { password } = req.body;

        console.log(`Updating login for user ID: ${id}`); // Log l'ID reçu

        const updateData = {};
        if (password) {
            updateData.password = await argon2.hash(password);
        }

        const updatedUser = await updateUserService(id, updateData);

        if (updatedUser) {
            console.log(`User with ID: ${id} updated successfully.`); // Log si la mise à jour réussit
            return handleResponse(res, 200, "User login updated successfully", updatedUser);
        } else {
            console.log(`User with ID: ${id} not found.`); // Log si l'utilisateur n'est pas trouvé
            return handleResponse(res, 404, "User not found");
        }
    } catch (error) {
        console.error("Error updating user login:", error);
        return handleResponse(res, 500, "An error occurred while updating user login", { error: error.message });
    }
};

const deleteUser = async (req, res) => {
    try {
        const { id } = req.params;
        const user = await getUserByIdServices(id);
        if (!user) {
            return handleResponse(res, 404, "User not found");
        }
        await deleteUserService(id);
        return handleResponse(res, 200, "User deleted successfully");
    } catch (error) {
        return handleResponse(res, 500, "An error occurred while deleting user", { error: error.message });
    }
};

const loginUser = async (req, res) => {
    try {
        const { login, password } = req.body;
        const user = await User.findOne({ where: { login } });

        if (!user) {
            return res.status(400).json({ message: "User not found" });
        }

        const isMatch = await argon2.verify(user.password, password);

        if (!isMatch) {
            return res.status(400).json({ message: "Informations d'identification non valides" });
        }

        const { password: _, ...userWithoutPassword } = user.dataValues;
        return res.status(200).json({ user: userWithoutPassword });
    } catch (error) {
        console.error("Error during login:", error);
        return res.status(500).json({ message: "Internal server error" });
    }
};

const updateUserStatus = async (req, res) => {
    const { id } = req.params;
    const { etat } = req.body;

    console.log(`Updating status for user ID: ${id} with new status: ${etat}`);

    try {
        const updatedUser = await updateUserService(id, { etat });
        if (updatedUser) {
            return res.status(200).json({
                message: "User status updated successfully",
                user: updatedUser
            });
        } else {
            console.log(`User with ID: ${id} was not found during status update.`);
            return res.status(404).json({ message: "User not found" });
        }
    } catch (error) {
        console.error("Error updating user status:", error);
        return res.status(500).json({ message: "An error occurred while updating user status", error: error.message });
    }
};

module.exports = {
    getUsers,
    addUser,
    getUserById,
    updateUser,
    deleteUser,
    loginUser,
    updateUserLogin,
    updateUserStatus,
};