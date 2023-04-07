import classNames from "classnames";

export function TopDown() {
  function scrollTo(top: number) {
    window.scrollTo({ top: top, behavior: "smooth" });
  }

  const scrollClasses = classNames(
    "cursor-pointer",
    "border-solid",
    "border-gray-400",
    "border-[20px]",
    "transition-all"
  );

  return (
    <div
      className={classNames("fixed", "bottom-10", "right-2", "w-10", "h-20")}
    >
      <div
        className={classNames(
          scrollClasses,
          "mb-[10px]",
          "border-transparent",
          "border-b-[#ccc]",
          "hover:border-b-green"
        )}
        onClick={() => scrollTo(0)}
      ></div>
      <div
        className={classNames(
          scrollClasses,
          "border-transparent",
          "border-t-[#ccc]",
          "hover:border-t-green"
        )}
        onClick={() => scrollTo(9999)}
      ></div>
    </div>
  );
}
