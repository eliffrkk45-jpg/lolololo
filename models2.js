// 3B sahneler (2): nörotransmitter molekülleri, zar potansiyeli, sinaps, mitokondri, ATP, reseptörler, glia
import { THREE, V, mat, cam, mesh, grup, tup, bag, rastgele, etiket, isaretDokusu, sinir, lerp, yumusat } from './m3d.js';
import { BILGI } from './bilgi.js';

// ======================================================================= NÖROTRANSMİTTER MOLEKÜLLERİ
const ATOM = { C: [0x9fb4c8, 0.25], O: [0xff5470, 0.28], N: [0x4da3ff, 0.28] };

function molekulYap(atomlar, baglar, halkalar, bilgi) {
  const g = new THREE.Group(); g.userData.bilgi = bilgi;
  const ic = new THREE.Group(); g.add(ic);
  atomlar.forEach(([s, p]) => ic.add(mesh(new THREE.SphereGeometry(ATOM[s][1], 24, 18), mat(ATOM[s][0], { roughness: 0.3 }), p)));
  const bm = mat(0xdbe6ef, { emissiveIntensity: 0.05 });
  baglar.forEach(([a, b]) => ic.add(bag(atomlar[a][1], atomlar[b][1], 0.07, bm)));
  halkalar.forEach(([p, r]) => ic.add(mesh(new THREE.TorusGeometry(r, 0.035, 8, 40), mat(0x6fe3ff, { emissiveIntensity: 0.5 }), p)));
  const kutu = new THREE.Box3().setFromObject(ic), c = kutu.getCenter(new THREE.Vector3());
  ic.position.sub(c);
  return g;
}
const halka6 = (i) => { const a = ((90 - 60 * i) * Math.PI) / 180; return [Math.cos(a), Math.sin(a), 0]; };

function katekol(beta, metil, bilgi) {
  const at = [], ba = [];
  for (let i = 0; i < 6; i++) at.push(['C', halka6(i)]);            // 0..5
  for (let i = 0; i < 6; i++) ba.push([i, (i + 1) % 6]);
  at.push(['O', [1.73, -1.0, 0]]); ba.push([2, 6]);                  // 6
  at.push(['O', [0, -2.0, 0]]); ba.push([3, 7]);                     // 7
  at.push(['C', [0, 2.0, 0.3]]); ba.push([0, 8]);                    // 8 Cβ
  at.push(['C', [0.87, 2.5, 0]]); ba.push([8, 9]);                   // 9 Cα
  at.push(['N', [0.87, 3.5, 0.5]]); ba.push([9, 10]);                // 10
  if (beta) { at.push(['O', [-0.87, 2.5, 0.6]]); ba.push([8, at.length - 1]); }
  if (metil) { at.push(['C', [1.74, 4.0, 0.5]]); ba.push([10, at.length - 1]); }
  return molekulYap(at, ba, [[[0, 0, 0], 0.55]], bilgi);
}
function serotoninYap(bilgi) {
  const at = [], ba = [];
  for (let i = 0; i < 6; i++) at.push(['C', halka6(i)]);             // 0..5 ; 1 = C3a, 2 = C7a
  for (let i = 0; i < 6; i++) ba.push([i, (i + 1) % 6]);
  at.push(['C', [1.8, 0.8, 0]]); ba.push([1, 6]);                    // 6 C3
  at.push(['C', [2.4, 0, 0]]); ba.push([6, 7]);                      // 7 C2
  at.push(['N', [1.8, -0.8, 0]]); ba.push([7, 8]); ba.push([8, 2]);  // 8 N1
  at.push(['O', [-1.73, 1.0, 0]]); ba.push([5, 9]);                  // 9 OH
  at.push(['C', [2.0, 1.8, 0.3]]); ba.push([6, 10]);                 // 10
  at.push(['C', [2.87, 2.3, 0.1]]); ba.push([10, 11]);               // 11
  at.push(['N', [2.87, 3.3, 0.5]]); ba.push([11, 12]);               // 12
  return molekulYap(at, ba, [[[0, 0, 0], 0.55], [[1.55, 0, 0], 0.42]], bilgi);
}

export function molekul() {
  const I = BILGI.molekul, g = new THREE.Group();
  const liste = [
    [serotoninYap(I.serotonin), [-4.6, 2.5, 0], 'Serotonin'],
    [katekol(false, false, I.dopamin), [4.6, 2.5, 0], 'Dopamin'],
    [katekol(true, true, I.epinefrin), [-4.6, -2.7, 0], 'Epinefrin'],
    [katekol(true, false, I.norepinefrin), [4.6, -2.7, 0], 'Norepinefrin']
  ];
  const tutucular = [];
  liste.forEach(([m, p, ad]) => {
    const t = new THREE.Group(); t.position.set(...p); m.scale.setScalar(0.85); t.add(m); g.add(t); tutucular.push(m);
    const e = etiket(ad, { olcek: 1.0 }); e.position.set(p[0], p[1] + 2.3, 0); g.add(e);
    const z = mesh(new THREE.CylinderGeometry(2.0, 2.2, 0.12, 48), mat(0x0d3b5e, { emissiveIntensity: 0.15 }), [p[0], p[1] - 2.0, 0]); g.add(z);
  });
  const lg = etiket('C gri · O kırmızı · N mavi (H gösterilmedi)', { olcek: 1.3, boyut: 40 }); lg.position.set(0, -5.4, 0); g.add(lg);
  return { grup: g, kamera: [0, 0, 14], guncelle(t, dt) { tutucular.forEach((m, i) => { m.rotation.y += dt * (0.4 + i * 0.05); }); } };
}

