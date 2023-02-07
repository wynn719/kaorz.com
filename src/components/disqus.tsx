import { useEffect } from "react";
import styles from "./disqus.module.css";

export function Disqus() {
  useEffect(() => {
    const d = document,
      s = d.createElement("script");
    s.src = "https://kaorz.disqus.com/embed.js";
    s.setAttribute("data-timestamp", Date.now().toString());
    (d.head || d.body).appendChild(s);
  }, []);

  return <div id="disqus_thread" className={styles.disqus_thread}></div>;
}
