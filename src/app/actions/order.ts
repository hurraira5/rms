"use server";
import { db } from "../lib/db"; //
import { nanoid } from "nanoid";
import { revalidatePath } from "next/cache";

// 1. Order Create karne ka function (Customer Side)
export async function createOrder(data: any) {
  try {
    const order = await db.order.create({
      data: {
        orderNo: nanoid(6), // y4jWtx style ID
        restaurantId: data.restaurantId,
        customerName: data.name,
        phone: data.phone,
        address: data.address,
        items: data.items,
        subTotal: data.subTotal || 804, //
        deliveryFee: data.deliveryFee || 150, //
        discount: data.discount || 105, //
        grandTotal: data.grandTotal || 849, //
        paymentMethod: data.paymentMethod, //
        status: "Received" // Default status
      },
    });
    revalidatePath("/manager"); // Manager dashboard ko update karega
    return { success: true, orderNo: order.orderNo };
  } catch (error) {
    console.error("Create Order Error:", error);
    return { success: false };
  }
}

// 2. Order Accept karne ka function (Manager Side)
export async function acceptOrder(orderId: string) {
  try {
    await db.order.update({
      where: { id: orderId },
      data: { status: "Accepted" }
    });
    revalidatePath("/manager");
    return { success: true };
  } catch (error) {
    return { success: false };
  }
}

// 3. Order Decline karne ka function (Manager Side)
export async function declineOrder(orderId: string) {
  try {
    await db.order.update({
      where: { id: orderId },
      data: { status: "Declined" }
    });
    revalidatePath("/manager");
    return { success: true };
  } catch (error) {
    return { success: false };
  }
}