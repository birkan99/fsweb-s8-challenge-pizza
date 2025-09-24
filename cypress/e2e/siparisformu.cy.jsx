describe("Sipariş Akışı Testleri", () => {
  beforeEach(() => {
    // Her testten önce ana sayfaya giderek temiz bir başlangıç yap
    cy.visit("http://localhost:5173/");
    // "Position Absolute Acı Pizza" kartına tıklayarak sipariş sayfasına git
    cy.get('[data-cy="pizza-card"]')
      .contains("Position Absolute Acı Pizza")
      .click();
    cy.url().should("include", "/order/2");
  });

  it("Bir ürün seçip sipariş formunu doldurup başarılı bir şekilde sipariş vermeli", () => {
    // Sipariş formu sayfasındaki başlığın doğru olduğunu kontrol et
    cy.get("h1").should("contain", "Position Absolute Acı Pizza");

    // Boyut ve hamur seçeneklerini seç
    cy.contains("button", "M").click();
    cy.get("select").select("İnce");

    // Ek malzemelerden en az 3 adet seç
    cy.contains("button", "Domates").click();
    cy.contains("button", "Ananas").click();
    cy.contains("button", "Soğan").click();

    // Miktarı artır
    cy.get("button").contains("+").click();

    // Sipariş notu yaz
    cy.get("textarea").type("Lütfen çok acı olsun.");

    // "Sipariş Ver" butonuna tıkla
    cy.get('button[type="submit"]').click();

    // Başarılı sipariş sayfasına yönlendirildiğini kontrol et
    cy.url().should("include", "/success");

    // Başarı sayfasındaki mesajı kontrol et
    cy.get("h1").should("contain", "SİPARİŞ ALINDI");
  });

  it("10dan fazla ek malzeme seçilememeli", () => {
    // Zorunlu alanları seç
    cy.contains("button", "M").click();
    cy.get("select").select("İnce");

    // 10 adet ek malzeme seç
    const extrasToSelect = [
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
    extrasToSelect.forEach((item) => {
      cy.contains("button", item).click();
    });

    // 11. malzemenin (Ananas) devre dışı bırakıldığını doğrula
    cy.contains("button", "Ananas").should("be.disabled");
  });

  it("Boyut ve hamur seçilmeden sipariş verilememeli", () => {
    // Zorunlu alanları (boyut ve hamur) seçmeden sipariş vermeye çalış
    cy.get('button[type="submit"]').click();

    // Boyut için hata mesajının göründüğünü doğrula
    cy.contains("p", "Lütfen bir boyut seçin.");

    // Hamur için hata mesajının göründüğünü doğrula
    cy.contains("p", "Lütfen hamur kalınlığı seçin.");
  });

  it("Sipariş sonrası bilgilerin başarılı sayfada doğru gösterildiğini doğrulamalı", () => {
    // 1. Ana sayfaya git ve sipariş formuna yönlen
    cy.visit("http://localhost:5173/");
    cy.get('[data-cy="pizza-card"]')
      .contains("Position Absolute Acı Pizza")
      .click();

    // 2. Zorunlu alanları ve ekstraları seç
    cy.contains("button", "M").click();
    cy.get("select").select("İnce");

    // 3. Ek malzemelerden 2 adet seç
    cy.contains("button", "Domates").click();
    cy.contains("button", "Mısır").click();

    // 4. Miktarı artır
    cy.get("button").contains("+").click(); // Miktar 2 olacak

    // 5. Sipariş notu yaz
    const siparisNotu = "Lütfen çok fazla peynir ekleyin.";
    cy.get("textarea").type(siparisNotu);

    // 6. Siparişi ver
    cy.get('button[type="submit"]').click();

    // 7. Başarı sayfasına yönlendirildiğini kontrol et
    cy.url().should("include", "/success");

    // 8. Sipariş bilgilerini doğrula
    // Pizza adı
    cy.get("h1").should("contain", "SİPARİŞ ALINDI");
    cy.get(".font-\\[semibold\\]").should(
      "contain",
      "Position Absolute Acı Pizza"
    );

    // Boyut ve Hamur
    cy.get('p:contains("Boyut: M")').should("exist");
    cy.get('p:contains("Hamur: İnce")').should("exist");

    // Ek malzemeler
    cy.get('[data-cy="extras"]').should("contain", "Domates, Mısır");

    // Sipariş notu
    cy.get("p").should("contain", siparisNotu);

    // Fiyat
    // Fiyat hesaplaması: (85₺ (pizza) + 2 * 5₺ (ekstra)) * 2 (miktar) = 95 * 2 = 190₺
    cy.get('div:contains("Toplam:")').should("contain", "190.00₺");
  });
});
