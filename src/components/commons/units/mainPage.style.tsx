import styled from "@emotion/styled";

// ─── 전체 컨테이너 ─────────────────────────────
export const Container = styled.div<{ gradient: string }>`
  min-height: 100vh;
  background: linear-gradient(135deg, ${(props) => props.gradient});
  font-family: "Pretendard", sans-serif;
`;

// ─── Top App Bar ─────────────────────────────
export const TopAppBar = styled.div`
  background: rgba(255, 255, 255, 0.9);
  backdrop-filter: blur(10px);
  border-bottom: 1px solid rgba(0, 0, 0, 0.1);
  position: sticky;
  top: 0;
  z-index: 100;
`;

export const AppBarContent = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 16px 20px;
  max-width: 1200px;
  margin: 0 auto;
`;

export const AppIcon = styled.div<{ accentBg: string; accentText: string }>`
  height: 40px;
  width: 40px;
  border-radius: 16px;
  display: grid;
  place-items: center;
  background: ${(props) => props.accentBg};
  color: ${(props) => props.accentText};
`;

export const AppInfo = styled.div`
  flex: 1;
  text-align: center;
`;

export const AppTitle = styled.h1`
  margin: 0;
  font-size: 18px;
  font-weight: 600;
  color: #1f2937;
`;

export const AppSubtitle = styled.p`
  margin: 4px 0 0 0;
  font-size: 14px;
  color: #6b7280;
`;

export const ColorwaySelect = styled.select`
  display: none;
  font-size: 14px;
  border-radius: 12px;
  border: 1px solid #d1d5db;
  background: white;
  padding: 4px 8px;

  @media (min-width: 640px) {
    display: block;
  }
`;

export const DateDisplay = styled.div`
  display: none;
  align-items: center;
  gap: 8px;
  font-size: 14px;
  color: #6b7280;

  @media (min-width: 640px) {
    display: flex;
  }
`;

// ─── Content ─────────────────────────────
export const ContentWrapper = styled.div`
  max-width: 1280px;
  margin: 0 auto;
  padding: 0 16px 40px 16px;
  padding-top: 24px;
`;

export const StreakRow = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 12px;
  margin-bottom: 16px;

  @media (min-width: 640px) {
    grid-template-columns: repeat(3, 1fr);
  }
`;

export const StreakCard = styled.div<{ ring: string; bg?: string }>`
  padding: 16px;
  border-radius: 16px;
  border: 1px solid ${(props) => props.ring};
  background: ${(props) => props.bg || "rgba(255, 255, 255, 0.7)"};
`;

export const StreakLabel = styled.div`
  font-size: 12px;
  color: #6b7280;
`;

export const StreakValue = styled.div`
  margin-top: 4px;
  display: flex;
  align-items: end;
  gap: 8px;
`;

export const StreakNumber = styled.div`
  font-size: 24px;
  font-weight: 600;
`;

export const StreakUnit = styled.div`
  font-size: 12px;
  color: #6b7280;
`;

export const ProgressBar = styled.div`
  margin-top: 8px;
  height: 8px;
  width: 100%;
  background: rgba(209, 213, 219, 0.6);
  border-radius: 9999px;
  overflow: hidden;
`;

export const ProgressFill = styled.div<{ button: string; buttonHover: string }>`
  height: 100%;
  width: 66.666667%;
  background: ${(props) => props.button};
  transition: all 0.3s ease;

  &:hover {
    background: ${(props) => props.buttonHover};
  }
`;

export const MainLayout = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: 24px;
  // margin-top: 16px;

  @media (min-width: 1024px) {
    grid-template-columns: 240px 1fr;
  }
`;

export const Sidebar = styled.aside`
  @media (min-width: 1024px) {
    position: sticky;
    top: 64px;
    height: fit-content;
  }
`;

export const MainContent = styled.main`
  display: flex;
  flex-direction: column;
  gap: 24px;
`;

// ─── Cards ─────────────────────────────
export const Card = styled.div`
  border-radius: 16px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
  background: rgba(255, 255, 255, 0.7);
  overflow: hidden;
`;

export const CardHeader = styled.div`
  padding: 16px 16px 8px 16px;
`;

export const CardTitle = styled.h3<{ size?: "sm" | "base" }>`
  font-weight: 600;
  letter-spacing: -0.025em;
  color: #111827;
  margin: 0;
  font-size: ${(props) => (props.size === "sm" ? "14px" : "16px")};
`;

export const CardContent = styled.div`
  padding: 8px 16px 16px 16px;
