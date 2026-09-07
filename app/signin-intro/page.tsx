import { redirect } from "next/navigation";
import { getSession } from "@/lib/auth";
import SignInIntro from "@/components/SignInIntro";

export default async function SignInIntroPage(){
  const session=await getSession();
  if(!session) redirect('/login');
  return <main><SignInIntro /></main>;
}