// ======================================================================= ZAR POTANSİYELİ
export function zar(ctx) {
  const I = BILGI.zar, g = new THREE.Group(), rnd = rastgele(5);
  const KX = { na: -2.6, pompa: 0, k: 2.6 };
  // lipit çift tabaka
  const bosluk = (x, z) => Math.abs(x - KX.na) < 0.6 && Math.abs(z) < 0.7 || Math.abs(x - KX.pompa) < 0.75 && Math.abs(z) < 0.8 || Math.abs(x - KX.k) < 0.6 && Math.abs(z) < 0.7;
  const pozlar = [];
  for (let i = 0; i < 24; i++) for (let j = 0; j < 6; j++) { const x = -5.75 + i * 0.5, z = -1.25 + j * 0.5; if (!bosluk(x, z)) pozlar.push([x, z]); }
  const sayi = pozlar.length * 2;
  const basGeo = new THREE.SphereGeometry(0.17, 12, 10), kuyGeo = new THREE.CylinderGeometry(0.03, 0.03, 0.52, 6);
  const baslar = new THREE.InstancedMesh(basGeo, mat(0xffd6a5, { emissiveIntensity: 0.25 }), sayi);
  const kuyruk = new THREE.InstancedMesh(kuyGeo, mat(0xfff0c9, { emissiveIntensity: 0.1 }), sayi * 2);
  baslar.userData.bilgi = I.lipit; kuyruk.userData.bilgi = I.lipit;
  const d = new THREE.Object3D(); let bi = 0, ki = 0;
  pozlar.forEach(([x, z]) => [1, -1].forEach((s) => {
    const dy = (rnd() - 0.5) * 0.06;
    d.position.set(x, s * 0.62 + dy, z); d.updateMatrix(); baslar.setMatrixAt(bi++, d.matrix);
    [-0.07, 0.07].forEach((o) => { d.position.set(x + o, s * 0.36 + dy, z); d.updateMatrix(); kuyruk.setMatrixAt(ki++, d.matrix); });
  }));
  g.add(baslar, kuyruk);

  // kanallar ve pompa
  const kanal = (x, renk, bilgi) => {
    const k = grup(bilgi, [x, 0, 0]);
    k.add(mesh(new THREE.CylinderGeometry(0.42, 0.42, 1.5, 24, 1, true), cam(renk, 0.6, { emissiveIntensity: 0.25 })));
    k.add(mesh(new THREE.TorusGeometry(0.42, 0.07, 8, 24), mat(renk), [0, 0.75, 0], null, [Math.PI / 2, 0, 0]));
    k.add(mesh(new THREE.TorusGeometry(0.42, 0.07, 8, 24), mat(renk), [0, -0.75, 0], null, [Math.PI / 2, 0, 0]));
    const kapi = mesh(new THREE.CylinderGeometry(0.4, 0.4, 0.1, 24), mat(0xff5d6c, { emissiveIntensity: 0.4 }), [0, 0.78, 0]);
    k.add(kapi); g.add(k); return { k, kapi };
  };
  const na = kanal(KX.na, 0x2e9bff, I.naKanal), kk = kanal(KX.k, 0x2ee59d, I.kKanal);
  const pompa = grup(I.pompa, [KX.pompa, 0, 0]);
  pompa.add(mesh(new THREE.CylinderGeometry(0.6, 0.72, 1.6, 28), mat(0xffb347, { roughness: 0.5 })));
  pompa.add(mesh(new THREE.SphereGeometry(0.62, 24, 16, 0, Math.PI * 2, 0, Math.PI / 2), mat(0xffc873), [0, 0.8, 0]));
  pompa.add(mesh(new THREE.BoxGeometry(0.22, 1.3, 1.0), mat(0x6b3b00, { emissiveIntensity: 0.05 }), [0, 0.05, 0.0]));
  g.add(pompa);
  const atpE = etiket('ATP', { olcek: 0.6, boyut: 50 }); atpE.position.set(0, -1.3, 0); atpE.visible = false; g.add(atpE);

  // yük işaretleri
  const isretler = { dis: [], ic: [] };
  for (let i = 0; i < 12; i++) [['dis', 1.05], ['ic', -1.05]].forEach(([k, y]) => {
    const s = new THREE.Sprite(new THREE.SpriteMaterial({ map: isaretDokusu('+', '#ff8a8a'), transparent: true, depthWrite: false }));
    s.position.set(-5.5 + i, y, 1.45); s.scale.set(0.45, 0.45, 1); g.add(s); isretler[k].push(s);
  });
  const etk = (t, p) => { const e = etiket(t, { olcek: 0.9 }); e.position.set(...p); g.add(e); };
  etk('HÜCRE DIŞI', [-4.6, 4.3, 0]); etk('HÜCRE İÇİ', [-4.6, -4.3, 0]);

  // iyonlar
  const naM = mat(0x4aa8ff, { emissiveIntensity: 0.4 }), kM = mat(0x41f0a6, { emissiveIntensity: 0.4 });
  const iyonlar = [];
  const iyon = (tur, yer) => {
    const m = mesh(new THREE.SphereGeometry(0.17, 14, 10), tur === 'na' ? naM : kM, [0, 0, 0], tur === 'na' ? I.na : I.k);
    const o = { m, tur, yer, ev: V(0, 0, 0), faz: rnd() * 6, gec: null };
    o.ev.set((rnd() - 0.5) * 10.5, (yer === 'dis' ? 1 : -1) * (1.2 + rnd() * 2.4), (rnd() - 0.5) * 2.6);
    m.position.copy(o.ev); g.add(m); iyonlar.push(o); return o;
  };
  for (let i = 0; i < 16; i++) iyon('na', 'dis');
  for (let i = 0; i < 16; i++) iyon('k', 'ic');
  for (let i = 0; i < 3; i++) { iyon('na', 'ic'); iyon('k', 'dis'); }

  // durum
  let faz = 'dinlenme', V_mv = -70, oto = false, otoT = 0, sayac = 0;
  const HEDEF = { dinlenme: -70, depol: 30, repol: -72 };
  const FAZADI = { dinlenme: 'Polarizasyon (dinlenme)', depol: 'Depolarizasyon', repol: 'Repolarizasyon' };
  const ACIK = { dinlenme: 'Na⁺ ve K⁺ kanalları kapalı. Na-K pompası çalışıyor (3 Na⁺ dışarı, 2 K⁺ içeri). Dış pozitif, iç negatif.', depol: 'Na⁺ kanalları açıldı: Na⁺ hücreye giriyor. İç taraf pozitifleşiyor.', repol: 'Na⁺ kanalları kapandı, K⁺ kanalları açıldı: K⁺ dışarı çıkıyor. İç taraf yeniden negatifleşiyor.' };
  function ayarla(f) {
    faz = f; sayac = 0;
    na.kapi.visible = f !== 'depol'; kk.kapi.visible = f !== 'repol'; atpE.visible = f === 'dinlenme';
    hudYaz();
  }
  function hudYaz() {
    const renk = V_mv > 0 ? '#ff9f43' : V_mv > -60 ? '#ffd166' : '#2ee59d';
    ctx.hud(`<b style="color:${renk};font-size:1.25em">${V_mv.toFixed(0)} mV</b> · <b>${FAZADI[faz]}</b><br>${ACIK[faz]}<br><span style="color:#4aa8ff">● Na⁺</span> <span style="color:#41f0a6">● K⁺</span>`);
  }
  function gecir(o, x, hedefYer, ters) {
    const baslangic = o.m.position.clone();
    const yIn = hedefYer === 'ic' ? -1 : 1;
    const son = V((rnd() - 0.5) * 10, yIn * (1.4 + rnd() * 2.2), (rnd() - 0.5) * 2.4);
    o.gec = { t: 0, yol: [baslangic, V(x, -yIn * 1.5, 0), V(x, -yIn * 0.8, 0), V(x, yIn * 0.8, 0), V(x, yIn * 1.5, 0), son] , son };
    o.yer = hedefYer;
  }
  function sec(tur, yer) { const a = iyonlar.filter((o) => o.tur === tur && o.yer === yer && !o.gec); return a.length ? a[Math.floor(rnd() * a.length)] : null; }

  let sonHud = 0;
  return {
    grup: g, kamera: [0, 2.5, 13], hedef: [0, 0, 0],
    guncelle(t, dt) {
      if (oto) {
        otoT += dt;
        const c = otoT % 8;
        const f = c < 2.5 ? 'dinlenme' : c < 4.5 ? 'depol' : c < 6.5 ? 'repol' : 'dinlenme';
        if (f !== faz) ayarla(f);
      }
      const hedef = HEDEF[faz];
      const hiz = faz === 'dinlenme' ? 25 : 80;
      V_mv += sinir(hedef - V_mv, -hiz * dt, hiz * dt);
      sayac += dt;
      if (faz === 'depol' && sayac > 0.22) { sayac = 0; const o = sec('na', 'dis'); if (o) gecir(o, KX.na, 'ic'); }
      if (faz === 'repol' && sayac > 0.22) { sayac = 0; const o = sec('k', 'ic'); if (o) gecir(o, KX.k, 'dis'); }
      if (faz === 'dinlenme' && sayac > 1.3) {
        sayac = 0;
        const a = sec('na', 'ic'); if (a) gecir(a, KX.pompa, 'dis');
        for (let i = 0; i < 2; i++) { const b = sec('k', 'dis'); if (b) gecir(b, KX.pompa, 'ic'); }
      }
      iyonlar.forEach((o) => {
        if (o.gec) {
          o.gec.t += dt / 2.4; const u = Math.min(1, o.gec.t), n = o.gec.yol.length - 1, f = u * n, i = Math.min(n - 1, Math.floor(f));
          o.m.position.lerpVectors(o.gec.yol[i], o.gec.yol[i + 1], yumusat(f - i));
          if (u >= 1) { o.ev.copy(o.gec.son); o.gec = null; }
        } else {
          o.m.position.set(o.ev.x + Math.sin(t * 1.3 + o.faz) * 0.12, o.ev.y + Math.cos(t * 1.1 + o.faz * 1.7) * 0.12, o.ev.z + Math.sin(t * 0.9 + o.faz) * 0.1);
        }
      });
      const ters = V_mv > 0;
      isretler.dis.forEach((s) => { s.material.map = isaretDokusu(ters ? '−' : '+', ters ? '#7fc4ff' : '#ff8a8a'); });
      isretler.ic.forEach((s) => { s.material.map = isaretDokusu(ters ? '+' : '−', ters ? '#ff8a8a' : '#7fc4ff'); });
      pompa.children[1].scale.setScalar(1 + (faz === 'dinlenme' ? 0.05 * Math.sin(t * 5) : 0));
      sonHud += dt; if (sonHud > 0.1) { sonHud = 0; hudYaz(); }
    },
    eylemler: [
      { ad: 'Polarizasyon', ac() { oto = false; ayarla('dinlenme'); } },
      { ad: 'Depolarizasyon', ac() { oto = false; ayarla('depol'); } },
      { ad: 'Repolarizasyon', ac() { oto = false; ayarla('repol'); } },
      { ad: '▶ Otomatik döngü', ac() { oto = !oto; otoT = 0; if (oto) ayarla('dinlenme'); return oto ? '■ Döngüyü durdur' : '▶ Otomatik döngü'; } }
    ]
  };
}

