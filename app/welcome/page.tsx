import { redirect } from 'next/navigation';

export default function LegacyWelcomeRedirect() {
  redirect('/home');
}
