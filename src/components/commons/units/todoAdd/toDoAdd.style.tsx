import styled from "@emotion/styled";

export const Container = styled.div<{ gradient: string }>`
  min-height: 100vh;
  background: linear-gradient(to bottom right, ${(props) => props.gradient});
  color: #374151;
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
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 4px;
`;

export const AppTitle = styled.h1`
  font-size: 20px;
  font-weight: 600;
  color: #111827;
  margin: 0;
`;

export const AppSubtitle = styled.p`
  font-size: 14px;
  color: #6b7280;
  margin: 0;
`;

export const BackButton = styled.button`
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
  font-size: 18px;

  &:hover {
    background: rgba(255, 255, 255, 1);
    transform: scale(1.05);
  }
`;

export const ContentWrapper = styled.div`
  max-width: 800px;
  // margin: 0 auto;
  padding: 20px;
  min-height: calc(100vh - 100px); // 상단바 높이를 뺀 최소 높이
  display: flex;
  flex-direction: column;
`;

export const FormContainer = styled.form`
  display: flex;
  flex-direction: column;
  justify-content: space-evenly; // gap 대신 space-evenly 사용
  min-height: calc(100vh - 200px); // 전체 높이에서 상단바 높이를 뺀 값
  gap: 4vh;
`;

export const FormSection = styled.div`
  background: rgba(255, 255, 255, 0.9);
  border-radius: 16px;
  padding: 24px;
  border: 1px solid rgba(0, 0, 0, 0.1);
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
`;

export const SectionTitle = styled.h3`
  font-size: 18px;
  font-weight: 600;
  color: #111827;
  margin: 0 0 16px 0;
  display: flex;
  align-items: center;
  gap: 8px;
`;

export const SectionIcon = styled.div<{ accentBg: string; accentText: string }>`
  width: 32px;
  height: 32px;
  border-radius: 50%;
  background: ${(props) => props.accentBg};
  color: ${(props) => props.accentText};
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 16px;
  font-weight: 600;
`;

export const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  margin-bottom: 16px;
`;

export const Label = styled.label`
  font-size: 14px;
  font-weight: 600;
  color: #374151;
`;

export const Input = styled.input`
  padding: 12px 16px;
  border: 1px solid rgba(0, 0, 0, 0.1);
  border-radius: 8px;
  font-size: 16px;
  background: rgba(255, 255, 255, 0.8);
  transition: all 0.2s;

  &:focus {
    outline: none;
    border-color: #3b82f6;
    box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
  }

  &::placeholder {
    color: #9ca3af;
  }
`;

export const Textarea = styled.textarea`
  padding: 12px 16px;
  border: 1px solid rgba(0, 0, 0, 0.1);
  border-radius: 8px;
  font-size: 16px;
  background: rgba(255, 255, 255, 0.8);
  resize: vertical;
  min-height: 100px;
  font-family: inherit;
  transition: all 0.2s;

  &:focus {
    outline: none;
    border-color: #3b82f6;
    box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
  }

  &::placeholder {
    color: #9ca3af;
  }
`;

export const TimeInput = styled.input`
  padding: 12px 16px;
  border: 1px solid rgba(0, 0, 0, 0.1);
  border-radius: 8px;
  font-size: 16px;
  background: rgba(255, 255, 255, 0.8);
  transition: all 0.2s;

  &:focus {
    outline: none;
    border-color: #3b82f6;
    box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
  }
`;

export const Select = styled.select`
  padding: 12px 16px;
  border: 1px solid rgba(0, 0, 0, 0.1);
  border-radius: 8px;
  font-size: 16px;
  background: rgba(255, 255, 255, 0.8);
  cursor: pointer;
  transition: all 0.2s;

  &:focus {
    outline: none;
    border-color: #3b82f6;
    box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
  }
`;

export const ButtonGroup = styled.div`
  display: flex;
  gap: 12px;
  justify-content: flex-end;
  // margin-top: 24px;
`;

export const Button = styled.button<{
  variant?: "primary" | "secondary";
  theme: any;
}>`
  padding: 12px 24px;
  border: none;
  border-radius: 8px;
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s;

  ${(props) =>
    props.variant === "secondary"
      ? `
    background: rgba(255, 255, 255, 0.8);
    color: #374151;
    border: 1px solid rgba(0, 0, 0, 0.1);
    
    &:hover {
      background: rgba(255, 255, 255, 1);
      transform: translateY(-1px);
    }
  `
      : `
    background: ${props.theme.button};
    color: white;
    
    &:hover {
      background: ${props.theme.buttonHover};
      transform: translateY(-1px);
    }
  `}
`;

export const PriorityBadge = styled.div<{ priority: string }>`
  display: inline-flex;
  align-items: center;
  gap: 4px;
  padding: 4px 8px;
  border-radius: 12px;
  font-size: 12px;
  font-weight: 600;

  ${(props) => {
    switch (props.priority) {
      case "high":
        return `
          background: rgba(239, 68, 68, 0.1);
          color: #dc2626;
        `;
      case "medium":
        return `
          background: rgba(245, 158, 11, 0.1);
          color: #d97706;
        `;
      case "low":
        return `
          background: rgba(34, 197, 94, 0.1);
          color: #16a34a;
        `;
      default:
        return `
          background: rgba(107, 114, 128, 0.1);
          color: #6b7280;
        `;
    }
  }}
`;

export const ErrorMessage = styled.div`
  color: #dc2626;
  font-size: 14px;
  margin-top: 4px;
`;

export const SuccessMessage = styled.div`
  color: #16a34a;
  font-size: 14px;
  margin-top: 4px;
