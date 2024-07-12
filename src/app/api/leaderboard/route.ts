import {NextRequest} from "next/server";
import supabase from "@/db/supabase";

export async function GET(req: NextRequest) {
    const data = await supabase.from("users").select("first_name, last_name, scores").limit(20).order("scores")

    return Response.json(
        data
    )
}
