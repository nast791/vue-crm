(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-2d21a3d2"],{bb51:function(e,t,n){"use strict";n.r(t);var r=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",[n("div",{staticClass:"page-title"},[n("h3",[e._v("Счет")]),n("button",{staticClass:"btn waves-effect waves-light btn-small",on:{click:e.refresh}},[n("i",{staticClass:"material-icons"},[e._v("refresh")])])]),e.loading?n("Loader"):n("div",{staticClass:"row"},[n("HomeBill",{attrs:{rates:e.currency.rates}}),n("HomeCurrency",{attrs:{rates:e.currency.rates,date:new Date(1e3*e.currency.timestamp)}})],1)],1)},a=[],c=(n("d3b7"),n("96cf"),n("1da1")),s={name:"Home",data:function(){return{loading:!0,currency:null}},components:{HomeBill:function(){return n.e("chunk-2d20f156").then(n.bind(null,"b1b3"))},HomeCurrency:function(){return n.e("chunk-2d212c40").then(n.bind(null,"aa8b"))}},methods:{refresh:function(){var e=this;return Object(c["a"])(regeneratorRuntime.mark((function t(){return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:return e.loading=!0,t.next=3,e.$store.dispatch("fetchCurrency");case 3:e.currency=t.sent,e.loading=!1;case 5:case"end":return t.stop()}}),t)})))()}},mounted:function(){var e=this;return Object(c["a"])(regeneratorRuntime.mark((function t(){return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:return t.next=2,e.$store.dispatch("fetchCurrency");case 2:e.currency=t.sent,e.loading=!1;case 4:case"end":return t.stop()}}),t)})))()}},u=s,i=n("2877"),o=Object(i["a"])(u,r,a,!1,null,null,null);t["default"]=o.exports}}]);