(window.webpackJsonp=window.webpackJsonp||[]).push([[0],{14:function(e,n,t){e.exports=t(38)},37:function(e,n,t){},38:function(e,n,t){"use strict";t.r(n);var a=t(0),u=t.n(a),c=t(13),o=t.n(c),r=t(2),l=t(3),i=t.n(l),m="/api/persons",s=function(){return i.a.get(m)},f=function(e){return i.a.post(m,e)},d=function(e){return i.a.delete("".concat(m,"/").concat(e.id))},b=function(e,n){return i.a.put("".concat(m,"/").concat(e),n)},h=function(e){return u.a.createElement("div",null,"filter shown with",u.a.createElement("input",{value:e.value,onChange:e.onChange}))},v=function(e){return u.a.createElement("form",{onSubmit:e.onSubmit},u.a.createElement("div",null,"name:",u.a.createElement("input",{value:e.name,onChange:e.onNameChange})),u.a.createElement("div",null,"number:",u.a.createElement("input",{value:e.number,onChange:e.onNumberChange}),u.a.createElement("button",{type:"submit"},"add")))},E=function(e){var n=e.filter,t=e.persons,a=e.remove;return(""===n?t:t.filter(function(e){return e.name.toLowerCase().includes(n.toLowerCase())})).map(function(e){return u.a.createElement("li",{key:e.name},e.name," ",e.number," ",u.a.createElement("button",{onClick:function(){return a(e)}},"delete"))})},p=function(e){var n=e.message;return null===n?null:u.a.createElement("div",{className:n.successful?"success":"error"},n.text)},w=function(){var e=Object(a.useState)([]),n=Object(r.a)(e,2),t=n[0],c=n[1],o=Object(a.useState)(""),l=Object(r.a)(o,2),i=l[0],m=l[1],w=Object(a.useState)(""),g=Object(r.a)(w,2),C=g[0],j=g[1],O=Object(a.useState)(""),S=Object(r.a)(O,2),k=S[0],x=S[1],N=Object(a.useState)(null),y=Object(r.a)(N,2),T=y[0],A=y[1];Object(a.useEffect)(function(){s().then(function(e){c(e.data)})},[]);return u.a.createElement("div",null,u.a.createElement("h2",null,"Phonebook"),u.a.createElement(p,{message:T}),u.a.createElement(h,{value:i,onChange:function(e){m(e.target.value)}}),u.a.createElement("h3",null," Add a new"),u.a.createElement(v,{onSubmit:function(e){e.preventDefault();var n={name:C,number:k},a=t.filter(function(e){return e.name===C});a.length>0?window.confirm("".concat(C," is already added to phonebook, replace the old number with a new one?"))&&(b(a[0].id,n).then(function(){s().then(function(e){c(e.data),j(""),x("")})}).catch(function(){A({text:"Person '".concat(C,"' was already removed from server"),successful:!1}),setTimeout(function(){A(null)},3e3),c(t.filter(function(e){return e.id!==n.id}))}),A({text:"Edited ".concat(C),successful:!0}),setTimeout(function(){A(null)},3e3)):(c(t.concat({name:C,number:k})),f(n).then(function(e){c(t.concat(e.data)),j(""),x("")}),A({text:"Added ".concat(C),successful:!0}),setTimeout(function(){A(null)},3e3))},name:C,number:k,onNameChange:function(e){j(e.target.value)},onNumberChange:function(e){x(e.target.value)}}),u.a.createElement("h3",null,"Numbers"),u.a.createElement(E,{filter:i,persons:t,remove:function(e){window.confirm("Delete ".concat(e.name,"?"))&&(d(e).then(function(){c(t.filter(function(n){return n.id!==e.id}))}),A({text:"Removed ".concat(e.name),successful:!0}),setTimeout(function(){A(null)},3e3))}}))};t(37);o.a.render(u.a.createElement(w,null),document.getElementById("root"))}},[[14,1,2]]]);
//# sourceMappingURL=main.b6864610.chunk.js.map