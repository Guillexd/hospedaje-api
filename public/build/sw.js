if(!self.define){let s,e={};const i=(i,n)=>(i=new URL(i+".js",n).href,e[i]||new Promise((e=>{if("document"in self){const s=document.createElement("script");s.src=i,s.onload=e,document.head.appendChild(s)}else s=i,importScripts(i),e()})).then((()=>{let s=e[i];if(!s)throw new Error(`Module ${i} didn’t register its module`);return s})));self.define=(n,r)=>{const l=s||("document"in self?document.currentScript.src:"")||location.href;if(e[l])return;let t={};const u=s=>i(s,l),o={module:{uri:l},exports:t,require:u};e[l]=Promise.all(n.map((s=>o[s]||u(s)))).then((s=>(r(...s),t)))}}define(["./workbox-a3cf1d8c"],(function(s){"use strict";self.skipWaiting(),s.clientsClaim(),s.precacheAndRoute([{url:"assets/app-BvZnc758.js",revision:null},{url:"assets/app-BwMyUgkr.css",revision:null},{url:"assets/app-DYH5uQFv.css",revision:null},{url:"assets/badge-x-DVPolDM8.js",revision:null},{url:"assets/DrawerTitle.vue_vue_type_script_setup_true_lang-CXIl1LMx.js",revision:null},{url:"assets/eye-wkDbsak3.js",revision:null},{url:"assets/FilterBarPresentation.vue_vue_type_script_setup_true_lang-DItRwXAg.js",revision:null},{url:"assets/HousingPaymentView-Djx443wF.js",revision:null},{url:"assets/HousingRoomView-_B_tH5a6.js",revision:null},{url:"assets/HousingView-kChmPB2w.js",revision:null},{url:"assets/IdentityDocumentView-xA0b9BaX.js",revision:null},{url:"assets/Input.vue_vue_type_script_setup_true_lang-BfsYOyqe.js",revision:null},{url:"assets/LoginView-wxrf4NHh.js",revision:null},{url:"assets/phone-outgoing-8HDeR2r3.js",revision:null},{url:"assets/search-Bk_H8TVr.js",revision:null},{url:"assets/tableNames-DfybiWiq.js",revision:null},{url:"assets/TenancyView-XCvNPEHe.js",revision:null},{url:"assets/Textarea.vue_vue_type_script_setup_true_lang-zA3N994b.js",revision:null},{url:"assets/useFetchHousingRoom-BYtzTgFR.js",revision:null},{url:"assets/UsersView-BG7cC8WM.js",revision:null},{url:"manifest.json",revision:"580c4d2d80929fb42dd63fc5c59684b1"},{url:"manifest.webmanifest",revision:"62207c190539d81b4a67e59a930a4404"},{url:"registerSW.js",revision:"2d094791c49e920331981a2d203b8cdb"},{url:"manifest.webmanifest",revision:"62207c190539d81b4a67e59a930a4404"}],{}),s.cleanupOutdatedCaches()}));
