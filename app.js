// NASSE BIOLOGY - ana uygulama: ekranlar, yönlendirme, 3B bölümleri, oyunlar
import { SINIFLAR, KONULAR, BAGLAM, ROZETLER } from './konular.js';
import { SAHNELER, BILGI, SKETCHFAB, OZEL_MODELLER } from './bilgi.js';
import { AYAR } from './config.js';
import { Goruntuleyici } from './viewer3d.js';
import * as M1 from './models1.js';
import * as M2 from './models2.js';
import * as depo from './depo.js';
import { kac, yarisma, eslestir, sirala, sinifla, aksiyonSim, konfeti } from './oyunlar.js';
import { arkaplanBaslat } from './arkaplan.js';
import { sketchfabAc } from './sketchfab.js';

const YAPICI = {
  hucre: M1.hucre, noron: M1.noron, refleks: M1.refleks, beyin: M1.beyin, omurilik: M1.omurilik,
  molekul: M2.molekul, zar: M2.zar, sinaps: M2.sinaps, mitokondri: M2.mitokondri, atp: M2.atp, reseptor: M2.reseptor, glia: M2.glia
};
const BAGLAM_SAHNE = ['refleks', 'beyin', 'glia', 'sinaps'];
const BILGILER = [
  'İnsan beyninde yaklaşık 86 milyar nöron vardır.',
  'Beyin vücut ağırlığının yaklaşık %2’sidir ama enerjinin yaklaşık %20’sini harcar.',
  'Miyelinli bazı nöronlarda impuls saniyede 100 metreyi aşan hızla ilerler.',
  'İnsanda 31 çift omurilik siniri vardır.',
  'Vücuttaki serotoninin büyük kısmı sindirim sisteminde bulunur.',
  'Ağrı reseptörleri bizi korumak için vardır: hasarı daha oluşmadan haber verirler.',
  'Dopamin yalnızca “mutluluk” değil, motivasyon ve hareket için de önemlidir.',
  'Bir nöron saniyede yüzlerce kez impuls oluşturabilir.',
  'Glia hücreleri nöronları besler, yalıtır ve korur.',
  'Mitokondri kendi DNA’sına sahiptir.'
];
const MASKOT = `<svg class="maskot" viewBox="0 0 120 120" aria-hidden="true">
  <g class="m-dal" stroke="#7ffcff" stroke-width="5" stroke-linecap="round" fill="none"><path d="M26 36 L10 22 M10 22 L4 30 M10 22 L18 14"/><path d="M24 78 L8 92 M8 92 L2 84 M8 92 L16 100"/><path d="M60 10 L60 0 M60 10 L50 4"/></g>
  <path d="M90 62 Q108 62 114 74" stroke="#2ee59d" stroke-width="6" stroke-linecap="round" fill="none"/><circle cx="114" cy="76" r="5" fill="#2ee59d"/>
  <circle cx="58" cy="60" r="44" fill="url(#mg)"/><defs><radialGradient id="mg" cx=".35" cy=".3"><stop offset="0" stop-color="#7ffcff"/><stop offset=".55" stop-color="#3aa0ff"/><stop offset="1" stop-color="#1b5fd0"/></radialGradient></defs>
  <g class="m-goz"><ellipse cx="44" cy="56" rx="8" ry="10" fill="#fff"/><ellipse cx="72" cy="56" rx="8" ry="10" fill="#fff"/><circle cx="46" cy="58" r="4.5" fill="#06182f"/><circle cx="74" cy="58" r="4.5" fill="#06182f"/></g>
  <path d="M46 78 Q58 90 70 78" stroke="#06182f" stroke-width="4" stroke-linecap="round" fill="none"/>
  <circle cx="36" cy="72" r="5" fill="#2ee59d" opacity=".5"/><circle cx="80" cy="72" r="5" fill="#2ee59d" opacity=".5"/></svg>`;

const $ = (s, k = document) => k.querySelector(s);
const uygulama = $('#uygulama');
let temizlikler = [], arka = null;

