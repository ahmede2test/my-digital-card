import { NextRequest, NextResponse } from "next/server";
import { db } from "@/db";
import { profileTable } from "@/db/schema";
import { eq } from "drizzle-orm";

export async function GET() {
  try {
    const profiles = await db.select().from(profileTable).limit(1);
    if (profiles.length === 0) {
      return NextResponse.json({ profile: null }, { status: 200 });
    }
    return NextResponse.json({ profile: profiles[0] }, { status: 200 });
  } catch (error) {
    console.error("Error fetching profile:", error);
    return NextResponse.json({ error: "Failed to fetch profile" }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const profiles = await db.select().from(profileTable).limit(1);

    const values = {
      name: body.name,
      nameHighlight: body.nameHighlight,
      badge: body.badge,
      subtitle: body.subtitle,
      bio: body.bio,
      avatarUrl: body.avatarUrl,
      skills: body.skills,
      links: body.links,
      available: body.available ?? true,
    };

    if (profiles.length === 0) {
      const [newProfile] = await db.insert(profileTable).values(values).returning();
      return NextResponse.json({ profile: newProfile }, { status: 201 });
    } else {
      const [updatedProfile] = await db
        .update(profileTable)
        .set({ ...values, updatedAt: new Date() })
        .where(eq(profileTable.id, profiles[0].id))
        .returning();
      return NextResponse.json({ profile: updatedProfile }, { status: 200 });
    }
  } catch (error) {
    console.error("Error saving profile:", error);
    return NextResponse.json({ error: "Failed to save profile" }, { status: 500 });
  }
}
