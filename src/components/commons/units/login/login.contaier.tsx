import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useRouter } from "next/router";
import API from "../../../../commons/apis/api";
import {
  Container,
  LoginCard,
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
  Divider,
  LoadingSpinner,
  SocialLoginContainer,
  SocialButton,
  RememberContainer,
  CheckboxContainer,
  Checkbox,
  ForgotPassword,
  ErrorMessageContainer,
} from "./login.style";

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

// ─── Validation Schema ─────────────────────────────
const loginSchema = yup.object({
  email: yup
    .string()
    .required("이메일을 입력해주세요")
    .email("올바른 이메일 형식이 아닙니다"),
  password: yup
    .string()
    .required("비밀번호를 입력해주세요")
    .min(6, "비밀번호는 최소 6자 이상이어야 합니다"),
  rememberMe: yup.boolean(),
});

type LoginFormData = yup.InferType<typeof loginSchema>;

// ─── Main Component ─────────────────────────────
export default function LoginContainer() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [loginError, setLoginError] = useState("");
  const [colorway, setColorway] = useState<keyof typeof COLORWAYS>("forest");
  const theme = COLORWAYS[colorway];

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm<LoginFormData>({
    resolver: yupResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
      rememberMe: false,
    },
  });

  // ─── Form Submission ─────────────────────────────
  const onSubmit = async (data: LoginFormData) => {
    setIsLoading(true);
    setLoginError("");

    try {
      const response = await API.post("/auth/login", {
        email: data.email,
        password: data.password,
      });

      // 로그인 성공 시 토큰 저장
      if (response.data.accessToken) {
        // 토큰 저장 로직 (프로젝트의 토큰 관리 방식에 맞게 수정)
        localStorage.setItem("accessToken", response.data.accessToken);

        // 메인 페이지로 리다이렉트
        router.push("/");
      }
    } catch (error: any) {
      console.error("Login error:", error);

      // 에러 메시지 설정
      if (error.response?.data?.message) {
        setLoginError(error.response.data.message);
      } else if (error.response?.status === 401) {
        setLoginError("이메일 또는 비밀번호가 올바르지 않습니다");
      } else if (error.response?.status === 429) {
        setLoginError(
          "너무 많은 로그인 시도가 있었습니다. 잠시 후 다시 시도해주세요"
        );
      } else {
        setLoginError("로그인 중 오류가 발생했습니다. 다시 시도해주세요");
      }
    } finally {
      setIsLoading(false);
    }
  };

  // ─── Social Login Handlers ─────────────────────────────
  const handleGoogleLogin = () => {
    // Google 로그인 로직 구현
    console.log("Google login clicked");
  };

  const handleKakaoLogin = () => {
    // Kakao 로그인 로직 구현
    console.log("Kakao login clicked");
  };

  const handleNaverLogin = () => {
    // Naver 로그인 로직 구현
    console.log("Naver login clicked");
  };

  // ─── Navigation Handlers ─────────────────────────────
  const handleSignUp = () => {
    router.push("/signUp");
  };

  const handleFindPassword = () => {
    router.push("/find-password");
  };

  return (
    <Container gradient={theme.gradient}>
      <LoginCard>
        <Header>
          <Logo accentBg={theme.accentBg} accentText={theme.accentText}>
            GDR
          </Logo>
          <Title>로그인</Title>
          {/* <Subtitle>안전한 여정을 시작하세요</Subtitle> */}
        </Header>

        <Form onSubmit={handleSubmit(onSubmit)}>
          <FormGroup>
            <Label htmlFor="email">이메일</Label>
            <Input
              id="email"
              type="email"
              placeholder="이메일을 입력하세요"
              hasError={!!errors.email}
              {...register("email")}
            />
            {errors.email && (
              <ErrorMessage>{errors.email.message}</ErrorMessage>
            )}
          </FormGroup>

          <FormGroup>
            <Label htmlFor="password">비밀번호</Label>
            <Input
              id="password"
              type="password"
              placeholder="비밀번호를 입력하세요"
              hasError={!!errors.password}
              {...register("password")}
            />
            {errors.password && (
              <ErrorMessage>{errors.password.message}</ErrorMessage>
            )}
          </FormGroup>

          <RememberContainer>
            <CheckboxContainer>
              <Checkbox type="checkbox" {...register("rememberMe")} />
              <span>로그인 상태 유지</span>
            </CheckboxContainer>
            <ForgotPassword href="#" onClick={handleFindPassword}>
              비밀번호 찾기
            </ForgotPassword>
          </RememberContainer>

          {loginError && (
            <ErrorMessageContainer>{loginError}</ErrorMessageContainer>
          )}

          <Button
            type="submit"
            variant="primary"
            theme={theme}
            disabled={isLoading}
          >
            {isLoading && <LoadingSpinner />}
            {isLoading ? "로그인 중..." : "로그인"}
          </Button>
        </Form>

        {/* <Divider>
          <span>또는</span>
        </Divider>

        <SocialLoginContainer>
          <SocialButton type="button" onClick={handleGoogleLogin}>
            <span>🔍</span>
            Google로 로그인
          </SocialButton>
          <SocialButton type="button" onClick={handleKakaoLogin}>
            <span>💬</span>
            Kakao로 로그인
          </SocialButton>
          <SocialButton type="button" onClick={handleNaverLogin}>
            <span>N</span>
            Naver로 로그인
          </SocialButton>
        </SocialLoginContainer> */}

        <LinkContainer>
          <span>계정이 없으신가요? </span>
          <Link href="#" onClick={handleSignUp}>
            회원가입
          </Link>
        </LinkContainer>
      </LoginCard>
    </Container>
  );
}
