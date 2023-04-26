import Script from "next/script";

export function Disqus() {
  return (
    <>
      <div id="disqus_thread" className="py-5 lg:py-20"></div>
      <Script
        src="https://kaorz.disqus.com/embed.js"
        data-timestamp={Date.now().toString()}
      ></Script>
    </>
  );
}
