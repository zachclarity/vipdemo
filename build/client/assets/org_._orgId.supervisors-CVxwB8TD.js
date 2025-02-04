import{r as l,j as e}from"./index-CGKE_yqd.js";import{E as g}from"./ErrorReport-DufojM8E.js";import{P as b}from"./PageHeader-CJHXJ8gE.js";import"./index-CPe-BBEd.js";import{u as N}from"./components-BktKjo96.js";import{F as y}from"./CloudArrowDownIcon-Bbm9IOXs.js";import{y as v,j as k}from"./dialog-cts_RZz3.js";import"./node-B4O4sgZ3.js";import"./Headers-XYTgFKcz.js";import"./useMatchesData-C6FIMaQn.js";import"./OrgCombobox-DObGaZmv.js";import"./combobox-ZyOtD84C.js";import"./calculate-active-index-B9zBCtTZ.js";import"./portal-5Px_MhHe.js";import"./active-element-history-2tBiaAce.js";import"./transition-DpAM4Mvv.js";(function(){try{var r=typeof window<"u"?window:typeof global<"u"?global:typeof self<"u"?self:{},s=new r.Error().stack;s&&(r._sentryDebugIds=r._sentryDebugIds||{},r._sentryDebugIds[s]="63ce0908-d1cd-4f2c-9ffd-837666399cda",r._sentryDebugIdIdentifier="sentry-dbid-63ce0908-d1cd-4f2c-9ffd-837666399cda")}catch{}})();function S({title:r,titleId:s,...a},i){return l.createElement("svg",Object.assign({xmlns:"http://www.w3.org/2000/svg",fill:"none",viewBox:"0 0 24 24",strokeWidth:1.5,stroke:"currentColor","aria-hidden":"true","data-slot":"icon",ref:i,"aria-labelledby":s},a),r?l.createElement("title",{id:s},r):null,l.createElement("path",{strokeLinecap:"round",strokeLinejoin:"round",d:"m15.75 15.75-2.489-2.489m0 0a3.375 3.375 0 1 0-4.773-4.773 3.375 3.375 0 0 0 4.774 4.774ZM21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"}))}const E=l.forwardRef(S);function R({title:r,titleId:s,...a},i){return l.createElement("svg",Object.assign({xmlns:"http://www.w3.org/2000/svg",fill:"none",viewBox:"0 0 24 24",strokeWidth:1.5,stroke:"currentColor","aria-hidden":"true","data-slot":"icon",ref:i,"aria-labelledby":s},a),r?l.createElement("title",{id:s},r):null,l.createElement("path",{strokeLinecap:"round",strokeLinejoin:"round",d:"M6 18 18 6M6 6l12 12"}))}const I=l.forwardRef(R),C=(r,s,a)=>{const i=["Supervisors","","Subordinates","","Incoming Airman"],x=["Rank","Name","Rank","Name","Rank","Name"],d=r.flatMap(o=>{const m=s.filter(n=>n.supervisorId===o.id),c=a.filter(n=>n.sponsorId===o.id),h=Math.max(m.length,c.length,1);return Array.from({length:h}).map((n,f)=>{var p,j,u,w;return[f===0?o.rank:"",f===0?o.name:"",((p=m[f])==null?void 0:p.rank)||"",((j=m[f])==null?void 0:j.name)||"",((u=c[f])==null?void 0:u.rank)||"",((w=c[f])==null?void 0:w.name)||""]})});return[i.join(","),x.join(","),...d.map(o=>o.join(","))].join(`
`)},F=(r,s,a)=>{const i=new Date,x=i.toISOString().split("T")[0],d=i.toISOString().split("T")[1].split(".")[0],o=`Supervisor-Report-${x}-${d}.csv`,m=C(r,s,a),c=new Blob([m],{type:"text/csv;charset=utf-8;"}),h=URL.createObjectURL(c),t=document.createElement("a");t.setAttribute("href",h),t.setAttribute("download",o),t.style.visibility="hidden",document.body.appendChild(t),t.click(),document.body.removeChild(t)},G=()=>{const{orgBeingViewed:r,supervisor:s,subordinates:a,sponsor:i}=N(),[x,d]=l.useState(!1),[o,m]=l.useState(null),c=o?a.filter(t=>t.supervisorId===o):[],h=o?i.filter(t=>t.sponsorId===o):[];return e.jsxs(e.Fragment,{children:[e.jsx(b,{org:r,pageTitle:"Supervisors Reports",navigateTo:"supervisors"}),e.jsx("div",{className:"w-full flex justify-end",children:e.jsxs("button",{type:"button",onClick:()=>F(s,a,i),className:"inline-flex justify-right px-4 py-1 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-white",children:[e.jsx(y,{className:"w-5 h-5 mr-2"}),"Export"]})}),e.jsxs("table",{className:"text-left table-auto w-full border-neutral-300",children:[e.jsx("thead",{children:e.jsxs("tr",{className:"border-b border-black",children:[e.jsx("th",{children:"Name"}),e.jsx("th",{children:"Rank"}),e.jsx("th",{children:"Email"}),e.jsx("th",{className:"text-center",children:"Supervisor Info"})]})}),e.jsx("tbody",{children:s.length>0?[...s].sort((t,n)=>((t==null?void 0:t.name)??"").localeCompare((n==null?void 0:n.name)??"")).map(t=>e.jsxs("tr",{children:[e.jsx("td",{children:t==null?void 0:t.name}),e.jsx("td",{children:t==null?void 0:t.rank}),e.jsx("td",{children:t==null?void 0:t.workEmail}),e.jsx("td",{className:"flex justify-center",children:e.jsx("button",{onClick:()=>{d(!0),m(t==null?void 0:t.id)},children:e.jsx(E,{className:"h-10 w-10"})})})]},t==null?void 0:t.id)):e.jsx("tr",{children:e.jsx("td",{colSpan:4,className:"text-center",children:"No supervisors found."})})})]}),e.jsx("div",{children:x&&e.jsxs(v,{open:x,onClose:()=>d(!1),children:[e.jsx("div",{className:"fixed inset-0 bg-black bg-opacity-30","aria-hidden":"true"}),e.jsx("div",{className:"fixed inset-0 flex items-center justify-center",children:e.jsxs(k,{className:"bg-white p-4 rounded-md",children:[e.jsxs("div",{className:"flex justify-center items-center w-full",children:[e.jsx("p",{className:"text-center text-lg flex-grow",children:"Supervisor Information"}),e.jsx(I,{onClick:()=>d(!1),className:"size-10 cursor-pointer ml-4"})]}),e.jsx("p",{className:"text-md font-semibold mt-2",children:"Subordinates:"}),c.length>0?e.jsx(e.Fragment,{children:e.jsx("div",{className:"overflow-x-auto p-4",children:e.jsxs("table",{className:"min-w-full w-[500px] table-auto border-none",children:[e.jsx("thead",{children:e.jsxs("tr",{children:[e.jsx("th",{className:"px-4 py-2 text-left",children:"Name"}),e.jsx("th",{className:"px-4 py-2 text-left",children:"Rank"}),e.jsx("th",{className:"px-4 py-2 text-left",children:"Email"})]})}),e.jsx("tbody",{children:[...c].sort((t,n)=>((t==null?void 0:t.name)??"").localeCompare((n==null?void 0:n.name)??"")).map(t=>e.jsxs("tr",{children:[e.jsx("td",{className:"px-4 whitespace-nowrap truncate",children:t.name}),e.jsx("td",{className:"px-4",children:t.rank}),e.jsx("td",{className:"px-4",children:t.workEmail})]},t.id))})]})})}):e.jsx("p",{children:"No subordinates found for this supervisor."}),e.jsx("p",{className:"text-md font-semibold mt-4",children:"Incoming Airman:"}),h.length>0?e.jsx(e.Fragment,{children:e.jsx("div",{className:"overflow-x-auto p-4",children:e.jsxs("table",{className:"min-w-full w-[500px] table-auto border-none",children:[e.jsx("thead",{children:e.jsxs("tr",{children:[e.jsx("th",{className:"px-4 py-2 text-left",children:"Name"}),e.jsx("th",{className:"px-4 py-2 text-left",children:"Rank"}),e.jsx("th",{className:"px-4 py-2 text-left",children:"Email"})]})}),e.jsx("tbody",{children:[...h].sort((t,n)=>((t==null?void 0:t.name)??"").localeCompare((n==null?void 0:n.name)??"")).map(t=>e.jsxs("tr",{children:[e.jsx("td",{className:"px-4 whitespace-nowrap truncate",children:t.name}),e.jsx("td",{className:"px-4",children:t.rank}),e.jsx("td",{className:"px-4",children:t.workEmail})]},t.id))})]})})}):e.jsx("p",{children:"No Incoming Airman found for this supervisor."})]})})]})})]})},X=g;export{X as ErrorBoundary,G as default};
//# sourceMappingURL=org_._orgId.supervisors-CVxwB8TD.js.map