function bildir(m) {
  const b = $('#bildirim'); b.textContent = m; b.classList.add('goster');
  clearTimeout(bildir.z); bildir.z = setTimeout(() => b.classList.remove('goster'), 2600);
}
function yildizHtml(n, max = 3) { return Array.from({ length: max }, (_, i) => `<span class="${i < n ? 'dolu' : ''}">★</span>`).join(''); }
function konuYildizToplam(liste) { return liste.reduce((s, id) => s + depo.yildiz(id), 0); }
function temizle() { temizlikler.forEach((f) => { try { f(); } catch (e) { /* yoksay */ } }); temizlikler = []; }

// =============================================================== 3B SAHNE BİLEŞENİ
function sahneKur(kap, id, { onKesif, kucuk = false } = {}) {
  const tanim = SAHNELER[id], sf = SKETCHFAB[id], dis = AYAR.DIS_BAGLANTI[id];
  kap.innerHTML = `
  <div class="sb ${kucuk ? 'kucuk' : ''}">
    <div class="sb-baslik"><h3>${tanim.ikon} ${kac(tanim.ad)}</h3>
      <div class="sb-sekmeler">${sf ? '<button class="sek acik" data-s="ic">Kendi 3B modelimiz</button><button class="sek" data-s="sf">Hazır model</button>' : ''}<button class="sek gizli" data-s="ozel">Kendi modelim</button></div></div>
    <div class="sb-tuval">
      <div class="sb-gl"></div><div class="sb-sf gizli"></div>
      <div class="sb-hud gizli"></div>
      <div class="sb-araclar"><button data-a="yak" title="Yakınlaştır" aria-label="Yakınlaştır">＋</button><button data-a="uzak" title="Uzaklaştır" aria-label="Uzaklaştır">－</button><button data-a="sifir" title="Başa dön" aria-label="Başa dön">⟲</button><button data-a="don" title="Otomatik döndür" aria-label="Otomatik döndür">⟳</button><button data-a="tam" title="Tam ekran" aria-label="Tam ekran">⛶</button></div>
      <div class="sb-ipucu">☝️ sürükle: döndür · ✌️ iki parmak: yakınlaştır · 👆 dokun: bilgi</div>
    </div>
    <div class="sb-eylem"></div>
    <div class="sb-bilgi"><h4>${kac(tanim.ad)}</h4><p>${kac(tanim.ozet)} Bir parçaya dokun, bilgi kartı burada açılsın.</p></div>
    ${dis ? `<a class="sb-dis" href="${dis.url}" target="_blank" rel="noopener">🔗 Daha ayrıntılı model: ${kac(dis.ad)} (yeni sekmede)</a>` : ''}
    <div class="sb-parcalar"></div>
    ${sf ? '<p class="sb-not">Hazır model: Sketchfab üzerindeki sanatçısına aittir. <a target="_blank" rel="noopener" href="https://sketchfab.com/models/' + sf.uid + '">Model sayfası</a></p>' : ''}
  </div>`;
  const tuval = $('.sb-tuval', kap), gl = $('.sb-gl', kap), sfKutu = $('.sb-sf', kap), hudEl = $('.sb-hud', kap), bilgiEl = $('.sb-bilgi', kap), chipEl = $('.sb-parcalar', kap), eylemEl = $('.sb-eylem', kap);
  document.body.classList.add('sahne-acik'); arka && arka.durdur(true);
  const kartGoster = (b) => {
    if (!b) return;
    bilgiEl.innerHTML = `<h4>${kac(b.baslik)}</h4><p>${kac(b.metin)}</p>${b.ipucu ? `<div class="ipucu">💡 ${kac(b.ipucu)}</div>` : ''}`;
    bilgiEl.classList.remove('pop'); void bilgiEl.offsetWidth; bilgiEl.classList.add('pop');
    onKesif && onKesif(b.baslik);
  };
  let goruntuleyici;
  try { goruntuleyici = new Goruntuleyici(gl, { bilgiGoster: kartGoster, hud: (m) => { hudEl.innerHTML = m || ''; hudEl.classList.toggle('gizli', !m); } }); }
  catch (e) { gl.innerHTML = '<p class="hata">Tarayıcın 3B (WebGL) özelliğini desteklemiyor veya kapalı. Lütfen güncel bir tarayıcı dene.</p>'; return { yoket() { document.body.classList.remove('sahne-acik'); arka && arka.durdur(false); } }; }
  const s = goruntuleyici.sahneYukle(id, (ctx) => YAPICI[id](ctx));
  const chipYap = (liste) => {
    chipEl.innerHTML = liste.map((p, i) => `<button class="chip" data-i="${i}">${kac(p.bilgi.baslik)}</button>`).join('');
    chipEl.onclick = (e) => { const b = e.target.closest('.chip'); if (!b) return; const p = liste[+b.dataset.i]; if (p.nesne) goruntuleyici.sec(p.nesne); else kartGoster(p.bilgi); };
  };
  chipYap(goruntuleyici.parcalar);
  (s.eylemler || []).forEach((ey) => {
    const b = document.createElement('button'); b.className = 'dugme eylem'; b.textContent = ey.ad;
    b.onclick = () => { const yeni = ey.ac(); if (typeof yeni === 'string') b.textContent = yeni; };
    eylemEl.appendChild(b);
  });
  $('.sb-araclar', kap).onclick = (e) => {
    const b = e.target.closest('button'); if (!b) return; const a = b.dataset.a;
    if (a === 'yak') goruntuleyici.yakinlas(0.78); else if (a === 'uzak') goruntuleyici.yakinlas(1.28); else if (a === 'sifir') goruntuleyici.sifirla();
    else if (a === 'don') { b.classList.toggle('acik', goruntuleyici.otoDondurDegistir()); }
    else if (a === 'tam') { const t = tuval.classList.toggle('tam'); document.body.classList.toggle('tam-ekran', t); b.textContent = t ? '✕' : '⛶'; }
  };
  setTimeout(() => { const ip = $('.sb-ipucu', kap); ip && ip.classList.add('kayboldu'); }, 6500);

  let sfNesne = null;
  const sek = $('.sb-sekmeler', kap);
  goruntuleyici.ozelHazir = () => { const b = $('[data-s=ozel]', kap); b && b.classList.remove('gizli'); };
  if (goruntuleyici.ozelVar) goruntuleyici.ozelHazir();
  sek.onclick = async (e) => {
    const b = e.target.closest('.sek'); if (!b) return;
    sek.querySelectorAll('.sek').forEach((x) => x.classList.toggle('acik', x === b));
    const k = b.dataset.s;
    const sfMod = k === 'sf';
    sfKutu.classList.toggle('gizli', !sfMod); gl.classList.toggle('gizli', sfMod);
    $('.sb-araclar', kap).classList.toggle('gizli', sfMod); eylemEl.classList.toggle('gizli', sfMod);
    goruntuleyici.calisiyor = !sfMod;
    if (k === 'ozel') goruntuleyici.ozelGoster(true); else if (k === 'ic') goruntuleyici.ozelGoster(false);
    if (sfMod) {
      chipYap(Object.values(BILGI[SKETCHFAB_BILGI(id)] || {}).map((bi) => ({ bilgi: bi })));
      if (!sfNesne) sfNesne = await sketchfabAc(sfKutu, id, { durum: (m) => { hudEl.innerHTML = m; hudEl.classList.toggle('gizli', !m); }, kart: kartGoster });
    } else chipYap(goruntuleyici.parcalar);
  };
  return { yoket() { goruntuleyici.yoket(); sfNesne && sfNesne.yoket(); document.body.classList.remove('sahne-acik', 'tam-ekran'); arka && arka.durdur(false); } };
}
function SKETCHFAB_BILGI(id) { return (SKETCHFAB_BILGI.tablo[id]) || id; }
SKETCHFAB_BILGI.tablo = { hucre: 'hucre', noron: 'noron' };

