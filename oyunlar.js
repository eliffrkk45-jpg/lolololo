// Oyun motorları: yarışma, eşleştirme, sıralama, sınıflama, aksiyon potansiyeli simülatörü, konfeti
// Hepsi dokunmatik uyumludur (sürükle-bırak yok, dokunarak oynanır).

export const kac = (s) => String(s).replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
export function karistir(a) {
  const b = a.slice();
  for (let i = b.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [b[i], b[j]] = [b[j], b[i]]; }
  return b;
}
const sallan = (el) => { el.classList.remove('sallan'); void el.offsetWidth; el.classList.add('sallan'); };

// ------------------------------------------------------------------ konfeti
export function konfeti(adet = 90) {
  const c = document.createElement('canvas');
  c.className = 'konfeti'; document.body.appendChild(c);
  const x = c.getContext('2d'), W = (c.width = innerWidth), H = (c.height = innerHeight);
  const renk = ['#2ee59d', '#3aa0ff', '#19c3d6', '#ffffff', '#7ffcff', '#ffd23f'];
  const p = Array.from({ length: adet }, () => ({ x: W / 2 + (Math.random() - 0.5) * 200, y: H * 0.55, vx: (Math.random() - 0.5) * 12, vy: -Math.random() * 14 - 4, r: 4 + Math.random() * 5, c: renk[(Math.random() * renk.length) | 0], a: Math.random() * 6, va: (Math.random() - 0.5) * 0.4 }));
  let t = 0;
  (function kare() {
    t++; x.clearRect(0, 0, W, H);
    p.forEach((q) => { q.vy += 0.35; q.x += q.vx; q.y += q.vy; q.a += q.va; x.save(); x.translate(q.x, q.y); x.rotate(q.a); x.fillStyle = q.c; x.globalAlpha = Math.max(0, 1 - t / 130); x.fillRect(-q.r / 2, -q.r / 4, q.r, q.r / 2); x.restore(); });
    if (t < 130) requestAnimationFrame(kare); else c.remove();
  })();
}

