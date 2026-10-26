import { timingSafeEqual } from "node:crypto";
import { revalidateTag } from "next/cache";
import { POSTS_TAG } from "@/lib/blog";

function isAuthorized(request: Request) {
  const secret = process.env.SANITY_REVALIDATE_SECRET;
  const received = request.headers.get("x-revalidate-secret");
  if (!secret || !received) return false;
  const expected = Buffer.from(secret);
  const actual = Buffer.from(received);
  return expected.length === actual.length && timingSafeEqual(expected, actual);
}

export async function POST(request: Request) {
  if (!isAuthorized(request)) {
    return Response.json({ revalidated: false }, { status: 401 });
  }
  revalidateTag(POSTS_TAG, { expire: 0 });
  return Response.json({ revalidated: true });
}
