import{j as e,O as m}from"./index-CGKE_yqd.js";import{A as l,a}from"./ActionMenu-CK4m5dbz.js";import{E as p}from"./ErrorReport-DufojM8E.js";import{P as c}from"./PageHeader-CJHXJ8gE.js";import{T as o}from"./Table-DHblAk8H.js";import{b as u}from"./useMatchesData-C6FIMaQn.js";import{u as f}from"./useIsAdmin-eViB238r.js";import{U as b}from"./constants-DpBRbtn9.js";import"./index-CPe-BBEd.js";import{u as x}from"./components-BktKjo96.js";import"./useGenerateSearchParams-DHzu1JTo.js";import"./menu-Kf7Og-U5.js";import"./calculate-active-index-B9zBCtTZ.js";import"./portal-5Px_MhHe.js";import"./node-B4O4sgZ3.js";import"./Headers-XYTgFKcz.js";import"./OrgCombobox-DObGaZmv.js";import"./combobox-ZyOtD84C.js";import"./active-element-history-2tBiaAce.js";import"./index-browser-BzJTmVxG.js";(function(){try{var r=typeof window<"u"?window:typeof global<"u"?global:typeof self<"u"?self:{},n=new r.Error().stack;n&&(r._sentryDebugIds=r._sentryDebugIds||{},r._sentryDebugIds[n]="a0b0136b-dcf3-4d34-a2ad-82432b4993e6",r._sentryDebugIdIdentifier="sentry-dbid-a0b0136b-dcf3-4d34-a2ad-82432b4993e6")}catch{}})();function T(){const{users:r}=x(),n=u("roles"),{isAdmin:s}=f(n),i=[{header:"Rank",key:"rank",render:t=>b[t].abb},{header:"Name",key:"name"},{header:"Email",key:"workEmail"},{header:"Requested Organization",key:"requestedOrg.name"}];return e.jsxs(e.Fragment,{children:[e.jsxs("div",{className:"mb-5",children:[e.jsx(c,{pageTitle:"Onboarding Users"}),e.jsxs("div",{children:[r.length>0&&e.jsxs(o,{cells:i,children:[e.jsx(o.HeaderRow,{}),e.jsx(o.Body,{children:r.sort((t,d)=>t.name.localeCompare(d.name)).map(t=>e.jsx(e.Fragment,{children:e.jsx(o.Row,{item:t,children:e.jsx(o.ButtonCell,{children:e.jsxs(l,{children:[e.jsx(a,{text:"Onboard User",url:`${t.id}`}),s&&e.jsx(a,{text:"Delete User Account",type:"danger",url:{pathname:"delete",searchParams:{userId:t.id}}})]},`action-menu-${t.id}`)})},t.id)}))})]}),r.length===0&&e.jsx("p",{children:"No Users found."})]})]}),e.jsx(m,{})]})}const q=p;export{q as ErrorBoundary,T as default};
//# sourceMappingURL=_.onboard-Cp57HrS8.js.map
