// 3B sahneler (1): hücre, nöron, refleks yayı, beyin, omurilik
import { THREE, V, mat, cam, mesh, grup, tup, kureNoktalari, rastgele, etiket, sinir, lerp, yumusat } from './m3d.js';
import { BILGI } from './bilgi.js';

// ======================================================================= HÜCRE
export function hucre() {
  const I = BILGI.hucre, g = new THREE.Group(), rnd = rastgele(7), yuzen = [];

  const zar = mesh(new THREE.SphereGeometry(3.3, 64, 48), cam(0x2aa7ff, 0.14), [0, 0, 0], I.zar); zar.userData.kabuk = true; g.add(zar);
  const N = 650, nk = kureNoktalari(N, 3.32);
  const bas = new THREE.InstancedMesh(new THREE.SphereGeometry(0.075, 8, 6), mat(0x9be7ff, { emissiveIntensity: 0.35 }), N);
  bas.userData.bilgi = I.zar; bas.userData.kabuk = true;
  const d = new THREE.Object3D();
  nk.forEach((p, i) => { d.position.copy(p); d.updateMatrix(); bas.setMatrixAt(i, d.matrix); });
  g.add(bas);
  const zarParcalari = [zar, bas];
  for (let i = 0; i < 14; i++) {
    const p = nk[(i * 45) % N];
    const pr = mesh(new THREE.SphereGeometry(0.17, 12, 10), mat(0x2ee59d), p.toArray(), I.zar, [0, 0, 0], [1, 1, 1.9]);
    pr.lookAt(0, 0, 0); g.add(pr); zarParcalari.push(pr);
  }
  const sit = mesh(new THREE.SphereGeometry(3.2, 40, 30), cam(0x0b8fa8, 0.07), [0, 0, 0], I.sitoplazma); sit.userData.kabuk = true; g.add(sit);

  // çekirdek
  const cek = grup(I.cekirdek, [-0.7, 0.3, 0]);
  const zarfi = mesh(new THREE.SphereGeometry(1.05, 40, 30), cam(0x4a6cff, 0.32), [0, 0, 0]); zarfi.userData.kabuk = true; cek.add(zarfi);
  for (let i = 0; i < 3; i++) cek.add(mesh(new THREE.TorusKnotGeometry(0.4, 0.05, 64, 8, 2 + i, 3), mat(0x8f7bff), [0, 0, 0], null, [i * 1.1, i * 0.7, i * 0.4]));
  cek.add(mesh(new THREE.SphereGeometry(0.28, 20, 16), mat(0xffb347), [0.25, 0.1, 0.2], I.cekirdekcik));
  g.add(cek);

  // mitokondri
  const mito = (p, r) => {
    const m = grup(I.mitokondri, p); m.rotation.set(r[0], r[1], r[2]);
    const dis = mesh(new THREE.CapsuleGeometry(0.22, 0.6, 8, 16), cam(0xff8a5c, 0.55, { emissiveIntensity: 0.15 }), [0, 0, 0], null, [0, 0, Math.PI / 2]); dis.userData.kabuk = true; m.add(dis);
    for (let k = 0; k < 4; k++) m.add(mesh(new THREE.TorusGeometry(0.13, 0.03, 8, 16), mat(0xffd0b0), [-0.36 + k * 0.24, 0, 0], null, [0, Math.PI / 2, 0]));
    g.add(m); yuzen.push([m, p[1], rnd() * 6]);
  };
  [[2.0, -0.6, 1.2], [-2.0, 1.6, 0.9], [0.6, 1.9, -1.5], [-0.5, -1.0, -1.9], [1.8, 1.4, 1.0]].forEach((p, i) => mito(p, [rnd() * 3, rnd() * 3, rnd() * 3]));

  // granüllü ER
  const ger = grup(I.granulluER, [1.5, 0.5, -0.4]); ger.rotation.y = 0.5;
  const ribER = new THREE.InstancedMesh(new THREE.SphereGeometry(0.04, 6, 5), mat(0xffffff), 5 * 26);
  let ri = 0;
  for (let i = 0; i < 5; i++) {
    const pg = new THREE.PlaneGeometry(1.9, 1.2, 24, 12), ps = pg.attributes.position;
    for (let j = 0; j < ps.count; j++) ps.setZ(j, 0.09 * Math.sin(ps.getX(j) * 4.5 + i) * Math.cos(ps.getY(j) * 3.5));
    pg.computeVertexNormals();
    const pl = mesh(pg, mat(0x37d9a0, { side: THREE.DoubleSide, roughness: 0.6 }), [0, i * 0.2 - 0.4, 0], null, [-Math.PI / 2, 0, 0]);
    ger.add(pl);
    for (let k = 0; k < 26; k++) { d.position.set((rnd() - 0.5) * 1.7, i * 0.2 - 0.4 + 0.09, (rnd() - 0.5) * 1.0); d.updateMatrix(); ribER.setMatrixAt(ri++, d.matrix); }
  }
  ger.add(ribER); g.add(ger); yuzen.push([ger, 0.5, 1.3]);

  // düz ER
  const duz = grup(I.duzER, [1.2, -1.4, 0.7]);
  for (let i = 0; i < 4; i++) {
    const pts = []; for (let k = 0; k < 6; k++) pts.push([(k - 2.5) * 0.32 + (rnd() - 0.5) * 0.15, (rnd() - 0.5) * 0.5, (i - 1.5) * 0.28 + (rnd() - 0.5) * 0.3]);
    duz.add(tup(pts, 0.07, mat(0xa6f07a), { seg: 24, rad: 8 }));
  }
  g.add(duz); yuzen.push([duz, -1.4, 2.2]);

  // Golgi
  const gol = grup(I.golgi, [-1.9, -1.6, 0.5]); gol.rotation.set(0.4, 0.6, 0.2);
  for (let i = 0; i < 5; i++) gol.add(mesh(new THREE.TorusGeometry(0.75 - Math.abs(i - 2) * 0.06, 0.07, 8, 32, Math.PI * 0.85), mat(0xffd166), [0, i * 0.2 - 0.4, 0], null, [Math.PI / 2, 0, 0.2]));
  for (let i = 0; i < 4; i++) gol.add(mesh(new THREE.SphereGeometry(0.1, 10, 8), mat(0xffe08a), [0.85 + (i % 2) * 0.2, i * 0.22 - 0.3, -0.1 + i * 0.12]));
  g.add(gol); yuzen.push([gol, -1.6, 3.1]);

  // lizozom
  [[2.4, 1.2, -0.5], [-2.4, -0.3, 1.4], [0.3, -2.3, 0.6], [1.8, -1.9, -0.9]].forEach((p, i) => {
    const l = grup(I.lizozom, p);
    l.add(mesh(new THREE.SphereGeometry(0.2, 18, 14), cam(0xff5d8f, 0.7, { emissiveIntensity: 0.2 })));
    for (let k = 0; k < 4; k++) l.add(mesh(new THREE.SphereGeometry(0.05, 6, 5), mat(0xffd0e0), [(rnd() - 0.5) * 0.15, (rnd() - 0.5) * 0.15, (rnd() - 0.5) * 0.15]));
    g.add(l); yuzen.push([l, p[1], i * 1.7]);
  });

  // sentriyol
  const sen = grup(I.sentriyol, [0.6, 2.2, 0.6]);
  sen.add(mesh(new THREE.CapsuleGeometry(0.07, 0.38, 6, 10), mat(0xc77dff), [0, 0, 0], null, [0, 0, Math.PI / 2]));
  sen.add(mesh(new THREE.CapsuleGeometry(0.07, 0.38, 6, 10), mat(0xc77dff), [0.1, 0, 0.3], null, [Math.PI / 2, 0, 0]));
  g.add(sen); yuzen.push([sen, 2.2, 0.4]);

  // koful
  [[-0.4, -0.2, -2.3, 0.35], [-2.5, 0.5, -1.2, 0.25]].forEach((k) => { const o = mesh(new THREE.SphereGeometry(k[3], 20, 16), cam(0xbfe9ff, 0.4), [k[0], k[1], k[2]], I.koful); g.add(o); });

  // ribozomlar
  const rib = new THREE.InstancedMesh(new THREE.SphereGeometry(0.05, 6, 5), mat(0xf2fbff, { emissiveIntensity: 0.3 }), 170);
  rib.userData.bilgi = I.ribozom;
  let n = 0;
  while (n < 170) {
    const p = V((rnd() - 0.5) * 6, (rnd() - 0.5) * 6, (rnd() - 0.5) * 6);
    if (p.length() > 2.9 || p.distanceTo(V(-0.7, 0.3, 0)) < 1.35) continue;
    d.position.copy(p); d.updateMatrix(); rib.setMatrixAt(n++, d.matrix);
  }
  g.add(rib);

  return {
    grup: g, kamera: [0, 1.5, 9.5], otoDondur: true,
    guncelle(t, dt) { yuzen.forEach(([o, y, f]) => { o.position.y = y + Math.sin(t * 0.7 + f) * 0.07; o.rotation.y += dt * 0.12; }); },
    eylemler: [{ ad: 'Zarı gizle', ac() { const v = !zar.visible; zarParcalari.forEach((o) => { o.visible = v; }); sit.visible = v; return v ? 'Zarı gizle' : 'Zarı göster'; } }]
  };
}

