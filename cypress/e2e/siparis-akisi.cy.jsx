describe("Tam Sipariş Akışı ve Doğrulama Testleri", () => {
  beforeEach(() => {
    cy.visit("http://localhost:5173/");
  });

  // --- Anasayfa ve Gezinme Testleri ---
  it("Anasayfa doğru başlık ve sloganı göstermeli ve navigasyon butonları çalışmalı", () => {
    // Ana sayfa başlığını ve sloganını kontrol et
    cy.get("[data-cy=hero-title]").should("contain", "Teknolojik Yemekler");
    cy.get("[data-cy=hero-slogan]")
      .should("contain", "KOD ACIKTIRIR")
      .and("contain", "PİZZA, DOYURUR");

    // Menü butonlarının görünür olduğunu doğrula
    cy.get("nav a").should("have.length", 6);
  });

  it("Menü butonları doğru ürünleri listelemeli", () => {
    // "Burger" butonuna tıkla
    cy.contains("button", "Burger").click();

    // Sadece burger ürünlerinin göründüğünü doğrula
    cy.get('[data-cy="pizza-card"]').should("have.length.at.least", 1);
    cy.get('[data-cy="pizza-card"]').should(
      "contain",
      "useEffect Tavuklu Burger"
    );

    // "Pizza" butonuna tıkla
    cy.contains("button", "Pizza").click();

    // Sadece pizza ürünlerinin göründüğünü doğrula
    cy.get('[data-cy="pizza-card"]').should("have.length.at.least", 2);
    cy.get('[data-cy="pizza-card"]').should("contain", "Terminal Pizza");
    cy.get('[data-cy="pizza-card"]').should(
      "contain",
      "Position Absolute Acı Pizza"
    );
  });

  // --- Sipariş Formu ve Fiyat Testleri ---
  it("Acıktım butonu ve pizza kartı sipariş formuna yönlendirmeli ve formdaki fiyat doğru hesaplanmalı", () => {
    // "Acıktım" butonuyla sipariş sayfasına git
    cy.contains("button", "Acıktım").click();
    cy.url().should("include", "/order/2");

    // Fiyat güncellemelerini kontrol et
    cy.contains("button", "M").click();
    cy.get("select").select("İnce");

    // Başlangıç fiyatını al
    cy.get(".font-bold.text-red-600").should("contain", "85.00₺");

    // 2 ek malzeme seç ve fiyatı kontrol et
    cy.contains("button", "Domates").click();
    cy.contains("button", "Ananas").click();
    cy.get(".font-bold.text-red-600").should("contain", "95.00₺");

    // Miktar artırıp fiyatı kontrol et
    cy.get("button").contains("+").click();
    cy.get(".font-bold.text-red-600").should("contain", "190.00₺");
  });

  it("Boyut ve hamur seçilmeden sipariş verilememeli", () => {
    // Bir pizza kartına tıklayarak sipariş formuna git
    cy.get('[data-cy="pizza-card"]')
      .contains("Position Absolute Acı Pizza")
      .click();

    // Zorunlu alanlar seçilmediği için butonun devre dışı olduğunu doğrula
    cy.get('button[type="submit"]').should("be.disabled");

    // Boyut seç, buton hala devre dışı olmalı
    cy.contains("button", "S").click();
    cy.get('button[type="submit"]').should("be.disabled");

    // Hamur seç, buton artık etkinleşmeli
    cy.get("select").select("İnce");
    cy.get('button[type="submit"]').should("not.be.disabled");
  });

  // --- Başarılı Sipariş ve Bilgi Kontrolü Testi ---
  it("Formu doldurup sipariş verdiğinde başarılı sayfaya yönlendirmeli ve tüm bilgileri doğru göstermeli", () => {
    // API isteğini taklit et
    cy.intercept("POST", "https://reqres.in/api/pizza", {
      statusCode: 201,
      body: {
        id: "123",
        isim: "Position Absolute Acı Pizza",
        boyut: "M",
        hamur: "İnce",
        malzemeler: ["Domates", "Mısır"],
        adet: 2,
        ozel_not: "Lütfen çok fazla peynir ekleyin.",
        toplam: "190.00",
        createdAt: "2023-10-27T10:00:00Z",
      },
    }).as("postOrder");

    // Bir pizza kartına tıklayarak sipariş formuna git
    cy.get('[data-cy="pizza-card"]')
      .contains("Position Absolute Acı Pizza")
      .click();

    // Gerekli tüm alanları doldur
    cy.contains("button", "M").click();
    cy.get("select").select("İnce");
    cy.contains("button", "Domates").click();
    cy.contains("button", "Mısır").click();
    cy.get("button").contains("+").click();
    cy.get("textarea").type("Lütfen çok fazla peynir ekleyin.");

    // Siparişi ver
    cy.get('button[type="submit"]').click();

    // API isteğinin doğru verilerle gönderildiğini doğrula
    cy.wait("@postOrder").its("request.body").should("deep.include", {
      isim: "Position Absolute Acı Pizza",
      adet: 2,
    });

    // Yönlendirmenin ve sayfa başlığının doğru olduğunu kontrol et
    cy.url().should("include", "/success");
    cy.contains("h2", "SİPARİŞ ALINDI").should("be.visible");

    // Başarı sayfasındaki sipariş bilgilerini doğrula
    cy.contains("p", "Boyut: M").should("be.visible");
    cy.contains("p", "Hamur: İnce").should("be.visible");
    cy.contains("p", "Ek Malzemeler:")
      .parent()
      .should("contain", "Domates, Mısır");

    // Toplam fiyatı doğru şekilde kontrol et
    cy.get(".border-2.border-white")
      .should("contain", "Toplam")
      .and("contain", "190.00₺");
  });
});
