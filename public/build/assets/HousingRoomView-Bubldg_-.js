import{c as W,d as S,o as _,i as h,w as s,j as e,u as a,m as n,k as d,v as x,A as na,h as P,a as Y,B as la,C as ia,D as ra,E as q,F as da,I as ua,J as Q,e as ma,N as V,L as N,f as v,s as Z,a5 as ca,M as fa,X as _a,Y as pa,V as ga,p as z,O as ha,$ as va,a0 as m,ab as ba,ac as xa,ad as E,q as ya}from"./app-DLYm2e-R.js";import{e as O,F as C,_ as A,a as j,b as F,d as B,c as $a,u as wa}from"./Input.vue_vue_type_script_setup_true_lang-CLwfEvNT.js";import{E as ka,_ as Ha,S as Sa,a as Da,b as Ra,c as Va,n as U,o as T,p as G,q as X,s as J,t as I,e as Pa,f as Ea,g as K,h as Ca,i as Aa,j as ja,k as Fa,l as Ba,m as Ia}from"./FilterBarPresentation.vue_vue_type_script_setup_true_lang-Ctraf-Au.js";import{_ as Oa,a as La,b as Ma,c as qa,d as Na,e as za}from"./DrawerTitle.vue_vue_type_script_setup_true_lang-CaebGeXa.js";import{B as Ua,a as Ta}from"./badge-x-BeOz15Gp.js";import{E as Ga}from"./eye-DFJvpLqS.js";import{t as Xa,_ as Ja}from"./tableNames-CLc7PWVa.js";import{u as Ka}from"./useFetchHousingRoom-BhjBnMJT.js";/**
 * @license lucide-vue-next v0.446.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const L=W("ListCheckIcon",[["path",{d:"M11 18H3",key:"n3j2dh"}],["path",{d:"m15 18 2 2 4-4",key:"1szwhi"}],["path",{d:"M16 12H3",key:"1a2rj7"}],["path",{d:"M16 6H3",key:"1wxfjs"}]]);/**
 * @license lucide-vue-next v0.446.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const M=W("LockIcon",[["rect",{width:"18",height:"11",x:"3",y:"11",rx:"2",ry:"2",key:"1w4ew1"}],["path",{d:"M7 11V7a5 5 0 0 1 10 0v4",key:"fwvmzm"}]]),Wa={class:"mx-auto w-full max-w-lg p-4"},Ya={class:"mt-4 bg-white dark:bg-slate-300 shadow-lg rounded-lg p-4"},Qa={class:"mb-4"},Za={class:"flex justify-between"},ae={class:"text-gray-700"},ee={class:"flex justify-between"},se={class:"text-gray-700"},te={class:"flex justify-between"},oe={class:"text-gray-700 font-semibold flex gap-x-2"},ne={class:"flex justify-between"},le={class:"text-gray-700 font-semibold flex gap-x-2"},ie=S({__name:"HousingRoomDetail",props:{isDrawerOpen:{type:Boolean},housing_room:{}},emits:["update:drawer-state"],setup(b,{emit:l}){const p=l;function y(u){p("update:drawer-state",u)}return(u,t)=>(_(),h(a(za),{open:u.isDrawerOpen,"onUpdate:open":t[0]||(t[0]=c=>y(c))},{default:s(()=>[e(a(Oa),null,{default:s(()=>[n("div",Wa,[e(a(La),null,{default:s(()=>[e(a(Ma),{class:"text-xl font-semibold dark:text-slate-200"},{default:s(()=>t[1]||(t[1]=[d("Detalles de la habitación")])),_:1}),e(a(qa),{class:"text-gray-500"},{default:s(()=>t[2]||(t[2]=[d(" Aquí puedes ver los detalles de esta habitación. ")])),_:1})]),_:1}),n("div",Ya,[n("div",Qa,[t[7]||(t[7]=n("h3",{class:"text-lg font-bold"},"Información detallada",-1)),n("div",Za,[t[3]||(t[3]=n("span",{class:"font-medium"},"Habitación:",-1)),n("span",ae,x(u.housing_room.room_number),1)]),n("div",ee,[t[4]||(t[4]=n("span",{class:"font-medium"},"Propiedad:",-1)),n("span",se,x(u.housing_room.housing),1)]),n("div",te,[t[5]||(t[5]=n("span",{class:"font-medium"},"Estado:",-1)),n("span",oe,[d(x(u.housing_room.is_active?"Activo":"No activo")+" ",1),u.housing_room.is_active?(_(),h(a(Ua),{key:0,class:"text-green-500"})):(_(),h(a(Ta),{key:1,class:"text-red-700"}))])]),n("div",ne,[t[6]||(t[6]=n("span",{class:"font-medium"},"Disponibilidad:",-1)),n("span",le,[d(x(u.housing_room.is_available?"Disponible":"Ocupado")+" ",1),u.housing_room.is_available?(_(),h(a(L),{key:0,class:"text-cyan-600"})):(_(),h(a(M),{key:1,class:"text-gray-500"}))])])])]),e(a(Na),{class:"mt-4"},{default:s(()=>[e(a(na),{"as-child":""},{default:s(()=>[e(O,{variant:"outline",class:"w-full dark:text-slate-200"},{default:s(()=>t[8]||(t[8]=[d(" Cerrar ")])),_:1})]),_:1})]),_:1})])]),_:1})]),_:1},8,["open"]))}}),re=S({__name:"DropdownHousingRoomOptions",props:{housing_room:{}},emits:["update:housing-room-form"],setup(b,{emit:l}){const p=b,y=l;function u(){y("update:housing-room-form",p.housing_room)}const t=P(!1),c=()=>{t.value=!0},$=w=>{t.value=w};return(w,f)=>(_(),Y(Q,null,[e(a(ua),null,{default:s(()=>[e(a(la),{"as-child":""},{default:s(()=>[e(a(O),{variant:"ghost",class:"w-8 h-8 p-0"},{default:s(()=>[f[0]||(f[0]=n("span",{class:"sr-only"},"Abrir menu",-1)),e(a(ka),{class:"w-4 h-4"})]),_:1})]),_:1}),e(a(ia),{align:"end"},{default:s(()=>[e(a(ra),null,{default:s(()=>f[1]||(f[1]=[d("Opciones")])),_:1}),e(a(q),{onClick:da(c,["stop"]),class:"flex items-center gap-x-2 py-2 cursor-pointer"},{default:s(()=>[e(a(Ga),{class:"w-5 h-5"}),f[2]||(f[2]=d(" Ver "))]),_:1}),e(Ha,{class:"w-full"},{default:s(()=>[e(a(q),{onClick:u,class:"flex items-center gap-x-2 text-sky-700 dark:text-sky-500 py-2 cursor-pointer"},{default:s(()=>[e(a(Sa),{class:"w-5 h-5"}),f[3]||(f[3]=d(" Editar "))]),_:1})]),_:1})]),_:1})]),_:1}),e(ie,{"is-drawer-open":t.value,housing_room:w.housing_room,"onUpdate:drawerState":$},null,8,["is-drawer-open","housing_room"])],64))}});function de(b){return ma(V.housing_room,b)}const ue={class:"flex flex-col sm:grid grid-cols-2 gap-x-2 gap-y-1 overflow-y-auto max-h-[71vh] p-1"},me={class:"flex items-center gap-1 text-cyan-600 dark:text-cyan-500"},ce={class:"flex items-center gap-1 text-gray-500"},fe=S({__name:"HousingRoomModal",props:{form:{}},emits:["reset"],setup(b,{emit:l}){const p=b,y=l;function u(){y("reset")}const t=N(()=>!!p.form.values.id),c=N(()=>({url:`${v.housing_room}/${t.value?v.update_action:v.store_action}`,method:t.value?v.put:v.post})),{isPending:$,mutateAsync:w}=de(c),f=p.form.handleSubmit(R=>Z(w(R),`${t.value?"Editando":"Agregando"}...`,()=>(u(),`Habitación ${t.value?"actualizada":"agregada"} con éxito`),r=>typeof r=="object"?(p.form.setErrors(r),"Acción fallida"):r)),D=P([]);return ca(async()=>{D.value=(await fa(`${v.housing}/${v.get_active}`)).data}),(R,r)=>(_(),h(a(Ea),{class:"sm:max-w-[600px] text-slate-800 dark:dark:text-slate-200"},{default:s(()=>[e(a(Da),null,{default:s(()=>[e(a(Ra),null,{default:s(()=>[d(x(t.value?"Editar":"Agregar")+" habitación",1)]),_:1}),e(a(Va),null,{default:s(()=>[d(" Haz los cambios de la habitación aquí. Click "+x(t.value?"Editar":"Agregar")+" cuando termines. ",1)]),_:1})]),_:1}),n("form",{onSubmit:r[0]||(r[0]=(...g)=>a(f)&&a(f)(...g)),"keep-values":""},[n("section",ue,[e(a(C),{name:"housing_id"},{default:s(({componentField:g})=>[e(a(A),null,{default:s(()=>[e(a(j),null,{default:s(()=>r[1]||(r[1]=[d("Propiedad")])),_:1}),e(a(U),_a(pa(g)),{default:s(()=>[e(a(F),null,{default:s(()=>[e(a(T),null,{default:s(()=>[e(a(G),{placeholder:"Selecciona la propiedad"})]),_:1})]),_:1}),e(a(X),null,{default:s(()=>[e(a(J),null,{default:s(()=>[(_(!0),Y(Q,null,ga(D.value,k=>(_(),h(a(I),{value:k.id.toString()},{default:s(()=>[d(x(k.name),1)]),_:2},1032,["value"]))),256))]),_:1})]),_:1})]),_:2},1040),e(a(B))]),_:2},1024)]),_:1}),e(a(C),{name:"room_number"},{default:s(({componentField:g})=>[e(a(A),null,{default:s(()=>[e(a(j),null,{default:s(()=>r[2]||(r[2]=[d("Habitación")])),_:1}),e(a(F),null,{default:s(()=>[e(a($a),z(g,{autocomplete:"off"}),null,16)]),_:2},1024),e(a(B))]),_:2},1024)]),_:1}),e(a(C),{name:"is_available"},{default:s(({componentField:g})=>[e(a(A),{class:"col-span-full"},{default:s(()=>[e(a(j),null,{default:s(()=>r[3]||(r[3]=[d("Disponibilidad")])),_:1}),e(a(U),z(g,{modelValue:String(g.modelValue)}),{default:s(()=>[e(a(F),null,{default:s(()=>[e(a(T),null,{default:s(()=>[e(a(G),{placeholder:"Selecciona la disponibilidad"})]),_:1})]),_:1}),e(a(X),null,{default:s(()=>[e(a(J),null,{default:s(()=>[e(a(I),{value:"1"},{default:s(()=>[n("div",me,[e(a(L)),r[4]||(r[4]=n("span",{class:"font-bold text-sm"}," Disponible ",-1))])]),_:1}),e(a(I),{value:"0"},{default:s(()=>[n("div",ce,[e(a(M)),r[5]||(r[5]=n("span",{class:"font-bold text-sm"}," Ocupado ",-1))])]),_:1})]),_:1})]),_:1})]),_:2},1040,["modelValue"]),e(a(B))]),_:2},1024)]),_:1})]),e(a(Pa),null,{default:s(()=>[e(a(O),{type:"submit",class:"w-full mt-3 p-1",disabled:a($)},{default:s(()=>[d(x(t.value?"Editar":"Agregar"),1)]),_:1},8,["disabled"])]),_:1})],32)]),_:1}))}}),_e={class:"flex flex-col sm:flex-row justify-center gap-y-2 mt-3 py-3 shadow-sm dark:bg-slate-900 rounded-lg"},pe=S({__name:"HousingRoomContainer",setup(b){const l=ha({page:1,limit:window.innerWidth<768?5:10,searchParam:"",roomState:"all"}),{isFetching:p,data:y,meta:u}=Ka(V.housing_room,l),t={id:void 0,housing_id:void 0,room_number:"",is_available:1},c=Ia(),$=wa(),w=()=>{$.setValues(t)},f=o=>{$.setValues(o)},D=o=>{l.page=1,l.searchParam=o},R=o=>{l.page=o},r=o=>{l.page=1,l.limit=o},g=P(0),k=P(!1),aa=()=>{k.value=!1},{isPending:ea,mutateAsync:sa}=va(V.housing_room,Xa.housing_room),ta=(o,i)=>Z(sa({id:o,state:i}),`${i?"Activando":"Desactivando"}...`,()=>`Habitación ${i?"activada":"desactivada"} con éxito`,H=>typeof H=="object"?"Acción fallida":H),oa=[c.display({id:"select",header:({table:o})=>m(K,{checked:o.getIsAllPageRowsSelected()||o.getIsSomePageRowsSelected()&&"indeterminate","onUpdate:checked":i=>o.toggleAllPageRowsSelected(!!i),ariaLabel:"Select all",class:"mr-2 md:mr-0"}),cell:({row:o})=>m(K,{checked:o.getIsSelected(),"onUpdate:checked":i=>o.toggleSelected(!!i),ariaLabel:"Select row"}),enableHiding:!1}),c.accessor("id",{header:"ID",cell:o=>m("span",o.getValue())}),c.accessor("room_number",{header:"Habitación",cell:o=>m("div",{class:"capitalize min-w-20"},o.getValue())}),c.accessor("housing",{header:"Propiedad",cell:o=>m("div",{class:"capitalize min-w-28"},o.getValue())}),c.accessor("is_available",{header:"Disponibilidad",cell:o=>o.getValue()?m("div",{class:"flex items-center gap-1 text-cyan-600 dark:text-cyan-500"},[m(L),m("span",{class:"font-bold text-sm"},"Disponible")]):m("div",{class:"flex items-center gap-1 text-gray-500"},[m(M),m("span",{class:"font-bold text-sm"},"Ocupado")])}),c.accessor("is_active",{header:"Estado",cell:({row:o})=>m(Ja,{checked:!!o.getValue("is_active"),"onUpdate:checked":()=>ta(o.getValue("id"),!o.getValue("is_active")),disabled:ea.value||p.value})}),c.display({id:"actions",cell:({row:o})=>{const i=o.original;return m("div",{class:"relative"},m(re,{housing_room:i,"onUpdate:housingRoomForm":f}))},enableHiding:!1})];return(o,i)=>(_(),h(a(Ba),{open:k.value,"onUpdate:open":i[1]||(i[1]=H=>k.value=H)},{default:s(()=>[e(Ca,{icon:a(ba),title:"Gestión de habitaciones",isFetching:a(p),"onReset:initialForm":w},null,8,["icon","isFetching"]),e(fe,{form:a($),onReset:aa},null,8,["form"]),n("section",_e,[e(a(xa),{type:"single",class:"dark:text-slate-200","model-value":l.roomState,"onUpdate:modelValue":i[0]||(i[0]=H=>l.roomState=H)},{default:s(()=>[e(a(E),{value:"all","aria-label":"Toggle bold"},{default:s(()=>i[2]||(i[2]=[d(" Todas ")])),_:1}),e(a(E),{value:"available"},{default:s(()=>i[3]||(i[3]=[d(" Disponibles ")])),_:1}),e(a(E),{value:"not_available"},{default:s(()=>i[4]||(i[4]=[d(" Ocupadas ")])),_:1})]),_:1},8,["model-value"])]),e(Aa,{render:!!l.searchParam,filters:[{render:!!l.searchParam,tag:"Búsqueda",name:l.searchParam,handleClick:()=>{g.value+=1,l.searchParam="",l.page=1}}]},null,8,["render","filters"]),e(ja,{data:a(y),columns:oa,"delete-name":a(V).housing_room,"delete-url":`${a(v).housing_room}/${a(v).destroy_action}`,"title-dialog":"¿Estás seguro que quieres eliminar a las habitaciones seleccionadas?","description-dialog":"Esta acción no se podrá deshacer. Esto eliminará a las habitaciones seleccionadas permanentemente.","on-search-input":D,"input-render":g.value},null,8,["data","delete-name","delete-url","input-render"]),a(u)?(_(),h(Fa,{key:0,meta:a(u),"on-change-page":R,"on-change-limit":r},null,8,["meta"])):ya("",!0)]),_:1},8,["open"]))}}),ke=S({__name:"HousingRoomView",setup(b){return(l,p)=>(_(),h(pe))}});export{ke as default};
