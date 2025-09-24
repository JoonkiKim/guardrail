import styled from "@emotion/styled";

// ─── Main Container ─────────────────────────────
export const Container = styled.div<{ gradient: string }>`
  min-height: 100vh;
  background: linear-gradient(135deg, ${(props) => props.gradient});
  font-family: "Pretendard", sans-serif;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 20px;
`;

export const FindPasswordCard = styled.div`
  background: rgba(255, 255, 255, 0.9);
  backdrop-filter: blur(10px);
  border-radius: 16px;
  border: 1px solid rgba(0, 0, 0, 0.1);
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.1);
  padding: 32px;
  width: 100%;
  max-width: 400px;
  position: relative;
  overflow: hidden;
`;

// ─── Header ─────────────────────────────
export const Header = styled.div`
  text-align: center;
  margin-bottom: 32px;
`;

export const Logo = styled.div<{ accentBg: string; accentText: string }>`
  width: 60px;
  height: 60px;
  border-radius: 16px;
  margin: 0 auto 16px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 24px;
  color: ${(props) => props.accentText};
  font-weight: 600;
  background: ${(props) => props.accentBg};
`;

export const Title = styled.h1`
  font-size: 24px;
  font-weight: 600;
  color: #1f2937;
  margin: 0 0 8px 0;
`;

export const Subtitle = styled.p`
  font-size: 14px;
  color: #6b7280;
  margin: 0;
`;

// ─── Form ─────────────────────────────
export const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

export const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

export const Label = styled.label`
  font-size: 14px;
  font-weight: 600;
  color: #374151;
`;

export const Input = styled.input<{ hasError?: boolean }>`
  width: 100%;
  padding: 12px 16px;
  border: 1px solid
    ${(props) => (props.hasError ? "#dc2626" : "rgba(0, 0, 0, 0.1)")};
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

export const ErrorMessage = styled.span`
  font-size: 12px;
  color: #dc2626;
  margin-top: 4px;
`;

// ─── Buttons ─────────────────────────────
export const Button = styled.button<{
  variant?: "primary" | "secondary";
  theme: any;
}>`
  width: 100%;
  padding: 12px 20px;
  border: none;
  border-radius: 8px;
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s;
  margin-top: 8px;

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

// ─── Links ─────────────────────────────
export const LinkContainer = styled.div`
  text-align: center;
  margin-top: 24px;
`;

export const Link = styled.a`
  color: #3b82f6;
  text-decoration: none;
  font-size: 14px;
  font-weight: 500;

  &:hover {
    text-decoration: underline;
  }
`;

// ─── Loading ─────────────────────────────
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

// ─── Success Message ─────────────────────────────
export const SuccessMessage = styled.div`
  background: rgba(34, 197, 94, 0.1);
  border: 1px solid rgba(34, 197, 94, 0.2);
  color: #16a34a;
  padding: 12px 16px;
  border-radius: 8px;
  font-size: 14px;
  margin-bottom: 16px;
  display: flex;
  align-items: center;
  gap: 8px;
`;

// ─── Error Message Container ─────────────────────────────
export const ErrorMessageContainer = styled.div`
  background: rgba(239, 68, 68, 0.1);
  border: 1px solid rgba(239, 68, 68, 0.2);
  color: #dc2626;
  padding: 12px 16px;
  border-radius: 8px;
  font-size: 14px;
  margin-bottom: 16px;
  text-align: center;
`;

// ─── Info Message ─────────────────────────────
export const InfoMessage = styled.div`
  background: rgba(59, 130, 246, 0.1);
  border: 1px solid rgba(59, 130, 246, 0.2);
  color: #1d4ed8;
  padding: 12px 16px;
  border-radius: 8px;
  font-size: 14px;
  margin-bottom: 16px;
  text-align: center;
`;

// ─── Step Indicator ─────────────────────────────
export const StepContainer = styled.div`
  display: flex;
  justify-content: center;
  margin-bottom: 24px;
`;

export const Step = styled.div<{ active: boolean; completed: boolean }>`
  width: 32px;
  height: 32px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 14px;
  font-weight: 600;
  margin: 0 8px;
  transition: all 0.2s;

  ${(props) => {
    if (props.completed) {
      return `
        background: #16a34a;
        color: white;
      `;
    } else if (props.active) {
      return `
        background: #3b82f6;
        color: white;
      `;
    } else {
      return `
        background: #e5e7eb;
        color: #6b7280;
      `;
    }
  }}
`;

export const StepLine = styled.div<{ completed: boolean }>`
  width: 40px;
  height: 2px;
  background: ${(props) => (props.completed ? "#16a34a" : "#e5e7eb")};
  margin-top: 15px;
  transition: all 0.2s;
`;

// ─── Back Button ─────────────────────────────
export const BackButton = styled.button`
  position: absolute;
  top: 20px;
  left: 20px;
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
  color: #6b7280;

  &:hover {
    background: rgba(255, 255, 255, 1);
    transform: scale(1.05);
  }
`;

// ─── Resend Button ─────────────────────────────
export const ResendButton = styled.button`
  background: #6b7280;
  color: white;
  border: none;
  border-radius: 6px;
  padding: 8px 16px;
  font-size: 12px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s;
  margin-top: 8px;

  &:hover {
    background: #4b5563;
    transform: translateY(-1px);
  }

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
    transform: none;
  }
`;

// ─── Code Input Container ─────────────────────────────
export const CodeInputContainer = styled.div`
  display: flex;
  gap: 8px;
  justify-content: center;
  margin: 16px 0;
`;

export const CodeInput = styled.input<{ hasError?: boolean }>`
  width: 48px;
  height: 48px;
  border: 2px solid
    ${(props) => (props.hasError ? "#dc2626" : "rgba(0, 0, 0, 0.1)")};
  border-radius: 8px;
  text-align: center;
  font-size: 20px;
  font-weight: 600;
  background: rgba(255, 255, 255, 0.8);
  transition: all 0.2s;

  &:focus {
    outline: none;
    border-color: #3b82f6;
    box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
  }

  &:not(:placeholder-shown) {
    border-color: #16a34a;
  }
`;
