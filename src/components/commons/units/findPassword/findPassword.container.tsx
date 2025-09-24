import React, { useState, useEffect, useRef } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useRouter } from "next/router";
import API from "../../../../commons/apis/api";
import {
  Container,
  FindPasswordCard,
  Header,
  Logo,
  Title,
  Subtitle,
  Form,
  FormGroup,
  Label,
  Input,
  ErrorMessage,
  Button,
  LinkContainer,
  Link,
  LoadingSpinner,
  SuccessMessage,
  ErrorMessageContainer,
  InfoMessage,
  StepContainer,
  Step,
  StepLine,
  BackButton,
  ResendButton,
  CodeInputContainer,
  CodeInput,
} from "./findPassword.style";

// ─── Colorway System (matching mainPage) ─────────────────────────────
const COLORWAYS: Record<
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
    accentBg: "#dcfce7",
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

// ─── Validation Schemas ─────────────────────────────
const emailSchema = yup.object({
  email: yup
    .string()
    .required("이메일을 입력해주세요")
    .email("올바른 이메일 형식이 아닙니다"),
});

const codeSchema = yup.object({
  code: yup
    .string()
    .required("인증코드를 입력해주세요")
    .length(6, "6자리 인증코드를 입력해주세요"),
});

const passwordSchema = yup.object({
  password: yup
    .string()
    .required("새 비밀번호를 입력해주세요")
    .min(8, "비밀번호는 최소 8자 이상이어야 합니다")
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]/,
      "비밀번호는 대문자, 소문자, 숫자, 특수문자를 포함해야 합니다"
    ),
  confirmPassword: yup
    .string()
    .required("비밀번호 확인을 입력해주세요")
    .oneOf([yup.ref("password")], "비밀번호가 일치하지 않습니다"),
});

type EmailFormData = yup.InferType<typeof emailSchema>;
type CodeFormData = yup.InferType<typeof codeSchema>;
type PasswordFormData = yup.InferType<typeof passwordSchema>;

