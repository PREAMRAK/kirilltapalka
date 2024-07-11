import supabase from "@/db/supabase";

export default async function update_points(user: any, points: number   )  {
   const value =
            await supabase
                .from("users")
                .select("scores")
                .eq("id", user)

        // @ts-ignore
        const var_scores = value.data[0].scores
        const update =
             await supabase
                .from("users")
                .update({scores: points +var_scores })
                .eq("id", 1488)
}