// =============================================================== ORTAK PARÇALAR
function ustYapi() {
  uygulama.innerHTML = `
    <header class="ust"><a class="marka" href="#/ana">${MASKOT}<span>Nasse <b>Biology</b></span></a>
      <nav class="gezinme"><a href="#/ana" data-r="ana">🏠<span>Ana sayfa</span></a><a href="#/lab" data-r="lab">🧊<span>3B Laboratuvar</span></a><a href="#/baglam" data-r="baglam">🏁<span>Bağlam</span></a></nav>
      <div class="puan-kutu" title="Toplam puan"><span class="rozet-ikon"></span><b class="puan-sayi">0</b><small>puan</small></div></header>
    <main id="icerik" tabindex="-1"></main>
    <footer class="alt"><div class="imza"><span>Los Galacticos</span><i>·</i><span>Barış Köseoğlu</span></div><button class="metin-dugme" id="sifirla-btn">İlerlemeyi sıfırla</button></footer>`;
  $('#sifirla-btn').onclick = () => { if (confirm('Tüm puanların ve yıldızların silinecek. Emin misin?')) { depo.sifirla(); ustGuncelle(); yonlendir(); } };
}
function ustGuncelle() {
  const r = depo.rozet(), p = depo.al().puan;
  const el = $('.puan-sayi'); if (el) el.textContent = p;
  const ri = $('.rozet-ikon'); if (ri) ri.textContent = r.ikon;
  document.querySelectorAll('.gezinme a').forEach((a) => a.classList.toggle('secili', location.hash.startsWith('#/' + a.dataset.r)));
}
function geriDugme(hedef, metin) { return `<a class="geri" href="${hedef}">← ${metin}</a>`; }
function baglamAcik() { return AYAR.HEPSINI_AC || Object.keys(KONULAR).every((id) => depo.yildiz(id) >= 2); }

