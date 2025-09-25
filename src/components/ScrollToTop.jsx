import { useEffect } from "react";
import { withRouter } from "react-router-dom";

function scrollAllToTop() {
  try {
    window.scrollTo(0, 0);
    if (document.scrollingElement) document.scrollingElement.scrollTop = 0;
    document.documentElement.scrollTop = 0;
    document.body.scrollTop = 0;
    const root = document.getElementById("root");
    if (root) root.scrollTop = 0;
    const candidates = Array.from(document.querySelectorAll("*"))
      .filter((el) => {
        const style = window.getComputedStyle(el);
        const overflowY = (style.overflowY || style.overflow).toLowerCase();
        return (
          (overflowY === "auto" || overflowY === "scroll") &&
          el.scrollHeight > el.clientHeight
        );
      })
      .slice(0, 30);
    candidates.forEach((el) => {
      el.scrollTop = 0;
    });
  } catch (err) {
    console.warn("scrollAllToTop error:", err);
  }
}

function ScrollToTop({ history }) {
  useEffect(() => {
    if ("scrollRestoration" in window.history) {
      window.history.scrollRestoration = "manual";
    }
    requestAnimationFrame(() => {
      setTimeout(scrollAllToTop, 0);
    });

    const unlisten = history.listen(() => {
      requestAnimationFrame(() => setTimeout(scrollAllToTop, 0));
    });

    return () => {
      if (unlisten) unlisten();
    };
  }, [history]);

  return null;
}

export default withRouter(ScrollToTop);
