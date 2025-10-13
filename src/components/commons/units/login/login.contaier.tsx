import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useRouter } from "next/router";
import { useMutation } from "@apollo/client";
import { LOGIN } from "../../../../commons/apis/graphql-queries";
import { setAccessToken } from "../../../../commons/libraries/token";
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
  const [loginError, setLoginError] = useState("");
  const [colorway, setColorway] = useState<keyof typeof COLORWAYS>("forest");
  const theme = COLORWAYS[colorway];

  // ✅ GraphQL mutation 사용
  const [login, { loading: isLoading }] = useMutation(LOGIN, {
    onCompleted: (data) => {
      const accessToken = data?.login;
      if (accessToken) {
        // 토큰 저장 (인메모리 + Recoil)
        setAccessToken(accessToken);
        console.log("로그인 성공!");

        // 메인 페이지로 이동
        router.push("/");
      }
    },
    onError: (error) => {
      console.error("로그인 실패:", error);

      // GraphQL 에러 메시지 처리
      if (
        error.message.includes("401") ||
        error.message.includes("Unauthorized")
      ) {
        setLoginError("이메일 또는 비밀번호가 올바르지 않습니다");
      } else if (
        error.message.includes("429") ||
        error.message.includes("Too Many Requests")
      ) {
        setLoginError(
          "너무 많은 로그인 시도가 있었습니다. 잠시 후 다시 시도해주세요"
        );
      } else if (error.message) {
        setLoginError(error.message);
      } else {
        setLoginError("로그인 중 오류가 발생했습니다. 다시 시도해주세요");
      }
    },
  });

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
    setLoginError("");

    try {
      // ✅ GraphQL mutation 실행
      await login({
        variables: {
          email: data.email,
          password: data.password,
        },
      });
    } catch (error) {
      // onError에서 처리됨
      console.error("Login error:", error);
    }
  };

  // ─── Social Login Handlers ─────────────────────────────
  const handleGoogleLogin = () => {
    console.log("Google login clicked");
  };

  const handleKakaoLogin = () => {
    console.log("Kakao login clicked");
  };

  const handleNaverLogin = () => {
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