// ─── Main Component ─────────────────────────────
export default function FindPasswordContainer() {
  const router = useRouter();
  const [currentStep, setCurrentStep] = useState<1 | 2 | 3>(1);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [email, setEmail] = useState("");
  const [resendCooldown, setResendCooldown] = useState(0);
  const [colorway, setColorway] = useState<keyof typeof COLORWAYS>("forest");
  const theme = COLORWAYS[colorway];

  // Code input refs
  const codeRefs = useRef<(HTMLInputElement | null)[]>([]);

  // Email form
  const emailForm = useForm<EmailFormData>({
    resolver: yupResolver(emailSchema),
    defaultValues: { email: "" },
  });

  // Code form
  const codeForm = useForm<CodeFormData>({
    resolver: yupResolver(codeSchema),
    defaultValues: { code: "" },
  });

  // Password form
  const passwordForm = useForm<PasswordFormData>({
    resolver: yupResolver(passwordSchema),
    defaultValues: { password: "", confirmPassword: "" },
  });

  // ─── Resend Cooldown Timer ─────────────────────────────
  useEffect(() => {
    if (resendCooldown > 0) {
      const timer = setTimeout(() => {
        setResendCooldown(resendCooldown - 1);
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, [resendCooldown]);

  // ─── Step 1: Email Verification ─────────────────────────────
  const onEmailSubmit = async (data: EmailFormData) => {
    setIsLoading(true);
    setError("");

    try {
      const response = await API.post("/auth/password/reset/request", {
        email: data.email,
      });

      if (response.data.success) {
        setEmail(data.email);
        setCurrentStep(2);
        setSuccess("인증코드가 이메일로 발송되었습니다");
      }
    } catch (error: any) {
      console.error("Email verification error:", error);

      if (error.response?.data?.message) {
        setError(error.response.data.message);
      } else if (error.response?.status === 404) {
        setError("등록되지 않은 이메일입니다");
      } else {
        setError("이메일 발송 중 오류가 발생했습니다. 다시 시도해주세요");
      }
    } finally {
      setIsLoading(false);
    }
  };

  // ─── Step 2: Code Verification ─────────────────────────────
  const onCodeSubmit = async (data: CodeFormData) => {
    setIsLoading(true);
    setError("");

    try {
      const response = await API.post("/auth/password/reset/verify", {
        email: email,
        code: data.code,
      });

      if (response.data.success) {
        setCurrentStep(3);
        setSuccess("인증이 완료되었습니다. 새 비밀번호를 설정해주세요");
      }
    } catch (error: any) {
      console.error("Code verification error:", error);

      if (error.response?.data?.message) {
        setError(error.response.data.message);
      } else if (error.response?.status === 400) {
        setError("인증코드가 올바르지 않습니다");
      } else {
        setError("인증 중 오류가 발생했습니다. 다시 시도해주세요");
      }
    } finally {
      setIsLoading(false);
    }
  };

  // ─── Step 3: Password Reset ─────────────────────────────
  const onPasswordSubmit = async (data: PasswordFormData) => {
    setIsLoading(true);
    setError("");

    try {
      const response = await API.post("/auth/password/reset", {
        email: email,
        code: codeForm.getValues("code"),
        newPassword: data.password,
      });

      if (response.data.success) {
        setSuccess("비밀번호가 성공적으로 변경되었습니다");
        setTimeout(() => {
          router.push("/login");
        }, 2000);
      }
    } catch (error: any) {
      console.error("Password reset error:", error);

      if (error.response?.data?.message) {
        setError(error.response.data.message);
      } else {
        setError("비밀번호 변경 중 오류가 발생했습니다. 다시 시도해주세요");
      }
    } finally {
      setIsLoading(false);
    }
  };

  // ─── Resend Code ─────────────────────────────
  const handleResendCode = async () => {
    if (resendCooldown > 0) return;

    try {
      await API.post("/auth/password/reset/request", {
        email: email,
      });
      setResendCooldown(60);
      setSuccess("인증코드가 재발송되었습니다");
    } catch (error) {
      console.error("Resend code error:", error);
      setError("인증코드 재발송에 실패했습니다");
    }
  };

  // ─── Code Input Handler ─────────────────────────────
  const handleCodeChange = (index: number, value: string) => {
    if (value.length > 1) return;

    const newCode = [...(codeForm.getValues("code") || "").split("")];
    newCode[index] = value;
    const codeString = newCode.join("");

    codeForm.setValue("code", codeString);

    if (value && index < 5) {
      codeRefs.current[index + 1]?.focus();
    }
  };

  const handleCodeKeyDown = (index: number, e: React.KeyboardEvent) => {
    if (
      e.key === "Backspace" &&
      !codeForm.getValues("code")?.[index] &&
      index > 0
    ) {
      codeRefs.current[index - 1]?.focus();
    }
  };

  // ─── Navigation Handlers ─────────────────────────────
  const handleBack = () => {
    if (currentStep === 1) {
      router.push("/login");
    } else {
      setCurrentStep((prev) => (prev - 1) as 1 | 2 | 3);
      setError("");
      setSuccess("");
    }
  };

  const handleLogin = () => {
    router.push("/login");
  };

  // ─── Render Steps ─────────────────────────────
  const renderStepIndicator = () => (
    <StepContainer>
      <Step active={currentStep === 1} completed={currentStep > 1}>
        1
      </Step>
      <StepLine completed={currentStep > 1} />
      <Step active={currentStep === 2} completed={currentStep > 2}>
        2
      </Step>
      <StepLine completed={currentStep > 2} />
      <Step active={currentStep === 3} completed={false}>
        3
      </Step>
    </StepContainer>
  );

  const renderStep1 = () => (
    <>
      <Header>
        <Logo accentBg={theme.accentBg} accentText={theme.accentText}>
          🔐
        </Logo>
        <Title>비밀번호 찾기</Title>
        <Subtitle>등록된 이메일을 입력해주세요</Subtitle>
      </Header>

      <Form onSubmit={emailForm.handleSubmit(onEmailSubmit)}>
        <FormGroup>
          <Label htmlFor="email">이메일</Label>
          <Input
            id="email"
            type="email"
            placeholder="이메일을 입력하세요"
            hasError={!!emailForm.formState.errors.email}
            {...emailForm.register("email")}
          />
          {emailForm.formState.errors.email && (
            <ErrorMessage>
              {emailForm.formState.errors.email.message}
            </ErrorMessage>
          )}
        </FormGroup>

        {error && <ErrorMessageContainer>{error}</ErrorMessageContainer>}
        {success && <SuccessMessage>{success}</SuccessMessage>}

        <Button
          type="submit"
          variant="primary"
          theme={theme}
          disabled={isLoading}
        >
          {isLoading && <LoadingSpinner />}
          {isLoading ? "발송 중..." : "인증코드 발송"}
        </Button>
      </Form>
    </>
  );

  const renderStep2 = () => (
    <>
      <Header>
        <Logo accentBg={theme.accentBg} accentText={theme.accentText}>
          📧
        </Logo>
        <Title>인증코드 입력</Title>
        <Subtitle>{email}로 발송된 6자리 코드를 입력해주세요</Subtitle>
      </Header>

      <Form onSubmit={codeForm.handleSubmit(onCodeSubmit)}>
        <FormGroup>
          <Label>인증코드</Label>
          <CodeInputContainer>
            {[0, 1, 2, 3, 4, 5].map((index) => (
              <CodeInput
                key={index}
                ref={(el) => (codeRefs.current[index] = el)}
                type="text"
                maxLength={1}
                value={codeForm.watch("code")?.[index] || ""}
                onChange={(e) => handleCodeChange(index, e.target.value)}
                onKeyDown={(e) => handleCodeKeyDown(index, e)}
                hasError={!!codeForm.formState.errors.code}
              />
            ))}
          </CodeInputContainer>
          {codeForm.formState.errors.code && (
            <ErrorMessage>
              {codeForm.formState.errors.code.message}
            </ErrorMessage>
          )}
        </FormGroup>

        <ResendButton
          type="button"
          onClick={handleResendCode}
          disabled={resendCooldown > 0}
        >
          {resendCooldown > 0
            ? `${resendCooldown}초 후 재발송`
            : "인증코드 재발송"}
        </ResendButton>

        {error && <ErrorMessageContainer>{error}</ErrorMessageContainer>}
        {success && <SuccessMessage>{success}</SuccessMessage>}

        <Button
          type="submit"
          variant="primary"
          theme={theme}
          disabled={isLoading}
        >
          {isLoading && <LoadingSpinner />}
          {isLoading ? "인증 중..." : "인증하기"}
        </Button>
      </Form>
    </>
  );

  const renderStep3 = () => (
    <>
      <Header>
        <Logo accentBg={theme.accentBg} accentText={theme.accentText}>
          🔑
        </Logo>
        <Title>새 비밀번호 설정</Title>
        <Subtitle>새로운 비밀번호를 입력해주세요</Subtitle>
      </Header>

      <Form onSubmit={passwordForm.handleSubmit(onPasswordSubmit)}>
        <FormGroup>
          <Label htmlFor="password">새 비밀번호</Label>
          <Input
            id="password"
            type="password"
            placeholder="새 비밀번호를 입력하세요"
            hasError={!!passwordForm.formState.errors.password}
            {...passwordForm.register("password")}
          />
          {passwordForm.formState.errors.password && (
            <ErrorMessage>
              {passwordForm.formState.errors.password.message}
            </ErrorMessage>
          )}
        </FormGroup>

        <FormGroup>
          <Label htmlFor="confirmPassword">비밀번호 확인</Label>
          <Input
            id="confirmPassword"
            type="password"
            placeholder="비밀번호를 다시 입력하세요"
            hasError={!!passwordForm.formState.errors.confirmPassword}
            {...passwordForm.register("confirmPassword")}
          />
          {passwordForm.formState.errors.confirmPassword && (
            <ErrorMessage>
              {passwordForm.formState.errors.confirmPassword.message}
            </ErrorMessage>
          )}
        </FormGroup>

        {error && <ErrorMessageContainer>{error}</ErrorMessageContainer>}
        {success && <SuccessMessage>{success}</SuccessMessage>}

        <Button
          type="submit"
          variant="primary"
          theme={theme}
          disabled={isLoading}
        >
          {isLoading && <LoadingSpinner />}
          {isLoading ? "변경 중..." : "비밀번호 변경"}
        </Button>
      </Form>
    </>
  );

  return (
    <Container gradient={theme.gradient}>
      <FindPasswordCard>
        <BackButton onClick={handleBack}>←</BackButton>

        {renderStepIndicator()}

        {currentStep === 1 && renderStep1()}
        {currentStep === 2 && renderStep2()}
        {currentStep === 3 && renderStep3()}

        <LinkContainer>
          <span>비밀번호를 기억하셨나요? </span>
          <Link href="#" onClick={handleLogin}>
            로그인
          </Link>
        </LinkContainer>
      </FindPasswordCard>
    </Container>
  );
}