// ------------------------------------------------------------------ yarışma (çoktan seçmeli)
// sorular: [soru, [seçenekler], doğruNo, açıklama]
export function yarisma(kap, sorular, bitti) {
  const liste = karistir(sorular).map((s) => {
    const sec = s[1].map((m, i) => ({ m, d: i === s[2] }));
    return { s: s[0], sec: karistir(sec), a: s[3] };
  });
  let i = 0, dogru = 0, seri = 0, enSeri = 0, kilit = false;

  function ciz() {
    const q = liste[i];
    kap.innerHTML = `
      <div class="oyun-ust"><span>Soru ${i + 1} / ${liste.length}</span><span>✅ ${dogru}</span><span class="seri ${seri >= 2 ? 'sicak' : ''}">🔥 ${seri}</span></div>
      <div class="ilerleme"><i style="width:${(i / liste.length) * 100}%"></i></div>
      <h3 class="soru">${kac(q.s)}</h3>
      <div class="secenekler">${q.sec.map((o, k) => `<button class="secenek" data-k="${k}"><b>${'ABCD'[k]}</b><span>${kac(o.m)}</span></button>`).join('')}</div>
      <div class="geri-bildirim" aria-live="polite"></div>`;
    kilit = false;
  }
  kap.onclick = (e) => {
    const b = e.target.closest('.secenek'); if (b && !kilit) {
      kilit = true;
      const q = liste[i], k = +b.dataset.k, dz = q.sec[k].d;
      kap.querySelectorAll('.secenek').forEach((x, n) => { x.disabled = true; if (q.sec[n].d) x.classList.add('dogru'); });
      if (dz) { dogru++; seri++; enSeri = Math.max(enSeri, seri); } else { b.classList.add('yanlis'); sallan(b); seri = 0; }
      const gb = kap.querySelector('.geri-bildirim');
      gb.innerHTML = `<div class="gb ${dz ? 'iyi' : 'kotu'}"><b>${dz ? '🎉 Doğru!' : '🤔 Olmadı, sorun değil.'}</b> ${kac(q.a)}</div><button class="dugme ileri">${i === liste.length - 1 ? 'Sonucu gör' : 'Sonraki soru →'}</button>`;
      if (dz && seri >= 3) konfeti(30);
      return;
    }
    if (e.target.closest('.ileri')) { i++; if (i < liste.length) ciz(); else son(); }
    if (e.target.closest('.tekrar')) { i = 0; dogru = 0; seri = 0; enSeri = 0; const y = karistir(sorular).map((s) => ({ s: s[0], sec: karistir(s[1].map((m, n) => ({ m, d: n === s[2] }))), a: s[3] })); liste.splice(0, liste.length, ...y); ciz(); }
  };
  function son() {
    const oran = dogru / liste.length, puan = dogru * 10 + (enSeri >= 3 ? 20 : 0);
    const yildiz = oran >= 0.9 ? 3 : oran >= 0.6 ? 2 : oran >= 0.3 ? 1 : 0;
    kap.innerHTML = `<div class="sonuc"><div class="buyuk-emoji">${oran >= 0.6 ? '🏆' : '💪'}</div><h3>${oran >= 0.9 ? 'Muhteşem!' : oran >= 0.6 ? 'Harika iş!' : 'Biraz daha çalışalım!'}</h3>
      <div class="yildizlar">${[1, 2, 3].map((n) => `<span class="${n <= yildiz ? 'dolu' : ''}">★</span>`).join('')}</div>
      <p><b>${dogru}</b> / ${liste.length} doğru · en uzun seri <b>${enSeri}</b> · <b>+${puan}</b> puan</p>
      <p class="kucuk">${oran >= 0.6 ? 'Bu konunun yarışma yıldızını kazandın.' : 'Yıldız için en az %60 doğru gerekir.'}</p>
      <button class="dugme tekrar">🔄 Tekrar oyna</button></div>`;
    if (oran >= 0.6) konfeti();
    bitti && bitti({ oran, puan, dogru, toplam: liste.length });
  }
  ciz();
  return () => { kap.onclick = null; };
}

// ------------------------------------------------------------------ eşleştirme
export function eslestir(kap, ciftler, bitti) {
  const sol = karistir(ciftler.map((c, i) => ({ t: c[0], i })));
  const sag = karistir(ciftler.map((c, i) => ({ t: c[1], i })));
  let secili = null, eslesen = 0, hata = 0;
  kap.innerHTML = `
    <p class="yonerge">Önce soldaki terime, sonra ona uyan karşılığa dokun.</p>
    <div class="oyun-ust"><span id="e-es">0 / ${ciftler.length} eşleşti</span><span id="e-ha">❌ 0</span></div>
    <div class="esles-izgara"><div class="kolon" data-y="sol">${sol.map((o) => `<button class="kart-btn" data-i="${o.i}">${kac(o.t)}</button>`).join('')}</div>
    <div class="kolon" data-y="sag">${sag.map((o) => `<button class="kart-btn alt" data-i="${o.i}">${kac(o.t)}</button>`).join('')}</div></div>
    <div class="gb-yer"></div>`;
  kap.onclick = (e) => {
    const b = e.target.closest('.kart-btn'); if (!b || b.classList.contains('bitti')) return;
    const yan = b.parentElement.dataset.y;
    if (yan === 'sol') { kap.querySelectorAll('.kolon[data-y=sol] .kart-btn').forEach((x) => x.classList.remove('secili')); b.classList.add('secili'); secili = b; return; }
    if (!secili) { sallan(kap.querySelector('.kolon[data-y=sol]')); return; }
    if (secili.dataset.i === b.dataset.i) {
      secili.classList.remove('secili'); [secili, b].forEach((x) => x.classList.add('bitti')); secili = null; eslesen++;
      kap.querySelector('#e-es').textContent = `${eslesen} / ${ciftler.length} eşleşti`;
      if (eslesen === ciftler.length) {
        konfeti();
        kap.querySelector('.gb-yer').innerHTML = `<div class="gb iyi"><b>🎉 Hepsini eşleştirdin!</b> ${hata === 0 ? 'Hiç hata yapmadın.' : hata + ' hata yaptın.'}</div>`;
        bitti && bitti({ hata, puan: Math.max(10, 30 - hata * 3) });
      }
    } else { hata++; kap.querySelector('#e-ha').textContent = '❌ ' + hata; b.classList.add('yanlis'); sallan(b); setTimeout(() => b.classList.remove('yanlis'), 500); }
  };
  return () => { kap.onclick = null; };
}

