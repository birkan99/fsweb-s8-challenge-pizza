describe('Ek Senaryo Testleri', () => {

  // Her testten önce ana sayfayı ziyaret et
  beforeEach(() => {
    cy.visit('http://localhost:5173/');
  });

  // --- Ana Sayfa ve Gezinme Testleri ---
  it('Anasayfadaki "Acıktım" butonu sipariş sayfasına yönlendirmeli', () => {
    // HeroBanner'daki "Acıktım" butonunu bul ve tıkla
    cy.contains('button', 'Acıktım').click();
    
    // Yönlendirme URL'inin doğru olduğunu kontrol et
    cy.url().should('include', '/order/2');
    
    // Sipariş sayfasındaki pizza adının doğru olduğunu kontrol et
    cy.get('h1').should('contain', 'Position Absolute Acı Pizza');
  });

  it('Menü butonları doğru ürünleri listelemeli', () => {
    // "Pizza" butonuna tıkla
    cy.contains('button', 'Pizza').click();

    // Sadece pizza ürünlerinin göründüğünü doğrula
    // (Veri dosyanızdaki tüm pizzaların başlıklarını kontrol edebilirsiniz.)
    cy.get('[data-cy="pizza-card"]').should('have.length.at.least', 2);
    cy.get('[data-cy="pizza-card"]').should('contain', 'Terminal Pizza');
    cy.get('[data-cy="pizza-card"]').should('contain', 'Position Absolute Acı Pizza');

    // "Burger" butonuna tıkla
    cy.contains('button', 'Burger').click();
    
    // Sadece burger ürünlerinin göründüğünü doğrula
    cy.get('[data-cy="pizza-card"]').should('have.length.at.least', 1);
    cy.get('[data-cy="pizza-card"]').should('contain', 'useEffect Tavuklu Burger');
  });

  // --- Sipariş Formu Fiyat Kontrol Testi ---
  it('Formdaki fiyat ek malzeme seçimiyle güncellenmeli', () => {
    // Sipariş formuna git
    cy.get('[data-cy="pizza-card"]').contains('Position Absolute Acı Pizza').click();
    cy.url().should('include', '/order/2');
    
    // Zorunlu alanları seç
    cy.contains('button', 'M').click();
    cy.get('select').select('İnce');
    
    // Başlangıç fiyatını al (85₺)
    cy.get('.font-bold.text-red-600').should('contain', '85.00₺');
    
    // Bir ek malzeme seç (5₺) ve fiyatın güncellendiğini doğrula
    cy.contains('button', 'Domates').click();
    cy.get('.font-bold.text-red-600').should('contain', '90.00₺');

    // Bir ek malzeme daha seç (5₺) ve fiyatın güncellendiğini doğrula
    cy.contains('button', 'Ananas').click();
    cy.get('.font-bold.text-red-600').should('contain', '95.00₺');

    // Miktar artırma butonuyla fiyatın güncellendiğini doğrula
    cy.get('button').contains('+').click();
    cy.get('.font-bold.text-red-600').should('contain', '190.00₺');
  });
});