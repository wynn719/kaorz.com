import Link from "next/link";
import { useRouter } from "next/router";
import classNames from "classnames";

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
    //   path: "/posts/tags",
    // },
    {
      name: "Abort Me",
      path: "/about",
    },
  ];

  return (
    <ul className="main-nav">
      {navigation.map((n) => (
        <li className={classNames({ selected: n.path === router.pathname })} key={n.name}>
          <Link href={n.path} title={n.name}>
            {n.name}
          </Link>
        </li>
      ))}
    </ul>
  );
}