// ------------------------------------------------------------------ sıralama
export function sirala(kap, o, bitti) {
  const dogruSira = o.adimlar;
  const kar = karistir(dogruSira.map((t, i) => ({ t, i })));
  let sonraki = 0, hata = 0;
  function ciz() {
    kap.innerHTML = `
      <h3 class="soru">${kac(o.baslik)}</h3>
      <p class="yonerge">Olayları <b>doğru sırayla</b> dokun: önce 1. adımı, sonra 2. adımı...</p>
      <div class="oyun-ust"><span>Sıradaki: ${Math.min(sonraki + 1, dogruSira.length)}. adım</span><span>❌ ${hata}</span></div>
      <ol class="sira-yer">${dogruSira.map((t, i) => `<li class="${i < sonraki ? 'dolu' : ''}">${i < sonraki ? kac(t) : '<em>' + (i + 1) + '. adım</em>'}</li>`).join('')}</ol>
      <div class="sira-havuz">${kar.map((x) => `<button class="kart-btn ${x.i < sonraki ? 'bitti gizli' : ''}" data-i="${x.i}">${kac(x.t)}</button>`).join('')}</div>
      <div class="gb-yer"></div>`;
  }
  kap.onclick = (e) => {
    const b = e.target.closest('.sira-havuz .kart-btn'); if (!b || b.classList.contains('bitti')) return;
    if (+b.dataset.i === sonraki) {
      sonraki++; ciz();
      if (sonraki === dogruSira.length) {
        konfeti();
        kap.querySelector('.gb-yer').innerHTML = `<div class="gb iyi"><b>🎉 Sıralama doğru!</b> ${hata === 0 ? 'Hiç hata yapmadın.' : hata + ' hata yaptın.'}</div>`;
        bitti && bitti({ hata, puan: Math.max(10, 30 - hata * 3) });
      }
    } else { hata++; b.classList.add('yanlis'); sallan(b); kap.querySelector('.oyun-ust span:last-child').textContent = '❌ ' + hata; setTimeout(() => b.classList.remove('yanlis'), 500); }
  };
  ciz();
  return () => { kap.onclick = null; };
}