// ======================================================================= NÖRON
export function noron(ctx) {
  const I = BILGI.noron, g = new THREE.Group(), rnd = rastgele(11);
  const govde = grup(I.govde, [-5, 0, 0]);
  const kabuk = mesh(new THREE.SphereGeometry(1.0, 48, 32), cam(0x2a8cff, 0.5, { emissiveIntensity: 0.2 })); kabuk.userData.kabuk = true; govde.add(kabuk);
  const cek = grup(I.cekirdek);
  cek.add(mesh(new THREE.SphereGeometry(0.45, 28, 20), mat(0x6a5cff)));
  cek.add(mesh(new THREE.SphereGeometry(0.15, 14, 10), mat(0xffb347), [0.2, 0.1, 0.25]));
  govde.add(cek);
  for (let i = 0; i < 40; i++) { const p = V(rnd() - 0.5, rnd() - 0.5, rnd() - 0.5).normalize().multiplyScalar(0.55 + rnd() * 0.3); govde.add(mesh(new THREE.SphereGeometry(0.04, 6, 5), mat(0xbfe9ff), p.toArray())); }
  g.add(govde);

  // dendritler
  const dend = grup(I.dendrit), dm = mat(0x4db8ff, { emissiveIntensity: 0.2 });
  const dallan = (p0, yon, uz, der) => {
    const p1 = p0.clone().add(yon.clone().multiplyScalar(uz));
    const ort = p0.clone().lerp(p1, 0.5).add(V((rnd() - 0.5) * 0.2, (rnd() - 0.5) * 0.2, (rnd() - 0.5) * 0.2));
    dend.add(tup([p0.toArray(), ort.toArray(), p1.toArray()], 0.025 + 0.035 * der, dm, { seg: 10, rad: 6 }));
    if (der > 0) for (let k = 0; k < 2; k++) {
      const nd = yon.clone().applyAxisAngle(V(rnd() - 0.5, rnd() - 0.5, rnd() - 0.5).normalize(), (k ? 1 : -1) * (0.45 + rnd() * 0.3)).normalize();
      dallan(p1, nd, uz * 0.74, der - 1);
    } else dend.add(mesh(new THREE.SphereGeometry(0.06, 8, 6), mat(0x9fe3ff), p1.toArray()));
  };
  [[-1, 0.6, 0], [-1, -0.6, 0.2], [-0.3, 1, 0.2], [-0.3, -1, -0.2], [-0.7, 0.2, 1], [-0.7, -0.1, -1]].forEach((v) => {
    const y = V(...v).normalize(); dallan(V(-5, 0, 0).add(y.clone().multiplyScalar(0.95)), y, 0.8, 3);
  });
  g.add(dend);

  // akson tepeciği ve akson
  g.add(mesh(new THREE.ConeGeometry(0.5, 0.95, 24), mat(0x39b8ff), [-3.6, 0, 0], I.aksonTepe, [0, 0, -Math.PI / 2]));
  g.add(tup([[-3.2, 0, 0], [5.4, 0, 0]], 0.14, mat(0x39d0ff, { emissiveIntensity: 0.3 }), { seg: 4, rad: 12, bilgi: I.akson }));

  // miyelin parçaları + Schwann çekirdekleri
  const miyelinler = [], schw = [];
  for (let i = 0; i < 6; i++) {
    const x = -2.2 + 1.3 * i;
    const m = mesh(new THREE.CapsuleGeometry(0.32, 0.36, 10, 20), mat(0xf6e7a8, { roughness: 0.6, emissiveIntensity: 0.08 }), [x, 0, 0], I.miyelin, [0, 0, Math.PI / 2]);
    g.add(m); miyelinler.push(m);
    if (i === 1 || i === 4) { const s = mesh(new THREE.SphereGeometry(0.2, 16, 12), mat(0xb47cff), [x, 0.3, 0.05], I.schwann, [0, 0, 0], [1.3, 0.55, 0.9]); g.add(s); schw.push(s); }
  }
  // Ranvier boğumları
  const dugumX = [-1.55, -0.25, 1.05, 2.35, 3.65], dugumler = [];
  dugumX.forEach((x) => { const r = mesh(new THREE.TorusGeometry(0.19, 0.06, 10, 24), mat(0xff9f1c, { emissiveIntensity: 0.3 }), [x, 0, 0], I.ranvier, [0, Math.PI / 2, 0]); g.add(r); dugumler.push({ r, f: 0 }); });

  // terminaller
  const term = grup(I.terminal), tb = [];
  [[0.9, 1.0, 0.3], [1.3, -0.1, 0.9], [1.0, -1.0, -0.4]].forEach((o) => {
    const son = [5.4 + o[0], o[1], o[2]];
    term.add(tup([[5.4, 0, 0], [5.4 + o[0] * 0.5, o[1] * 0.4, o[2] * 0.4], son], 0.07, mat(0x39d0ff), { seg: 14, rad: 8 }));
    const b = mesh(new THREE.SphereGeometry(0.3, 20, 16), mat(0x2ee59d, { emissiveIntensity: 0.25 }), son); term.add(b); tb.push(b);
    for (let k = 0; k < 3; k++) term.add(mesh(new THREE.SphereGeometry(0.06, 8, 6), mat(0xffe27a), [son[0] + (rnd() - 0.5) * 0.25, son[1] + (rnd() - 0.5) * 0.25, son[2] + (rnd() - 0.5) * 0.25]));
  });
  g.add(term);

  // impuls
  const imp = new THREE.Group();
  imp.add(mesh(new THREE.SphereGeometry(0.2, 20, 16), mat(0xffffff, { emissive: 0x7ffcff, emissiveIntensity: 1.4 })));
  imp.add(mesh(new THREE.SphereGeometry(0.42, 20, 16), new THREE.MeshBasicMaterial({ color: 0x7ffcff, transparent: true, opacity: 0.28, depthWrite: false })));
  imp.visible = false; g.add(imp);
  const kv = new THREE.Group(); g.add(kv); let kvlist = [];

  let miyelinli = true, st = { on: false, t: 0, ph: 0 };
  const X = [-3.3, ...dugumX, 5.4], HOP = 0.3;
  const dendNokta = [V(-6.6, 1.4, 0), V(-5, 0, 0), V(-3.3, 0, 0)];
  function gonder() {
    st = { on: true, t: 0, ph: 0 }; imp.visible = true; imp.position.copy(dendNokta[0]);
    ctx.hud('<b>Dendrit ve gövde:</b> uyarılar toplanıyor');
  }
  function kivilcim() {
    kvlist.forEach((k) => kv.remove(k.m)); kvlist = [];
    tb.forEach((b) => { for (let i = 0; i < 6; i++) { const m = mesh(new THREE.SphereGeometry(0.07, 8, 6), new THREE.MeshBasicMaterial({ color: 0xffe27a, transparent: true, opacity: 1 }), b.position.toArray()); kv.add(m); kvlist.push({ m, v: V(0.5 + rnd() * 0.9, (rnd() - 0.5) * 1.4, (rnd() - 0.5) * 1.4) }); } });
  }
  return {
    grup: g, kamera: [0.5, 2.4, 12.5], hedef: [0.5, 0, 0],
    guncelle(t, dt) {
      if (st.on) {
        st.t += dt;
        if (st.ph === 0) {
          const u = Math.min(1, st.t / 1.6);
          if (u < 0.5) imp.position.lerpVectors(dendNokta[0], dendNokta[1], yumusat(u * 2)); else imp.position.lerpVectors(dendNokta[1], dendNokta[2], yumusat((u - 0.5) * 2));
          if (u >= 1) { st.ph = 1; st.t = 0; ctx.hud('<b>Akson tepeciği:</b> eşik aşıldı, aksiyon potansiyeli başladı<br>' + (miyelinli ? '<b>Miyelinli akson:</b> impuls boğumdan boğuma sıçrıyor' : '<b>Miyelinsiz akson:</b> iletim kesintisiz ve yavaş')); }
        } else if (st.ph === 1) {
          if (miyelinli) {
            const k = Math.floor(st.t / HOP), loc = (st.t % HOP) / HOP;
            if (k >= X.length - 1) { st.ph = 2; st.t = 0; imp.position.x = X[X.length - 1]; kivilcim(); ctx.hud('<b>Akson terminali:</b> nörotransmitter salınıyor'); }
            else {
              imp.position.x = lerp(X[k], X[k + 1], yumusat(sinir(loc / 0.5, 0, 1))); imp.position.y = 0; imp.position.z = 0;
              if (loc > 0.5) { const dn = dugumler[k]; if (dn) dn.f = 1; }
            }
          } else {
            imp.position.x = X[0] + st.t * 1.6; imp.position.y = 0; imp.position.z = 0;
            if (imp.position.x >= X[X.length - 1]) { st.ph = 2; st.t = 0; kivilcim(); ctx.hud('<b>Akson terminali:</b> nörotransmitter salınıyor'); }
          }
        } else if (st.ph === 2) {
          imp.visible = false; tb.forEach((b) => { b.scale.setScalar(1 + 0.3 * Math.sin(st.t * 12)); });
          if (st.t > 1.8) { st.on = false; tb.forEach((b) => b.scale.setScalar(1)); ctx.hud(''); }
        }
        imp.children[1].scale.setScalar(1 + 0.25 * Math.sin(t * 14));
      }
      dugumler.forEach((d) => { d.f = Math.max(0, d.f - dt * 2.5); d.r.material.emissiveIntensity = 0.3 + d.f * 2.2; d.r.scale.setScalar(1 + d.f * 0.5); });
      kvlist.forEach((k) => { k.m.position.addScaledVector(k.v, dt); k.m.material.opacity = Math.max(0, k.m.material.opacity - dt * 0.6); });
    },
    eylemler: [
      { ad: '⚡ İmpuls gönder', ac() { gonder(); } },
      { ad: 'Miyelini kaldır', ac() { miyelinli = !miyelinli; miyelinler.forEach((m) => { m.visible = miyelinli; }); schw.forEach((m) => { m.visible = miyelinli; }); ctx.hud(miyelinli ? 'Miyelinli nöron: hızlı, sıçrayarak iletim' : 'Miyelinsiz nöron: yavaş, kesintisiz iletim'); return miyelinli ? 'Miyelini kaldır' : 'Miyelini geri koy'; } }
    ]
  };
}

