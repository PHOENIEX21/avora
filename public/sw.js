const CACHE='avora-static-v2';
const STATIC=['/manifest.webmanifest','/avora-mark.svg','/icons/avora-192.png','/icons/avora-512.png'];
self.addEventListener('install',event=>{self.skipWaiting();event.waitUntil(caches.open(CACHE).then(cache=>cache.addAll(STATIC).catch(()=>{})))});
self.addEventListener('activate',event=>{event.waitUntil(Promise.all([caches.keys().then(keys=>Promise.all(keys.filter(key=>key.startsWith('avora-')&&key!==CACHE).map(key=>caches.delete(key)))),self.clients.claim()]))});
self.addEventListener('fetch',event=>{
 const request=event.request;
 if(request.method!=='GET')return;
 const url=new URL(request.url);
 if(url.origin!==self.location.origin)return;
 if(url.pathname.startsWith('/api/')||url.pathname.startsWith('/login')||url.pathname.startsWith('/register')||url.pathname.startsWith('/signin-intro')||request.mode==='navigate')return;
 const staticAsset=url.pathname.startsWith('/_next/static/')||url.pathname.startsWith('/icons/')||url.pathname==='/avora-mark.svg'||url.pathname==='/manifest.webmanifest';
 if(!staticAsset)return;
 event.respondWith(caches.match(request).then(cached=>cached||fetch(request).then(response=>{if(response.ok){const copy=response.clone();caches.open(CACHE).then(cache=>cache.put(request,copy))}return response})));
});
