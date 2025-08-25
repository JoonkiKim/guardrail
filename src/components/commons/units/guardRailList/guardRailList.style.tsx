import styled from "@emotion/styled";

export const Container = styled.div<{ gradient: string }>`
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

export const AddButton = styled.button<{ theme: any }>`
  background: ${(props) => props.theme.button};
  color: white;
  border: none;
  border-radius: 50%;
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  font-size: 18px;
  transition: all 0.2s;

  &:hover {
    background: ${(props) => props.theme.buttonHover};
    transform: translateY(-1px);
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  }

  &:active {
    transform: translateY(0);
  }
`;

export const ContentWrapper = styled.div`
  max-width: 1280px;
  margin: 0 auto;
  padding: 24px 16px 80px 16px;
`;

export const GuardRailList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

export const GuardRailCard = styled.div<{ theme: any }>`
  background: rgba(255, 255, 255, 0.8);
  border-radius: 16px;
  padding: 20px;
  cursor: pointer;
  transition: all 0.2s;
  border: 1px solid rgba(255, 255, 255, 0.3);
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 8px 24px rgba(0, 0, 0, 0.1);
    border-color: ${(props) => props.theme.ring};
  }
`;

export const CardHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 12px;
`;

export const CardDate = styled.span`
  font-size: 12px;
  color: #6b7280;
  font-weight: 500;
`;

export const CardMood = styled.span<{ theme: any }>`
  background: ${(props) => props.theme.chip};
  color: ${(props) => props.theme.accentText};
  padding: 4px 8px;
  border-radius: 12px;
  font-size: 11px;
  font-weight: 600;
`;

export const CardContent = styled.div``;

export const CardTitle = styled.h3`
  font-size: 16px;
  font-weight: 600;
  color: #111827;
  margin: 0 0 8px 0;
  line-height: 1.4;
`;

export const CardSummary = styled.p`
  font-size: 14px;
  color: #4b5563;
  line-height: 1.5;
  margin: 0 0 12px 0;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
`;

export const CardTags = styled.div`
  display: flex;
  gap: 6px;
  flex-wrap: wrap;
`;

export const Tag = styled.span<{ theme: any }>`
  background: ${(props) => props.theme.ring};
  color: ${(props) => props.theme.accentText};
  padding: 2px 8px;
  border-radius: 10px;
  font-size: 11px;
  font-weight: 500;
`;

export const EmptyState = styled.div`
  text-align: center;
  padding: 60px 20px;
`;

export const EmptyIcon = styled.div`
  font-size: 48px;
  margin-bottom: 16px;
`;

export const EmptyTitle = styled.h3`
  margin: 0 0 8px 0;
  font-size: 18px;
  font-weight: 600;
  color: #374151;
`;

export const EmptyDescription = styled.p`
  margin: 0;
  font-size: 14px;
  line-height: 1.5;
  color: #6b7280;
`;