// =============================================================== ANA SAYFA
function anaSayfa(kap) {
  const v = depo.al(), r = depo.rozet(), siradaki = ROZETLER.find((x) => x.sinir > v.puan);
  const ad = depo.adAl(), tumKonu = Object.keys(KONULAR), hazir = tumKonu.filter((id) => depo.yildiz(id) >= 2).length;
  kap.innerHTML = `
  <section class="kahraman">
    <div class="k-metin">
      <div class="imza buyuk"><span>Los Galacticos</span><i>·</i><span>Barış Köseoğlu</span></div>
      <h1>${ad ? 'Merhaba, ' + kac(ad) + '!' : 'Nasse Biology’ye hoş geldin!'}</h1>
      <p>Sinir sisteminin gizemli dünyasını <b>3B modellerle</b> keşfet, oyunlarla öğren. 9, 10 ve 11. sınıf konuları bir arada!</p>
      ${ad ? '' : '<form class="ad-form"><input maxlength="24" placeholder="Adın ne?" aria-label="Adın"><button class="dugme">Kaydet</button></form>'}
      <div class="rozet-serit"><span class="rozet-buyuk">${r.ikon}</span><div><b>${r.ad}</b><small>${siradaki ? 'Sıradaki rozet için ' + (siradaki.sinir - v.puan) + ' puan' : 'En yüksek rozet!'}</small></div><div class="seri">🔥 <b>${v.seri}</b> gün</div></div>
      <div class="balon">💡 <span>${BILGILER[(Math.random() * BILGILER.length) | 0]}</span></div>
    </div>
    <div class="k-gorsel">${MASKOT}<div class="yuzen y1">🧬</div><div class="yuzen y2">🧠</div><div class="yuzen y3">⚡</div><div class="yuzen y4">🔬</div></div>
  </section>

  <h2 class="baslik">📚 Sınıf düzeyini seç</h2>
  <section class="sinif-izgara">${SINIFLAR.map((s) => {
    const y = konuYildizToplam(s.konular), m = s.konular.length * 3;
    return `<a class="sinif-kart" href="#/sinif/${s.id}" style="--r:${s.renk}"><div class="s-ikon">${s.ikon}</div><h3>${s.ad}</h3><p>${s.alt}</p>
      <div class="ilerleme"><i style="width:${(y / m) * 100}%"></i></div><small>★ ${y} / ${m} · ${s.konular.length} konu</small><span class="git">Başla →</span></a>`;
  }).join('')}</section>

  <h2 class="baslik">🏁 Son aşama</h2>
  <a class="son-asama ${baglamAcik() ? '' : 'kilitli'}" href="${baglamAcik() ? '#/baglam' : '#/baglam'}">
    <div class="sa-ikon">${baglamAcik() ? '🏁' : '🔒'}</div>
    <div><h3>Bağlam macerası: merkezî sinir sistemi</h3><p>Gerçek hayat hikâyeleriyle 9, 10 ve 11. sınıf konularını birleştir.</p>
    <small>${baglamAcik() ? 'Aşama açık, hazırsan başla!' : `Açmak için her konuda en az 2 yıldız topla (${hazir} / ${tumKonu.length} konu hazır).`}</small></div></a>

  <h2 class="baslik">🧊 3B Laboratuvar</h2>
  <section class="lab-izgara">${Object.entries(SAHNELER).map(([id, s]) => `<a class="lab-kart" href="#/lab/${id}"><span class="l-ikon">${s.ikon}</span><b>${s.ad}</b><small>${s.sinif}. sınıf</small></a>`).join('')}</section>`;
  const f = $('.ad-form', kap);
  if (f) f.onsubmit = (e) => { e.preventDefault(); const a = $('input', f).value; if (a.trim()) { depo.adYaz(a); anaSayfa(kap); } };
}

