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
// 에러 메시지 컴포넌트
export const ErrorMessage = styled.div`
  color: #ef4444;
  font-size: 12px;
  margin-top: 4px;
  font-weight: 500;
  line-height: 1.4;
`;
// Container
export const Container = styled.div<{ gradient: string }>`
  min-height: 93vh;
  background: linear-gradient(135deg, ${(props) => props.gradient});
  font-family: "Pretendard", sans-serif;
`;

// Top App Bar
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

// Content Wrapper
export const ContentWrapper = styled.div`
  max-width: 800px;
  margin: 0 auto;
  padding: 24px 20px;
`;

// Section Title
export const SectionTitle = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  margin-bottom: 24px;
`;

export const SectionIcon = styled.div<{ bgColor: string; textColor: string }>`
  width: 48px;
  height: 48px;
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: ${(props) => props.bgColor};
  color: ${(props) => props.textColor};
  font-size: 20px;
`;

export const SectionText = styled.div`
  h2 {
    margin: 0;
    font-size: 20px;
    font-weight: 600;
    color: #1f2937;
  }

  p {
    margin: 4px 0 0 0;
    font-size: 14px;
    color: #6b7280;
  }
`;

// Card Components
export const Card = styled.div`
  background: white;
  border-radius: 16px;
  padding: 24px;
  margin-bottom: 24px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
  border: 1px solid rgba(0, 0, 0, 0.05);
`;

export const CardHeader = styled.div`
  margin-bottom: 20px;
`;

export const CardTitle = styled.h3`
  margin: 0;
  font-size: 16px;
  font-weight: 600;
  color: #1f2937;
`;

export const CardContent = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

// Form Components
export const Input = styled.input`
  width: 100%;
  padding: 16px;
  border: 2px solid #e5e7eb;
  border-radius: 12px;
  font-size: 16px;
  background: white;
  transition: all 0.2s;
  box-sizing: border-box;

  &:focus {
    outline: none;
    border-color: #16a34a;
    box-shadow: 0 0 0 3px rgba(22, 164, 74, 0.1);
  }

  &::placeholder {
    color: #9ca3af;
  }
`;

export const Textarea = styled.textarea`
  width: 100%;
  padding: 16px;
  height: 30vh;
  border: 2px solid #e5e7eb;
  border-radius: 12px;
  font-size: 16px;
  background: white;
  resize: vertical;
  min-height: 120px;
  transition: all 0.2s;
  box-sizing: border-box;
  font-family: inherit;

  &:focus {
    outline: none;
    border-color: #16a34a;
    box-shadow: 0 0 0 3px rgba(22, 164, 74, 0.1);
  }

  &::placeholder {
    color: #9ca3af;
  }
`;

// Button Components
export const Button = styled.button<{
  bgColor: string;
  hoverColor: string;
  variant?: "primary" | "secondary";
}>`
  padding: 16px 24px;
  border-radius: 12px;
  font-size: 16px;
  font-weight: 600;
  border: none;
  cursor: pointer;
  transition: all 0.2s;
  background: ${(props) => props.bgColor};
  color: white;
  width: 100%;

  &:hover {
    background: ${(props) => props.hoverColor};
    transform: translateY(-1px);
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  }

  &:active {
    transform: translateY(0);
  }

  ${(props) =>
    props.variant === "secondary" &&
    `
    background: #f3f4f6;
    color: #374151;
    
    &:hover {
      background: #e5e7eb;
    }
  `}
`;

// Badge Components
export const Badge = styled.button<{
  bgColor: string;
  textColor: string;
  isSelected?: boolean;
  selectedBg?: string;
  selectedText?: string;
}>`
  padding: 8px 16px;
  border-radius: 20px;
  font-size: 14px;
  font-weight: 500;
  border: none;
  cursor: pointer;
  transition: all 0.2s;
  background: ${(props) =>
    props.isSelected ? props.selectedBg : props.bgColor};
  color: ${(props) =>
    props.isSelected ? props.selectedText : props.textColor};
  white-space: nowrap;

  &:hover {
    transform: translateY(-1px);
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  }
`;

// Tabs Components
export const Tabs = styled.div`
  width: 100%;
`;

export const TabsList = styled.div`
  display: flex;
  background: #f3f4f6;
  border-radius: 12px;
  padding: 4px;
  gap: 4px;
