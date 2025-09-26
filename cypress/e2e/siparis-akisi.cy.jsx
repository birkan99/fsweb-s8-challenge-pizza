describe("Sipariş Akışı Testleri", () => {
  beforeEach(() => {
    cy.visit("http://localhost:5173/");
  });

  // --- Anasayfa ve Gezinme Testleri ---
  it("Anasayfa elementleri ve navigasyon doğru çalışmalı", () => {
    cy.get("[data-cy=hero-title]").should("contain", "Teknolojik Yemekler");
    cy.get("[data-cy=hero-slogan]").should("be.visible");

    // Pizza kartına tıklayarak sipariş formuna gitme
    cy.get('[data-cy="pizza-card"]')
      .contains("Position Absolute Acı Pizza")
      .click();
    cy.url().should("include", "/order/");
  });

  // --- Form Alanları ve Fiyat Hesaplama Testi ---
  it("Boyut, adet ve ekstra malzeme seçimleri fiyatı doğru güncellemeli", () => {
    cy.contains("button", "Acıktım").click(); // Herhangi bir pizza formuna git

    // İsim, Hamur ve Not alanlarını doldur
    cy.get('input[type="text"]').type("dataCy Kullanıcısı");
    cy.get("select").select("İnce");

    // Boyut seçimi ve fiyat kontrolü
    cy.get('[data-cy="size-btn-m"]').click();
    // Başlangıç fiyatı 85.00₺
    cy.get(".font-bold.text-red-600").should("contain", "85.00₺");

    // 4 Ekstra malzeme seçimi
    cy.contains('[data-cy="extra-ingredient-btn"]', "Domates").click();
    cy.contains('[data-cy="extra-ingredient-btn"]', "Ananas").click();
    cy.contains('[data-cy="extra-ingredient-btn"]', "Sosis").click();
    cy.contains('[data-cy="extra-ingredient-btn"]', "Pepperoni").click();

    // Yeni fiyat kontrolü (85 + 20 = 105.00₺)
    cy.get(".font-bold.text-red-600").should("contain", "105.00₺");
    cy.contains("p", "Seçimler: 20₺").should("be.visible");

    // Adet artırma
    cy.get("button").contains("+").click(); // Adet: 2
    // Fiyat kontrolü (105.00₺ * 2 = 210.00₺)
    cy.get(".font-bold.text-red-600").should("contain", "210.00₺");
  });

  it("Minimum 4 malzeme kuralı hata mesajını göstermeli ve butonu devre dışı bırakmalı", () => {
    cy.contains("button", "Acıktım").click();

    // Diğer zorunlu alanları doldurarak sadece minimum ekstra malzeme kuralını aktif et
    cy.get('[data-cy="size-btn-s"]').click();
    cy.get("select").select("Orta");
    cy.get('input[type="text"]').type("Üç Malzeme");

    // 1. Durum: 0 malzeme. Buton devre dışı olmalı.
    cy.get('button[type="submit"]').should("be.disabled");
    cy.get("form").submit();
    cy.get('[data-cy="extras-min-error"]')
      .should("exist")
      .and("contain", "en az 4 ek malzeme");

    // 2. Durum: 3 malzeme seç. Hata devam etmeli.
    cy.contains('[data-cy="extra-ingredient-btn"]', "Tavuk").click();
    cy.contains('[data-cy="extra-ingredient-btn"]', "Soğan").click();
    cy.contains('[data-cy="extra-ingredient-btn"]', "Mısır").click(); // Toplam 3 malzeme

    // 3 malzeme varken tekrar submit yapın, buton hala devre dışı olmalı
    cy.get('button[type="submit"]').should("be.disabled");
    cy.get("form").submit(); // Tekrar zorla submit
    cy.get('[data-cy="extras-min-error"]').should("exist"); // Hata hala görünür olmalı

    // 3. Durum: 4. malzemeyi seç. Hata kaybolmalı ve buton aktif olmalı.
    cy.contains('[data-cy="extra-ingredient-btn"]', "Jalapeno").click(); // Toplam 4 malzeme

    cy.get('button[type="submit"]').should("not.be.disabled");
    cy.get('[data-cy="extras-min-error"]').should("not.be.visible");
  });

  // --- Maksimum Malzeme Kontrolü  ---
  it("Maksimum 10 malzeme kuralı doğru çalışmalı", () => {
    cy.contains("button", "Acıktım").click();

    // Zorunlu alanları doldur
    cy.get('[data-cy="size-btn-l"]').click();
    cy.get("select").select("Kalın");
    cy.get('input[type="text"]').type("Maksimum Test");

    // 10 malzeme seçimi
    const malzemeler = [
      "Pepperoni",
      "Sosis",
      "Kanada Jambonu",
      "Tavuk",
      "Soğan",
      "Domates",
      "Mısır",
      "Jalapeno",
      "Sarımsak",
      "Biber",
    ];
    malzemeler.forEach((item) => {
      cy.contains('[data-cy="extra-ingredient-btn"]', item).click();
    });

    // SEÇİLİ olan 10 malzemenin sayısını kontrol et
    cy.get('[data-cy="extra-ingredient-btn"].bg-yellow-400').should(
      "have.length",
      10
    );

    // 11. malzemeyi seçmeye çalış (Sucuk). Buton devre dışı olmalı.
    cy.contains('[data-cy="extra-ingredient-btn"]', "Sucuk")
      .should("have.class", "opacity-50")
      .and("be.disabled");
    cy.contains("p", "En fazla 10 malzeme seçebilirsiniz.").should("exist");
  });

  // --- Başarılı Sipariş Akışı Testi Hata Çözümü ---
  it("Geçerli sipariş sonrası '/success' sayfasına yönlendirilmeli ve veriler doğru olmalı", () => {
    const testIsim = "Birkan Sarıbacak";
    const testUrun = "Position Absolute Acı Pizza";
    const beklenenToplam = "105.00";

    // API isteği taklidi (Mocking)
    cy.intercept("POST", "https://reqres.in/api/pizza", {
      statusCode: 201,
      body: {
        id: "12345",
        isim: testIsim,
        urun_isim: testUrun,
        boyut: "L",
        hamur: "İnce",
        malzemeler: ["Domates", "Mısır", "Sosis", "Pepperoni"],
        adet: 1,
        ozel_not: "Not bırakılmadı",
        toplam: beklenenToplam,
        createdAt: "2023-10-27T10:00:00Z",
      },
    }).as("postOrder");

    // Formu doldur
    cy.get('[data-cy="pizza-card"]').contains(testUrun).click();
    cy.get('[data-cy="size-btn-l"]').click(); // data-cy ile Boyut
    cy.get("select").select("İnce");
    cy.get('input[type="text"]').type(testIsim);

    // Minimum 4 malzemeyi seç
    cy.contains('[data-cy="extra-ingredient-btn"]', "Domates").click();
    cy.contains('[data-cy="extra-ingredient-btn"]', "Mısır").click();
    cy.contains('[data-cy="extra-ingredient-btn"]', "Sosis").click();
    cy.contains('[data-cy="extra-ingredient-btn"]', "Pepperoni").click();

    // Siparişi ver
    cy.get('button[type="submit"]').click();

    // API isteğinin doğru verilerle gönderildiğini doğrula
    cy.wait("@postOrder").its("request.body").should("deep.include", {
      isim: testIsim,
      boyut: "L",
      toplam: beklenenToplam,
    });

    // Başarı sayfasına yönlendirme kontrolü
    cy.url().should("include", "/success");

    // Başarı sayfasındaki bilgilerin doğru olduğunu kontrol et
    cy.contains("h2", "SİPARİŞ ALINDI").should("be.visible");
    cy.contains("strong", testIsim).should("be.visible");
    cy.get(".border-2.border-white")
      .should("contain", "Toplam")
      .and("contain", `${beklenenToplam}₺`);
  });
});
