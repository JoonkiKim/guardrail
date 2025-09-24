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

export const ActionButton = styled.button<{ theme: any }>`
  padding: 8px 16px;
  border-radius: 12px;
  font-size: 14px;
  font-weight: 500;
  border: none;
  cursor: pointer;
  background: transparent;
  color: white;
  transition: all 0.2s;

  // &:hover {
  //   background: ${(props) => props.theme.buttonHover};
  // }
`;

// ─── Content ─────────────────────────────
export const ContentWrapper = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 24px 16px 40px 16px;
`;

export const DetailContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 24px;
`;

// ─── Header Section ─────────────────────────────
export const HeaderSection = styled.div`
  border-radius: 16px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
  background: rgba(255, 255, 255, 0.7);
  overflow: hidden;
  padding: 24px;
`;

export const HeaderContent = styled.div`
  display: flex;
  align-items: center;
  gap: 20px;
  margin-bottom: 20px;
`;

export const HeaderIcon = styled.div<{ accentBg: string; accentText: string }>`
  height: 64px;
  width: 64px;
  border-radius: 20px;
  display: grid;
  place-items: center;
  background: ${(props) => props.accentBg};
  color: ${(props) => props.accentText};
  font-size: 24px;
  font-weight: 600;
`;

export const HeaderInfo = styled.div`
  flex: 1;
`;

export const HeaderTitle = styled.h1`
  font-size: 28px;
  font-weight: 700;
  color: #111827;
  margin: 0 0 8px 0;
  line-height: 1.2;
`;

export const HeaderSubtitle = styled.p`
  font-size: 16px;
  color: #6b7280;
  margin: 0;
`;

export const HeaderMeta = styled.div`
  display: flex;
  gap: 12px;
  margin-top: 16px;
`;

export const MetaBadge = styled.div<{ variant: string; theme: any }>`
  display: inline-flex;
  align-items: center;
  padding: 6px 12px;
  border-radius: 20px;
  font-size: 12px;
  font-weight: 600;

  ${(props) => {
    switch (props.variant) {
      case "date":
        return `
          background: ${props.theme.chip};
          color: ${props.theme.accentText};
        `;
      case "status":
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

// ─── Section ─────────────────────────────
export const Section = styled.div`
  border-radius: 16px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
  background: rgba(255, 255, 255, 0.7);
  overflow: hidden;
`;

export const SectionHeader = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 20px 20px 0 20px;
`;

export const SectionIcon = styled.div<{ accentBg: string; accentText: string }>`
  height: 40px;
  width: 40px;
  border-radius: 16px;
  display: grid;
  place-items: center;
  background: ${(props) => props.accentBg};
  color: ${(props) => props.accentText};
  font-size: 16px;
  font-weight: 600;
`;

export const SectionTitle = styled.h2`
  font-size: 20px;
  font-weight: 600;
  color: #111827;
  margin: 0;
`;

export const SectionContent = styled.div`
  padding: 20px;
`;

// ─── Cards ─────────────────────────────
export const Card = styled.div`
  border-radius: 12px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
  background: rgba(255, 255, 255, 0.8);
  overflow: hidden;
  margin-bottom: 16px;
`;

export const CardHeader = styled.div`
  padding: 16px 16px 8px 16px;
`;

export const CardTitle = styled.h3`
  font-weight: 600;
  letter-spacing: -0.025em;
  color: #111827;
  margin: 0;
  font-size: 16px;
  line-height: 1.4;
`;

export const CardContent = styled.div`
  padding: 8px 16px 16px 16px;
`;

export const ContentText = styled.p`
  font-size: 14px;
  color: #374151;
  line-height: 1.6;
  margin: 0;
  white-space: pre-wrap;
`;

// ─── Grid Layout ─────────────────────────────
export const GridContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 16px;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

export const FullWidthContainer = styled.div`
  grid-column: 1 / -1;
`;

// ─── Pavlov Section ─────────────────────────────
export const PavlovCard = styled.div<{ theme: any }>`
  border-radius: 12px;
  padding: 16px;
  margin-bottom: 12px;
  background: ${(props) => props.theme.emphCard};
  border: 1px solid rgba(0, 0, 0, 0.1);
  transition: all 0.2s ease;

  &:hover {
    transform: translateY(-1px);
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  }
`;

export const PavlovStimulus = styled.div`
  font-size: 14px;
  font-weight: 600;
  color: #111827;
  margin-bottom: 8px;
`;

export const PavlovResponse = styled.div`
  font-size: 14px;
  color: #374151;
  line-height: 1.5;
  padding-left: 12px;
  border-left: 3px solid #e5e7eb;
`;

// ─── Loading and Error States ─────────────────────────────
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

// ─── Action Buttons ─────────────────────────────
export const ActionSection = styled.div`
  display: flex;
  gap: 12px;
  justify-content: center;
  margin-top: 24px;
`;

export const Button = styled.button<{
  variant?: "primary" | "secondary";
  theme: any;
}>`
  padding: 12px 24px;
  border-radius: 12px;
  font-size: 14px;
  font-weight: 600;
  border: none;
  cursor: pointer;
  transition: all 0.2s ease;
  display: inline-flex;
  align-items: center;
  gap: 8px;

  ${(props) =>
    props.variant === "primary"
      ? `
    background: ${props.theme.button};
    color: white;
    
    &:hover {
      background: ${props.theme.buttonHover};
      transform: translateY(-1px);
    }
  `
      : `
    background: ${props.theme.chip};
    color: #374151;
    border: 1px solid rgba(0, 0, 0, 0.1);
    
    &:hover {
      background: ${props.theme.chip.replace("50", "100")};
      transform: translateY(-1px);
    }
  `}
`;
