import Link from "next/link";
import { useRouter } from "next/router";
import classNames from "classnames";
import {
  IcBaselineBrightnessAuto,
  IcBaselineLightMode,
  IcBaselineModeNight,
} from "@/components/icons";
import { useDark } from "@/hooks";
import { Mode } from "@/hooks/use-dark";

function ThemeButton() {
  const { mode, updateMode } = useDark();
  const props = {
    className: "text-slate-300",
    width: 20,
    height: 20,
  };
  const modes: Mode[] = ["system", "light", "dark"];

  function changeMode() {
    const idx = modes.indexOf(mode);
    const nextIdx = (idx + 1) % modes.length;
    updateMode(modes[nextIdx]);
  }

  const Icon = () => {
    if (mode === "system")
      return (
        <IcBaselineBrightnessAuto
          {...props}
          onClick={() => updateMode("system")}
        />
      );
    if (mode === "dark") return <IcBaselineModeNight {...props} />;
    if (mode === "light") return <IcBaselineLightMode {...props} />;

    return null;
  };

  return (
    <div className="mr-3" onClick={changeMode}>
      <Icon></Icon>
    </div>
  );
}

export function Navigation() {
  const router = useRouter();
  const navigation = [
    {
      name: "Home",
      path: "/posts",
    },
    {
      name: "Photos",
      path: "/photos",
    },
    {
      name: "Abort Me",
      path: "/about",
    },
  ];

  return (
    <header
      className={classNames(
        "fixed",
        "left-0",
        "right-0",
        "top-0",
        "z-10",
        "flex",
        "items-center",
        "w-full",
        "bg-[#242323]"
      )}
    >
      <ul
        className={classNames(
          "flex",
          "items-center",
          "flex-1",
          "mx-auto",
          "font-serif",
          "tracking-wide",
          "font-bold"
        )}
      >
        {navigation.map((n) => (
          <li
            className={classNames(
              "text-center",
              "px-4",
              "text-sm",
              "leading-9"
            )}
            key={n.name}
          >
            <Link
              className={classNames([
                "block",
                "transition-all",
                "active:outline-none",
                n.path === router.pathname ? "text-white" : "text-[#7e7e7e]",
              ])}
              href={n.path}
              title={n.name}
            >
              {n.name}
            </Link>
          </li>
        ))}
      </ul>
      <ThemeButton></ThemeButton>
    </header>
  );
}