// ======================================================================= SİNAPS
export function sinaps(ctx) {
  const I = BILGI.sinaps, g = new THREE.Group(), rnd = rastgele(9);
  const ypre = (x) => 2.2 - 1.7 * Math.sqrt(Math.max(0, 1 - (x / 3) * (x / 3)));
  const ypost = (x) => -ypre(x);
  // presinaptik uç
  const pre = grup(I.terminal);
  const preK = mesh(new THREE.SphereGeometry(1, 48, 36), cam(0x2ee59d, 0.28, { emissiveIntensity: 0.15 }), [0, 2.2, 0], null, [0, 0, 0], [3, 1.7, 1.7]); preK.userData.kabuk = true; pre.add(preK);
  pre.add(tup([[0, 7, 0], [0, 4.5, 0], [0, 3.6, 0]], 0.28, cam(0x2ee59d, 0.5), { seg: 12, rad: 14 }));
  g.add(pre);
  const mt = grup(I.mito, [-1.9, 2.5, 0.3]); mt.add(mesh(new THREE.CapsuleGeometry(0.16, 0.5, 6, 12), mat(0xff8a5c), [0, 0, 0], null, [0, 0, Math.PI / 2])); g.add(mt);
  const mt2 = mt.clone(); mt2.position.set(1.9, 2.7, -0.3); g.add(mt2);
  // postsinaptik
  const post = grup(I.postsinaptik);
  const postK = mesh(new THREE.SphereGeometry(1, 48, 36), cam(0x3a9bff, 0.3, { emissiveIntensity: 0.15 }), [0, -2.2, 0], null, [0, 0, 0], [3, 1.7, 1.7]); postK.userData.kabuk = true; post.add(postK);
  g.add(post);
  // kalsiyum kanalları, geri alım
  const XS = [-2.0, -1.2, -0.4, 0.4, 1.2, 2.0];
  const kal = [];
  [-2.4, -0.8, 0.8, 2.4].forEach((x) => {
    const k = mesh(new THREE.CylinderGeometry(0.15, 0.15, 0.3, 14), mat(0xff9f43), [x, ypre(x) - 0.02, 0.0], I.kalsiyum); g.add(k); kal.push(k);
  });
  [-2.75, 2.75].forEach((x) => g.add(mesh(new THREE.CylinderGeometry(0.1, 0.1, 0.34, 12), mat(0x19c3d6), [x, ypre(x) - 0.02, 0], I.geriAlim)));
  // reseptörler
  const resep = XS.map((x) => {
    const r = grup(I.reseptor, [x, ypost(x) + 0.12, 0]);
    r.add(mesh(new THREE.CylinderGeometry(0.06, 0.06, 0.3, 8), mat(0x7fb8ff), [0, 0.0, 0]));
    r.add(mesh(new THREE.SphereGeometry(0.12, 12, 10), mat(0x7fb8ff, { emissiveIntensity: 0.3 }), [-0.1, 0.2, 0]));
    r.add(mesh(new THREE.SphereGeometry(0.12, 12, 10), mat(0x7fb8ff, { emissiveIntensity: 0.3 }), [0.1, 0.2, 0]));
    g.add(r); return r;
  });
  // kesecikler
  const kesecik = XS.map((x, i) => {
    const k = grup(I.kesecik, [x, 1.25 + (i % 2) * 0.25, (rnd() - 0.5) * 0.8]);
    k.add(mesh(new THREE.SphereGeometry(0.26, 20, 14), cam(0xffe27a, 0.5, { emissiveIntensity: 0.2 })));
    k.add(mesh(new THREE.SphereGeometry(0.07, 8, 6), mat(0xff9fd0), [-0.07, 0.04, 0.05])); k.add(mesh(new THREE.SphereGeometry(0.07, 8, 6), mat(0xff9fd0), [0.07, -0.04, -0.05]));
    g.add(k); return { k, ev: k.position.clone(), x };
  });
  // nörotransmitter parçacıkları
  const nt = [];
  for (let j = 0; j < 12; j++) { const m = mesh(new THREE.SphereGeometry(0.1, 10, 8), mat(0xff9fd0, { emissiveIntensity: 0.6 }), [0, 0, 0], I.aralik); m.visible = false; g.add(m); nt.push({ m, i: Math.floor(j / 2), ph: rnd() * 6 }); }
  // kalsiyum iyonları
  const ca = [];
  for (let j = 0; j < 8; j++) { const m = mesh(new THREE.SphereGeometry(0.08, 8, 6), mat(0xffd23f, { emissiveIntensity: 0.7 }), [0, 0, 0], I.kalsiyum); m.visible = false; g.add(m); ca.push({ m, x: kal[j % 4].position.x, ph: j / 8 }); }
  // yayılan dalga
  const dalga = mesh(new THREE.TorusGeometry(1, 0.05, 8, 48), new THREE.MeshBasicMaterial({ color: 0x7ffcff, transparent: true, opacity: 0 }), [0, -2.2, 0], null, [Math.PI / 2, 0, 0]); g.add(dalga);
  // impuls
  const imp = new THREE.Group();
  imp.add(mesh(new THREE.SphereGeometry(0.22, 20, 16), mat(0xffffff, { emissive: 0x7ffcff, emissiveIntensity: 1.4 })));
  imp.add(mesh(new THREE.SphereGeometry(0.45, 20, 16), new THREE.MeshBasicMaterial({ color: 0x7ffcff, transparent: true, opacity: 0.28, depthWrite: false })));
  imp.visible = false; g.add(imp);
  const etk = (t, p) => { const e = etiket(t, { olcek: 0.9 }); e.position.set(...p); g.add(e); };
  etk('Presinaptik uç', [4.4, 3.6, 0]); etk('Sinaptik aralık', [4.6, 0, 0]); etk('Postsinaptik zar', [4.4, -3.6, 0]);

  const ADIM = [
    [2.0, '<b>1)</b> Aksiyon potansiyeli akson terminaline ulaşır'],
    [1.2, '<b>2)</b> Ca²⁺ kanalları açılır, Ca²⁺ hücreye girer'],
    [1.6, '<b>3)</b> Kesecikler zarla birleşir, nörotransmitter ekzositozla salınır'],
    [2.4, '<b>4)</b> Nörotransmitter sinaptik aralıkta difüzyonla yayılır'],
    [1.6, '<b>5)</b> Reseptörlere bağlanır; hedef zarda potansiyel değişir'],
    [2.4, '<b>6)</b> Nörotransmitter geri alınır / yıkılır, sinaps hazırlanır']
  ];
  let calis = false, ts = 0, adimNo = -1;
  const bas = ADIM.map((a, i) => ADIM.slice(0, i).reduce((s, b) => s + b[0], 0));
  const toplam = ADIM.reduce((s, a) => s + a[0], 0);
  function sifirla() {
    nt.forEach((n) => { n.m.visible = false; n.m.scale.setScalar(1); }); ca.forEach((c) => { c.m.visible = false; });
    kesecik.forEach((v) => { v.k.visible = true; v.k.scale.setScalar(1); v.k.position.copy(v.ev); });
    resep.forEach((r) => r.children.forEach((c) => { c.material.emissive.setHex(0x7fb8ff); c.material.emissiveIntensity = 0.3; }));
    kal.forEach((k) => { k.material.emissiveIntensity = 0.12; k.scale.setScalar(1); });
    dalga.material.opacity = 0; imp.visible = false;
  }
  return {
    grup: g, kamera: [0, 0.5, 12.5], hedef: [0, 0, 0],
    guncelle(t, dt) {
      kesecik.forEach((v, i) => { if (!calis) { v.k.position.y = v.ev.y + Math.sin(t * 1.2 + i) * 0.05; } });
      if (!calis) return;
      ts += dt;
      if (ts >= toplam) { calis = false; sifirla(); ctx.hud(''); return; }
      let a = 0; while (a < ADIM.length - 1 && ts >= bas[a + 1]) a++;
      if (a !== adimNo) { adimNo = a; ctx.hud(ADIM[a][1]); }
      const u = (ts - bas[a]) / ADIM[a][0];
      if (a === 0) { imp.visible = true; imp.position.set(0, lerp(7, 3.0, yumusat(u)), 0); imp.children[1].scale.setScalar(1 + 0.2 * Math.sin(t * 14)); }
      else imp.visible = false;
      if (a >= 1) kal.forEach((k) => { k.material.emissiveIntensity = a === 1 ? 0.9 : 0.4; k.scale.set(1, a === 1 ? 1.4 : 1, 1); });
      if (a === 1) ca.forEach((c) => { c.m.visible = true; const f = (u + c.ph) % 1; c.m.position.set(c.x + Math.sin(f * 9) * 0.1, lerp(-0.1, ypre(c.x) + 0.5, f), 0); });
      else ca.forEach((c) => { c.m.visible = a === 2 && u < 0.4; if (c.m.visible) c.m.position.y = ypre(c.x) + 0.4 + u; });
      if (a === 2) kesecik.forEach((v, i) => {
        const hedefY = ypre(v.x) + 0.28, f = sinir(u * 1.6 - i * 0.06, 0, 1);
        v.k.position.set(v.x, lerp(v.ev.y, hedefY, yumusat(Math.min(1, f * 1.6))), v.ev.z * (1 - f));
        const sol = sinir((f - 0.6) / 0.4, 0, 1); v.k.scale.setScalar(1 - sol);
        nt.filter((n) => n.i === i).forEach((n) => { n.m.visible = sol > 0.05; n.m.position.set(v.x + (n.ph - 3) * 0.04, ypre(v.x) - 0.12, 0); });
      });
      if (a >= 3) kesecik.forEach((v) => { v.k.visible = false; });
      if (a === 3) nt.forEach((n) => { n.m.visible = true; const x0 = XS[n.i], f = yumusat(u); n.m.position.set(x0 + Math.sin(t * 6 + n.ph) * 0.12 + (n.ph - 3) * 0.04 * (1 - f), lerp(ypre(x0) - 0.12, ypost(x0) + 0.35, f) + Math.sin(t * 7 + n.ph) * 0.07, Math.cos(t * 5 + n.ph) * 0.18); });
      if (a === 4) {
        nt.forEach((n) => { n.m.position.set(XS[n.i] + ((n.ph % 1) - 0.5) * 0.1, ypost(XS[n.i]) + 0.36, 0); });
        resep.forEach((r) => r.children.forEach((c) => { c.material.emissive.setHex(0xff9fd0); c.material.emissiveIntensity = 0.9; }));
        dalga.material.opacity = 0.7 * (1 - u); dalga.scale.setScalar(0.5 + u * 3.6); dalga.position.y = -1.2 - u * 0.3;
      } else dalga.material.opacity = 0;
      if (a === 5) {
        resep.forEach((r) => r.children.forEach((c) => { c.material.emissive.setHex(0x7fb8ff); c.material.emissiveIntensity = 0.3 * u + 0.6 * (1 - u); }));
        nt.forEach((n) => { const hedefX = n.i % 2 ? 2.75 : -2.75, f = yumusat(u); n.m.position.set(lerp(XS[n.i], hedefX, f), lerp(ypost(XS[n.i]) + 0.36, ypre(hedefX) - 0.1, f), Math.sin(f * 6 + n.ph) * 0.1); n.m.scale.setScalar(1 - 0.8 * u); });
      }
    },
    eylemler: [{ ad: '⚡ İmpuls gönder', ac() { sifirla(); calis = true; ts = 0; adimNo = -1; } }]
  };
}

