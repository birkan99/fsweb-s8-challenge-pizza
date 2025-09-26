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
    cy.get('[data-cy="pizza-card"]').should("contain","Position Absolute Acı Pizza");
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

  it("Boyut, hamur ve isim seçilmeden sipariş verilememeli", () => {
    // Bir pizza kartına tıklayarak sipariş formuna git
    cy.get('[data-cy="pizza-card"]')
      .contains("Position Absolute Acı Pizza")
      .click(); // Boyut ve Hamur seç

    cy.contains("button", "S").click();
    cy.get("select").select("İnce"); 
    cy.get('button[type="submit"]').should("be.disabled");
    cy.contains("p", "Adınız en az 3 karakter olmalıdır.").should("not.exist"); // İsim alanına 2 karakter gir
    cy.get('input[type="text"]').type("Al");
    cy.get('button[type="submit"]').should("be.disabled"); 
    cy.get('button[type="submit"]').click({ force: true });
    cy.wait(100); 
    cy.get('[data-cy="name-error"]').should("be.visible"); 
    cy.get('input[type="text"]').type("i"); 
    cy.get('button[type="submit"]').should("not.be.disabled"); 
    cy.contains("p", "Adınız en az 3 karakter olmalıdır.").should("not.exist");
  });

  // --- Başarılı Sipariş ve Bilgi Kontrolü Testi ---
  it("Formu doldurup sipariş verdiğinde başarılı sayfaya yönlendirmeli ve tüm bilgileri doğru göstermeli (İsim dahil)", () => {
    // Test için kullanılacak isim
    const testIsim = "Birkan Sarıbacak";
    const testUrun = "Position Absolute Acı Pizza";

    // API isteğini taklit et
    cy.intercept("POST", "https://reqres.in/api/pizza", {
      statusCode: 201,
      body: {
        id: "123",
        isim: testIsim, 
        urun_isim: testUrun, 
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
    cy.get('[data-cy="pizza-card"]').contains(testUrun).click();

    // Gerekli tüm alanları doldur
    cy.contains("button", "M").click();
    cy.get("select").select("İnce");
    cy.get('input[type="text"]').type(testIsim);
    cy.contains("button", "Domates").click();
    cy.contains("button", "Mısır").click();
    cy.get("button").contains("+").click();
    cy.get("textarea").type("Lütfen çok fazla peynir ekleyin.");

    // Siparişi ver
    cy.get('button[type="submit"]').click();

    // API isteğinin doğru verilerle gönderildiğini doğrula (Müşteri Adı ve Ürün Adı Kontrolü)
    cy.wait("@postOrder").its("request.body").should("deep.include", {
      isim: testIsim, // Müşteri adı kontrolü
      urun_isim: testUrun, // Ürün adı kontrolü
      adet: 2,
    });

    // Yönlendirmenin ve sayfa başlığının doğru olduğunu kontrol et
    cy.url().should("include", "/success");
    cy.contains("h2", "SİPARİŞ ALINDI").should("be.visible");

    // Başarı sayfasındaki sipariş bilgilerini doğrula
    cy.contains(".text-3xl.font-barlow-bold", testUrun).should("be.visible"); // Ürün adı
    cy.contains("strong", testIsim).should("be.visible"); // Müşteri adı
    cy.contains("p", "Boyut: M").should("be.visible");
    cy.contains("p", "Hamur: İnce").should("be.visible");
    cy.contains("p", "Ek Malzemeler:")
      .parent()
      .should("contain", "Domates, Mısır");
    cy.contains("p", "Özel Not:")
      .parent()
      .should("contain", "çok fazla peynir");

    // Toplam fiyatı doğru şekilde kontrol et
    cy.get(".border-2.border-white")
      .should("contain", "Toplam")
      .and("contain", "190.00₺");
  });
});
