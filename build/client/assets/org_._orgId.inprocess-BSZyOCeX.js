import{r as l,j as e}from"./index-CGKE_yqd.js";import{P as x,a as b,D as w,L as j}from"./Buttons-PCh2vdNK.js";import{E as g}from"./ErrorReport-DufojM8E.js";import{P as y}from"./PageHeader-CJHXJ8gE.js";import{i as c}from"./index-browser-BzJTmVxG.js";import{I as N}from"./Input-qJnTyjxU.js";import"./index-CPe-BBEd.js";import{u as k,a as v}from"./components-BktKjo96.js";import{F as m}from"./PauseIcon-CHPk8Zcf.js";import{F as h}from"./PlayIcon-vjgFCN-l.js";import{F as I}from"./ArchiveBoxArrowDownIcon-BBydAvWc.js";import{F as P}from"./EyeIcon-Pt1cX6bN.js";import"./useGenerateSearchParams-DHzu1JTo.js";import"./node-B4O4sgZ3.js";import"./Headers-XYTgFKcz.js";import"./useMatchesData-C6FIMaQn.js";import"./OrgCombobox-DObGaZmv.js";import"./combobox-ZyOtD84C.js";import"./calculate-active-index-B9zBCtTZ.js";import"./portal-5Px_MhHe.js";import"./active-element-history-2tBiaAce.js";import"./index-BIjbdFWj.js";(function(){try{var s=typeof window<"u"?window:typeof global<"u"?global:typeof self<"u"?self:{},r=new s.Error().stack;r&&(s._sentryDebugIds=s._sentryDebugIds||{},s._sentryDebugIds[r]="9f9b1ee8-8986-4427-b1b7-f918df28ae32",s._sentryDebugIdIdentifier="sentry-dbid-9f9b1ee8-8986-4427-b1b7-f918df28ae32")}catch{}})();function C({title:s,titleId:r,...n},t){return l.createElement("svg",Object.assign({xmlns:"http://www.w3.org/2000/svg",viewBox:"0 0 16 16",fill:"currentColor","aria-hidden":"true","data-slot":"icon",ref:t,"aria-labelledby":r},n),s?l.createElement("title",{id:r},s):null,l.createElement("path",{fillRule:"evenodd",d:"M4.5 13a3.5 3.5 0 0 1-1.41-6.705A3.5 3.5 0 0 1 9.72 4.124a2.5 2.5 0 0 1 3.197 3.018A3.001 3.001 0 0 1 12 13H4.5Zm6.28-3.97a.75.75 0 1 0-1.06-1.06l-.97.97V6.25a.75.75 0 0 0-1.5 0v2.69l-.97-.97a.75.75 0 0 0-1.06 1.06l2.25 2.25a.75.75 0 0 0 1.06 0l2.25-2.25Z",clipRule:"evenodd"}))}const A=l.forwardRef(C),F=s=>{const r=["Name","Status","Type","Checklist Progress","Last Updated"],n=s.map(({checklist:{count:t,...o},...a})=>{const u=o.updatedAt?new Date(o.updatedAt).toDateString():"N/A";let i="Unkown";switch(o.status){case"Archived":i="Archived";break;case"InProgress":i="In Progress";break;case"Paused":i="Paused";break}const d=t.totalItems||0,p=t.completedItems||0,f=d>0?Math.round(p/d*100):0;return[a.name||"Unknown",i,o.type||"N/A",`${f}%`,u].join(",")});return[r.join(","),...n].join(`
`)},R=(s,r="checklist.csv")=>{if(!s||s.length===0){console.error("No data to export.");return}const n=F(s),t=new Blob([n],{type:"text/csv;charset=utf-8;"}),o=URL.createObjectURL(t),a=document.createElement("a");a.href=o,a.download=r,a.style.visibility="hidden",document.body.appendChild(a),a.click(),document.body.removeChild(a)},Y=()=>{const{inbound:s,orgBeingViewed:r}=k(),n=v();return e.jsxs(e.Fragment,{children:[e.jsx(y,{org:r,pageTitle:"Inprocessing Members",navigateTo:"inprocess"}),s.length>0?e.jsxs(e.Fragment,{children:[e.jsx("div",{className:"w-full flex justify-end",children:e.jsxs("button",{type:"button",onClick:()=>R(s),className:"inline-flex justify-right px-4 py-1 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-white",children:[e.jsx(A,{className:"w-5 h-5 mr-2"}),"Export"]})}),e.jsxs("table",{className:"text-left table-auto w-full border-neutral-300 border-1",children:[e.jsx("thead",{children:e.jsxs("tr",{className:"border-b border-black",children:[e.jsx("th",{}),e.jsx("th",{className:"text-left",children:"Name"}),e.jsx("th",{children:"Status"}),e.jsx("th",{children:"Type"}),e.jsx("th",{className:"text-center",children:"Checklist Progress"}),e.jsx("th",{className:"w-56",children:"Last Updated"}),e.jsx("th",{className:"w-56"})]})}),e.jsx("tbody",{children:s.sort((t,o)=>t.name.localeCompare(o.name)).map(t=>{const o=new Date(t.checklist.updatedAt).toDateString(),a=Math.round(t.checklist.count.completedItems/t.checklist.count.totalItems*100);return e.jsxs("tr",{className:"table-row border-b even:bg-zinc-50",children:[e.jsx("td",{className:"w-5 px-2",children:t.checklist.status===c.ChecklistStatus.Paused?e.jsx(m,{className:"h-5 w-5"}):e.jsx(h,{className:"h-5 w-5"})}),e.jsx("td",{className:"py-2",children:t.name}),e.jsxs("td",{children:[t.checklist.status===c.ChecklistStatus.Archived&&"Archived",t.checklist.status===c.ChecklistStatus.InProgress&&"In Progress",t.checklist.status===c.ChecklistStatus.Paused&&"Paused"]}),e.jsx("td",{children:t.checklist.type}),e.jsx("td",{className:"text-center",children:Number.isNaN(a)?"0%":`${a}%`}),e.jsx("td",{children:o}),e.jsxs("td",{className:"text-right flex gap-2 mt-1",children:[e.jsxs(n.Form,{method:"POST",className:"flex gap-2",children:[e.jsx(N.Hidden,{name:"itemId",value:t.checklist.id}),t.checklist.status!==c.ChecklistStatus.Paused?e.jsx(x,{type:"submit",value:"pause",name:"_action",className:"flex justify-center items-center w-12",children:e.jsx(m,{className:"h-5 w-5"})}):e.jsx(b,{type:"submit",value:"resume",name:"_action",className:"flex justify-center items-center w-12",children:e.jsx(h,{className:"h-5 w-5"})}),e.jsx(w,{type:"submit",value:"archive",name:"_action",className:"flex justify-center items-center w-12",children:e.jsx(I,{className:"h-5 w-5"})})]}),e.jsx(j,{to:`/org/${r.uuid}/inprocess/${t.checklist.id}/view`,className:"flex justify-center items-center w-12",children:e.jsx(P,{className:"h-5 w-5"})})]})]},t.id)})})]})]}):"No members to show."]})},ee=g;export{ee as ErrorBoundary,Y as default};
//# sourceMappingURL=org_._orgId.inprocess-BSZyOCeX.js.map
