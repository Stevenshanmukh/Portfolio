import { NextRequest, NextResponse } from "next/server";
import { revalidatePath } from "next/cache";

/**
 * POST /api/revalidate
 * Triggers ISR revalidation of the home page.
 * Called by the admin panel after saving changes.
 */
export async function POST(request: NextRequest) {
  try {
    const { secret } = await request.json();

    // Verify the secret to prevent unauthorized revalidation
    if (secret !== process.env.REVALIDATION_SECRET) {
      return NextResponse.json({ error: "Invalid secret" }, { status: 401 });
    }

    // Revalidate the home page
    revalidatePath("/");

    return NextResponse.json({ revalidated: true, now: Date.now() });
  } catch {
    return NextResponse.json(
      { error: "Failed to revalidate" },
      { status: 500 }
    );
  }
}