// ======================================================================= MİTOKONDRİ
export function mitokondri(ctx) {
  const I = BILGI.mitokondri, g = new THREE.Group(), rnd = rastgele(21);
  const dis = mesh(new THREE.SphereGeometry(1, 56, 40), cam(0x63d2ff, 0.18, { emissiveIntensity: 0.12 }), [0, 0, 0], I.disZar, [0, 0, 0], [2.6, 1.15, 1.15]); dis.userData.kabuk = true; g.add(dis);
  const icz = mesh(new THREE.SphereGeometry(1, 56, 40), cam(0xff9a52, 0.24, { emissiveIntensity: 0.15 }), [0, 0, 0], I.icZar, [0, 0, 0], [2.3, 0.95, 0.95]); icz.userData.kabuk = true; g.add(icz);
  const mx = mesh(new THREE.SphereGeometry(1, 40, 30), cam(0xffd27a, 0.16), [0, 0, 0], I.matriks, [0, 0, 0], [2.2, 0.9, 0.9]); mx.userData.kabuk = true; g.add(mx);
  // krista
  const sh = new THREE.Shape(); sh.absellipse(0, 0, 0.78, 0.78, 0, Math.PI, false); sh.closePath();
  const kg = new THREE.ExtrudeGeometry(sh, { depth: 0.07, bevelEnabled: false });
  for (let i = -3; i <= 3; i++) {
    const k = mesh(kg, mat(0xffb36b, { side: THREE.DoubleSide, emissiveIntensity: 0.2 }), [i * 0.5 - 0.035, 0, 0], I.krista, [0, Math.PI / 2, i % 2 ? Math.PI : 0]);
    const sinirli = 0.9 * Math.sqrt(Math.max(0.05, 1 - Math.pow((i * 0.5) / 2.3, 2)));
    k.scale.set(1, sinirli / 0.9 * 1.0, sinirli / 0.9); g.add(k);
  }
  // mtDNA ve ribozomlar
  g.add(mesh(new THREE.TorusKnotGeometry(0.22, 0.04, 60, 8, 2, 3), mat(0x9b8cff), [-1.6, 0.25, 0.2], I.mdna));
  for (let i = 0; i < 8; i++) g.add(mesh(new THREE.SphereGeometry(0.05, 8, 6), mat(0xffffff), [(rnd() - 0.5) * 3.6, (rnd() - 0.5) * 0.9, (rnd() - 0.5) * 0.7]));

  // ATP sentaz
  const sent = [];
  for (let i = 0; i < 18; i++) {
    const x = -1.8 + (i % 6) * 0.72 + (rnd() - 0.5) * 0.15, a = (i / 18) * Math.PI * 2 + rnd();
    const ry = 0.95 * Math.sqrt(Math.max(0.1, 1 - Math.pow(x / 2.3, 2)));
    const n = V(0, Math.cos(a), Math.sin(a));
    const s = grup(I.atpSentaz, [x, n.y * ry, n.z * ry]);
    s.quaternion.setFromUnitVectors(V(0, 1, 0), n);
    s.add(mesh(new THREE.CylinderGeometry(0.04, 0.04, 0.32, 8), mat(0xdfe6ee), [0, -0.16, 0]));
    const bas = mesh(new THREE.SphereGeometry(0.11, 14, 10), mat(0xff5d8f, { emissiveIntensity: 0.35 }), [0, -0.38, 0]); s.add(bas);
    s.add(mesh(new THREE.CylinderGeometry(0.03, 0.03, 0.2, 6), mat(0xfff1a8), [0, -0.1, 0.0]));
    g.add(s); sent.push({ s, bas, n });
  }
  // H+ ve ATP
  const hp = [], atp = [];
  for (let i = 0; i < 14; i++) { const m = mesh(new THREE.SphereGeometry(0.06, 8, 6), mat(0x39b6ff, { emissiveIntensity: 0.8 }), [0, 0, 0]); m.visible = false; g.add(m); hp.push({ m, s: sent[i % sent.length], f: rnd() }); }
  for (let i = 0; i < 10; i++) { const m = mesh(new THREE.SphereGeometry(0.1, 10, 8), mat(0xffd23f, { emissiveIntensity: 0.9 }), [0, 0, 0]); m.visible = false; g.add(m); atp.push({ m, s: sent[(i * 3) % sent.length], f: i / 10 }); }
  let uretim = false;
  const etk = (t, p) => { const e = etiket(t, { olcek: 0.8 }); e.position.set(...p); g.add(e); };
  etk('Matriks', [0, -0.2, 1.4]); etk('Krista', [-3.6, 1.8, 0]); etk('ATP sentaz', [3.4, 1.9, 0]);
  return {
    grup: g, kamera: [0, 2.2, 8.5], otoDondur: false,
    guncelle(t, dt) {
      sent.forEach((x, i) => { if (uretim) x.bas.rotation.y += dt * 8; x.bas.scale.setScalar(uretim ? 1 + 0.15 * Math.sin(t * 8 + i) : 1); });
      hp.forEach((h) => { h.m.visible = uretim; if (!uretim) return; h.f = (h.f + dt * 0.7) % 1; const base = h.s.s.position, n = h.s.n; h.m.position.copy(base).addScaledVector(n, 0.35 * (1 - h.f) - 0.5 * h.f); h.m.material.opacity = 1; });
      atp.forEach((a) => { a.m.visible = uretim; if (!uretim) return; a.f = (a.f + dt * 0.35) % 1; const base = a.s.s.position, n = a.s.n; a.m.position.copy(base).addScaledVector(n, -0.4 + 0.0).add(V(0, 0, 0)).addScaledVector(n, -a.f * 1.0).add(V(Math.sin(a.f * 7) * 0.1, 0, 0)); a.m.scale.setScalar(1 - 0.5 * a.f); });
    },
    eylemler: [{ ad: '⚡ ATP üret', ac() { uretim = !uretim; ctx.hud(uretim ? '<span style="color:#39b6ff">● H⁺</span> iyonları ATP sentazdan geçerken enzim döner ve <span style="color:#ffd23f">● ATP</span> oluşur' : ''); return uretim ? '■ Durdur' : '⚡ ATP üret'; } }]
  };
}

