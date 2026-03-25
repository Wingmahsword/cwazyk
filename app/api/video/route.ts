import { NextRequest, NextResponse } from "next/server";
import fs from "fs";
import path from "path";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const filePath = searchParams.get("path");

  if (!filePath) {
    return NextResponse.json({ error: "Missing path" }, { status: 400 });
  }

  // Safety check: only allow files from the OneDrive/Desktop structure
  if (!filePath.includes("OneDrive") && !filePath.includes("Desktop")) {
     return NextResponse.json({ error: "Forbidden path" }, { status: 403 });
  }

  try {
    if (!fs.existsSync(filePath)) {
      return NextResponse.json({ error: "File not found" }, { status: 404 });
    }

    const stat = fs.statSync(filePath);
    const fileSize = stat.size;
    const range = req.headers.get("range");

    if (range) {
      const parts = range.replace(/bytes=/, "").split("-");
      const start = parseInt(parts[0], 10);
      const end = parts[1] ? parseInt(parts[1], 10) : fileSize - 1;
      const chunksize = end - start + 1;
      const file = fs.createReadStream(filePath, { start, end });
      const head = {
        "Content-Range": `bytes ${start}-${end}/${fileSize}`,
        "Accept-Ranges": "bytes",
        "Content-Length": chunksize.toString(),
        "Content-Type": "video/mp4",
      };
      
      // Node Readable to Web ReadableStream
      const stream = new ReadableStream({
        start(controller) {
          file.on("data", (chunk) => controller.enqueue(chunk));
          file.on("end", () => controller.close());
          file.on("error", (err) => controller.error(err));
        },
      });

      return new NextResponse(stream, { status: 206, headers: head });
    } else {
      const head = {
        "Content-Length": fileSize.toString(),
        "Content-Type": "video/mp4",
      };
      const file = fs.createReadStream(filePath);
      const stream = new ReadableStream({
        start(controller) {
          file.on("data", (chunk) => controller.enqueue(chunk));
          file.on("end", () => controller.close());
          file.on("error", (err) => controller.error(err));
        },
      });
      return new NextResponse(stream, { headers: head });
    }
  } catch (error) {
    console.error("Video stream error:", error);
    return NextResponse.json({ error: "Failed to stream video" }, { status: 500 });
  }
}
