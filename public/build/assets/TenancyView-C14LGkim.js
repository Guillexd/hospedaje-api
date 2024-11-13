import{d as z,h as S,o as f,i as q,w as t,j as a,u as e,m,n as se,k as c,v as k,a as x,q as L,Y as H,F as B,X as K,A as ne,B as le,C as oe,D as ie,E as j,G as re,H as ue,I as de,J as G,e as ce,N as O,L as W,f as T,s as me,Z as fe,M as _e,O as pe,P as ge,$ as ye,p as I,Q as ve,R as we,a0 as he,T as $,a1 as $e,U as xe,a2 as be,a3 as Q,a4 as X}from"./app-Cf09j8Ab.js";import{e as M,c as U,b as N,F as V,_ as C,a as P,d as F,u as ke}from"./Input.vue_vue_type_script_setup_true_lang-C_pB-Yai.js";import{E as De,_ as Te,S as Se,a as Ve,b as Ce,c as Pe,m as Fe,n as qe,o as Ne,p as ze,q as Ee,r as Ie,d as Ue,e as Ae,f as Y,g as je,h as Be,i as Le,j as Me,k as Re,l as He}from"./FilterBarPresentation.vue_vue_type_script_setup_true_lang-ChREqMRf.js";import{_ as Oe,a as We,b as Ge,c as Je,d as Ke,e as Qe}from"./DrawerTitle.vue_vue_type_script_setup_true_lang-DYpLqPoS.js";import{E as Xe}from"./eye-BZbtSrg0.js";import{P as Ye,M as Ze}from"./phone-outgoing-Cya5w2ye.js";import{_ as ea,u as aa,a as ta,b as sa,c as na,d as la,e as oa}from"./Textarea.vue_vue_type_script_setup_true_lang-DgTgMzMy.js";import{S as ia}from"./search-LcXkKvSL.js";const ra={class:"grid lg:grid-cols-[auto_1fr_auto] gap-3"},ua={class:"bg-white dark:bg-slate-300 shadow-lg rounded-lg p-4 max-w-xl w-full mx-auto lg:order-2"},da={class:"flex justify-between"},ca={class:"text-gray-700"},ma={class:"flex justify-between"},fa={class:"font-medium"},_a={class:"text-gray-700"},pa={class:"flex justify-between"},ga={class:"text-gray-700"},ya={key:0,class:"text-black whitespace-pre-wrap font-medium mt-5 text-justify"},va={class:"mx-auto w-full sm:w-[50vw] lg:w-[25vw] lg:order-1"},wa=["src"],ha={key:1,class:"animate-pulse"},$a={class:"mx-auto w-full sm:w-[50vw] lg:w-[25vw] lg:order-3"},xa=["src"],ba={key:1,class:"animate-pulse"},ka=["src"],Da=z({__name:"TenancyDetail",props:{isDrawerOpen:{type:Boolean},tenancy:{}},emits:["update:drawer-state"],setup(b,{emit:h}){const u=h;function y(s){u("update:drawer-state",s)}const o=window.innerWidth>1023&&window.innerWidth<1290?270:350,r=S(null),v=S("");function g(s,i){v.value=i,document.startViewTransition?document.startViewTransition(()=>{r.value=s}):r.value=s}function _(){document.startViewTransition?document.startViewTransition(()=>{r.value=null,v.value=""}):(r.value=null,v.value="")}return(s,i)=>(f(),q(e(Qe),{open:s.isDrawerOpen,"onUpdate:open":i[2]||(i[2]=D=>y(D))},{default:t(()=>[a(e(Oe),null,{default:t(()=>[m("div",{class:se(`p-4 overflow-y-auto ${r.value?"h-[97vh]":"max-h-[80vh] sm:max-h-[90vh]"}`)},[a(e(We),{class:"max-w-lg mx-auto"},{default:t(()=>[a(e(Ge),{class:"text-xl font-semibold dark:text-slate-200"},{default:t(()=>i[3]||(i[3]=[c("Detalles del inquilino")])),_:1}),a(e(Je),{class:"text-gray-500"},{default:t(()=>i[4]||(i[4]=[c(" Aquí puedes ver los detalles de este inquilino. ")])),_:1})]),_:1}),m("main",ra,[m("section",ua,[i[7]||(i[7]=m("h3",{class:"text-lg font-bold"},"Información Personal",-1)),m("div",da,[i[5]||(i[5]=m("span",{class:"font-medium"},"Nombre:",-1)),m("span",ca,k(s.tenancy.name),1)]),m("div",ma,[m("span",fa,k(s.tenancy.document_type)+":",1),m("span",_a,k(s.tenancy.document_number),1)]),m("div",pa,[i[6]||(i[6]=m("span",{class:"font-medium"},"Teléfono:",-1)),m("span",ga,k(s.tenancy.phone),1)]),s.tenancy.description?(f(),x("p",ya,k(s.tenancy.description),1)):L("",!0)]),m("picture",va,[s.tenancy.first_document_image_url?(f(),x("img",{key:0,src:s.tenancy.first_document_image_url,alt:"documento",class:"rounded-lg mx-auto",style:H({viewTransitionName:r.value?"":"img-1"}),onClick:i[0]||(i[0]=B(D=>g(s.tenancy.first_document_image_url,"img-1"),["stop"]))},null,12,wa)):(f(),x("section",ha,[a(e(K),{class:"mx-auto text-slate-500",size:e(o)},null,8,["size"])]))]),m("picture",$a,[s.tenancy.second_document_image_url?(f(),x("img",{key:0,src:s.tenancy.second_document_image_url,alt:"documento",class:"rounded-lg mx-auto",style:H({viewTransitionName:r.value?"":"img-2"}),onClick:i[1]||(i[1]=B(D=>g(s.tenancy.second_document_image_url,"img-2"),["stop"]))},null,12,xa)):(f(),x("section",ba,[a(e(K),{class:"mx-auto text-slate-500",size:e(o)},null,8,["size"])]))])]),a(e(Ke),{class:"mt-4"},{default:t(()=>[a(e(ne),{"as-child":""},{default:t(()=>[a(M,{variant:"outline",class:"max-w-lg w-full mx-auto dark:text-slate-200"},{default:t(()=>i[8]||(i[8]=[c(" Cerrar ")])),_:1})]),_:1})]),_:1})],2),r.value?(f(),x("picture",{key:0,class:"fixed top-0 left-0 w-screen h-screen flex items-center justify-center backdrop-blur-md z-50",onClick:B(_,["stop"])},[m("img",{src:r.value,class:"max-h-[98vh] rounded-2xl mx-auto",alt:"documento",style:H({viewTransitionName:v.value})},null,12,ka)])):L("",!0)]),_:1})]),_:1},8,["open"]))}}),Ta=z({__name:"DropdownTenancyOptions",props:{tenancy:{}},emits:["update:tenancy-form"],setup(b,{emit:h}){const u=b,y=h;function o(){y("update:tenancy-form",u.tenancy)}const r=S(!1),v=()=>{r.value=!0},g=_=>{r.value=_};return(_,s)=>(f(),x(G,null,[a(e(de),null,{default:t(()=>[a(e(le),{"as-child":""},{default:t(()=>[a(e(M),{variant:"ghost",class:"w-8 h-8 p-0"},{default:t(()=>[s[0]||(s[0]=m("span",{class:"sr-only"},"Abrir menu",-1)),a(e(De),{class:"w-4 h-4"})]),_:1})]),_:1}),a(e(oe),{align:"end"},{default:t(()=>[a(e(ie),null,{default:t(()=>s[1]||(s[1]=[c("Opciones")])),_:1}),a(e(j),{onClick:B(v,["stop"]),class:"flex items-center gap-x-2 py-2 cursor-pointer"},{default:t(()=>[a(e(Xe),{class:"w-5 h-5"}),s[2]||(s[2]=c(" Ver "))]),_:1}),a(Te,{class:"w-full"},{default:t(()=>[a(e(j),{onClick:o,class:"flex items-center gap-x-2 text-sky-800 py-2 cursor-pointer"},{default:t(()=>[a(e(Se),{class:"w-5 h-5"}),s[3]||(s[3]=c(" Editar "))]),_:1})]),_:1}),a(e(j),{as:"a",class:"flex items-center gap-x-2 text-red-700 py-2 cursor-pointer",href:e(re)(_.tenancy.phone)},{default:t(()=>[a(e(Ye),{class:"w-5 h-5"}),s[4]||(s[4]=c(" Llamar "))]),_:1},8,["href"]),a(e(j),{as:"a",class:"flex items-center gap-x-2 text-green-800 py-2 cursor-pointer",href:e(ue)(_.tenancy.phone,"?text=Buen%20día"),target:"_blank"},{default:t(()=>[a(e(Ze),{class:"w-5 h-5"}),s[5]||(s[5]=c(" Whatsapp "))]),_:1},8,["href"])]),_:1})]),_:1}),a(Da,{"is-drawer-open":r.value,tenancy:_.tenancy,"onUpdate:drawerState":g},null,8,["is-drawer-open","tenancy"])],64))}});function Sa(b){return ce(O.tenancy,b,{"Content-Type":"multipart/form-data"})}const Va=["src"],Z=z({__name:"FileUpload",emits:["update:modelValue"],setup(b,{emit:h}){const u=h,y=S(void 0),o=r=>{var _;const g=(_=r.target.files)==null?void 0:_[0];if(g){const s=new FileReader;s.onload=()=>{y.value=s.result},s.readAsDataURL(g)}else y.value=void 0;u("update:modelValue",g)};return(r,v)=>(f(),x(G,null,[a(N,null,{default:t(()=>[a(U,{type:"file",accept:"image/*",class:"bg-slate-200 dark:bg-slate-700",onChange:o})]),_:1}),y.value?(f(),x("img",{key:0,src:y.value,alt:"Imagen",class:"mx-auto rounded-lg"},null,8,Va)):L("",!0)],64))}}),Ca={class:"flex flex-col sm:grid grid-cols-2 gap-x-2 gap-y-1 overflow-y-auto max-h-[71vh] p-1"},Pa={key:0,class:"relative transition-all ease-in-out"},Fa=z({__name:"TenancyModal",props:{form:{}},emits:["reset"],setup(b,{emit:h}){const u=b,y=h;function o(){y("reset")}const r=W(()=>!!u.form.values.id),v=W(()=>({url:`${T.tenancy}/${r.value?T.update_action:T.store_action}`,method:T.post})),{isPending:g,mutateAsync:_}=Sa(v),s=u.form.handleSubmit(w=>me(_(w),`${r.value?"Editando":"Agregando"}...`,()=>(o(),`Inquilino ${r.value?"actualizado":"agregado"} con éxito`),l=>typeof l=="object"?(u.form.setErrors(l),"Acción fallida"):l)),i=()=>{ve(u.form.values.document_number??1,w=>{u.form.setValues({name:w})},(w,l,d)=>{u.form.setValues({name:`${w} ${l} ${d}`})})},D=S([]);return fe(async()=>{D.value=(await _e(`${T.identity_document}/${T.get_all}`)).data}),(w,l)=>(f(),q(e(Ae),{class:"sm:max-w-[600px] text-slate-800 dark:dark:text-slate-200"},{default:t(()=>[a(e(Ve),null,{default:t(()=>[a(e(Ce),null,{default:t(()=>[c(k(r.value?"Editar":"Agregar")+" inquilino",1)]),_:1}),a(e(Pe),null,{default:t(()=>[c(" Haz los cambios del inquilino aquí. Click "+k(r.value?"Editar":"Agregar")+" cuando termines. ",1)]),_:1})]),_:1}),m("form",{onSubmit:l[2]||(l[2]=(...d)=>e(s)&&e(s)(...d)),"keep-values":""},[m("section",Ca,[a(e(V),{name:"identity_document_id"},{default:t(({componentField:d})=>[a(e(C),null,{default:t(()=>[a(e(P),null,{default:t(()=>l[3]||(l[3]=[c("Tipo de documento")])),_:1}),a(e(Fe),pe(ge(d)),{default:t(()=>[a(e(N),null,{default:t(()=>[a(e(qe),null,{default:t(()=>[a(e(Ne),{placeholder:"Selecciona el tipo de documento"})]),_:1})]),_:1}),a(e(ze),null,{default:t(()=>[a(e(Ee),null,{default:t(()=>[(f(!0),x(G,null,ye(D.value,A=>(f(),q(e(Ie),{value:A.id.toString()},{default:t(()=>[c(k(A.abbreviation),1)]),_:2},1032,["value"]))),256))]),_:1})]),_:1})]),_:2},1040),a(e(F))]),_:2},1024)]),_:1}),a(e(V),{name:"document_number"},{default:t(({componentField:d})=>[a(e(C),null,{default:t(()=>[a(e(P),null,{default:t(()=>l[4]||(l[4]=[c("Número de documento")])),_:1}),a(e(N),null,{default:t(()=>[w.form.values.identity_document_id&&["1","2"].includes(w.form.values.identity_document_id.toString())?(f(),x("div",Pa,[a(e(ia),{class:"absolute left-1 bottom-1 hover:scale-110 cursor-pointer text-green-500",size:30,onClick:i}),a(e(U),I({type:"number",class:"pl-11"},d,{autocomplete:"off"}),null,16)])):(f(),q(e(U),I({key:1,type:"number"},d,{autocomplete:"off"}),null,16))]),_:2},1024),a(e(F))]),_:2},1024)]),_:1}),a(e(V),{name:"name"},{default:t(({componentField:d})=>[a(e(C),null,{default:t(()=>[a(e(P),null,{default:t(()=>l[5]||(l[5]=[c("Nombre")])),_:1}),a(e(N),null,{default:t(()=>[a(e(U),I(d,{autocomplete:"off"}),null,16)]),_:2},1024),a(e(F))]),_:2},1024)]),_:1}),a(e(V),{name:"phone"},{default:t(({componentField:d})=>[a(e(C),null,{default:t(()=>[a(e(P),null,{default:t(()=>l[6]||(l[6]=[c("Teléfono")])),_:1}),a(e(N),null,{default:t(()=>[a(e(U),I({type:"number"},d,{autocomplete:"off"}),null,16)]),_:2},1024),a(e(F))]),_:2},1024)]),_:1}),a(e(V),{name:"first_document_image_url"},{default:t(()=>[a(e(C),null,{default:t(()=>[a(e(P),null,{default:t(()=>l[7]||(l[7]=[c("1° imagen del documento")])),_:1}),a(Z,{"onUpdate:modelValue":l[0]||(l[0]=d=>w.form.setValues({first_document_image_url:d}))}),a(e(F))]),_:1})]),_:1}),a(e(V),{name:"second_document_image_url"},{default:t(()=>[a(e(C),null,{default:t(()=>[a(e(P),null,{default:t(()=>l[8]||(l[8]=[c("2° imagen del documento")])),_:1}),a(Z,{"onUpdate:modelValue":l[1]||(l[1]=d=>w.form.setValues({second_document_image_url:d}))}),a(e(F))]),_:1})]),_:1}),a(e(V),{name:"description"},{default:t(({componentField:d})=>[a(e(C),{class:"col-span-2"},{default:t(()=>[a(e(P),null,{default:t(()=>l[9]||(l[9]=[c("Descripción (opcional)")])),_:1}),a(e(N),null,{default:t(()=>[a(e(ea),I({placeholder:"Una descripción acerca del inquilino",rows:"5",class:"resize-none"},d),null,16)]),_:2},1024),a(e(F))]),_:2},1024)]),_:1})]),a(e(Ue),null,{default:t(()=>[a(e(M),{type:"submit",class:"w-full mt-3 p-1",disabled:e(g)},{default:t(()=>[c(k(r.value?"Editar":"Agregar"),1)]),_:1},8,["disabled"])]),_:1})],32)]),_:1}))}}),qa=z({__name:"TenancyContainer",setup(b){const h={start:void 0,end:void 0},u=S(h),y=W(()=>window.innerWidth<768?{id:!1,description:!1}:{id:!1,description:!0}),o=we({page:1,limit:window.innerWidth<768?5:10,searchParam:"",startDate:"",finishDate:""}),{isFetching:r,data:v,meta:g}=aa(O.tenancy,o),_={id:void 0,identity_document_id:void 0,document_number:void 0,name:"",first_document_image_url:void 0,second_document_image_url:void 0,description:"",phone:void 0},s=He(),i=ke(),D=()=>{i.setValues(_)},w=n=>{i.setValues(n)},l=n=>{o.page=n.length>2?1:o.page,o.searchParam=n},d=n=>{o.page=n},A=n=>{o.page=1,o.limit=n},ee=n=>{u.value=n};he(u,n=>{if(!n||!n.start||!n.end){o.startDate="",o.finishDate="";return}o.startDate=X(n.start),o.finishDate=X(n.end,"end")});const J=S(0),R=S(!1),ae=()=>{R.value=!1},te=[s.display({id:"select",header:({table:n})=>$(Y,{checked:n.getIsAllPageRowsSelected()||n.getIsSomePageRowsSelected()&&"indeterminate","onUpdate:checked":p=>n.toggleAllPageRowsSelected(!!p),ariaLabel:"Select all",class:"mr-2"}),cell:({row:n})=>$(Y,{checked:n.getIsSelected(),"onUpdate:checked":p=>n.toggleSelected(!!p),ariaLabel:"Select row"}),enableHiding:!1}),s.accessor("id",{header:"ID",cell:n=>$("span",n.getValue()??"")}),s.accessor("name",{header:"Nombre",cell:n=>$("div",{class:"capitalize min-w-28"},n.getValue())}),s.accessor("document_number",{header:"Número de documento",cell:({row:n})=>{const p=n.getValue("document_number"),E=n.original.document_type;return $("div",{class:"flex flex-col text-nowrap"},[E,$("span",{class:"font-bold text-slate-500"},p)])}}),s.accessor("description",{header:"Descripción",cell:n=>$("div",{class:"max-w-60 truncate"},n.getValue())}),s.accessor("created_at",{header:"Fecha de registro",cell:n=>{const p=$e(n.getValue()),E=xe(n.getValue());return $("div",{class:"min-w-28 flex flex-col"},[E,$("span",{class:"font-bold text-slate-500 text-sm"},p)])}}),s.display({id:"actions",cell:({row:n})=>{const p=n.original;return $("div",{class:"relative"},$(Ta,{tenancy:p,"onUpdate:tenancyForm":w}))},enableHiding:!1})];return(n,p)=>(f(),q(e(Re),{open:R.value,"onUpdate:open":p[0]||(p[0]=E=>R.value=E)},{default:t(()=>[a(je,{icon:e(be),title:"Gestión de inquilinos",isFetching:e(r),"onReset:initialForm":D},null,8,["icon","isFetching"]),a(Fa,{form:e(i),onReset:ae},null,8,["form"]),a(e(ta),{class:"md:w-1/3 mx-auto flex justify-center mt-3 shadow-sm p-7 dark:bg-slate-900 h-9"},{default:t(()=>[a(e(sa),null,{default:t(()=>[a(e(na),{"as-child":""},{default:t(()=>[a(M,{variant:"outline",size:"lg",class:"dark:text-slate-200"},{default:t(()=>p[1]||(p[1]=[c("Fecha de registro")])),_:1})]),_:1}),a(e(la),{"as-child":""},{default:t(()=>[a(oa,{dates:u.value,"onUpdate:dates":ee},null,8,["dates"])]),_:1})]),_:1})]),_:1}),a(Be,{render:!!u.value.start&&!!u.value.end||!!o.searchParam,filters:[{render:!!o.searchParam,tag:"Búsqueda",name:o.searchParam,handleClick:()=>{J.value+=1,o.searchParam="",o.page=1}},{render:!!u.value.start&&!!u.value.end,tag:"Fechas",name:`Desde ${e(Q)(u.value.start)} hasta ${e(Q)(u.value.end)}`,handleClick:()=>{u.value=h,o.page=1}}]},null,8,["render","filters"]),a(Le,{data:e(v),columns:te,"default-visible-columns":y.value,"delete-name":e(O).tenancy,"delete-url":`${e(T).tenancy}/${e(T).destroy_action}`,"title-dialog":"¿Estás seguro que quieres eliminar a los inquilinos seleccionados?","description-dialog":"Esta acción no se podrá deshacer. Esto eliminará a los inquilinos seleccionados permanentemente.","on-search-input":l,"input-render":J.value},null,8,["data","default-visible-columns","delete-name","delete-url","input-render"]),e(g)?(f(),q(Me,{key:0,meta:e(g),"on-change-page":d,"on-change-limit":A},null,8,["meta"])):L("",!0)]),_:1},8,["open"]))}}),La=z({__name:"TenancyView",setup(b){return(h,u)=>(f(),q(qa))}});export{La as default};
