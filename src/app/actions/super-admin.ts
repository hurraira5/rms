"use server";
import { db } from "../../lib/db"; // Path fix
import { revalidatePath } from "next/cache";

// --- BRAND (RESTAURANT) ACTIONS ---
export async function createBrand(data: { name: string, slug: string, email: string, password: string }) {
  await db.restaurant.create({ data });
  revalidatePath("/super-admin");
}

export async function deleteBrand(id: string) {
  await db.restaurant.delete({ where: { id } });
  revalidatePath("/super-admin");
}

// --- BRANCH ACTIONS ---
export async function createBranch(data: any) {
  const { manager, ...branchData } = data;
  await db.branch.create({
    data: {
      ...branchData,
      manager: { create: manager }
    }
  });
  revalidatePath("/super-admin");
}

export async function deleteBranch(id: string) {
  await db.branch.delete({ where: { id } });
  revalidatePath("/super-admin");
}

// --- MENU & CATEGORY ACTIONS ---
export async function addCategory(name: string, branchId: string) {
  await db.category.create({ data: { name, branchId } });
  revalidatePath("/super-admin");
}

export async function addItem(data: any) {
  await db.item.create({ data });
  revalidatePath("/super-admin");
}