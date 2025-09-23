export default function Footer() {
  return (
    <footer className="bg-[#111] text-white px-20 py-10 mt-12 font-barlow">
      {/* Üst Kısım */}
      <div className="flex flex-col md:flex-row justify-between gap-10">
        {/* Sol */}
        <div className="flex-1">
          <img
            className="mb-5"
            src="/images/iteration-2-images/footer/logo-footer.svg"
            alt="Teknolojik Yemekler Logo"
          />
          <ul className="space-y-4 text-sm">
            <li className="flex items-center gap-3">
              <img
                src="/images/iteration-2-images/footer/icons/icon-1.png"
                alt=""
              />
              <span>
                341 Londonderry Road,
                <br /> Istanbul Türkiye
              </span>
            </li>
            <li className="flex items-center gap-3">
              <img
                src="/images/iteration-2-images/footer/icons/icon-2.png"
                alt=""
              />
              <a
                href="mailto:aciktim@teknolojikyemekler.com"
                className="hover:underline"
              >
                aciktim@teknolojikyemekler.com
              </a>
            </li>
            <li className="flex items-center gap-3">
              <img
                src="/images/iteration-2-images/footer/icons/icon-3.png"
                alt=""
              />
              +90 216 123 45 67
            </li>
          </ul>
        </div>

        {/* Orta */}
        <div className="flex-1">
          <h3 className="text-2xl mb-5">Hot Menu</h3>
          <ul className="space-y-2 text-sm">
            <li><a href="#" className="hover:underline">Terminal Pizza</a></li>
            <li><a href="#" className="hover:underline">5 Kişilik Hackathlon Pizza</a></li>
            <li><a href="#" className="hover:underline">useEffect Tavuklu Pizza</a></li>
            <li><a href="#" className="hover:underline">Beyaz Console Frosty</a></li>
            <li><a href="#" className="hover:underline">Testler Geçti Mutlu Burger</a></li>
            <li><a href="#" className="hover:underline">Position Absolute Acı Burger</a></li>
          </ul>
        </div>

        {/* Sağ (Instagram) */}
        <div className="flex-1">
          <h3 className="text-2xl mb-5">Instagram</h3>
          <div className="grid grid-cols-3 gap-3">
            {Array.from({ length: 6 }).map((_, i) => (
              <img
                key={i}
                src={`/images/iteration-2-images/footer/insta/li-${i}.png`}
                alt={`insta ${i}`}
                className="w-[100px] h-[80px] object-cover rounded-md"
              />
            ))}
          </div>
        </div>
      </div>

      {/* Alt Kısım */}
      <div className="mt-10 border-t border-[#333] pt-5 flex justify-between items-center text-base">
        <p>© 2023 Teknolojik Yemekler.</p>
        <i className="fa-brands fa-twitter cursor-pointer"></i>
      </div>
    </footer>
  );
}