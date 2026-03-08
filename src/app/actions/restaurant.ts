"use server";
import { db } from "../lib/db";
import { revalidatePath } from "next/cache";

export async function createRestaurant(formData: FormData) {
  const name = formData.get("name") as string;
  const slug = formData.get("slug") as string; // e.g., 'fuse' or 'burger-hub'
  const trialDays = parseInt(formData.get("trialDays") as string) || 30;

  try {
    const trialEnds = new Date();
    trialEnds.setDate(trialEnds.getDate() + trialDays);

    await db.restaurant.create({
      data: {
        name,
        slug: slug.toLowerCase().replace(/\s+/g, '-'), // Space ko dash mein badal dega
        trialEnds,
        status: "Active",
      },
    });

    revalidatePath("/super-admin");
    return { success: true, message: "Restaurant created successfully!" };
  } catch (error) {
    console.error(error);
    return { success: false, message: "Slug already exists or DB error." };
  }
}