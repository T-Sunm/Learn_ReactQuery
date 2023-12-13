import { prisma } from "../config/prismaConfig.js"
import bcrypt from "bcrypt"

export const CreateUser = async (req, res) => {
    const { user } = req.body;

    if (!user) {
        return res.status(400).json({ message: "user is required" });
    }

    const { email, password, userName } = user;

    try {
        const saltRounds = 10;
        const hashedPassword = await bcrypt.hash(password, saltRounds);
        const result = await prisma.user.create({
            data: {
                email,
                hashedPassword,
                name: userName
            }
        })
        res.json(result)
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal server error" });
    }


}

export const Login = async (req, res) => {
    const { user } = req.body;

    if (!user) {
        return res.status(400).json({ message: "user is required" });
    }
    const { email, password } = user;

    try {
        const userDB = await prisma.user.findUnique({
            where: {
                email: email
            }
        })

        if (!userDB) {
            return res.status(400).json({ message: "user is required" });
        }

        const isMatch = await bcrypt.compare(password, userDB.hashedPassword);
        if (isMatch) {
            // Passwords match, login successful
            // Here, you might want to create a session or generate a JWT token, etc.
            const { hashedPassword: _, ...userWithoutPassword } = userDB;
            console.log("thanhcong")
            return res.status(200).json({ message: "Login successful", userWithoutPassword });
        } else {
            // Passwords do not match
            return res.status(401).json({ message: "Invalid credentials" });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal server error" });
    }
}