// ------------------------------------------------------------------ sınıflama
export function sinifla(kap, o, bitti) {
  const kuyruk = karistir(o.oge);
  let n = 0, hata = 0, dogru = 0;
  function ciz() {
    if (n >= kuyruk.length) {
      konfeti();
      kap.innerHTML = `<div class="sonuc"><div class="buyuk-emoji">🗂️</div><h3>Hepsini yerleştirdin!</h3><p>${kuyruk.length} ifade · ${hata} hata</p><button class="dugme tekrar">🔄 Tekrar oyna</button></div>`;
      bitti && bitti({ hata, puan: Math.max(10, 30 - hata * 3) });
      return;
    }
    const q = kuyruk[n];
    kap.innerHTML = `
      <h3 class="soru">${kac(o.baslik)}</h3>
      <div class="oyun-ust"><span>${n + 1} / ${kuyruk.length}</span><span>❌ ${hata}</span></div>
      <div class="ilerleme"><i style="width:${(n / kuyruk.length) * 100}%"></i></div>
      <div class="sinif-kart">${kac(q[0])}</div>
      <p class="yonerge">Bu ifade hangi gruba ait?</p>
      <div class="sinif-dugmeler">${o.kat.map((k, i) => `<button class="dugme grup-${i % 4}" data-k="${i}">${kac(k)}</button>`).join('')}</div>`;
  }
  kap.onclick = (e) => {
    if (e.target.closest('.tekrar')) { n = 0; hata = 0; dogru = 0; kuyruk.splice(0, kuyruk.length, ...karistir(o.oge)); ciz(); return; }
    const b = e.target.closest('.sinif-dugmeler .dugme'); if (!b) return;
    if (+b.dataset.k === kuyruk[n][1]) { dogru++; b.classList.add('dogru'); kap.querySelector('.sinif-kart').classList.add('onay'); setTimeout(() => { n++; ciz(); }, 380); }
    else { hata++; sallan(b); sallan(kap.querySelector('.sinif-kart')); b.classList.add('yanlis'); setTimeout(() => b.classList.remove('yanlis'), 500); kap.querySelector('.oyun-ust span:last-child').textContent = '❌ ' + hata; }
  };
  ciz();
  return () => { kap.onclick = null; };
}

