const VERSION='14.1.0';
const CACHE=`avora-shell-v${VERSION}`;
const STATIC=['/offline.html','/manifest.webmanifest','/avora-mark.svg','/icons/avora-192.png','/icons/avora-512.png','/version.json'];

self.addEventListener('install',event=>{
 event.waitUntil(caches.open(CACHE).then(cache=>cache.addAll(STATIC)));
});

self.addEventListener('message',event=>{
 if(event.data?.type==='SKIP_WAITING')self.skipWaiting();
});

self.addEventListener('activate',event=>{
 event.waitUntil(Promise.all([
  caches.keys().then(keys=>Promise.all(keys.filter(key=>key.startsWith('avora-')&&key!==CACHE).map(key=>caches.delete(key)))),
  self.clients.claim(),
 ]));
});

self.addEventListener('fetch',event=>{
 const request=event.request;
 if(request.method!=='GET')return;
 const url=new URL(request.url);
 if(url.origin!==self.location.origin)return;
 // Never service-worker-cache authenticated/API data. Learner-specific lesson payloads are
 // deliberately stored by the Tutor in IndexedDB instead of a shared response cache.
 if(url.pathname.startsWith('/api/')||url.pathname.startsWith('/login')||url.pathname.startsWith('/register')||url.pathname.startsWith('/signin-intro'))return;
 if(request.mode==='navigate'){
  event.respondWith(fetch(request).catch(()=>caches.match('/offline.html')));
  return;
 }
 const staticAsset=url.pathname.startsWith('/_next/static/')||url.pathname.startsWith('/icons/')||url.pathname==='/avora-mark.svg'||url.pathname==='/manifest.webmanifest'||url.pathname==='/version.json';
 if(!staticAsset)return;
 event.respondWith(caches.match(request).then(cached=>{
  const network=fetch(request).then(response=>{if(response.ok){const copy=response.clone();caches.open(CACHE).then(cache=>cache.put(request,copy))}return response});
  return cached||network;
 }));
});
