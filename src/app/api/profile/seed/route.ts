import { NextResponse } from "next/server";
import { db } from "@/db";
import { profileTable } from "@/db/schema";

export async function POST() {
  try {
    const existing = await db.select().from(profileTable).limit(1);
    if (existing.length > 0) {
      return NextResponse.json({ message: "Profile already exists", profile: existing[0] }, { status: 200 });
    }

    const [profile] = await db
      .insert(profileTable)
      .values({
        name: "Eng. Ahmed Osman",
        nameHighlight: "Elsisi",
        badge: "IT SPECIALIST",
        subtitle: "IT Technical Support · Orascom Construction (Contrack FM) · Flutter Expert · Mobile App Developer",
        bio: "Architecting and developing smart, high-performance mobile applications with premium, user-centric UI/UX design layouts. Explore my professional networks and connect with me directly.",
        avatarUrl: "",
        skills: ["Flutter", "App Developer", "MySQL", "API Integration", "IT Support"],
        links: {
          linkedin: "https://linkedin.com/in/ahmed-elsisi",
          github: "https://github.com/ahmedelsisi",
          website: "https://ahmedelsisi.dev",
          facebook: "https://facebook.com/ahmed.elsisi",
          instagram: "https://instagram.com/ahmed.elsisi",
          email: "mailto:ahmod.elsisi@example.com",
          phone: "tel:+201000000000",
          whatsapp: "https://wa.me/201000000000",
        },
        available: true,
      })
      .returning();

    return NextResponse.json({ message: "Profile seeded", profile }, { status: 201 });
  } catch (error) {
    console.error("Error seeding profile:", error);
    return NextResponse.json({ error: "Failed to seed profile" }, { status: 500 });
  }
}
