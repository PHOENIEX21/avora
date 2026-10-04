import {Suspense} from 'react';
import {ResetPasswordForm} from '@/components/PasswordRecoveryForm';
export default function ResetPassword(){return <main className="shell page"><div className="form-card"><span className="eyebrow">SECURE RESET</span><h2 style={{fontSize:34,marginTop:14}}>Choose a new password.</h2><p style={{color:'#697386'}}>Use at least 8 characters and keep it private.</p><Suspense fallback={<p>Preparing secure reset…</p>}><ResetPasswordForm/></Suspense></div></main>}
