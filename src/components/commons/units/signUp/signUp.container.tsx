import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useRouter } from "next/router";
import { useMutation } from "@apollo/client";
import { CREATE_USER } from "../../../../commons/apis/graphql-queries";
import {
  Container,
  SignUpCard,
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
  CheckboxContainer,
  Checkbox,
  CheckboxText,
  CheckboxLink,
  PasswordStrengthContainer,
  PasswordStrengthBar,
  PasswordStrengthFill,
  PasswordStrengthText,
  FormRow,
  SuccessMessage,
  TermsContainer,
  TermsText,
  EmailVerificationContainer,
  EmailVerificationText,
  ResendButton,
  ErrorMessageContainer,
  SectionTitle,
  SectionIcon,
} from "./signUp.style";

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
const signUpSchema = yup.object({
  name: yup
    .string()
    .required("이름을 입력해주세요")
    .min(2, "이름은 최소 2자 이상이어야 합니다")
    .max(20, "이름은 최대 20자까지 가능합니다"),
  email: yup
    .string()
    .required("이메일을 입력해주세요")
    .email("올바른 이메일 형식이 아닙니다"),
  password: yup
    .string()
    .required("비밀번호를 입력해주세요")
    .min(8, "비밀번호는 최소 8자 이상이어야 합니다")
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]/,
      "비밀번호는 대문자, 소문자, 숫자, 특수문자를 포함해야 합니다"
    ),
  confirmPassword: yup
    .string()
    .required("비밀번호 확인을 입력해주세요")
    .oneOf([yup.ref("password")], "비밀번호가 일치하지 않습니다"),
  phone: yup
    .string()
    .required("전화번호를 입력해주세요")
    .matches(/^[0-9-+\s()]+$/, "올바른 전화번호 형식이 아닙니다")
    .min(10, "전화번호는 최소 10자 이상이어야 합니다"),
  birthDate: yup
    .string()
    .required("생년월일을 입력해주세요")
    .matches(/^\d{8}$/, "8자리 숫자로 입력해주세요 (예: 19900101)")
    .test("valid-date", "올바른 날짜를 입력해주세요", function (value) {
      if (!value || value.length !== 8) return false;

      const year = parseInt(value.substring(0, 4));
      const month = parseInt(value.substring(4, 6));
      const day = parseInt(value.substring(6, 8));

      // 기본 유효성 검사
      if (year < 1900 || year > new Date().getFullYear()) return false;
      if (month < 1 || month > 12) return false;
      if (day < 1 || day > 31) return false;

      // 실제 날짜 유효성 검사
      const date = new Date(year, month - 1, day);
      return (
        date.getFullYear() === year &&
        date.getMonth() === month - 1 &&
        date.getDate() === day
      );
    }),
  termsAgreed: yup.boolean().oneOf([true], "이용약관에 동의해야 합니다"),
  privacyAgreed: yup
    .boolean()
    .oneOf([true], "개인정보처리방침에 동의해야 합니다"),
  marketingAgreed: yup.boolean(),
});

type SignUpFormData = yup.InferType<typeof signUpSchema>;

// ─── Password Strength Calculator ─────────────────────────────
const calculatePasswordStrength = (password: string): number => {
  let strength = 0;

  if (password.length >= 8) strength += 20;
  if (password.length >= 12) strength += 10;
  if (/[a-z]/.test(password)) strength += 20;
  if (/[A-Z]/.test(password)) strength += 20;
  if (/\d/.test(password)) strength += 15;
  if (/[@$!%*?&]/.test(password)) strength += 15;

  return Math.min(strength, 100);
};

const getPasswordStrengthText = (strength: number): string => {
  if (strength < 25) return "매우 약함";
  if (strength < 50) return "약함";
  if (strength < 75) return "보통";
  return "강함";
};

