// Sketchfab hazır modelini sayfaya gömer ve dokunulan parçaya göre Türkçe bilgi kartı gösterir.
import { SKETCHFAB, BILGI } from './bilgi.js';

let yuklu = null;
function betikYukle() {
  if (window.Sketchfab) return Promise.resolve();
  if (yuklu) return yuklu;
  yuklu = new Promise((tamam, hata) => {
    const s = document.createElement('script');
    s.src = 'https://static.sketchfab.com/api/sketchfab-viewer-1.12.1.js';
    s.onload = tamam; s.onerror = () => hata(new Error('Sketchfab yüklenemedi'));
    document.head.appendChild(s);
  });
  return yuklu;
}

// kap: iframe'in yerleşeceği kutu; durum(metin): yükleniyor/hata mesajı; kart(bilgi): bilgi kartını göster
export async function sketchfabAc(kap, anahtar, { durum, kart }) {
  const cfg = SKETCHFAB[anahtar];
  if (!cfg) return null;
  kap.innerHTML = '';
  durum('Hazır model yükleniyor…');
  try { await betikYukle(); } catch (e) { durum('Hazır model yüklenemedi. İnternet bağlantını kontrol et veya kendi 3B modelimizi kullan.'); return null; }
  const iframe = document.createElement('iframe');
  iframe.title = 'Sketchfab 3B modeli';
  iframe.allow = 'autoplay; fullscreen; xr-spatial-tracking';
  iframe.setAttribute('allowfullscreen', ''); iframe.setAttribute('mozallowfullscreen', 'true'); iframe.setAttribute('webkitallowfullscreen', 'true');
  kap.appendChild(iframe);
  const istemci = new window.Sketchfab('1.12.1', iframe);
  let dugumler = {};
  const kartlar = BILGI[cfg.bilgi] || {};

  const eslesme = (adlar) => {
    const metin = adlar.filter(Boolean).join(' | ');
    for (const [re, anah] of cfg.esle) if (re.test(metin) && kartlar[anah]) return kartlar[anah];
    return null;
  };

  istemci.init(cfg.uid, {
    autostart: 1, preload: 1, ui_infos: 0, ui_stop: 0, ui_hint: 1, ui_theme: 'dark', dnt: 1,
    success(api) {
      api.start();
      api.addEventListener('viewerready', () => {
        durum('');
        api.getNodeMap((hata, harita) => { if (!hata) dugumler = harita || {}; });
        api.addEventListener('click', (bilgi) => {
          if (!bilgi) return;
          const adlar = [];
          let d = dugumler[bilgi.instanceID], sinir = 6;
          while (d && sinir-- > 0) { adlar.push(d.name); d = d.parentInstanceID ? dugumler[d.parentInstanceID] : null; }
          if (bilgi.material && bilgi.material.name) adlar.push(bilgi.material.name);
          const k = eslesme(adlar);
          if (k) kart(k);
          else kart({ baslik: 'Bu parçanın kartı yok', metin: 'Dokunduğun parça için hazır bir Türkçe kart bulamadım' + (adlar[0] ? ' (' + adlar[0] + ')' : '') + '. Aşağıdaki parça listesinden istediğin kartı seçebilirsin.', ipucu: '' });
        }, { pick: 'fast' });
      });
    },
    error() { durum('Bu model şu an gösterilemiyor. Kendi 3B modelimizi kullanabilirsin.'); }
  });
  return { yoket() { kap.innerHTML = ''; } };
}