// =============================================================== SINIF
function sinifSayfa(kap, sid) {
  const s = SINIFLAR.find((x) => x.id === +sid);
  if (!s) { location.hash = '#/ana'; return; }
  kap.innerHTML = `${geriDugme('#/ana', 'Ana sayfa')}
  <section class="sinif-baslik" style="--r:${s.renk}"><span>${s.ikon}</span><div><h1>${s.ad}</h1><p>${s.alt}</p></div></section>
  <section class="konu-izgara">${s.konular.map((id) => {
    const k = KONULAR[id], y = depo.yildiz(id);
    return `<a class="konu-kart" href="#/konu/${id}" style="--r:${s.renk}"><div class="k-ikon">${k.ikon}</div><div class="k-ic"><h3>${k.ad}</h3><p>${k.ozet}</p>
      <div class="k-alt"><span class="yildizlar">${yildizHtml(y)}</span><span class="etiket">🧊 ${k.sahneler.length} 3B model</span></div></div></a>`;
  }).join('')}</section>`;
}

// =============================================================== KONU
const SEKMELER = [['3b', '🧊 3B'], ['ogren', '📖 Öğren'], ['yarisma', '🎯 Yarışma'], ['esles', '🔗 Eşleştir'], ['sirala', '🔢 Sırala'], ['sinifla', '🗂️ Sınıfla'], ['sim', '📈 Simülatör']];

