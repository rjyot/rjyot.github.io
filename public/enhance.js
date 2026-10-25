(function () {
  var root = document.documentElement;
  var KEY = "rj-motion";

  function systemReduced() {
    return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  }

  function savedOff() {
    try {
      return window.localStorage.getItem(KEY) === "off";
    } catch {
      return false;
    }
  }

  function motionOn() {
    return !systemReduced() && !savedOff();
  }

  function paintMotion() {
    var on = motionOn();
    root.dataset.motion = on ? "on" : "off";
    var label = systemReduced() ? "Motion off" : on ? "Calm motion" : "Play motion";
    var note = systemReduced()
      ? "Your system asked for reduced motion, so this site stays still."
      : "Calm motion turns off the field, smooth scroll, and the custom cursor.";
    document.querySelectorAll("[data-calm]").forEach(function (button) {
      button.textContent = label;
      button.setAttribute("aria-pressed", on ? "false" : "true");
      button.disabled = systemReduced();
    });
    var noteNode = document.querySelector("[data-calm-note]");
    if (noteNode) noteNode.textContent = note;
    if (!on) {
      stopField();
      stopCursor();
    }
  }

  document.addEventListener("click", function (event) {
    var calm = event.target.closest("[data-calm]");
    if (calm && !systemReduced()) {
      try {
        window.localStorage.setItem(KEY, motionOn() ? "off" : "on");
      } catch {
        /* private mode */
      }
      paintMotion();
      if (motionOn()) {
        scheduleField();
        setupCursor();
      }
    }

    var closer = event.target.closest("[data-menu-close], .menu-panel a");
    if (closer) {
      var menu = closer.closest("details");
      if (menu) menu.open = false;
    }

    var step = event.target.closest("[data-gallery-step]");
    if (step) {
      var viewport = document.querySelector("[data-gallery-viewport]");
      if (viewport) {
        var direction = Number(step.getAttribute("data-gallery-step")) || 1;
        viewport.scrollBy({
          left: direction * viewport.clientWidth * 0.85,
          behavior: motionOn() ? "smooth" : "auto",
        });
      }
    }
  });

  var sections = ["about", "projects", "experience", "skills", "now", "contact"];
  if ("IntersectionObserver" in window) {
    var links = Array.prototype.slice.call(document.querySelectorAll("[data-section-link]"));
    var spy = new IntersectionObserver(
      function (entries) {
        var visible = entries
          .filter(function (entry) {
            return entry.isIntersecting;
          })
          .sort(function (a, b) {
            return b.intersectionRatio - a.intersectionRatio;
          })[0];
        if (!visible) return;
        links.forEach(function (link) {
          if (link.getAttribute("data-section-link") === visible.target.id) {
            link.setAttribute("aria-current", "true");
          } else {
            link.removeAttribute("aria-current");
          }
        });
      },
      { rootMargin: "-35% 0px -45% 0px", threshold: [0.1, 0.3, 0.6] },
    );
    sections.forEach(function (id) {
      var node = document.getElementById(id);
      if (node) spy.observe(node);
    });
  }

  var cursorFrame = 0;
  var cursorReady = false;
  var cursorLoop = function () {};
  function stopCursor() {
    if (cursorFrame) window.cancelAnimationFrame(cursorFrame);
    cursorFrame = 0;
    root.classList.remove("has-cursor");
  }
  function setupCursor() {
    if (!motionOn()) return;
    if (!window.matchMedia("(hover: hover) and (pointer: fine)").matches) return;
    var dot = document.querySelector(".cursor-dot");
    var ring = document.querySelector(".cursor-ring");
    if (!dot || !ring) {
      var layer = document.createElement("div");
      layer.className = "pointer-events-none fixed inset-0 z-[80] hidden lg:block";
      layer.setAttribute("aria-hidden", "true");
      layer.innerHTML = '<div class="cursor-ring"></div><div class="cursor-dot"></div>';
      document.body.appendChild(layer);
      ring = layer.querySelector(".cursor-ring");
      dot = layer.querySelector(".cursor-dot");
    }
    root.classList.add("has-cursor");
    if (cursorReady) {
      if (!cursorFrame) cursorFrame = window.requestAnimationFrame(cursorLoop);
      return;
    }
    cursorReady = true;
    var target = { x: window.innerWidth / 2, y: window.innerHeight / 2 };
    var current = { x: target.x, y: target.y };
    var visible = false;
    window.addEventListener(
      "pointermove",
      function (event) {
        if (root.dataset.motion !== "on") return;
        target.x = event.clientX;
        target.y = event.clientY;
        visible = true;
        dot.style.opacity = "1";
        ring.style.opacity = "1";
        var hot = event.target.closest("a, button, summary, [data-magnetic]");
        ring.dataset.hot = hot ? "true" : "false";
      },
      { passive: true },
    );
    window.addEventListener("pointerleave", function () {
      visible = false;
      dot.style.opacity = "0";
      ring.style.opacity = "0";
    });
    cursorLoop = function () {
      current.x += (target.x - current.x) * 0.18;
      current.y += (target.y - current.y) * 0.18;
      if (visible && root.dataset.motion === "on") {
        dot.style.transform = "translate3d(" + target.x + "px," + target.y + "px,0) translate(-50%,-50%)";
        ring.style.transform = "translate3d(" + current.x + "px," + current.y + "px,0) translate(-50%,-50%)";
      }
      cursorFrame = window.requestAnimationFrame(cursorLoop);
    };
    cursorFrame = window.requestAnimationFrame(cursorLoop);
  }

  document.querySelectorAll("[data-magnetic]").forEach(function (node) {
    node.addEventListener("pointermove", function (event) {
      if (root.dataset.motion !== "on") return;
      var bounds = node.getBoundingClientRect();
      var dx = (event.clientX - (bounds.left + bounds.width / 2)) * 0.28;
      var dy = (event.clientY - (bounds.top + bounds.height / 2)) * 0.28;
      node.style.transform = "translate3d(" + dx + "px," + dy + "px,0)";
    });
    node.addEventListener("pointerleave", function () {
      node.style.transform = "translate3d(0,0,0)";
    });
  });

  var fieldStop = function () {};
  function stopField() {
    fieldStop();
  }

  function setupField() {
    if (!motionOn()) return;
    var host = document.querySelector("[data-hero-field]");
    if (!host || host.querySelector("canvas")) return;
    var canvas = document.createElement("canvas");
    canvas.className = "absolute inset-0 h-full w-full";
    canvas.setAttribute("aria-hidden", "true");
    host.appendChild(canvas);
    var gl = canvas.getContext("webgl", { alpha: true, antialias: false, powerPreference: "high-performance" });
    if (!gl) return;
    paintMotion();

    var vert =
      "attribute vec3 aPos;attribute float aScale;attribute float aAccent;uniform float uTime;uniform vec2 uMouse;uniform vec2 uRes;uniform float uInfluence;varying float vAccent;void main(){float ang=uTime*0.05;float c=cos(ang);float s=sin(ang);vec3 pos=vec3(aPos.x*c-aPos.z*s,aPos.y,aPos.x*s+aPos.z*c);float dist=distance(pos.xy,uMouse);float fall=smoothstep(1.05,0.0,dist)*uInfluence;vec2 dir=normalize(pos.xy-uMouse+vec2(0.0001));pos.xy+=dir*fall*0.72;pos.z+=sin(uTime*0.35+aPos.y*2.2)*0.04+fall*0.35;gl_Position=vec4(pos.xy*0.42,pos.z*0.08,1.0);float size=1.6+aScale*1.4+fall*3.2;gl_PointSize=clamp(size*(uRes.y/700.0),1.0,8.0);vAccent=aAccent;}";
    var frag =
      "precision mediump float;varying float vAccent;void main(){vec2 uv=gl_PointCoord-vec2(0.5);float d=length(uv);float circle=smoothstep(0.5,0.16,d);if(circle<0.02)discard;vec3 color=mix(vec3(0.48,0.68,1.0),vec3(0.94,0.71,0.42),vAccent);gl_FragColor=vec4(color,circle);}" ;

    function shader(type, source) {
      var item = gl.createShader(type);
      gl.shaderSource(item, source);
      gl.compileShader(item);
      return item;
    }
    var program = gl.createProgram();
    gl.attachShader(program, shader(gl.VERTEX_SHADER, vert));
    gl.attachShader(program, shader(gl.FRAGMENT_SHADER, frag));
    gl.linkProgram(program);
    gl.useProgram(program);

    var count = window.innerWidth < 768 ? 120 : 280;
    var positions = new Float32Array(count * 3);
    var scales = new Float32Array(count);
    var accents = new Float32Array(count);
    var golden = Math.PI * (3 - Math.sqrt(5));
    for (var index = 0; index < count; index += 1) {
      var y = 1 - (index / (count - 1)) * 2;
      var radius = Math.sqrt(1 - y * y);
      var theta = golden * index;
      positions[index * 3] = Math.cos(theta) * radius * 2.35;
      positions[index * 3 + 1] = y * 2.35 * 0.78;
      positions[index * 3 + 2] = Math.sin(theta) * radius * 2.35;
      var noise = Math.abs(Math.sin(index * 12.9898) * 43758.5453);
      scales[index] = 0.55 + (noise - Math.floor(noise)) * 1.65;
      accents[index] = index % 19 === 0 ? 1 : 0;
    }

    function buffer(name, data, size) {
      var id = gl.createBuffer();
      gl.bindBuffer(gl.ARRAY_BUFFER, id);
      gl.bufferData(gl.ARRAY_BUFFER, data, gl.STATIC_DRAW);
      var loc = gl.getAttribLocation(program, name);
      gl.enableVertexAttribArray(loc);
      gl.vertexAttribPointer(loc, size, gl.FLOAT, false, 0, 0);
    }
    buffer("aPos", positions, 3);
    buffer("aScale", scales, 1);
    buffer("aAccent", accents, 1);

    var uTime = gl.getUniformLocation(program, "uTime");
    var uMouse = gl.getUniformLocation(program, "uMouse");
    var uRes = gl.getUniformLocation(program, "uRes");
    var uInfluence = gl.getUniformLocation(program, "uInfluence");
    var mouse = [0, 0];
    var current = [0, 0];
    var influence = 0;
    var influenceTarget = 0;
    var onScreen = true;
    var pageVisible = !document.hidden;
    var frame = 0;
    var start = performance.now();
    var shellX = 2.35;
    var shellY = 2.35 * 0.78;
    var project = 0.42;
    var rimFalloff = 0.12;

    function resize() {
      var rect = host.getBoundingClientRect();
      var width = Math.max(1, Math.floor(rect.width));
      var height = Math.max(1, Math.floor(rect.height));
      canvas.width = width;
      canvas.height = height;
      gl.viewport(0, 0, width, height);
    }
    resize();
    function coarseOnly() {
      return (
        window.matchMedia("(pointer: coarse)").matches &&
        !window.matchMedia("(any-pointer: fine)").matches
      );
    }
    function placePointer(event) {
      if (event.pointerType === "touch" || coarseOnly()) {
        influenceTarget = 0;
        return;
      }
      var rect = canvas.getBoundingClientRect();
      if (rect.width < 1 || rect.height < 1) {
        influenceTarget = 0;
        return;
      }
      var nx = ((event.clientX - rect.left) / rect.width) * 2 - 1;
      var ny = -(((event.clientY - rect.top) / rect.height) * 2 - 1);
      var px = nx / project;
      var py = ny / project;
      var ellipse = Math.sqrt((px / shellX) * (px / shellX) + (py / shellY) * (py / shellY));
      var edge = 1 + rimFalloff;
      if (ellipse >= edge) {
        influenceTarget = 0;
        return;
      }
      mouse[0] = px;
      mouse[1] = py;
      influenceTarget = ellipse <= 1 ? 1 : (edge - ellipse) / rimFalloff;
    }
    function releasePointer() {
      influenceTarget = 0;
    }
    window.addEventListener("resize", resize);
    window.addEventListener("pointermove", placePointer, { passive: true });
    window.addEventListener("pointerleave", releasePointer);
    window.addEventListener("pointercancel", releasePointer);
    function drawing() {
      return onScreen && pageVisible && motionOn();
    }
    function startDraw() {
      if (frame || !drawing()) return;
      frame = window.requestAnimationFrame(draw);
    }
    var watcher = new IntersectionObserver(function (entries) {
      onScreen = entries[0] ? entries[0].isIntersecting : false;
      startDraw();
    });
    watcher.observe(host);
    document.addEventListener("visibilitychange", function () {
      pageVisible = !document.hidden;
      if (pageVisible) startDraw();
    });

    gl.enable(gl.BLEND);
    gl.blendFunc(gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA);

    function draw(now) {
      if (!drawing()) {
        frame = 0;
        return;
      }
      frame = window.requestAnimationFrame(draw);
      current[0] += (mouse[0] - current[0]) * 0.16;
      current[1] += (mouse[1] - current[1]) * 0.16;
      influence += (influenceTarget - influence) * 0.14;
      gl.uniform1f(uTime, (now - start) / 1000);
      gl.uniform2f(uMouse, current[0], current[1]);
      gl.uniform1f(uInfluence, influence);
      gl.uniform2f(uRes, canvas.width, canvas.height);
      gl.clearColor(0, 0, 0, 0);
      gl.clear(gl.COLOR_BUFFER_BIT);
      gl.drawArrays(gl.POINTS, 0, count);
    }
    startDraw();
    fieldStop = function () {
      window.cancelAnimationFrame(frame);
      watcher.disconnect();
      window.removeEventListener("resize", resize);
      window.removeEventListener("pointermove", placePointer);
      window.removeEventListener("pointerleave", releasePointer);
      window.removeEventListener("pointercancel", releasePointer);
      if (canvas.parentNode) canvas.parentNode.removeChild(canvas);
      fieldStop = function () {};
    };
  }

  function afterLoad(task) {
    var run = function () {
      if ("requestIdleCallback" in window) {
        window.requestIdleCallback(task, { timeout: 1500 });
      } else {
        window.setTimeout(task, 1);
      }
    };
    if (document.readyState === "complete") run();
    else window.addEventListener("load", run, { once: true });
  }

  function scheduleField() {
    if (!motionOn()) return;
    afterLoad(setupField);
  }

  paintMotion();
  afterLoad(function () {
    paintMotion();
    if (motionOn()) setupCursor();
  });
  if (motionOn()) scheduleField();

  function moveFocus() {
    var hash = window.location.hash;
    var target = hash ? document.getElementById(hash.slice(1)) : null;
    if (!target) target = document.querySelector("h1");
    if (!target) return;
    if (!target.hasAttribute("tabindex")) target.setAttribute("tabindex", "-1");
    target.focus({ preventScroll: true, focusVisible: false });
  }
  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", moveFocus);
  else moveFocus();

  document.addEventListener("click", function (event) {
    if (root.dataset.motion !== "on" || !document.startViewTransition) return;
    var link = event.target.closest("a");
    if (!link || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey || event.button !== 0) return;
    if (link.target && link.target !== "_self") return;
    var url = new URL(link.href, window.location.href);
    if (url.origin !== window.location.origin) return;
    if (url.pathname === window.location.pathname) return;
    event.preventDefault();
    document.startViewTransition(function () {
      window.location.href = link.href;
    });
  });
})();
