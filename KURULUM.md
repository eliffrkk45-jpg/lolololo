# Nasse Biology: Kurulum Rehberi

Bu sürümde **giriş (üyelik) bölümü yoktur**. Site açılır açılmaz oynanır.
Puan ve yıldızlar o cihazın tarayıcısına kaydedilir.

## 1. Klasör yapısı

```
nasse-biology/
├─ index.html          sayfa iskeleti (3B motoru internetten yüklenir)
├─ .nojekyll           GitHub Pages için boş dosya
├─ KURULUM.md          bu dosya
├─ css/style.css       mavi-lacivert-yeşil tema, animasyonlar
└─ js/
   ├─ app.js           ekranlar, yönlendirme, 3B bileşeni, bağlam aşaması
   ├─ config.js        Sketchfab model kodları, dış bağlantılar, kilit ayarı
   ├─ konular.js       9/10/11. sınıf konuları, kartlar, sorular, oyunlar, bağlam hikâyeleri
   ├─ bilgi.js         3B parçalara dokununca çıkan Türkçe bilgi kartları
   ├─ viewer3d.js      3B görüntüleyici (döndür, yakınlaştır, dokun)
   ├─ m3d.js           3B yardımcıları
   ├─ models1.js       hücre, nöron, refleks yayı, beyin, omurilik
   ├─ models2.js       nörotransmitter, zar potansiyeli, sinaps, mitokondri, ATP, reseptör, glia
   ├─ oyunlar.js       yarışma, eşleştirme, sıralama, sınıflama, aksiyon potansiyeli simülatörü
   ├─ sketchfab.js     Sketchfab hazır model gömme
   ├─ arkaplan.js      arka plandaki dönen 3B nöron ağı
   └─ depo.js          puan ve yıldız kaydı
```

## 2. Bilgisayarda çalıştırma (VS Code)

Site "ES modül" kullandığı için `index.html` dosyasına çift tıklayarak açamazsın.
Küçük bir yerel sunucu gerekir:

1. VS Code'u aç: **Dosya → Klasör Aç →** `nasse-biology`
2. Sol taraftaki **Eklentiler** bölümünden **Live Server** (yazar: Ritwick Dey) eklentisini kur.
3. `index.html` dosyasına sağ tıkla → **Open with Live Server**.
4. Tarayıcıda `http://127.0.0.1:5500` açılır. Kaydettikçe sayfa kendiliğinden yenilenir.

İnternet bağlantısı şarttır: 3B motoru (Three.js), yazı tipleri ve Sketchfab modelleri internetten gelir.

### Telefonda deneme
Bilgisayar ve telefon **aynı Wi-Fi'de** olsun. Bilgisayarın yerel IP adresini öğren
(Windows: `ipconfig`, Mac/Linux: `ifconfig`). Telefonda `http://BILGISAYAR_IP:5500` adresini aç.
Güvenlik duvarı sorarsa izin ver.

## 3. GitHub'da yayımlama (GitHub Pages)

1. github.com'da **New repository** ile yeni depo oluştur (örn. `nasse-biology`), **Public** seç.
2. VS Code'da **Terminal → Yeni Terminal** aç ve sırayla çalıştır:

```bash
git init
git add .
git commit -m "Nasse Biology ilk sürüm"
git branch -M main
git remote add origin https://github.com/KULLANICI_ADIN/nasse-biology.git
git push -u origin main
```

3. GitHub'da depoya gir: **Settings → Pages → Build and deployment**
   - Source: **Deploy from a branch**
   - Branch: **main**, klasör: **/ (root)** → **Save**
4. 1–2 dakika sonra adres hazır olur: `https://KULLANICI_ADIN.github.io/nasse-biology/`

Güncelleme yapınca: `git add .` → `git commit -m "güncelleme"` → `git push`.

## 4. Sketchfab modelleri (hazır, ayrıntılı 3B)