// ======================================================================= OMURİLİK KESİTİ (ortak)
export function omurilikKesit(kal = 0.8) {
  const g = new THREE.Group();
  const beyaz = mesh(new THREE.CylinderGeometry(1.9, 1.9, kal, 56), cam(0xd7ecf8, 0.55, { roughness: 0.5 }), [0, 0, 0], null, [Math.PI / 2, 0, 0]); beyaz.userData.kabuk = true;
  const gm = () => mat(0x4b86c8, { roughness: 0.5 }), z = kal * 0.5;
  const merkez = mesh(new THREE.SphereGeometry(1, 24, 16), gm(), [0, 0, 0], null, [0, 0, 0], [0.6, 0.5, z]);
  const arka = [-1, 1].map((s) => mesh(new THREE.SphereGeometry(1, 24, 16), gm(), [s * 0.5, 0.85, 0], null, [0, 0, s * 0.3], [0.2, 0.72, z]));
  const on = [-1, 1].map((s) => mesh(new THREE.SphereGeometry(1, 24, 16), gm(), [s * 0.78, -0.55, 0], null, [0, 0, -s * 0.35], [0.58, 0.45, z]));
  const kanal = mesh(new THREE.CylinderGeometry(0.08, 0.08, kal * 1.04, 12), mat(0x00e5ff, { emissiveIntensity: 0.6 }), [0, 0, 0], null, [Math.PI / 2, 0, 0]);
  [beyaz, merkez, ...arka, ...on, kanal].forEach((o) => g.add(o));
  return { g, beyaz, gri: [merkez], arka, on, kanal };
}

