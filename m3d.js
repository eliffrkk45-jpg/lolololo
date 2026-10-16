// 3B modeller için ortak yardımcılar
import * as THREE from 'three';

export { THREE };
export const V = (x, y, z) => new THREE.Vector3(x, y, z);

export function mat(renk, o = {}) {
  return new THREE.MeshStandardMaterial({ color: renk, roughness: 0.4, metalness: 0.1, emissive: renk, emissiveIntensity: 0.12, ...o });
}
export function cam(renk, opak = 0.3, o = {}) {
  return new THREE.MeshPhysicalMaterial({
    color: renk, transparent: true, opacity: opak, roughness: 0.15, metalness: 0, depthWrite: false,
    side: THREE.DoubleSide, emissive: renk, emissiveIntensity: 0.08, ...o
  });
}
export function mesh(geo, m, p = [0, 0, 0], bilgi = null, d = [0, 0, 0], s = [1, 1, 1]) {
  const o = new THREE.Mesh(geo, m);
  o.position.set(...p); o.rotation.set(...d); o.scale.set(...s);
  if (bilgi) o.userData.bilgi = bilgi;
  return o;
}
export function grup(bilgi = null, p = [0, 0, 0]) {
  const g = new THREE.Group(); g.position.set(...p);
  if (bilgi) g.userData.bilgi = bilgi;
  return g;
}
export function tup(noktalar, r, m, { seg = 48, rad = 10, bilgi = null } = {}) {
  const egri = new THREE.CatmullRomCurve3(noktalar.map((p) => V(...p)));
  const t = new THREE.Mesh(new THREE.TubeGeometry(egri, seg, r, rad, false), m);
  if (bilgi) t.userData.bilgi = bilgi;
  t.userData.egri = egri;
  return t;
}
// iki nokta arasına silindir (bağ)
export function bag(a, b, r, m) {
  const A = V(...a), B = V(...b), d = B.clone().sub(A), len = d.length();
  const c = new THREE.Mesh(new THREE.CylinderGeometry(r, r, len, 10), m);
  c.position.copy(A.clone().add(B).multiplyScalar(0.5));
  c.quaternion.setFromUnitVectors(V(0, 1, 0), d.normalize());
  return c;
}
// küre üzerinde eşit dağılımlı noktalar
export function kureNoktalari(n, r) {
  const liste = [], ga = Math.PI * (3 - Math.sqrt(5));
  for (let i = 0; i < n; i++) {
    const y = 1 - (i / (n - 1)) * 2, rr = Math.sqrt(1 - y * y), t = ga * i;
    liste.push(V(Math.cos(t) * rr * r, y * r, Math.sin(t) * rr * r));
  }
  return liste;
}
// tekrarlanabilir rastgele sayı
export function rastgele(tohum = 1) {
  let a = tohum >>> 0;
  return () => { a |= 0; a = (a + 0x6D2B79F5) | 0; let t = Math.imul(a ^ (a >>> 15), 1 | a); t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t; return ((t ^ (t >>> 14)) >>> 0) / 4294967296; };
}
// yazı levhası (her zaman kameraya bakar)
export function etiket(metin, { renk = '#eafff6', arka = 'rgba(6,32,58,0.82)', olcek = 1.0, boyut = 54 } = {}) {
  const c = document.createElement('canvas'); c.width = 512; c.height = 128;
  const x = c.getContext('2d');
  x.font = `700 ${boyut}px system-ui, "Segoe UI", sans-serif`;
  const w = Math.min(500, x.measureText(metin).width + 56);
  x.fillStyle = arka; x.strokeStyle = 'rgba(46,229,157,0.9)'; x.lineWidth = 4;
  const x0 = (512 - w) / 2, y0 = 24, h = 80, r = 40;
  x.beginPath(); x.moveTo(x0 + r, y0); x.arcTo(x0 + w, y0, x0 + w, y0 + h, r); x.arcTo(x0 + w, y0 + h, x0, y0 + h, r);
  x.arcTo(x0, y0 + h, x0, y0, r); x.arcTo(x0, y0, x0 + w, y0, r); x.closePath(); x.fill(); x.stroke();
  x.fillStyle = renk; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillText(metin, 256, 66);
  const tex = new THREE.CanvasTexture(c); tex.colorSpace = THREE.SRGBColorSpace;
  const s = new THREE.Sprite(new THREE.SpriteMaterial({ map: tex, depthTest: false, transparent: true }));
  s.scale.set(3.2 * olcek, 0.8 * olcek, 1); s.renderOrder = 20;
  return s;
}
// + ve − işaret levhaları
const isaretOnbellek = {};
export function isaretDokusu(isaret, renk) {
  const k = isaret + renk; if (isaretOnbellek[k]) return isaretOnbellek[k];
  const c = document.createElement('canvas'); c.width = c.height = 64;
  const x = c.getContext('2d'); x.fillStyle = renk; x.font = '700 60px system-ui, sans-serif';
  x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillText(isaret, 32, 36);
  const t = new THREE.CanvasTexture(c); t.colorSpace = THREE.SRGBColorSpace; isaretOnbellek[k] = t; return t;
}
export const yumusat = (t) => t * t * (3 - 2 * t);
export const sinir = (x, a, b) => Math.min(b, Math.max(a, x));
export const lerp = (a, b, t) => a + (b - a) * t;
