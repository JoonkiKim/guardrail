import styled from "@emotion/styled";

// Colorway presets (다른 페이지와 동일한 스타일)
export const COLORWAYS: Record<
  string,
  {
    name: string;
    gradient: string;
    accentBg: string;
    accentText: string;
    button: string;
    buttonHover: string;
    ring: string;
    chip: string;
    emphCard: string;
  }
> = {
  forest: {
    name: "Forest",
    gradient: "#dcfce7, #fef3c7, #f5f5f4",
    accentBg: "#fef3c7",
    accentText: "#166534",
    button: "#16a34a",
    buttonHover: "#15803d",
    ring: "#bbf7d0",
    chip: "#dcfce7",
    emphCard: "rgba(220, 252, 231, 0.7)",
  },
  sunrise: {
    name: "Sunrise",
    gradient: "#fce7f3, #fef3c7, #f5f5f4",
    accentBg: "#fce7f3",
    accentText: "#be185d",
    button: "#e11d48",
    buttonHover: "#be123c",
    ring: "#fbcfe8",
    chip: "#fce7f3",
    emphCard: "rgba(252, 231, 243, 0.7)",
  },
  ocean: {
    name: "Ocean",
    gradient: "#e0f2fe, #e0e7ff, #f5f5f4",
    accentBg: "#e0e7ff",
    accentText: "#3730a3",
    button: "#4f46e5",
    buttonHover: "#4338ca",
    ring: "#c7d2fe",
    chip: "#e0e7ff",
    emphCard: "rgba(224, 242, 254, 0.7)",
  },
};

export const Container = styled.div<{ gradient: string }>`
  min-height: 100vh;
  background: linear-gradient(135deg, ${(props) => props.gradient});
  font-family: "Pretendard", sans-serif;
`;

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

export const BackButton = styled.button`
  background: none;
  border: none;
  font-size: 20px;
  color: #374151;
  cursor: pointer;
  padding: 8px;
  border-radius: 8px;
  transition: background-color 0.2s;

  &:hover {
    background-color: rgba(0, 0, 0, 0.05);
  }
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

export const ContentWrapper = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
`;

export const Card = styled.div`
  background: rgba(255, 255, 255, 0.9);
  border-radius: 16px;
  padding: 24px;
  margin-bottom: 20px;
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.1);
  backdrop-filter: blur(10px);
`;

export const CardHeader = styled.div`
  margin-bottom: 20px;
`;

export const CardTitle = styled.h2`
  margin: 0;
  font-size: 20px;
  font-weight: 600;
  color: #1f2937;
`;

export const CardContent = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

export const TitleSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

export const Title = styled.h1`
  margin: 0;
  font-size: 24px;
  font-weight: 700;
  color: #1f2937;
`;

export const CategoryBadge = styled.span<{ category: string }>`
  display: inline-block;
  padding: 4px 12px;
  border-radius: 20px;
  font-size: 12px;
  font-weight: 600;
  background: ${(props) => {
    switch (props.category) {
      case "decision":
        return "#fef3c7";
      case "stress":
        return "#fce7f3";
      case "spending":
        return "#e0e7ff";
      default:
        return "#f3f4f6";
    }
  }};
  color: ${(props) => {
    switch (props.category) {
      case "decision":
        return "#92400e";
      case "stress":
        return "#be185d";
      case "spending":
        return "#3730a3";
      default:
        return "#6b7280";
    }
  }};
`;

export const Description = styled.p`
  margin: 0;
  font-size: 16px;
  line-height: 1.6;
  color: #374151;
  padding: 16px 0;
  // border-bottom: 2px solid #e5e7eb;
  position: relative;
`;

// 시간별 생각 입력 섹션 스타일들
export const ThoughtsSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

export const ThoughtItem = styled.div<{ isExpanded?: boolean }>`
  background: rgba(255, 255, 255, 0.8);
  border-radius: 12px;
  border: 1px solid rgba(0, 0, 0, 0.1);
  overflow: hidden;
  transition: all 0.3s ease;
`;

export const ThoughtHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 16px 20px;
  cursor: pointer;
  background: rgba(255, 255, 255, 0.9);
  border-bottom: 1px solid rgba(0, 0, 0, 0.05);
  transition: background-color 0.2s;

  &:hover {
    background: rgba(255, 255, 255, 1);
  }
`;

export const ThoughtTitle = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
`;

export const ThoughtIcon = styled.div<{ bgColor: string; textColor: string }>`
  width: 32px;
  height: 32px;
  border-radius: 50%;
  background: ${(props) => props.bgColor};
  color: ${(props) => props.textColor};
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 14px;
  font-weight: 600;
`;

export const ThoughtLabel = styled.span`
  font-size: 16px;
  font-weight: 600;
  color: #1f2937;
`;

export const ThoughtArrow = styled.span<{ isExpanded: boolean }>`
  font-size: 14px;
  color: #6b7280;
  transition: transform 0.3s ease;
  transform: ${(props) =>
    props.isExpanded ? "rotate(180deg)" : "rotate(0deg)"};
`;

export const ThoughtContent = styled.div<{ isExpanded: boolean }>`
  max-height: ${(props) => (props.isExpanded ? "200px" : "0")};
  overflow: hidden;
  transition: max-height 0.3s ease;
`;