// ======================================================================= REFLEKS YAYI
export function refleks(ctx) {
  const I = BILGI.refleks, g = new THREE.Group();
  const kes = omurilikKesit(0.8);
  kes.beyaz.userData.bilgi = I.omurilikBeyaz;
  [...kes.gri, ...kes.arka, ...kes.on].forEach((o) => { o.userData.bilgi = I.omurilikGri; });
  g.add(kes.g);

  const mS = mat(0x3aa0ff, { emissiveIntensity: 0.25 }), mA = mat(0x2ee59d, { emissiveIntensity: 0.25 }), mM = mat(0xffc857, { emissiveIntensity: 0.25 });
  const duyuP = [[-6.9, 2.0, 0], [-5.6, 2.0, 0], [-4.2, 1.9, 0], [-2.8, 1.7, 0], [-1.4, 1.35, 0], [-0.55, 0.75, 0]];
  const araP = [[-0.55, 0.75, 0], [-0.2, 0.3, 0], [0.25, -0.2, 0], [0.7, -0.7, 0], [1.0, -0.95, 0]];
  const motorP = [[1.15, -1.05, 0], [1.7, -1.9, 0], [3.0, -2.4, 0], [4.6, -2.5, 0], [6.0, -2.45, 0]];
  const duyu = tup(duyuP, 0.09, mS, { seg: 60, rad: 10, bilgi: I.duyu });
  const ara = tup(araP, 0.09, mA, { seg: 30, rad: 10, bilgi: I.ara });
  const motor = tup(motorP, 0.09, mM, { seg: 50, rad: 10, bilgi: I.motor });
  g.add(duyu, ara, motor);
  // miyelin (duyu ve motor)
  const mil = mat(0xf6e7a8, { roughness: 0.6, emissiveIntensity: 0.06 });
  const sar = (egri, a, b, adet, bilgi) => { for (let i = 0; i < adet; i++) { const u = a + (b - a) * (i / (adet - 1 || 1)); const p = egri.getPointAt(u), tg = egri.getTangentAt(u); const m = mesh(new THREE.CapsuleGeometry(0.17, 0.35, 6, 12), mil, p.toArray(), bilgi); m.quaternion.setFromUnitVectors(V(0, 1, 0), tg); g.add(m); } };
  sar(duyu.userData.egri, 0.08, 0.82, 7, I.duyu); sar(motor.userData.egri, 0.1, 0.9, 6, I.motor);
  // gövdeler
  g.add(mesh(new THREE.CylinderGeometry(0.05, 0.05, 0.4, 8), mS, [-4.2, 2.1, 0], I.duyu));
  g.add(mesh(new THREE.SphereGeometry(0.34, 20, 16), mS, [-4.2, 2.45, 0], I.duyu));
  g.add(mesh(new THREE.SphereGeometry(0.24, 20, 16), mA, [-0.05, 0.42, 0.02], I.ara));
  g.add(mesh(new THREE.SphereGeometry(0.36, 20, 16), mM, [1.05, -1.02, 0.02], I.motor));
  // uç dalları
  [[0.5, 0.3], [0.5, -0.3], [0.6, 0.0]].forEach((o) => g.add(tup([[6.0, -2.45, 0], [6.3, -2.45 + o[1] * 0.5, 0], [6.55, -2.45 + o[1], 0]], 0.04, mM, { seg: 8, rad: 6, bilgi: I.motor })));
  // deri + reseptör + sıcak cisim
  const deri = grup(I.reseptor, [-7.1, 1.7, 0]);
  deri.add(mesh(new THREE.BoxGeometry(2.4, 0.5, 1.6), mat(0xe8b98f, { roughness: 0.8, emissiveIntensity: 0.05 })));
  deri.add(mesh(new THREE.SphereGeometry(0.2, 16, 12), mat(0xff6b6b, { emissiveIntensity: 0.4 }), [0.2, 0.3, 0]));
  g.add(deri);
  const sicak = grup(null, [-6.9, 3.6, 0]);
  sicak.add(mesh(new THREE.SphereGeometry(0.42, 20, 16), mat(0xff7a29, { emissiveIntensity: 0.9 })));
  sicak.add(mesh(new THREE.ConeGeometry(0.3, 0.8, 16), mat(0xffc24a, { emissiveIntensity: 0.9 }), [0, 0.55, 0]));
  g.add(sicak);
  // kas
  const kas = mesh(new THREE.CapsuleGeometry(0.55, 1.6, 8, 16), mat(0xff6b81, { emissiveIntensity: 0.2 }), [7.4, -2.45, 0], I.kas, [0, 0, Math.PI / 2]);
  g.add(kas);
  const lbl = (t, p) => { const s = etiket(t, { olcek: 0.9 }); s.position.set(...p); g.add(s); };
  lbl('Reseptör (deri)', [-7.1, 0.7, 0]); lbl('Duyu nöronu', [-3.6, 3.3, 0]); lbl('Ara nöron', [-0.3, 2.9, 0]); lbl('Motor nöron', [3.6, -3.4, 0]); lbl('Kas (efektör)', [7.4, -1.3, 0]); lbl('Omurilik', [0, -2.8, 0]);

  // impuls
  const imp = new THREE.Group();
  imp.add(mesh(new THREE.SphereGeometry(0.2, 20, 16), mat(0xffffff, { emissive: 0x7ffcff, emissiveIntensity: 1.4 })));
  imp.add(mesh(new THREE.SphereGeometry(0.42, 20, 16), new THREE.MeshBasicMaterial({ color: 0x7ffcff, transparent: true, opacity: 0.28, depthWrite: false })));
  imp.visible = false; g.add(imp);
  const parcalar = [{ e: duyu.userData.egri, s: 4.5, m: '<b>1) Duyu nöronu:</b> impuls omuriliğe taşınıyor' }, { e: ara.userData.egri, s: 1.6, m: '<b>2) Ara nöron:</b> omurilikte duyu ve motor nöronu bağlıyor' }, { e: motor.userData.egri, s: 4.5, m: '<b>3) Motor nöron:</b> emir kasa gidiyor' }];
  let st = { on: false, i: 0, u: 0, son: 0 };
  return {
    grup: g, kamera: [0, 0.5, 14], hedef: [0, 0, 0],
    guncelle(t, dt) {
      sicak.position.y = 3.6 + Math.sin(t * 3) * 0.08; sicak.children[1].scale.y = 1 + 0.15 * Math.sin(t * 9);
      if (st.on) {
        const p = parcalar[st.i];
        if (st.u === 0) ctx.hud(p.m);
        st.u += dt * p.s / p.e.getLength();
        if (st.u >= 1) { st.i++; st.u = 0; if (st.i >= parcalar.length) { st.on = false; imp.visible = false; st.son = 1.2; ctx.hud('<b>4) Efektör (kas)</b> kasılır, el sıcak cisimden çekilir (refleks)'); } }
        else imp.position.copy(p.e.getPointAt(Math.min(1, st.u)));
      }
      if (st.son > 0) { st.son -= dt; const k = Math.sin((1.2 - st.son) / 1.2 * Math.PI); kas.scale.set(1 - 0.25 * k, 1 + 0.35 * k, 1 + 0.35 * k); deri.position.x = -7.1 - 0.5 * k; sicak.position.x = -6.9; if (st.son <= 0) { kas.scale.set(1, 1, 1); deri.position.x = -7.1; setTimeout(() => ctx.hud(''), 1800); } }
    },
    eylemler: [{ ad: '🔥 Refleksi başlat', ac() { if (st.on) return; st = { on: true, i: 0, u: 0, son: 0 }; imp.visible = true; imp.position.copy(parcalar[0].e.getPointAt(0)); } }]
  };
}

