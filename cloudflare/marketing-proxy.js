// Pages serves the GitHub build. This route preserves MX records on the marketing hostname.
export default {
 async fetch(request){
  const url=new URL(request.url);
  if(url.hostname!=='stoneflow.pureknight.co.uk')return new Response('Not found',{status:404});
  if(!['GET','HEAD'].includes(request.method))return new Response('Method not allowed',{status:405,headers:{Allow:'GET, HEAD'}});
  if(url.protocol==='http:'){url.protocol='https:';return Response.redirect(url.href,301);}
  const publicOrigin=url.origin;url.hostname='stoneflow-website.pages.dev';url.port='';
  const headers=new Headers();for(const key of ['accept','if-none-match','if-modified-since','range']){const value=request.headers.get(key);if(value)headers.set(key,value);}
  try{
   const upstream=await fetch(url.href,{method:request.method,headers,redirect:'manual'});
   const response=new Response(upstream.body,upstream);response.headers.set('X-Content-Type-Options','nosniff');response.headers.set('Referrer-Policy','strict-origin-when-cross-origin');response.headers.delete('set-cookie');
   if(response.headers.get('content-type')?.includes('text/html'))response.headers.set('Cache-Control','no-cache');
   const location=response.headers.get('location');if(location){const target=new URL(location,url);if(target.hostname===url.hostname){target.host=new URL(publicOrigin).host;response.headers.set('location',target.href);}}
   return response;
  }catch{return new Response('The website is temporarily unavailable. Please try again shortly.',{status:503,headers:{'Retry-After':'30','Cache-Control':'no-store'}});}
 }
};
