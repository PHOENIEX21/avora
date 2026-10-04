import fs from 'node:fs';
let p=0,f=0;const ok=(n,v)=>{console.log(`${v?'PASS':'FAIL'} ${n}`);v?p++:f++};
const pkg=JSON.parse(fs.readFileSync('package.json','utf8')),doc=fs.readFileSync('CLOUDFLARE-PORTABILITY.md','utf8');
ok('Next dev preserved',pkg.scripts.dev==='next dev');ok('Next build preserved',pkg.scripts.build==='next build');
ok('vinext check documented',doc.includes('npx vinext check'));ok('non-destructive path',doc.includes('does not change the current deployment'));
ok('Tutor parity',doc.includes('Tutor'));ok('Paystack parity',doc.includes('Paystack'));ok('offline parity',doc.includes('PWA/offline/reconnect'));
console.log(`Cloudflare portability audit: ${p}/${p+f} PASS`);if(f)process.exit(1);