// ======================================================================= BEYİN
function serebrumYap(I) {
  const geo = new THREE.SphereGeometry(1, 120, 90), pos = geo.attributes.position, v = new THREE.Vector3();
  const birim = [];
  for (let i = 0; i < pos.count; i++) {
    v.fromBufferAttribute(pos, i);
    const nx = v.x, ny = v.y, nz = v.z; birim.push([nx, ny, nz]);
    let r = 1;
    r += 0.035 * Math.sin(nx * 9 + ny * 5) * Math.cos(ny * 8 - nz * 6) + 0.028 * Math.sin(nz * 11 + nx * 6) * Math.sin(ny * 10 + nx * 4) + 0.02 * Math.sin(nx * 17 + nz * 13);
    r -= 0.1 * Math.exp(-(nz * nz) / 0.006) * (ny > 0 ? 1 : 0.4);
    r -= 0.06 * Math.exp(-Math.pow(ny + 0.12 - 0.15 * nx, 2) / 0.004) * (Math.abs(nz) > 0.3 ? 1 : 0);
    let y = ny * 1.75 * r; if (ny < -0.5) y *= 0.82;
    pos.setXYZ(i, nx * 2.7 * r, y, nz * 1.5 * r);
  }
  geo.computeVertexNormals();
  const nor = geo.attributes.normal, idx = geo.index.array;
  const bolge = (x, y) => (x < -0.55 ? 'oksipital' : y < -0.1 && x < 0.55 ? 'temporal' : x > 0.3 ? 'onLob' : 'parietal');
  const ds = { onLob: { p: [], n: [] }, parietal: { p: [], n: [] }, temporal: { p: [], n: [] }, oksipital: { p: [], n: [] } };
  for (let f = 0; f < idx.length; f += 3) {
    const a = idx[f], b = idx[f + 1], c = idx[f + 2];
    const cx = (birim[a][0] + birim[b][0] + birim[c][0]) / 3, cy = (birim[a][1] + birim[b][1] + birim[c][1]) / 3;
    const k = bolge(cx, cy), hedef = ds[k];
    [a, b, c].forEach((q) => { hedef.p.push(pos.getX(q), pos.getY(q), pos.getZ(q)); hedef.n.push(nor.getX(q), nor.getY(q), nor.getZ(q)); });
  }
  const renk = { onLob: 0x3a9bff, parietal: 0x34d98c, temporal: 0x1cc8d8, oksipital: 0x7a8cff };
  const cikti = {};
  Object.keys(ds).forEach((k) => {
    const gg = new THREE.BufferGeometry();
    gg.setAttribute('position', new THREE.Float32BufferAttribute(ds[k].p, 3));
    gg.setAttribute('normal', new THREE.Float32BufferAttribute(ds[k].n, 3));
    cikti[k] = mesh(gg, mat(renk[k], { roughness: 0.55, emissiveIntensity: 0.1 }), [0, 0, 0], I[k]);
  });
  return cikti;
}