// ======================================================================= ATP
export function atp(ctx) {
  const I = BILGI.atp, g = new THREE.Group();
  const bm = (r) => mat(0xdbe6ef, { emissiveIntensity: 0.05 });
  const aC = mat(0x5aa9ff), aN = mat(0x2d4bff, { emissiveIntensity: 0.3 }), rC = mat(0x4be3a0), rO = mat(0xff5470), pP = mat(0xffd23f, { emissiveIntensity: 0.3 });
  const ad = grup(I.adenin), ri = grup(I.riboz), fo = [];
  const at = (grupN, m, p, r = 0.22) => { const s = mesh(new THREE.SphereGeometry(r, 18, 14), m, p); grupN.add(s); return s; };
  const bg = (grupN, a, b) => grupN.add(bag(a, b, 0.06, bm()));
  // adenin: altıgen + beşgen
  const hx = (i) => { const a = ((90 - 60 * i) * Math.PI) / 180; return [-4.4 + 0.75 * Math.cos(a), 0.75 * Math.sin(a), 0]; };
  const hp = []; for (let i = 0; i < 6; i++) hp.push(hx(i));
  hp.forEach((p, i) => at(ad, [0, 2].includes(i) ? aN : aC, p));
  for (let i = 0; i < 6; i++) bg(ad, hp[i], hp[(i + 1) % 6]);
  const pc = [-4.4 + 0.65 + 0.516, 0, 0], R = 0.638, pp = [];
  [144, 216, 288, 0, 72].forEach((a) => pp.push([pc[0] + R * Math.cos((a * Math.PI) / 180), R * Math.sin((a * Math.PI) / 180), 0]));
  // ortak kenar: hp[1] ve hp[2]; yeni köşeler pp[2], pp[3], pp[4]
  [2, 3, 4].forEach((i) => at(ad, i === 3 || i === 4 ? aN : aC, pp[i]));
  bg(ad, hp[2], pp[2]); bg(ad, pp[2], pp[3]); bg(ad, pp[3], pp[4]); bg(ad, pp[4], hp[1]);
  at(ad, aN, [-4.4 - 1.3, -0.75, 0]); bg(ad, hp[4], [-4.4 - 1.3, -0.75, 0]);
  // riboz
  const rc = [-1.15, 0, 0], rp = [];
  for (let i = 0; i < 5; i++) { const a = ((180 - 72 * i) * Math.PI) / 180; rp.push([rc[0] + 0.64 * Math.cos(a), 0.64 * Math.sin(a), 0]); }
  rp.forEach((p, i) => at(ri, i === 2 ? rO : rC, p));
  for (let i = 0; i < 5; i++) bg(ri, rp[i], rp[(i + 1) % 5]);
  // adenin-riboz bağı
  const ab = bag(pp[0].slice ? pp[3] : pp[3], rp[0], 0.06, bm());
  g.add(ad, ri, ab);
  // fosfatlar
  const PX = [0.9, 2.5, 4.1];
  const fosfatYap = (x) => {
    const f = grup(I.fosfat, [x, 0, 0]);
    f.add(mesh(new THREE.SphereGeometry(0.44, 24, 18), pP));
    [[0, 0.7, 0.15], [0, -0.7, 0.15], [0, 0.0, 0.7]].forEach((p) => f.add(mesh(new THREE.SphereGeometry(0.19, 14, 10), rO, p)));
    g.add(f); return f;
  };
  const F = PX.map(fosfatYap);
  g.add(bag(rp[4] ? [-0.51, 0, 0] : [0, 0, 0], [PX[0] - 0.44, 0, 0], 0.07, bm()));
  const hb = (a, b) => { const m = mesh(new THREE.CylinderGeometry(0.1, 0.1, b - a - 0.7, 12), mat(0xff7a29, { emissiveIntensity: 0.9 }), [(a + b) / 2, 0, 0], I.yuksekBag, [0, 0, Math.PI / 2]); g.add(m); return m; };
  const b1 = hb(PX[0], PX[1]), b2 = hb(PX[1], PX[2]);
  const etk = (t, p, o) => { const e = etiket(t, { olcek: 0.9 }); e.position.set(...p); g.add(e); return e; };
  etk('Adenin', [-4.0, -1.9, 0]); etk('Riboz', [-1.15, -1.9, 0]); etk('3 fosfat', [2.5, -1.9, 0]);
  const rpEtk = etk('Yüksek enerjili bağlar', [3.3, 1.7, 0]);

  // enerji parıltısı
  const parilti = mesh(new THREE.SphereGeometry(0.6, 20, 16), new THREE.MeshBasicMaterial({ color: 0xfff2a8, transparent: true, opacity: 0, depthWrite: false }), [4.1, 0, 0]); g.add(parilti);
  let durum = 'atp', t0 = 0;
  function ayir() { if (durum !== 'atp') return; durum = 'ayriliyor'; t0 = 0; ctx.hud('<b>ATP → ADP + Pi</b><br>Son fosfat bağı hidrolizle koptu: yaklaşık 30,5 kJ/mol enerji açığa çıkıyor!'); }
  function birlestir() { if (durum !== 'adp') return; durum = 'birlesiyor'; t0 = 0; ctx.hud('<b>ADP + Pi → ATP</b><br>Enerji harcanarak fosfat yeniden bağlanıyor (fosforilasyon).'); }
  return {
    grup: g, kamera: [0, 1.5, 11.5], hedef: [-0.5, 0, 0], otoDondur: false,
    guncelle(t, dt) {
      [b1, b2].forEach((b, i) => { if (b.visible) b.material.emissiveIntensity = 0.7 + 0.3 * Math.sin(t * 4 + i); });
      if (durum === 'ayriliyor') {
        t0 += dt; const u = sinir(t0 / 2.2, 0, 1);
        F[2].position.set(PX[2] + 3.2 * yumusat(u), 1.2 * yumusat(u), 0); F[2].rotation.y = u * 6;
        b2.visible = u < 0.15; parilti.material.opacity = Math.sin(Math.min(1, u * 3) * Math.PI) * 0.7; parilti.scale.setScalar(1 + u * 3);
        if (u >= 1) { durum = 'adp'; parilti.material.opacity = 0; }
      } else if (durum === 'birlesiyor') {
        t0 += dt; const u = sinir(t0 / 2.2, 0, 1);
        F[2].position.set(PX[2] + 3.2 * (1 - yumusat(u)), 1.2 * (1 - yumusat(u)), 0); F[2].rotation.y = (1 - u) * 6;
        if (u >= 1) { durum = 'atp'; b2.visible = true; F[2].position.set(PX[2], 0, 0); ctx.hud('ATP yeniden oluştu.'); }
      } else if (durum === 'atp') F.forEach((f, i) => { f.position.y = Math.sin(t * 1.5 + i) * 0.04; });
    },
    eylemler: [
      { ad: '💥 ATP → ADP + Pi', ac() { ayir(); } },
      { ad: '🔁 ADP + Pi → ATP', ac() { birlestir(); } }
    ]
  };
}