`;

export const TabsTrigger = styled.button<{ isActive: boolean }>`
  flex: 1;
  padding: 12px 16px;
  border-radius: 8px;
  font-size: 14px;
  font-weight: 500;
  border: none;
  cursor: pointer;
  transition: all 0.2s;
  background: ${(props) => (props.isActive ? "white" : "transparent")};
  color: ${(props) => (props.isActive ? "#1f2937" : "#6b7280")};
  box-shadow: ${(props) =>
    props.isActive ? "0 2px 4px rgba(0, 0, 0, 0.1)" : "none"};

  &:hover {
    background: ${(props) =>
      props.isActive ? "white" : "rgba(255, 255, 255, 0.5)"};
  }
`;

// Separator
export const Separator = styled.div`
  height: 1px;
  background: #e5e7eb;
  margin: 16px 0;
`;

// Grid Layout
export const Grid = styled.div<{ cols?: number }>`
  display: grid;
  grid-template-columns: 1fr;
  gap: 16px;

  @media (min-width: 768px) {
    grid-template-columns: repeat(${(props) => props.cols || 2}, 1fr);
  }
`;

// Infusion Item
export const InfusionItem = styled.div<{ ringColor: string }>`
  padding: 20px;
  border-radius: 12px;
  border: 1px solid ${(props) => props.ringColor};
  background: white;
  transition: all 0.2s;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 8px 24px rgba(0, 0, 0, 0.1);
  }
`;

export const InfusionHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 8px;
`;

export const InfusionTitle = styled.div`
  font-weight: 600;
  font-size: 16px;
  color: #1f2937;
`;

export const InfusionMeta = styled.div`
  font-size: 12px;
  color: #6b7280;
  margin-bottom: 12px;
`;

export const InfusionPreview = styled.p`
  font-size: 14px;
  color: #374151;
  line-height: 1.5;
  margin: 0;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
`;

// Emotion Tags Container
export const EmotionTagsContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
`;

// Time Options Container
export const TimeOptionsContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 8px;
`;

export const ReminderInfo = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 14px;
  color: #6b7280;
  margin-left: auto;
`;

// Mock Data
export const mockInfusions = [
  {
    id: 1,
    title: "이직 고민",
    status: "숙성중",
    next: "1달 뒤",
    preview:
      "지금 팀에서의 배움과 다음 단계에서 원하는 것의 교집합을 그려본다.",
  },
  {
    id: 2,
    title: "소비 패턴 점검",
    status: "숙성중",
    next: "1주 뒤",
    preview: "감정 기반 소비가 늘어난 이유를 환경/습관으로 분해한다.",
  },
  {
    id: 3,
    title: "관계 갈등",
    status: "수확함",
    next: "완료",
    preview:
      "사실-느낌-요구를 분리해 보니, 부탁을 미리 말하는 연습이 필요했다.",
  },
];

export const CardTitleWithIcon = styled.h3`
  margin: 0;
  font-size: 16px;
  font-weight: 600;
  color: #1f2937;
  display: flex;
  align-items: center;
  gap: 8px;
`;

// Category Badge
export const CategoryBadge = styled.span<{ category: string }>`
  padding: 2px 6px;
  border-radius: 8px;
  font-size: 10px;
  font-weight: 500;
  margin-left: 6px;

  ${(props) => {
    switch (props.category) {
      case "decision":
        return `
          background: #dbeafe;
          color: #1e40af;
        `;
      case "stress":
        return `
          background: #fef3c7;
          color: #92400e;
        `;
      case "spending":
        return `
          background: #dcfce7;
          color: #166534;
        `;
      default:
        return `
          background: #f3f4f6;
          color: #374151;
        `;
    }
  }}
`;

// Filter Container
export const FilterContainer = styled.div`
  display: flex;
  gap: 6px;
  margin-bottom: 16px;
  flex-wrap: wrap;
`;

export const FilterButton = styled.button<{ isActive: boolean; theme: any }>`
  padding: 6px 12px;
  border-radius: 16px;
  font-size: 12px;
  font-weight: 500;
  border: none;
  cursor: pointer;
  transition: all 0.2s;
  background: ${(props) => (props.isActive ? props.theme.button : "#f3f4f6")};
  color: ${(props) => (props.isActive ? "white" : "#374151")};
  white-space: nowrap;

  &:hover {
    transform: translateY(-1px);
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  }
`;