// ------------------------------------------------------------------ aksiyon potansiyeli simülatörü
// Hodgkin-Huxley modeli (gösterim −5 mV kaydırılmıştır: dinlenme ≈ −70 mV)
export function aksiyonSim(kap, bitti) {
  kap.innerHTML = `
    <p class="yonerge">Uyarı şiddetini ayarla ve <b>Uyar</b> düğmesine dokun. Eşik değerin altında impuls olmaz, üstünde her zaman aynı büyüklükte oluşur (ya hep ya hiç).</p>
    <div class="sim-panel">
      <div class="sim-durum"><b class="sim-mv">−70 mV</b><span class="sim-faz">Polarizasyon (dinlenme)</span></div>
      <canvas class="sim-tuval" width="640" height="340"></canvas>
      <div class="sim-ack"><span class="na">▬ Na⁺ kanalları</span><span class="k">▬ K⁺ kanalları</span><span class="esik">┄ eşik (≈ −55 mV)</span></div>
      <label class="sim-kay">Uyarı şiddeti: <b class="sim-deger">30</b><input type="range" min="0" max="100" value="30" class="sim-kayd"></label>
      <div class="sim-dugmeler"><button class="dugme sim-uyar">⚡ Uyar</button><button class="dugme ikinci sim-yavas">🐢 Yavaş çekim: kapalı</button><button class="dugme ikinci sim-sifir">↺ Sıfırla</button></div>
      <div class="sim-notlar"></div>
    </div>`;
  const cv = kap.querySelector('.sim-tuval'), cx = cv.getContext('2d');
  const W = cv.width, H = cv.height, PENCERE = 24, GOSTER = 5; // ms
  let V = -65, n = 0.3177, m = 0.0529, h = 0.5961, t = 0, akim = 0, akimBitis = 0, yavas = false, calis = true, raf = 0, son = 0;
  let iz = [], eg = 0, vOnce = -70, faz = 'dinlenme', spikeSayisi = 0, ensonSpike = false, maksV = -70;
  const ust = (x) => 1 / (1 + Math.exp(-x));
  function adim(dt) {
    const I = t < akimBitis ? akim : 0;
    const an = 0.01 * (V + 55) / (1 - Math.exp(-(V + 55) / 10) || 1e-9), bn = 0.125 * Math.exp(-(V + 65) / 80);
    const am = 0.1 * (V + 40) / (1 - Math.exp(-(V + 40) / 10) || 1e-9), bm = 4 * Math.exp(-(V + 65) / 18);
    const ah = 0.07 * Math.exp(-(V + 65) / 20), bh = ust((V + 35) / 10);
    const iNa = 120 * m ** 3 * h * (V - 50), iK = 36 * n ** 4 * (V + 77), iL = 0.3 * (V + 54.387);
    V += dt * (I - iNa - iK - iL); n += dt * (an * (1 - n) - bn * n); m += dt * (am * (1 - m) - bm * m); h += dt * (ah * (1 - h) - bh * h);
    t += dt;
  }
  const FAZ = { dinlenme: 'Polarizasyon (dinlenme)', depol: 'Depolarizasyon: Na⁺ girişi', repol: 'Repolarizasyon: K⁺ çıkışı', hiper: 'Hiperpolarizasyon (aşırı negatif)', esikalti: 'Eşik altı yanıt (impuls yok)' };
  function faziBul(vd, dv) {
    if (Math.abs(vd + 70) < 1.2 && Math.abs(dv) < 0.5) return 'dinlenme';
    if (dv > 0 && vd > -69) return vd > -57 || ensonSpike ? 'depol' : 'esikalti';
    if (dv < 0 && vd > -70.5) return ensonSpike ? 'repol' : 'esikalti';
    if (vd < -71.5) return 'hiper';
    return 'dinlenme';
  }
  function ciz() {
    cx.clearRect(0, 0, W, H);
    const pL = 46, pR = 10, pT = 12, pA = 190, yMin = -95, yMax = 55;
    const X = (ms) => pL + ((ms - eg) / PENCERE) * (W - pL - pR), Y = (v) => pT + ((yMax - v) / (yMax - yMin)) * (pA - pT);
    cx.fillStyle = 'rgba(6,30,56,.7)'; cx.fillRect(0, 0, W, H);
    cx.font = '12px system-ui,sans-serif'; cx.textAlign = 'right'; cx.fillStyle = '#a9d6ee'; cx.strokeStyle = 'rgba(160,210,240,.18)'; cx.lineWidth = 1;
    [40, 0, -40, -70].forEach((v) => { cx.beginPath(); cx.moveTo(pL, Y(v)); cx.lineTo(W - pR, Y(v)); cx.stroke(); cx.fillText(v + '', pL - 6, Y(v) + 4); });
    cx.save(); cx.translate(12, pA / 2 + 10); cx.rotate(-Math.PI / 2); cx.textAlign = 'center'; cx.fillText('Zar potansiyeli (mV)', 0, 0); cx.restore();
    cx.setLineDash([6, 5]); cx.strokeStyle = '#ffd23f'; cx.beginPath(); cx.moveTo(pL, Y(-55)); cx.lineTo(W - pR, Y(-55)); cx.stroke();
    cx.strokeStyle = '#7fe0b6'; cx.beginPath(); cx.moveTo(pL, Y(-70)); cx.lineTo(W - pR, Y(-70)); cx.stroke(); cx.setLineDash([]);
    cx.textAlign = 'left'; cx.fillStyle = '#7fe0b6'; cx.fillText('dinlenme −70', pL + 6, Y(-70) - 5);
    // gerilim
    cx.beginPath(); cx.lineWidth = 3; cx.strokeStyle = '#2ee59d'; cx.shadowColor = '#2ee59d'; cx.shadowBlur = 8;
    iz.forEach((p, i) => { const x = X(p.t), y = Y(p.v); i ? cx.lineTo(x, y) : cx.moveTo(x, y); }); cx.stroke(); cx.shadowBlur = 0;
    if (iz.length) { const p = iz[iz.length - 1]; cx.fillStyle = '#fff'; cx.beginPath(); cx.arc(X(p.t), Y(p.v), 5, 0, 7); cx.fill(); }
    // iletkenlik
    const gT = pA + 24, gA = H - 20, gY = (g) => gA - g * (gA - gT);
    cx.fillStyle = '#a9d6ee'; cx.textAlign = 'left'; cx.fillText('Kanal açıklığı', pL, gT - 6);
    cx.strokeStyle = 'rgba(160,210,240,.2)'; cx.beginPath(); cx.moveTo(pL, gA); cx.lineTo(W - pR, gA); cx.stroke();
    [['na', '#3aa0ff'], ['k', '#ffb347']].forEach(([a, r]) => {
      cx.beginPath(); cx.lineWidth = 2.5; cx.strokeStyle = r;
      iz.forEach((p, i) => { const x = X(p.t), y = gY(p[a]); i ? cx.lineTo(x, y) : cx.moveTo(x, y); }); cx.stroke();
    });
    cx.fillStyle = '#a9d6ee'; cx.textAlign = 'center'; cx.fillText('Zaman (ms)', (W + pL) / 2, H - 4);
  }
  function guncelleYazi(vd, dv) {
    kap.querySelector('.sim-mv').textContent = (vd < 0 ? '−' : '+') + Math.abs(vd).toFixed(0) + ' mV';
    const yeni = faziBul(vd, dv); if (yeni !== faz) { faz = yeni; }
    kap.querySelector('.sim-faz').textContent = FAZ[faz];
    kap.querySelector('.sim-faz').className = 'sim-faz f-' + faz;
  }
  function dongu(ts) {
    raf = requestAnimationFrame(dongu);
    const dtGercek = Math.min((ts - (son || ts)) / 1000, 0.05); son = ts;
    if (!calis) return;
    const hiz = yavas ? 1.2 : 3.2; // ms / saniye
    let kalan = dtGercek * hiz;
    while (kalan > 0) { const d = Math.min(0.01, kalan); adim(d); kalan -= d; }
    const vd = V - 5, dv = (vd - vOnce) / Math.max(dtGercek, 1e-3) / hiz; vOnce = vd;
    if (vd > -20 && !ensonSpike) { ensonSpike = true; spikeSayisi++; maksV = Math.max(maksV, vd); notYaz(); }
    if (ensonSpike && vd < -60 && dv < 0) ensonSpike = ensonSpike && vd > -69;
    iz.push({ t, v: vd, na: Math.min(1, (m ** 3 * h) * 2.2), k: Math.min(1, n ** 4 * 1.6) });
    if (t - eg > PENCERE * 0.9) eg = t - PENCERE * 0.9;
    while (iz.length && iz[0].t < eg - 0.5) iz.shift();
    guncelleYazi(vd, dv); ciz();
  }
  function notYaz() {
    kap.querySelector('.sim-notlar').innerHTML = `<div class="gb iyi"><b>⚡ Aksiyon potansiyeli oluştu!</b> En yüksek değer yaklaşık <b>+${maksV.toFixed(0)} mV</b>. Uyarıyı daha da artırsan bu değer değişmez: <b>ya hep ya hiç</b>.</div>`;
    bitti && bitti();
  }
  const kay = kap.querySelector('.sim-kayd');
  kay.oninput = () => { kap.querySelector('.sim-deger').textContent = kay.value; };
  kap.querySelector('.sim-uyar').onclick = () => {
    akim = +kay.value * 0.3; akimBitis = t + 0.5; ensonSpike = false; const once = spikeSayisi;
    setTimeout(() => { if (spikeSayisi === once) kap.querySelector('.sim-notlar').innerHTML = `<div class="gb kotu"><b>Eşik aşılmadı.</b> Uyarı yeterince güçlü olmadığı için impuls oluşmadı. Şiddeti artırıp tekrar dene.</div>`; }, 1600);
  };
  kap.querySelector('.sim-yavas').onclick = (e) => { yavas = !yavas; e.target.textContent = '🐢 Yavaş çekim: ' + (yavas ? 'açık' : 'kapalı'); };
  kap.querySelector('.sim-sifir').onclick = () => { V = -65; n = 0.3177; m = 0.0529; h = 0.5961; t = 0; eg = 0; iz = []; akimBitis = 0; ensonSpike = false; kap.querySelector('.sim-notlar').innerHTML = ''; };
  raf = requestAnimationFrame(dongu);
  return () => { cancelAnimationFrame(raf); calis = false; };
}
