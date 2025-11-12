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

// Content Wrapper
export const ContentWrapper = styled.div`
  max-width: 800px;
  margin: 0 auto;
  padding: 24px 20px;
`;

// Profile Section
export const ProfileSection = styled.div`
  background: white;
  border-radius: 16px;
  padding: 24px;
  margin-bottom: 24px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
  border: 1px solid rgba(0, 0, 0, 0.05);
`;

export const ProfileHeader = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;
  // margin-bottom: 20px;
`;

export const ProfileAvatar = styled.div<{ bgColor: string; textColor: string }>`
  width: 64px;
  height: 64px;
  border-radius: 50%;
  background: ${(props) => props.bgColor};
  color: ${(props) => props.textColor};
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 24px;
  font-weight: 600;
`;

export const ProfileInfo = styled.div``;

export const ProfileName = styled.h2`
  margin: 0 0 4px 0;
  font-size: 20px;
  font-weight: 600;
  color: #1f2937;
  margin-bottom: 2vh;
`;

export const ProfileEmail = styled.p`
  margin: 0;
  font-size: 14px;
  color: #6b7280;
`;

export const ProfileStats = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 16px;
  margin-top: 16px;
`;

export const StatItem = styled.div`
  text-align: center;
  padding: 16px;
  background: #f9fafb;
  border-radius: 12px;
`;

export const StatNumber = styled.div`
  font-size: 24px;
  font-weight: 700;
  color: #1f2937;
  margin-bottom: 4px;
`;

export const StatLabel = styled.div`
  font-size: 12px;
  color: #6b7280;
  font-weight: 500;
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

// Settings Section
export const SettingItem = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 16px 0;
  border-bottom: 1px solid #f3f4f6;

  &:last-child {
    border-bottom: none;
  }
`;

export const SettingInfo = styled.div`
  flex: 1;
`;

export const SettingLabel = styled.div`
  font-size: 14px;
  font-weight: 500;
  color: #1f2937;
  margin-bottom: 4px;
`;

export const SettingDescription = styled.div`
  font-size: 12px;
  color: #6b7280;
`;

// Switch Component
export const Switch = styled.label`
  position: relative;
  display: inline-block;
  width: 44px;
  height: 24px;
  cursor: pointer;

  input {
    opacity: 0;
    width: 0;
    height: 0;
  }

  span {
    position: absolute;
    cursor: pointer;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: #d1d5db;
    transition: 0.4s;
    border-radius: 24px;

    &:before {
      position: absolute;
      content: "";
      height: 18px;
      width: 18px;
      left: 3px;
      bottom: 3px;
      background-color: white;
      transition: 0.4s;
      border-radius: 50%;
    }
  }

  input:checked + span {
    background-color: #16a34a;
  }

  input:checked + span:before {
    transform: translateX(20px);
  }
`;

// Select Component
export const Select = styled.select`
  padding: 8px 12px;
  border: 1px solid #d1d5db;
  border-radius: 8px;
  font-size: 14px;
  background: white;
  color: #374151;
  cursor: pointer;

  &:focus {
    outline: none;
    border-color: #16a34a;
    box-shadow: 0 0 0 3px rgba(22, 164, 74, 0.1);
  }
`;

// Button Components
export const Button = styled.button<{
  bgColor: string;
  hoverColor: string;
  variant?: "primary" | "secondary";
}>`
  padding: 12px 20px;
  border-radius: 12px;
  font-size: 14px;
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

// Calendar Component
export const Calendar = styled.div`
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  gap: 4px;
  margin-top: 16px;
`;

export const CalendarHeader = styled.div`
  text-align: center;
  font-size: 12px;
  font-weight: 600;
  color: #6b7280;
  padding: 8px 0;
`;

export const CalendarDay = styled.div<{ hasRecord?: boolean }>`
  aspect-ratio: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 12px;
  border-radius: 4px;
  background: ${(props) => (props.hasRecord ? "#16a34a" : "transparent")};
  color: ${(props) => (props.hasRecord ? "white" : "#374151")};
  font-weight: ${(props) => (props.hasRecord ? "600" : "400")};
`;

// Chart Component
export const ChartContainer = styled.div`
  height: 200px;
  background: #f9fafb;
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #6b7280;
  font-size: 14px;
`;

// Goal Section
export const GoalItem = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 16px;
  background: #f9fafb;
  border-radius: 12px;
  margin-bottom: 12px;
`;

export const GoalIcon = styled.div<{ bgColor: string; textColor: string }>`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background: ${(props) => props.bgColor};
  color: ${(props) => props.textColor};
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 16px;
`;

export const GoalInfo = styled.div`
  flex: 1;
`;

export const GoalTitle = styled.div`
  font-size: 14px;
  font-weight: 600;
  color: #1f2937;
  margin-bottom: 4px;
`;

export const GoalProgress = styled.div`
  font-size: 12px;
  color: #6b7280;
`;

export const ProgressBar = styled.div`
  width: 100%;
  height: 4px;
  background: #e5e7eb;
  border-radius: 2px;
  margin-top: 8px;
  overflow: hidden;
`;

export const ProgressFill = styled.div<{ progress: number; bgColor: string }>`
  height: 100%;
  width: ${(props) => props.progress}%;
  background: ${(props) => props.bgColor};
  transition: width 0.3s ease;
`;

// Template Section
export const TemplateItem = styled.div`
  padding: 16px;
  border: 1px solid #e5e7eb;
  border-radius: 12px;
  margin-bottom: 12px;
  cursor: pointer;
  transition: all 0.2s;

  &:hover {
    border-color: #16a34a;
    background: #f0fdf4;
  }
`;

export const TemplateTitle = styled.div`
  font-size: 14px;
  font-weight: 600;
  color: #1f2937;
  margin-bottom: 4px;
`;

export const TemplateDescription = styled.div`
  font-size: 12px;
  color: #6b7280;
`;

// Separator
export const Separator = styled.div`
  height: 1px;
  background: #e5e7eb;
  margin: 16px 0;
`;