// ─── Main Component ─────────────────────────────
export default function SignUpContainer() {
  const router = useRouter();
  const [signUpError, setSignUpError] = useState("");
  const [signUpSuccess, setSignUpSuccess] = useState(false);
  const [colorway, setColorway] = useState<keyof typeof COLORWAYS>("forest");
  const theme = COLORWAYS[colorway];

  // ✅ GraphQL mutation 사용
  const [createUser, { loading: isLoading }] = useMutation(CREATE_USER, {
    onCompleted: (data) => {
      console.log("회원가입 성공:", data);
      setSignUpSuccess(true);
    },
    onError: (error) => {
      console.error("회원가입 실패:", error);

      // GraphQL 에러 메시지 처리
      if (
        error.message.includes("duplicate") ||
        error.message.includes("already exists")
      ) {
        setSignUpError("이미 사용 중인 이메일입니다");
      } else if (error.message) {
        setSignUpError(error.message);
      } else {
        setSignUpError("회원가입 중 오류가 발생했습니다. 다시 시도해주세요");
      }
    },
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    setValue,
  } = useForm<SignUpFormData>({
    resolver: yupResolver(signUpSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
      phone: "",
      birthDate: "",
      termsAgreed: false,
      privacyAgreed: false,
      marketingAgreed: false,
    },
  });

  const password = watch("password");
  const passwordStrength = calculatePasswordStrength(password || "");

  // ─── Birth Date Input Handler ─────────────────────────────
  const handleBirthDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/\D/g, ""); // 숫자만 추출
    if (value.length <= 8) {
      setValue("birthDate", value);
    }
  };

  // ─── Form Submission ─────────────────────────────
  const onSubmit = async (data: SignUpFormData) => {
    setSignUpError("");

    try {
      // ✅ birthDate를 올바른 ISO 8601 형식으로 변환
      const year = parseInt(data.birthDate.substring(0, 4));
      const month = parseInt(data.birthDate.substring(4, 6)) - 1; // 월은 0부터 시작
      const day = parseInt(data.birthDate.substring(6, 8));

      // Date 객체로 생성 후 ISO 문자열로 변환
      const birthDate = new Date(Date.UTC(year, month, day, 0, 0, 0, 0));
      const birthDateISO = birthDate.toISOString();

      // �� 디버깅용
      console.log("원본 birthDate:", data.birthDate);
      console.log("변환된 ISO:", birthDateISO);

      // ✅ GraphQL mutation 실행
      await createUser({
        variables: {
          createUserInput: {
            name: data.name,
            email: data.email,
            password: data.password,
            phone: data.phone,
            birthDate: birthDateISO, // ← ISO 형식으로 전송
            termsAgreed: data.termsAgreed,
            privacyAgreed: data.privacyAgreed,
            marketingAgreed: data.marketingAgreed,
          },
        },
      });
    } catch (error) {
      // onError에서 처리됨
      console.error("Signup error:", error);
    }
  };

  // ─── Navigation Handlers ─────────────────────────────
  const handleLogin = () => {
    router.push("/login");
  };

  // ─── Terms Content (간단한 버전) ─────────────────────────────
  const termsContent = `GuardRail 서비스 이용약관

제1조 (목적)
본 약관은 GuardRail 서비스 이용과 관련된 사항을 규정합니다.

제2조 (서비스 이용)
1. 서비스는 회원가입 후 이용할 수 있습니다.
2. 서비스 이용 시 관련 법령을 준수해야 합니다.

제3조 (회원의 의무)
1. 정확한 정보를 제공해야 합니다.
2. 서비스를 부정하게 이용하지 않아야 합니다.

제4조 (면책)
회사는 서비스 이용과 관련하여 발생한 손해에 대해 
책임을 지지 않습니다.`;

  const privacyContent = `GuardRail 개인정보처리방침

1. 수집하는 개인정보
- 필수: 이름, 이메일, 비밀번호, 전화번호, 생년월일
- 선택: 마케팅 정보 수신 동의

2. 수집 목적
- 회원가입 및 관리
- 서비스 제공

3. 보유기간
- 회원 탈퇴 시까지

4. 개인정보보호책임자
- 연락처: qkjk1508@gmail.com`;

  if (signUpSuccess) {
    return (
      <Container gradient={theme.gradient}>
        <SignUpCard>
          <Header>
            <Logo accentBg={theme.accentBg} accentText={theme.accentText}>
              GDR
            </Logo>
            <Title>회원가입 완료!</Title>
            <Subtitle>가입이 완료되었습니다</Subtitle>
          </Header>

          <SuccessMessage>✅ {watch("email")}로 가입되었습니다</SuccessMessage>

          <Button onClick={handleLogin} variant="primary" theme={theme}>
            로그인 페이지로 이동
          </Button>
        </SignUpCard>
      </Container>
    );
  }

  return (
    <Container gradient={theme.gradient}>
      <SignUpCard>
        <Header>
          <Logo accentBg={theme.accentBg} accentText={theme.accentText}>
            GDR
          </Logo>
          <Title>회원가입</Title>
        </Header>

        <Form onSubmit={handleSubmit(onSubmit)}>
          <FormRow>
            <FormGroup>
              <Label htmlFor="name">이름 *</Label>
              <Input
                id="name"
                type="text"
                placeholder="이름을 입력하세요"
                hasError={!!errors.name}
                {...register("name")}
              />
              {errors.name && (
                <ErrorMessage>{errors.name.message}</ErrorMessage>
              )}
            </FormGroup>

            <FormGroup>
              <Label htmlFor="birthDate">생년월일 *</Label>
              <Input
                id="birthDate"
                type="text"
                placeholder="YYYYMMDD"
                hasError={!!errors.birthDate}
                value={watch("birthDate")}
                onChange={handleBirthDateChange}
                maxLength={8}
              />
              {errors.birthDate && (
                <ErrorMessage>{errors.birthDate.message}</ErrorMessage>
              )}
            </FormGroup>
          </FormRow>

          <FormGroup>
            <Label htmlFor="email">이메일 *</Label>
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
            <Label htmlFor="phone">전화번호 *</Label>
            <Input
              id="phone"
              type="tel"
              placeholder="010-1234-5678"
              hasError={!!errors.phone}
              {...register("phone")}
            />
            {errors.phone && (
              <ErrorMessage>{errors.phone.message}</ErrorMessage>
            )}
          </FormGroup>

          <FormGroup>
            <Label htmlFor="password">비밀번호 *</Label>
            <Input
              id="password"
              type="password"
              placeholder="비밀번호를 입력하세요"
              hasError={!!errors.password}
              {...register("password")}
            />
            {password && (
              <PasswordStrengthContainer>
                <PasswordStrengthBar>
                  <PasswordStrengthFill strength={passwordStrength} />
                </PasswordStrengthBar>
                <PasswordStrengthText strength={passwordStrength}>
                  비밀번호 강도: {getPasswordStrengthText(passwordStrength)}
                </PasswordStrengthText>
              </PasswordStrengthContainer>
            )}
            {errors.password && (
              <ErrorMessage>{errors.password.message}</ErrorMessage>
            )}
          </FormGroup>

          <FormGroup>
            <Label htmlFor="confirmPassword">비밀번호 확인 *</Label>
            <Input
              id="confirmPassword"
              type="password"
              placeholder="비밀번호를 다시 입력하세요"
              hasError={!!errors.confirmPassword}
              {...register("confirmPassword")}
            />
            {errors.confirmPassword && (
              <ErrorMessage>{errors.confirmPassword.message}</ErrorMessage>
            )}
          </FormGroup>

          <SectionTitle>
            <SectionIcon
              accentBg={theme.accentBg}
              accentText={theme.accentText}
            >
              📋
            </SectionIcon>
            이용약관
          </SectionTitle>
          <TermsContainer>
            <TermsText>{termsContent}</TermsText>
          </TermsContainer>

          <CheckboxContainer style={{ marginBottom: "2vh" }}>
            <Checkbox type="checkbox" {...register("termsAgreed")} />
            <CheckboxText>이용약관에 동의합니다 *</CheckboxText>
          </CheckboxContainer>
          {errors.termsAgreed && (
            <ErrorMessage>{errors.termsAgreed.message}</ErrorMessage>
          )}

          <SectionTitle>
            <SectionIcon
              accentBg={theme.accentBg}
              accentText={theme.accentText}
            >
              🔒
            </SectionIcon>
            개인정보처리방침
          </SectionTitle>
          <TermsContainer>
            <TermsText>{privacyContent}</TermsText>
          </TermsContainer>

          <CheckboxContainer>
            <Checkbox type="checkbox" {...register("privacyAgreed")} />
            <CheckboxText>개인정보처리방침에 동의합니다 *</CheckboxText>
          </CheckboxContainer>
          {errors.privacyAgreed && (
            <ErrorMessage>{errors.privacyAgreed.message}</ErrorMessage>
          )}

          <CheckboxContainer>
            <Checkbox type="checkbox" {...register("marketingAgreed")} />
            <CheckboxText>마케팅 정보 수신에 동의합니다 (선택)</CheckboxText>
          </CheckboxContainer>

          {signUpError && (
            <ErrorMessageContainer>{signUpError}</ErrorMessageContainer>
          )}

          <Button
            type="submit"
            variant="primary"
            theme={theme}
            disabled={isLoading}
          >
            {isLoading && <LoadingSpinner />}
            {isLoading ? "회원가입 중..." : "회원가입"}
          </Button>
        </Form>

        <LinkContainer>
          <span>이미 계정이 있으신가요? </span>
          <Link href="#" onClick={handleLogin}>
            로그인
          </Link>
        </LinkContainer>
      </SignUpCard>
    </Container>
  );
}
