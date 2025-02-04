import{r as k,j as e,O as F}from"./index-CGKE_yqd.js";import"./index-CPe-BBEd.js";import{B as D}from"./Badge-ConyzQoo.js";import{a as P,F as z,D as B,S as L,C as R}from"./Icons-xSRdgZPx.js";import{u as _,P as A}from"./usePagination-CoTN8wEl.js";import{b as S,D as E}from"./Buttons-PCh2vdNK.js";import{F as M,S as O}from"./status-CQRghG0j.js";import{i as o}from"./index-browser-BzJTmVxG.js";import{a as b,L as I,u as T}from"./components-BktKjo96.js";import{F as U}from"./ChevronRightIcon-CUzTU7jI.js";import{b as $}from"./useMatchesData-C6FIMaQn.js";import{E as W}from"./ErrorReport-DufojM8E.js";import"./ChevronRightIcon-C_P991sd.js";import"./useGenerateSearchParams-DHzu1JTo.js";import"./BuildingLibraryIcon-BQrivYGg.js";import"./node-B4O4sgZ3.js";(function(){try{var s=typeof window<"u"?window:typeof global<"u"?global:typeof self<"u"?self:{},a=new s.Error().stack;a&&(s._sentryDebugIds=s._sentryDebugIds||{},s._sentryDebugIds[a]="17b8c2c3-fcb4-415c-930a-2312840ac52f",s._sentryDebugIdIdentifier="sentry-dbid-17b8c2c3-fcb4-415c-930a-2312840ac52f")}catch{}})();function V({checklists:s}){const[a,n]=k.useState(null),l=t=>{n(a===t?null:t)},i=s.filter(t=>t.isComplete);return i.length>0?e.jsxs("div",{className:"mb-20",children:[e.jsx("span",{className:"text-xl rounded-lg",children:"Completed Checklists"}),e.jsxs("div",{className:"overflow-x-auto pb-6 pt-4",children:[e.jsxs("div",{className:"grid grid-cols-3 text-left align-middle bg-gray-200",children:[e.jsx("p",{className:"px-4 py-2 text-left font-bold",children:"Checklist Name"}),e.jsx("p",{className:"px-4 py-2 text-left font-bold",children:"Date Assigned"}),e.jsx("p",{className:"px-4 py-2 text-left font-bold",children:"Date Completed"})]}),i.map(t=>e.jsxs("div",{className:"bg-gray-100",children:[e.jsxs("button",{className:"grid grid-cols-3 text-left w-full",onClick:()=>l(t.id),children:[e.jsx("p",{className:"px-4 py-2",children:t.name}),e.jsx("p",{className:"px-4 py-2",children:new Date(t.createdAt).toLocaleString()}),e.jsx("p",{className:"px-4 py-2",children:new Date(t.dateCompleted).toLocaleString()})]}),a===t.id&&e.jsx("div",{className:"bg-gray-200 p-4",children:t.items.map(r=>e.jsxs("div",{className:"grid grid-cols-3 py-1 odd:bg-zinc-300 first:rounded-t-lg px-3 last:rounded-b-lg",children:[e.jsxs("p",{children:["Task Item: ",r.reference.name??r.name]}),e.jsxs("p",{className:"ml-3",children:["Completed On:"," ",new Date(t.dateCompleted).toLocaleString()]}),e.jsxs("p",{className:"ml-6",children:["Approved By: ",r.role.name]})]},r.id))})]},t.id))]})]}):e.jsx("div",{className:"flex border-b border-1 border-neutral-200 py-5 gap-5 justify-between mb-10",children:e.jsx("h2",{className:"text-xl",children:"No Completed Checklists."})})}const q=({item:s,loggedInUser:a})=>{const n=d=>d==="USER",l=d=>d!=="USER",i=new Date(s.createdAt);i.setDate(i.getDate()+30);const t=b(),r=b(),m=b(),g=d=>{let x=0;for(const p of d)p.readBy.includes(a)||x++;return x};return e.jsx("li",{className:" border-b border-1 border-neutral-200",children:e.jsxs("div",{className:"flex items-stretch gap-y-5 gap-x-10 py-3 pl-2 pr-3",children:[e.jsx("div",{className:"flex flex-col basis-5/6",children:e.jsxs("div",{className:"flex items-center justify-between",children:[e.jsxs("div",{className:"flex-grow pr-10",children:[e.jsx("h3",{className:"font-bold mb-1 w-full pb-3 pl-2 border-b",children:s.reference.name??s.name}),e.jsxs("div",{className:"text-sm text-zinc-600 pt-2 pl-5 flex items-center gap-x-2",children:[e.jsxs("div",{className:"inline-flex items-center gap-1 text-nowrap",children:[e.jsx(P,{className:"size-6",title:"Date Started"}),new Date(s.createdAt).toDateString()]}),e.jsxs("div",{className:"inline-flex items-center gap-1.5 text-nowrap",children:[e.jsx(z,{title:"Due Date",className:"size-6"}),i.toDateString()]}),e.jsxs("div",{className:"inline-flex gap-1.5 items-center text-nowrap",children:[e.jsx(B,{className:"size-6",title:"Date Last Updated"}),new Date(s.updatedAt).toDateString()]}),e.jsxs("div",{className:"inline-flex gap-1.5 items-center text-nowrap",children:[s.status===o.ChecklistItemStatus.Completed&&e.jsx(L,{title:"Date Completed",className:"size-6 text-green-500"}),s.status===o.ChecklistItemStatus.Completed&&new Date(s.dateCompleted??i).toDateString()]}),e.jsxs(I,{className:"inline-flex items-center gap-1.5 hover:bg-zinc-300 hover:rounded-lg p-1",to:`${s.id}/comments`,children:[e.jsx(M,{title:"Comments",className:"size-6"}),s.comments&&e.jsxs(e.Fragment,{children:[s.comments.length,g(s.comments)>0&&e.jsxs("span",{className:"relative flex size-2",children:[e.jsx("span",{className:"animate-[ping_1s_ease-in-out_5] absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"}),e.jsx("span",{className:"relative inline-flex rounded-full size-2 bg-red-500"})]})]}),!s.comments&&"0"]})]})]}),e.jsx(O,{status:s.status})]})}),e.jsxs("div",{className:"basis-1/6 flex items-center",children:[n(s.role.abbreviation)&&e.jsxs(e.Fragment,{children:[s.status===o.ChecklistItemStatus.WaitingMember&&e.jsxs(t.Form,{method:"POST",className:"w-full",children:[e.jsx("input",{type:"hidden",value:s.id,name:"itemId"}),e.jsx("input",{type:"hidden",value:a,name:"userId"}),e.jsx(S,{type:"submit",value:"update",name:"_action",className:"w-full py-1",children:t.state==="idle"?"Mark Complete":"Processing..."})]}),s.status===o.ChecklistItemStatus.Completed&&e.jsx("div",{className:"flex flex-col justify-between w-full",children:e.jsx("div",{children:e.jsxs(r.Form,{method:"POST",children:[e.jsx("input",{type:"hidden",value:s.id,name:"itemId"}),e.jsx("input",{type:"hidden",value:a,name:"userId"}),e.jsx(E,{type:"submit",name:"_action",value:"incomplete",disabled:r.state!=="idle",className:"w-full",children:r.state==="idle"?"Unsign":"Processing..."})]})})})]}),l(s.role.abbreviation)&&e.jsxs(e.Fragment,{children:[s.status===o.ChecklistItemStatus.WaitingMember&&e.jsxs(m.Form,{method:"POST",className:"text-white text-center rounded-lg p-2 w-full",children:[e.jsx("input",{type:"hidden",name:"itemId",value:s.id}),e.jsx("input",{type:"hidden",name:"userId",value:a}),e.jsx(S,{type:"submit",value:"markready",name:"_action",className:"w-full",children:m.state==="idle"?"Mark Ready":"Processing..."})]}),s.status!==o.ChecklistItemStatus.WaitingMember&&e.jsxs("dl",{className:"",children:[e.jsxs("dt",{className:"font-bold",children:[s.status===o.ChecklistItemStatus.Completed?"Completed by":"Point of Contact",":"]}),e.jsx("dd",{children:s.role.name})]})]})]}),e.jsx("div",{className:"flex items-center",children:e.jsx(I,{to:`${s.id}`,className:"hover:ring-1 rounded py-1.5 px-1 hover:bg-zinc-200",children:e.jsx(U,{className:"h-10 w-10"})})})]})},s.id)},G=({checklist:s,loggedInUser:a})=>{const{currentItems:n,currentPage:l,totalPages:i,setCurrentPage:t,nextPage:r,prevPage:m,itemPos:g,setItemsPerPage:d,itemsPerPage:x}=_(s.items,10),p=s.items.length,N=s.items.filter(f=>f.isComplete).length,j=N/p*100,y=new Date(s.createdAt),c=new Date(y);c.setDate(c.getDate()+30);const u=new Date(Date()),v=new Date;v.setDate(u.getDate()+30);const w=new Date;w.setDate(u.getDate()+14);const C=new Date;C.setDate(u.getDate()+5);let h="none";return c<v&&c<w&&(c<C?c<u?h="danger":h="warning":h="primary"),e.jsx(e.Fragment,{children:e.jsxs("section",{className:"pt-3 mb-20 pb-5",children:[e.jsxs("div",{className:"pb-2 border-b-1 border-b border-gray-300",children:[e.jsxs("div",{className:"space-y-1",children:[e.jsxs("ul",{className:"flex items-center justify-between",children:[e.jsx("li",{className:"font-medium text-secondary-700",children:"Progress"}),e.jsxs("li",{className:"text-sm text-secondary-500",children:[N," / ",p," Completed"]}),e.jsxs("li",{className:"text-sm text-secondary-500",children:[j.toFixed(),"%"]})]}),e.jsx("div",{className:"relative flex h-2 w-full overflow-hidden rounded-full bg-secondary-200",children:e.jsx("div",{role:"progressbar","aria-valuenow":j,"aria-valuemin":0,"aria-valuemax":100,style:{width:`${j}%`},className:"flex h-full items-center justify-center bg-green-500 text-xs text-white"})})]}),e.jsxs("h2",{className:"text-2xl font-bold mt-5",children:["Checklist: ",s.name]}),e.jsxs("div",{className:"text-sm px-2 flex gap-x-2 items-center my-2",children:[e.jsxs(D,{className:"gap-x-2",children:[e.jsx(P,{className:"size-4"}),"Started ",y.toLocaleString("en-US",{month:"numeric",day:"numeric",year:"numeric"})]}),e.jsxs(D,{className:"gap-x-2",variant:h,children:[e.jsx(R,{className:"size-5"}),"Due ",c.toLocaleString("en-US",{month:"numeric",day:"numeric",year:"numeric"})]})]})]}),e.jsx("ul",{className:"list-none",children:n.map(f=>e.jsx(q,{item:f,loggedInUser:a},f.id))}),e.jsx(A,{currentPage:l,totalPages:i,setCurrentPage:t,itemsPerPage:x,setItemsPerPage:d,itemPos:g,nextPage:r,prevPage:m})]},s.id)})};function H({checklists:s}){const a=$("user"),n=s.filter(l=>!l.isComplete);return n.length>0?e.jsxs("div",{className:"mt-3",children:[e.jsx("h1",{className:"text-xl px-2 py-1 rounded-xl",children:"In Progress Checklist"}),n.map(l=>e.jsx(G,{checklist:l,loggedInUser:a.id},l.id))]}):e.jsx("div",{className:"flex border-b border-1 border-neutral-200 py-5 gap-5 justify-between mb-10",children:e.jsx("h3",{className:"text-xl",children:"No Active Checklists."})})}const oe=()=>{const{checklists:s}=T();return e.jsxs(e.Fragment,{children:[e.jsx("div",{className:"rounded-lg bg-zinc-50 drop-shadow-xl container mx-auto px-5 pt-2 mt-5",children:e.jsx(H,{checklists:s})}),e.jsx("div",{className:"rounded-lg bg-zinc-50 drop-shadow-xl container mx-auto px-5 pt-2",children:e.jsx(V,{checklists:s})}),e.jsx(F,{})]})},me=W;export{me as ErrorBoundary,oe as default};
//# sourceMappingURL=checklist-DbO0L867.js.map