3B ekranlarında üstte **Kendi 3B modelimiz / Hazır model** sekmeleri bulunur.
Şu an iki model bağlıdır (`js/config.js`):

| Konu | Model | Kod |
|---|---|---|
| Hayvan hücresi | Hayvan hücresi (renkli) | `d72bcef869ef44338bdc589afb79d79e` |
| Nöronun yapısı | Structure of neuron | `be679731525c457cb01036fcf25afc37` |

Başka model kullanmak için Sketchfab model adresinin sonundaki 32 haneli kodu `config.js` içine yaz.
Örnek: `.../hayvan-hucresi-renkli-d72bcef8...` → kod, tire işaretinden sonraki son kısımdır.

Dikkat edilecekler:
- Modelin sahibi **gömmeye (embed) izin vermiyorsa** model görünmez. Bu durumda sitedeki "Kendi 3B modelimiz" sekmesi çalışmaya devam eder.
- Sketchfab modelleri sanatçılarına aittir. Sitede model sayfasına bağlantı verilmiştir; lisansı (genelde CC BY) ve atıf koşulunu model sayfasından kontrol et.
- Hazır modelde parçaya dokununca Türkçe kart, parçanın **adı** bilgi.js'deki anahtar sözcüklerle eşleşirse çıkar. Eşleşmezse "kartı yok" uyarısı verilir; altındaki parça listesinden kartı yine açabilirsin.
- Beyin ve omurilik için verdiğin Neurotorium ve Innerbody sayfaları kendi içine gömülmeye izin vermez; sitede **yeni sekmede açılan bağlantı** olarak yer alır. Bu iki konuda etkileşimli ve Türkçe kartlı modeli sitenin kendi 3B modelleri sağlar.

Kendi `.glb` modelini kullanmak istersen dosyayı `models/` klasörüne koy ve `js/bilgi.js` sonundaki `OZEL_MODELLER` bölümündeki örneği aç.

## 5. Sınıf ve konu düzeni

| Düzey | Konular |
|---|---|
| 9. sınıf | Hücre yapısı ve zar · Canlılarda yapı-görev ilişkisi (beyin, omurilik) |
| 10. sınıf | ATP ve hücresel enerji · Hücresel solunum |
| 11. sınıf | Reseptör çeşitleri · Nöronun yapısı · Nörotransmitter maddeler · Zar potansiyeli · İmpuls iletimi · Nörona yardımcı elemanlar |
| Son aşama | Bağlam macerası: 4 hikâye, 9-10-11. sınıf bilgileri bir arada |

9/10. sınıf konularının hangi sınıfa konacağı `js/konular.js` dosyasındaki `SINIFLAR` bölümünde belirlenir.
Bir konuyu başka sınıfa taşımak için konu kodunu (`t10a` gibi) ilgili sınıfın `konular` listesine yaz ve konunun `sinif` değerini değiştir.

**Yıldız kuralı (her konuda en çok 3):**
1. Tüm bilgi kartlarını oku
2. Yarışmada en az %60 doğru
3. Eşleştirme, sıralama ve sınıflama oyunlarını bitir

**Bağlam aşaması kilidi:** Her konuda en az 2 yıldız toplayınca açılır.
Denemek için `js/config.js` içinde `HEPSINI_AC: true` yap.

## 6. Sık karşılaşılan sorunlar

- **Sayfa boş / hata var:** Tarayıcıda `F12` → **Console** sekmesine bak ve kırmızı hatayı not al.
- **Çift tıklayınca açılmıyor:** Normaldir, Live Server veya GitHub Pages kullan (bölüm 2 ve 3).
- **3B görünmüyor:** Tarayıcıda donanım hızlandırma/WebGL kapalı olabilir. Güncel Chrome, Edge, Safari veya Firefox dene.
- **GitHub Pages güncellenmedi:** 2–3 dakika bekle, sayfayı `Ctrl + F5` ile yenile.
- **Puanları sıfırlamak:** Sayfanın altındaki "İlerlemeyi sıfırla" bağlantısı.