`;

export const RecurringDropdown = styled.div<{ isOpen: boolean }>`
  position: relative;
  display: inline-block;
  width: 100%;
`;

export const RecurringSelector = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 12px 16px;
  border: 1px solid rgba(0, 0, 0, 0.1);
  border-radius: 8px;
  background: rgba(255, 255, 255, 0.8);
  cursor: pointer;
  transition: all 0.2s;
  font-size: 16px;

  &:hover {
    border-color: #3b82f6;
    background: rgba(255, 255, 255, 1);
  }
`;

export const RecurringText = styled.span`
  color: #374151;
`;

export const RecurringArrow = styled.span<{ isOpen: boolean }>`
  font-size: 14px;
  color: #6b7280;
  transition: transform 0.2s;
  transform: ${(props) => (props.isOpen ? "rotate(180deg)" : "rotate(0deg)")};
`;

export const RecurringOptions = styled.div<{ isOpen: boolean }>`
  position: absolute;
  top: 100%;
  left: 0;
  right: 0;
  background: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(0, 0, 0, 0.1);
  border-radius: 8px;
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.1);
  z-index: 50;
  max-height: ${(props) => (props.isOpen ? "300px" : "0")};
  overflow-y: auto;
  overflow-x: hidden;
  transition: all 0.2s;
  margin-top: 4px;

  /* 스크롤바 스타일링 */
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

export const RecurringOption = styled.div<{ isSelected: boolean }>`
  padding: 12px 16px;
  cursor: pointer;
  font-size: 16px;
  color: ${(props) => (props.isSelected ? "#3b82f6" : "#374151")};
  font-weight: ${(props) => (props.isSelected ? "600" : "400")};
  background: ${(props) =>
    props.isSelected ? "rgba(59, 130, 246, 0.1)" : "transparent"};

  &:hover {
    background: rgba(59, 130, 246, 0.05);
  }
`;

// 카테고리 드롭다운 컴포넌트들
export const CategoryDropdown = styled.div<{ isOpen: boolean }>`
  position: relative;
  display: inline-block;
  width: 100%;
`;

export const CategorySelector = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 12px 16px;
  border: 1px solid rgba(0, 0, 0, 0.1);
  border-radius: 8px;
  background: rgba(255, 255, 255, 0.8);
  cursor: pointer;
  transition: all 0.2s;
  font-size: 16px;

  &:hover {
    border-color: #3b82f6;
    background: rgba(255, 255, 255, 1);
  }
`;

export const CategoryText = styled.span`
  color: #374151;
`;

export const CategoryArrow = styled.span<{ isOpen: boolean }>`
  font-size: 14px;
  color: #6b7280;
  transition: transform 0.2s;
  transform: ${(props) => (props.isOpen ? "rotate(180deg)" : "rotate(0deg)")};
`;

export const CategoryOptions = styled.div<{ isOpen: boolean }>`
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
  max-height: ${(props) => (props.isOpen ? "300px" : "0")};
  overflow-y: auto;
  overflow-x: hidden;
  transition: all 0.2s;
  margin-top: 4px;

  /* 스크롤바 스타일링 */
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

export const CategoryOption = styled.div<{ isSelected: boolean }>`
  padding: 12px 16px;
  cursor: pointer;
  font-size: 16px;
  color: ${(props) => (props.isSelected ? "#3b82f6" : "#374151")};
  font-weight: ${(props) => (props.isSelected ? "600" : "400")};
  background: ${(props) =>
    props.isSelected ? "rgba(59, 130, 246, 0.1)" : "transparent"};

  &:hover {
    background: rgba(59, 130, 246, 0.05);
  }
`;

// 우선순위 드롭다운 컴포넌트들
export const PriorityDropdown = styled.div<{ isOpen: boolean }>`
  position: relative;
  display: inline-block;
  width: 100%;
`;

export const PrioritySelector = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 12px 16px;
  border: 1px solid rgba(0, 0, 0, 0.1);
  border-radius: 8px;
  background: rgba(255, 255, 255, 0.8);
  cursor: pointer;
  transition: all 0.2s;
  font-size: 16px;

  &:hover {
    border-color: #3b82f6;
    background: rgba(255, 255, 255, 1);
  }
`;

export const PriorityText = styled.span`
  color: #374151;
`;

export const PriorityArrow = styled.span<{ isOpen: boolean }>`
  font-size: 14px;
  color: #6b7280;
  transition: transform 0.2s;
  transform: ${(props) => (props.isOpen ? "rotate(180deg)" : "rotate(0deg)")};
`;

export const PriorityOptions = styled.div<{ isOpen: boolean }>`
  position: absolute;
  top: 100%;
  left: 0;
  right: 0;
  background: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(0, 0, 0, 0.1);
  border-radius: 8px;
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.1);
  z-index: 50;
  max-height: ${(props) => (props.isOpen ? "300px" : "0")};
  overflow-y: auto;
  overflow-x: hidden;
  transition: all 0.2s;
  margin-top: 4px;

  /* 스크롤바 스타일링 */
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

export const PriorityOption = styled.div<{ isSelected: boolean }>`
  padding: 12px 16px;
  cursor: pointer;
  font-size: 16px;
  color: ${(props) => (props.isSelected ? "#3b82f6" : "#374151")};
  font-weight: ${(props) => (props.isSelected ? "600" : "400")};
  background: ${(props) =>
    props.isSelected ? "rgba(59, 130, 246, 0.1)" : "transparent"};

  &:hover {
    background: rgba(59, 130, 246, 0.05);
  }
`;
