# Sprint Challenge Talimatları

## Proje kurulumu

- Fork, klon, ve `npm install`.
- `npm run resetdb` komutuyla veritabanını yükleyin.
- `npm test`.

## Proje Talimatlerı

### Giriş

"projects" ve "actions" adlı iki kaynak için Oluştur, Oku, Güncelle ve Sil (CRUD) işlevine sahip bir API oluşturacaksınız.

### Görev 1: NPM Komut Dosyaları Oluşturun

Kodunuzla ilgili testler yapmak için kullanabileceğiniz bir _"test"_ betiği zaten var.
Veritabanını orijinal durumuna sıfırlamanıza izin veren bir _"resetdb"_ komut dosyası mevcuttur.

- [ ] API sunucusunu çalıştırmak için "node" kullanan _"start"_ adlı bir _npm betiği_ yazın.
- [ ] API sunucusunu çalıştırmak için `nodemon` kullanan _"server"_ adlı bir _npm betiği_ yazın.
- [ ] Üretimde kullanılmayacak bir geliştirme bağımlılığı olarak _nodemon_ yükleyin.

### Görev 2: Ortam Değişkenlerini Tüket

- [ ] "process.env" değişkeninden bağlantı noktası numarasını getirin, "process.env.PORT" tanımsızsa "9000"e geri dönün **!!!**

### Görev 3: Uç Noktalar Oluşturun

`api/projects/projects-router.js` içinde aşağıdakileri uygulayın:

- [ ] `[GET] /api/projects`
  - Yanıt gövdesinde bir projexts dizisi döndürür.
  - Proje yoksa boş bir dizi ile yanıt verir.
- [ ] `[GET] /api/projects/:id`
  - Yanıtın gövdesi olarak belirtilen "id" ile bir proje döndürür.
  - Belirtilen id'ye sahip bir proje yoksa, 404 durum koduyla yanıt verir..
- [ ] `[POST] /api/projects`
  - Yanıtın gövdesi olarak yeni oluşturulan projeyi döndürür.
  - İstek gövdesinde gerekli alanlardan herhangi biri eksikse, 400 durum koduyla yanıt verir.
- [ ] `[PUT] /api/projects/:id`
  - Yanıtın gövdesi olarak güncellenen projeyi döndürür.
  - Belirtilen id'ye sahip bir proje yoksa, 404 durum koduyla yanıt verir.
  - İstek gövdesinde gerekli alanlardan herhangi biri eksikse, 400 durum koduyla yanıt verir.
- [ ] `[DELETE] /api/projects/:id`
  - Yanıt gövdesi döndürmez.
  - Belirtilen id'ye sahip bir proje yoksa, 404 durum koduyla yanıt verir..
- [ ] `[GET] /api/projects/:id/actions`
  - Belirtilen "id" ile bir projeye ait bir dizi eylem (boş olabilir) döndürür.
  - Belirtilen id'ye sahip bir proje yoksa, 404 durum koduyla yanıt verir.

`api/actions/actions-router.js` içinde  _actions_ CRUD işlemleri yapan uç noktalar oluşurun:

- [ ] `[GET] /api/actions`
  - Yanıtın gövdesi olarak bir dizi eylem (action) (veya boş bir dizi) döndürür.
- [ ] `[GET] /api/actions/:id`
  - Yanıtın gövdesi olarak verilen "id" ile bir action döndürür.
  - Verilen 'id' ile herhangi bir eylem yoksa, 404 durum koduyla yanıt verir.
- [ ] `[POST] /api/actions`
  - Yeni oluşturulan eylemi yanıtın gövdesi olarak döndürür.
  - İstek gövdesinde gerekli alanlardan herhangi biri eksikse, 400 durum koduyla yanıt verir.
  - Bir eylem eklerken sağlanan "project_id"nin mevcut bir "projeye" ait olduğundan emin olun.
- [ ] `[PUT] /api/actions/:id`
  - Güncellenen eylemi yanıtın gövdesi olarak döndürür.
  - Verilen 'id' ile herhangi bir işlem yoksa, 404 durum koduyla yanıt verir.
  - İstek gövdesinde gerekli alanlardan herhangi biri eksikse, 400 durum koduyla yanıt verir.
- [ ] `[DELETE] /api/actions/:id`
  - Yanıt gövdesi döndürmez.
  - Verilen 'id' ile herhangi bir işlem yoksa, 404 durum koduyla yanıt verir.

