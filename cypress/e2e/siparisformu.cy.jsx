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
    // Sayfanın yeniden yüklenmesi için tekrar ziyaret et
    cy.visit("http://localhost:5173/order/2");

    // Zorunlu alanları (boyut ve hamur) seçmeden sipariş vermeye çalış
    cy.get('button[type="submit"]').click();

    // Boyut için hata mesajının göründüğünü doğrula
    cy.get("p").should("contain", "Lütfen bir boyut seçin.");

    // Hamur için hata mesajının göründüğünü doğrula
    cy.get("p").should("contain", "Lütfen hamur kalınlığı seçin.");
  });
});
