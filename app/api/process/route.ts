import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";

// 🌉 THE BRIDGE: This route writes to a local JSON file that the Python worker polls.
// IMPORTANT: This only works when running Next.js LOCALLY (npm run dev).
const JOBS_PATH = path.join(process.cwd(), "..", "viral-reel-maker", "jobs.json");

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { url } = body;

    const job_id = Math.random().toString(36).substring(2, 10);

    // 🛑 VERCEL PRODUCTION SAFETY: Skip local FS if on Vercel
    if (process.env.VERCEL || process.env.NODE_ENV === "production") {
      return NextResponse.json({
        status: "manifesting",
        job_id: "demo_job",
        message: "SYSTEM NOTE: Real generation requires the Local Bridge. Demo mode active.",
      });
    }

    const newJob = {
      job_id,
      url,
      status: "PENDING",
      created_at: new Date().toISOString(),
    };

    // Ensure directory exists
    const dir = path.dirname(JOBS_PATH);
    if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });

    // Read and append to jobs.json
    let jobs = [];
    if (fs.existsSync(JOBS_PATH)) {
      const content = fs.readFileSync(JOBS_PATH, "utf-8");
      jobs = JSON.parse(content || "[]");
    }
    
    jobs.push(newJob);
    fs.writeFileSync(JOBS_PATH, JSON.stringify(jobs, null, 2));

    console.log(`🌉 BRIDGE: Created job ${job_id} for ${url}`);

    return NextResponse.json({
      status: "manifesting",
      job_id,
      message: "The Alchemist has received your request. Local worker notified.",
    });
  } catch (error) {
    console.error("Alchemic failure:", error);
    return NextResponse.json({ error: "Alchemic failure: Unable to write job" }, { status: 500 });
  }
}
