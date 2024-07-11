import { NextRequest, NextResponse } from 'next/server';
import supabase from "@/db/supabase";
import update_points from "@/app/api/util/add_points";
function randomNumber(min: number, max: number) {
    return Math.floor(Math.random() * (max - min) + min);return Math.random() * (max - min) + min;
}

/*
GET https://URL:PORT/api/slot?userid=INTEGER
play slot. returns emojis and adds scores
 */
export async function GET(req: NextRequest) {
   let rval1 =randomNumber(1, 5)
   const rval2 =randomNumber(1, 5)
   const rval3 =randomNumber(1, 5)
   console.log(rval1)
   var points = 0
   if (rval1 == rval2 || rval2 == rval3) {
      points = 20
   }
   if (rval1 == 1|| rval1 == 1 || rval1 == 1) {
      points = 2000
   }
   if (rval1 == 2&& rval1 == 2 && rval1 == 2) {
   points = 1000
   }
   if (rval1 == 3&& rval1 == 3 && rval1 == 3) {
   points = 500
   }
   if (rval1 == 4&& rval1 == 4 && rval1 == 4) {
   points  = 250
   }
   if (rval1 == 5&& rval1 == 5 && rval1 == 5) {
      points = 100

   }

   const result1 = inttoemoji(rval1)
   const { searchParams } = new URL(req.url)
   update_points(parseInt(<string>searchParams.get("userid")),points)
   const res_body = {
      result: true,
      first_slot: result1,
      second_slot: inttoemoji(rval2),
      third_slot: inttoemoji(rval3)
   }
   console.log(res_body)
   console.log(inttoemoji(1))
   return Response.json(res_body)
}
const inttoemoji =(value: number) => {
   switch (value) {
      case 1:
         return "🎉"
      case 2:
         return "🎊"
      case 3:
         return "💃"
      case 4:
         return "🍾"
      case 6:
         return "🥂"

   }
}
