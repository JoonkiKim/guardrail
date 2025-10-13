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

export const FormCard = styled.div`
  background: white;
  border-radius: 16px;
  padding: 32px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
  margin-bottom: 24px;
`;

export const FormTitle = styled.h2`
  margin: 0 0 24px 0;
  font-size: 20px;
  font-weight: 600;
  color: #1f2937;
  text-align: center;
`;

export const FormGroup = styled.div`
  margin-bottom: 24px;
`;

export const Label = styled.label`
  display: block;
  margin-bottom: 8px;
  font-size: 14px;
  font-weight: 500;
  color: #374151;
`;

export const Input = styled.input`
  width: 100%;
  padding: 12px 16px;
  border: 2px solid #e5e7eb;
  border-radius: 8px;
  font-size: 16px;
  transition: border-color 0.2s;
  box-sizing: border-box;

  &:focus {
    outline: none;
    border-color: #3b82f6;
  }

  &::placeholder {
    color: #9ca3af;
  }
`;

export const TextArea = styled.textarea`
  width: 100%;
  padding: 12px 16px;
  border: 2px solid #e5e7eb;
  border-radius: 8px;
  font-size: 16px;
  min-height: 100px;
  resize: vertical;
  transition: border-color 0.2s;
  box-sizing: border-box;
  font-family: inherit;

  &:focus {
    outline: none;
    border-color: #3b82f6;
  }

  &::placeholder {
    color: #9ca3af;
  }
`;

export const ButtonGroup = styled.div`
  display: flex;
  gap: 12px;
  justify-content: center;
  margin-top: 32px;
`;

export const Button = styled.button<{ variant?: "primary" | "secondary" }>`
  padding: 12px 24px;
  border-radius: 8px;
  font-size: 16px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s;
  border: none;
  min-width: 120px;

  ${(props) =>
    props.variant === "primary"
      ? `
    background: #3b82f6;
    color: white;
    
    &:hover {
      background: #2563eb;
    }
    
    &:disabled {
      background: #9ca3af;
      cursor: not-allowed;
    }
  `
      : `
    background: #f3f4f6;
    color: #374151;
    border: 1px solid #d1d5db;
    
    &:hover {
      background: #e5e7eb;
    }
  `}
`;

export const PreviewCard = styled.div<{ theme: any }>`
  background: white;
  border-radius: 16px;
  padding: 20px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
  border-left: 4px solid ${(props) => props.theme.button};
  margin-bottom: 16px;
`;

export const PreviewTitle = styled.h3`
  margin: 0 0 12px 0;
  font-size: 16px;
  font-weight: 600;
  color: #1f2937;
`;

export const PreviewContent = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

export const PreviewItem = styled.div`
  padding: 8px 12px;
  background: #f9fafb;
  border-radius: 6px;
  font-size: 14px;
  color: #374151;
`;

export const PreviewLabel = styled.span`
  font-weight: 500;
  color: #6b7280;
  margin-right: 8px;
`;

export const SuccessMessage = styled.div`
  background: #d1fae5;
  border: 1px solid #a7f3d0;
  color: #065f46;
  padding: 12px 16px;
  border-radius: 8px;
  margin-bottom: 16px;
  font-size: 14px;
  font-weight: 500;
`;

export const ErrorMessage = styled.div`
  background: #fee2e2;
  border: 1px solid #fecaca;
  color: #dc2626;
  padding: 12px 16px;
  border-radius: 8px;
  margin-bottom: 16px;
  font-size: 14px;
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

export const AddButton = styled.button`
  margin-top: 12px;
  background-color: #6b7280;
  color: white;
  border: none;
  border-radius: 8px;
  padding: 0;
  cursor: pointer;
  opacity: 0.5;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 16px;
  font-weight: bold;
  width: 100%;
  height: 48px;
  transition: background-color 0.2s;

  &:hover {
    background-color: #4b5563;
  }
`;

export const Select = styled.select`
  width: 100%;
  padding: 12px 40px 12px 16px;
  border: 2px solid #e5e7eb;
  border-radius: 8px;
  font-size: 16px;
  transition: border-color 0.2s;
  box-sizing: border-box;
  background-color: white;
  cursor: pointer;
  appearance: none;
  background-image: url("data:image/svg+xml;charset=UTF-8,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='%236b7280' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3e%3cpolyline points='6,9 12,15 18,9'%3e%3c/polyline%3e%3c/svg%3e");
  background-repeat: no-repeat;
  background-position: right 12px center;
  background-size: 16px;

  &:focus {
    outline: none;
    border-color: #3b82f6;
  }

  &:hover {
    border-color: #d1d5db;
  }
`;

export const StimulusDropdown = styled.div<{ isOpen: boolean }>`
  position: relative;
  width: 100%;
  z-index: 100;
`;

export const StimulusSelector = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 12px 16px;
  border: 2px solid #e5e7eb;
  border-radius: 8px;
  font-size: 16px;
  cursor: pointer;
  transition: border-color 0.2s;
  box-sizing: border-box;
  background-color: white;

  &:focus {
    outline: none;
    border-color: #3b82f6;
  }

  &:hover {
    border-color: #d1d5db;
  }
`;

export const StimulusText = styled.span`
  flex-grow: 1;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;

export const StimulusArrow = styled.span<{ isOpen: boolean }>`
  transition: transform 0.2s ease;
  transform: ${(props) => (props.isOpen ? "rotate(180deg)" : "rotate(0deg)")};
`;

export const StimulusOptions = styled.div<{ isOpen: boolean }>`
  position: absolute;
  top: 100%;
  left: 0;
  width: 100%;
  background-color: white;
  border: 1px solid #e5e7eb;
  border-radius: 6px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
  max-height: 200px;
  overflow-y: auto;
  z-index: 100;
  display: ${(props) => (props.isOpen ? "block" : "none")};
`;

export const StimulusOption = styled.div<{ isSelected: boolean }>`
  padding: 12px 16px;
  cursor: pointer;
  transition: background-color 0.2s;
  background-color: ${(props) =>
    props.isSelected ? "#f3f4f6" : "transparent"};
  font-weight: ${(props) => (props.isSelected ? "600" : "400")};
  color: ${(props) => (props.isSelected ? "#1f2937" : "#374151")};
  font-size: 16px;
  display: flex;
  align-items: center;
  gap: 8px;

  &:hover {
    background-color: #f9fafb;
  }

  &:last-of-type {
    border-radius: 0 0 6px 6px;
  }
`;

// 새로운 자극 추가 옵션을 위한 특별한 스타일
export const AddNewOption = styled(StimulusOption)`
  background-color: #f0f9ff !important;
  border-bottom: 1px solid #e5e7eb;
  font-weight: 600;
  color: #0369a1;

  &:hover {
    background-color: #e0f2fe !important;
  }
`;
