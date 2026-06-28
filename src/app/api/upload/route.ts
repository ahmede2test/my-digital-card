import { NextRequest, NextResponse } from "next/server";
import { put } from "@vercel/blob";

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const file = formData.get("file") as File;

    if (!file) {
      return NextResponse.json({ error: "No file uploaded" }, { status: 400 });
    }

    // رفع الصورة إلى مساحة تخزين Vercel Blob الدائمة
    const blob = await put(file.name, file, {
      access: 'public',
    });

    // إرجاع الرابط الذي سيتم حفظه في الداتا بيز
    return NextResponse.json({ url: blob.url }, { status: 200 });
  } catch (error) {
    console.error("Upload error:", error);
    return NextResponse.json({ error: "Upload failed" }, { status: 500 });
  }
}