export const ThoughtTextarea = styled.textarea`
  width: 100%;
  min-height: 120px;
  padding: 16px 20px;
  border: none;
  background: transparent;
  font-size: 14px;
  line-height: 1.6;
  color: #374151;
  resize: vertical;
  font-family: inherit;

  &::placeholder {
    color: #9ca3af;
  }

  &:focus {
    outline: none;
  }
`;

// 탭 스타일 (옵션 2용)
export const TabsContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

export const TabsList = styled.div`
  display: flex;
  background: rgba(255, 255, 255, 0.5);
  border-radius: 12px;
  padding: 4px;
  gap: 4px;
`;

export const Tab = styled.button<{ isActive: boolean; theme: any }>`
  flex: 1;
  padding: 12px 16px;
  border: none;
  border-radius: 8px;
  background: ${(props) =>
    props.isActive ? props.theme.button : "transparent"};
  color: ${(props) => (props.isActive ? "white" : "#6b7280")};
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s;

  &:hover {
    background: ${(props) =>
      props.isActive ? props.theme.buttonHover : "rgba(255, 255, 255, 0.5)"};
  }
`;

export const TabContent = styled.div<{ isActive: boolean }>`
  display: ${(props) => (props.isActive ? "block" : "none")};
`;

export const TabTextarea = styled.textarea`
  width: 100%;
  min-height: 150px;
  padding: 16px;
  border: 1px solid rgba(0, 0, 0, 0.1);
  border-radius: 12px;
  background: rgba(255, 255, 255, 0.8);
  font-size: 14px;
  line-height: 1.6;
  color: #374151;
  resize: vertical;
  font-family: inherit;

  &::placeholder {
    color: #9ca3af;
  }

  &:focus {
    outline: none;
    border-color: #3b82f6;
    box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
  }
`;

// 스크롤 스타일 (옵션 3용)
export const ScrollContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
  max-height: 600px;
  overflow-y: auto;
  padding-right: 8px;

  &::-webkit-scrollbar {
    width: 6px;
  }

  &::-webkit-scrollbar-track {
    background: rgba(0, 0, 0, 0.05);
    border-radius: 3px;
  }

  &::-webkit-scrollbar-thumb {
    background: rgba(0, 0, 0, 0.2);
    border-radius: 3px;
  }

  &::-webkit-scrollbar-thumb:hover {
    background: rgba(0, 0, 0, 0.3);
  }
`;

export const ScrollThoughtItem = styled.div`
  background: rgba(255, 255, 255, 0.8);
  border-radius: 12px;
  border: 1px solid rgba(0, 0, 0, 0.1);
  padding: 20px;
  transition: all 0.2s;

  &:hover {
    background: rgba(255, 255, 255, 0.9);
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  }
`;

export const ScrollThoughtHeader = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  margin-bottom: 12px;
`;

export const ScrollThoughtLabel = styled.span`
  font-size: 16px;
  font-weight: 600;
  color: #1f2937;
`;

export const ScrollThoughtTextarea = styled.textarea`
  width: 100%;
  min-height: 100px;
  padding: 12px;
  border: 1px solid rgba(0, 0, 0, 0.1);
  border-radius: 8px;
  background: rgba(255, 255, 255, 0.5);
  font-size: 14px;
  line-height: 1.6;
  color: #374151;
  resize: vertical;
  font-family: inherit;

  &::placeholder {
    color: #9ca3af;
  }

  &:focus {
    outline: none;
    border-color: #3b82f6;
    box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
  }
`;

// 버튼 스타일
export const ButtonGroup = styled.div`
  display: flex;
  gap: 12px;
  margin-top: 20px;
`;

export const Button = styled.button<{
  theme: any;
  variant?: "primary" | "secondary";
}>`
  flex: 1;
  padding: 12px 24px;
  border: none;
  border-radius: 12px;
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s;

  ${(props) =>
    props.variant === "secondary"
      ? `
        background: rgba(255, 255, 255, 0.8);
        color: #6b7280;
        border: 1px solid rgba(0, 0, 0, 0.1);
        
        &:hover {
          background: rgba(255, 255, 255, 1);
        }
      `
      : `
        background: ${props.theme.button};
        color: white;
        
        &:hover {
          background: ${props.theme.buttonHover};
          transform: translateY(-2px);
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
        }
      `}

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
    transform: none;
  }
`;

// 상태 표시
export const StatusBadge = styled.span<{ status: string }>`
  display: inline-block;
  padding: 4px 12px;
  border-radius: 20px;
  font-size: 12px;
  font-weight: 600;
  background: ${(props) => {
    switch (props.status) {
      case "숙성중":
        return "#fef3c7";
      case "수확함":
        return "#dcfce7";
      default:
        return "#f3f4f6";
    }
  }};
  color: ${(props) => {
    switch (props.status) {
      case "숙성중":
        return "#92400e";
      case "수확함":
        return "#166534";
      default:
        return "#6b7280";
    }
  }};
`;

export const DateText = styled.span`
  font-size: 14px;
  color: #6b7280;
  font-weight: 500;
`;
