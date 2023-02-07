import Link from "next/link";
import { useRouter } from "next/router";
import classNames from "classnames";
import styles from "./navigation.module.css";

export function Navigation() {
  const router = useRouter();
  const navigation = [
    {
      name: "Home",
      path: "/posts",
    },
    // {
    //   name: "Tech",
    //   path: "/posts/tech",
    // },
    // {
    //   name: "Life",
    //   path: "/posts/life",
    // },
    // {
    //   name: "Tags",
    //   path: "/tags",
    // },
    {
      name: "Abort Me",
      path: "/about",
    },
  ];

  return (
    <ul className={styles["main-nav"]}>
      {navigation.map((n) => (
        <li className={classNames([styles["nav-item"]])} key={n.name}>
          <Link
            className={classNames([
              styles["nav-item-link"],
              n.path === router.pathname ? styles["nav-item-selected"] : null,
            ])}
            href={n.path}
            title={n.name}
          >
            {n.name}
          </Link>
        </li>
      ))}
    </ul>
  );
}
