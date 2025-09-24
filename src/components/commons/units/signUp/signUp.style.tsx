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

export const SignUpCard = styled.div`
  background: rgba(255, 255, 255, 0.9);
  backdrop-filter: blur(10px);
  border-radius: 16px;
  border: 1px solid rgba(0, 0, 0, 0.1);
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.1);
  padding: 32px;
  width: 100%;
  max-width: 450px;
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

// ─── Password Strength Indicator ─────────────────────────────
export const PasswordStrengthContainer = styled.div`
  margin-top: 8px;
`;

export const PasswordStrengthBar = styled.div`
  height: 4px;
  background: rgba(0, 0, 0, 0.1);
  border-radius: 2px;
  overflow: hidden;
  margin-bottom: 8px;
`;

export const PasswordStrengthFill = styled.div<{ strength: number }>`
  height: 100%;
  width: ${(props) => props.strength}%;
  background: ${(props) => {
    if (props.strength < 25) return "#dc2626";
    if (props.strength < 50) return "#d97706";
    if (props.strength < 75) return "#3b82f6";
    return "#16a34a";
  }};
  transition: all 0.3s ease;
`;

export const PasswordStrengthText = styled.span<{ strength: number }>`
  font-size: 12px;
  color: ${(props) => {
    if (props.strength < 25) return "#dc2626";
    if (props.strength < 50) return "#d97706";
    if (props.strength < 75) return "#3b82f6";
    return "#16a34a";
  }};
  font-weight: 500;
`;

// ─── Checkbox ─────────────────────────────
export const CheckboxContainer = styled.label`
  display: flex;
  align-items: flex-start;
  gap: 12px;
  cursor: pointer;
  font-size: 14px;
  color: #374151;
  line-height: 1.5;
`;

export const Checkbox = styled.input`
  width: 16px;
  height: 16px;
  accent-color: #3b82f6;
  margin-top: 2px;
  flex-shrink: 0;
`;

export const CheckboxText = styled.span`
  flex: 1;
`;

export const CheckboxLink = styled.a`
  color: #3b82f6;
  text-decoration: none;
  font-weight: 500;

  &:hover {
    text-decoration: underline;
  }
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

// ─── Divider ─────────────────────────────
export const Divider = styled.div`
  display: flex;
  align-items: center;
  margin: 24px 0;

  &::before,
  &::after {
    content: "";
    flex: 1;
    height: 1px;
    background: rgba(0, 0, 0, 0.1);
  }

  span {
    padding: 0 16px;
    color: #6b7280;
    font-size: 14px;
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

// ─── Social Login ─────────────────────────────
export const SocialLoginContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
  margin-top: 20px;
`;

export const SocialButton = styled.button`
  width: 100%;
  padding: 12px 16px;
  border: 1px solid rgba(0, 0, 0, 0.1);
  border-radius: 8px;
  background: rgba(255, 255, 255, 0.8);
  color: #374151;
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;

  &:hover {
    background: rgba(255, 255, 255, 1);
    transform: translateY(-1px);
  }
`;

// ─── Form Row ─────────────────────────────
export const FormRow = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 16px;

  @media (max-width: 480px) {
    grid-template-columns: 1fr;
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

// ─── Terms Container ─────────────────────────────
export const TermsContainer = styled.div`
  background: rgba(255, 255, 255, 0.5);
  border: 1px solid rgba(0, 0, 0, 0.1);
  border-radius: 8px;
  padding: 16px;
  //   margin: 16px 0;
  max-height: 200px;
  overflow-y: auto;

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

export const TermsText = styled.div`
  font-size: 12px;
  color: #6b7280;
  line-height: 1.5;
  white-space: pre-line;
`;

// ─── Email Verification ─────────────────────────────
export const EmailVerificationContainer = styled.div`
  background: rgba(245, 158, 11, 0.1);
  border: 1px solid rgba(245, 158, 11, 0.2);
  border-radius: 8px;
  padding: 16px;
  margin: 16px 0;
  text-align: center;
`;

export const EmailVerificationText = styled.p`
  margin: 0 0 12px 0;
  color: #92400e;
  font-size: 14px;
`;

export const ResendButton = styled.button`
  background: #f59e0b;
  color: white;
  border: none;
  border-radius: 6px;
  padding: 8px 16px;
  font-size: 12px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s;

  &:hover {
    background: #d97706;
    transform: translateY(-1px);
  }

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
    transform: none;
  }
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

// ─── Section Title (for terms sections) ─────────────────────────────
export const SectionTitle = styled.h3`
  font-size: 16px;
  font-weight: 600;
  color: #111827;
  //   margin: 0 0 12px 0;
  display: flex;
  align-items: center;
  gap: 8px;
`;

export const SectionIcon = styled.div<{ accentBg: string; accentText: string }>`
  width: 24px;
  height: 24px;
  border-radius: 50%;
  background: ${(props) => props.accentBg};
  color: ${(props) => props.accentText};
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 12px;
  font-weight: 600;
`;
