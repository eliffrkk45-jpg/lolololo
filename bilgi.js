// 3B sahnelerde bir parçaya dokunulunca gösterilen bilgi kartları (Türkçe)
import { AYAR } from './config.js';
const b = (baslik, metin, ipucu = '') => ({ baslik, metin, ipucu });

export const BILGI = {
  // ---------------------------------------------------------------- HÜCRE (9. sınıf)
  hucre: {
    zar: b('Hücre zarı', 'Fosfolipit çift tabaka ile bu tabakaya gömülü proteinlerden oluşur (akıcı mozaik model). Seçici geçirgendir: hangi maddenin gireceğine ve çıkacağına karar verir. Nöronda zarın iyon kanalları ve Na-K pompası, uyarının (impulsun) oluşmasını sağlar.', 'Pasif taşıma ATP harcamaz, aktif taşıma ATP harcar.'),
    sitoplazma: b('Sitoplazma', 'Zar ile çekirdek arasındaki jel kıvamındaki sıvıdır. Organeller burada bulunur. Glikoliz tepkimeleri sitoplazmada gerçekleşir.', 'Glikoliz = sitoplazma'),
    cekirdek: b('Çekirdek', 'Kalıtım materyali olan DNA’yı taşır ve hücrenin tüm faaliyetlerini yönetir. Çift katlı, gözenekli bir zarla çevrilidir. Nöronun hücre gövdesinde bulunur.', 'Gözenekler sayesinde RNA ve proteinler geçebilir.'),
    cekirdekcik: b('Çekirdekçik', 'Çekirdeğin içindeki yoğun bölgedir. rRNA sentezlenir ve ribozom alt birimleri burada oluşturulur. Protein sentezi yoğun olan hücrelerde büyüktür.'),
    mitokondri: b('Mitokondri', 'Hücresel solunumun yapıldığı, ATP üretilen organeldir (hücrenin enerji santrali). Çift zarlıdır; iç zarı kristalar oluşturur. Kendi DNA’sı ve ribozomu vardır. Nöronlarda çok sayıda bulunur çünkü sinir hücresi çok enerji harcar.', 'Krebs = matriks, ETS = krista'),
    granulluER: b('Granüllü endoplazmik retikulum', 'Yüzeyinde ribozom bulunan zar kanallarıdır. Proteinler burada sentezlenir, katlanır ve taşınır. Nöronda Nissl cisimcikleri bu yapıdan oluşur.', 'Ribozomlu = granüllü'),
    duzER: b('Düz endoplazmik retikulum', 'Ribozomu yoktur. Lipit sentezi, zehirli maddelerin etkisiz hale getirilmesi ve kalsiyum depolanması görevlerini yapar.'),
    golgi: b('Golgi aygıtı', 'Üst üste dizilmiş yassı keseciklerden oluşur. Proteinleri son hâline getirir, paketler ve salgı kesecikleri hâlinde gönderir. Nörotransmitterlerin sinaptik keseciklere paketlenmesinde rol alır.', 'Paketleme ve salgılama'),
    lizozom: b('Lizozom', 'Sindirim enzimleri taşıyan keseciklerdir. Hücreye giren besinleri, yaşlanmış organelleri ve zararlı parçacıkları sindirir.'),
    ribozom: b('Ribozom', 'Zarsız organeldir; protein sentezini yapar. Sitoplazmada serbest veya granüllü ER üzerinde bağlı olarak bulunur.', 'Zarsız organel'),
    sentriyol: b('Sentriyol (sentrozom)', 'Hayvan hücrelerinde bulunur, hücre bölünmesinde iğ ipliklerinin oluşumunu sağlar. Bitki hücrelerinde bulunmaz.'),
    koful: b('Koful', 'Hayvan hücrelerinde küçük ve çok sayıdadır; madde depolar ve taşır. Bitki hücrelerindeki merkezî kofula göre çok daha küçüktür.')
  },

  // ---------------------------------------------------------------- NÖRON (11. sınıf)
  noron: {
    govde: b('Hücre gövdesi (soma)', 'Çekirdeğin ve organellerin bulunduğu bölümdür. Dendritlerden gelen uyarıları toplar ve akson tepeciğine yönlendirir. Nöronun metabolizma merkezidir.', 'Uyarı yönü: dendrit → gövde → akson'),
    cekirdek: b('Çekirdek', 'Nöronun hücre gövdesinde bulunur ve hücrenin yönetimini yapar. Olgun nöronlar genellikle bölünemez.'),
    dendrit: b('Dendrit', 'Hücre gövdesinden çıkan kısa ve çok dallı uzantılardır. Uyarıyı alıp hücre gövdesine taşır. Dallanma sayesinde yüzeyi geniştir; yani yapı görevine uygundur.', 'Dendrit = gövdeye taşır'),
    aksonTepe: b('Akson tepeciği', 'Aksonun gövdeden çıktığı konidir. Gövdeden gelen uyarılar burada toplanır; eşik değer aşılırsa aksiyon potansiyeli ilk burada başlar.'),
    akson: b('Akson', 'Hücre gövdesinden çıkan tek ve uzun uzantıdır. Uyarıyı gövdeden uzağa, sinaps uçlarına taşır. Bazı aksonlar bir metreden uzundur.', 'Akson = gövdeden uzağa taşır'),
    miyelin: b('Miyelin kılıf', 'Aksonu saran yağ yapılı yalıtkan kılıftır. Merkezî sinir sisteminde oligodendrosit, çevresel sinir sisteminde Schwann hücreleri tarafından oluşturulur. İmpuls iletimini hızlandırır ve enerji tasarrufu sağlar.', 'Miyelinli: sıçrayarak ve hızlı iletim'),
    ranvier: b('Ranvier boğumu', 'Miyelin kılıfın kesintiye uğradığı, akson zarının dışarıyla temas ettiği boğumlardır. Na⁺ ve K⁺ kanalları burada yoğundur. İmpuls bir boğumdan diğerine sıçrar (sıçrayarak iletim).', 'Boğum = miyelin yok'),
    terminal: b('Akson terminali (sinaptik düğme)', 'Aksonun uç dallarıdır. İçinde nörotransmitter dolu sinaptik kesecikler ve çok sayıda mitokondri bulunur. İmpuls ulaşınca nörotransmitter ekzositozla sinaptik aralığa salınır.'),
    schwann: b('Schwann hücresi', 'Çevresel sinir sisteminde aksonun bir bölümünü sararak miyelin kılıfı oluşturan glia hücresidir. Sinir hasarlarında yenilenmeye de yardımcı olur.')
  },

  // ---------------------------------------------------------------- REFLEKS (nöron çeşitleri)
  refleks: {
    reseptor: b('Reseptör', 'Uyaranı (burada sıcaklığı) algılayıp sinirsel impulsa çeviren yapıdır. Refleks yayının başlangıcıdır.'),
    duyu: b('Duyu (afferent) nöronu', 'Uyarıyı reseptörden merkezî sinir sistemine taşır. Hücre gövdesi omurilik dışındaki sinir düğümünde (gangliyon) bulunur. Genellikle miyelinlidir.', 'Duyu = reseptör → MSS'),
    ara: b('Ara nöron (bağlayıcı)', 'Yalnızca merkezî sinir sistemi içinde (beyin ve omurilik) bulunur. Duyu nöronu ile motor nöronu bağlar, bilgiyi yorumlar. Sayıca en çok bulunan nöron türüdür. Genellikle miyelinsizdir.', 'Ara = MSS içinde bağlantı'),
    motor: b('Motor (efferent) nöron', 'Emri merkezî sinir sisteminden efektöre (kas veya bez) taşır. Hücre gövdesi omuriliğin ön boynuzundadır. Aksonu uzun ve miyelinlidir.', 'Motor = MSS → efektör'),
    kas: b('Efektör: kas', 'Motor nöronun emriyle kasılarak tepki oluşturur. Refleksle el, sıcak cisimden hızla çekilir. Refleks omurilik kontrolünde, beyin devreye girmeden gerçekleştiği için çok hızlıdır.'),
    omurilikGri: b('Gri cevher', 'Omuriliğin içindeki kelebek şeklindeki bölümdür. Hücre gövdeleri, ara nöronlar ve motor nöron gövdeleri buradadır.'),
    omurilikBeyaz: b('Beyaz cevher', 'Omuriliğin dış kısmıdır. Miyelinli akson demetlerinden oluşur; beyin ile omurilik arasındaki yolları taşır.')
  },

  // ---------------------------------------------------------------- BEYİN (9. sınıf)
  beyin: {
    onLob: b('Ön lob (frontal)', 'Düşünme, planlama, karar verme, dikkat ve kişilik gibi üst düzey işlevlerin merkezidir. İstemli hareketleri başlatan motor korteks ve konuşma merkezi de burada yer alır.', 'İstemli hareket + düşünme'),
    parietal: b('Tepe lobu (parietal)', 'Dokunma, basınç, sıcaklık ve ağrı duyularının işlendiği bölümdür. Vücudun uzaydaki konumunun algılanmasında da görev alır.'),
    temporal: b('Şakak lobu (temporal)', 'İşitme duyusunun merkezidir. Bellek ve dili anlama işlevleriyle de ilgilidir.', 'İşitme + bellek'),
    oksipital: b('Art lob (oksipital)', 'Görme merkezidir. Gözlerdeki fotoreseptörlerden gelen impulslar burada görüntüye dönüştürülür.', 'Görme merkezi'),
    beyincik: b('Beyincik', 'Dengeyi, vücut duruşunu ve kasların koordinasyonunu sağlar. Hareketlerin düzgün ve akıcı olması beyinciğin görevidir. Zarar görürse yürüme ve denge bozulur.', 'Denge + koordinasyon'),
    orta: b('Orta beyin', 'Beyin sapının üst bölümüdür. Göz hareketleri, işitme ve görme refleksleri ile ilgilidir.'),
    pons: b('Pons (köprü)', 'Beyin ile beyinciği ve omurilik ile beyni birbirine bağlar. Solunumun düzenlenmesine yardım eder; yüz kaslarını kontrol eden sinirler de buradan çıkar.'),
    soganSinir: b('Omurilik soğanı', 'Yaşamsal otomatik işlevlerin merkezidir: kalp atışı, solunum, kan basıncı, yutma, öksürme ve kusma refleksleri. Zarar görürse yaşam tehlikeye girer.', 'Kalp + solunum merkezi'),
    omurilik: b('Omurilik', 'Omurilik soğanının devamıdır ve omurga içinde korunur. Beyin ile vücut arasında bilgi taşır ve refleks merkezidir.'),
    talamus: b('Talamus', 'Koku dışındaki duyu bilgilerini büyük beynin ilgili bölgelerine ileten aktarma istasyonudur.', 'İç yapı'),
    hipotalamus: b('Hipotalamus', 'Vücut ısısı, açlık, susuzluk, uyku ve hormon dengesinin (homeostazi) merkezidir. Hipofiz bezini kontrol eder.', 'İç yapı')
  },

  // ---------------------------------------------------------------- OMURİLİK (9. sınıf)
  omurilik: {
    gri: b('Gri cevher', 'Kelebek şeklinde, omuriliğin iç kısmındadır. Nöron hücre gövdeleri, ara nöronlar ve motor nöron gövdelerini içerir. Refleks merkezleri burada bulunur.', 'İçte gri, dışta beyaz'),
    arkaBoynuz: b('Arka boynuz', 'Duyu nöronlarının aksonları arka kökten girerek burada sonlanır. Duyusal bilgi bu bölgeye gelir.', 'Arka = duyu'),
    onBoynuz: b('Ön boynuz', 'Motor nöronların hücre gövdeleri buradadır. Aksonları ön kökten çıkarak kaslara gider.', 'Ön = motor'),
    beyaz: b('Beyaz cevher', 'Gri cevheri saran dış tabakadır. Miyelinli akson demetlerinden oluşur; beyne çıkan (duyu) ve beyinden inen (motor) yolları taşır. Miyelin nedeniyle beyaz görünür.'),
    kanal: b('Merkezî kanal', 'Omuriliğin ortasındaki ince kanaldır. İçinde beyin-omurilik sıvısı bulunur ve besin taşınmasına yardım eder.'),
    arkaKok: b('Arka kök ve gangliyon', 'Duyu nöronlarının aksonlarının omuriliğe girdiği köktür. Üzerindeki şişkinlik (gangliyon) duyu nöronlarının hücre gövdelerini taşır.', 'Hücre gövdesi omurilik dışında'),
    onKok: b('Ön kök', 'Motor nöronların aksonlarının omurilikten çıktığı köktür. Kaslara emir taşır.'),
    sinir: b('Omurilik siniri', 'Arka ve ön kökün birleşmesiyle oluşan karma sinirdir; hem duyu hem motor nöron içerir. İnsanda 31 çift omurilik siniri vardır. Çevresel sinir sistemine aittir.', '31 çift'),
    dura: b('Dış zar (dura mater)', 'Meninks denilen koruyucu zarların en dıştaki, sert ve kalın olanıdır.'),
    araknoid: b('Ağ zar (araknoid)', 'Ortadaki zardır. Altındaki boşlukta beyin-omurilik sıvısı dolaşır; bu sıvı darbeleri emer ve besleme yapar.'),
    pia: b('İç zar (pia mater)', 'Omuriliğe doğrudan yapışan ince ve damar bakımından zengin zardır; omuriliği besler.'),
    omur: b('Omur (vertebra)', 'Omuriliği çevreleyen kemik halkadır. Omurlar üst üste dizilerek omurgayı oluşturur ve omuriliği darbelerden korur. Yapı-görev ilişkisinin güzel bir örneğidir.', 'Kemik koruma')
  },

  // ---------------------------------------------------------------- NÖROTRANSMİTTERLER (11. sınıf)
  molekul: {
    serotonin: b('Serotonin', 'Ruh hâli, uyku, iştah ve vücut ısısının düzenlenmesinde rol oynar. Düşük düzeyleri depresyonla ilişkilendirilir. Vücuttaki serotoninin büyük kısmı sindirim sisteminde bulunur. Yapısında indol halkası vardır.', 'Ruh hâli, uyku, iştah'),
    dopamin: b('Dopamin', 'Ödül, motivasyon, zevk ve istemli hareketlerin düzenlenmesinde görevlidir. Beyindeki dopaminli nöronların azalması Parkinson hastalığına yol açar. Epinefrin ve norepinefrinin öncülüdür.', 'Ödül + hareket'),
    epinefrin: b('Epinefrin (adrenalin)', 'Stres ve heyecan anında böbreküstü bezinin özünden hormon olarak salgılanır; nörotransmitter olarak da görev yapar. Kalp atışını ve solunumu hızlandırır, kan şekerini yükseltir (savaş ya da kaç tepkisi).', 'Stres hazırlığı'),
    norepinefrin: b('Norepinefrin (noradrenalin)', 'Sempatik sinir sisteminin ana nörotransmitteridir. Dikkati ve uyanıklığı artırır, kan basıncını yükseltir. Beyinde uyanıklık ve odaklanmayı destekler.', 'Dikkat + uyanıklık')
  },

  // ---------------------------------------------------------------- ZAR POTANSİYELİ (11. sınıf)
  zar: {
    lipit: b('Fosfolipit çift tabaka', 'Zarın temel iskeletidir. Yağı seven kuyruklar içe, suyu seven başlar dışa bakar. Yüklü iyonlar yağlı bölgeden geçemez, bu yüzden iyonlar kanallardan geçer.'),
    naKanal: b('Na⁺ kanalı (gerilime duyarlı)', 'Dinlenmede kapalıdır. Eşik değere ulaşılınca açılır ve Na⁺ iyonları derişim farkıyla hücre içine girer; bu depolarizasyona yol açar.', 'Depolarizasyon = Na⁺ girişi'),
    kKanal: b('K⁺ kanalı (gerilime duyarlı)', 'Depolarizasyonun ardından açılır. K⁺ iyonları hücre dışına çıkar ve iç taraf yeniden negatifleşir; bu repolarizasyondur.', 'Repolarizasyon = K⁺ çıkışı'),
    pompa: b('Na-K pompası', 'ATP harcayarak her seferinde 3 Na⁺ iyonunu dışarı atar, 2 K⁺ iyonunu içeri alır. Dinlenme potansiyelini (−70 mV) kurar ve her impulstan sonra iyon dağılımını eski hâline getirir.', 'Aktif taşıma, ATP gerekir'),
    na: b('Na⁺ iyonu', 'Hücre dışında derişimi yüksektir. Depolarizasyonda Na⁺ kanallarından hücreye girer.'),
    k: b('K⁺ iyonu', 'Hücre içinde derişimi yüksektir. Repolarizasyonda K⁺ kanallarından hücre dışına çıkar.')
  },

  // ---------------------------------------------------------------- SİNAPS (11. sınıf)
  sinaps: {
    terminal: b('Presinaptik uç (akson terminali)', 'İmpulsu getiren nöronun akson ucudur. Nörotransmitter dolu keseciklere ve çok sayıda mitokondriye sahiptir. Sinapsta iletim tek yönlüdür: presinaptik uçtan postsinaptik zara doğru.', 'Tek yönlü iletim'),
    kesecik: b('Sinaptik kesecik', 'İçinde nörotransmitter taşır. Ca²⁺ girince keseciğin zarı hücre zarıyla birleşir ve nörotransmitter ekzositozla sinaptik aralığa boşalır.'),
    kalsiyum: b('Ca²⁺ kanalı', 'Aksiyon potansiyeli uca ulaşınca açılır, Ca²⁺ hücreye girer. Ca²⁺ girişi keseciklerin zarla birleşmesini tetikler.', 'Ca²⁺ = salınımı başlatır'),
    aralik: b('Sinaptik aralık', 'İki nöron arasındaki yaklaşık 20 nm genişliğindeki boşluktur. Nörotransmitterler burada difüzyonla karşı tarafa ulaşır. Hücreler birbirine değmez, bu yüzden iletim kimyasaldır.'),
    reseptor: b('Reseptör (postsinaptik zar)', 'Nörotransmitterin bağlandığı özel proteinlerdir. Bağlanınca iyon kanalları açılır ve hedef nöronun zar potansiyeli değişir. Uyarıcı ya da engelleyici etki oluşabilir.', 'Anahtar-kilit uyumu'),
    postsinaptik: b('Postsinaptik zar', 'Uyarıyı alan nöronun (genellikle dendrit ya da gövde) zarıdır. Nörotransmitter bağlanınca burada yeni bir elektriksel değişim başlar.'),
    mito: b('Mitokondri', 'Nörotransmitter sentezi ve kesecik hareketi için gereken ATP’yi üretir.'),
    geriAlim: b('Geri alım taşıyıcısı', 'Salınan nörotransmitterlerin bir kısmını presinaptik uca geri alır; kalanı enzimlerle yıkılır. Böylece etki sonlanır ve sinaps yeni uyarıya hazırlanır.', 'Etkiyi bitirir')
  },

  // ---------------------------------------------------------------- MİTOKONDRİ (10. sınıf)
  mitokondri: {
    disZar: b('Dış zar', 'Mitokondriyi saran düz ve geçirgen zardır. Küçük moleküllerin geçişine izin verir.'),
    icZar: b('İç zar', 'Kıvrımlar yaparak kristaları oluşturur. Elektron taşıma sistemi (ETS) ve ATP sentaz burada bulunur. Seçici geçirgendir.', 'ETS = iç zar'),
    krista: b('Krista', 'İç zarın içe doğru kıvrımlarıdır. Yüzeyi artırarak daha fazla ETS ve ATP sentaz yerleşmesini sağlar. Yapı-görev ilişkisine güzel bir örnektir.'),
    matriks: b('Matriks', 'İç zarın içindeki yoğun sıvıdır. Krebs döngüsünün enzimleri, mitokondri DNA’sı ve ribozomlar burada bulunur. Asetil-KoA’nın yıkımıyla CO₂ açığa çıkar.', 'Krebs = matriks'),
    atpSentaz: b('ATP sentaz', 'İç zarda bulunan enzimdir. H⁺ iyonları derişim farkıyla bu enzimden geçerken dönerek ADP + Pi’den ATP oluşturur. Hücresel solunumdaki ATP’nin büyük kısmı burada üretilir.', 'En çok ATP burada'),
    mdna: b('Mitokondri DNA’sı', 'Mitokondrinin kendi halkasal DNA’sıdır. Bazı kendi proteinlerini üretmesini sağlar.')
  },

  // ---------------------------------------------------------------- ATP (10. sınıf)
  atp: {
    adenin: b('Adenin', 'Azotlu organik bazdır. ATP’nin “A” harfi (adenozin) adenin ve ribozdan oluşur.'),
    riboz: b('Riboz', 'Beş karbonlu şekerdir. Adenin ve fosfat grupları bu şekere bağlanır.'),
    fosfat: b('Fosfat grubu', 'ATP’de üç fosfat vardır. Fosfatlar arasındaki bağlar yüksek enerjilidir. Hidrolizle ayrılan fosfat (Pi) enerjiyi iş yapılacak yere taşır.'),
    yuksekBag: b('Yüksek enerjili bağ', 'Fosfatlar arasındaki bağdır. ATP → ADP + Pi tepkimesinde yaklaşık 30,5 kJ/mol enerji açığa çıkar. Bu enerji aktif taşıma, kas kasılması, nörotransmitter salınımı gibi işlerde kullanılır.', 'Enerji bu bağda saklı')
  },

  // ---------------------------------------------------------------- RESEPTÖRLER (11. sınıf)
  reseptor: {
    kemo: b('Kemoreseptör', 'Kimyasal maddelere (tat, koku, kandaki CO₂, O₂ ve pH) duyarlıdır. Dildeki tat tomurcukları, burundaki koku hücreleri ve atardamarlardaki kemoreseptörler örnektir. Kimyasal madde reseptör proteinine bağlanınca impuls başlar.', 'Tat, koku, kan kimyası'),
    mekano: b('Mekanoreseptör', 'Dokunma, basınç, titreşim, ses dalgaları ve vücut dengesi gibi mekanik uyaranlara duyarlıdır. Deride Pacini cisimcikleri, iç kulakta kıl hücreleri örnektir. Zarın gerilmesi iyon kanallarını açar.', 'Dokunma, basınç, ses, denge'),
    termo: b('Termoreseptör', 'Sıcaklık değişimlerine duyarlıdır. Derideki sıcak ve soğuk reseptörleri ile hipotalamustaki kan sıcaklığını algılayan hücreler örnektir. Vücut sıcaklığının dengelenmesini sağlar.', 'Sıcak ve soğuk ayrı reseptörler'),
    agri: b('Ağrı reseptörü (nosiseptör)', 'Doku hasarına yol açabilen güçlü sıcak, soğuk, mekanik ve kimyasal uyaranlara yanıt veren serbest sinir uçlarıdır. Koruyucu bir uyarı sağlar. Neredeyse hiç adaptasyon göstermez.', 'Serbest sinir ucu'),
    foto: b('Fotoreseptör', 'Işığı algılayan retina hücreleridir. Koni hücreleri renkli ve keskin görmeyi sağlar, gün ışığında çalışır. Çubuk hücreleri loş ışıkta ve siyah-beyaz görmeyi sağlar. Işık, hücredeki görme pigmentinde değişim oluşturarak impuls başlatır.', 'Koni = renk, çubuk = loş ışık')
  },

  // ---------------------------------------------------------------- GLİA (11. sınıf)
  glia: {
    mikroglia: b('Mikroglia', 'Merkezî sinir sisteminin bağışıklık hücreleridir. Ölü hücre kalıntılarını ve mikroorganizmaları fagositozla yutar, sindirir. Uzantılarıyla sürekli çevreyi tarar.', 'MSS’nin temizlik görevlisi'),
    oligo: b('Oligodendrosit', 'Merkezî sinir sisteminde (beyin ve omurilik) miyelin kılıf yapan glia hücresidir. Uzantılarıyla birçok aksonu aynı anda sarabilir.', 'Bir hücre → çok akson'),
    schwann: b('Schwann hücresi', 'Çevresel sinir sisteminde miyelin yapar. Her Schwann hücresi bir aksonun yalnızca küçük bir bölümünü sarar. Hasarlı sinirlerin onarımına yardımcı olur.', 'Bir hücre → tek aksonun bir bölümü'),
    aksonMSS: b('Akson (merkezî sinir sistemi)', 'Oligodendrosit tarafından miyelinlenir. Miyelin kaybı (örneğin MS hastalığında) impuls iletimini yavaşlatır.'),
    aksonCSS: b('Akson (çevresel sinir sistemi)', 'Schwann hücreleri tarafından miyelinlenir. İki Schwann hücresi arasında Ranvier boğumu oluşur.'),
    ranvier: b('Ranvier boğumu', 'İki miyelin parçası arasındaki boşluktur. İmpuls burada yeniden oluşarak sıçrar.')
  }
};