function konuSayfa(kap, id, sekme) {
  const k = KONULAR[id];
  if (!k) { location.hash = '#/ana'; return; }
  const kullanilan = SEKMELER.filter(([a]) => a !== 'sim' || k.ozel === 'aksiyon');
  if (!sekme) sekme = '3b';
  const s = SINIFLAR.find((x) => x.id === k.sinif);
  kap.innerHTML = `${geriDugme('#/sinif/' + k.sinif, k.sinif + '. sınıf')}
  <section class="konu-baslik" style="--r:${s.renk}"><span class="b-ikon">${k.ikon}</span><div><h1>${k.ad}</h1><p>${k.ozet}</p></div><div class="yildizlar buyuk" id="konu-yildiz">${yildizHtml(depo.yildiz(id))}</div></section>
  <nav class="sekmeler">${kullanilan.map(([a, ad]) => `<a href="#/konu/${id}/${a}" class="${a === sekme ? 'secili' : ''}">${ad}</a>`).join('')}</nav>
  <section id="sekme" class="sekme-icerik"></section>`;
  const yer = $('#sekme', kap);
  const yildizYenile = () => { const el = $('#konu-yildiz'); if (el) el.innerHTML = yildizHtml(depo.yildiz(id)); ustGuncelle(); };
  const kk = depo.konu(id);

  if (sekme === '3b') {
    let aktif = k.sahneler[0], mount = null;
    const ciz = () => {
      mount && mount.yoket();
      yer.innerHTML = `${k.sahneler.length > 1 ? `<div class="sahne-sec">${k.sahneler.map((x) => `<button class="${x === aktif ? 'secili' : ''}" data-s="${x}">${SAHNELER[x].ikon} ${SAHNELER[x].ad}</button>`).join('')}</div>` : ''}<div id="sahne-yer"></div>`;
      mount = sahneKur($('#sahne-yer', yer), aktif, { onKesif: (ad) => { if (depo.kesifEkle(id, aktif + ':' + ad)) ustGuncelle(); } });
      const sec = $('.sahne-sec', yer); if (sec) sec.onclick = (e) => { const b = e.target.closest('button'); if (b) { aktif = b.dataset.s; ciz(); } };
    };
    ciz();
    temizlikler.push(() => mount && mount.yoket());
  } else if (sekme === 'ogren') {
    let i = 0; const gorulen = new Set([0]);
    const ciz = () => {
      const c = k.kartlar[i];
      yer.innerHTML = `<div class="ogren"><div class="o-kart pop"><div class="o-emoji">${c.e}</div><h2>${kac(c.b)}</h2><p>${kac(c.m)}</p></div>
        <div class="o-nav"><button class="dugme ikinci" ${i === 0 ? 'disabled' : ''} data-d="-1">← Önceki</button><span>${i + 1} / ${k.kartlar.length}</span><button class="dugme" data-d="1">${i === k.kartlar.length - 1 ? 'Bitir ✓' : 'Sonraki →'}</button></div>
        <div class="noktalar">${k.kartlar.map((_, n) => `<i class="${n === i ? 'a' : gorulen.has(n) ? 'g' : ''}"></i>`).join('')}</div></div>`;
    };
    yer.onclick = (e) => {
      const b = e.target.closest('[data-d]'); if (!b) return;
      const yeni = i + +b.dataset.d;
      if (yeni >= k.kartlar.length) { if (gorulen.size >= k.kartlar.length && !kk.kart) { depo.isaretle(id, 'kart'); depo.puanEkle(10); bildir('📖 Tüm kartları okudun: +10 puan ve 1 yıldız!'); konfeti(40); yildizYenile(); } else if (!kk.kart) bildir('Önce tüm kartları gez.'); location.hash = '#/konu/' + id + '/yarisma'; return; }
      i = Math.max(0, yeni); gorulen.add(i);
      if (gorulen.size >= k.kartlar.length && !kk.kart) { depo.isaretle(id, 'kart'); depo.puanEkle(10); bildir('📖 Tüm kartları okudun: +10 puan ve 1 yıldız!'); yildizYenile(); }
      ciz();
    };
    ciz();
    temizlikler.push(() => { yer.onclick = null; });
  } else if (sekme === 'yarisma') {
    temizlikler.push(yarisma(yer, k.quiz, (s2) => {
      const kayit = depo.konu(id), onceki = kayit.quizPuan || 0;
      if (s2.puan > onceki) { depo.puanEkle(s2.puan - onceki); depo.isaretle(id, 'quizPuan', s2.puan); bildir('🎯 +' + (s2.puan - onceki) + ' puan'); }
      if (s2.oran > kayit.quiz) depo.isaretle(id, 'quiz', s2.oran);
      yildizYenile();
    }));
  } else if (sekme === 'esles' || sekme === 'sirala' || sekme === 'sinifla') {
    const motor = { esles: () => eslestir(yer, k.esles, bit), sirala: () => sirala(yer, k.sirala, bit), sinifla: () => sinifla(yer, k.sinifla, bit) };
    function bit(sonuc) {
      const kayit = depo.konu(id);
      if (!kayit[sekme]) { depo.isaretle(id, sekme, true); depo.puanEkle(sonuc.puan); bildir('🎉 +' + sonuc.puan + ' puan'); } else bildir('Bu oyunu zaten tamamlamıştın.');
      if (kayit.esles && kayit.sirala && kayit.sinifla) bildir('⭐ Tüm mini oyunları bitirdin: 3. yıldız kazanıldı!');
      yildizYenile();
    }
    temizlikler.push(motor[sekme]());
  } else if (sekme === 'sim') {
    temizlikler.push(aksiyonSim(yer, () => { if (depo.kesifEkle(id, 'simulator')) ustGuncelle(); }));
  }
}

