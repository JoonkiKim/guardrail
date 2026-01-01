import styled from "@emotion/styled";

export const Container = styled.div<{ gradient: string }>`
  //  position: relative
  min-height: 93vh;
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

export const MonthSelector = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  cursor: pointer;
  padding: 8px 12px;
  border-radius: 8px;
  background: rgba(255, 255, 255, 0.5);
  border: 1px solid rgba(0, 0, 0, 0.1);
  position: relative;
`;

export const MonthText = styled.span`
  font-size: 16px;
  font-weight: 600;
  color: #111827;
`;

export const ArrowIcon = styled.span<{ isOpen: boolean }>`
  font-size: 14px;
  color: #6b7280;
  transition: transform 0.2s;
  transform: ${(props) => (props.isOpen ? "rotate(180deg)" : "rotate(0deg)")};
`;

export const MonthDropdown = styled.div<{ isOpen: boolean }>`
  position: absolute;
  top: 100%;
  left: 0;
  right: 0;
  background: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(0, 0, 0, 0.1);
  border-radius: 8px;
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.1);
  z-index: 1000;
  max-height: ${(props) => (props.isOpen ? "200px" : "0")};
  overflow: hidden;
  transition: all 0.2s;
  margin-top: 4px;
`;

export const MonthList = styled.div`
  padding: 8px 0;
  max-height: 200px;
  overflow-y: auto;
`;

export const MonthOption = styled.div<{ isSelected: boolean }>`
  padding: 8px 12px;
  cursor: pointer;
  font-size: 14px;
  color: ${(props) => (props.isSelected ? "#3b82f6" : "#374151")};
  font-weight: ${(props) => (props.isSelected ? "600" : "400")};
  background: ${(props) =>
    props.isSelected ? "rgba(59, 130, 246, 0.1)" : "transparent"};

  &:hover {
    background: rgba(59, 130, 246, 0.05);
  }
`;

export const ActionButtons = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
`;

export const ActionButton = styled.button`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  border: none;
  background: rgba(255, 255, 255, 0.8);
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.2s;

  &:hover {
    background: rgba(255, 255, 255, 1);
    transform: scale(1.05);
  }
`;

export const ContentWrapper = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
`;

export const EventList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 24px;
`;

export const DayGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

export const DayHeader = styled.div<{ isToday?: boolean }>`
  display: flex;
  align-items: center;
  gap: 12px;
  margin-bottom: 8px;
`;

export const DayCircle = styled.div<{ isToday?: boolean }>`
  width: 48px;
  height: 48px;
  border-radius: 50%;
  background: ${(props) =>
    props.isToday ? "#3b82f6" : "rgba(255, 255, 255, 0.8)"};
  color: ${(props) => (props.isToday ? "white" : "#374151")};
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  font-weight: 600;
  box-shadow: ${(props) =>
    props.isToday
      ? "0 4px 12px rgba(59, 130, 246, 0.3)"
      : "0 2px 8px rgba(0, 0, 0, 0.1)"};
`;

export const DayName = styled.span`
  font-size: 12px;
  font-weight: 500;
`;

export const DayNumber = styled.span`
  font-size: 16px;
  font-weight: 700;
`;

export const DayInfo = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2px;
`;

export const DayLabel = styled.span`
  font-size: 14px;
  font-weight: 600;
  color: #111827;
`;

export const DayDate = styled.span`
  font-size: 12px;
  color: #6b7280;
`;

export const EventCard = styled.div<{
  backgroundColor?: string;
  borderColor?: string;
  isWide?: boolean;
}>`
  background: ${(props) => props.backgroundColor || "rgba(255, 255, 255, 0.9)"};
  border: ${(props) =>
    props.borderColor
      ? `1px solid ${props.borderColor}`
      : "1px solid rgba(0, 0, 0, 0.1)"};
  border-radius: 12px;
  padding: 16px;
  display: flex;
  align-items: center;
  gap: 12px;
  cursor: pointer;
  transition: all 0.2s;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
  width: ${(props) => (props.isWide ? "100%" : "auto")};

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 16px rgba(0, 0, 0, 0.1);
  }
`;

export const EventIcon = styled.div<{
  backgroundColor?: string;
  color?: string;
}>`
  width: 32px;
  height: 32px;
  border-radius: 50%;
  background: ${(props) => props.backgroundColor || "#f3f4f6"};
  color: ${(props) => props.color || "#374151"};
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 600;
  font-size: 14px;
  flex-shrink: 0;
`;

export const EventContent = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 4px;
`;

export const EventTitle = styled.span`
  font-size: 14px;
  font-weight: 600;
  color: #111827;
  line-height: 1.4;
`;

export const EventTime = styled.span`
  font-size: 12px;
  color: #6b7280;
  font-weight: 500;
`;

export const EventDescription = styled.div`
  font-size: 12px;
  color: #6b7280;
  margin-top: 4px;
`;

export const WeekSeparator = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  margin: 32px 0 16px;
  padding: 12px 16px;
  background: rgba(255, 255, 255, 0.5);
  border-radius: 8px;
  border: 1px solid rgba(0, 0, 0, 0.1);
`;

export const SeparatorText = styled.span`
  font-size: 12px;
  font-weight: 600;
  color: #6b7280;
  text-transform: uppercase;
  letter-spacing: 0.5px;
`;

export const SeparatorLine = styled.div`
  flex: 1;
  height: 1px;
  background: rgba(0, 0, 0, 0.1);
`;

export const FloatingActionButton = styled.button<{ theme: any }>`
  position: absolute;
  bottom: 18vh;
  /* 컨테이너의 85% 지점에 배치 (컨테이너 너비 기준) */
  right: 10%;
  width: 56px;
  height: 56px;
  border-radius: 50%;
  background: ${(props) => props.theme.button || "#16a34a"};
  border: none;
  color: white;
  font-size: 24px;
  font-weight: 600;
  cursor: pointer;
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.2);
  transition: all 0.2s;
  z-index: 1000;

  &:hover {
    transform: scale(1.1);
    box-shadow: 0 6px 20px rgba(0, 0, 0, 0.3);
  }

  /* 모바일에서는 오른쪽 여백 유지 */
  @media (max-width: 768px) {
    right: 24px;
  }
`;

export const EmptyState = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 60px 20px;
  text-align: center;
  color: #6b7280;
`;

export const EmptyIcon = styled.div`
  font-size: 48px;
  margin-bottom: 16px;
  opacity: 0.5;
`;

export const EmptyTitle = styled.h3`
  font-size: 18px;
  font-weight: 600;
  margin: 0 0 8px 0;
  color: #374151;
`;

export const EmptyDescription = styled.p`
  font-size: 14px;
  margin: 0;
  line-height: 1.5;
`;
