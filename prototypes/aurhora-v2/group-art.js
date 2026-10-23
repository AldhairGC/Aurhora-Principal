/* A woven light sculpture, drawn locally with a small WebGL mesh. No external runtime. */
(() => {
  class AurhoraSculpture {
    constructor(canvas) {
      this.canvas=canvas;this.running=false;this.time=0;this.last=0;this.frame=0;this.ok=false;
      const gl=canvas.getContext('webgl',{alpha:true,antialias:true,premultipliedAlpha:false,powerPreference:'low-power'});if(!gl)return;this.gl=gl;
      const vertex=`attribute vec3 aPosition;attribute vec3 aNormal;attribute vec2 aUv;uniform mat4 uProjection;uniform mat4 uModel;varying vec3 vNormal;varying vec3 vPosition;varying vec2 vUv;void main(){vec4 p=uModel*vec4(aPosition,1.);vPosition=p.xyz;vNormal=mat3(uModel)*aNormal;vUv=aUv;gl_Position=uProjection*p;}`;
      const fragment=`precision mediump float;varying vec3 vNormal;varying vec3 vPosition;varying vec2 vUv;uniform float uTime;void main(){vec3 n=normalize(vNormal);if(!gl_FrontFacing)n=-n;vec3 view=normalize(-vPosition);float k=clamp(vUv.y*.80+vUv.x*.35-.12,0.,1.);vec3 violet=vec3(.39,.13,.79),blue=vec3(.27,.46,.88),mint=vec3(.39,.86,.73);vec3 base=k<.53?mix(violet,blue,k/.53):mix(blue,mint,(k-.53)/.47);float light=max(dot(n,normalize(vec3(-.6,1.,2.))),0.);float side=max(dot(n,normalize(vec3(1.,-.3,.9))),0.);float spec=pow(max(dot(n,normalize(normalize(vec3(-.6,1.,2.))+view)),0.),44.);float edge=pow(1.-abs(dot(n,view)),3.);float fiber=.96+.04*sin(vUv.y*1450.);vec3 color=base*(.46+.49*light+.20*side)*fiber+vec3(.83,.85,1.)*spec*.68+vec3(.14,.13,.20)*edge;float glint=pow(max(sin(vUv.y*1100.+vUv.x*35.),0.),14.)*.055;color+=vec3(glint)*light;gl_FragColor=vec4(color,1.);}`;
      const shader=(type,source)=>{const s=gl.createShader(type);gl.shaderSource(s,source);gl.compileShader(s);if(!gl.getShaderParameter(s,gl.COMPILE_STATUS))throw Error(gl.getShaderInfoLog(s));return s;};
      try {
        this.program=gl.createProgram();gl.attachShader(this.program,shader(gl.VERTEX_SHADER,vertex));gl.attachShader(this.program,shader(gl.FRAGMENT_SHADER,fragment));gl.linkProgram(this.program);if(!gl.getProgramParameter(this.program,gl.LINK_STATUS))return;gl.useProgram(this.program);
        const pos=[],norm=[],uv=[],indices=[];const U=200,V=18;
        const point=(u,v)=>{const a=u*Math.PI*2.08-.72;const tw=a*.62+.68;const radial=v*.83;return [1.48*Math.cos(a)+radial*Math.cos(a)*Math.cos(tw),2.12*Math.sin(a)+radial*Math.sin(a)*Math.cos(tw),.42*Math.sin(2*a)+radial*Math.sin(tw)];};
        for(let lane=0;lane<3;lane++){
          const start=pos.length/3;for(let i=0;i<=U;i++){for(let j=0;j<=V;j++){const u=i/U,v=-1+lane*(2/3)+(j/V)*(.626);const p=point(u,v),a=point(u+.0002,v),b=point(u,v+.0002);const du=a.map((x,k)=>x-p[k]),dv=b.map((x,k)=>x-p[k]);let n=[du[1]*dv[2]-du[2]*dv[1],du[2]*dv[0]-du[0]*dv[2],du[0]*dv[1]-du[1]*dv[0]];const length=Math.hypot(...n);n=n.map(x=>x/length);pos.push(...p);norm.push(...n);uv.push(u,(v+1)/2);}}
          for(let i=0;i<U;i++)for(let j=0;j<V;j++){const a=start+i*(V+1)+j,b=a+V+1;indices.push(a,b,a+1,b,b+1,a+1);}
        }
        const attr=(name,data,size)=>{const buffer=gl.createBuffer();gl.bindBuffer(gl.ARRAY_BUFFER,buffer);gl.bufferData(gl.ARRAY_BUFFER,new Float32Array(data),gl.STATIC_DRAW);const loc=gl.getAttribLocation(this.program,name);gl.enableVertexAttribArray(loc);gl.vertexAttribPointer(loc,size,gl.FLOAT,false,0,0);};
        attr('aPosition',pos,3);attr('aNormal',norm,3);attr('aUv',uv,2);gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER,gl.createBuffer());gl.bufferData(gl.ELEMENT_ARRAY_BUFFER,new Uint16Array(indices),gl.STATIC_DRAW);this.count=indices.length;
        this.projection=gl.getUniformLocation(this.program,'uProjection');this.model=gl.getUniformLocation(this.program,'uModel');this.utime=gl.getUniformLocation(this.program,'uTime');gl.enable(gl.DEPTH_TEST);gl.disable(gl.CULL_FACE);gl.clearColor(0,0,0,0);this.ok=true;
        this.observer=new ResizeObserver(()=>this.resize());this.observer.observe(canvas);this.resize();canvas.parentElement.classList.add('art-ready');
        canvas.addEventListener('webglcontextlost',e=>{e.preventDefault();this.setRunning(false);this.ok=false;canvas.parentElement.classList.remove('art-ready');});
      } catch { this.ok=false; }
    }
    resize(){if(!this.ok)return;const d=Math.min(devicePixelRatio||1,1.65);this.canvas.width=Math.round(this.canvas.clientWidth*d);this.canvas.height=Math.round(this.canvas.clientHeight*d);this.gl.viewport(0,0,this.canvas.width,this.canvas.height);this.draw();}
    draw(){if(!this.ok)return;const gl=this.gl,aspect=this.canvas.width/this.canvas.height,f=1/Math.tan(40*Math.PI/360),near=.1,far=30;const projection=new Float32Array([f/aspect,0,0,0,0,f,0,0,0,0,(far+near)/(near-far),-1,0,0,2*far*near/(near-far),0]);
      const t=this.time,ay=.42+Math.sin(t*.19)*.16,az=-.30+Math.sin(t*.13)*.06,ax=.15+Math.cos(t*.15)*.09;const cy=Math.cos(ay),sy=Math.sin(ay),cz=Math.cos(az),sz=Math.sin(az),cx=Math.cos(ax),sx=Math.sin(ax);
      const matrix=new Float32Array([cz*cy,sz*cy,-sy,0,cz*sy*sx-sz*cx,sz*sy*sx+cz*cx,cy*sx,0,cz*sy*cx+sz*sx,sz*sy*cx-cz*sx,cy*cx,0,0,.05,-6.1,1]);gl.clear(gl.COLOR_BUFFER_BIT|gl.DEPTH_BUFFER_BIT);gl.uniformMatrix4fv(this.projection,false,projection);gl.uniformMatrix4fv(this.model,false,matrix);gl.uniform1f(this.utime,t);gl.drawElements(gl.TRIANGLES,this.count,gl.UNSIGNED_SHORT,0);}
    setRunning(value){if(!this.ok)return;this.running=value;cancelAnimationFrame(this.frame);this.last=0;if(value)this.frame=requestAnimationFrame(ts=>this.tick(ts));else this.draw();}
    tick(ts){if(!this.running||!this.ok)return;if(!this.last)this.last=ts;const elapsed=ts-this.last;if(elapsed>=1000/30){this.time+=Math.min(elapsed,80)/1000;this.last=ts;this.draw();}this.frame=requestAnimationFrame(next=>this.tick(next));}
  }
  window.AurhoraSculpture=AurhoraSculpture;
})();