// =============================================================== 3B LABORATUVAR
function labSayfa(kap, id) {
  if (!id) {
    kap.innerHTML = `${geriDugme('#/ana', 'Ana sayfa')}<h1 class="baslik">🧊 3B Laboratuvar</h1><p class="altmetin">Parçaları döndür, yakınlaştır, dokun ve bilgi kartlarını oku. Telefonda iki parmakla yakınlaştırabilirsin.</p>
    <section class="lab-izgara buyuk">${Object.entries(SAHNELER).map(([k, s]) => `<a class="lab-kart" href="#/lab/${k}"><span class="l-ikon">${s.ikon}</span><b>${s.ad}</b><small>${s.ozet}</small><em>${s.sinif}. sınıf</em></a>`).join('')}</section>`;
    return;
  }
  if (!SAHNELER[id]) { location.hash = '#/lab'; return; }
  kap.innerHTML = `${geriDugme('#/lab', '3B Laboratuvar')}<div id="sahne-yer"></div>`;
  const m = sahneKur($('#sahne-yer', kap), id, { onKesif: (ad) => { if (depo.kesifEkle('lab', id + ':' + ad)) ustGuncelle(); } });
  temizlikler.push(() => m.yoket());
}

// =============================================================== BAĞLAM (SON AŞAMA)
function baglamSayfa(kap, no) {
  if (no === undefined) {
    const acik = baglamAcik();
    kap.innerHTML = `${geriDugme('#/ana', 'Ana sayfa')}<section class="baglam-baslik"><h1>🏁 Bağlam macerası</h1><p>Merkezî sinir sistemi etrafında, gerçek yaşam hikâyeleri. Her hikâyede 9, 10 ve 11. sınıf bilgilerini birlikte kullanacaksın.</p></section>
    ${acik ? '' : `<div class="kilit-uyari">🔒 Bu aşama henüz kilitli. Her konuda en az 2 yıldız topladığında açılır. <button class="metin-dugme" id="yine">Yine de bak</button></div>`}
    <section class="baglam-izgara ${acik ? '' : 'soluk'}">${BAGLAM.map((b, i) => {
      const d = depo.al().baglam[i];
      return `<a class="baglam-kart" href="#/baglam/${i}" style="--r:${b.renk}"><div class="b-ikon">${b.ikon}</div><h3>${b.ad}</h3><p>${b.hikaye.slice(0, 90)}…</p><small>${d ? '✅ ' + d.dogru + ' / ' + d.toplam + ' doğru' : b.adimlar.length + ' adım'}</small></a>`;
    }).join('')}</section>`;
    const y = $('#yine', kap); if (y) y.onclick = () => { AYAR.HEPSINI_AC = true; baglamSayfa(kap); };
    return;
  }
  const b = BAGLAM[+no]; if (!b) { location.hash = '#/baglam'; return; }
  let adim = 0, dogru = 0;
  kap.innerHTML = `${geriDugme('#/baglam', 'Bağlam macerası')}
  <section class="hikaye" style="--r:${b.renk}"><div class="h-ikon">${b.ikon}</div><div><h1>${b.ad}</h1><p>${b.hikaye}</p></div></section>
  <div class="baglam-ikili"><div id="sahne-yer" class="bag-sahne"></div><div id="adim-yer" class="bag-adim"></div></div>`;
  const m = sahneKur($('#sahne-yer', kap), BAGLAM_SAHNE[+no], { kucuk: true, onKesif: (ad) => { if (depo.kesifEkle('baglam', no + ':' + ad)) ustGuncelle(); } });
  temizlikler.push(() => m.yoket());
  const yer = $('#adim-yer', kap);
  let kilit = false, sec = [];
  function ciz() {
    const a = b.adimlar[adim];
    sec = a[1].map((m2, i) => ({ m: m2, d: i === a[2] })).sort(() => Math.random() - 0.5);
    kilit = false;
    yer.innerHTML = `<div class="oyun-ust"><span>Adım ${adim + 1} / ${b.adimlar.length}</span><span>✅ ${dogru}</span></div><div class="ilerleme"><i style="width:${(adim / b.adimlar.length) * 100}%"></i></div>
      <h3 class="soru">${kac(a[0])}</h3><div class="secenekler">${sec.map((o, i) => `<button class="secenek" data-k="${i}"><b>${'ABCD'[i]}</b><span>${kac(o.m)}</span></button>`).join('')}</div><div class="geri-bildirim"></div>`;
  }
  yer.onclick = (e) => {
    const bt = e.target.closest('.secenek');
    if (bt && !kilit) {
      kilit = true; const a = b.adimlar[adim], dz = sec[+bt.dataset.k].d;
      yer.querySelectorAll('.secenek').forEach((x, i) => { x.disabled = true; if (sec[i].d) x.classList.add('dogru'); });
      if (dz) dogru++; else bt.classList.add('yanlis');
      $('.geri-bildirim', yer).innerHTML = `<div class="gb ${dz ? 'iyi' : 'kotu'}"><b>${dz ? '🎉 Doğru!' : '🤔 Doğrusu yeşil işaretli.'}</b> ${kac(a[3])}</div><button class="dugme ileri">${adim === b.adimlar.length - 1 ? 'Hikâyeyi bitir' : 'Sonraki adım →'}</button>`;
      return;
    }
    if (e.target.closest('.ileri')) { adim++; if (adim < b.adimlar.length) ciz(); else bitir(); }
  };
  function bitir() {
    depo.baglamKaydet(+no, dogru, b.adimlar.length); ustGuncelle();
    const oran = dogru / b.adimlar.length;
    const sonraki = +no + 1 < BAGLAM.length;
    const hepsi = BAGLAM.every((_, i) => depo.al().baglam[i]);
    yer.innerHTML = `<div class="sonuc"><div class="buyuk-emoji">${oran >= 0.8 ? '🏆' : oran >= 0.5 ? '👏' : '💪'}</div><h3>${hepsi ? 'Tüm bağlam hikâyelerini tamamladın!' : 'Hikâye tamamlandı!'}</h3>
      <p><b>${dogru}</b> / ${b.adimlar.length} doğru</p>${hepsi ? '<p class="kucuk">🎓 Nasse Biology yolculuğunu bitirdin, tebrikler!</p>' : ''}
      <div class="sonuc-dugmeler"><button class="dugme ikinci" id="tekrar">🔄 Tekrar</button>${sonraki ? `<a class="dugme" href="#/baglam/${+no + 1}">Sonraki hikâye →</a>` : '<a class="dugme" href="#/ana">Ana sayfa</a>'}</div></div>`;
    if (oran >= 0.5) konfeti(hepsi ? 160 : 90);
    $('#tekrar', yer).onclick = () => { adim = 0; dogru = 0; ciz(); };
  }
  ciz();
  temizlikler.push(() => { yer.onclick = null; });
}

// =============================================================== YÖNLENDİRME
function yonlendir() {
  temizle();
  const [, rota, a, b] = location.hash.split('/');
  const kap = $('#icerik');
  kap.scrollTop = 0; window.scrollTo(0, 0);
  kap.className = 'sayfa';
  switch (rota) {
    case 'sinif': sinifSayfa(kap, a); break;
    case 'konu': konuSayfa(kap, a, b); break;
    case 'lab': labSayfa(kap, a); break;
    case 'baglam': baglamSayfa(kap, a); break;
    default: anaSayfa(kap);
  }
  ustGuncelle();
  kap.focus({ preventScroll: true });
}

depo.yukle();
ustYapi();
arka = arkaplanBaslat($('#arka'));
addEventListener('hashchange', yonlendir);
yonlendir();
