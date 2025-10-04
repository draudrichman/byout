import React, { useRef, useEffect } from 'react';

// Debounce utility function
const debounce = (fn, delay) => {
  let timerId;
  return (...args) => {
    clearTimeout(timerId);
    timerId = setTimeout(() => fn.apply(this, args), delay);
  };
};

// Renderer class for WebGL
class Renderer {
  #vertexSrc = "#version 300 es\nprecision highp float;\nin vec4 position;\nvoid main(){gl_Position=position;}";
  #fragmtSrc = `#version 300 es

/*********
* made by Matthias Hurrle (@atzedent)
*
*	To explore strange new worlds, to seek out new life
*	and new civilizations, to boldly go where no man has
*	gone before.
*/
precision highp float;
out vec4 O;
uniform vec2 resolution;
uniform float time;
uniform sampler2D pebbles;
#define FC gl_FragCoord.xy
#define T time
#define R resolution
#define MN min(R.x,R.y)
// Returns a pseudo random number for a given point (white noise)
float rnd(vec2 p) {
  p=fract(p*vec2(12.9898,78.233));
  p+=dot(p,p+34.56);
  return fract(p.x*p.y);
}
// Returns a pseudo random number for a given point (value noise)
float noise(in vec2 p) {
  vec2 i=floor(p), f=fract(p), u=f*f*(3.-2.*f);
  float
  a=rnd(i),
  b=rnd(i+vec2(1,0)),
  c=rnd(i+vec2(0,1)),
  d=rnd(i+1.);
  return mix(mix(a,b,u.x),mix(c,d,u.x),u.y);
}
// Returns a pseudo random number for a given point (fractal noise)
float fbm(vec2 p) {
  float t=.0, a=1.; mat2 m=mat2(1.,-.5,.2,1.2);
  for (int i=0; i<5; i++) {
    t+=a*noise(p);
    p*=2.*m;
    a*=.5;
  }
  return t;
}
float clouds(vec2 p) {
	float d=1., t=.0;
	for (float i=.0; i<3.; i++) {
		float a=d*fbm(i*10.+p.x*.2+.2*(1.+i)*p.y+d+i*i+p);
		t=mix(t,d,a);
		d=a;
		p*=2./(i+1.);
 	 }
	return t;
}
void main(void) {
	vec2 uv=(FC-.5*R)/MN,st=uv*vec2(2,1);
	vec3 col=vec3(0);
	float bg=clouds(vec2(st.x+T*.5,-st.y));
	uv*=1.-.3*(sin(T*.2)*.5+.5);
	
	float lightLines = 0.0;
	for (float i=1.; i<10.; i++) {
		uv+=.1*cos(i*vec2(.15+.015*i, .8)+i*i+T*.5+.1*uv.x);
		vec2 p=uv;
		float d=length(p);
		
		// Create light line effect instead of colorful patterns
		float lineIntensity = .00125/d;
		lightLines += lineIntensity;
		
		float b=noise(i+p+bg*1.731);
		float noiseContrib = .002*b/length(max(p,vec2(b*p.x*.02,p.y)));
		lightLines += noiseContrib;
	}
	
	// Create bright white light lines on pure black background
	float intensity = lightLines * 1.2;
	intensity = smoothstep(0.0, 1.0, intensity);
	
	// Pure white and pure black colors
	vec3 pureWhite = vec3(1.0, 1.0, 1.0);
	vec3 pureBlack = vec3(0.0, 0.0, 0.0);
	
	// Mix between pure black background and bright white light lines
	col = mix(pureBlack, pureWhite, intensity);
	
	// Add extra bright white highlights for more luminous effect
	col += intensity * intensity * 0.5;
	
	// Enhance contrast for sharp black/white effect with brighter whites
	col = smoothstep(0.05, 0.95, col);
	
	// Ensure maximum white brightness
	col = clamp(col, 0.0, 1.0);
	
	O=vec4(col,1);
}`;
  #vertices = [-1, 1, -1, -1, 1, 1, 1, -1];

  constructor(canvas, scale = 1) {
    this.canvas = canvas;
    this.scale = scale;
    this.gl = canvas.getContext("webgl2");
    this.gl.viewport(0, 0, canvas.width * scale, canvas.height * scale);
    this.shaderSource = this.#fragmtSrc;
    this.mouseMove = [0, 0];
    this.mouseCoords = [0, 0];
    this.pointerCoords = [0, 0];
    this.nbrOfPointers = 0;
  }

  get defaultSource() { 
    return this.#fragmtSrc; 
  }

  updateShader(source) {
    this.reset();
    this.shaderSource = source;
    this.setup();
    this.init();
  }

  updateMove(deltas) {
    this.mouseMove = deltas;
  }

  updateMouse(coords) {
    this.mouseCoords = coords;
  }

  updatePointerCoords(coords) {
    this.pointerCoords = coords;
  }

  updatePointerCount(nbr) {
    this.nbrOfPointers = nbr;
  }

  updateScale(scale) {
    this.scale = scale;
    this.gl.viewport(0, 0, this.canvas.width * scale, this.canvas.height * scale);
  }

  compile(shader, source) {
    const gl = this.gl;
    gl.shaderSource(shader, source);
    gl.compileShader(shader);

    if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
      console.error(gl.getShaderInfoLog(shader));
      this.canvas.dispatchEvent(new CustomEvent('shader-error', { detail: gl.getShaderInfoLog(shader) }));
    }
  }

  test(source) {
    let result = null;
    const gl = this.gl;
    const shader = gl.createShader(gl.FRAGMENT_SHADER);
    gl.shaderSource(shader, source);
    gl.compileShader(shader);

    if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
      result = gl.getShaderInfoLog(shader);
    }
    if (gl.getShaderParameter(shader, gl.DELETE_STATUS)) {
      gl.deleteShader(shader);
    }
    return result;
  }

  reset() {
    const { gl, program, vs, fs } = this;
    if (!program || gl.getProgramParameter(program, gl.DELETE_STATUS)) return;
    if (gl.getShaderParameter(vs, gl.DELETE_STATUS)) {
      gl.detachShader(program, vs);
      gl.deleteShader(vs);
    }
    if (gl.getShaderParameter(fs, gl.DELETE_STATUS)) {
      gl.detachShader(program, fs);
      gl.deleteShader(fs);
    }
    gl.deleteProgram(program);
  }

  setup() {
    const gl = this.gl;
    this.vs = gl.createShader(gl.VERTEX_SHADER);
    this.fs = gl.createShader(gl.FRAGMENT_SHADER);
    this.compile(this.vs, this.#vertexSrc);
    this.compile(this.fs, this.shaderSource);
    this.program = gl.createProgram();
    gl.attachShader(this.program, this.vs);
    gl.attachShader(this.program, this.fs);
    gl.linkProgram(this.program);

    if (!gl.getProgramParameter(this.program, gl.LINK_STATUS)) {
      console.error(gl.getProgramInfoLog(this.program));
    }
  }

  init() {
    const { gl, program } = this;
    this.buffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, this.buffer);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(this.#vertices), gl.STATIC_DRAW);

    const position = gl.getAttribLocation(program, "position");

    gl.enableVertexAttribArray(position);
    gl.vertexAttribPointer(position, 2, gl.FLOAT, false, 0, 0);

    program.resolution = gl.getUniformLocation(program, "resolution");
    program.time = gl.getUniformLocation(program, "time");
    program.move = gl.getUniformLocation(program, "move");
    program.touch = gl.getUniformLocation(program, "touch");
    program.pointerCount = gl.getUniformLocation(program, "pointerCount");
    program.pointers = gl.getUniformLocation(program, "pointers");
  }

  render(now = 0) {
    const { gl, program, buffer, canvas, mouseMove, mouseCoords, pointerCoords, nbrOfPointers } = this;
    
    if (!program || gl.getProgramParameter(program, gl.DELETE_STATUS)) return;

    gl.clearColor(0, 0, 0, 1);
    gl.clear(gl.COLOR_BUFFER_BIT);
    gl.useProgram(program);
    gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
    gl.uniform2f(program.resolution, canvas.width, canvas.height);
    gl.uniform1f(program.time, now * 1e-3);
    gl.uniform2f(program.move, ...mouseMove);
    gl.uniform2f(program.touch, ...mouseCoords);
    gl.uniform1i(program.pointerCount, nbrOfPointers);
    gl.uniform2fv(program.pointers, pointerCoords);
    gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
  }
}

// PointerHandler class for mouse/touch events
class PointerHandler {
  constructor(element, scale = 1) {
    this.scale = scale;
    this.active = false;
    this.pointers = new Map();
    this.lastCoords = [0, 0];
    this.moves = [0, 0];
    
    const map = (element, scale, x, y) => [x * scale, element.height - y * scale];
    
    element.addEventListener("pointerdown", (e) => {
      this.active = true;
      this.pointers.set(e.pointerId, map(element, this.getScale(), e.clientX, e.clientY));
    });
    
    element.addEventListener("pointerup", (e) => {
      if (this.count === 1) {
        this.lastCoords = this.first;
      }
      this.pointers.delete(e.pointerId);
      this.active = this.pointers.size > 0;
    });
    
    element.addEventListener("pointerleave", (e) => {
      if (this.count === 1) {
        this.lastCoords = this.first;
      }
      this.pointers.delete(e.pointerId);
      this.active = this.pointers.size > 0;
    });
    
    element.addEventListener("pointermove", (e) => {
      if (!this.active) return;
      this.lastCoords = [e.clientX, e.clientY];
      this.pointers.set(e.pointerId, map(element, this.getScale(), e.clientX, e.clientY));
      this.moves = [this.moves[0] + e.movementX, this.moves[1] + e.movementY];
    });
  }

  getScale() {
    return this.scale;
  }

  updateScale(scale) { 
    this.scale = scale; 
  }

  reset() {
    this.pointers.clear();
    this.active = false;
    this.moves = [0, 0];
  }

  get count() {
    return this.pointers.size;
  }

  get move() {
    return this.moves;
  }

  get coords() {
    return this.pointers.size > 0 ? Array.from(this.pointers.values()).map((p) => [...p]).flat() : [0, 0];
  }

  get first() {
    return this.pointers.values().next().value || this.lastCoords;
  }
}

// Main ShaderBackground component
const ShaderBackground = ({ className = '', style = {}, opacity = 0.5 }) => {
  const canvasRef = useRef(null);
  const rendererRef = useRef(null);
  const pointersRef = useRef(null);
  const frameRef = useRef(null);
  const dprRef = useRef(Math.min(1, window.devicePixelRatio * 0.75)); // Further reduced for performance
  const isVisibleRef = useRef(true);

  const resize = () => {
    const canvas = canvasRef.current;
    if (!canvas || !canvas.parentElement) return;

    const parent = canvas.parentElement;
    const rect = parent.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    
    canvas.width = width * dprRef.current;
    canvas.height = height * dprRef.current;
    canvas.style.width = width + 'px';
    canvas.style.height = height + 'px';

    if (rendererRef.current) {
      rendererRef.current.updateScale(dprRef.current);
    }
  };

  const loop = (now) => {
    if (!rendererRef.current || !pointersRef.current || !isVisibleRef.current) return;
    
    rendererRef.current.updateMouse(pointersRef.current.first);
    rendererRef.current.updatePointerCount(pointersRef.current.count);
    rendererRef.current.updatePointerCoords(pointersRef.current.coords);
    rendererRef.current.updateMove(pointersRef.current.move);
    rendererRef.current.render(now);
    frameRef.current = requestAnimationFrame(loop);
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    // Initialize renderer and pointer handler
    rendererRef.current = new Renderer(canvas, dprRef.current);
    pointersRef.current = new PointerHandler(canvas, dprRef.current);

    // Setup and initialize
    rendererRef.current.setup();
    rendererRef.current.init();

    // Add error listener
    const handleShaderError = (e) => {
      console.error('Shader error:', e.detail);
    };
    canvas.addEventListener('shader-error', handleShaderError);

    // Initial resize and start loop
    resize();
    
    if (rendererRef.current.test(rendererRef.current.defaultSource) === null) {
      rendererRef.current.updateShader(rendererRef.current.defaultSource);
    }
    
    loop(0);

    // Add resize listener
    const handleResize = debounce(resize, 100);
    window.addEventListener('resize', handleResize);
    
    // Add ResizeObserver for container changes
    let resizeObserver;
    if (canvas.parentElement && 'ResizeObserver' in window) {
      resizeObserver = new ResizeObserver(handleResize);
      resizeObserver.observe(canvas.parentElement);
    }

    // Add Intersection Observer for visibility-based rendering
    let intersectionObserver;
    if ('IntersectionObserver' in window) {
      intersectionObserver = new IntersectionObserver(
        (entries) => {
          isVisibleRef.current = entries[0].isIntersecting && !document.hidden;
          if (isVisibleRef.current && !frameRef.current) {
            loop(performance.now());
          }
        },
        { rootMargin: '100px' }
      );
      intersectionObserver.observe(canvas);
    }

    // Add visibility change listener
    const handleVisibilityChange = () => {
      isVisibleRef.current = !document.hidden;
      if (isVisibleRef.current && !frameRef.current) {
        loop(performance.now());
      }
    };
    document.addEventListener('visibilitychange', handleVisibilityChange);

    // Cleanup
    return () => {
      if (frameRef.current) {
        cancelAnimationFrame(frameRef.current);
      }
      canvas.removeEventListener('shader-error', handleShaderError);
      window.removeEventListener('resize', handleResize);
      document.removeEventListener('visibilitychange', handleVisibilityChange);
      
      if (resizeObserver) {
        resizeObserver.disconnect();
      }
      
      if (intersectionObserver) {
        intersectionObserver.disconnect();
      }
      
      if (rendererRef.current) {
        rendererRef.current.reset();
      }
      if (pointersRef.current) {
        pointersRef.current.reset();
      }
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className={`w-full h-full pointer-events-none ${className}`}
      style={{
        opacity,
        objectFit: 'cover',
        background: 'black',
        touchAction: 'none',
        ...style
      }}
    />
  );
};

export default ShaderBackground;
