(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-2d224504"],{e036:function(t,e,a){"use strict";a.r(e);var s=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("table",[a("thead",[a("tr",[a("th",[t._v("#")]),a("th",[t._v(t._s(t._f("localize")("Amount")))]),a("th",[t._v(t._s(t._f("localize")("Date")))]),a("th",[t._v(t._s(t._f("localize")("Category")))]),a("th",[t._v(t._s(t._f("localize")("Type")))]),a("th",[t._v(t._s(t._f("localize")("Open")))])])]),a("tbody",t._l(t.records,(function(e){return a("tr",{key:e.id},[a("td",[t._v(t._s(e.index))]),a("td",[t._v(t._s(t._f("currency")(e.amount,"RUB")))]),a("td",[t._v(t._s(t._f("date")(e.date,"datetime")))]),a("td",[t._v(t._s(e.categoryName))]),a("td",[a("span",{staticClass:"white-text badge",class:[e.typeClass]},[t._v(t._s(e.typeText))])]),a("td",[a("button",{directives:[{name:"tooltip",rawName:"v-tooltip",value:"Посмотреть запись",expression:"'Посмотреть запись'"}],staticClass:"btn-small btn",on:{click:function(a){return t.$router.push("/detail/"+e.id)}}},[a("i",{staticClass:"material-icons"},[t._v("open_in_new")])])])])})),0)])},n=[],l={name:"HistoryTable",props:{records:{required:!0,type:Array}}},i=l,r=a("2877"),_=Object(r["a"])(i,s,n,!1,null,null,null);e["default"]=_.exports}}]);