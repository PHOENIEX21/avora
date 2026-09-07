'use client';
import {useEffect} from 'react';
export default function ErrorPage({error,reset}:{error:Error & {digest?:string};reset:()=>void}){
 useEffect(()=>{console.error('AVORA route error',error)},[error]);
 return <main className="shell product-error-page"><section><span>AVORA</span><h1>This page did not load properly.</h1><p>Your learning progress has not been intentionally changed. Try the page again; if the connection is unstable, give it a moment and retry.</p><button onClick={reset}>Try again</button></section></main>;
}
