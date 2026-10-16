// Sayfanın arkasında dönen 3B nöron ağı (hafif, telefonda da akıcı)
import * as THREE from 'three';

export function arkaplanBaslat(canvas) {
  let renderer;
  try { renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true }); } catch (e) { canvas.style.display = 'none'; return { durdur() {} }; }
  const dar = Math.min(innerWidth, innerHeight) < 700;
  renderer.setPixelRatio(Math.min(devicePixelRatio || 1, dar ? 1.5 : 2));
  const sahne = new THREE.Scene();
  const kamera = new THREE.PerspectiveCamera(60, 1, 0.1, 100);
  kamera.position.z = 15;

  const N = dar ? 46 : 80, kutu = 16;
  const konum = [], hiz = [];
  for (let i = 0; i < N; i++) {
    konum.push(new THREE.Vector3((Math.random() - 0.5) * kutu * 2, (Math.random() - 0.5) * kutu, (Math.random() - 0.5) * kutu));
    hiz.push(new THREE.Vector3((Math.random() - 0.5) * 0.012, (Math.random() - 0.5) * 0.012, (Math.random() - 0.5) * 0.012));
  }
  const renkler = [0x2ee59d, 0x3aa0ff, 0x19c3d6, 0x7ffcff];
  const nok = new THREE.InstancedMesh(new THREE.SphereGeometry(0.16, 10, 8), new THREE.MeshBasicMaterial({ color: 0xffffff }), N);
  const d = new THREE.Object3D(), c = new THREE.Color();
  for (let i = 0; i < N; i++) nok.setColorAt(i, c.setHex(renkler[i % renkler.length]));
  sahne.add(nok);
  const MAXC = N * 6, cizgiPos = new Float32Array(MAXC * 6);
  const cg = new THREE.BufferGeometry(); cg.setAttribute('position', new THREE.BufferAttribute(cizgiPos, 3));
  const cizgi = new THREE.LineSegments(cg, new THREE.LineBasicMaterial({ color: 0x2ee59d, transparent: true, opacity: 0.22 }));
  sahne.add(cizgi);

  let fx = 0, fy = 0;
  const imlec = (e) => { fx = (e.clientX / innerWidth - 0.5); fy = (e.clientY / innerHeight - 0.5); };
  addEventListener('pointermove', imlec, { passive: true });
  function boyut() { renderer.setSize(innerWidth, innerHeight, false); kamera.aspect = innerWidth / innerHeight; kamera.updateProjectionMatrix(); }
  addEventListener('resize', boyut); boyut();

  let raf = 0, dur = false, t = 0;
  function kare() {
    raf = requestAnimationFrame(kare);
    if (dur || document.hidden) return;
    t += 0.004;
    let k = 0;
    for (let i = 0; i < N; i++) {
      const p = konum[i]; p.add(hiz[i]);
      if (Math.abs(p.x) > kutu) hiz[i].x *= -1; if (Math.abs(p.y) > kutu / 2) hiz[i].y *= -1; if (Math.abs(p.z) > kutu / 2) hiz[i].z *= -1;
      d.position.copy(p); d.scale.setScalar(1 + 0.25 * Math.sin(t * 40 + i)); d.updateMatrix(); nok.setMatrixAt(i, d.matrix);
      for (let j = i + 1; j < N && k < MAXC; j++) {
        if (p.distanceToSquared(konum[j]) < 20) { const q = konum[j]; cizgiPos.set([p.x, p.y, p.z, q.x, q.y, q.z], k * 6); k++; }
      }
    }
    nok.instanceMatrix.needsUpdate = true;
    cg.setDrawRange(0, k * 2); cg.attributes.position.needsUpdate = true;
    sahne.rotation.y = t * 0.6 + fx * 0.5; sahne.rotation.x = fy * 0.3;
    renderer.render(sahne, kamera);
  }
  kare();
  return {
    durdur(v) { dur = v; canvas.style.visibility = v ? 'hidden' : 'visible'; },
    yoket() { cancelAnimationFrame(raf); removeEventListener('resize', boyut); removeEventListener('pointermove', imlec); renderer.dispose(); }
  };
}
