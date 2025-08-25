import { Global, css } from "@emotion/react";
import styled from "@emotion/styled";
import { useEffect } from "react";
import { getAccessToken } from "../../../../commons/libraries/token";
import { useRouter } from "next/router";
import { useRecoilValue } from "recoil";
import { accessTokenState, authCheckedState } from "../../../../commons/stores";
import Link from "next/link";

// Global 스타일로 @font-face 정의 및 적용 클래스 생성
const navGlobalStyles = css`
  @font-face {
    font-family: "KBO Dia Gothic Light";
    src: url("/fonts/KBO-Dia-Gothic_light.woff") format("woff");
    font-weight: 300;
    font-style: normal;
  }
  .kbo-font {
    font-family: "KBO Dia Gothic Light", sans-serif !important;
  }
`;

// ─── Guardrail Diary 하단 네비게이션 ─────────────────────────────
export const BottomNav = styled.nav`
  display: none;
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  border-top: 1px solid #e5e7eb;
  background: rgba(255, 255, 255, 0.9);
  backdrop-filter: blur(8px);
  z-index: 40;

  @media (max-width: 639px) {
    display: block;
  }
`;

export const BottomNavContent = styled.div`
  max-width: 1280px;
  margin: 0 auto;
  padding: 0 8px;
  display: flex;
  align-items: center;
`;

export const BottomNavItem = styled.a<{
  isActive: boolean;
  accentText: string;
}>`
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 12px 0;
  color: ${(props) => (props.isActive ? props.accentText : "#6b7280")};
  border: none;
  background: transparent;
  cursor: pointer;
  text-decoration: none;
`;

export const BottomNavIcon = styled.div`
  width: 20px;
  height: 20px;
  margin-bottom: 4px;
`;

export const BottomNavLabel = styled.span`
  font-size: 12px;
`;

// 아이콘 컴포넌트들
const ListTodoIcon = () => <span>📝</span>;
const BrainIcon = () => <span>🧠</span>;
const NotebookPenIcon = () => <span>✏️</span>;
const AnchorIcon = () => <span>🍇</span>;
const UserIcon = () => <span>👤</span>;

interface NavigationProps {
  nav: "entry" | "todo" | "pavlov" | "daily" | "infusion" | "my";
  setNav: (
    nav: "entry" | "todo" | "pavlov" | "daily" | "infusion" | "my"
  ) => void;
  theme: any;
}

export default function LayoutNavigation({
  nav,
  setNav,
  theme,
}: NavigationProps) {
  const router = useRouter();

  useEffect(() => {
    const token = getAccessToken();
    console.log("현재 inMemoryAccessToken:", token);
  }, []);

  const token = useRecoilValue(accessTokenState);
  const checked = useRecoilValue(authCheckedState);

  return (
    <>
      <Global styles={navGlobalStyles} />

      {/* Guardrail Diary 하단 네비게이션 */}
      <BottomNav>
        <BottomNavContent>
          <Link href="/todoList" passHref>
            <BottomNavItem
              isActive={nav === "todo"}
              accentText={theme.accentText}
              onClick={() => setNav("todo")}
            >
              <BottomNavIcon>
                <ListTodoIcon />
              </BottomNavIcon>
              <BottomNavLabel>투두</BottomNavLabel>
            </BottomNavItem>
          </Link>

          <Link href="/infusion" passHref>
            <BottomNavItem
              isActive={nav === "infusion"}
              accentText={theme.accentText}
              onClick={() => setNav("infusion")}
            >
              <BottomNavIcon>
                <AnchorIcon />
              </BottomNavIcon>
              <BottomNavLabel>담금주</BottomNavLabel>
            </BottomNavItem>
          </Link>

          <Link href="/guardRailList" passHref>
            <BottomNavItem
              isActive={nav === "daily"}
              accentText={theme.accentText}
              onClick={() => setNav("daily")}
            >
              <BottomNavIcon>
                <NotebookPenIcon />
              </BottomNavIcon>
              <BottomNavLabel>가드레일</BottomNavLabel>
            </BottomNavItem>
          </Link>

          <Link href="/pavlov" passHref>
            <BottomNavItem
              isActive={nav === "pavlov"}
              accentText={theme.accentText}
              onClick={() => setNav("pavlov")}
            >
              <BottomNavIcon>
                <BrainIcon />
              </BottomNavIcon>
              <BottomNavLabel>파블로프</BottomNavLabel>
            </BottomNavItem>
          </Link>

          <Link href="/mypage" passHref>
            <BottomNavItem
              isActive={nav === "my"}
              accentText={theme.accentText}
              onClick={() => setNav("my")}
            >
              <BottomNavIcon>
                <UserIcon />
              </BottomNavIcon>
              <BottomNavLabel>마이</BottomNavLabel>
            </BottomNavItem>
          </Link>
        </BottomNavContent>
      </BottomNav>
    </>
  );
}
