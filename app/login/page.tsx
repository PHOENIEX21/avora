import Link from "next/link";
import { redirect } from "next/navigation";
import AuthForm from "@/components/AuthForm";
import { getSession } from "@/lib/auth";
export default async function Login(){const s=await getSession();if(s)redirect('/home');return <main className="shell page"><div className="form-card"><span className="eyebrow">WELCOME BACK</span><h2 style={{fontSize:34,marginTop:14}}>Continue learning.</h2><p style={{color:'#667085'}}>Sign in to continue from your real mastery history.</p><AuthForm mode="login"/><p style={{textAlign:'center',color:'#667085',fontSize:14}}>New to AVORA? <Link href="/register" style={{fontWeight:800,color:'#0b1f3a'}}>Create an account</Link></p></div></main>}
