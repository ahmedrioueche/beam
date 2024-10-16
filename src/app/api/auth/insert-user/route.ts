import { insertUser } from "@/services/authService";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const { email, password } = await request.json();
    
    // Insert the user data (assuming `insertUser` handles validation and DB operations)
    const result = await insertUser(email, password);
    
    // Return the result in a valid Next.js JSON response with status 200
    return NextResponse.json(result, { status: 200 });

  } catch (error) {
    console.error("Failed to insert user", error);

    // Return an error response with a 500 status code
    return NextResponse.json(
      { status: 'error', message: 'An error occurred while inserting the user' },
      { status: 500 }
    );
  }
}
