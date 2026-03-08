import { db } from "../../../lib/db"; // Path fixed
import { notFound } from "next/navigation";
import CustomerUI from "./CustomerUI"; 

// Next.js 15+ mein params Promise hota hai
interface PageProps {
  params: Promise<{ id: string }>;
}

// Share karte waqt restaurant ka naam dikhane ke liye metadata
export async function generateMetadata({ params }: PageProps) {
  const { id } = await params;
  const restaurant = await db.restaurant.findUnique({
    where: { slug: id },
  });

  return {
    title: restaurant ? `${restaurant.name} - Order Online` : "Restaurant Not Found",
  };
}

export default async function RestaurantPage({ params }: PageProps) {
  // 1. Params ko await karein (Next.js 15 requirement)
  const { id } = await params;

  // 2. Database se slug ke zariye restaurant dhoondein
  const restaurant = await db.restaurant.findUnique({
    where: { slug: id },
    include: { 
      branches: true 
    }
  });

  // 3. Agar slug database mein nahi hai toh 404 dikhayein
  if (!restaurant) {
    return notFound(); 
  }

  return (
    <main className="min-h-screen bg-white">
      {/* 4. Real data CustomerUI ko pass karein */}
      <CustomerUI 
        restaurantName={restaurant.name} 
        branches={restaurant.branches} 
      />
    </main>
  );
}