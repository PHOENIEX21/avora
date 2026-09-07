import Link from "next/link";
import { redirect } from "next/navigation";
import AuthForm from "@/components/AuthForm";
import { getSession } from "@/lib/auth";
export default async function Register(){const s=await getSession();if(s)redirect('/home');return <main className="shell page"><div className="form-card"><span className="eyebrow">START YOUR PATH</span><h2 style={{fontSize:34,marginTop:14}}>Meet the learner first.</h2><p style={{color:'#667085'}}>Your profile gives AVORA the starting context for diagnostics and personalization.</p><AuthForm mode="register"/><p style={{textAlign:'center',color:'#667085',fontSize:14}}>Already registered? <Link href="/login" style={{fontWeight:800,color:'#0b1f3a'}}>Sign in</Link></p></div></main>}