// 3B sahnelerin tanıtımı (Laboratuvar listesi ve başlıklar için)
export const SAHNELER = {
  hucre:      { ad: 'Hayvan hücresi',           ikon: '🧫', sinif: 9,  ozet: 'Organelleri keşfet; zar, çekirdek, mitokondri ve daha fazlası.' },
  beyin:      { ad: 'Beyin',                    ikon: '🧠', sinif: 9,  ozet: 'Loblar, beyincik ve beyin sapı. İç yapıları göstermek için şeffaflaştır.' },
  omurilik:   { ad: 'Omurilik kesiti',          ikon: '🦴', sinif: 9,  ozet: 'Gri-beyaz cevher, kökler, zarlar ve omur.' },
  atp:        { ad: 'ATP molekülü',             ikon: '🔋', sinif: 10, ozet: 'Adenin, riboz ve üç fosfat. Son fosfatı kopar, enerjiyi gör.' },
  mitokondri: { ad: 'Mitokondri',               ikon: '⚡', sinif: 10, ozet: 'Krista, matriks ve ATP sentaz. ATP üretimini başlat.' },
  reseptor:   { ad: 'Reseptör çeşitleri',       ikon: '👂', sinif: 11, ozet: 'Kemo-, mekano-, termo-, ağrı ve fotoreseptörler.' },
  noron:      { ad: 'Nöronun yapısı',           ikon: '🕸️', sinif: 11, ozet: 'Dendrit, gövde, akson, miyelin, Ranvier boğumu. İmpuls gönder.' },
  refleks:    { ad: 'Refleks yayı',             ikon: '🖐️', sinif: 11, ozet: 'Duyu, ara ve motor nöron. Refleksi başlat.' },
  molekul:    { ad: 'Nörotransmitter molekülleri', ikon: '🧪', sinif: 11, ozet: 'Serotonin, dopamin, epinefrin ve norepinefrin.' },
  zar:        { ad: 'Zar potansiyeli',          ikon: '📈', sinif: 11, ozet: 'Polarizasyon, depolarizasyon, repolarizasyon. İyon akışını izle.' },
  sinaps:     { ad: 'Sinaps',                   ikon: '🔗', sinif: 11, ozet: 'Sinapsta impuls iletimini adım adım izle.' },
  glia:       { ad: 'Yardımcı hücreler (glia)', ikon: '🤝', sinif: 11, ozet: 'Mikroglia, oligodendrosit ve Schwann hücresi.' }
};