export function beyin() {
  const I = BILGI.beyin, g = new THREE.Group();
  const ser = serebrumYap(I);
  Object.values(ser).forEach((m) => g.add(m));

  // beyincik
  const bg = new THREE.SphereGeometry(1, 64, 48), bp = bg.attributes.position;
  for (let i = 0; i < bp.count; i++) { const y = bp.getY(i), r = 1 + 0.05 * Math.sin(y * 34); bp.setXYZ(i, bp.getX(i) * r, y * r, bp.getZ(i) * r); }
  bg.computeVertexNormals();
  const beyincik = mesh(bg, mat(0xffb347, { roughness: 0.6 }), [-1.7, -1.5, 0], I.beyincik, [0, 0, 0], [1.05, 0.65, 1.2]); g.add(beyincik);

  // beyin sapı
  const sap = new THREE.Group(); sap.rotation.z = 0.12; sap.position.set(-0.25, 0, 0); g.add(sap);
  sap.add(mesh(new THREE.CylinderGeometry(0.42, 0.38, 0.8, 24), mat(0xff7a9c), [0.1, -1.3, 0], I.orta));
  sap.add(mesh(new THREE.SphereGeometry(0.62, 28, 20), mat(0xff9f7a), [0.12, -1.95, 0], I.pons, [0, 0, 0], [0.85, 0.7, 0.95]));
  sap.add(mesh(new THREE.CylinderGeometry(0.4, 0.28, 1.1, 24), mat(0xff5d8f), [0.1, -2.75, 0], I.soganSinir));
  sap.add(mesh(new THREE.CylinderGeometry(0.24, 0.22, 1.2, 20), mat(0xd9e8f5), [0.1, -3.9, 0], I.omurilik));

  // iç yapılar
  const ic = new THREE.Group(); ic.visible = false; g.add(ic);
  ic.add(mesh(new THREE.SphereGeometry(1, 24, 18), mat(0xffd166), [0, 0.1, 0], I.talamus, [0, 0, 0], [0.5, 0.35, 0.42]));
  ic.add(mesh(new THREE.SphereGeometry(0.26, 20, 14), mat(0xff8a5c), [0.4, -0.5, 0], I.hipotalamus));

  let seffaf = false;
  const etk = (t, p) => { const s = etiket(t, { olcek: 0.8 }); s.position.set(...p); s.visible = false; g.add(s); return s; };
  return {
    grup: g, kamera: [0.5, 1.2, 8], hedef: [-0.1, -0.7, 0], otoDondur: true,
    guncelle(t) { ic.children.forEach((c, i) => { c.scale.multiplyScalar(1); }); },
    eylemler: [
      { ad: 'İç yapıları göster', ac() { seffaf = !seffaf; Object.values(ser).forEach((m) => { m.material.transparent = seffaf; m.material.opacity = seffaf ? 0.2 : 1; m.material.depthWrite = !seffaf; if (seffaf) m.userData.kabuk = true; else delete m.userData.kabuk; }); ic.visible = seffaf; return seffaf ? 'Büyük beyni normal yap' : 'İç yapıları göster'; } }
    ]
  };
}

