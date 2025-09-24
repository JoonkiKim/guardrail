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
  max-width: 800px;
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
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
`;

export const DetailCard = styled.div`
  background: rgba(255, 255, 255, 0.9);
  backdrop-filter: blur(10px);
  border-radius: 16px;
  border: 1px solid rgba(0, 0, 0, 0.1);
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.1);
  padding: 24px;
  margin-bottom: 20px;
`;

export const DetailHeader = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;
  margin-bottom: 20px;
`;

export const DetailIcon = styled.div<{
  backgroundColor?: string;
  color?: string;
}>`
  width: 64px;
  height: 64px;
  border-radius: 50%;
  background: ${(props) => props.backgroundColor || "#f3f4f6"};
  color: ${(props) => props.color || "#374151"};
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 600;
  font-size: 24px;
  flex-shrink: 0;
`;

export const DetailTitle = styled.h1`
  font-size: 24px;
  font-weight: 700;
  color: #111827;
  margin: 0;
  line-height: 1.3;
`;

export const DetailMeta = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  margin-bottom: 24px;
`;

export const MetaItem = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 8px 12px;
  background: rgba(255, 255, 255, 0.5);
  border-radius: 8px;
  border: 1px solid rgba(0, 0, 0, 0.1);
`;

export const MetaIcon = styled.span`
  font-size: 16px;
`;

export const MetaText = styled.span`
  font-size: 14px;
  color: #374151;
  font-weight: 500;
`;

export const DetailDescription = styled.div`
  margin-bottom: 24px;
`;

export const DescriptionTitle = styled.h3`
  font-size: 16px;
  font-weight: 600;
  color: #111827;
  margin: 0 0 12px 0;
`;

export const DescriptionText = styled.p`
  font-size: 14px;
  color: #6b7280;
  line-height: 1.6;
  margin: 0;
  padding: 12px;
  background: rgba(255, 255, 255, 0.5);
  border-radius: 8px;
  border: 1px solid rgba(0, 0, 0, 0.1);
`;

export const DetailActions = styled.div`
  display: flex;
  gap: 12px;
  margin-top: 24px;
`;

export const ActionButtonLarge = styled.button<{
  variant?: "primary" | "secondary";
  theme: any;
}>`
  flex: 1;
  padding: 12px 20px;
  border: none;
  border-radius: 8px;
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s;

  ${(props) =>
    props.variant === "primary"
      ? `
    background: ${props.theme.button};
    color: white;
    
    &:hover {
      background: ${props.theme.buttonHover};
      transform: translateY(-1px);
    }
    
    &:active {
      transform: translateY(0);
    }
    
    &:disabled {
      opacity: 0.6;
      cursor: not-allowed;
      transform: none;
    }
  `
      : `
    background: rgba(255, 255, 255, 0.8);
    color: #374151;
    border: 1px solid rgba(0, 0, 0, 0.1);
    
    &:hover {
      background: rgba(255, 255, 255, 1);
      transform: translateY(-1px);
    }
  `}
`;

export const StatusBadge = styled.div<{ status: string }>`
  display: inline-flex;
  align-items: center;
  gap: 4px;
  padding: 4px 8px;
  border-radius: 12px;
  font-size: 12px;
  font-weight: 600;

  ${(props) => {
    switch (props.status) {
      case "completed":
        return `
          background: rgba(34, 197, 94, 0.1);
          color: #16a34a;
        `;
      case "in-progress":
        return `
          background: rgba(59, 130, 246, 0.1);
          color: #2563eb;
        `;
      case "pending":
        return `
          background: rgba(245, 158, 11, 0.1);
          color: #d97706;
        `;
      default:
        return `
          background: rgba(107, 114, 128, 0.1);
          color: #6b7280;
        `;
    }
  }}
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

export const TagsContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  margin-bottom: 20px;
`;

export const Tag = styled.span`
  padding: 4px 8px;
  background: rgba(59, 130, 246, 0.1);
  color: #2563eb;
  border-radius: 6px;
  font-size: 12px;
  font-weight: 500;
`;

export const DateInfo = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
`;

export const DateText = styled.span`
  font-size: 14px;
  color: #374151;
  font-weight: 500;
`;

export const TimeText = styled.span`
  font-size: 12px;
  color: #6b7280;
`;

export const LoadingSpinner = styled.div`
  width: 20px;
  height: 20px;
  border: 2px solid transparent;
  border-top: 2px solid currentColor;
  border-radius: 50%;
  animation: spin 1s linear infinite;
  margin-right: 8px;

  @keyframes spin {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }
`;

export const ErrorMessage = styled.div`
  background: rgba(239, 68, 68, 0.1);
  border: 1px solid rgba(239, 68, 68, 0.2);
  color: #dc2626;
  padding: 12px 16px;
  border-radius: 8px;
  font-size: 14px;
  text-align: center;
  margin: 20px 0;
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
