require("dotenv").config();

const bcrypt = require("bcryptjs");

const sequelize = require("./config/db");

const User = require("./models/User");

const createAdmin = async () => {

    try {

        await sequelize.sync();

        const existingUser = await User.findOne({
            where: {
                email: "dinushika@gmail.com"
            }
        });

        if (existingUser) {

            console.log("Admin already exists");

            process.exit();

        }

        const hashedPassword = await bcrypt.hash(
            "password123",
            10
        );

        await User.create({

            name: "Dinushika",

            email: "dinushika@gmail.com",

            password: hashedPassword

        });

        console.log("New admin created successfully");

        process.exit();

    } catch (error) {

        console.log(error);

    }

};

createAdmin();