### Görev 4: Ara yazılım işlevleri oluşturun

- [ ] Bu API için en az iki ara yazılım işlevi yazın ve bunları kodunuzun uygun yerlerinde kullanın.

### Veritabanı Şemalarına İlişkin Bilgiler

Dahil edilen veritabanında (`./data/database.db3`) depolanan her bir _resource_ hakkında yapının açıklaması ve ek bilgiler aşağıda listelenmiştir.

#### Projects

| Field       | Data Type | Metadata                                                                    |
| ----------- | --------- | --------------------------------------------------------------------------- |
| id          | number    | projeleri oluştururken bunu sağlamayın, veritabanı kendisi oluşturur        |
| name        | string    | required                                                                    |
| description | string    | required                                                                    |
| completed   | boolean   | not required, proje oluşturulurken varsayılan false dur                     |

#### Actions

| Field       | Data Type | Metadata                                                                                         |
| ----------- | --------- | ------------------------------------------------------------------------------------------------ |
| id          | number    | projeleri oluştururken bunu sağlamayın, veritabanı kendisi oluşturur                             |
| project_id  | number    | required, var olan projenin id si olmalı                                                         |
| description | string    | required, 128 karakterden uzun olmamalı                                                          |
| notes       | string    | required, limit yok. Not almak için ya da eylemi tamamlamak için gerekli şeyleri kaydetmek için  |
| completed   | boolean   | not required, eylemler oluşturulurken varsayılan false dur                                       |

### Veritabanı Kalıcılığı Yardımcıları Hakkında Bilgi

Proje, _project_ ve _action_ verilerinin kalıcılığını yönetmek için kullanabileceğiniz modelleri içerir.
Bu dosyalar "api/projects/projects-model.js" ve "api/actions/actions-model.js" dosyalarıdır.
Her iki dosya da, her bir kaynağı depolamak, değiştirmek ve almak için kullanabileceğiniz aşağıdaki api'yi yayınlar:

**Tüm bu yardımcı yöntemler bir Promise verir. .then().catch() veya async/await kullanmayı unutmayın.**

- `get()`: veritabanında bulunan tüm kaynakların bir dizisine çözümlenir. Bu yönteme bir 'id' iletirseniz, bulunursa o kimliğe sahip kaynağı döndürür.
- `insert()`: insert çağırmak, onu bir kaynak nesnesinden geçirmek, onu veritabanına ekler ve yeni oluşturulan kaynağı döndürür.
- `update()`: iki bağımsız değişkeni kabul eder, ilki güncellenecek kaynağın "kimliği" ve ikincisi uygulanacak "değişikliklere" sahip bir nesnedir. Güncellenen kaynağı döndürür. Sağlanan "id" ile bir kaynak bulunamazsa, metot "null" değerini döndürür.
- `remove()`: remove yöntemi, ilk parametresi olarak bir "id" kabul eder ve kaynağı veritabanından başarıyla sildikten sonra, silinen kayıtların sayısını döndürür.

"projects-model.js", tek bağımsız değişkeni olarak bir _project id_ alan ve _project_ için tüm _actions_ listesini döndüren "getProjectActions()" adında fazladan bir yöntem içerir.

Tüm kaynaklar için test verileri sağladık.

**ÖNEMLİ NOTLAR:**

- **ek** bağımlılıklar ve betikler eklemek dışında `package.json` dosyanızda değişiklik yapmayın. Mevcut paketleri güncellemeyin.
- API uç noktalarını manuel olarak test etmek için "HTTPie", "Postman" veya "Insomnia" gibi bir HTTP istemcisi kullanın.
- Uç noktalarınızı düzenlemek için Ekspres Yönlendiricileri kullanın.
- Yalnızca iki ara yazılım işlevi yazmanız gerekmesine rağmen, ara katman yazılımlarından mümkün olduğunca yararlanmanız önerilir.
- Ek dosyalar oluşturabilirsiniz ancak **mevcut dosyaları veya klasörleri taşımayın veya yeniden adlandırmayın**.
- Çözümünüzde, en iyi uygulamaları izlemeniz ve temiz ve profesyonel sonuçlar üretmeniz çok önemlidir.
- Çalışmanızı gözden geçirmek, iyileştirmek ve değerlendirmek için zaman planlayın ve çalışmanız üzerinde yazım denetimi ve dilbilgisi denetimi de dahil olmak üzere temel profesyonel düzeltmeler yapın.