// Sketchfab modelleri: sayfa içine gömülür. "esle": tıklanan parçanın adında geçen sözcüğe göre Türkçe kart gösterilir.
export const SKETCHFAB = {
  hucre: {
    uid: AYAR.SKETCHFAB.hucre,
    bilgi: 'hucre',
    esle: [
      [/nucleol|çekirdekçik/i, 'cekirdekcik'], [/nucle|nukle|çekirdek/i, 'cekirdek'],
      [/mitochon|mitokon/i, 'mitokondri'], [/golgi/i, 'golgi'],
      [/rough|granul|granül/i, 'granulluER'], [/smooth|düz/i, 'duzER'], [/reticul|retikul|\ber\b/i, 'granulluER'],
      [/lysos|lizoz/i, 'lizozom'], [/ribos/i, 'ribozom'], [/centri|sentri/i, 'sentriyol'],
      [/vacuol|vakuol|koful/i, 'koful'], [/membran|zar/i, 'zar'], [/cytopl|sitopl/i, 'sitoplazma']
    ]
  },
  noron: {
    uid: AYAR.SKETCHFAB.noron,
    bilgi: 'noron',
    esle: [
      [/dendri/i, 'dendrit'], [/hillock|tepe/i, 'aksonTepe'], [/axon|akson/i, 'akson'],
      [/myelin|miyelin|sheath/i, 'miyelin'], [/ranvier|node/i, 'ranvier'], [/schwann/i, 'schwann'],
      [/terminal|bouton|synap|sinap/i, 'terminal'], [/nucle|nukle|çekirdek/i, 'cekirdek'],
      [/soma|body|cell|gövde/i, 'govde']
    ]
  }
};

// İsteğe bağlı: kendi .glb modellerinizi koyarsanız 3B ekranda "Kendi modelim" düğmesi çıkar.
// Dosyayı models/ klasörüne koyup yolunu yazın. noktalar: modelin üstüne konacak dokunulabilir noktalar
// (konum x,y,z modelin normalleştirilmiş boyutuna göredir; yaklaşık 4 birimlik kutu).
export const OZEL_MODELLER = {
  // hucre:  { yol: 'models/hucre.glb',  noktalar: [ { p: [0, 0, 0], bilgi: 'cekirdek' } ] },
  // noron:  { yol: 'models/noron.glb',  noktalar: [ { p: [-1.5, 0, 0], bilgi: 'govde' } ] },
  // beyin:  { yol: 'models/beyin.glb',  noktalar: [ { p: [0, 1, 0], bilgi: 'onLob' } ] },
  // omurilik: { yol: 'models/omurilik.glb', noktalar: [] }
};
