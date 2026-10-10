import {redirect} from 'next/navigation';import Link from 'next/link';
import {getSession} from '@/lib/auth';import {isCommunityOwner} from '@/lib/communityAccess';import CommunityAdminManager from '@/components/CommunityAdminManager';
export default async function CommunityAdminsPage(){const s=await getSession();if(!s)redirect('/login');if(!isCommunityOwner(s.userId))redirect('/community');return <main className="shell"><Link href="/community">← Community</Link><h1>Community ownership & admin access</h1><CommunityAdminManager/></main>}
