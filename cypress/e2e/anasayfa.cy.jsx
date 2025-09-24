describe('Ana Sayfa Testleri', () => {
  beforeEach(() => {
    cy.visit('http://localhost:5173/'); 
  });

  it('Ana sayfa başlığını ve sloganını doğru şekilde göstermeli', () => {
    // HeroBanner'daki ana başlığı data-cy niteliği ile bul ve metnini kontrol et
    cy.get('[data-cy=hero-title]').should('contain', 'Teknolojik Yemekler');
    
    // HeroBanner'daki sloganı data-cy niteliği ile bul ve metnini kontrol et
    cy.get('[data-cy=hero-slogan]').should('contain', 'KOD ACIKTIRIR');
  });

  it('Menü navigasyon butonlarının görünür olduğunu doğrula', () => {
    // nav elemanındaki tüm bağlantıların (link) sayısını kontrol et
    cy.get('nav a').should('have.length', 6);
  });
});