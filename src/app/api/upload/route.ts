import { NextRequest, NextResponse } from "next/server";
import { put } from "@vercel/blob";

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const file = formData.get("file") as File;
    if (!file) return NextResponse.json({ error: "No file" }, { status: 400 });

    // رفع الصورة للسحابة
    const blob = await put(file.name, file, { access: 'public' });

    // إرسال الرابط الجديد للداتا بيز
    return NextResponse.json({ url: blob.url }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: "Upload failed" }, { status: 500 });
  }
}