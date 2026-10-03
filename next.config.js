const h=[{key:"X-Frame-Options",value:"DENY"},{key:"X-Content-Type-Options",value:"nosniff"},{key:"Referrer-Policy",value:"strict-origin-when-cross-origin"}];
module.exports={async rewrites(){return{beforeFiles:[{source:"/",destination:"/index.html"}]}},async headers(){return[{source:"/(.*)",headers:h}]}};
