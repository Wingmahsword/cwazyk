import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";

const RESULTS_PATH = path.join(process.cwd(), "..", "viral-reel-maker", "results.json");

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const id = searchParams.get("id");

  if (!id) return NextResponse.json({ error: "Missing job ID" }, { status: 400 });

  // 🛑 VERCEL PRODUCTION SAFETY: Return mock for production demo
  if (process.env.VERCEL || id === "demo_job" || id === "test_trial") {
    return NextResponse.json({
      status: "SUCCESS",
      reels: [
        { 
          reel_id: 1, 
          vps_score: 95, 
          title: "Viral Lab — Production Demo", 
          description: "This is a demonstration of the Viral Lab UI on Vercel. For live AI video processing, run the worker locally.",
          video_id: "dQw4w9WgXcQ" 
        }
      ]
    });
  }

  try {
    if (!fs.existsSync(RESULTS_PATH)) {
      return NextResponse.json({ status: "PENDING", message: "Awaiting local worker..." });
    }

    const content = fs.readFileSync(RESULTS_PATH, "utf-8");
    const results = JSON.parse(content || "{}");

    const jobResult = results[id];

    if (!jobResult) {
      return NextResponse.json({ status: "COOKING", message: "Alchemist is processing..." });
    }

    return NextResponse.json({
      status: "SUCCESS",
      reels: jobResult.reels,
      output_dir: jobResult.output_dir
    });

  } catch (error) {
    console.error("Status check fail:", error);
    return NextResponse.json({ status: "ERROR", error: "Failed to read results" }, { status: 500 });
  }
}
