"use strict";(self.webpackChunkant_design_pro=self.webpackChunkant_design_pro||[]).push([[340],{5842:function(te,A,e){var p=e(86378),o=e.n(p),j=e(58357),a=e.n(j),R=e(71977),D=e.n(R),S=e(28488),_=e.n(S),c=e(50959),s=e(15663),u=e(26161),Q=e(53801),y=e(11527),K=["propCode","onChange"],Y=function(m){var x=m.propCode,L=m.onChange,M=_()(m,K),I=(0,Q.Z)(s.fQ,{manual:!0,cacheKey:"STATIC_".concat(x),staleTime:3e5}),i=I.runAsync,F=function(l){L&&L(l.target.value)};return(0,y.jsx)(u.Z,o()(o()({request:D()(a()().mark(function T(){var l;return a()().wrap(function(z){for(;;)switch(z.prev=z.next){case 0:return z.next=2,i({query:{propCode:x,state:1},pageNo:1,pageSize:999});case 2:return l=z.sent,z.abrupt("return",l.data.result.map(function(B){return{label:B.valueName,value:+B.valueCode}}));case 4:case"end":return z.stop()}},T)}))},M),{},{radioProps:o()({onChange:F},M==null?void 0:M.radioProps)}))};A.Z=Y},28352:function(te,A,e){var p=e(70479),o=e(11527),j=function(R){var D=R.name,S=p[D];return(0,o.jsx)(S,{})};A.Z=j},26253:function(te,A,e){var p=e(86378),o=e.n(p),j=e(30577),a=e.n(j),R=e(28488),D=e.n(R),S=e(12632),_=e(50959),c=e(53690),s=e(11527),u=["auth","children"],Q=function(K){var Y=K.auth,ee=K.children,m=D()(K,u),x=(0,c.useModel)("@@initialState"),L=x.initialState,M=L,I=M.currentUser,i=(0,_.useState)(function(){var l;return Y!==void 0?!!(I!=null&&I.authButton&&(l=I.authButton)!==null&&l!==void 0&&l.has(Y)):!0}),F=a()(i,1),T=F[0];return(0,s.jsx)(s.Fragment,{children:T?(0,s.jsx)(S.ZP,o()(o()({},m),{},{children:ee})):(0,s.jsx)(s.Fragment,{})})};A.Z=Q},4643:function(te,A,e){var p=e(58357),o=e.n(p),j=e(86378),a=e.n(j),R=e(71977),D=e.n(R),S=e(30577),_=e.n(S),c=e(28488),s=e.n(c),u=e(40039),Q=e(50959),y=e(53690),K=e(93789),Y=e(13655),ee=e(5061),m=e(11527),x=["auth","table"],L=K.Z.Text,M=function(i){var F,T=i.auth,l=i.table,N=s()(i,x),z=(0,y.useModel)("@@initialState"),B=z.initialState,n=B,w=n.currentUser,fe=(0,Q.useState)(function(){var v;return T!==void 0?!!(w!=null&&w.authButton&&(v=w.authButton)!==null&&v!==void 0&&v.has(T)):!0}),Ee=_()(fe,1),be=Ee[0];return(0,m.jsx)(m.Fragment,{children:be?(0,m.jsx)(u.Z,a()(a()({tableLayout:"auto",size:"middle",rowKey:(l==null?void 0:l.rowKey)||N.rowKey,request:function(){var v=D()(o()().mark(function ve(W){var ne,le,Oe,me,De,Pe,re,Ce,ye;return o()().wrap(function(H){for(;;)switch(H.prev=H.next){case 0:return ne=W.pageSize,le=W.current,Oe=W.formValues,me=a()(a()({},Oe),l==null?void 0:l.requestParam),l!=null&&l.onSearchBefore&&(me=l.onSearchBefore(me)),H.next=5,l==null?void 0:l.request({pageNo:le,pageSize:ne,query:me});case 5:if(De=H.sent,Pe=De.success,re=De.data,Ce=re.result,ye=re.totalNum,!(l!=null&&l.onSearchAfter)){H.next=12;break}return H.abrupt("return",l==null?void 0:l.onSearchAfter({total:ye,success:Pe,data:Ce}));case 12:return H.abrupt("return",{total:ye,success:Pe,data:Ce});case 13:case"end":return H.stop()}},ve)}));return function(ve){return v.apply(this,arguments)}}()},N),{},{columns:(F=N.columns)===null||F===void 0?void 0:F.map(function(v){return v.ellipsis?a()(a()({},v),{},{render:function(W,ne,le){return v.render&&v.render(W,ne,le),(0,m.jsx)(L,{style:{width:v.width||200},ellipsis:{tooltip:{title:W}},children:v!=null&&v.render?v.render(W,ne,le):W})}}):v})})):(0,m.jsx)(Y.ZP,{renderEmpty:function(){return(0,m.jsxs)("div",{style:{textAlign:"center"},children:[(0,m.jsx)(ee.Z,{style:{fontSize:26,margin:"16px 0"}}),(0,m.jsx)("p",{children:"\u6682\u65E0\u6743\u9650"})]})},children:(0,m.jsx)(u.Z,a()(a()({tableLayout:"auto",size:"middle"},N),{},{formItems:[],request:D()(o()().mark(function v(){return o()().wrap(function(W){for(;;)switch(W.prev=W.next){case 0:return W.abrupt("return",{total:0,success:!1,data:[]});case 1:case"end":return W.stop()}},v)})),toolbarActionConfig:{showReload:!1,showColumnSetting:!1,showDensity:!1,showFullscreen:!1}}))})})};A.Z=M},65571:function(te,A,e){var p=e(86378),o=e.n(p),j=e(28488),a=e.n(j),R=e(50959),D=e(79804),S=e(11527),_=["children"],c=function(u){var Q=u.children,y=a()(u,_);return(0,S.jsx)(D.Z,o()(o()({style:{height:"calc(100vh - 160px)",overflowY:"auto"}},y),{},{children:Q}))};A.Z=c},24898:function(te,A,e){var p=e(86378),o=e.n(p),j=e(30577),a=e.n(j),R=e(53690),D=e(84560),S=e(56684),_=e(32499),c=e(50959),s=e(11527),u=function(y){var K=y.popconfirmProps,Y=y.valueName,ee=y.SwitchProps,m=y.checked,x=y.loading,L=y.disabled,M=L===void 0?!1:L,I=y.checkedTitle,i=I===void 0?"\u542F\u7528":I,F=y.unCheckedTitle,T=F===void 0?"\u7981\u7528":F,l=y.onConfirm,N=y.editAuth,z=(0,R.useModel)("@@initialState"),B=z.initialState,n=B,w=n.currentUser,fe=(0,c.useState)(function(){var v;return N!==void 0?!!(w!=null&&w.authButton&&(v=w.authButton)!==null&&v!==void 0&&v.has(N)):!0}),Ee=a()(fe,1),be=Ee[0];return(0,s.jsx)("div",{children:be?M?(0,s.jsx)(D.Z,o()(o()({unCheckedChildren:T,checkedChildren:i,disabled:M,loading:x},ee),{},{checked:m})):(0,s.jsx)(S.Z,o()(o()({placement:"topRight",okText:"\u786E\u5B9A",cancelText:"\u53D6\u6D88",title:(0,s.jsxs)(s.Fragment,{children:["\u60A8\u786E\u5B9A",m?(0,s.jsx)(_.Z,{color:"red",style:{marginLeft:8},children:T}):(0,s.jsx)(_.Z,{color:"success",style:{marginLeft:8},children:i}),(0,s.jsx)(_.Z,{color:"default",children:Y}),"\u5417\uFF1F"]})},K),{},{onConfirm:l,children:(0,s.jsx)(D.Z,o()(o()({unCheckedChildren:T,checkedChildren:i,disabled:M,loading:x},ee),{},{checked:m}))})):m?(0,s.jsx)(_.Z,{color:"success",children:i}):(0,s.jsx)(_.Z,{color:"error",children:T})})};A.Z=u},39801:function(te,A,e){e.r(A),e.d(A,{default:function(){return Ue}});var p=e(58357),o=e.n(p),j=e(86378),a=e.n(j),R=e(71977),D=e.n(R),S=e(30577),_=e.n(S),c=e(26253),s=e(4643),u=e(65571),Q=e(24898),y=e(35396),K=e(63386),Y=e(78177),ee=e(88536),m=e(53801),x=e(6445),L=e(32499),M=e(80650),I=e(80361),i=e(50959),F=e(28488),T=e.n(F),l=e(5842),N=e(43735),z=e(52163),B=e(275),n=e(11527),w=["data","onChange","open"],fe=function(d){var t=d.data,O=d.onChange,b=d.open,P=T()(d,w),k=N.Z.useForm(),oe=_()(k,1),G=oe[0],ue=(0,m.Z)(B.dZ,{manual:!0,onSuccess:function(U){U.success&&(O(),x.ZP.success("\u64CD\u4F5C\u6210\u529F"))}}),E=ue.runAsync;return(0,i.useEffect)(function(){b&&t?G.setFieldsValue(t):G.setFieldValue("state",1)},[b]),(0,n.jsxs)(z.Z,a()(a()({open:b,form:G,width:700,labelCol:{span:7},wrapperCol:{span:14},forceRender:!0,title:t?"\u4FEE\u6539\u4FE1\u606F":"\u65B0\u5EFA\u89D2\u8272",onFinish:function(){var ae=D()(o()().mark(function U(de){var $,X;return o()().wrap(function(Z){for(;;)switch(Z.prev=Z.next){case 0:return Z.next=2,E(a()(a()({},t),de));case 2:return $=Z.sent,X=$.success,Z.abrupt("return",X);case 5:case"end":return Z.stop()}},U)}));return function(U){return ae.apply(this,arguments)}}(),modalProps:{afterClose:function(){return G.resetFields()},wrapClassName:"modal_wrap_render"}},P),{},{children:[(0,n.jsx)(I.Z,{name:"roleName",required:!0,label:"\u89D2\u8272\u540D\u79F0"}),(0,n.jsx)(I.Z,{name:"roleDesc",label:"\u89D2\u8272\u63CF\u8FF0"}),(0,n.jsx)(l.Z,{label:"\u72B6\u6001",required:!0,name:"state",propCode:"status",radioProps:{disabled:(t==null?void 0:t.roleId)===9999}})]}))},Ee=fe,be=e(90967),v=e.n(be),ve=e(28352),W=e(75702),ne=e(1536),le=e(17592),Oe=e(73834),me=e(8899),De={treeSlider:"treeSlider___OkqTO"},Pe=["loading","treeList","checkable","control","placeholder"],re=[],Ce=function J(d){for(var t=0;t<d.length;t++){var O=d[t],b=O.key,P=O.title;re.push({key:b,title:P}),O.children&&J(O.children)}},ye=function J(d,t){for(var O,b=0;b<t.length;b++){var P=t[b];P.children&&(P.children.some(function(k){return k.key===d})?O=P.key:J(d,P.children)&&(O=J(d,P.children)))}return O},Re=function(d){var t=d.loading,O=t===void 0?!1:t,b=d.treeList,P=d.checkable,k=P===void 0?!0:P,oe=d.control,G=oe===void 0?!0:oe,ue=d.placeholder,E=T()(d,Pe),ae=(0,i.useState)([]),U=_()(ae,2),de=U[0],$=U[1],X=(0,i.useState)(!0),V=_()(X,2),Z=V[0],C=V[1],Ae=(0,i.useState)(!1),ie=_()(Ae,2),_e=ie[0],he=ie[1],ge=(0,i.useState)(!1),pe=_()(ge,2),ce=pe[0],q=pe[1];(0,i.useEffect)(function(){b&&Ce(b)},[b]);var h=function(se){$(se),C(!1)},r=function(se){var f=se.target.value,je=re.map(function(Me){return Me.title.indexOf(f)>-1?ye(Me.key,b):null}).filter(function(Me,Ze,Ke){return Me&&Ke.indexOf(Me)===Ze});$(je),C(!0)};return(0,n.jsxs)(n.Fragment,{children:[k&&G&&(0,n.jsxs)(ne.Z.Group,{style:{margin:"6px 0px 0"},children:[(0,n.jsx)(ne.Z,{checked:_e,value:"1",onChange:function(se){if(_e)$([]);else{var f=[].concat(re).map(function(je){return je.key});$(f)}C(!_e),he(!_e)},children:"\u5C55\u5F00/\u6298\u53E0"}),(0,n.jsx)(ne.Z,{checked:ce,value:"2",onClick:function(){if(ce)E!=null&&E.onCheck&&(E==null||E.onCheck([],{}));else{console.log(re);var se=re.map(function(f){return f.key});E!=null&&E.onCheck&&(E==null||E.onCheck(se,{}))}q(!ce)},children:"\u5168\u9009/\u5168\u4E0D\u9009"})]}),(0,n.jsx)("div",{className:De.treeSlider,children:(0,n.jsxs)(le.Z,{spinning:O,children:[(0,n.jsx)(Oe.Z,{style:{marginBottom:8},addonAfter:(0,n.jsx)(W.Z,{}),placeholder:ue,onChange:r}),(0,n.jsx)(me.Z,a()({blockNode:!0,checkable:k,onExpand:h,expandedKeys:de,autoExpandParent:Z,treeData:b},E))]})})]})},H=Re,Se=e(44147),Ie=e(50826),Te=["roleData","onChange","open","isApp","setIsApp"],We=function J(d){return d.forEach(function(t){t.key=t.nodeId,t.title=t.nodeName,t.children&&J(t.children)}),d},xe=function(d){var t=d.roleData,O=d.onChange,b=d.open,P=d.isApp,k=d.setIsApp,oe=T()(d,Te),G=N.Z.useForm(),ue=_()(G,1),E=ue[0],ae=(0,i.useState)([]),U=_()(ae,2),de=U[0],$=U[1],X=(0,i.useRef)(!1),V=(0,m.Z)(P?B.T4:B.$E,{manual:!0,onSuccess:function(r){if(r.success){var g=r.data;$(We(g.nodes)),E.setFieldsValue({checkedIds:g.checkedIds})}}}),Z=V.data,C=Z===void 0?{nodes:[],checkedIds:[],halfCheckedIds:[]}:Z,Ae=V.run,ie=V.loading,_e=V.mutate,he=(0,m.Z)(B.R2,{manual:!0,onSuccess:function(r){r.success&&(O(),x.ZP.success("\u64CD\u4F5C\u6210\u529F"))}}),ge=he.runAsync,pe=(0,m.Z)(B.gh,{manual:!0,onSuccess:function(r){r.success&&(O(),x.ZP.success("\u64CD\u4F5C\u6210\u529F"))}}),ce=pe.runAsync,q=function(r,g){X.current=!0,_e(a()(a()({},C),{},{checkedIds:r,halfCheckedIds:(g==null?void 0:g.halfCheckedKeys)||[]}))};return(0,i.useEffect)(function(){b&&t&&(Ae({roleId:t.roleId}),E.setFieldsValue(t))},[b]),(0,n.jsxs)(Se.Z,a()(a()({open:b,onOpenChange:function(){},form:E,title:t?"\u4FEE\u6539\u4FE1\u606F":"\u65B0\u5EFA\u89D2\u8272",onFinish:D()(o()().mark(function h(){var r,g;return o()().wrap(function(f){for(;;)switch(f.prev=f.next){case 0:if(!X.current){f.next=13;break}if(!P){f.next=7;break}return f.next=4,ce({btnIds:[].concat(v()(C==null?void 0:C.checkedIds),v()(C==null?void 0:C.halfCheckedIds)),roleId:t.roleId});case 4:f.t0=f.sent,f.next=10;break;case 7:return f.next=9,ge({menuCodes:[].concat(v()(C==null?void 0:C.checkedIds),v()(C==null?void 0:C.halfCheckedIds)),roleId:t.roleId});case 9:f.t0=f.sent;case 10:return r=f.t0,g=r.success,f.abrupt("return",g);case 13:return f.abrupt("return",!0);case 14:case"end":return f.stop()}},h)})),drawerProps:{afterOpenChange:function(){k(!1),X.current=!1,E.resetFields()}},isEnterSubmit:!1},oe),{},{children:[(0,n.jsx)(I.Z,{name:"roleName",label:"\u89D2\u8272\u540D\u79F0",disabled:!0}),(0,n.jsx)(I.Z,{name:"roleDesc",label:"\u89D2\u8272\u63CF\u8FF0",disabled:!0}),(0,n.jsx)(Ie.Z,{valuePropName:"checkedKeys",trigger:"onCheck",name:"checkedIds",label:"\u83DC\u5355\u5217\u8868",children:(0,n.jsx)(H,{loading:ie,treeList:de,onCheck:q,checkable:!0,checkStrictly:!1,placeholder:"\u83DC\u5355\u7B5B\u9009",titleRender:function(r){return(0,n.jsx)(M.Z,{size:"small",children:r.nodeData.menuType===2?(0,n.jsxs)(n.Fragment,{children:[r.nodeData.menuUrl&&(0,n.jsx)(L.Z,{color:"green",style:{marginRight:0},children:"\u6309\u94AE"}),r.nodeData.urlPath&&(0,n.jsx)(L.Z,{color:"blue",style:{marginRight:0},children:"URL"}),(0,n.jsxs)("div",{style:{color:"#848587"},children:[P?r.nodeData.name:r.nodeData.menuName,"\uFF1A".concat(P?r.nodeData.describe:r.nodeData.menuDesc||"")]})]}):(0,n.jsxs)(n.Fragment,{children:[r.nodeData.icon?(0,n.jsx)(ve.Z,{name:r.nodeData.icon}):null,P?r.nodeData.name:r.nodeData.menuName,(r==null?void 0:r.children)&&(r==null?void 0:r.children.length)>0&&(0,n.jsx)("span",{style:{color:"#BDBDBD",letterSpacing:1},children:" (".concat(r==null?void 0:r.children.length,")")})]})})}})})]}))},Be=xe,Le=function(){var d=(0,i.useRef)(),t=(0,i.useRef)(),O=(0,i.useState)(!1),b=_()(O,2),P=b[0],k=b[1],oe=(0,i.useState)(!1),G=_()(oe,2),ue=G[0],E=G[1],ae=(0,i.useState)(),U=_()(ae,2),de=U[0],$=U[1],X=(0,i.useState)(),V=_()(X,2),Z=V[0],C=V[1],Ae=(0,i.useState)(!1),ie=_()(Ae,2),_e=ie[0],he=ie[1],ge=(0,m.Z)(B.dZ,{manual:!0,onSuccess:function(h){if(h.success){var r;(r=t.current)===null||r===void 0||r.onSearch(),x.ZP.success("\u64CD\u4F5C\u6210\u529F")}}}),pe=ge.runAsync,ce=[{title:"\u89D2\u8272\u540D\u79F0",dataIndex:"roleName",align:"center",render:function(h){return(0,n.jsx)(L.Z,{children:h})}},{title:"\u89D2\u8272\u63CF\u8FF0",dataIndex:"roleDesc",align:"center"},{title:"\u72B6\u6001",dataIndex:"state",align:"center",render:function(h,r){return(0,n.jsx)(Q.Z,{disabled:r.roleId===9999,checked:h===1,valueName:r.roleName,editAuth:"sys:role:update",onConfirm:D()(o()().mark(function g(){return o()().wrap(function(f){for(;;)switch(f.prev=f.next){case 0:pe(a()(a()({},r),{},{state:h===1?0:1}));case 1:case"end":return f.stop()}},g)}))})}},{title:"\u521B\u5EFA\u65F6\u95F4",dataIndex:"createTime",align:"center"},{key:"actions",title:"\u64CD\u4F5C",width:280,fixed:"right",align:"center",render:function(h,r){return(0,n.jsxs)(M.Z,{className:"action_bar",children:[(0,n.jsx)(c.Z,{icon:(0,n.jsx)(y.Z,{}),auth:"sys:role:update",type:"link",onClick:function(){$(a()({},r)),k(!0)},children:"\u4FEE\u6539"}),(0,n.jsx)(c.Z,{type:"link",auth:"sys:role:menu:tree",onClick:function(){C(a()({},r)),E(!0)},children:(0,n.jsxs)(M.Z,{size:4,children:[(0,n.jsx)(K.Z,{}),"\u83DC\u5355\u6743\u9650"]})}),(0,n.jsx)(c.Z,{type:"link",auth:"sys:role:App:tree",onClick:function(){C(a()({},r)),he(!0),E(!0)},children:(0,n.jsxs)(M.Z,{size:4,children:[(0,n.jsx)(K.Z,{}),"APP\u6743\u9650"]})})]})}}];return(0,n.jsx)(ee._z,{children:(0,n.jsxs)(u.Z,{children:[(0,n.jsx)(s.Z,{isSort:!0,auth:"sys:role:list",toolbarLeft:(0,n.jsx)(n.Fragment,{children:(0,n.jsx)(c.Z,{auth:"sys:role:create",type:"primary",onClick:function(){$(void 0),k(!0)},icon:(0,n.jsx)(Y.Z,{}),children:"\u65B0\u589E"})}),formItems:[(0,n.jsx)(I.Z,{name:"roleName",label:"\u89D2\u8272\u540D\u79F0"},"0")],tableRef:t,formRef:d,columns:ce,table:{rowKey:"roleId",request:B.Sj}}),(0,n.jsx)(Ee,{open:P,onOpenChange:k,data:de,onChange:function(){var h;(h=t.current)===null||h===void 0||h.onReload()}}),(0,n.jsx)(Be,{open:ue,isApp:_e,setIsApp:he,onOpenChange:E,roleData:Z,onChange:function(){var h;(h=t.current)===null||h===void 0||h.onReload()}})]})})},Ue=Le},275:function(te,A,e){e.d(A,{$E:function(){return a},R2:function(){return R},Sj:function(){return o},T4:function(){return c},dZ:function(){return j},gh:function(){return D}});var p=e(19708),o=function(u){return(0,p.v_)("/service-sysmgr/auth/RoleController/pageRole",u)},j=function(u){return u.roleId?(0,p.v_)("/service-sysmgr/auth/RoleController/updateRole",u):(0,p.v_)("/service-sysmgr/auth/RoleController/createRole",u)},a=function(u){return(0,p.U2)("/service-sysmgr/auth/AuthController/getCheckedRoleTreeNode",u)},R=function(u){return(0,p.v_)("/service-sysmgr/auth/AuthController/doRoleRelaMenu",u)},D=function(u){return(0,p.v_)("/service-sysmgr/auth/AuthController/doRoleRelaButton",u)},S=function(u){return post("/service-sysmgr/auth/AuthController/doRoleRelaUrlGroup",u)},_=function(u){return get("/service-sysmgr/auth/AuthController/getCheckedRoleUrlGroup",u)},c=function(u){return(0,p.U2)("/service-sysmgr/auth/AuthController/getRoleBtnTreeNode",u)}},15663:function(te,A,e){e.d(A,{No:function(){return S},Tx:function(){return D},fQ:function(){return R}});var p=e(19708),o=function(c){return post("/service-obs/auth/FileController/fileUpload",c)},j=function(c){return download("/service-obs/auth/FileController/download",{method:"GET",params:c})},a=function(c){return download("/service-obs/auth/ZipFileController/downloadZip",{method:"POST",data:c,fileName:c.fileName})},R=function(c){return(0,p.v_)("/service-sysmgr/auth/PropertyController/pageValue",c)},D=function(c){return(0,p.v_)("/service-league/LeagueController/auth/pageLeague",c)},S=function(c){return(0,p.U2)("/service-league/LeagueController/auth/getPublicOrgChildren",c)}}}]);
