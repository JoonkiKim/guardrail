import { useRouter } from "next/router";

import LayoutNavigation from "./navigation";

interface ILayoutProps {
  children: JSX.Element;
  nav?: "entry" | "todo" | "pavlov" | "daily" | "infusion" | "my";
  setNav?: (
    nav: "entry" | "todo" | "pavlov" | "daily" | "infusion" | "my"
  ) => void;
  theme?: any;
}

export default function Layout(props: ILayoutProps): JSX.Element {
  const router = useRouter();
  const { pathname } = useRouter();

  console.log(router.asPath);

  // 기본값 설정
  const defaultNav = "entry";
  const defaultSetNav = () => {};
  const defaultTheme = {
    accentText: "#166534",
    button: "#16a34a",
    buttonHover: "#15803d",
  };

  return (
    <>
      <div
        style={{
          backgroundColor: "white",
          paddingBottom: "6vh", // 하단 네비게이션 높이만큼 여백 추가
        }}
      >
        {props.children}
      </div>
      <LayoutNavigation
        nav={props.nav || defaultNav}
        setNav={props.setNav || defaultSetNav}
        theme={props.theme || defaultTheme}
      />
    </>
  );
}
