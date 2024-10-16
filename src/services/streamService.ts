import { PrismaClient } from "@prisma/client";
import { Stream } from "@/lib/types";

const prisma = new PrismaClient();

export const updateStream = async (userId: number, data: Partial<Stream>): Promise<any> => {
  try {
    // Update the stream where the streamerId matches and apply the changes from data
    const updatedStream = await prisma.stream.updateMany({
      where: { streamerId: userId },  
      data: {    
        ...data,  
      },
    });

    return updatedStream;
  } catch (error) {
    console.error('Error updating stream data:', error);
    throw new Error('Failed to update stream data');
  } finally {
    // Close the Prisma client connection
    await prisma.$disconnect();
  }
};
