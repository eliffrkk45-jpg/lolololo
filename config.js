// ============================================================
//  NASSE BIOLOGY - AYAR DOSYASI
//  Bu sürümde giriş (üyelik) bölümü yoktur; site doğrudan açılır.
//  İlerleme (puan, yıldız) tarayıcıda, cihaza kaydedilir.
// ============================================================

export const AYAR = {
  // Sketchfab hazır modelleri (3B bölümünde "Hazır model" sekmesinde görünür).
  // Adresin sonundaki 32 haneli kod model kimliğidir.
  SKETCHFAB: {
    hucre: "d72bcef869ef44338bdc589afb79d79e", // Hayvan hücresi (renkli)
    noron: "be679731525c457cb01036fcf25afc37"  // Nöronun yapısı
  },

  // Beyin ve omurilik için dış bağlantılar (bu siteler yerleştirmeye izin vermez, yeni sekmede açılır).
  DIS_BAGLANTI: {
    beyin: { ad: "Neurotorium Beyin Atlası", url: "https://neurotorium.org/tool/brain-atlas/" },
    omurilik: { ad: "Innerbody Omurilik Kesiti", url: "https://www.innerbody.com/anatomy/skeletal/spine-vertebra-spinal-cord-cross-section" }
  },

  // true yaparsanız "Bağlam Macerası" kilitsiz açılır (deneme için).
  HEPSINI_AC: false
};
