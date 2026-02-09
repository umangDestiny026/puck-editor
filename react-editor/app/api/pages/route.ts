import { revalidatePath } from "next/cache";
import { NextResponse } from "next/server";
import fs from "fs";

// Saves page data to a JSON file, replace this with your own database logic
export async function POST(request: Request) {
  const payload = await request.json();

  const existingData = JSON.parse(
    fs.existsSync("database.json")
      ? fs.readFileSync("database.json", "utf-8")
      : "{}"
  );

  const updatedData = {
    ...existingData,
    [payload.path]: payload.data,
  };

  fs.writeFileSync("database.json", JSON.stringify(updatedData));

  // Purge Next.js cache
  revalidatePath(payload.path);

  return NextResponse.json({ status: "ok" });
}



// import { NextRequest } from "next/server";
// import { puckHandler } from "@puckeditor/cloud-client";

// // Handles all requests for Puck AI
// // Learn more: https://puckeditor.com/docs/ai/getting-started
// export const POST = (request: NextRequest) => {
//   return puckHandler(request, {
//     ai: {
//       // Replace with your business context
//       context: "We are Google. You create Google landing pages.",
//     },
//   });
// };
