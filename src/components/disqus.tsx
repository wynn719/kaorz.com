import Script from "next/script";
import styles from "./disqus.module.css";

export function Disqus() {
  return (
    <>
      <div id="disqus_thread" className={styles["disqus_thread"]}></div>
      <Script
        src="https://kaorz.disqus.com/embed.js"
        data-timestamp={Date.now().toString()}
      ></Script>
    </>
  );
}
