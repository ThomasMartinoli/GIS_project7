(window.webpackJsonp=window.webpackJsonp||[]).push([[166],{436:function(e,t,r){"use strict";r.r(t);var a=r(3),n=r(16),o=r(23),s=r(36),i=r(25),c=r(32),l=r(122),u=r(17),w=r(4),g=r(12),d=r(0),p=r(41),f=[null],b=Object(d.r)(f,{nd:function(e,t){t[t.length-1].ndrefs.push(e.getAttribute("ref"))},tag:y}),h=Object(d.r)(f,{node:function(e,t){var r=t[0],a=t[t.length-1],o=e.getAttribute("id"),s=[parseFloat(e.getAttribute("lon")),parseFloat(e.getAttribute("lat"))];a.nodes[o]=s;var c=Object(d.u)({tags:{}},m,e,t);if(!Object(g.d)(c.tags)){var l=new i.a(s);Object(p.c)(l,!1,r);var u=new n.a(l);u.setId(o),u.setProperties(c.tags,!0),a.features.push(u)}},way:function(e,t){var r=e.getAttribute("id"),a=Object(d.u)({id:r,ndrefs:[],tags:{}},b,e,t);t[t.length-1].ways.push(a)}}),v=function(e){function t(){e.call(this),this.dataProjection=Object(w.j)("EPSG:4326")}return e&&(t.__proto__=e),t.prototype=Object.create(e&&e.prototype),t.prototype.constructor=t,t.prototype.readFeaturesFromNode=function(e,t){var r=this.getReadOptions(e,t);if("osm"==e.localName){for(var a=Object(d.u)({nodes:{},ways:[],features:[]},h,e,[r]),i=0;i<a.ways.length;i++){for(var l=a.ways[i],w=[],g=0,f=l.ndrefs.length;g<f;g++){var b=a.nodes[l.ndrefs[g]];Object(u.c)(w,b)}var v=void 0;v=l.ndrefs[0]==l.ndrefs[l.ndrefs.length-1]?new c.b(w,o.a.XY,[w.length]):new s.a(w,o.a.XY),Object(p.c)(v,!1,r);var m=new n.a(v);m.setId(l.id),m.setProperties(l.tags,!0),a.features.push(m)}if(a.features)return a.features}return[]},t}(l.a),m=Object(d.r)(f,{tag:y});function y(e,t){t[t.length-1].tags[e.getAttribute("k")]=e.getAttribute("v")}var j=v,O=r(10),k=r(2),_=r(27),A=r(11),P=r(15),x=r(21),F=r(48),z=r(19),E=r(5),M=r(132),T=null,I={amenity:{parking:new A.c({stroke:new P.a({color:"rgba(170, 170, 170, 1.0)",width:1}),fill:new x.a({color:"rgba(170, 170, 170, 0.3)"})})},building:{".*":new A.c({zIndex:100,stroke:new P.a({color:"rgba(246, 99, 79, 1.0)",width:1}),fill:new x.a({color:"rgba(246, 99, 79, 0.3)"})})},highway:{service:new A.c({stroke:new P.a({color:"rgba(255, 255, 255, 1.0)",width:2})}),".*":new A.c({stroke:new P.a({color:"rgba(255, 255, 255, 1.0)",width:3})})},landuse:{"forest|grass|allotments":new A.c({stroke:new P.a({color:"rgba(140, 208, 95, 1.0)",width:1}),fill:new x.a({color:"rgba(140, 208, 95, 0.3)"})})},natural:{tree:new A.c({image:new F.a({radius:2,fill:new x.a({color:"rgba(140, 208, 95, 1.0)"}),stroke:null})})}},S=new O.a({format:new j,loader:function(e,t,r){var a=Object(w.t)(e,r,"EPSG:4326"),n=new XMLHttpRequest;n.open("POST","https://overpass-api.de/api/interpreter"),n.addEventListener("load",(function(){var e=(new j).readFeatures(n.responseText,{featureProjection:T.getView().getProjection()});S.addFeatures(e)}));var o="(node("+a[1]+","+Math.max(a[0],-180)+","+a[3]+","+Math.min(a[2],180)+");rel(bn)->.foo;way(bn);node(w)->.foo;rel(bw););out meta;";n.send(o)},strategy:M.b}),X=new z.a({source:S,style:function(e){for(var t in I){var r=e.get(t);if(void 0!==r)for(var a in I[t])if(new RegExp(a).test(r))return I[t][a]}return null}}),G=new E.a({source:new _.a({attributions:'<a href="https://www.maptiler.com/copyright/" target="_blank">&copy; MapTiler</a> <a href="https://www.openstreetmap.org/copyright" target="_blank">&copy; OpenStreetMap contributors</a>',url:"https://api.maptiler.com/tiles/satellite/{z}/{x}/{y}.jpg?key=get_your_own_D6rA4zTHduk6KOKTXzGB",maxZoom:20})});T=new a.a({layers:[G,X],target:document.getElementById("map"),view:new k.a({center:[739218,5906096],maxZoom:19,zoom:17})})}},[[436,0]]]);
//# sourceMappingURL=vector-osm.js.map