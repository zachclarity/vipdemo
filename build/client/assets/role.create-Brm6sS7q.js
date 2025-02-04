import{u as j,r as m,j as e}from"./index-CGKE_yqd.js";import{E as g}from"./ErrorReport-DufojM8E.js";import{a as t,T as o,b as n,C as f}from"./Input-qJnTyjxU.js";import"./index-CPe-BBEd.js";import{M as a}from"./Modal-BilbC_tq.js";import{u as y}from"./useIsAdmin-eViB238r.js";import{u as R,F as I}from"./components-BktKjo96.js";import"./node-B4O4sgZ3.js";import"./index-BIjbdFWj.js";import"./Buttons-PCh2vdNK.js";import"./useGenerateSearchParams-DHzu1JTo.js";import"./dialog-cts_RZz3.js";import"./portal-5Px_MhHe.js";import"./active-element-history-2tBiaAce.js";import"./transition-DpAM4Mvv.js";(function(){try{var r=typeof window<"u"?window:typeof global<"u"?global:typeof self<"u"?self:{},i=new r.Error().stack;i&&(r._sentryDebugIds=r._sentryDebugIds||{},r._sentryDebugIds[i]="220b2c2e-c1a7-461c-96c6-765e6d5017c4",r._sentryDebugIdIdentifier="sentry-dbid-220b2c2e-c1a7-461c-96c6-765e6d5017c4")}catch{}})();const _=()=>{const{roles:r,orgId:i,userRoles:l}=R(),{orgBeingViewed:u}=j(),[h,d]=m.useState(r.length===0),{isAdmin:p}=y(l),[x,c]=m.useState(r.length===0?"add":"link"),b=s=>{s==="add"?(d(!0),c("add")):(d(!1),c("link"))};return e.jsx(a,{children:e.jsxs(I,{method:"post",children:[e.jsxs("div",{className:"bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4 mb-5",children:[e.jsx(a.Title,{children:"Create Organization Role"}),e.jsx("input",{type:"hidden",name:"organizationId",value:i}),e.jsxs(t,{children:[e.jsx(o,{htmlFor:"roleId",children:"Role to Link:"}),e.jsxs("select",{name:"roleId",id:"roleId",className:"block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-300 focus:ring focus:ring-primary-200 focus:ring-opacity-50 disabled:cursor-not-allowed disabled:bg-gray-50",onChange:s=>{b(s.currentTarget.selectedOptions[0].value)},children:[r.map(s=>e.jsx("option",{value:s.uuid,children:s.name},s.uuid)),e.jsx("option",{value:"add",children:"Add New Role"})]})]}),h&&e.jsxs(e.Fragment,{children:[e.jsxs(t,{children:[e.jsx(o,{htmlFor:"roleName",children:"Role Name:"}),e.jsx(n,{name:"roleName",required:!0})]}),e.jsxs(t,{children:[e.jsx(o,{htmlFor:"roleAbbreviation",children:"Role Abbreviation:"}),e.jsx(n,{name:"roleAbbreviation",required:!0})]}),e.jsxs(t,{children:[e.jsx(o,{htmlFor:"roleDescription",children:"Role Description:"}),e.jsx(n,{name:"roleDescription",required:!0})]}),!u.isWingLevel&&p&&e.jsx(t,{children:e.jsx(f,{label:"Base Agency?",name:"baseAgency",defaultChecked:!1,reverse:!0})}),e.jsx("hr",{className:"my-8 h-px border-0 bg-gray-300"})]}),e.jsxs(t,{children:[e.jsx(o,{htmlFor:"contactPhone",children:"Role's Phone Number:"}),e.jsx(n,{name:"contactPhone",pattern:"[0-9]{3}-[0-9]{3}-[0-9]{4}",required:!0})]}),e.jsxs(t,{children:[e.jsx(o,{htmlFor:"contactEmail",children:"Role's Email:"}),e.jsx(n,{name:"contactEmail",required:!0})]})]}),e.jsx(a.Buttons,{link:"..",value:x,children:"Save"})]})})},O=g;export{O as ErrorBoundary,_ as default};
//# sourceMappingURL=role.create-Brm6sS7q.js.map
