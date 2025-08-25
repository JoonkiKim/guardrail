import styled from "@emotion/styled";

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

export const ContentWrapper = styled.div`
  max-width: 800px;
  margin: 0 auto;
  padding: 24px 20px;
`;

export const StimulusDropdown = styled.div<{ isOpen: boolean }>`
  position: relative;
  margin-bottom: 32px;
`;

export const StimulusSelector = styled.div`
  background: white;
  border: 2px solid #e5e7eb;
  border-radius: 12px;
  padding: 16px 20px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: space-between;
  transition: all 0.2s;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);

  &:hover {
    border-color: #d1d5db;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  }
`;

export const StimulusText = styled.span`
  font-size: 16px;
  font-weight: 500;
  color: #374151;
`;

export const StimulusArrow = styled.span<{ isOpen: boolean }>`
  font-size: 12px;
  color: #6b7280;
  transition: transform 0.2s;
  transform: rotate(${(props) => (props.isOpen ? "180deg" : "0deg")});
`;

export const StimulusOptions = styled.div<{ isOpen: boolean }>`
  position: absolute;
  top: 100%;
  left: 0;
  right: 0;
  background: white;
  border: 2px solid #e5e7eb;
  border-top: none;
  border-radius: 0 0 12px 12px;
  max-height: 300px;
  overflow-y: auto;
  z-index: 10;
  opacity: ${(props) => (props.isOpen ? "1" : "0")};
  visibility: ${(props) => (props.isOpen ? "visible" : "hidden")};
  transform: translateY(${(props) => (props.isOpen ? "0" : "-10px")});
  transition: all 0.2s;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
`;

export const StimulusOption = styled.div<{ isSelected: boolean }>`
  padding: 12px 20px;
  cursor: pointer;
  transition: background-color 0.2s;
  background-color: ${(props) =>
    props.isSelected ? "#f3f4f6" : "transparent"};
  font-weight: ${(props) => (props.isSelected ? "600" : "400")};
  color: ${(props) => (props.isSelected ? "#1f2937" : "#374151")};

  &:hover {
    background-color: #f9fafb;
  }

  &:first-of-type {
    border-radius: 0;
  }

  &:last-of-type {
    border-radius: 0 0 10px 10px;
  }
`;

export const ResponseList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

export const ResponseCard = styled.div<{ theme: any }>`
  background: white;
  border-radius: 16px;
  padding: 20px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
  border-left: 4px solid ${(props) => props.theme.button};
  transition: all 0.2s;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 8px 24px rgba(0, 0, 0, 0.12);
  }
`;

export const ResponseText = styled.p`
  margin: 0;
  font-size: 16px;
  line-height: 1.6;
  color: #1f2937;
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