// ======================================================================= OMURİLİK KESİTİ SAHNESİ
export function omurilik() {
  const I = BILGI.omurilik, g = new THREE.Group();
  const kes = omurilikKesit(1.4);
  kes.beyaz.userData.bilgi = I.beyaz;
  kes.gri.forEach((o) => { o.userData.bilgi = I.gri; });
  kes.arka.forEach((o) => { o.userData.bilgi = I.arkaBoynuz; });
  kes.on.forEach((o) => { o.userData.bilgi = I.onBoynuz; });
  kes.kanal.userData.bilgi = I.kanal;
  g.add(kes.g);

  // zarlar
  const zarlar = [[2.05, 0x9ad8ff, I.pia, 0.35], [2.2, 0x5fb8ff, I.araknoid, 0.22], [2.38, 0x2f7fd8, I.dura, 0.3]].map(([r, c, b, o]) => {
    const m = mesh(new THREE.CylinderGeometry(r, r, 1.5, 56, 1, true), cam(c, o), [0, 0, 0], b, [Math.PI / 2, 0, 0]); m.userData.kabuk = true; g.add(m); return m;
  });
  // omur
  const kemik = cam(0xdfe9f4, 0.5, { roughness: 0.8, emissiveIntensity: 0.05 });
  const omur = grup(I.omur); const halka = mesh(new THREE.TorusGeometry(2.85, 0.45, 14, 56), kemik); halka.userData.kabuk = true; omur.add(halka);
  omur.add(mesh(new THREE.CylinderGeometry(1.9, 1.9, 0.9, 40), kemik, [0, -4.9, 0], null, [Math.PI / 2, 0, 0]));
  omur.add(mesh(new THREE.BoxGeometry(0.6, 1.9, 0.8), kemik, [0, 3.9, 0]));
  omur.add(mesh(new THREE.BoxGeometry(1.9, 0.5, 0.7), kemik, [3.9, 0.9, 0], null, [0, 0, 0.25]));
  omur.add(mesh(new THREE.BoxGeometry(1.9, 0.5, 0.7), kemik, [-3.9, 0.9, 0], null, [0, 0, -0.25]));
  g.add(omur);

  // kökler ve sinir
  const mD = mat(0x3aa0ff, { emissiveIntensity: 0.25 }), mV = mat(0xffc857, { emissiveIntensity: 0.25 }), mN = mat(0xffe27a, { emissiveIntensity: 0.25 });
  [-1, 1].forEach((s) => {
    g.add(tup([[s * 0.8, 1.25, 0], [s * 1.7, 1.6, 0], [s * 2.8, 1.75, 0], [s * 3.7, 0.6, 0]], 0.1, mD, { seg: 30, bilgi: I.arkaKok }));
    g.add(mesh(new THREE.SphereGeometry(0.4, 20, 14), mD, [s * 2.9, 2.0, 0], I.arkaKok, [0, 0, 0], [1.1, 0.9, 0.9]));
    g.add(tup([[s * 1.1, -0.95, 0], [s * 1.9, -1.1, 0], [s * 2.9, -0.7, 0], [s * 3.7, 0.5, 0]], 0.1, mV, { seg: 30, bilgi: I.onKok }));
    g.add(tup([[s * 3.7, 0.55, 0], [s * 4.8, 0.2, 0], [s * 6.0, -0.5, 0]], 0.17, mN, { seg: 20, bilgi: I.sinir }));
  });
  const lbl = (t, p) => { const x = etiket(t, { olcek: 0.8 }); x.position.set(...p); g.add(x); };
  lbl('Arka (duyu)', [0, 5.2, 0]); lbl('Ön (motor)', [0, -6.2, 0]);
  return {
    grup: g, kamera: [0, 1.5, 12], otoDondur: false,
    eylemler: [
      { ad: 'Omuru gizle', ac() { omur.visible = !omur.visible; return omur.visible ? 'Omuru gizle' : 'Omuru göster'; } },
      { ad: 'Zarları gizle', ac() { zarlar.forEach((z) => { z.visible = !z.visible; }); return zarlar[0].visible ? 'Zarları gizle' : 'Zarları göster'; } }
    ]
  };
}
