import { NextResponse } from "next/server";
import { sql } from "@/lib/db";
export async function GET(){try{await sql`SELECT 1`;return NextResponse.json({status:'ok',database:'connected'})}catch{return NextResponse.json({status:'degraded',database:'unavailable'},{status:503})}}
