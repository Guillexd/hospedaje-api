import{c as Q,d as A,h as $,o as f,i as w,w as t,j as a,u as e,m as c,n as U,k as r,v,U as L,N as W,a as q,q as F,Y as ae,F as ee,X as ue,A as He,e as ke,L as z,f as k,B as Be,C as ze,D as Ae,E,G as Ie,H as Ee,I as Te,J as ne,s as Se,K as je,M as Oe,a8 as Ce,r as ie,O as De,P as qe,ab as Ne,ac as Re,p as M,b as J,ad as Ue,ae as Me,R as le,a0 as oe,af as re,ag as de,ah as me,ai as ce,aj as fe,$ as pe,ak as _e,al as Le,T as h,a1 as te,am as We,an as Ke,ao as Xe,a6 as Ge,a7 as se,a3 as ge,a4 as ye}from"./app-B1TY8xWk.js";import{E as Je,_ as Qe,S as Ye,s as Ze,t as ea,u as aa,v as ta,w as sa,x as na,y as la,z as oa,a as ia,b as ua,c as ra,A as he,X as ve,B as Pe,d as da,e as ma,f as be,g as ca,h as fa,i as pa,j as _a,k as ga,l as ya}from"./FilterBarPresentation.vue_vue_type_script_setup_true_lang-CvDOSHXn.js";import{e as K,F as T,_ as j,a as O,b as N,d as R,c as Z,u as ha}from"./Input.vue_vue_type_script_setup_true_lang-4LFd6wTb.js";import{_ as va,a as Pa,b as ba,c as xa,d as wa,e as $a}from"./DrawerTitle.vue_vue_type_script_setup_true_lang-43d8401m.js";import{E as ka}from"./eye-BnZn7LQ0.js";import{P as Sa,M as Ca}from"./phone-outgoing-gRuNOG7-.js";import{u as Da,_ as qa,a as Va,b as Fa,c as Ha,d as Ba,e as za}from"./Textarea.vue_vue_type_script_setup_true_lang-3KePeYR3.js";import{u as Aa}from"./useFetchHousingRoom-BKNc609X.js";/**
 * @license lucide-vue-next v0.446.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Ia=Q("BanIcon",[["circle",{cx:"12",cy:"12",r:"10",key:"1mglay"}],["path",{d:"m4.9 4.9 14.2 14.2",key:"1m5liu"}]]);/**
 * @license lucide-vue-next v0.446.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Ve=Q("CircleCheckBigIcon",[["path",{d:"M21.801 10A10 10 0 1 1 17 3.335",key:"yps3ct"}],["path",{d:"m9 11 3 3L22 4",key:"1pflzl"}]]);/**
 * @license lucide-vue-next v0.446.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Ea=Q("CircleSlashIcon",[["circle",{cx:"12",cy:"12",r:"10",key:"1mglay"}],["line",{x1:"9",x2:"15",y1:"15",y2:"9",key:"1dfufj"}]]);/**
 * @license lucide-vue-next v0.446.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Fe=Q("CircleXIcon",[["circle",{cx:"12",cy:"12",r:"10",key:"1mglay"}],["path",{d:"m15 9-6 6",key:"1uzhvr"}],["path",{d:"m9 9 6 6",key:"z0biqf"}]]);/**
 * @license lucide-vue-next v0.446.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Ta=Q("FilePlus2Icon",[["path",{d:"M4 22h14a2 2 0 0 0 2-2V7l-5-5H6a2 2 0 0 0-2 2v4",key:"1pf5j1"}],["path",{d:"M14 2v4a2 2 0 0 0 2 2h4",key:"tnqrlb"}],["path",{d:"M3 15h6",key:"4e2qda"}],["path",{d:"M6 12v6",key:"1u72j0"}]]),ja={class:"grid lg:grid-cols-[auto_1fr_auto] gap-3"},Oa={class:"bg-white dark:bg-slate-300 shadow-lg rounded-lg p-4 max-w-xl w-full mx-auto lg:order-2"},Na={class:"flex justify-between"},Ra={class:"text-gray-700"},Ua={class:"flex justify-between"},Ma={class:"font-medium"},La={class:"text-gray-700"},Wa={class:"flex justify-between"},Ka={class:"text-gray-700"},Xa={class:"flex justify-between"},Ga={class:"font-medium"},Ja={class:"text-gray-700"},Qa={class:"text-gray-700 font-semibold text-center"},Ya={class:"flex justify-between"},Za={class:"text-gray-700 font-bold"},et={class:"flex justify-between font-bold"},at={key:0,class:"flex items-center gap-1 text-green-700"},tt={key:1,class:"flex items-center gap-1 text-blue-700"},st={key:0,class:"text-black whitespace-pre-wrap font-medium mt-5 text-justify"},nt={class:"mx-auto w-full sm:w-[50vw] lg:w-[25vw] lg:order-1"},lt=["src"],ot={key:1,class:"animate-pulse"},it={class:"mx-auto w-full sm:w-[50vw] lg:w-[25vw] lg:order-3"},ut=["src"],rt={key:1,class:"animate-pulse"},dt=["src"],mt=A({__name:"HousingPaymentDetail",props:{isDrawerOpen:{type:Boolean},housingPayment:{}},emits:["update:drawer-state"],setup(x,{emit:_}){const d=_;function y(m){d("update:drawer-state",m)}const P=window.innerWidth>1023&&window.innerWidth<1290?270:350,l=$(null),b=$("");function p(m,n){b.value=n,document.startViewTransition?document.startViewTransition(()=>{l.value=m}):l.value=m}function H(){document.startViewTransition?document.startViewTransition(()=>{l.value=null,b.value=""}):(l.value=null,b.value="")}return(m,n)=>(f(),w(e($a),{open:m.isDrawerOpen,"onUpdate:open":n[2]||(n[2]=S=>y(S))},{default:t(()=>[a(e(va),null,{default:t(()=>[c("div",{class:U(`p-4 overflow-y-auto ${l.value?"h-[97vh]":"max-h-[80vh] sm:max-h-[90vh]"}`)},[a(e(Pa),{class:"max-w-lg mx-auto"},{default:t(()=>[a(e(ba),{class:"text-xl font-semibold dark:text-slate-200"},{default:t(()=>n[3]||(n[3]=[r("Detalles del alquiler")])),_:1}),a(e(xa),{class:"text-gray-500"},{default:t(()=>n[4]||(n[4]=[r(" Aquí puedes ver los detalles de este alquiler. ")])),_:1})]),_:1}),c("main",ja,[c("section",Oa,[n[10]||(n[10]=c("h3",{class:"text-lg font-bold"},"Información del alquiler",-1)),c("div",Na,[n[5]||(n[5]=c("span",{class:"font-medium"},"Nombre del inquilino:",-1)),c("span",Ra,v(m.housingPayment.tenancy_name),1)]),c("div",Ua,[c("span",Ma,v(m.housingPayment.tenancy_identity_document)+":",1),c("span",La,v(m.housingPayment.tenancy_document_number),1)]),c("div",Wa,[n[6]||(n[6]=c("span",{class:"font-medium"},"Teléfono:",-1)),c("span",Ka,v(m.housingPayment.tenancy_phone),1)]),c("div",Xa,[c("span",Ga,v(m.housingPayment.housing),1),c("span",Ja,"Habitación "+v(m.housingPayment.housing_room),1)]),c("p",Qa,v(e(L)(m.housingPayment.rental_start_date))+" hasta "+v(e(L)(m.housingPayment.rental_end_date)),1),c("div",Ya,[n[7]||(n[7]=c("span",{class:"font-medium"},"Pago:",-1)),c("span",Za,v(m.housingPayment.payment.toLocaleString(e(W).lang,{style:"currency",currency:"PEN"})),1)]),c("div",et,[n[9]||(n[9]=c("span",{class:"font-medium"},"Estado:",-1)),m.housingPayment.payment_date?(f(),q("div",at,[a(e(Ve),{size:33}),r(" "+v(e(L)(m.housingPayment.payment_date)),1)])):F("",!0),m.housingPayment.payment_date?F("",!0):(f(),q("div",tt,[a(e(Fe),{size:33}),n[8]||(n[8]=r(" Pendiente "))]))]),m.housingPayment.description?(f(),q("p",st,v(m.housingPayment.description),1)):F("",!0)]),c("picture",nt,[m.housingPayment.first_document_image_url?(f(),q("img",{key:0,src:m.housingPayment.first_document_image_url,alt:"documento",class:"rounded-lg mx-auto",style:ae({viewTransitionName:l.value?"":"img-1"}),onClick:n[0]||(n[0]=ee(S=>p(m.housingPayment.first_document_image_url,"img-1"),["stop"]))},null,12,lt)):(f(),q("section",ot,[a(e(ue),{class:"mx-auto text-slate-500",size:e(P)},null,8,["size"])]))]),c("picture",it,[m.housingPayment.second_document_image_url?(f(),q("img",{key:0,src:m.housingPayment.second_document_image_url,alt:"documento",class:"rounded-lg mx-auto",style:ae({viewTransitionName:l.value?"":"img-2"}),onClick:n[1]||(n[1]=ee(S=>p(m.housingPayment.second_document_image_url,"img-2"),["stop"]))},null,12,ut)):(f(),q("section",rt,[a(e(ue),{class:"mx-auto text-slate-500",size:e(P)},null,8,["size"])]))])]),a(e(wa),{class:"mt-4"},{default:t(()=>[a(e(He),{"as-child":""},{default:t(()=>[a(K,{variant:"outline",class:"max-w-lg w-full mx-auto dark:text-slate-200"},{default:t(()=>n[11]||(n[11]=[r(" Cerrar ")])),_:1})]),_:1})]),_:1})],2),l.value?(f(),q("picture",{key:0,class:"fixed top-0 left-0 w-screen h-screen flex items-center justify-center backdrop-blur-md z-50",onClick:ee(H,["stop"])},[c("img",{src:l.value,class:"max-h-[98vh] rounded-2xl mx-auto",alt:"documento",style:ae({viewTransitionName:b.value})},null,12,dt)])):F("",!0)]),_:1})]),_:1},8,["open"]))}});function ct(x){return ke(W.housing_payment,x)}const ft={class:"font-bold text-slate-300"},pt=A({__name:"DropdownHousingPaymentOptions",props:{housingPayment:{}},emits:["update:housing-payment-form"],setup(x,{emit:_}){const d=x,y=_;function P(){y("update:housing-payment-form",d.housingPayment)}const l=$(!1),b=$(!1),p=$(1),H=()=>{l.value=!0},m=g=>{l.value=g},n=g=>{b.value=!0,p.value=g},S=g=>{b.value=g},V=z(()=>({url:`${k.housing_payment}/${p.value===1?k.collect_and_payment:p.value===2?k.just_collect:k.cancel_collect}`,method:k.post})),{mutateAsync:X}=ct(V),I=z(()=>({id:d.housingPayment.id,housing_room_id:d.housingPayment.housing_room_id,tenancy_id:d.housingPayment.tenancy_id,payment:d.housingPayment.payment,rental_start_date:d.housingPayment.rental_start_date,rental_end_date:d.housingPayment.rental_end_date,description:d.housingPayment.description})),C=()=>Se(X(I.value),`${p.value===1?"Cobrando y agregando nuevo alquiler":p.value===2?"Cobrando":"Cancelando"}...`,()=>`Alquiler ${p.value===1?"cobrado y uno nuevo creado":p.value===2?"cobrado":"cancelado"} con éxito para ${d.housingPayment.tenancy_name}`,g=>typeof g=="object"?"Acción fallida":g);return(g,u)=>(f(),q(ne,null,[a(e(Te),null,{default:t(()=>[a(e(Be),{"as-child":""},{default:t(()=>[a(e(K),{variant:"ghost",class:"w-8 h-8 p-0"},{default:t(()=>[u[4]||(u[4]=c("span",{class:"sr-only"},"Abrir menu",-1)),a(e(Je),{class:"w-4 h-4"})]),_:1})]),_:1}),a(e(ze),{align:"end"},{default:t(()=>[a(e(Ae),null,{default:t(()=>u[5]||(u[5]=[r("Opciones")])),_:1}),g.housingPayment.payment_date?F("",!0):(f(),w(e(E),{key:0,class:"flex items-center gap-x-2 text-amber-700 dark:text-amber-500 py-2 cursor-pointer",onClick:u[0]||(u[0]=B=>n(1))},{default:t(()=>[a(e(Ta),{class:"w-5 h-5"}),u[6]||(u[6]=r(" Cobrar y agregar alquiler "))]),_:1})),g.housingPayment.payment_date?F("",!0):(f(),w(e(E),{key:1,class:"flex items-center gap-x-2 text-yellow-700 dark:text-yellow-500 py-2 cursor-pointer",onClick:u[1]||(u[1]=B=>n(2))},{default:t(()=>[a(e(Ea),{class:"w-5 h-5"}),u[7]||(u[7]=r(" Solo cobrar "))]),_:1})),g.housingPayment.payment_date?(f(),w(e(E),{key:2,class:"flex items-center gap-x-2 text-rose-700 dark:text-rose-500 py-2 cursor-pointer",onClick:u[2]||(u[2]=B=>n(3))},{default:t(()=>[a(e(Ia),{class:"w-5 h-5"}),u[8]||(u[8]=r(" Cancelar cobro "))]),_:1})):F("",!0),a(e(E),{onClick:ee(H,["stop"]),class:"flex items-center gap-x-2 py-2 cursor-pointer"},{default:t(()=>[a(e(ka),{class:"w-5 h-5"}),u[9]||(u[9]=r(" Ver "))]),_:1}),a(Qe,{class:"w-full"},{default:t(()=>[a(e(E),{onClick:P,class:"flex items-center gap-x-2 text-sky-700 dark:text-sky-500 py-2 cursor-pointer"},{default:t(()=>[a(e(Ye),{class:"w-5 h-5"}),u[10]||(u[10]=r(" Editar "))]),_:1})]),_:1}),a(e(E),{as:"a",class:"flex items-center gap-x-2 text-red-700 dark:text-red-500 py-2 cursor-pointer",href:e(Ie)(g.housingPayment.tenancy_phone)},{default:t(()=>[a(e(Sa),{class:"w-5 h-5"}),u[11]||(u[11]=r(" Llamar "))]),_:1},8,["href"]),a(e(E),{as:"a",class:"flex items-center gap-x-2 text-green-700 dark:text-green-500 py-2 cursor-pointer",href:e(Ee)(g.housingPayment.tenancy_phone,"?text=Buen%20día"),target:"_blank"},{default:t(()=>[a(e(Ca),{class:"w-5 h-5"}),u[12]||(u[12]=r(" Whatsapp "))]),_:1},8,["href"])]),_:1})]),_:1}),a(mt,{"is-drawer-open":l.value,"housing-payment":g.housingPayment,"onUpdate:drawerState":m},null,8,["is-drawer-open","housing-payment"]),a(e(oa),{open:b.value,"onUpdate:open":u[3]||(u[3]=B=>S(B))},{default:t(()=>[a(e(Ze),null,{default:t(()=>[a(e(ea),null,{default:t(()=>[a(e(aa),{class:"dark:text-slate-200"},{default:t(()=>[r(v(`¿Estás seguro que quieres ${p.value===1?"cobrar y agregar un nuevo alquiler":p.value===2?"solo cobrar el alquiler":"cancelar este cobro de alquiler"}`),1)]),_:1}),a(e(ta),null,{default:t(()=>[r(v(`Esta accion ${p.value===1?"cobrará y agregará un nuevo alquiler para":p.value===2?"solo cobrará el alquiler de":"cancelará este cobro de alquiler de"}`)+" ",1),c("span",ft,v(g.housingPayment.tenancy_name)+" - "+v(g.housingPayment.tenancy_identity_document)+": "+v(g.housingPayment.tenancy_document_number),1)]),_:1})]),_:1}),a(e(sa),null,{default:t(()=>[a(e(na),{class:"dark:text-slate-200"},{default:t(()=>u[13]||(u[13]=[r("Cancelar")])),_:1}),a(e(la),{onClick:C},{default:t(()=>u[14]||(u[14]=[r("Sí, ¡seguro!")])),_:1})]),_:1})]),_:1})]),_:1},8,["open"])],64))}});function _t(x,_){const d=()=>Oe(`${k.housing_payment}/${k.list_action}?page=${_.page}&limit=${_.limit}&searchInput=${_.searchParam}&startDate=${_.startDate}&finishDate=${_.finishDate}${_.paymentState==="rent_debtors"?"&rent_debtors=1":_.paymentState==="rent_payers"?"&rent_payers=1":""}`),{data:y,...P}=je(x,d,_),l=z(()=>{var p;return((p=y.value)==null?void 0:p.data)??[]}),b=z(()=>{var p;return((p=y.value)==null?void 0:p.meta)??null});return{data:l,meta:b,...P}}const xe=A({__name:"Popover",props:{defaultOpen:{type:Boolean},open:{type:Boolean},modal:{type:Boolean}},emits:["update:open"],setup(x,{emit:_}){const P=Ce(x,_);return(l,b)=>(f(),w(e(Ne),De(qe(e(P))),{default:t(()=>[ie(l.$slots,"default")]),_:3},16))}}),we=A({inheritAttrs:!1,__name:"PopoverContent",props:{forceMount:{type:Boolean},trapFocus:{type:Boolean},side:{},sideOffset:{default:4},align:{default:"center"},alignOffset:{},avoidCollisions:{type:Boolean},collisionBoundary:{},collisionPadding:{},arrowPadding:{},sticky:{},hideWhenDetached:{type:Boolean},updatePositionStrategy:{},prioritizePosition:{type:Boolean},asChild:{type:Boolean},as:{},disableOutsidePointerEvents:{type:Boolean},class:{}},emits:["escapeKeyDown","pointerDownOutside","focusOutside","interactOutside","openAutoFocus","closeAutoFocus"],setup(x,{emit:_}){const d=x,y=_,P=z(()=>{const{class:b,...p}=d;return p}),l=Ce(P,y);return(b,p)=>(f(),w(e(Ue),null,{default:t(()=>[a(e(Re),M({...e(l),...b.$attrs},{class:e(J)("z-50 w-72 rounded-md border border-slate-200 bg-white p-4 text-slate-950 shadow-md outline-none data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 dark:border-slate-800 dark:bg-slate-950 dark:text-slate-50",d.class)}),{default:t(()=>[ie(b.$slots,"default")]),_:3},16,["class"])]),_:3}))}}),$e=A({__name:"PopoverTrigger",props:{asChild:{type:Boolean},as:{}},setup(x){const _=x;return(d,y)=>(f(),w(e(Me),De(qe(_)),{default:t(()=>[ie(d.$slots,"default")]),_:3},16))}});function gt(x){return ke(W.housing_payment,x)}const yt={class:"flex flex-col sm:grid grid-cols-2 gap-x-2 gap-y-1 overflow-y-auto max-h-[71vh] p-1"},ht=A({__name:"HousingPaymentModal",props:{form:{}},emits:["reset"],setup(x,{emit:_}){const d=x,y=_,P=z(()=>!!d.form.values.id),l=z(()=>({url:`${k.housing_payment}/${P.value?k.update_action:k.store_action}`,method:P.value?k.put:k.post})),{isPending:b,mutateAsync:p}=gt(l),H=d.form.handleSubmit(D=>Se(p(D),`${P.value?"Editando":"Agregando"}...`,()=>(G(),`Alquiler ${P.value?"actualizado":"agregado"} con éxito`),s=>typeof s=="object"?(d.form.setErrors(s),"Acción fallida"):s)),m=$(!1),n=$(""),S=$(1),V=le({page:1,limit:20,searchParam:"",startDate:"",finishDate:""}),{data:X}=Da("",V),I=$(!1),C=$(""),g=$(1),u=le({page:1,limit:20,searchParam:"",active:1}),{data:B}=Aa("",u);function G(){y("reset"),Y(!1)}function Y(D){D?(V.searchParam=d.form.values.tenancy_name,n.value=d.form.values.tenancy_name,u.searchParam=d.form.values.housing_room,C.value=`${d.form.values.housing_room} - ${d.form.values.housing}`):(V.searchParam="",n.value="",u.searchParam="",C.value="",S.value++,g.value++)}return oe(P,D=>{Y(D)}),(D,s)=>(f(),w(e(ma),{class:"sm:max-w-[600px] text-slate-800 dark:dark:text-slate-200"},{default:t(()=>[a(e(ia),null,{default:t(()=>[a(e(ua),null,{default:t(()=>[r(v(P.value?"Editar":"Agregar")+" alquiler",1)]),_:1}),a(e(ra),null,{default:t(()=>[r(" Haz los cambios del alquiler aquí. Click "+v(P.value?"Editar":"Agregar")+" cuando termines. ",1)]),_:1})]),_:1}),c("form",{onSubmit:s[8]||(s[8]=(...i)=>e(H)&&e(H)(...i)),"keep-values":""},[c("section",yt,[a(e(T),{name:"tenancy_id"},{default:t(({componentField:i})=>[a(e(j),null,{default:t(()=>[a(e(O),null,{default:t(()=>s[9]||(s[9]=[r("Inquilino")])),_:1}),a(e(xe),{open:m.value,"onUpdate:open":s[3]||(s[3]=o=>m.value=o)},{default:t(()=>[a(e($e),{"as-child":""},{default:t(()=>[a(e(N),null,{default:t(()=>[a(e(K),{type:"button",variant:"outline",role:"combobox",class:U(e(J)("w-full sm:w-64 justify-between",!i.modelValue&&"text-muted-foreground"))},{default:t(()=>[r(v(n.value||"Selecciona al inquilino...")+" ",1),a(e(he),{class:"ml-2 h-4 w-4 shrink-0 opacity-50"})]),_:2},1032,["class"])]),_:2},1024)]),_:2},1024),a(e(we),{class:"w-[370px] sm:w-64 p-0"},{default:t(()=>[(f(),w(e(re),{key:S.value,modelValue:n.value,"onUpdate:modelValue":s[2]||(s[2]=o=>n.value=o),class:"p-0"},{default:t(()=>[a(e(de),{class:"w-full px-4 py-2",placeholder:"Busca al inquilino...",onInput:s[0]||(s[0]=o=>V.searchParam=o.target.value)}),n.value.length>0||V.searchParam.length>0?(f(),w(e(ve),{key:0,class:"absolute right-5 top-3",size:20,onClick:s[1]||(s[1]=()=>{V.searchParam="",n.value="",S.value++})})):F("",!0),a(e(me),null,{default:t(()=>s[10]||(s[10]=[r("Sin resultados.")])),_:1}),a(e(ce),null,{default:t(()=>[a(e(fe),null,{default:t(()=>[(f(!0),q(ne,null,pe(e(X),o=>(f(),w(e(_e),{key:o.id,value:o.name,onSelect:()=>{d.form.setFieldValue("tenancy_id",o.id),n.value=o.name,m.value=!1}},{default:t(()=>[r(v(o.name)+" ",1),a(e(Pe),{class:U(e(J)("ml-auto h-4 w-4",d.form.values.tenancy_id==o.id?"opacity-100":"opacity-0"))},null,8,["class"])]),_:2},1032,["value","onSelect"]))),128))]),_:1})]),_:1})]),_:1},8,["modelValue"]))]),_:1})]),_:2},1032,["open"]),a(e(R))]),_:2},1024)]),_:1}),a(e(T),{name:"housing_room_id"},{default:t(({componentField:i})=>[a(e(j),null,{default:t(()=>[a(e(O),null,{default:t(()=>s[11]||(s[11]=[r("Habitación")])),_:1}),a(e(xe),{open:I.value,"onUpdate:open":s[7]||(s[7]=o=>I.value=o)},{default:t(()=>[a(e($e),{"as-child":""},{default:t(()=>[a(e(N),null,{default:t(()=>[a(e(K),{type:"button",variant:"outline",role:"combobox",class:U(e(J)("w-full sm:w-64 justify-between",!i.modelValue&&"text-muted-foreground"))},{default:t(()=>[r(v(C.value||"Selecciona la habitación...")+" ",1),a(e(he),{class:"ml-2 h-4 w-4 shrink-0 opacity-50"})]),_:2},1032,["class"])]),_:2},1024)]),_:2},1024),a(e(we),{class:"w-[370px] sm:w-64 p-0"},{default:t(()=>[(f(),w(e(re),{key:g.value,modelValue:C.value,"onUpdate:modelValue":s[6]||(s[6]=o=>C.value=o),class:"p-0"},{default:t(()=>[a(e(de),{class:"w-full px-4 py-2",placeholder:"Busca al inquilino...",onInput:s[4]||(s[4]=o=>u.searchParam=o.target.value)}),C.value.length>0||u.searchParam.length>0?(f(),w(e(ve),{key:0,class:"absolute right-5 top-3",size:20,onClick:s[5]||(s[5]=()=>{u.searchParam="",C.value="",g.value++})})):F("",!0),a(e(me),null,{default:t(()=>s[12]||(s[12]=[r("Sin resultados.")])),_:1}),a(e(ce),null,{default:t(()=>[a(e(fe),null,{default:t(()=>[(f(!0),q(ne,null,pe(e(B).filter(o=>o.is_available||o.id==D.form.values.housing_room_id),o=>(f(),w(e(_e),{key:o.id,value:`${o.room_number} - ${o.housing}`,onSelect:()=>{d.form.setFieldValue("housing_room_id",o.id),C.value=`${o.room_number} - ${o.housing}`,I.value=!1}},{default:t(()=>[r(v(`${o.room_number} - ${o.housing}`)+" ",1),a(e(Pe),{class:U(e(J)("ml-auto h-4 w-4",d.form.values.housing_room_id==o.id?"opacity-100":"opacity-0"))},null,8,["class"])]),_:2},1032,["value","onSelect"]))),128))]),_:1})]),_:1})]),_:1},8,["modelValue"]))]),_:1})]),_:2},1032,["open"]),a(e(R))]),_:2},1024)]),_:1}),a(e(T),{name:"rental_start_date"},{default:t(({componentField:i})=>[a(e(j),null,{default:t(()=>[a(e(O),null,{default:t(()=>s[13]||(s[13]=[r("Fecha de ingreso")])),_:1}),a(e(N),null,{default:t(()=>[a(e(Z),M({type:"datetime-local"},i,{autocomplete:"off",class:"block"}),null,16)]),_:2},1024),a(e(R))]),_:2},1024)]),_:1}),a(e(T),{name:"rental_end_date"},{default:t(({componentField:i})=>[a(e(j),null,{default:t(()=>[a(e(O),null,{default:t(()=>s[14]||(s[14]=[r("Fecha de culminación")])),_:1}),a(e(N),null,{default:t(()=>[a(e(Z),M({type:"datetime-local"},i,{autocomplete:"off",class:"block"}),null,16)]),_:2},1024),a(e(R))]),_:2},1024)]),_:1}),a(e(T),{name:"payment"},{default:t(({componentField:i})=>[a(e(j),{class:U(!D.form.values.payment_date&&"col-span-full")},{default:t(()=>[a(e(O),null,{default:t(()=>s[15]||(s[15]=[r("Pago")])),_:1}),a(e(N),null,{default:t(()=>[a(e(Z),M({type:"number",step:"0.01"},i,{autocomplete:"off"}),null,16)]),_:2},1024),a(e(R))]),_:2},1032,["class"])]),_:1}),a(e(T),{name:"payment_date"},{default:t(({componentField:i})=>[a(e(j),{class:U(!D.form.values.payment_date&&"hidden")},{default:t(()=>[a(e(O),null,{default:t(()=>s[16]||(s[16]=[r("Fecha de pago")])),_:1}),a(e(N),null,{default:t(()=>[a(e(Z),M({type:"datetime-local"},i,{autocomplete:"off",class:"block"}),null,16)]),_:2},1024),a(e(R))]),_:2},1032,["class"])]),_:1}),a(e(T),{name:"description"},{default:t(({componentField:i})=>[a(e(j),{class:"col-span-2"},{default:t(()=>[a(e(O),null,{default:t(()=>s[17]||(s[17]=[r("Descripción (opcional)")])),_:1}),a(e(N),null,{default:t(()=>[a(e(qa),M({placeholder:"Una descripción acerca del alquiler",rows:"5",class:"resize-none"},i),null,16)]),_:2},1024),a(e(R))]),_:2},1024)]),_:1})]),a(e(da),null,{default:t(()=>[a(e(K),{type:"submit",class:"w-full mt-3 p-1",disabled:e(b)},{default:t(()=>[r(v(P.value?"Editar":"Agregar"),1)]),_:1},8,["disabled"])]),_:1})],32)]),_:1}))}}),vt=A({__name:"HousingPaymentContainer",setup(x){const _=Le(),d={start:void 0,end:void 0},y=$(d),P=z(()=>window.innerWidth<768?{id:!1,tenancy_name:!1,payment:!1,description:!1,tenancy_document_number:!1}:{id:!1,tenancy_name:!0,payment:!0,description:!1,tenancy_document_number:!1}),l=le({page:1,limit:window.innerWidth<768?5:10,searchParam:_.query.customer||"",startDate:"",finishDate:"",paymentState:"all"}),{isFetching:b,data:p,meta:H}=_t(W.housing_payment,l),m={id:void 0,housing_room_id:void 0,tenancy_id:void 0,payment:0,rental_start_date:"",rental_end_date:"",payment_date:"",description:""},n=ya(),S=ha(),V=()=>{S.setValues(m)},X=s=>{S.setValues(s)},I=s=>{l.page=s.length>2?1:l.page,l.searchParam=s},C=s=>{l.page=s},g=s=>{l.page=1,l.limit=s},u=s=>{y.value=s};oe(y,s=>{if(!s||!s.start||!s.end){l.startDate="",l.finishDate="";return}l.startDate=ye(s.start),l.finishDate=ye(s.end,"end")}),oe(()=>_.query,s=>{l.searchParam=s.customer});const B=$(0),G=$(!1),Y=()=>{G.value=!1},D=[n.display({id:"select",header:({table:s})=>h(be,{checked:s.getIsAllPageRowsSelected()||s.getIsSomePageRowsSelected()&&"indeterminate","onUpdate:checked":i=>s.toggleAllPageRowsSelected(!!i),ariaLabel:"Select all",class:"mr-2"}),cell:({row:s})=>h(be,{checked:s.getIsSelected(),"onUpdate:checked":i=>s.toggleSelected(!!i),ariaLabel:"Select row"}),enableHiding:!1}),n.accessor("id",{header:"ID",cell:s=>h("span",s.getValue()??"")}),n.accessor("tenancy_name",{header:"Inquilino",cell:s=>h("div",{class:"capitalize min-w-20"},s.getValue())}),n.accessor("tenancy_document_number",{header:"N° de documento",cell:({row:s})=>{const i=s.getValue("tenancy_document_number"),o=s.original.tenancy_identity_document;return h("div",{class:"flex flex-col text-nowrap"},[o,h("span",{class:"font-bold text-slate-500"},i)])}}),n.accessor("housing_room",{header:"N° de habitación",cell:({row:s})=>{const i=s.getValue("housing_room"),o=s.original.housing;return h("div",{class:"flex flex-col text-nowrap"},[i,h("span",{class:"font-bold text-slate-500"},o)])}}),n.accessor("payment",{header:"Pago",cell:s=>h("div",s.getValue().toLocaleString(W.lang,{style:"currency",currency:"PEN"}))}),n.accessor("rental_start_date",{header:"Fecha de ingreso",cell:s=>{const i=te(s.getValue()),o=L(s.getValue());return h("div",{class:"min-w-28 flex flex-col"},[o,h("span",{class:"font-bold text-slate-500 text-sm"},i)])}}),n.accessor("rental_end_date",{header:"Fecha de culminación",cell:s=>{const i=te(s.getValue()),o=L(s.getValue());return h("div",{class:"min-w-28 flex flex-col"},[o,h("span",{class:"font-bold text-slate-500 text-sm"},i)])}}),n.accessor("payment_date",{header:"Fecha de pago",cell:s=>{if(s.getValue()){const i=te(s.getValue()),o=L(s.getValue());return h("div",{class:"min-w-36 flex flex-col"},[o,h("div",{class:"flex items-center gap-1"},[h(Ve,{class:"text-green-500"}),h("span",{class:"font-bold text-green-500 text-sm"},i)])])}return h("div",{class:"flex items-center gap-1"},[h(Fe,{class:"text-blue-500"}),h("span",{class:"font-bold text-blue-500 text-sm"},"Pendiente")])}}),n.accessor("description",{header:"Descripción",cell:s=>h("div",{class:"max-w-60 truncate"},s.getValue())}),n.display({id:"actions",cell:({row:s})=>{const i=s.original;return h("div",{class:"relative"},h(pt,{housingPayment:i,"onUpdate:housingPaymentForm":X}))},enableHiding:!1})];return(s,i)=>(f(),w(e(ga),{open:G.value,"onUpdate:open":i[1]||(i[1]=o=>G.value=o)},{default:t(()=>[a(ca,{icon:e(We),title:"Gestión de alquileres",isFetching:e(b),"onReset:initialForm":V},null,8,["icon","isFetching"]),a(ht,{form:e(S),onReset:Y},null,8,["form"]),a(e(Va),{class:"flex flex-col sm:flex-row justify-center gap-y-2 mt-3 shadow-sm dark:bg-slate-900 py-2"},{default:t(()=>[a(e(Fa),null,{default:t(()=>[a(e(Ha),{"as-child":""},{default:t(()=>[a(K,{variant:"outline",size:"lg",class:"dark:text-slate-200"},{default:t(()=>i[2]||(i[2]=[r("Fecha de alquiler")])),_:1})]),_:1}),a(e(Ba),{"as-child":""},{default:t(()=>[a(za,{dates:y.value,"onUpdate:dates":u,"max-value":e(Ke)(e(Xe)()).add({years:1})},null,8,["dates","max-value"])]),_:1})]),_:1}),a(e(Ge),{type:"single",class:"dark:text-slate-200","model-value":l.paymentState,"onUpdate:modelValue":i[0]||(i[0]=o=>l.paymentState=o)},{default:t(()=>[a(e(se),{value:"all","aria-label":"Toggle bold"},{default:t(()=>i[3]||(i[3]=[r(" Todos ")])),_:1}),a(e(se),{value:"rent_debtors"},{default:t(()=>i[4]||(i[4]=[r(" Pendientes ")])),_:1}),a(e(se),{value:"rent_payers"},{default:t(()=>i[5]||(i[5]=[r(" Cobrados ")])),_:1})]),_:1},8,["model-value"])]),_:1}),a(fa,{render:!!y.value.start&&!!y.value.end||!!l.searchParam||!!l.paymentState&&l.paymentState!=="all",filters:[{render:!!l.searchParam,tag:"Búsqueda",name:l.searchParam,handleClick:()=>{B.value+=1,l.searchParam="",l.page=1}},{render:!!y.value.start&&!!y.value.end,tag:"Fechas",name:`Desde ${e(ge)(y.value.start)} hasta ${e(ge)(y.value.end)}`,handleClick:()=>{y.value=d,l.page=1}},{render:!!l.paymentState&&l.paymentState!=="all",tag:"Estado de pago",name:l.paymentState==="rent_debtors"?"Pendientes":l.paymentState==="rent_payers"?"Cancelados":"",handleClick:()=>{l.paymentState="all",l.page=1}}]},null,8,["render","filters"]),a(pa,{data:e(p),columns:D,"default-visible-columns":P.value,"delete-name":e(W).housing_payment,"delete-url":`${e(k).housing_payment}/${e(k).destroy_action}`,"title-dialog":"¿Estás seguro que quieres eliminar los alquileres seleccionados?","description-dialog":"Esta acción no se podrá deshacer. Esto eliminará los alquileres seleccionados permanentemente.","on-search-input":I,"input-render":B.value},null,8,["data","default-visible-columns","delete-name","delete-url","input-render"]),e(H)?(f(),w(_a,{key:0,meta:e(H),"on-change-page":C,"on-change-limit":g},null,8,["meta"])):F("",!0)]),_:1},8,["open"]))}}),Dt=A({__name:"HousingPaymentView",setup(x){return(_,d)=>(f(),w(vt))}});export{Dt as default};