`;

// ─── Navigation ─────────────────────────────
export const NavItem = styled.button<{ isActive: boolean }>`
  width: 100%;
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 8px 12px;
  border-radius: 12px;
  font-size: 14px;
  border: none;
  background: ${(props) =>
    props.isActive ? "rgba(255, 255, 255, 0.9)" : "transparent"};
  box-shadow: ${(props) =>
    props.isActive ? "0 1px 3px rgba(0, 0, 0, 0.1)" : "none"};
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    background: rgba(255, 255, 255, 0.6);
  }
`;

export const NavIcon = styled.span<{ accentText: string }>`
  color: ${(props) => props.accentText};
`;

export const NavLabel = styled.span`
  flex: 1;
  text-align: left;
`;

export const NavArrow = styled.div`
  width: 16px;
  height: 16px;
  opacity: 0.5;
`;

// ─── Section ─────────────────────────────
export const SectionTitle = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
`;

export const SectionIcon = styled.div<{ accentBg: string; accentText: string }>`
  height: 40px;
  width: 40px;
  border-radius: 16px;
  display: grid;
  place-items: center;
  background: ${(props) => props.accentBg};
  color: ${(props) => props.accentText};
`;

export const SectionText = styled.div``;

export const SectionHeading = styled.h2`
  font-weight: 600;
  letter-spacing: -0.025em;
  color: #111827;
  margin: 0;
`;

export const SectionSubtitle = styled.p`
  font-size: 14px;
  color: #6b7280;
  margin: 0;
`;

// ─── Form Elements ─────────────────────────────
export const Input = styled.input`
  width: 100%;
  padding: 8px 12px;
  border: 1px solid #d1d5db;
  border-radius: 12px;
  font-size: 14px;
  background: white;

  &:focus {
    outline: none;
    border-color: #3b82f6;
    box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
  }
`;

export const Textarea = styled.textarea`
  width: 100%;
  padding: 8px 12px;
  border: 1px solid #d1d5db;
  border-radius: 12px;
  font-size: 14px;
  background: white;
  resize: vertical;

  &:focus {
    outline: none;
    border-color: #3b82f6;
    box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
  }
`;

export const Button = styled.button<{
  variant?: "primary" | "secondary";
  theme: any;
}>`
  padding: 8px 16px;
  border-radius: 12px;
  font-size: 14px;
  font-weight: 500;
  border: none;
  cursor: pointer;
  transition: all 0.2s ease;
  display: inline-flex;
  align-items: center;
  gap: 4px;

  ${(props) =>
    props.variant === "primary"
      ? `
    background: ${props.theme.button};
    color: white;
    
    &:hover {
      background: ${props.theme.buttonHover};
    }
  `
      : `
    background: ${props.theme.chip};
    color: #374151;
    
    &:hover {
      background: ${props.theme.chip.replace("50", "100")};
    }
  `}
`;

export const Badge = styled.span<{ variant?: "secondary"; theme: any }>`
  display: inline-flex;
  align-items: center;
  padding: 4px 12px;
  border-radius: 9999px;
  font-size: 12px;
  font-weight: 500;
  background: ${(props) => props.theme.chip};
  color: #374151;
`;

export const Separator = styled.div`
  height: 1px;
  background: #e5e7eb;
  margin: 12px 0;
`;

export const Switch = styled.input`
  appearance: none;
  width: 44px;
  height: 24px;
  background: #d1d5db;
  border-radius: 12px;
  position: relative;
  cursor: pointer;
  transition: background 0.2s ease;

  &:checked {
    background: #3b82f6;
  }

  &::before {
    content: "";
    position: absolute;
    top: 2px;
    left: 2px;
    width: 20px;
    height: 20px;
    background: white;
    border-radius: 50%;
    transition: transform 0.2s ease;
  }

  &:checked::before {
    transform: translateX(20px);
  }
`;

// ─── Bottom Navigation ─────────────────────────────
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

export const BottomNavItem = styled.button<{
  isActive: boolean;
  accentText: string;
}>`
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 8px 0;
  color: ${(props) => (props.isActive ? props.accentText : "#6b7280")};
  border: none;
  background: transparent;
  cursor: pointer;
`;

export const BottomNavIcon = styled.div`
  width: 20px;
  height: 20px;
  margin-bottom: 4px;
`;

export const BottomNavLabel = styled.span`
  font-size: 12px;
`;

// ─── Floating Action Button ─────────────────────────────
export const Fab = styled.button<{ theme: any }>`
  display: none;
  position: fixed;
  bottom: 56px;
  right: 16px;
  height: 56px;
  width: 56px;
  border-radius: 50%;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  background: ${(props) => props.theme.button};
  color: white;
  border: none;
  cursor: pointer;
  display: grid;
  place-items: center;
  z-index: 40;

  &:hover {
    background: ${(props) => props.theme.buttonHover};
  }

  @media (max-width: 639px) {
    display: grid;
  }
`;
