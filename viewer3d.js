// Genel 3B görüntüleyici: dokunmatik yakınlaştırma/uzaklaştırma/döndürme, dokunarak seçme, bilgi kartı
import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
import { BILGI, OZEL_MODELLER } from './bilgi.js';

export class Goruntuleyici {
  constructor(kutu, secenek = {}) {
    this.kutu = kutu;
    this.bilgiGoster = secenek.bilgiGoster || (() => {});
    this.hud = secenek.hud || (() => {});
    this.renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true, powerPreference: 'high-performance' });
    this.renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
    this.renderer.outputColorSpace = THREE.SRGBColorSpace;
    this.renderer.toneMapping = THREE.ACESFilmicToneMapping;
    this.renderer.toneMappingExposure = 1.15;
    kutu.appendChild(this.renderer.domElement);
    this.canvas = this.renderer.domElement;
    this.canvas.style.touchAction = 'none';

    this.scene = new THREE.Scene();
    this.camera = new THREE.PerspectiveCamera(48, 1, 0.1, 300);
    this._isik();

    this.controls = new OrbitControls(this.camera, this.canvas);
    this.controls.enableDamping = true;
    this.controls.dampingFactor = 0.08;
    this.controls.minDistance = 1.2;
    this.controls.maxDistance = 40;
    this.controls.zoomSpeed = 0.9;
    this.controls.rotateSpeed = 0.7;
    this.controls.screenSpacePanning = true;
    this.controls.autoRotateSpeed = 1.1;
    this.controls.touches = { ONE: THREE.TOUCH.ROTATE, TWO: THREE.TOUCH.DOLLY_PAN };

    this.raycaster = new THREE.Raycaster();
    this.raycaster.camera = this.camera;
    this.saat = new THREE.Clock();
    this.sahne = null;       // { grup, guncelle, ... }
    this.vurgulu = null;
    this.ucus = null;
    this.ozelGrup = null;
    this.calisiyor = true;
    this.t = 0;

    this._olaylar();
    this._boyut();
    this.ro = new ResizeObserver(() => this._boyut());
    this.ro.observe(kutu);
    this._dongu = this._dongu.bind(this);
    this.raf = requestAnimationFrame(this._dongu);
  }

  _isik() {
    this.scene.add(new THREE.HemisphereLight(0xcfeeff, 0x0a2a4a, 1.0));
    const ana = new THREE.DirectionalLight(0xffffff, 1.6); ana.position.set(5, 8, 7); this.scene.add(ana);
    const yesil = new THREE.DirectionalLight(0x2ee59d, 0.9); yesil.position.set(-7, -2, -5); this.scene.add(yesil);
    const mavi = new THREE.DirectionalLight(0x39b6ff, 0.8); mavi.position.set(-4, 5, 6); this.scene.add(mavi);
    this.kameraIsigi = new THREE.PointLight(0xffffff, 0.8, 60);
    this.camera.add(this.kameraIsigi);
    this.scene.add(this.camera);
  }

  _boyut() {
    const w = this.kutu.clientWidth || 300, h = this.kutu.clientHeight || 300;
    this.renderer.setSize(w, h, false);
    this.canvas.style.width = '100%'; this.canvas.style.height = '100%';
    this.camera.aspect = w / h;
    // dar ekranda (telefon, dikey) sahneyi sığdırmak için görüş alanını büyüt
    this.camera.fov = w / h < 0.8 ? 62 : 48;
    this.camera.updateProjectionMatrix();
  }

  _olaylar() {
    let bas = null;
    this.canvas.addEventListener('pointerdown', (e) => { bas = { x: e.clientX, y: e.clientY, t: performance.now() }; this.otoDur(); });
    this.canvas.addEventListener('pointerup', (e) => {
      if (!bas) return;
      const d = Math.hypot(e.clientX - bas.x, e.clientY - bas.y), s = performance.now() - bas.t;
      bas = null;
      if (d < 8 && s < 600) this._sec(e);
    });
    this.canvas.addEventListener('wheel', () => { this.ucus = null; }, { passive: true });
  }

  otoDur() { this.controls.autoRotate = false; this.ucus = null; }

  // ---------------------------------------------------------------- sahne yükleme
  sahneYukle(id, yapici) {
    this.temizle();
    this.sahneId = id;
    const ctx = { hud: (m) => this.hud(m), kamera: this.camera };
    const s = yapici(ctx);
    this.sahne = s;
    this.scene.add(s.grup);
    const k = s.kamera || [0, 1, 10];
    const h = s.hedef || [0, 0, 0];
    this.baslangic = { k: new THREE.Vector3(...k), h: new THREE.Vector3(...h) };
    this.camera.position.copy(this.baslangic.k);
    this.controls.target.copy(this.baslangic.h);
    this.controls.update();
    this.controls.autoRotate = !!s.otoDondur;
    this.hud('');
    this.parcalar = this._parcalariTopla(s.grup);
    this._ozelModeliDene(id);
    return s;
  }

  _parcalariTopla(kok) {
    const liste = []; const gorulen = new Set();
    kok.traverse((o) => {
      if (o.userData && o.userData.bilgi && !gorulen.has(o.userData.bilgi)) {
        gorulen.add(o.userData.bilgi);
        liste.push({ nesne: o, bilgi: o.userData.bilgi });
      }
    });
    return liste;
  }

  temizle() {
    if (this.sahne) {
      this.scene.remove(this.sahne.grup);
      this.sahne.grup.traverse((o) => {
        if (o.geometry) o.geometry.dispose();
        if (o.material) (Array.isArray(o.material) ? o.material : [o.material]).forEach((m) => { if (m.map) m.map.dispose(); m.dispose(); });
      });
      if (this.sahne.temizle) this.sahne.temizle();
    }
    if (this.ozelGrup) { this.scene.remove(this.ozelGrup); this.ozelGrup = null; }
    this.sahne = null; this.vurgulu = null; this.ucus = null; this.parcalar = [];
  }

  // ---------------------------------------------------------------- seçme
  _sec(e) {
    const r = this.canvas.getBoundingClientRect();
    const p = new THREE.Vector2(((e.clientX - r.left) / r.width) * 2 - 1, -((e.clientY - r.top) / r.height) * 2 + 1);
    this.raycaster.setFromCamera(p, this.camera);
    const hedefler = [];
    if (this.sahne && this.sahne.grup.visible) hedefler.push(this.sahne.grup);
    if (this.ozelGrup && this.ozelGrup.visible) hedefler.push(this.ozelGrup);
    const vurular = this.raycaster.intersectObjects(hedefler, true).filter((h) => h.object.visible && this._gorunur(h.object));
    let kabuk = null;
    for (const h of vurular) {
      const sahip = this._sahip(h.object);
      if (!sahip) continue;
      if (h.object.userData.kabuk) { if (!kabuk) kabuk = sahip; continue; }
      this.sec(sahip); return;
    }
    if (kabuk) this.sec(kabuk);
  }

  _gorunur(o) { while (o) { if (!o.visible) return false; o = o.parent; } return true; }
  _sahip(o) { while (o) { if (o.userData && o.userData.bilgi) return o; o = o.parent; } return null; }

  sec(nesne, uc = true) {
    if (typeof nesne === 'string') {
      const f = this.parcalar.find((x) => x.bilgi && x.bilgi.baslik === nesne);
      if (!f) return; nesne = f.nesne;
    }
    this._vurguKaldir();
    this.vurgulu = { nesne, malzemeler: [] };
    nesne.traverse((o) => {
      if (o.isMesh || o.isInstancedMesh) {
        (Array.isArray(o.material) ? o.material : [o.material]).forEach((m) => {
          if (m && m.emissive && !this.vurgulu.malzemeler.find((x) => x.m === m)) {
            this.vurgulu.malzemeler.push({ m, renk: m.emissive.clone(), siddet: m.emissiveIntensity });
          }
        });
      }
    });
    this.bilgiGoster(nesne.userData.bilgi);
    if (uc) this._ucus(nesne);
  }

  _vurguKaldir() {
    if (!this.vurgulu) return;
    this.vurgulu.malzemeler.forEach(({ m, renk, siddet }) => { m.emissive.copy(renk); m.emissiveIntensity = siddet; });
    this.vurgulu = null;
  }
  secimiTemizle() { this._vurguKaldir(); }

  _ucus(nesne) {
    const kutu = new THREE.Box3().setFromObject(nesne);
    if (kutu.isEmpty()) return;
    const merkez = kutu.getCenter(new THREE.Vector3());
    const boy = kutu.getSize(new THREE.Vector3()).length();
    const yon = this.camera.position.clone().sub(this.controls.target).normalize();
    const mevcut = this.camera.position.distanceTo(this.controls.target);
    const mesafe = Math.min(mevcut, Math.max(boy * 1.9, 3.2));
    this.ucus = { h: merkez, k: merkez.clone().add(yon.multiplyScalar(mesafe)), t: 0 };
  }

  // ---------------------------------------------------------------- kontroller
  yakinlas(f = 0.8) {
    this.ucus = null;
    const v = this.camera.position.clone().sub(this.controls.target).multiplyScalar(f);
    const m = THREE.MathUtils.clamp(v.length(), this.controls.minDistance, this.controls.maxDistance);
    v.setLength(m);
    this.camera.position.copy(this.controls.target.clone().add(v));
  }
  sifirla() {
    if (!this.baslangic) return;
    this._vurguKaldir();
    this.ucus = { h: this.baslangic.h.clone(), k: this.baslangic.k.clone(), t: 0 };
  }
  otoDondurDegistir() { this.controls.autoRotate = !this.controls.autoRotate; return this.controls.autoRotate; }

  // ---------------------------------------------------------------- özel .glb
  async _ozelModeliDene(id) {
    const o = OZEL_MODELLER[id];
    this.ozelVar = false;
    if (!o) return;
    try {
      const gltf = await new GLTFLoader().loadAsync(o.yol);
      const grup = new THREE.Group();
      const m = gltf.scene;
      const kutu = new THREE.Box3().setFromObject(m);
      const boy = kutu.getSize(new THREE.Vector3());
      const olcek = 5 / Math.max(boy.x, boy.y, boy.z);
      m.scale.setScalar(olcek);
      kutu.setFromObject(m);
      m.position.sub(kutu.getCenter(new THREE.Vector3()));
      grup.add(m);
      (o.noktalar || []).forEach((n) => {
        const bilgi = BILGI[id] && BILGI[id][n.bilgi];
        if (!bilgi) return;
        const nokta = new THREE.Mesh(new THREE.SphereGeometry(0.12, 16, 12), new THREE.MeshStandardMaterial({ color: 0x2ee59d, emissive: 0x2ee59d, emissiveIntensity: 0.8 }));
        nokta.position.set(...n.p); nokta.userData.bilgi = bilgi; nokta.userData.nabiz = true;
        grup.add(nokta);
      });
      grup.visible = false;
      this.ozelGrup = grup; this.ozelVar = true;
      this.scene.add(grup);
      if (this.ozelHazir) this.ozelHazir();
    } catch (e) { /* model dosyası yok: sorun değil */ }
  }
  ozelGoster(ac) {
    if (!this.ozelGrup) return;
    this.ozelGrup.visible = ac;
    if (this.sahne) this.sahne.grup.visible = !ac;
  }

  // ---------------------------------------------------------------- döngü
  _dongu() {
    this.raf = requestAnimationFrame(this._dongu);
    if (!this.calisiyor) return;
    const dt = Math.min(this.saat.getDelta(), 0.05);
    this.t += dt;
    if (this.ucus) {
      const u = this.ucus; u.t = Math.min(1, u.t + dt * 1.6);
      const e = 1 - Math.pow(1 - u.t, 3);
      this.controls.target.lerp(u.h, 0.08 + 0.2 * e);
      this.camera.position.lerp(u.k, 0.08 + 0.2 * e);
      if (u.t >= 1) this.ucus = null;
    }
    if (this.vurgulu) {
      const k = 0.55 + 0.45 * Math.sin(this.t * 5);
      this.vurgulu.malzemeler.forEach(({ m }) => { m.emissive.setHex(0x2ee59d); m.emissiveIntensity = 0.35 + 0.65 * k; });
    }
    if (this.sahne && this.sahne.guncelle && this.sahne.grup.visible) this.sahne.guncelle(this.t, dt);
    if (this.ozelGrup && this.ozelGrup.visible) this.ozelGrup.children.forEach((c) => { if (c.userData.nabiz) c.scale.setScalar(1 + 0.25 * Math.sin(this.t * 4)); });
    this.controls.update();
    this.renderer.render(this.scene, this.camera);
  }

  yoket() {
    cancelAnimationFrame(this.raf);
    this.ro.disconnect();
    this.temizle();
    this.controls.dispose();
    this.renderer.dispose();
    if (this.canvas.parentNode) this.canvas.parentNode.removeChild(this.canvas);
  }
}
