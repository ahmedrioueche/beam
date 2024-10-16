import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt"
const prisma = new PrismaClient();

export const insertUser = async (email: string, password: string) => {
    try {
        const hashedPassword = await bcrypt.hash(password, 10);
        const response = await prisma.user.create({
            data: {
                email: email,
                password: hashedPassword,
            }
        })
        console.log("response", response);
        return response;
    }
    catch(error){
        console.log("Failed to insert user", error);
        return {status: 'error', message: 'An error occured'}
    }
    
}
export async function authenticateUser(email: string, password: string): Promise<any> {
    try {
        console.log("authenticateUser:", email, password)
        const user = await prisma.user.findFirst({
            where: {
                email: email
            },
        });
        console.log("user", user);

        if (!user) {
            return null;
        }

        // Correct order: compare plain password to hashed password from database
        const passwordMatch = await bcrypt.compare(password, user.password);
        
        if (passwordMatch) {
            return user;
        }

        return null;

    } catch (error) {
        console.error('Error authenticating user:', error);
        return null;
    }
}
