import { NextRequest, NextResponse } from 'next/server';
import supabase from "@/db/supabase";
import update_points from "@/app/api/util/add_points";

function weightedRandom(weights: number[]): number {
   let sum = weights.reduce((acc, weight) => acc + weight, 0);
   let rand = Math.random() * sum;
   for (let i = 0; i < weights.length; i++) {
      if (rand < weights[i]) {
         return i + 1; // return value (1, 2, 3, 4, 5)
      }
      rand -= weights[i];
   }
   return weights.length;
}

const inttoemoji = (value: number): string => {
   switch (value) {
      case 1:
         return "🎉";
      case 2:
         return "🎊";
      case 3:
         return "💃";
      case 4:
         return "🍾";
      case 5:
         return "🥂";
      default:
         return "";
   }
};

export async function GET(req: NextRequest): Promise<NextResponse> {
   try {
      const { searchParams } = new URL(req.url);
      const userId = searchParams.get('userid');

      if (!userId) {
         return NextResponse.json({ error: "Missing user ID" }, { status: 400 });
      }

      // Fetch user data
      const { data: user, error: fetchError } = await supabase
          .from('users')
          .select('*')
          .eq('id', userId)
          .single();

      if (fetchError) {
         console.error("Failed to fetch user:", fetchError);
         return NextResponse.json({ error: "Failed to fetch user" }, { status: 500 });
      }

      if (!user) {
         return NextResponse.json({ error: "User not found" }, { status: 404 });
      }

      // Check spin restrictions
      const now = new Date();
      const lastSpinTime = user.last_spin_time ? new Date(user.last_spin_time) : new Date(0);
      const spinsToday = user.daily_spin_count;
      const isSameDay = lastSpinTime.toDateString() === now.toDateString();
      const isWithin24Hours = (now.getTime() - lastSpinTime.getTime()) / (1000 * 60 * 60) < 24;

      if (isSameDay && spinsToday >= 2) {
         return NextResponse.json({ error: "Daily spin limit reached" }, { status: 400 });
      }

      // Determine points and slots
      const weights = [50, 25, 15, 7, 3]; // weights for each result (1, 2, 3, 4, 5)
      const rval1 = weightedRandom(weights);
      const rval2 = weightedRandom(weights);
      const rval3 = weightedRandom(weights);
      let points = 0;

      if (rval1 === rval2 && rval2 === rval3) {
         points = (rval1 === 1) ? 2000 : (rval1 === 2) ? 1000 : (rval1 === 3) ? 500 : (rval1 === 4) ? 250 : 100;
      } else if (rval1 === rval2 || rval2 === rval3 || rval1 === rval3) {
         points = 20;
      }

      // Update user spin count and time
      const newSpinCount = (isSameDay) ? spinsToday + 1 : 1;
      const { error: updateError } = await supabase
          .from('users')
          .update({
             last_spin_time: now.toISOString(),
             daily_spin_count: newSpinCount,
             scores: user.scores + points
          })
          .eq('id', userId);

      if (updateError) {
         console.error("Failed to update user:", updateError);
         return NextResponse.json({ error: "Failed to update user" }, { status: 500 });
      }

      const resBody = {
         result: true,
         first_slot: inttoemoji(rval1),
         second_slot: inttoemoji(rval2),
         third_slot: inttoemoji(rval3),
         points: points
      };

      return NextResponse.json(resBody);
   } catch (error) {
      console.error("Error processing request:", error);
      return NextResponse.json({ error: "Internal server error" }, { status: 500 });
   }
}
