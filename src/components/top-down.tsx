export function TopDown() {
  return (
    <div id="scroll-top-down">
      <div
        className="scroll top"
        onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
      ></div>
      <div
        className="scroll down"
        onClick={() =>
          window.scrollTo({ top: 9999, behavior: "smooth" })
        }
      ></div>
    </div>
  );
}