// ======================================================================= RESEPTÖRLER
export function reseptor() {
  const I = BILGI.reseptor, g = new THREE.Group(), rnd = rastgele(31), anim = [];
  const R = 5.2;
  const istasyon = (i, ad, bilgi) => {
    const a = (i / 5) * Math.PI * 2 + Math.PI / 2, x = Math.cos(a) * R, z = Math.sin(a) * R;
    const s = grup(null, [x, 0, z]);
    s.add(mesh(new THREE.CylinderGeometry(1.6, 1.8, 0.22, 48), mat(0x0d3b5e, { emissiveIntensity: 0.2 }), [0, -0.11, 0]));
    const m = grup(bilgi, [0, 0.12, 0]); s.add(m);
    const e = etiket(ad, { olcek: 1.0 }); e.position.set(0, 3.7, 0); s.add(e);
    g.add(s); return m;
  };
  // 1) kemoreseptör: tat tomurcuğu
  const kemo = istasyon(0, 'Kemoreseptör', I.kemo);
  const tomurcuk = mesh(new THREE.SphereGeometry(0.95, 32, 24), cam(0xff8fa3, 0.3), [0, 1.1, 0], null, [0, 0, 0], [1, 1.35, 1]); tomurcuk.userData.kabuk = true; kemo.add(tomurcuk);
  for (let i = 0; i < 9; i++) { const a = (i / 9) * Math.PI * 2; kemo.add(mesh(new THREE.CapsuleGeometry(0.1, 1.2, 6, 10), mat(0xffd1a1), [Math.cos(a) * 0.38, 1.1, Math.sin(a) * 0.38], null, [Math.sin(a) * 0.18, 0, -Math.cos(a) * 0.18])); }
  kemo.add(mesh(new THREE.TorusGeometry(0.22, 0.06, 8, 20), mat(0xffa94d), [0, 2.0, 0], null, [Math.PI / 2, 0, 0]));
  kemo.add(tup([[0, 0.2, 0], [0.1, -0.1, 0.3], [0.6, 0, 0.8]], 0.06, mat(0x39d0ff), { seg: 10, rad: 6 }));
  const mol = []; for (let i = 0; i < 7; i++) { const m = mesh(new THREE.IcosahedronGeometry(0.1, 0), mat([0xffd166, 0x9b8cff, 0x2ee59d, 0xff6b81][i % 4], { emissiveIntensity: 0.6 }), [0, 3, 0]); kemo.add(m); mol.push({ m, f: i / 7, a: rnd() * 6 }); }
  anim.push((t, dt) => mol.forEach((o) => { o.f = (o.f + dt * 0.22) % 1; const r = 1.2 * (1 - o.f); o.m.position.set(Math.cos(o.a + o.f * 5) * r, 3.1 - o.f * 1.2, Math.sin(o.a + o.f * 5) * r); o.m.rotation.x += dt * 2; }));

  // 2) mekanoreseptör: Pacini cisimciği
  const mekano = istasyon(1, 'Mekanoreseptör', I.mekano);
  const pac = new THREE.Group(); pac.position.y = 1.3; mekano.add(pac);
  for (let i = 0; i < 7; i++) { const s = 1 - i * 0.12; const k = mesh(new THREE.SphereGeometry(0.95, 28, 20), cam(0xffd38a, 0.15 + i * 0.015, { emissiveIntensity: 0.1 }), [0, 0, 0], null, [0, 0, 0], [0.82 * s, 1.3 * s, 0.82 * s]); if (i === 0) k.userData.kabuk = true; pac.add(k); }
  pac.add(mesh(new THREE.CylinderGeometry(0.1, 0.1, 2.0, 12), mat(0x39d0ff, { emissiveIntensity: 0.6 }), [0, 0, 0]));
  mekano.add(tup([[0, -0.1, 0], [0.2, -0.5, 0.2], [0.9, -0.2, 0.7]], 0.07, mat(0x39d0ff), { seg: 10, rad: 6 }));
  const ok = mesh(new THREE.ConeGeometry(0.35, 0.8, 16), mat(0xff6b6b, { emissiveIntensity: 0.5 }), [0, 3.1, 0], null, [Math.PI, 0, 0]); mekano.add(ok);
  anim.push((t) => { const k = 0.5 + 0.5 * Math.sin(t * 2.4); pac.scale.set(1 + 0.12 * k, 1 - 0.18 * k, 1 + 0.12 * k); ok.position.y = 3.1 - 0.5 * k; });

  // 3) termoreseptör
  const termo = istasyon(2, 'Termoreseptör', I.termo);
  const deriMat = mat(0xe8b98f, { roughness: 0.8, emissiveIntensity: 0.05 });
  const d1 = mesh(new THREE.BoxGeometry(2.6, 0.5, 1.8), deriMat, [0, 0.35, 0]); termo.add(d1);
  [[-0.7, 0xff5d4d], [0.7, 0x4aa8ff]].forEach(([x, c]) => { termo.add(tup([[x, -0.4, 0], [x, 0.2, 0], [x, 0.55, 0]], 0.05, mat(c), { seg: 8, rad: 6 })); termo.add(mesh(new THREE.SphereGeometry(0.15, 14, 10), mat(c, { emissiveIntensity: 0.6 }), [x, 0.62, 0])); });
  const sicak = grup(null, [-0.7, 2.0, 0]); sicak.add(mesh(new THREE.SphereGeometry(0.42, 20, 14), mat(0xff7a29, { emissiveIntensity: 1.0 }))); sicak.add(mesh(new THREE.ConeGeometry(0.28, 0.7, 14), mat(0xffc24a, { emissiveIntensity: 1.0 }), [0, 0.55, 0])); termo.add(sicak);
  const buz = mesh(new THREE.IcosahedronGeometry(0.45, 0), cam(0xbfe8ff, 0.8, { emissiveIntensity: 0.4 }), [0.7, 2.0, 0]); termo.add(buz);
  anim.push((t) => { sicak.position.y = 2.0 + Math.sin(t * 3) * 0.1; sicak.children[1].scale.y = 1 + 0.2 * Math.sin(t * 9); buz.position.y = 2.0 + Math.sin(t * 2 + 1) * 0.08; buz.rotation.y = t * 0.7; });

  // 4) ağrı reseptörü
  const agri = istasyon(3, 'Ağrı reseptörü', I.agri);
  agri.add(mesh(new THREE.BoxGeometry(2.6, 0.7, 1.8), deriMat, [0, 0.45, 0]));
  const dal = (p0, yon, uz, der) => {
    const p1 = p0.clone().add(yon.clone().multiplyScalar(uz));
    agri.add(tup([p0.toArray(), p0.clone().lerp(p1, 0.5).add(V((rnd() - 0.5) * 0.1, 0, (rnd() - 0.5) * 0.1)).toArray(), p1.toArray()], 0.03 + 0.012 * der, mat(0xff5d5d, { emissiveIntensity: 0.4 }), { seg: 8, rad: 6 }));
    if (der > 0) for (let k = 0; k < 2; k++) dal(p1, yon.clone().applyAxisAngle(V(0, 0, 1), (k ? 1 : -1) * 0.55).applyAxisAngle(V(0, 1, 0), rnd() - 0.5).normalize(), uz * 0.75, der - 1);
    else agri.add(mesh(new THREE.SphereGeometry(0.06, 8, 6), mat(0xff9a9a, { emissiveIntensity: 0.7 }), p1.toArray()));
  };
  dal(V(0, -0.2, 0), V(0, 1, 0), 0.5, 3);
  const civi = grup(null, [0.0, 2.2, 0]); civi.add(mesh(new THREE.ConeGeometry(0.2, 1.2, 14), mat(0xc9d6e2, { metalness: 0.8, roughness: 0.25 }), [0, 0.0, 0], null, [Math.PI, 0, 0])); civi.add(mesh(new THREE.CylinderGeometry(0.3, 0.3, 0.3, 14), mat(0x8aa0b4), [0, 0.75, 0])); agri.add(civi);
  const kivilcimlar = []; for (let i = 0; i < 6; i++) { const m = mesh(new THREE.OctahedronGeometry(0.08, 0), mat(0xff3b3b, { emissiveIntensity: 1 }), [0, 0.9, 0]); agri.add(m); kivilcimlar.push({ m, a: i }); }
  anim.push((t) => { const k = 0.5 + 0.5 * Math.sin(t * 2.2); civi.position.y = 2.2 - 0.9 * k; kivilcimlar.forEach((o) => { o.m.visible = k > 0.6; o.m.position.set(Math.cos(o.a * 1.05 + t * 6) * 0.5 * k, 1.05 + Math.sin(o.a * 2 + t * 5) * 0.3, Math.sin(o.a * 1.05 + t * 6) * 0.5 * k); }); });

  // 5) fotoreseptör
  const foto = istasyon(4, 'Fotoreseptör', I.foto);
  const hucreYap = (x, koni) => {
    const h = grup(null, [x, 0.3, 0]);
    for (let i = 0; i < 12; i++) { const r = koni ? 0.1 + i * 0.022 : 0.27; h.add(mesh(new THREE.CylinderGeometry(r, r, 0.05, 20), mat(koni ? 0x6cf0a8 : 0xb8d8ff, { emissiveIntensity: 0.3 }), [0, 2.0 - i * 0.075 + 0.1, 0])); }
    h.add(mesh(new THREE.CapsuleGeometry(0.26, 0.3, 8, 14), mat(0x4bb8ff), [0, 0.85, 0]));
    h.add(mesh(new THREE.SphereGeometry(0.28, 16, 12), mat(0x8f7bff), [0, 0.35, 0]));
    h.add(mesh(new THREE.CylinderGeometry(0.06, 0.06, 0.4, 8), mat(0x39d0ff), [0, 0.05, 0]));
    h.add(mesh(new THREE.SphereGeometry(0.2, 14, 10), mat(0x2ee59d), [0, -0.2, 0]));
    foto.add(h); return h;
  };
  hucreYap(-0.65, false); hucreYap(0.65, true);
  const isinlar = []; for (let i = 0; i < 8; i++) { const m = mesh(new THREE.CapsuleGeometry(0.03, 0.35, 4, 6), new THREE.MeshBasicMaterial({ color: 0xfff08a }), [0, 0, 0]); foto.add(m); isinlar.push({ m, f: i / 8, x: (i - 3.5) * 0.28 }); }
  anim.push((t, dt) => isinlar.forEach((o) => { o.f = (o.f + dt * 0.5) % 1; o.m.position.set(o.x, 4.1 - o.f * 1.9, 0.5); }));

  g.add(mesh(new THREE.CylinderGeometry(R + 2.4, R + 2.4, 0.1, 64), cam(0x2ee59d, 0.05, { emissiveIntensity: 0.05 }), [0, -0.25, 0]));
  return { grup: g, kamera: [0, 6.5, 14.5], hedef: [0, 1, 0], otoDondur: true, guncelle(t, dt) { anim.forEach((f) => f(t, dt)); } };
}

