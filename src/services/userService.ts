import { User } from "@/lib/types";
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export const updateUser = async (id: number, data: Partial<User>): Promise<any> => {
    try {
      const updateData = {
         
      }

      const updatedChild = await prisma.user.update({
        where: { id },  
        data: {    
          ...updateData
        },
      });
  
      return updatedChild;
  
    } catch (error) {
      console.error('Error updating child data:', error);
      throw new Error('Failed to update child data');
    } finally {
      // Optionally close the Prisma client connection
      await prisma.$disconnect();
    }
};