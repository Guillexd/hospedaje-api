if(!self.define){let s,e={};const i=(i,r)=>(i=new URL(i+".js",r).href,e[i]||new Promise((e=>{if("document"in self){const s=document.createElement("script");s.src=i,s.onload=e,document.head.appendChild(s)}else s=i,importScripts(i),e()})).then((()=>{let s=e[i];if(!s)throw new Error(`Module ${i} didn’t register its module`);return s})));self.define=(r,l)=>{const n=s||("document"in self?document.currentScript.src:"")||location.href;if(e[n])return;let u={};const t=s=>i(s,n),o={module:{uri:n},exports:u,require:t};e[n]=Promise.all(r.map((s=>o[s]||t(s)))).then((s=>(l(...s),u)))}}define(["./workbox-a3cf1d8c"],(function(s){"use strict";self.skipWaiting(),s.clientsClaim(),s.precacheAndRoute([{url:"assets/app-_lgDiFIF.js",revision:null},{url:"assets/app-BwMyUgkr.css",revision:null},{url:"assets/app-DDVRQBd3.css",revision:null},{url:"assets/badge-x-C9_ygVA-.js",revision:null},{url:"assets/DrawerTitle.vue_vue_type_script_setup_true_lang-CPvPlu3Q.js",revision:null},{url:"assets/eye-sj_jIObT.js",revision:null},{url:"assets/FilterBarPresentation.vue_vue_type_script_setup_true_lang-CFMY4aMz.js",revision:null},{url:"assets/HousingPaymentView-CPsjiUfK.js",revision:null},{url:"assets/HousingRoomView-D1zTVUYI.js",revision:null},{url:"assets/HousingView-BVXG19YR.js",revision:null},{url:"assets/IdentityDocumentView-Cv_gm28s.js",revision:null},{url:"assets/Input.vue_vue_type_script_setup_true_lang-CJBlVlO3.js",revision:null},{url:"assets/LoginView-CZFCEksK.js",revision:null},{url:"assets/phone-outgoing-BpxXoVJL.js",revision:null},{url:"assets/PopoverTrigger.vue_vue_type_script_setup_true_lang-duuPVoGo.js",revision:null},{url:"assets/RoleView-DAUjfxRe.js",revision:null},{url:"assets/search-ztKx_rn0.js",revision:null},{url:"assets/tableNames-rTtQdpKN.js",revision:null},{url:"assets/TenancyView-C8Z-dyZD.js",revision:null},{url:"assets/Textarea.vue_vue_type_script_setup_true_lang-D-OTkt1Q.js",revision:null},{url:"assets/useFetchHousingRoom-B3RrqMGu.js",revision:null},{url:"assets/useFetchRoles-n8TXAkEz.js",revision:null},{url:"assets/UsersView-WrN3mM8g.js",revision:null},{url:"manifest.json",revision:"959a37f2a195df46aecf5c33a5c93cc2"},{url:"manifest.webmanifest",revision:"ebb11d38e697efefe4a1e2f48c930d16"},{url:"registerSW.js",revision:"2d094791c49e920331981a2d203b8cdb"},{url:"manifest.webmanifest",revision:"ebb11d38e697efefe4a1e2f48c930d16"}],{}),s.cleanupOutdatedCaches()}));
