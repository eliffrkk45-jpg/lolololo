// İlerleme kaydı: tarayıcıda (localStorage) saklanır, giriş gerekmez.
import { ROZETLER } from './konular.js';

const ANAHTAR = 'nasse_ilerleme_v1';
let veri = null;

const bos = () => ({ puan: 0, konu: {}, baglam: {}, seri: 0, sonGun: '' });
const bugun = () => new Date().toLocaleDateString('sv-SE');

export function yukle() {
  try { veri = JSON.parse(localStorage.getItem(ANAHTAR)) || bos(); } catch (e) { veri = bos(); }
  veri.konu = veri.konu || {}; veri.baglam = veri.baglam || {};
  const b = bugun();
  if (veri.sonGun !== b) {
    const dun = new Date(Date.now() - 864e5).toLocaleDateString('sv-SE');
    veri.seri = veri.sonGun === dun ? (veri.seri || 0) + 1 : 1;
    veri.sonGun = b;
  }
  kaydet();
}
export function kaydet() { try { localStorage.setItem(ANAHTAR, JSON.stringify(veri)); } catch (e) { /* özel pencere */ } }
export const al = () => veri;
export const adAl = () => veri.ad || '';
export function adYaz(a) { veri.ad = String(a).trim().slice(0, 24); kaydet(); }
export function isaretle(id, alan, deger = true) {
  const k = konu(id);
  if (alan === 'quiz' || alan === 'quizPuan') k[alan] = Math.max(k[alan] || 0, deger); else k[alan] = deger;
  kaydet();
}
// Bağlam hikâyesi: en iyi sonuç saklanır, yalnızca artış kadar puan verilir (doğru başına 10)
export function baglamKaydet(no, dogru, toplam) {
  const eski = veri.baglam[no];
  const onceki = eski ? eski.dogru : 0;
  if (!eski || dogru > eski.dogru) veri.baglam[no] = { dogru, toplam };
  if (dogru > onceki) puanEkle((dogru - onceki) * 10);
  kaydet();
}
export function konu(id) {
  if (!veri.konu[id]) veri.konu[id] = { kart: false, quiz: 0, quizPuan: 0, esles: false, sirala: false, sinifla: false, kesif: [] };
  return veri.konu[id];
}
export function yildiz(id) {
  const k = veri.konu[id]; if (!k) return 0;
  return (k.kart ? 1 : 0) + (k.quiz >= 0.6 ? 1 : 0) + (k.esles && k.sirala && k.sinifla ? 1 : 0);
}
export function puanEkle(n) { if (n > 0) { veri.puan += n; kaydet(); } }
export function rozet() {
  let r = ROZETLER[0];
  ROZETLER.forEach((x) => { if (veri.puan >= x.sinir) r = x; });
  return r;
}
export function kesifEkle(id, ad) {
  const k = konu(id);
  if (k.kesif.includes(ad)) return false;
  k.kesif.push(ad); kaydet(); return true;
}
export function sifirla() { veri = bos(); veri.sonGun = bugun(); veri.seri = 1; kaydet(); }
