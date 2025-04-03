(()=>{"use strict";class t{static projection(t,o,e){return[2/t,0,0,0,0,-2/o,0,0,0,0,2/e,0,-1,1,0,1]}static perspective(t,o,e,n){const i=Math.tan(.5*Math.PI-.5*t),r=1/(e-n);return[i/o,0,0,0,0,i,0,0,0,0,(e+n)*r,-1,0,0,e*n*r*2,0]}static multiply(t,o){const e=t[0],n=t[1],i=t[2],r=t[3],s=t[4],a=t[5],c=t[6],l=t[7],h=t[8],u=t[9],p=t[10],d=t[11],x=t[12],v=t[13],m=t[14],b=t[15],y=o[0],g=o[1],f=o[2],z=o[3],_=o[4],C=o[5],w=o[6],S=o[7],R=o[8],E=o[9],P=o[10],A=o[11],F=o[12],M=o[13],N=o[14],$=o[15];return[y*e+g*s+f*h+z*x,y*n+g*a+f*u+z*v,y*i+g*c+f*p+z*m,y*r+g*l+f*d+z*b,_*e+C*s+w*h+S*x,_*n+C*a+w*u+S*v,_*i+C*c+w*p+S*m,_*r+C*l+w*d+S*b,R*e+E*s+P*h+A*x,R*n+E*a+P*u+A*v,R*i+E*c+P*p+A*m,R*r+E*l+P*d+A*b,F*e+M*s+N*h+$*x,F*n+M*a+N*u+$*v,F*i+M*c+N*p+$*m,F*r+M*l+N*d+$*b]}static inverse(t){const o=t[0],e=t[1],n=t[2],i=t[3],r=t[4],s=t[5],a=t[6],c=t[7],l=t[8],h=t[9],u=t[10],p=t[11],d=t[12],x=t[13],v=t[14],m=t[15],b=u*m,y=v*p,g=a*m,f=v*c,z=a*p,_=u*c,C=n*m,w=v*i,S=n*p,R=u*i,E=n*c,P=a*i,A=l*x,F=d*h,M=r*x,N=d*s,$=r*h,L=l*s,k=o*x,O=d*e,D=o*h,T=l*e,j=o*s,B=r*e,I=b*s+f*h+z*x-(y*s+g*h+_*x),U=y*e+C*h+R*x-(b*e+w*h+S*x),V=g*e+w*s+E*x-(f*e+C*s+P*x),q=_*e+S*s+P*h-(z*e+R*s+E*h),G=1/(o*I+r*U+l*V+d*q);return[G*I,G*U,G*V,G*q,G*(y*r+g*l+_*d-(b*r+f*l+z*d)),G*(b*o+w*l+S*d-(y*o+C*l+R*d)),G*(f*o+C*r+P*d-(g*o+w*r+E*d)),G*(z*o+R*r+E*l-(_*o+S*r+P*l)),G*(A*c+N*p+$*m-(F*c+M*p+L*m)),G*(F*i+k*p+T*m-(A*i+O*p+D*m)),G*(M*i+O*c+j*m-(N*i+k*c+B*m)),G*(L*i+D*c+B*p-($*i+T*c+j*p)),G*(M*u+L*v+F*a-($*v+A*a+N*u)),G*(D*v+A*n+O*u-(k*u+T*v+F*n)),G*(k*a+B*v+N*n-(j*v+M*n+O*a)),G*(j*u+$*n+T*a-(D*a+B*u+L*n))]}static translation(t,o,e){return[1,0,0,0,0,1,0,0,0,0,1,0,t,o,e,1]}static xRotation(t){const o=Math.cos(t),e=Math.sin(t);return[1,0,0,0,0,o,e,0,0,-e,o,0,0,0,0,1]}static yRotation(t){const o=Math.cos(t),e=Math.sin(t);return[o,0,-e,0,0,1,0,0,e,0,o,0,0,0,0,1]}static zRotation(t){const o=Math.cos(t),e=Math.sin(t);return[o,e,0,0,-e,o,0,0,0,0,1,0,0,0,0,1]}static scaling(t,o,e){return[t,0,0,0,0,o,0,0,0,0,e,0,0,0,0,1]}static translate(o,e,n,i){return t.multiply(o,t.translation(e,n,i))}static xRotate(o,e){return t.multiply(o,t.xRotation(e))}static yRotate(o,e){return t.multiply(o,t.yRotation(e))}static zRotate(o,e){return t.multiply(o,t.zRotation(e))}static scale(o,e,n,i){return t.multiply(o,t.scaling(e,n,i))}static transformVector(t,o){let e=[];for(let n=0;n<4;++n){e[n]=0;for(let i=0;i<4;++i)e[n]+=o[i]*t[4*i+n]}return e}}const o=t,e=class{constructor(t,o){this.options={width:500,height:500,backgroundColor:[0,0,0,1]},this.$canvas=t,this.context=this.$canvas.getContext("webgl2"),this.options=Object.assign(Object.assign({},this.options),o),this.resizeCanvas(),this.clearCanvas()}renderTriangles(t,o,e,n){const{attributesData:i,verticesCount:r}=t,s=this.createProgram(this.createShader(WebGL2RenderingContext.VERTEX_SHADER,o),this.createShader(WebGL2RenderingContext.FRAGMENT_SHADER,e));this.context.useProgram(s);const a=this.context.getUniformLocation(s,"u_matrix");this.context.uniformMatrix4fv(a,!1,n),Object.keys(i).map((t=>{this.createBuffer(i[t].vertices);const o=this.context.getAttribLocation(s,t);this.context.vertexAttribPointer(o,i[t].vertexSize,this.context.FLOAT,!1,0,0),this.context.enableVertexAttribArray(o)})),this.context.drawArrays(this.context.TRIANGLES,0,r)}resizeCanvas(){const{width:t,height:o}=this.options;this.$canvas.width=t,this.$canvas.height=o,this.context.viewport(0,0,t,o)}clearCanvas(){this.context.clearColor(...this.options.backgroundColor),this.context.clearDepth(1),this.context.enable(this.context.DEPTH_TEST),this.context.depthFunc(this.context.LEQUAL),this.context.clear(this.context.COLOR_BUFFER_BIT|this.context.DEPTH_BUFFER_BIT)}createShader(t,o){const e=this.context.createShader(t);return this.context.shaderSource(e,o),this.context.compileShader(e),this.context.getShaderParameter(e,this.context.COMPILE_STATUS)?e:(console.log(this.context.getShaderInfoLog(e)),this.context.deleteShader(e),null)}createProgram(t,o){const e=this.context.createProgram();return this.context.attachShader(e,t),this.context.attachShader(e,o),this.context.linkProgram(e),this.context.getProgramParameter(e,this.context.LINK_STATUS)?e:(console.log(this.context.getProgramInfoLog(e)),this.context.deleteProgram(e),null)}createBuffer(t){const o=this.context.createBuffer();return this.context.bindBuffer(this.context.ARRAY_BUFFER,o),this.context.bufferData(this.context.ARRAY_BUFFER,new Float32Array(t),this.context.STATIC_DRAW),o}};class n{}n.vertexShader="#version 300 es\nin vec4 a_position;\nin vec4 a_color;\n\nuniform mat4 u_matrix;\n\nout vec4 vertex_Color;\n\nvoid main() {\n  gl_Position = u_matrix * a_position;\n\n  vertex_Color = a_color;\n}\n  ",n.fragmentShader="#version 300 es\n  precision highp float;\n\n  in vec4 vertex_Color;\n  \n  out vec4 outColor;\n \n  void main() {\n    outColor = vertex_Color;\n  }\n";const i=n;function r(t){return t*Math.PI/180}function s(t){const e=o.translate(o.xRotation(Math.PI),-50,-75,-15);for(var n=0;n<t.length;n+=3){var i=o.transformVector(e,[t[n+0],t[n+1],t[n+2],1]);t[n+0]=i[0],t[n+1]=i[1],t[n+2]=i[2]}return t}function a(t,o){const[e,n]=t.reduce(((t,o)=>[[...t[0],...o.verticesPositions[0],...o.verticesPositions[1],...o.verticesPositions[2]],[...t[1],...o.color,...o.color,...o.color]]),[[],[]]);return{attributesData:{a_color:{vertices:n,vertexSize:4},a_position:{vertices:s(e),vertexSize:o}},verticesCount:e.length/o,position:t[0].position,rotation:t[0].rotation}}function c(t,o){const e=[[0,0,0],[0,100,0],[100,100,0],[100,0,0]];return a(t.reduce(((t,o)=>[...t,Object.assign(Object.assign({},o),{verticesPositions:(o.verticesPositions||e).slice(0,3)}),Object.assign(Object.assign({},o),{verticesPositions:[(o.verticesPositions||e)[0],...(o.verticesPositions||e).slice(2,4)]})]),[]),o)}function l(t,o){const{position:e,colors:n,rotation:i,size:r}=t,s=[[0,0,0],[0,r.y,0],[r.x,r.y,0],[r.x,0,0],[0,0,r.z],[0,r.y,r.z],[r.x,r.y,r.z],[r.x,0,r.z]];return[{position:[e[0],e[1],e[2]],verticesPositions:[s[0],s[3],s[7],s[4]],rotation:i,color:n[0]},{position:[e[0],e[1],e[2]],verticesPositions:[s[0],s[1],s[5],s[4]],rotation:i,color:n[1]},{position:[e[0],e[1],e[2]],verticesPositions:s.slice(0,4),rotation:i,color:n[2]},{position:[e[0],e[1],e[2]],verticesPositions:[s[3],s[2],s[6],s[7]],rotation:{x:i.x,y:i.y,z:i.z},color:n[3]},{position:[e[0],e[1],e[2]],verticesPositions:[s[1],s[2],s[6],s[5]],rotation:i,color:n[4]},{position:[e[0],e[1],e[2]],verticesPositions:s.slice(4,8),rotation:i,color:n[5]}].map((t=>c([t],o)))}const h={"2d":{Triangle:a,Quadrilateral:c},"3d":{Hexahedron:l,Cube:function(t,o){const{size:e}=t;return l(Object.assign(Object.assign({},t),{size:{x:e,y:e,z:e}}),o)}},render(t,e,n,i,s){const a=e=>{var a,c,l;t.renderTriangles(e,n,i,(a=s,c=e.position,l=e.rotation,a=o.translate(a,c[0],c[1],c[2]),a=o.xRotate(a,r(l.y)),a=o.yRotate(a,r(l.x)),o.zRotate(a,r(l.z))))};Array.isArray(e)?e.map(a):a(e)}};class u{constructor(t){this.$container=document.querySelector(`#${t}`)}render(){this.$container.innerHTML=`\n  <h1>Rubik's Cussbe</h1>\n  \n  <canvas id="scene"></canvas>\n\n  <div id="controls">\n    <button class="scramble-controls">Scramble</button>\n\n    <p>Rotate:</p>\n    <div class="rotation-controls">\n      <button class="rotation-controls__button rotation-controls__button--up">V</button>\n      <button class="rotation-controls__button rotation-controls__button--left"><</button>\n      <button class="rotation-controls__button rotation-controls__button--right">></button>\n      <button class="rotation-controls__button rotation-controls__button--down">V</button>\n    </div>\n\n    <p>Move:</p>\n    <div class="move-controls">\n      <select class="move-controls__direction">\n        <option value="up">Up</option>\n        <option value="down">Down</option>\n        <option value="left">Left</option>\n        <option value="right">Right</option>\n      </select>\n      <div class="move-controls__position">\n        ${Array(3).fill(0).reduce(((t,o,e)=>t+`<button class="move-controls__position-button" position-index="${e}">${e+1}</button>`),"")}\n      </div>\n    </div>\n  <div>\n\n  <style>\n    #controls {\n      margin-top: 2rem;\n    }\n    .rotation-controls,\n    .move-controls {\n      font-size: 1.25rem;\n      display: flex;\n      flex-flow: row wrap;\n      align-content: center;\n      justify-content: center;\n      max-width: 6rem;\n      margin-left: auto;\n      margin-right: auto;\n      margin-top: 1rem;\n    }\n\n    .rotation-controls {\n      margin-bottom: 2rem;\n    }\n    .rotation-controls > * {\n      flex: 1 100%;\n    }\n    .rotation-controls__button {\n      font-size: 1.25rem;\n    }\n    .rotation-controls__button--up {\n      margin-left: calc(100% / 3);\n      margin-right: calc(100% / 3);\n      transform: rotate(180deg);\n    }\n    .rotation-controls__button--left {\n      flex: 1 auto;\n      order: 1;\n    }\n    .rotation-controls__button--right {\n      flex: 1 auto;\n      order: 3;\n    }\n    .rotation-controls__button--down {\n      flex: 3 0px;\n      order: 2;\n    }\n    \n    .move-controls > * {\n      margin-bottom: 1rem;\n    }\n    .move-controls__position-button {\n      margin: 0.25rem;\n    }\n  </style>\n    `}}var p,d;!function(t){t[t.None=0]="None",t[t.Up=1]="Up",t[t.Left=2]="Left",t[t.Front=3]="Front",t[t.Right=4]="Right",t[t.Down=5]="Down",t[t.Back=6]="Back"}(p||(p={})),function(t){t[t.None=0]="None",t[t.White=1]="White",t[t.Orange=2]="Orange",t[t.Green=3]="Green",t[t.Red=4]="Red",t[t.Yellow=5]="Yellow",t[t.Blue=6]="Blue"}(d||(d={}));const x=class{constructor(){this._rotationCount={x:0,y:0,z:0},this.position=[0,0,0],this.faceCount=6,this.faceSize=[3,3],this.faceMap=[[p.None,p.Up,p.None],[p.Left,p.Front,p.Right],[p.None,p.Down,p.None],[p.None,p.Back,p.None]],this.movableFacesPositions={x:[[1,1],[2,1],[1,3],[0,1]],y:[[1,0],[1,1],[1,2],[1,3]],z:[[1,0],[2,1],[1,2],[0,1]]},this.cubeData=Array(this.faceCount).fill(null).map(((t,o)=>Array(this.faceSize[1]).fill(0).map((()=>Array(this.faceSize[0]).fill(Object.keys(d)[o+1])))))}get rotation(){const{x:t,y:o,z:e}=this._rotationCount;return{x:90*t,y:90*o,z:90*e}}scramble(t){const o=()=>["x","y"][Math.floor(2*Math.random())],e=()=>Math.floor(3*Math.random()),n=()=>Math.floor(1*Math.random())?-1:1;Array(t).fill(0).map(((t,i)=>{i%3||this.rotateFaces(Object.assign({x:0,y:0,z:0},{[o()]:n()})),this.rotateCube({x:e(),y:e(),z:0},Object.assign({x:0,y:0,z:0},{[o()]:n}))})),0!==this._rotationCount.x&&Array(this._rotationCount.x).fill(0).map((()=>{this.rotateFaces({x:-1,y:0,z:0})})),0!==this._rotationCount.y&&Array(this._rotationCount.y).fill(0).map((()=>{this.rotateFaces({x:0,y:-1,z:0})}))}rotateFaces(t){this.updateFaceMap(t),this.updateRotation(t),this.updateCubeData(t)}rotateCube(t,o){Object.keys(o).map((e=>{if(!o[e])return;const n=this.movableFacesPositions[e].map((t=>this.faceMap[t[1]][t[0]]));let i,r=[],s=[];o.x?(r=n.map((o=>this.cubeData[o-1].map(((o,e)=>[e,t.y])))),s=this.getNewCubeValues(n,r,0>o.x),i=(t,o)=>s[t[0]+3*o]):o.y?(r=n.map((o=>this.cubeData[o-1].map(((o,e)=>[t.x,e])))),s=this.getNewCubeValues(n,r,0<o.y),i=(t,o)=>s[t[1]+3*o]):o.z,n.map(((t,o)=>{r[o].map((e=>this.cubeData[t-1][e[1]][e[0]]=i(e,o)))}))}))}updateRotation(t){const{x:o,y:e,z:n}=this._rotationCount;this._rotationCount={x:o+(t.x||0),y:e+(t.y||0),z:n+(t.z||0)},Object.keys(this._rotationCount).map((t=>{const o=this._rotationCount[t];0>o?this._rotationCount[t]=3:3<o&&(this._rotationCount[t]=0)}))}updateFaceMap(t){Object.keys(t).map((o=>{const e=t[o];if(e){const t=this.getNewFaceMapValues(e,this.movableFacesPositions[o].map((t=>this.faceMap[t[1]][t[0]])));this.movableFacesPositions[o].map(((o,e)=>{this.faceMap[o[1]][o[0]]=t[e]}))}}))}updateCubeData(t){if(!t.z)return;let o=null;o=0<t.z?(t,o,e)=>{t[o[0]][Math.abs(o[1]-2)]=e}:(t,o,e)=>{t[Math.abs(o[0]-2)][o[1]]=e},this.cubeData.map(((t,e)=>{this.cubeData[e]=t.reduce(((t,e,n)=>(e.map(((e,i)=>{o(t,[i,n],e)})),t)),[[d.None,d.None,d.None],[d.None,d.None,d.None],[d.None,d.None,d.None]])}))}getNewFaceMapValues(t,o){return 0<t?(o.unshift(o[o.length-1]),o.pop()):0>t&&(o.push(o[0]),o.shift()),o}getNewCubeValues(t,o,e){let n=t.reduce(((t,e,n)=>[...t,...o[n].map((t=>this.cubeData[e-1][t[1]][t[0]]))]),[]);return n=e?[...n.slice(3,n.length),...n.slice(0,3)]:[...n.slice(n.length-3,n.length),...n.slice(0,n.length-3)],n}},v={width:600,height:400,pixelSize:100,spacing:10,backgroundColor:[.5,.5,.5,1]},m={radius:500,aspect:v.width/v.height,zNear:1,zFar:2e3,fieldOfView:r(90),angle:r(-22.5)},b={WHITE:[1,1,1,1],GREEN:[0,1,0,1],RED:[1,0,0,1],ORANGE:[1,.5,0,1],YELLOW:[1,1,0,1],BLUE:[0,.5,1,1]},y=class{constructor(t,o,e,n){this.$container=t,this.$rotationControls=o,this.$moveControls=e,this.$scrambleControls=n,this.setRotationEvents(),this.setMoveEvents(),this.setScrambleEvents()}setScrambleEvents(){this.$scrambleControls.addEventListener("click",(()=>{this.dispatchEvent("scramble",null)}))}setMoveEvents(){this.$moveControls.positions.map((t=>{t.addEventListener("click",(o=>{const e=this.$moveControls.direction.value,n=Number(t.getAttribute("position-index"));e&&!isNaN(n)&&this.dispatchEvent("move",{direction:e,positionIndex:n})}))}))}setRotationEvents(){Object.keys(this.$rotationControls).map((t=>{this.$rotationControls[t].addEventListener("click",(t=>{if(t.target)switch(t.target){case this.$rotationControls.up:this.dispatchEvent("rotate","up");break;case this.$rotationControls.left:this.dispatchEvent("rotate","left");break;case this.$rotationControls.right:this.dispatchEvent("rotate","right");break;case this.$rotationControls.down:this.dispatchEvent("rotate","down")}}))}))}dispatchEvent(t,o){const e=new CustomEvent(t,{detail:o});this.$container.dispatchEvent(e)}};window.addEventListener("DOMContentLoaded",(()=>{const t=new u("app-container");t.render();const n=t.$container.querySelector("#scene"),r=t.$container.querySelector("#controls"),s=new e(n,{width:v.width,height:v.height,backgroundColor:v.backgroundColor}),a=new y(r,{up:r.querySelector(".rotation-controls__button--up"),left:r.querySelector(".rotation-controls__button--left"),right:r.querySelector(".rotation-controls__button--right"),down:r.querySelector(".rotation-controls__button--down")},{direction:r.querySelector(".move-controls__direction"),positions:Array(3).fill(0).map(((t,o)=>r.querySelector(`.move-controls__position-button[position-index="${o}"]`)))},r.querySelector(".scramble-controls"));let c=new x;const l=o.perspective(m.fieldOfView,m.aspect,m.zNear,m.zFar),p=o.inverse(o.translate(o.yRotation(m.angle),v.pixelSize/2,-v.pixelSize/2,1.5*m.radius)),d=o.multiply(l,p),g=Date.now();let f=0,z=g;a.$container.addEventListener("rotate",(t=>{switch(t.detail||""){case"up":c.rotateFaces({x:0,y:1,z:0});break;case"left":c.rotateFaces({x:-1,y:0,z:0});break;case"right":c.rotateFaces({x:1,y:0,z:0});break;case"down":c.rotateFaces({x:0,y:-1,z:0})}})),a.$container.addEventListener("move",(t=>{if(!t.detail)return;const{direction:o,positionIndex:e}=t.detail;let n={x:0,y:0,z:0};switch(o){case"up":n.y=1;break;case"left":n.x=1;break;case"right":n.x=-1;break;case"down":n.y=-1}c.rotateCube({x:2-e,y:e,z:0},n)})),a.$container.addEventListener("scramble",(()=>{c.scramble(20)}));const _=()=>{const t=Date.now();if(f>0&&t>z+100&&t<z+200){z=t,s.clearCanvas();const o=function(t,o,e,n,i){const r=3*t+4*o;return[(s,a,c)=>{const l={z:r-o-a*(t+o),y:-o,x:c*(t+o)+o};return h["2d"].Quadrilateral([{position:e,verticesPositions:[[l.x,l.y,l.z],[l.x,l.y,l.z-t],[l.x+t,l.y,l.z-t],[l.x+t,l.y,l.z]],rotation:n,color:i[0][s]}],3)},(s,a,c)=>{const l={x:0,y:c*(t+o),z:r-o-a*(t+o)};return h["2d"].Quadrilateral([{position:e,verticesPositions:[[l.x,l.y,l.z],[l.x,l.y,l.z-t],[l.x,l.y+t,l.z-t],[l.x,l.y+t,l.z]],rotation:n,color:i[1][s]}],3)},(s,a,c)=>{const l={z:0,y:c*(t+o),x:r-o-a*(t+o)+o};return h["2d"].Quadrilateral([{position:e,verticesPositions:[[l.x,l.y,l.z],[l.x-t,l.y,l.z],[l.x-t,l.y+t,l.z],[l.x,l.y+t,l.z]],rotation:n,color:i[2][s]}],3)},(s,a,c)=>{const l={x:r+o,y:c*(t+o),z:r-o-a*(t+o)};return h["2d"].Quadrilateral([{position:e,verticesPositions:[[l.x,l.y,l.z],[l.x,l.y,l.z-t],[l.x,l.y+t,l.z-t],[l.x,l.y+t,l.z]],rotation:n,color:i[3][s]}],3)},(s,a,c)=>{const l={x:c*(t+o)+o,y:r-o,z:r-o-a*(t+o)};return h["2d"].Quadrilateral([{position:e,verticesPositions:[[l.x,l.y,l.z],[l.x,l.y,l.z-t],[l.x+t,l.y,l.z-t],[l.x+t,l.y,l.z]],rotation:n,color:i[4][s]}],3)},(s,a,c)=>{const l={z:r,y:c*(t+o),x:r-o-a*(t+o)+o};return h["2d"].Quadrilateral([{position:e,verticesPositions:[[l.x,l.y,l.z],[l.x-t,l.y,l.z],[l.x-t,l.y+t,l.z],[l.x,l.y+t,l.z]],rotation:n,color:i[5][s]}],3)}].reduce(((t,o)=>[...t,...Array(9).fill(0).map(((t,e)=>o(e,e%3,Math.floor(e/3))))]),[])}(v.pixelSize,v.spacing,c.position,c.rotation,c.cubeData.map((t=>t.reduce(((t,o)=>[...t,...o.map((t=>Object.values(b)[Number(t)-1]))]),[]))));h.render(s,[...o],i.vertexShader,i.fragmentShader,d)}f=requestAnimationFrame(_)};requestAnimationFrame(_)}))})();