import styles from "./top-down.module.css";

export function TopDown() {
  function scrollTo(top: number) {
    window.scrollTo({ top: top, behavior: "smooth" });
  }

  return (
    <div className={styles["scroll-top-down"]}>
      <div
        className={`${styles["scroll"]} ${styles["top"]}`}
        onClick={() => scrollTo(0)}
      ></div>
      <div
        className={`${styles["scroll"]} ${styles["down"]}`}
        onClick={() => scrollTo(9999)}
      ></div>
    </div>
  );
}
