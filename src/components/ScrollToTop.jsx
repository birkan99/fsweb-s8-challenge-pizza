import { useEffect } from "react";
import { withRouter } from "react-router-dom";

function scrollAllToTop() {
  try {
    // window / document
    window.scrollTo(0, 0);
    if (document.scrollingElement) document.scrollingElement.scrollTop = 0;
    document.documentElement.scrollTop = 0;
    document.body.scrollTop = 0;

    // root container (create-react-app gibi projelerde)
    const root = document.getElementById("root");
    if (root) root.scrollTop = 0;

    // olası scrollable elementleri bulup top'la
    const candidates = Array.from(document.querySelectorAll("*")).filter((el) => {
      const style = window.getComputedStyle(el);
      const overflowY = (style.overflowY || style.overflow).toLowerCase();
      // sadece "auto" veya "scroll" olan ve içeriği taşanları al
      return (overflowY === "auto" || overflowY === "scroll") && el.scrollHeight > el.clientHeight;
    }).slice(0, 30); // performans için en fazla 30 eleman
    candidates.forEach((el) => { el.scrollTop = 0; });
  } catch (err) {
    // hata olsa da uygulama bozulmasın
    console.warn("scrollAllToTop error:", err);
  }
}

function ScrollToTop({ history }) {
  useEffect(() => {
    // Tarayıcının otomatik scroll-restoration'ını devre dışı bırak (SPA için iyi)
    if ("scrollRestoration" in window.history) {
      window.history.scrollRestoration = "manual";
    }

    // İlk mount'ta bir kere kaydır
    requestAnimationFrame(() => {
      setTimeout(scrollAllToTop, 0);
    });

    // route değişimlerinde çalıştır
    const unlisten = history.listen(() => {
      // render tamamlanana kadar küçük bir gecikme bırak
      requestAnimationFrame(() => setTimeout(scrollAllToTop, 0));
    });

    return () => {
      if (unlisten) unlisten();
    };
  }, [history]);

  return null;
}

export default withRouter(ScrollToTop);
