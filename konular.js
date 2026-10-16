// Konular, sorular ve bağlam senaryoları (hepsi Türkçe)
// quiz: [soru, [seçenekler], doğruSeçenekNo, açıklama]
// esles: [[terim, karşılık], ...]
// sirala: { baslik, adimlar: [doğru sırayla] }
// sinifla: { baslik, kat: [kategoriler], oge: [[metin, kategoriNo], ...] }

export const SINIFLAR = [
  { id: 9,  ad: '9. Sınıf',  alt: 'Hücre ve yapı-görev ilişkisi', renk: '#2ee59d', ikon: '🌱', konular: ['t9a', 't9b'] },
  { id: 10, ad: '10. Sınıf', alt: 'ATP ve hücresel solunum',      renk: '#19c3d6', ikon: '⚡', konular: ['t10a', 't10b'] },
  { id: 11, ad: '11. Sınıf', alt: 'Sinir sistemi',                renk: '#3aa0ff', ikon: '🧠', konular: ['t11a', 't11b', 't11c', 't11d', 't11e', 't11f'] }
];

export const KONULAR = {
  // ============================================================ 9. SINIF
  t9a: {
    ad: 'Hücre yapısı ve zar', ikon: '🧫', sinif: 9, sahneler: ['hucre'],
    ozet: 'Nöronun yapısını ve zarındaki değişimleri anlamak için hücreyi tanı.',
    kartlar: [
      { e: '🔬', b: 'Hücre: yapı ve görev birimi', m: 'Tüm canlılar hücrelerden oluşur. Nöron da sinir sisteminde uyarı iletmek için özelleşmiş bir hücredir. Hayvan hücresi; zar, sitoplazma, çekirdek ve organellerden oluşur.' },
      { e: '🧱', b: 'Hücre zarı: seçici geçirgen', m: 'Fosfolipit çift tabaka ve proteinlerden oluşur (akıcı mozaik model). Madde geçişi ikiye ayrılır: enerji harcamayan pasif taşıma (difüzyon, osmoz, kolaylaştırılmış difüzyon) ve ATP harcayan aktif taşıma (Na-K pompası, endositoz, ekzositoz).' },
      { e: '⚡', b: 'Nöron zarındaki değişimler', m: 'Nöron zarında iyon kanalları ve Na-K pompası vardır. Zarın iki yanındaki iyon dağılımı değiştikçe elektriksel yük farkı değişir. İmpuls, işte bu zar değişiminin akson boyunca ilerlemesidir.' },
      { e: '🏭', b: 'Organeller ve görevleri', m: 'Çekirdek: yönetim. Ribozom: protein sentezi. Endoplazmik retikulum: taşıma ve sentez. Golgi: paketleme ve salgılama. Mitokondri: ATP üretimi. Lizozom: sindirim.' },
      { e: '🧠', b: 'Nöronda organeller', m: 'Nöronda çok sayıda mitokondri vardır (yüksek enerji). Granüllü ER ve ribozomlar protein üretir (Nissl cisimcikleri). Golgi, nörotransmitterleri keseciklere paketler; kesecikler ekzositozla boşalır.' }
    ],
    quiz: [
      ['Hücre zarının temel yapısı aşağıdakilerden hangisidir?', ['Tek kat protein', 'Fosfolipit çift tabaka ve proteinler', 'Selüloz ağı', 'Çift kat karbonhidrat'], 1, 'Zar, fosfolipit çift tabaka ve içine gömülü proteinlerden oluşur.'],
      ['Enerji harcamadan, çok derişimli ortamdan az derişimli ortama madde geçişi nedir?', ['Aktif taşıma', 'Difüzyon', 'Ekzositoz', 'Endositoz'], 1, 'Difüzyon pasif bir taşımadır ve ATP gerektirmez.'],
      ['Nöron zarındaki Na-K pompası hangi taşıma türüdür?', ['Basit difüzyon', 'Osmoz', 'Aktif taşıma', 'Kolaylaştırılmış difüzyon'], 2, 'Pompa, ATP harcayarak iyonları derişim farkına karşı taşır.'],
      ['Nörotransmitterlerin sinaptik keseciklere paketlenmesinde hangi organel görev alır?', ['Lizozom', 'Golgi aygıtı', 'Çekirdekçik', 'Sentriyol'], 1, 'Golgi, maddeleri paketleyip salgı kesecikleri hâline getirir.'],
      ['Hücrenin enerji santrali olarak bilinen organel hangisidir?', ['Ribozom', 'Mitokondri', 'Golgi', 'Lizozom'], 1, 'ATP üretimi mitokondride yapılır.'],
      ['Nörotransmitterlerin sinaptik aralığa salınması hangi yolla olur?', ['Difüzyon', 'Osmoz', 'Ekzositoz', 'Endositoz'], 2, 'Kesecik zarı hücre zarıyla birleşerek içeriğini dışarı boşaltır (ekzositoz).'],
      ['Aşağıdakilerden hangisi hayvan hücresinde bulunmaz?', ['Sentriyol', 'Mitokondri', 'Selüloz hücre çeperi', 'Lizozom'], 2, 'Selülozdan yapılı hücre çeperi bitki hücresine özgüdür.']
    ],
    esles: [['Mitokondri', 'ATP üretimi'], ['Ribozom', 'Protein sentezi'], ['Golgi', 'Paketleme ve salgılama'], ['Lizozom', 'Hücre içi sindirim'], ['Çekirdek', 'Kalıtım materyali (DNA)'], ['Hücre zarı', 'Seçici geçirgenlik']],
    sirala: { baslik: 'Bir proteinin hücre dışına salgılanma yolunu sırala', adimlar: ['Ribozomda protein sentezlenir', 'Granüllü ER’de katlanır ve taşınır', 'Golgi’de son hâlini alır ve paketlenir', 'Salgı kesecikleri zara doğru ilerler', 'Ekzositozla hücre dışına verilir'] },
    sinifla: { baslik: 'Hangi taşıma enerji ister?', kat: ['ATP harcamaz', 'ATP harcar'], oge: [['Difüzyon', 0], ['Osmoz', 0], ['Kolaylaştırılmış difüzyon', 0], ['Na-K pompası', 1], ['Ekzositoz', 1], ['Endositoz', 1], ['Oksijenin hücreye girişi', 0], ['Glikozun taşıyıcıyla girişi', 0]] }
  },

  t9b: {
    ad: 'Canlılarda yapı-görev ilişkisi', ikon: '🧠', sinif: 9, sahneler: ['beyin', 'omurilik'],
    ozet: 'Beyin, omurilik ve nöronların görevlerini yapılarıyla ilişkilendir.',
    kartlar: [
      { e: '🧩', b: 'Yapı görevine uygundur', m: 'Canlılarda bir yapının biçimi, yaptığı işe uygundur. Nörondaki uzun akson uzak mesafeye uyarı taşır, çok dallı dendrit ise çok sayıda uyarı alabilmek için yüzeyi genişletir.' },
      { e: '🧠', b: 'Beyin', m: 'Büyük beyin (ön, tepe, şakak ve art lob), beyincik ve beyin sapından oluşur. Büyük beyin yüzeyindeki kıvrımlar yüzey alanını artırır, daha fazla nöron barındırmayı sağlar. Beyincik dengeyi, omurilik soğanı kalp atışı ve solunumu denetler.' },
      { e: '🦴', b: 'Omurilik', m: 'Omurga içinde korunan omurilikte içte gri, dışta beyaz cevher bulunur. Beyin ile vücut arasında bilgi taşır ve refleks merkezidir.' },
      { e: '🛡️', b: 'Koruma sistemi', m: 'Beyni kafatası, omuriliği omurga korur. Bunların içinde üç katlı zar (meninks) ve beyin-omurilik sıvısı darbe emici olarak görev yapar.' },
      { e: '🔗', b: 'Nöronlar iş birliği yapar', m: 'Duyu nöronu bilgiyi merkeze getirir, ara nöron yorumlar, motor nöron emri kasa iletir. Bu zincire refleks yayı denir.' }
    ],
    quiz: [
      ['Dengeyi ve kas koordinasyonunu sağlayan beyin bölümü hangisidir?', ['Beyincik', 'Talamus', 'Ön lob', 'Pons'], 0, 'Beyincik, hareketlerin düzgün ve dengeli olmasını sağlar.'],
      ['Kalp atışı ve solunumu denetleyen merkez neresidir?', ['Beyincik', 'Omurilik soğanı', 'Oksipital lob', 'Ön lob'], 1, 'Omurilik soğanı yaşamsal otomatik işlevlerin merkezidir.'],
      ['Görme merkezi hangi lobda bulunur?', ['Ön lob', 'Tepe lobu', 'Şakak lobu', 'Art (oksipital) lob'], 3, 'Görüntüler art lobda yorumlanır.'],
      ['Refleksler neden çok hızlıdır?', ['Beyin hızlı çalıştığı için', 'Omurilikte duyu ve motor yol ara nöronla bağlanır, beyne gitmeye gerek kalmaz', 'Sinirler kasların içinde olduğu için', 'Hormonlar devreye girdiği için'], 1, 'Yol kısadır: reseptör → duyu nöronu → omurilik → motor nöron → kas.'],
      ['Büyük beyin yüzeyindeki kıvrımların yapı-görev açısından anlamı nedir?', ['Kafatasına sığması için küçülmesi ve kan akışı', 'Yüzey alanını artırarak çok sayıda nöron barındırmak', 'Ağırlığı azaltmak', 'Isıyı yaymak'], 1, 'Kıvrımlar yüzeyi artırır, daha fazla nöron yerleşir.'],
      ['Omurilikte gri cevher nerede ve neyi içerir?', ['Dışta, miyelinli aksonları', 'İçte, hücre gövdeleri ve ara nöronları', 'Dışta, sadece glia hücrelerini', 'Beyinde, sadece dendritleri'], 1, 'İçteki kelebek şekilli bölge gri cevherdir.'],
      ['Beyin ve omuriliği koruyan yapılar hangisinde doğru verilmiştir?', ['Kemik, zarlar ve beyin-omurilik sıvısı', 'Sadece kas', 'Sadece yağ dokusu', 'Deri ve tüy'], 0, 'Kafatası/omurga, meninksler ve BOS birlikte korur.']
    ],
    esles: [['Beyincik', 'Denge ve koordinasyon'], ['Omurilik soğanı', 'Kalp atışı ve solunum'], ['Ön lob', 'Planlama ve istemli hareket'], ['Art lob', 'Görme'], ['Şakak lobu', 'İşitme ve bellek'], ['Tepe lobu', 'Dokunma ve ağrı duyusu']],
    sirala: { baslik: 'Refleks yayını sırala', adimlar: ['Reseptör uyarılır', 'Duyu nöronu impulsu omuriliğe taşır', 'Omurilikte ara nöron bilgiyi bağlar', 'Motor nöron emri taşır', 'Efektör (kas) tepki verir'] },
    sinifla: { baslik: 'MSS mi, ÇSS mi?', kat: ['Merkezî sinir sistemi', 'Çevresel sinir sistemi'], oge: [['Beyin', 0], ['Omurilik', 0], ['Beyincik', 0], ['Omurilik soğanı', 0], ['Omurilik sinirleri', 1], ['Kafa sinirleri', 1], ['Gangliyon (sinir düğümü)', 1], ['Pons', 0]] }
  },

  // ============================================================ 10. SINIF
  t10a: {
    ad: 'ATP ve hücresel enerji', ikon: '🔋', sinif: 10, sahneler: ['atp'],
    ozet: 'Nöronların enerji gerektiren faaliyetlerini anla.',
    kartlar: [
      { e: '🔋', b: 'ATP nedir?', m: 'Adenozin trifosfat; bir adenin, bir riboz ve üç fosfattan oluşur. Hücrenin enerji para birimidir: enerji her hücrede ATP aracılığıyla kullanılır.' },
      { e: '💥', b: 'Enerji nasıl açığa çıkar?', m: 'Son fosfat bağı hidrolizle kırılınca ATP → ADP + Pi tepkimesiyle yaklaşık 30,5 kJ/mol enerji açığa çıkar. ADP + Pi → ATP ise enerji isteyen bir sentez tepkimesidir (fosforilasyon).' },
      { e: '⚙️', b: 'Nöron ATP’yi nerede harcar?', m: 'En büyük harcama Na-K pompasıdır. Ayrıca nörotransmitter sentezi, keseciklerin taşınması ve Ca²⁺ pompaları da ATP kullanır. Beyin, vücudun enerjisinin yaklaşık beşte birini harcar.' },
      { e: '♻️', b: 'ATP sürekli yenilenir', m: 'Hücrede ATP stoku çok azdır; bu yüzden ATP sürekli üretilip tüketilir. Nöronlar için bu, kesintisiz glikoz ve oksijen demektir.' }
    ],
    quiz: [
      ['ATP hangi bileşenlerden oluşur?', ['Adenin, riboz ve üç fosfat', 'Guanin, deoksiriboz ve iki fosfat', 'Urasil ve glikoz', 'Amino asit ve yağ asidi'], 0, 'ATP = adenin + riboz + 3 fosfat.'],
      ['ATP’deki enerji hangi bağdan açığa çıkar?', ['Adenin-riboz bağı', 'Fosfatlar arasındaki yüksek enerjili bağ', 'Riboz içindeki karbon bağı', 'Hidrojen bağı'], 1, 'Fosfat grupları arasındaki bağ yüksek enerjilidir.'],
      ['Nöronda ATP en çok hangi iş için kullanılır?', ['Na-K pompasının çalışması', 'Suyun difüzyonu', 'Oksijenin girişi', 'Işığın algılanması'], 0, 'Dinlenme potansiyelini korumak için pompa sürekli ATP harcar.'],
      ['ADP + Pi → ATP tepkimesi için ne söylenebilir?', ['Enerji açığa çıkarır', 'Enerji gerektirir', 'Enerji ile ilgisi yoktur', 'Sadece mitokondride olur ve enerji gerekmez'], 1, 'ATP sentezi enerji isteyen bir tepkimedir.'],
      ['Aşağıdakilerden hangisi ATP harcanan bir olaydır?', ['Difüzyon', 'Osmoz', 'Aktif taşıma', 'Kolaylaştırılmış difüzyon'], 2, 'Aktif taşıma ATP harcar.'],
      ['Beyin neden sürekli oksijen ve glikoza ihtiyaç duyar?', ['Isı kaybını önlemek için', 'ATP stoku azdır, nöronlar sürekli ATP üretmek zorundadır', 'Kemikleri beslemek için', 'Su dengesi için'], 1, 'Yüksek ATP harcaması ve düşük stok nedeniyle.']
    ],
    esles: [['ATP', 'Hücrenin enerji molekülü'], ['ADP', 'İki fosfatlı molekül'], ['Pi', 'Serbest inorganik fosfat'], ['Fosfat bağı', 'Enerji depolayan bağ'], ['Na-K pompası', 'ATP harcayan taşıyıcı'], ['Fosforilasyon', 'ADP’ye fosfat eklenmesi']],
    sirala: { baslik: 'ATP döngüsünü sırala', adimlar: ['Besinlerin yıkımıyla enerji açığa çıkar', 'Bu enerji ile ADP’ye Pi bağlanır', 'ATP oluşur', 'ATP’nin son fosfat bağı hidrolizle kırılır', 'Açığa çıkan enerji iş için kullanılır (pompa, kasılma)'] },
    sinifla: { baslik: 'ATP üretir mi, harcar mı?', kat: ['ATP üretir', 'ATP harcar'], oge: [['Glikoliz', 0], ['Krebs döngüsü', 0], ['Elektron taşıma sistemi', 0], ['Na-K pompası', 1], ['Kas kasılması', 1], ['Kesecik taşınması', 1], ['Aktif taşıma', 1], ['Fermantasyon', 0]] }
  },

  t10b: {
    ad: 'Hücresel solunum', ikon: '⚡', sinif: 10, sahneler: ['mitokondri'],
    ozet: 'Sinir hücrelerinin enerji ihtiyacını nasıl karşıladığını kavra.',
    kartlar: [
      { e: '🍽️', b: 'Hücresel solunum nedir?', m: 'Organik besinlerin (özellikle glikozun) oksijenle yıkılarak ATP elde edilmesidir. Özet denklem: glikoz + O₂ → CO₂ + H₂O + enerji (ATP ve ısı).' },
      { e: '🧪', b: 'Glikoliz', m: 'Sitoplazmada gerçekleşir, oksijen gerektirmez. Bir glikoz 2 pirüvata parçalanır; net 2 ATP ve 2 NADH oluşur.' },
      { e: '🔄', b: 'Krebs döngüsü', m: 'Mitokondri matriksinde gerçekleşir. Asetil-KoA yıkılırken CO₂ çıkar, NADH ve FADH₂ üretilir, az miktarda ATP oluşur.' },
      { e: '🔋', b: 'Elektron taşıma sistemi (ETS)', m: 'Mitokondri iç zarında (krista) gerçekleşir. NADH ve FADH₂ elektronlarını verir; oksijen son elektron alıcısıdır ve su oluşur. ATP sentaz sayesinde ATP’nin büyük kısmı burada üretilir.' },
      { e: '🧠', b: 'Nöron bağlamı', m: 'Nöronlar glikojen depolayamaz, enerjileri kandaki glikoz ve oksijene bağlıdır. Oksijen yetersiz kalırsa (örneğin inme) ATP azalır, Na-K pompası durur, zar potansiyeli bozulur ve nöronlar hızla zarar görür.' },
      { e: '🥛', b: 'Oksijensiz durum: fermantasyon', m: 'Oksijen yoksa hücre yalnızca glikolizle 2 ATP elde eder; pirüvat laktik asit veya etil alkole dönüşür. Kasta yorgunluk hissi laktik asit birikimiyle ilişkilidir.' }
    ],
    quiz: [
      ['Glikoliz hücrenin hangi bölümünde gerçekleşir?', ['Mitokondri matriksi', 'Sitoplazma', 'Çekirdek', 'Golgi'], 1, 'Glikoliz sitoplazmada olur ve oksijen gerektirmez.'],
      ['Elektron taşıma sistemi nerede yer alır?', ['Sitoplazmada', 'Mitokondri iç zarında (krista)', 'Mitokondri matriksinde', 'Çekirdek zarında'], 1, 'ETS ve ATP sentaz iç zardadır.'],
      ['Solunumda oksijenin görevi nedir?', ['Glikozu parçalamak', 'Son elektron alıcısı olmak', 'CO₂ üretmek', 'ATP’yi parçalamak'], 1, 'Oksijen elektronları alıp hidrojenle birleşerek suyu oluşturur.'],
      ['Hangi evrede en fazla ATP üretilir?', ['Glikoliz', 'Krebs döngüsü', 'Elektron taşıma sistemi', 'Fermantasyon'], 2, 'ATP’nin büyük kısmı ETS’de üretilir.'],
      ['Oksijensiz kalan beyin hücreleri neden hızla zarar görür?', ['Su kaybettikleri için', 'ATP yetersiz kalır, Na-K pompası çalışamaz', 'Daha çok bölündükleri için', 'Isı arttığı için'], 1, 'Pompa durunca iyon dengesi ve zar potansiyeli bozulur.'],
      ['Krebs döngüsü nerede gerçekleşir?', ['Sitoplazma', 'Mitokondri matriksi', 'Golgi', 'Lizozom'], 1, 'Matriks, Krebs enzimlerinin bulunduğu yerdir.'],
      ['Aşağıdakilerden hangisi hücresel solunumun ürünlerinden biri değildir?', ['CO₂', 'H₂O', 'ATP', 'Glikoz'], 3, 'Glikoz solunumun girdisidir.']
    ],
    esles: [['Glikoliz', 'Sitoplazma'], ['Krebs döngüsü', 'Mitokondri matriksi'], ['ETS', 'Mitokondri iç zarı (krista)'], ['O₂', 'Son elektron alıcısı'], ['Fermantasyon', 'Oksijensiz, az ATP'], ['NADH', 'Elektron taşıyıcısı']],
    sirala: { baslik: 'Hücresel solunum basamaklarını sırala', adimlar: ['Glikoz sitoplazmada pirüvata parçalanır (glikoliz)', 'Pirüvat mitokondriye girer ve asetil-KoA olur', 'Krebs döngüsünde CO₂ çıkar, NADH ve FADH₂ oluşur', 'Elektronlar ETS’ye aktarılır', 'Oksijen elektronları alır ve su oluşur', 'ATP sentaz çok miktarda ATP üretir'] },
    sinifla: { baslik: 'Nerede gerçekleşir?', kat: ['Sitoplazma', 'Mitokondri'], oge: [['Glikoliz', 0], ['Fermantasyon', 0], ['Krebs döngüsü', 1], ['Elektron taşıma sistemi', 1], ['ATP sentaz', 1], ['Pirüvattan asetil-KoA oluşumu', 1]] }
  },

  // ============================================================ 11. SINIF
  t11a: {
    ad: 'Reseptör çeşitleri', ikon: '👂', sinif: 11, sahneler: ['reseptor'],
    ozet: 'Kemo-, mekano-, termo-, ağrı ve fotoreseptörleri tanı.',
    kartlar: [
      { e: '📡', b: 'Reseptör nedir?', m: 'Uyaranı algılayıp sinirsel impulsa dönüştüren hücre veya yapılardır. Her reseptör belirli bir uyarana duyarlıdır. Uyaran eşik değeri aşarsa impuls oluşur ve duyu nöronu ile merkezî sinir sistemine taşınır.' },
      { e: '🧪', b: 'Kemoreseptör', m: 'Kimyasal uyaranları algılar: tat, koku, kandaki CO₂, O₂ ve pH düzeyi. Dil, burun ve atardamar duvarlarında bulunur.' },
      { e: '🤚', b: 'Mekanoreseptör', m: 'Dokunma, basınç, titreşim, ses ve denge gibi mekanik uyaranları algılar. Pacini cisimciği ve iç kulaktaki kıl hücreleri örnektir.' },
      { e: '🌡️', b: 'Termoreseptör', m: 'Sıcaklık değişimini algılar. Deride sıcak ve soğuk için ayrı reseptörler vardır; hipotalamus kan sıcaklığını izler.' },
      { e: '💢', b: 'Ağrı reseptörü (nosiseptör)', m: 'Doku hasarı oluşturabilecek uyaranlara yanıt veren serbest sinir uçlarıdır. Vücudu korumaya yarayan uyarı sağlar.' },
      { e: '👁️', b: 'Fotoreseptör', m: 'Işığı algılar; retinadaki koni (renkli, keskin görme, gün ışığı) ve çubuk (loş ışık, siyah-beyaz) hücreleridir.' }
    ],
    quiz: [
      ['Dildeki tat tomurcukları hangi tür reseptördür?', ['Mekanoreseptör', 'Kemoreseptör', 'Fotoreseptör', 'Termoreseptör'], 1, 'Tat, çözünmüş kimyasal maddelerin algılanmasıdır.'],
      ['Deride basıncı algılayan Pacini cisimciği hangi gruptadır?', ['Kemoreseptör', 'Mekanoreseptör', 'Termoreseptör', 'Fotoreseptör'], 1, 'Basınç ve titreşim mekanik uyaranlardır.'],
      ['Loş ışıkta görmeyi sağlayan hücreler hangileridir?', ['Koni hücreleri', 'Çubuk hücreleri', 'Kıl hücreleri', 'Tat hücreleri'], 1, 'Çubuklar ışığa çok duyarlıdır ama renk ayırt etmez.'],
      ['Doku hasarı yapabilecek uyaranları algılayan reseptörler hangileridir?', ['Ağrı reseptörleri (nosiseptör)', 'Çubuk hücreleri', 'Pacini cisimcikleri', 'Tat tomurcukları'], 0, 'Serbest sinir uçlarıdır ve koruyucu uyarı sağlar.'],
      ['Kandaki karbondioksit düzeyini algılayan reseptörler hangi türdür?', ['Mekanoreseptör', 'Fotoreseptör', 'Kemoreseptör', 'Termoreseptör'], 2, 'Kandaki CO₂ ve pH kimyasal uyaranlardır.'],
      ['İç kulaktaki kıl hücreleri ses dalgalarını algılar. Bunlar hangi tür reseptördür?', ['Mekanoreseptör', 'Kemoreseptör', 'Termoreseptör', 'Ağrı reseptörü'], 0, 'Ses, titreşim yani mekanik bir uyarandır.'],
      ['Uyaranın algıya dönüşmesinde doğru sıra hangisidir?', ['Beyin → reseptör → duyu nöronu', 'Reseptör → duyu nöronu → beyinde yorumlama', 'Motor nöron → reseptör → beyin', 'Duyu nöronu → motor nöron → reseptör'], 1, 'Algı beyinde oluşur.']
    ],
    esles: [['Kemoreseptör', 'Kimyasal madde'], ['Mekanoreseptör', 'Basınç, dokunma, titreşim'], ['Termoreseptör', 'Sıcaklık değişimi'], ['Ağrı reseptörü', 'Doku hasarı yapan uyaran'], ['Fotoreseptör', 'Işık'], ['Koni hücresi', 'Renkli ve keskin görme']],
    sirala: { baslik: 'Uyarandan algıya giden yolu sırala', adimlar: ['Uyaran reseptöre etki eder', 'Reseptörde zar potansiyeli değişir', 'Eşik aşılınca impuls oluşur', 'Duyu nöronu impulsu merkezî sinir sistemine taşır', 'Beyinde yorumlanır (algı)'] },
    sinifla: { baslik: 'Hangi reseptör?', kat: ['Kemo', 'Mekano', 'Termo', 'Foto'], oge: [['Dildeki tat tomurcuğu', 0], ['Burundaki koku hücresi', 0], ['Kandaki CO₂ algılayan hücre', 0], ['Pacini cisimciği', 1], ['İç kulak kıl hücreleri', 1], ['Hipotalamustaki sıcaklık algılayıcı', 2], ['Deride soğuk algılayan uç', 2], ['Retinada koni hücresi', 3], ['Retinada çubuk hücresi', 3]] }
  },

  t11b: {
    ad: 'Nöronun yapısı', ikon: '🕸️', sinif: 11, sahneler: ['noron', 'refleks'],
    ozet: 'Nöronun bölümlerini, miyelinli ve miyelinsiz nöronu, duyu-ara-motor nöronu öğren.',
    kartlar: [
      { e: '🧬', b: 'Nöron', m: 'Sinir sisteminin yapı ve görev birimidir. Uyarıları alır, iletir ve diğer hücrelere aktarır. Olgun nöronlar çoğunlukla bölünemez.' },
      { e: '🌳', b: 'Bölümleri', m: 'Dendrit uyarıyı gövdeye taşır. Hücre gövdesi çekirdeği ve organelleri taşır. Akson uyarıyı gövdeden uzağa, akson terminallerine taşır. Uyarı yönü: dendrit → gövde → akson.' },
      { e: '🧈', b: 'Miyelinli ve miyelinsiz nöron', m: 'Miyelinli nöronda akson yağ yapılı miyelin kılıfla sarılıdır; kılıf Ranvier boğumlarında kesilir, impuls boğumdan boğuma sıçrayarak hızlı ilerler. Miyelinsiz nöronda iletim kesintisiz ve yavaştır.' },
      { e: '🧭', b: 'Görevlerine göre nöronlar', m: 'Duyu nöronu: reseptörden merkeze. Ara nöron: merkezî sinir sistemi içinde bağlantı. Motor nöron: merkezden efektöre (kas, bez).' },
      { e: '🏃', b: 'Refleks yayı', m: 'Reseptör → duyu nöronu → ara nöron (omurilik) → motor nöron → efektör. Bu yol çok kısa olduğu için tepki çok hızlıdır.' }
    ],
    quiz: [
      ['Uyarıyı hücre gövdesine taşıyan uzantı hangisidir?', ['Akson', 'Dendrit', 'Miyelin', 'Terminal'], 1, 'Dendrit gövdeye taşır, akson gövdeden uzağa taşır.'],
      ['Miyelinli aksonda impuls nasıl iletilir?', ['Kesintisiz ve yavaş', 'Ranvier boğumları arasında sıçrayarak', 'Sadece dendritte', 'İletilmez'], 1, 'Sıçrayarak iletim hızlıdır ve enerji tasarrufu sağlar.'],
      ['Uyarıyı reseptörden merkezî sinir sistemine taşıyan nöron hangisidir?', ['Motor nöron', 'Ara nöron', 'Duyu nöronu', 'Glia'], 2, 'Duyu (afferent) nöron, bilgiyi merkeze getirir.'],
      ['Motor nöron için hangisi doğrudur?', ['Uyarıyı reseptörden getirir', 'Uyarıyı merkezden efektöre taşır', 'Sadece beyinde bulunur', 'Miyelin yapar'], 1, 'Motor nöron kas veya beze emir taşır.'],
      ['Sinir sisteminde sayıca en çok bulunan nöron hangisidir?', ['Duyu nöronu', 'Ara nöron', 'Motor nöron', 'Hepsi eşit'], 1, 'Ara nöronlar beyin ve omurilikte çok sayıda bağlantı kurar.'],
      ['Ranvier boğumu nedir?', ['Dendritin ucu', 'Miyelin kılıfın bulunmadığı bölge', 'Akson tepeciği', 'Sinaptik kesecik'], 1, 'İki miyelin parçası arasındaki boşluktur.'],
      ['Miyelinsiz nöronda impuls iletimi nasıldır?', ['Sıçrayarak ve çok hızlı', 'Kesintisiz ve daha yavaş', 'Hiç olmaz', 'Sadece geriye doğru'], 1, 'Miyelinsiz aksonda impuls zar boyunca kesintisiz ilerler.']
    ],
    esles: [['Dendrit', 'Uyarıyı gövdeye taşır'], ['Akson', 'Uyarıyı gövdeden uzağa taşır'], ['Miyelin kılıf', 'Yalıtım ve hızlı iletim'], ['Ranvier boğumu', 'Miyelinin olmadığı yer'], ['Duyu nöronu', 'Reseptörden merkeze'], ['Ara nöron', 'Merkez içinde bağlantı'], ['Motor nöron', 'Merkezden efektöre']],
    sirala: { baslik: 'İmpulsun nöron içindeki yolunu sırala', adimlar: ['Dendrit uyarıyı alır', 'Hücre gövdesinde uyarılar toplanır', 'Akson tepeciğinde aksiyon potansiyeli başlar', 'Akson boyunca (Ranvier boğumlarından sıçrayarak) ilerler', 'Akson terminalinde nörotransmitter salınır'] },
    sinifla: { baslik: 'Hangi nöron?', kat: ['Duyu', 'Ara', 'Motor'], oge: [['Deriden omuriliğe uyarı taşır', 0], ['Kasa emir götürür', 2], ['Omurilikte duyu ve motor nöronu bağlar', 1], ['Gövdesi omurilik dışındaki gangliyondadır', 0], ['Gövdesi omuriliğin ön boynuzundadır', 2], ['Yalnızca merkezî sinir sistemi içindedir', 1], ['Efektörde sonlanır', 2], ['Reseptörle ilişkilidir', 0]] }
  },

  t11c: {
    ad: 'Nörotransmitter maddeler', ikon: '🧪', sinif: 11, sahneler: ['molekul'],
    ozet: 'Serotonin, dopamin, epinefrin ve norepinefrini tanı.',
    kartlar: [
      { e: '🧪', b: 'Nörotransmitter nedir?', m: 'Sinaptik keseciklerde depolanan, impuls ulaşınca ekzositozla salınan ve komşu hücrenin reseptörüne bağlanan kimyasal habercilerdir. Hedef hücrede uyarıcı ya da engelleyici etki oluşturabilir.' },
      { e: '😊', b: 'Serotonin', m: 'Ruh hâli, uyku, iştah ve vücut ısısı düzenlenmesinde rol alır. Düşük düzeyleri depresyonla ilişkilendirilir.' },
      { e: '🎯', b: 'Dopamin', m: 'Ödül, motivasyon ve istemli hareketlerin denetiminde görev alır. Dopamin üreten nöronların azalması Parkinson hastalığına yol açar.' },
      { e: '🔥', b: 'Epinefrin (adrenalin)', m: 'Stres ve heyecanda böbreküstü bezinden salgılanır. Kalp atışını, solunumu ve kan şekerini artırır (savaş ya da kaç).' },
      { e: '👀', b: 'Norepinefrin (noradrenalin)', m: 'Sempatik sinir sisteminin nörotransmitteridir. Dikkat ve uyanıklığı artırır, kan basıncını yükseltir.' },
      { e: '🧩', b: 'Benzerlikler', m: 'Dopamin, epinefrin ve norepinefrin birbirine çok benzeyen yapıdadır (katekolaminler). Serotoninin yapısında ise indol halkası bulunur.' }
    ],
    quiz: [
      ['Ruh hâli, uyku ve iştahın düzenlenmesinde rol alan nörotransmitter hangisidir?', ['Dopamin', 'Serotonin', 'Epinefrin', 'Norepinefrin'], 1, 'Serotonin ruh hâli ve uyku ile ilişkilidir.'],
      ['Parkinson hastalığında eksikliği görülen nörotransmitter hangisidir?', ['Serotonin', 'Dopamin', 'Epinefrin', 'Norepinefrin'], 1, 'Dopaminli nöronların kaybı hareket bozukluğuna yol açar.'],
      ['“Savaş ya da kaç” tepkisini hızlandıran madde hangisidir?', ['Epinefrin', 'Serotonin', 'Miyelin', 'ATP'], 0, 'Epinefrin kalp atışını ve kan şekerini artırır.'],
      ['Dikkat ve uyanıklığı artıran, sempatik sinir sisteminin nörotransmitteri hangisidir?', ['Serotonin', 'Dopamin', 'Norepinefrin', 'Asetil-KoA'], 2, 'Norepinefrin (noradrenalin) bu görevi üstlenir.'],
      ['Ödül ve motivasyon duygusuyla en çok ilişkili madde hangisidir?', ['Serotonin', 'Dopamin', 'Epinefrin', 'Norepinefrin'], 1, 'Dopamin ödül sisteminin ana habercisidir.'],
      ['Nörotransmitterler nerede depolanır?', ['Dendritlerde', 'Akson terminalindeki sinaptik keseciklerde', 'Miyelin kılıfta', 'Hücre çekirdeğinde'], 1, 'Akson terminalinde keseciklerde saklanırlar.'],
      ['Nörotransmitterin sinapstaki etkisi nasıl sonlanır?', ['Hücre bölünür', 'Geri alım veya enzimle yıkım', 'Miyelin kılıf artar', 'Çekirdek değişir'], 1, 'Böylece sinaps yeni uyarıya hazır olur.']
    ],
    esles: [['Serotonin', 'Ruh hâli, uyku, iştah'], ['Dopamin', 'Ödül, motivasyon, hareket'], ['Epinefrin', 'Stres anında hızlı hazırlık'], ['Norepinefrin', 'Dikkat ve uyanıklık'], ['Sinaptik kesecik', 'Nörotransmitter deposu'], ['Ekzositoz', 'Salgılama yolu']],
    sirala: { baslik: 'Nörotransmitterin yaşam döngüsünü sırala', adimlar: ['Sentezlenir ve keseciklerde depolanır', 'Aksiyon potansiyeli terminale ulaşır', 'Ca²⁺ girer, kesecikler zarla birleşir', 'Sinaptik aralığa salınır', 'Reseptöre bağlanır ve etki oluşturur', 'Geri alınır veya yıkılır'] },
    sinifla: { baslik: 'Hangi nörotransmitter?', kat: ['Serotonin', 'Dopamin', 'Epinefrin', 'Norepinefrin'], oge: [['Uyku ve ruh hâlini etkiler', 0], ['Parkinson’da eksikliği görülür', 1], ['Adrenalin olarak bilinir', 2], ['Dikkat ve uyanıklığı artırır', 3], ['Ödül hissini oluşturur', 1], ['Stres anında kalp atışını hızlandırır', 2], ['İştah ve vücut ısısının düzenlenmesine katılır', 0], ['Noradrenalin olarak bilinir', 3]] }
  },

  t11d: {
    ad: 'Zar potansiyeli', ikon: '📈', sinif: 11, sahneler: ['zar'], ozel: 'aksiyon',
    ozet: 'Polarizasyon, depolarizasyon ve repolarizasyonu iyon hareketleriyle öğren.',
    kartlar: [
      { e: '⚡', b: 'Zar potansiyeli', m: 'Nöron zarının iki yanı arasındaki elektriksel yük farkıdır. Dinlenmede hücre içi dışına göre negatiftir (yaklaşık −70 mV).' },
      { e: '🔋', b: 'Polarizasyon (dinlenme)', m: 'Na-K pompası 3 Na⁺’yı dışarı atar, 2 K⁺’yı içeri alır. K⁺ kanalları kısmen açıktır. Dışta Na⁺, içte K⁺ fazladır; zarın dışı pozitif, içi negatiftir.' },
      { e: '📈', b: 'Depolarizasyon', m: 'Uyarı eşik değeri (yaklaşık −55 mV) aşarsa Na⁺ kanalları açılır, Na⁺ hücreye girer ve iç taraf pozitifleşir (yaklaşık +30 mV).' },
      { e: '📉', b: 'Repolarizasyon', m: 'Na⁺ kanalları kapanır, K⁺ kanalları açılır, K⁺ hücre dışına çıkar ve iç taraf yeniden negatifleşir. Ardından Na-K pompası iyon dağılımını yeniler.' },
      { e: '🎚️', b: 'Ya hep ya hiç', m: 'Eşik altı uyarılar aksiyon potansiyeli oluşturmaz. Eşik aşıldığında ise aksiyon potansiyeli her zaman aynı büyüklüktedir; uyarı şiddeti arttıkça impulsların sıklığı artar.' }
    ],
    quiz: [
      ['Nöronun dinlenme potansiyeli yaklaşık kaç mV’tur?', ['+30 mV', '0 mV', '−70 mV', '−200 mV'], 2, 'Dinlenmede hücre içi dışarıya göre yaklaşık −70 mV’tur.'],
      ['Depolarizasyon sırasında hangi iyon hücre içine girer?', ['K⁺', 'Na⁺', 'Cl⁻', 'Ca²⁺ (yalnızca)'], 1, 'Na⁺ kanalları açılır ve Na⁺ içeri girer.'],
      ['Repolarizasyonda ne olur?', ['Na⁺ girer', 'K⁺ hücre dışına çıkar', 'ATP üretilir', 'Miyelin yapılır'], 1, 'K⁺ çıkışıyla iç taraf tekrar negatifleşir.'],
      ['Na-K pompası nasıl çalışır?', ['2 Na⁺ dışarı, 3 K⁺ içeri', '3 Na⁺ dışarı, 2 K⁺ içeri', 'Enerjisiz çalışır', 'Sadece Na⁺ taşır'], 1, '3 Na⁺ dışarı, 2 K⁺ içeri, ATP harcayarak.'],
      ['Eşik değerin altındaki bir uyarı ne yapar?', ['Aksiyon potansiyeli oluşturur', 'Aksiyon potansiyeli oluşturmaz', 'Nöronu öldürür', 'Miyelini artırır'], 1, 'Eşik altı uyarı impuls başlatmaz.'],
      ['Aksiyon potansiyelinin büyüklüğü uyarı şiddetiyle nasıl değişir?', ['Doğru orantılı artar', 'Değişmez (ya hep ya hiç)', 'Azalır', 'Önce artar sonra azalır'], 1, 'Şiddet arttıkça impuls sayısı artar, büyüklük değişmez.'],
      ['Dinlenme hâlindeki nöronda zarın iç ve dış yükü nasıldır?', ['İç negatif, dış pozitif', 'İç pozitif, dış negatif', 'İkisi de nötr', 'İkisi de negatif'], 0, 'Bu duruma polarizasyon denir.']
    ],
    esles: [['Polarizasyon', 'Dinlenme (−70 mV)'], ['Depolarizasyon', 'Na⁺ girişi, iç pozitifleşir'], ['Repolarizasyon', 'K⁺ çıkışı, iç negatifleşir'], ['Eşik değeri', 'Aksiyon potansiyelini başlatan düzey'], ['Na-K pompası', '3 Na⁺ dışarı, 2 K⁺ içeri'], ['Ya hep ya hiç', 'Genlik sabit']],
    sirala: { baslik: 'Aksiyon potansiyeli evrelerini sırala', adimlar: ['Dinlenme: polarizasyon', 'Uyarı eşiği aşılır', 'Na⁺ kanalları açılır: depolarizasyon', 'K⁺ kanalları açılır: repolarizasyon', 'Na-K pompası iyon dağılımını yeniler'] },
    sinifla: { baslik: 'Hangi evre?', kat: ['Polarizasyon', 'Depolarizasyon', 'Repolarizasyon'], oge: [['Na⁺ kanalları açık', 1], ['K⁺ kanalları açık, Na⁺ kapanmış', 2], ['İç taraf −70 mV', 0], ['İç taraf pozitifleşir', 1], ['İç taraf yeniden negatifleşir', 2], ['Pompa baskın, kanallar kapalı', 0], ['K⁺ hücre dışına çıkar', 2], ['Na⁺ hücreye girer', 1]] }
  },

  t11e: {
    ad: 'İmpuls iletimi', ikon: '🔗', sinif: 11, sahneler: ['noron', 'sinaps'],
    ozet: 'Nöronda ve sinapsta impuls iletimini adım adım izle.',
    kartlar: [
      { e: '➡️', b: 'Nöronda impuls iletimi', m: 'Aksiyon potansiyeli aksonda komşu bölgeyi depolarize ederek ilerler. İmpuls dinlenme durumuna dönmekte olan bölgeye geri dönemez (refrakter dönem); bu yüzden tek yönlü ilerler.' },
      { e: '🦘', b: 'Miyelin ve hız', m: 'Miyelinli nöronda impuls Ranvier boğumları arasında sıçrar, daha hızlı ve daha az enerjiyle ilerler. Miyelinsiz nöronda iletim kesintisiz ve yavaştır. Akson kalınlığı arttıkça hız artar.' },
      { e: '🔗', b: 'Sinaps nedir?', m: 'İki nöron (ya da nöron ve efektör) arasındaki bağlantı bölgesidir: presinaptik uç, sinaptik aralık ve postsinaptik zardan oluşur. İletim elektriksel değil kimyasaldır.' },
      { e: '🧩', b: 'Sinapsta adımlar', m: '1) Aksiyon potansiyeli uca ulaşır. 2) Ca²⁺ kanalları açılır. 3) Kesecikler zarla birleşir, nörotransmitter salınır. 4) Aralıkta difüzyon. 5) Reseptöre bağlanma, yeni zar potansiyeli. 6) Geri alım ve yıkım.' },
      { e: '⚖️', b: 'Tek yön ve hedef', m: 'Nörotransmitter yalnızca presinaptik uçtaki keseciklerde, reseptör yalnızca postsinaptik zarda bulunduğu için sinapsta iletim tek yönlüdür. Etki uyarıcı veya engelleyici olabilir.' }
    ],
    quiz: [
      ['Miyelinli aksonda impuls iletimi nasıl adlandırılır?', ['Kesintisiz iletim', 'Sıçrayarak iletim', 'Difüzyonla iletim', 'Geriye iletim'], 1, 'İmpuls Ranvier boğumları arasında sıçrar.'],
      ['Sinapsta iletimin tek yönlü olmasının nedeni nedir?', ['Nörotransmitterin yalnızca presinaptik uçta depolanması', 'Dendritin kısa olması', 'Miyelin kılıf', 'Kanın akış yönü'], 0, 'Kesecikler presinaptik uçta, reseptörler postsinaptik zardadır.'],
      ['Ca²⁺ iyonlarının sinapstaki görevi nedir?', ['Nörotransmitteri yıkmak', 'Keseciklerin zarla birleşip nörotransmitteri salmasını tetiklemek', 'Miyelin yapmak', 'ATP’yi parçalamak'], 1, 'Ca²⁺ girişi ekzositozu başlatır.'],
      ['Nörotransmitterler sinaptik aralıkta nasıl hareket eder?', ['Aktif taşımayla', 'Difüzyonla', 'Osmozla', 'Işık enerjisiyle'], 1, 'Derişim farkıyla yayılırlar.'],
      ['Aşağıdakilerden hangisi kimyasal sinapsta görülmez?', ['Ekzositoz', 'Reseptöre bağlanma', 'Aksiyon potansiyelinin aralıkta elektrik akımı olarak geçmesi', 'Ca²⁺ girişi'], 2, 'İletim, aralıkta kimyasal maddelerle olur.'],
      ['Aynı kalınlıkta aksonlar karşılaştırıldığında hangisinde iletim en hızlıdır?', ['Miyelinsiz akson', 'Miyelinli akson', 'Dendrit', 'Hücre gövdesi'], 1, 'Sıçrayarak iletim hızlıdır.'],
      ['Nörotransmitter reseptörüne bağlanınca postsinaptik zarda ne olur?', ['Zar potansiyeli değişir', 'Hücre bölünür', 'Çekirdek küçülür', 'Hiçbir şey olmaz'], 0, 'İyon kanalları açılır ve potansiyel değişir.']
    ],
    esles: [['Sıçrayarak iletim', 'Ranvier boğumları arasında'], ['Kesintisiz iletim', 'Miyelinsiz akson'], ['Presinaptik nöron', 'Nörotransmitteri salgılar'], ['Postsinaptik zar', 'Reseptörleri taşır'], ['Sinaptik aralık', 'İki nöron arası boşluk'], ['Ca²⁺', 'Kesecik birleşmesini tetikler']],
    sirala: { baslik: 'Sinapsta olayları sırala', adimlar: ['Aksiyon potansiyeli akson terminaline ulaşır', 'Ca²⁺ kanalları açılır, Ca²⁺ girer', 'Kesecikler zarla birleşir, nörotransmitter salınır', 'Nörotransmitter aralıkta difüzyonla yayılır', 'Reseptöre bağlanır, hedef zarda potansiyel değişir', 'Nörotransmitter geri alınır veya yıkılır'] },
    sinifla: { baslik: 'Nöronda mı, sinapsta mı?', kat: ['Nöronda iletim', 'Sinapsta iletim'], oge: [['Elektriksel (aksiyon potansiyeli)', 0], ['Kimyasal (nörotransmitter)', 1], ['Difüzyonla ilerler', 1], ['Na⁺ ve K⁺ kanalları sırayla açılır', 0], ['Ekzositoz görülür', 1], ['Ranvier boğumları arasında sıçrar', 0], ['Reseptöre bağlanma olur', 1], ['Akson boyunca ilerler', 0]] }
  },

  t11f: {
    ad: 'Nörona yardımcı elemanlar', ikon: '🤝', sinif: 11, sahneler: ['glia'],
    ozet: 'Mikroglia, oligodendrosit ve Schwann hücrelerini tanı.',
    kartlar: [
      { e: '🤝', b: 'Glia hücreleri', m: 'Nöronları destekleyen, besleyen, yalıtan ve koruyan hücrelerdir. Aksiyon potansiyeli ile impuls iletmezler. Sayıca nöronlardan fazladır.' },
      { e: '🛡️', b: 'Mikroglia', m: 'Merkezî sinir sisteminin bağışıklık hücreleridir. Ölü hücre kalıntılarını ve mikropları fagositozla yok eder.' },
      { e: '🧈', b: 'Oligodendrosit', m: 'Merkezî sinir sisteminde (beyin ve omurilik) miyelin kılıf yapar. Bir hücre, uzantılarıyla birçok aksonu sarar.' },
      { e: '🧵', b: 'Schwann hücresi', m: 'Çevresel sinir sisteminde miyelin yapar. Bir Schwann hücresi bir aksonun yalnızca bir bölümünü sarar. Sinir yenilenmesine yardımcı olur.' },
      { e: '⚠️', b: 'Miyelin kaybı', m: 'MS (multipl skleroz) gibi hastalıklarda MSS’deki miyelin zarar görür; impuls iletimi yavaşlar ve bozulur.' }
    ],
    quiz: [
      ['Merkezî sinir sisteminde miyelin kılıfı hangi hücre yapar?', ['Schwann hücresi', 'Oligodendrosit', 'Mikroglia', 'Duyu nöronu'], 1, 'MSS’de miyelini oligodendrositler yapar.'],
      ['Çevresel sinir sisteminde miyelini hangi hücre yapar?', ['Oligodendrosit', 'Mikroglia', 'Schwann hücresi', 'Motor nöron'], 2, 'ÇSS’de Schwann hücreleri görev yapar.'],
      ['Fagositozla ölü hücre ve mikropları temizleyen glia hangisidir?', ['Mikroglia', 'Oligodendrosit', 'Schwann hücresi', 'Hiçbiri'], 0, 'Mikroglia MSS’nin bağışıklık hücresidir.'],
      ['Glia hücreleriyle ilgili hangisi doğrudur?', ['İmpuls iletirler', 'Nöronları destekler, korur ve besler', 'Sadece kasta bulunur', 'Hormon üretir'], 1, 'Gliaların başlıca görevi destektir.'],
      ['Bir Schwann hücresi aksonu nasıl sarar?', ['Tüm akson boyunca tek başına', 'Aksonun yalnızca bir bölümünü sarar', 'Hiç sarmaz', 'Dendriti sarar'], 1, 'Boğumlar iki Schwann hücresi arasında oluşur.'],
      ['Miyelin kaybında ne gözlenir?', ['İletim hızlanır', 'İletim yavaşlar ve bozulur', 'Nöron çoğalır', 'Değişiklik olmaz'], 1, 'Yalıtım kaybolunca sıçrayarak iletim aksar.'],
      ['Aşağıdakilerden hangisi çevresel sinir sisteminde bulunur?', ['Oligodendrosit', 'Mikroglia', 'Schwann hücresi', 'Beyincik'], 2, 'Schwann hücresi ÇSS’ye özgüdür.']
    ],
    esles: [['Mikroglia', 'MSS’nin bağışıklık hücresi'], ['Oligodendrosit', 'MSS’de miyelin yapar'], ['Schwann hücresi', 'ÇSS’de miyelin yapar'], ['Glia', 'Destek hücreleri'], ['Miyelin', 'Yalıtkan kılıf'], ['Fagositoz', 'Zararlı parçacıkları yutma']],
    sirala: { baslik: 'Mikroglianın temizliğini sırala', adimlar: ['Hasar veya mikrop algılanır', 'Mikroglia uzantılarıyla bölgeye yönelir', 'Kalıntıyı yutar (fagositoz)', 'Lizozom enzimleriyle sindirir', 'Ortam temizlenir'] },
    sinifla: { baslik: 'Hangi glia?', kat: ['Mikroglia', 'Oligodendrosit', 'Schwann'], oge: [['Bağışıklık görevi yapar', 0], ['Beyinde miyelin yapar', 1], ['Periferik sinirlerde miyelin yapar', 2], ['Bir hücre birçok aksonu sarar', 1], ['Bir hücre aksonun bir bölümünü sarar', 2], ['Fagositoz yapar', 0], ['Sinir yenilenmesine yardım eder', 2], ['Ölü hücre kalıntılarını temizler', 0]] }
  }
};