// ======================================================================= GLİA
export function glia() {
  const I = BILGI.glia, g = new THREE.Group(), rnd = rastgele(41);
  const mil = mat(0xf6e7a8, { roughness: 0.6, emissiveIntensity: 0.08 });
  const akM = mat(0x39d0ff, { emissiveIntensity: 0.3 });
  // MSS: oligodendrosit
  const aksY = [1.0, 0.0, -1.0];
  aksY.forEach((y, i) => { g.add(tup([[-8.2, y, -0.2 + i * 0.2], [0.4, y, -0.2 + i * 0.2]], 0.11, akM, { seg: 4, rad: 10, bilgi: I.aksonMSS })); });
  const oligo = grup(I.oligo, [-4.6, 3.3, 0]);
  oligo.add(mesh(new THREE.SphereGeometry(0.65, 28, 20), mat(0xa86bff), [0, 0, 0]));
  oligo.add(mesh(new THREE.SphereGeometry(0.28, 16, 12), mat(0x5a2fb8), [0.1, 0.1, 0.35]));
  g.add(oligo);
  aksY.forEach((y, i) => {
    const xs = -5.4 + i * 1.0, z = -0.2 + i * 0.2;
    g.add(mesh(new THREE.CapsuleGeometry(0.3, 0.7, 8, 16), mil, [xs, y, z], I.oligo, [0, 0, Math.PI / 2]));
    g.add(tup([[-4.6, 3.1, 0], [-4.6 + (xs + 4.6) * 0.4, 2.2 - i * 0.2, z * 0.6], [xs, y + 0.34, z]], 0.07, mat(0xa86bff), { seg: 16, rad: 8, bilgi: I.oligo }));
  });
  // ÇSS: Schwann
  g.add(tup([[0.8, 0, 0], [10, 0, 0]], 0.11, akM, { seg: 4, rad: 10, bilgi: I.aksonCSS }));
  [3.4, 7.0].forEach((x, i) => {
    const s = grup(I.schwann, [x, 0, 0]);
    s.add(mesh(new THREE.CapsuleGeometry(0.4, 2.0, 10, 20), mat(0xf6e7a8, { roughness: 0.6, emissiveIntensity: 0.08 }), [0, 0, 0], null, [0, 0, Math.PI / 2]));
    s.add(mesh(new THREE.SphereGeometry(0.4, 18, 14), mat(0xff9f1c), [0, 0.5, 0.1], null, [0, 0, 0], [1.4, 0.6, 0.9]));
    g.add(s);
  });
  g.add(mesh(new THREE.TorusGeometry(0.2, 0.06, 10, 24), mat(0xff9f1c, { emissiveIntensity: 0.4 }), [5.2, 0, 0], I.ranvier, [0, Math.PI / 2, 0]));
  // mikroglia
  const mik = grup(I.mikroglia, [2.6, 3.7, 0]);
  mik.add(mesh(new THREE.SphereGeometry(0.4, 24, 18), mat(0xff6b9d), [0, 0, 0]));
  mik.add(mesh(new THREE.SphereGeometry(0.16, 14, 10), mat(0x8a1f4c), [0.05, 0.05, 0.25]));
  const kollar = [];
  for (let i = 0; i < 9; i++) {
    const y = V(rnd() - 0.5, rnd() - 0.5, rnd() - 0.5).normalize(), son = y.clone().multiplyScalar(1.3 + rnd() * 0.5);
    const kol = new THREE.Group(); kol.add(tup([[0, 0, 0], y.clone().multiplyScalar(0.7).toArray(), son.toArray()], 0.05, mat(0xff8fb8), { seg: 12, rad: 6 }));
    kol.add(mesh(new THREE.SphereGeometry(0.07, 8, 6), mat(0xffc2d8), son.toArray())); mik.add(kol); kollar.push(kol);
  }
  g.add(mik);
  const kalinti = []; [[4.6, 3.3, 0.2], [1.0, 2.8, -0.3], [3.6, 2.2, 0.4]].forEach((p, i) => { const m = mesh(new THREE.DodecahedronGeometry(0.2, 0), mat(0x8a7f78, { roughness: 0.9, emissiveIntensity: 0.05 }), p); g.add(m); kalinti.push({ m, ev: V(...p), i }); });
  // ayırıcı ve etiketler
  g.add(mesh(new THREE.PlaneGeometry(0.02, 9), new THREE.MeshBasicMaterial({ color: 0x2ee59d, transparent: true, opacity: 0.5, side: THREE.DoubleSide }), [0.6, 0.3, 0]));
  const etk = (t, p, o = 1) => { const e = etiket(t, { olcek: o }); e.position.set(...p); g.add(e); };
  etk('MSS (beyin-omurilik)', [-4, -2.6, 0], 1.1); etk('ÇSS (çevresel sinirler)', [5.2, -2.6, 0], 1.1);
  etk('Oligodendrosit', [-4.6, 4.5, 0], 0.9); etk('Schwann hücresi', [3.4, 1.6, 0], 0.9); etk('Mikroglia', [2.6, 5.1, 0], 0.9);
  etk('Ranvier boğumu', [5.2, -1.0, 0], 0.7);
  return {
    grup: g, kamera: [0, 1.4, 15], hedef: [0.5, 0.8, 0],
    guncelle(t, dt) {
      kollar.forEach((k, i) => { k.rotation.z = Math.sin(t * 1.5 + i) * 0.18; k.rotation.x = Math.cos(t * 1.2 + i * 2) * 0.15; });
      kalinti.forEach((k) => {
        const c = (t * 0.18 + k.i * 0.33) % 1, f = c < 0.6 ? yumusat(c / 0.6) : 1;
        const hedef = V(2.6, 3.7, 0);
        if (c < 0.6) { k.m.visible = true; k.m.position.lerpVectors(k.ev, hedef, f); k.m.scale.setScalar(1 - 0.85 * f); }
        else if (c < 0.7) k.m.visible = false; else { k.m.visible = true; k.m.position.copy(k.ev); k.m.scale.setScalar(Math.min(1, (c - 0.7) * 4)); }
      });
    }
  };
}
