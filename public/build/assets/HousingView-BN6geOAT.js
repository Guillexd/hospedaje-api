import{d as k,o as $,i as y,w as t,j as a,u as e,m as l,k as f,v as b,A as J,h as A,a as W,B as X,C as Q,D as Y,E as V,F as Z,I as ee,J as ae,K as se,L as P,M as te,f as h,e as ne,N as S,s as R,p as N,O as ie,$ as oe,a0 as v,a2 as le,q as re}from"./app-DLYm2e-R.js";import{e as F,F as B,_ as I,a as j,b as q,c as O,d as U,u as de}from"./Input.vue_vue_type_script_setup_true_lang-CLwfEvNT.js";import{E as ue,_ as ce,S as me,a as pe,b as fe,c as ge,e as _e,f as he,g as M,h as ve,i as $e,j as we,k as xe,l as ye,m as be}from"./FilterBarPresentation.vue_vue_type_script_setup_true_lang-Ctraf-Au.js";import{_ as ke,a as He,b as De,c as Se,d as Pe,e as Ee}from"./DrawerTitle.vue_vue_type_script_setup_true_lang-CaebGeXa.js";import{B as Ae,a as Fe}from"./badge-x-BeOz15Gp.js";import{E as Ce}from"./eye-DFJvpLqS.js";import{t as Ve,_ as Ne}from"./tableNames-CLc7PWVa.js";const Be={class:"mx-auto w-full max-w-lg p-4"},Ie={class:"mt-4 bg-white dark:bg-slate-300 shadow-lg rounded-lg p-4"},je={class:"mb-4"},qe={class:"flex justify-between"},Oe={class:"text-gray-700"},Ue={class:"flex justify-between"},Me={class:"text-gray-700"},Re={class:"flex justify-between"},ze={class:"text-gray-700 font-semibold flex gap-x-2"},Le=k({__name:"HousingDetail",props:{isDrawerOpen:{type:Boolean},housing:{}},emits:["update:drawer-state"],setup(g,{emit:i}){const d=i;function _(o){d("update:drawer-state",o)}return(o,s)=>($(),y(e(Ee),{open:o.isDrawerOpen,"onUpdate:open":s[0]||(s[0]=r=>_(r))},{default:t(()=>[a(e(ke),null,{default:t(()=>[l("div",Be,[a(e(He),null,{default:t(()=>[a(e(De),{class:"text-xl font-semibold dark:text-slate-200"},{default:t(()=>s[1]||(s[1]=[f("Detalles de la propiedad")])),_:1}),a(e(Se),{class:"text-gray-500"},{default:t(()=>s[2]||(s[2]=[f(" Aquí puedes ver los detalles de esta propiedad. ")])),_:1})]),_:1}),l("div",Ie,[l("div",je,[s[6]||(s[6]=l("h3",{class:"text-lg font-bold"},"Información detallada",-1)),l("div",qe,[s[3]||(s[3]=l("span",{class:"font-medium"},"Nombre:",-1)),l("span",Oe,b(o.housing.name),1)]),l("div",Ue,[s[4]||(s[4]=l("span",{class:"font-medium"},"Dirección:",-1)),l("span",Me,b(o.housing.direction),1)]),l("div",Re,[s[5]||(s[5]=l("span",{class:"font-medium"},"Estado:",-1)),l("span",ze,[f(b(o.housing.is_active?"Activo":"No activo")+" ",1),o.housing.is_active?($(),y(e(Ae),{key:0,class:"text-green-500"})):($(),y(e(Fe),{key:1,class:"text-red-700"}))])])])]),a(e(Pe),{class:"mt-4"},{default:t(()=>[a(e(J),{"as-child":""},{default:t(()=>[a(F,{variant:"outline",class:"w-full dark:text-slate-200"},{default:t(()=>s[7]||(s[7]=[f(" Cerrar ")])),_:1})]),_:1})]),_:1})])]),_:1})]),_:1},8,["open"]))}}),Ke=k({__name:"DropdownHousingOptions",props:{housing:{}},emits:["update:housing-form"],setup(g,{emit:i}){const d=g,_=i;function o(){_("update:housing-form",d.housing)}const s=A(!1),r=()=>{s.value=!0},u=w=>{s.value=w};return(w,c)=>($(),W(ae,null,[a(e(ee),null,{default:t(()=>[a(e(X),{"as-child":""},{default:t(()=>[a(e(F),{variant:"ghost",class:"w-8 h-8 p-0"},{default:t(()=>[c[0]||(c[0]=l("span",{class:"sr-only"},"Abrir menu",-1)),a(e(ue),{class:"w-4 h-4"})]),_:1})]),_:1}),a(e(Q),{align:"end"},{default:t(()=>[a(e(Y),null,{default:t(()=>c[1]||(c[1]=[f("Opciones")])),_:1}),a(e(V),{onClick:Z(r,["stop"]),class:"flex items-center gap-x-2 py-2 cursor-pointer"},{default:t(()=>[a(e(Ce),{class:"w-5 h-5"}),c[2]||(c[2]=f(" Ver "))]),_:1}),a(ce,{class:"w-full"},{default:t(()=>[a(e(V),{onClick:o,class:"flex items-center gap-x-2 text-sky-700 dark:text-sky-500 py-2 cursor-pointer"},{default:t(()=>[a(e(me),{class:"w-5 h-5"}),c[3]||(c[3]=f(" Editar "))]),_:1})]),_:1})]),_:1})]),_:1}),a(Le,{"is-drawer-open":s.value,housing:w.housing,"onUpdate:drawerState":u},null,8,["is-drawer-open","housing"])],64))}});function Te(g,i){const d=()=>te(`${h.housing}/${h.list_action}?page=${i.page}&limit=${i.limit}&searchInput=${i.searchParam}`),{data:_,...o}=se(g,d,i),s=P(()=>{var u;return((u=_.value)==null?void 0:u.data)??[]}),r=P(()=>{var u;return((u=_.value)==null?void 0:u.meta)??null});return{data:s,meta:r,...o}}function Ge(g){return ne(S.housing,g)}const Je={class:"flex flex-col sm:grid grid-cols-2 gap-x-2 gap-y-1 overflow-y-auto max-h-[71vh] p-1"},We=k({__name:"HousingModal",props:{form:{}},emits:["reset"],setup(g,{emit:i}){const d=g,_=i;function o(){_("reset")}const s=P(()=>!!d.form.values.id),r=P(()=>({url:`${h.housing}/${s.value?h.update_action:h.store_action}`,method:s.value?h.put:h.post})),{isPending:u,mutateAsync:w}=Ge(r),c=d.form.handleSubmit(H=>R(w(H),`${s.value?"Editando":"Agregando"}...`,()=>(o(),`Propiedad ${s.value?"actualizada":"agregada"} con éxito`),m=>typeof m=="object"?(d.form.setErrors(m),"Acción fallida"):m));return(H,m)=>($(),y(e(he),{class:"sm:max-w-[600px] text-slate-800 dark:dark:text-slate-200"},{default:t(()=>[a(e(pe),null,{default:t(()=>[a(e(fe),null,{default:t(()=>[f(b(s.value?"Editar":"Agregar")+" propiedad",1)]),_:1}),a(e(ge),null,{default:t(()=>[f(" Haz los cambios de la propiedad aquí. Click "+b(s.value?"Editar":"Agregar")+" cuando termines. ",1)]),_:1})]),_:1}),l("form",{onSubmit:m[0]||(m[0]=(...x)=>e(c)&&e(c)(...x)),"keep-values":""},[l("section",Je,[a(e(B),{name:"name"},{default:t(({componentField:x})=>[a(e(I),null,{default:t(()=>[a(e(j),null,{default:t(()=>m[1]||(m[1]=[f("Nombre")])),_:1}),a(e(q),null,{default:t(()=>[a(e(O),N(x,{autocomplete:"off"}),null,16)]),_:2},1024),a(e(U))]),_:2},1024)]),_:1}),a(e(B),{name:"direction"},{default:t(({componentField:x})=>[a(e(I),null,{default:t(()=>[a(e(j),null,{default:t(()=>m[2]||(m[2]=[f("Dirección")])),_:1}),a(e(q),null,{default:t(()=>[a(e(O),N(x,{autocomplete:"off"}),null,16)]),_:2},1024),a(e(U))]),_:2},1024)]),_:1})]),a(e(_e),null,{default:t(()=>[a(e(F),{type:"submit",class:"w-full mt-3 p-1",disabled:e(u)},{default:t(()=>[f(b(s.value?"Editar":"Agregar"),1)]),_:1},8,["disabled"])]),_:1})],32)]),_:1}))}}),Xe=k({__name:"HousingContainer",setup(g){const i=ie({page:1,limit:window.innerWidth<768?5:10,searchParam:""}),{isFetching:d,data:_,meta:o}=Te(S.housing,i),s={id:void 0,name:"",direction:""},r=be(),u=de(),w=()=>{u.setValues(s)},c=n=>{u.setValues(n)},H=n=>{i.page=1,i.searchParam=n},m=n=>{i.page=n},x=n=>{i.page=1,i.limit=n},C=A(0),E=A(!1),z=()=>{E.value=!1},{isPending:L,mutateAsync:K}=oe(S.housing,Ve.housing),T=(n,p)=>R(K({id:n,state:p}),`${p?"Activando":"Desactivando"}...`,()=>`Propiedad ${p?"activada":"desactivada"} con éxito`,D=>typeof D=="object"?"Acción fallida":D),G=[r.display({id:"select",header:({table:n})=>v(M,{checked:n.getIsAllPageRowsSelected()||n.getIsSomePageRowsSelected()&&"indeterminate","onUpdate:checked":p=>n.toggleAllPageRowsSelected(!!p),ariaLabel:"Select all",class:"mr-2 md:mr-0"}),cell:({row:n})=>v(M,{checked:n.getIsSelected(),"onUpdate:checked":p=>n.toggleSelected(!!p),ariaLabel:"Select row"}),enableHiding:!1}),r.accessor("id",{header:"ID",cell:n=>v("span",n.getValue())}),r.accessor("name",{header:"Nombre",cell:n=>v("div",{class:"capitalize min-w-20"},n.getValue())}),r.accessor("direction",{header:"Dirección",cell:n=>v("div",{class:"capitalize min-w-28"},n.getValue())}),r.accessor("is_active",{header:"Estado",cell:({row:n})=>v(Ne,{checked:!!n.getValue("is_active"),"onUpdate:checked":()=>T(n.getValue("id"),!n.getValue("is_active")),disabled:L.value||d.value})}),r.display({id:"actions",cell:({row:n})=>{const p=n.original;return v("div",{class:"relative"},v(Ke,{housing:p,"onUpdate:housingForm":c}))},enableHiding:!1})];return(n,p)=>($(),y(e(ye),{open:E.value,"onUpdate:open":p[0]||(p[0]=D=>E.value=D)},{default:t(()=>[a(ve,{icon:e(le),title:"Gestión de propiedades",isFetching:e(d),"onReset:initialForm":w},null,8,["icon","isFetching"]),a(We,{form:e(u),onReset:z},null,8,["form"]),a($e,{render:!!i.searchParam,filters:[{render:!!i.searchParam,tag:"Búsqueda",name:i.searchParam,handleClick:()=>{C.value+=1,i.searchParam="",i.page=1}}]},null,8,["render","filters"]),a(we,{data:e(_),columns:G,"delete-name":e(S).housing,"delete-url":`${e(h).housing}/${e(h).destroy_action}`,"title-dialog":"¿Estás seguro que quieres eliminar a las propiedades seleccionadas?","description-dialog":"Esta acción no se podrá deshacer. Esto eliminará a las propiedades seleccionadas permanentemente.","on-search-input":H,"input-render":C.value},null,8,["data","delete-name","delete-url","input-render"]),e(o)?($(),y(xe,{key:0,meta:e(o),"on-change-page":m,"on-change-limit":x},null,8,["meta"])):re("",!0)]),_:1},8,["open"]))}}),na=k({__name:"HousingView",setup(g){return(i,d)=>($(),y(Xe))}});export{na as default};