// ============================================================ SON AŞAMA: BAĞLAM
// adim: [soru, [seçenekler], doğru, açıklama]
export const BAGLAM = [
  {
    ad: 'Sıcak çay bardağı', ikon: '☕', renk: '#ff9f43',
    hikaye: 'Elif, masadaki çay bardağına dokunur ve elini bir anda geri çeker. Bu kısacık sürede vücudunda neler olduğunu birlikte çözelim.',
    adimlar: [
      ['Elif’in parmak ucundaki, sıcaklığı algılayan yapı hangisidir?', ['Fotoreseptör', 'Termoreseptör', 'Kemoreseptör', 'Çubuk hücresi'], 1, 'Sıcaklık değişimini termoreseptörler algılar (aşırı sıcakta ağrı reseptörleri de devreye girer).'],
      ['Uyarıyı reseptörden omuriliğe hangi nöron taşır?', ['Motor nöron', 'Duyu nöronu', 'Oligodendrosit', 'Mikroglia'], 1, 'Duyu nöronu bilgiyi merkezî sinir sistemine getirir.'],
      ['Elin çekilmesi refleks olduğu için hangi bölgenin denetiminde gerçekleşir?', ['Beyincik', 'Omurilik', 'Oksipital lob', 'Hipotalamus'], 1, 'Refleks merkezi omuriliktir; beyin devreye girmeden hızlı tepki sağlanır.'],
      ['Duyu nöronundan ara nörona geçişte impuls nasıl iletilir?', ['Elektrik akımıyla doğrudan', 'Nörotransmitterlerle (kimyasal sinaps)', 'Kanla', 'Miyelinle'], 1, 'Sinapsta iletim nörotransmitterlerle olur.'],
      ['Aksonda Na⁺ kanalları açılıp Na⁺ hücreye girince zar potansiyelinin hangi evresi yaşanır?', ['Polarizasyon', 'Depolarizasyon', 'Repolarizasyon', 'Hiçbiri'], 1, 'Na⁺ girişi depolarizasyondur.'],
      ['Bu sürecin tamamında nöronların enerji ihtiyacını karşılayan ATP hangi organelde üretilir?', ['Lizozom', 'Mitokondri', 'Golgi', 'Ribozom'], 1, 'Hücresel solunumun büyük kısmı mitokondride gerçekleşir.']
    ]
  },
  {
    ad: 'Maraton koşucusu', ikon: '🏃', renk: '#2ee59d',
    hikaye: 'Ahmet, şehrin maratonunda koşuyor. Kalbi hızlanıyor, nefesi derinleşiyor ve dengesini hiç bozmadan ilerliyor. Sinir sistemi ve hücresel enerji birlikte çalışıyor.',
    adimlar: [
      ['Koşu sırasında kalp atışını ve solunumu otomatik düzenleyen merkez neresidir?', ['Omurilik soğanı', 'Beyincik', 'Ön lob', 'Talamus'], 0, 'Omurilik soğanı yaşamsal otomatik işlevleri denetler.'],
      ['Ahmet’in koşarken dengesini ve kas koordinasyonunu hangi bölüm sağlar?', ['Beyincik', 'Art lob', 'Pons', 'Hipofiz'], 0, 'Denge ve koordinasyon beyinciğin görevidir.'],
      ['Yarış heyecanında böbreküstü bezinden salgılanıp kalp atışını hızlandıran madde hangisidir?', ['Serotonin', 'Epinefrin', 'Miyelin', 'Glikojen'], 1, 'Epinefrin savaş ya da kaç tepkisini başlatır.'],
      ['Bitiş çizgisini geçince hissettiği ödül ve mutluluk hangi nörotransmitterle ilişkilidir?', ['Dopamin', 'Epinefrin yalnızca', 'ATP', 'Norepinefrin yalnızca'], 0, 'Ödül sisteminin ana habercisi dopamindir.'],
      ['Kaslarda oksijen yetersiz kalınca hücre ne yapar?', ['ATP üretimi tamamen durur', 'Fermantasyonla az ATP üretir, laktik asit birikir', 'Daha fazla ETS yapar', 'Su üretir'], 1, 'Oksijensiz ortamda glikolizle 2 ATP elde edilir ve laktik asit oluşur.'],
      ['Nöronlarda ATP’nin en çok harcandığı olay hangisidir?', ['Na-K pompasının çalışması', 'Difüzyon', 'Osmoz', 'Kolaylaştırılmış difüzyon'], 0, 'Pompa aktif taşıma yapar ve sürekli ATP harcar.']
    ]
  },
  {
    ad: 'Miyelin kaybı', ikon: '🩺', renk: '#3aa0ff',
    hikaye: 'Doktor Defne, kaslarında zayıflık ve uyuşma şikâyeti olan bir hastayı inceliyor. Tetkikler, hastanın beyin ve omuriliğindeki sinir liflerinin miyelin kılıfının zarar gördüğünü gösteriyor (MS).',
    adimlar: [
      ['Beyin ve omurilikte miyelin kılıfı oluşturan hücre hangisidir?', ['Schwann hücresi', 'Oligodendrosit', 'Mikroglia', 'Motor nöron'], 1, 'MSS’de miyelini oligodendrositler yapar.'],
      ['Miyelin zarar görünce impuls iletimi nasıl etkilenir?', ['Hızlanır', 'Yavaşlar ve aksar', 'Etkilenmez', 'Yön değiştirir'], 1, 'Yalıtım bozulunca sıçrayarak iletim aksar.'],
      ['Aynı görevi çevresel sinirlerde yapan hücre hangisidir?', ['Schwann hücresi', 'Oligodendrosit', 'Mikroglia', 'Duyu nöronu'], 0, 'ÇSS’de miyelini Schwann hücreleri oluşturur.'],
      ['Hasarlı doku kalıntılarını fagositozla temizleyen hücre hangisidir?', ['Mikroglia', 'Oligodendrosit', 'Schwann hücresi', 'Motor nöron'], 0, 'Mikroglia MSS’nin bağışıklık hücresidir.'],
      ['Ranvier boğumlarının görevi nedir?', ['Nörotransmitter üretmek', 'İmpulsun boğumdan boğuma sıçramasını sağlamak', 'ATP üretmek', 'Protein sentezlemek'], 1, 'Sıçrayarak iletim boğumlar arasında olur.'],
      ['Kasa emri taşıyan, hasta için zayıflayan nöron hangisidir?', ['Duyu nöronu', 'Ara nöron', 'Motor nöron', 'Mikroglia'], 2, 'Motor nöron emri merkezden kasa iletir.']
    ]
  },
  {
    ad: 'Parkinson hastası dede', ikon: '👴', renk: '#19c3d6',
    hikaye: 'Mehmet dede’nin elleri titriyor ve yürürken hareketleri yavaşlıyor. Doktor, beyinde dopamin üreten nöronların azaldığını söylüyor.',
    adimlar: [
      ['Dopamin hangi tür kimyasal habercidir?', ['Hormon değil, enzim', 'Nörotransmitter', 'Vitamin', 'Mineral'], 1, 'Dopamin, sinapslarda görev yapan bir nörotransmitterdir.'],
      ['Dopamin nöronun hangi yapısında depolanır?', ['Dendritlerde', 'Akson terminalindeki sinaptik keseciklerde', 'Miyelinde', 'Çekirdekte'], 1, 'Nörotransmitterler sinaptik keseciklerde saklanır.'],
      ['Dopamin sinaptik aralığa hangi yolla bırakılır?', ['Endositoz', 'Ekzositoz', 'Osmoz', 'Fotosentez'], 1, 'Kesecik zarı hücre zarıyla birleşip içeriği boşaltır.'],
      ['Hareketlerin düzgün ve dengeli olmasından sorumlu beyin bölümü hangisidir?', ['Beyincik', 'Art lob', 'Omurilik soğanı', 'Hipotalamus'], 0, 'Koordinasyon beyinciğin görevidir.'],
      ['Dopaminin etkisi nasıl sonlanır?', ['Geri alım ve enzimlerle yıkım', 'Hücre ölümüyle', 'Miyelin artışıyla', 'ATP sentaz ile'], 0, 'Böylece sinaps yeni uyarıya hazırlanır.'],
      ['Nöron bu işlevlerin yapılabilmesi için sürekli ATP üretmek zorundadır. Hangi gaz bu üretimde son elektron alıcısıdır?', ['Karbondioksit', 'Oksijen', 'Azot', 'Hidrojen'], 1, 'ETS’de oksijen son elektron alıcısıdır.']
    ]
  }
];

export const ROZETLER = [
  { sinir: 0, ad: 'Meraklı Hücre', ikon: '🧫' },
  { sinir: 300, ad: 'Nöron Çırağı', ikon: '🕸️' },
  { sinir: 900, ad: 'Sinaps Ustası', ikon: '⚡' },
  { sinir: 1800, ad: 'Beyin Kâşifi', ikon: '🧠' },
  { sinir: 3000, ad: 'Nasse Ustası', ikon: '👑' }
];
