import React, { useState } from "react";
import { useRouter } from "next/router";
import { useForm } from "react-hook-form";
import {
  Container,
  TopAppBar,
  AppBarContent,
  AppInfo,
  AppTitle,
  AppSubtitle,
  BackButton,
  ContentWrapper,
  FormCard,
  FormTitle,
  FormGroup,
  Label,
  Input,
  TextArea,
  ButtonGroup,
  Button,
  PreviewCard,
  PreviewTitle,
  PreviewContent,
  PreviewItem,
  PreviewLabel,
  SuccessMessage,
  ErrorMessage,
  EmptyState,
  EmptyIcon,
  EmptyTitle,
  EmptyDescription,
} from "./pavlovWriter.style";

// Colorway presets (pavlovSelection과 동일)
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
    accentBg: "#fef3c7",
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

interface PavlovFormData {
  stimulus: string;
  response: string;
}

export default function PavlovWriterPage() {
  const router = useRouter();
  const [colorway] = useState<keyof typeof COLORWAYS>("forest");
  const theme = COLORWAYS[colorway];

  // react-hook-form 설정
  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<PavlovFormData>({
    defaultValues: {
      stimulus: "",
      response: "",
    },
  });

  // 폼 상태
  const [showSuccess, setShowSuccess] = useState(false);
  const [showError, setShowError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  // 폼 데이터 감시 (미리보기용)
  const watchedValues = watch();

  // 아이콘 컴포넌트들
  const ArrowLeftIcon = () => <span>←</span>;
  const CheckIcon = () => <span>✓</span>;

  // 뒤로가기 핸들러
  const handleBack = () => {
    router.back();
  };

  // 폼 제출 핸들러
  const onSubmit = async (data: PavlovFormData) => {
    setShowError(false);

    try {
      // 실제로는 API 호출을 통해 데이터를 저장
      // 여기서는 로컬 스토리지에 저장하는 예시
      const newItem = {
        stimulus: data.stimulus.trim(),
        response: data.response.trim(),
      };

      // 기존 데이터 가져오기
      const existingData = localStorage.getItem("pavlovData");
      const storedData = existingData ? JSON.parse(existingData) : [];

      // 새 아이템 추가
      storedData.push(newItem);
      localStorage.setItem("pavlovData", JSON.stringify(storedData));

      // 성공 메시지 표시
      setShowSuccess(true);
      setTimeout(() => setShowSuccess(false), 3000);

      // 폼 초기화
      reset();
    } catch (error) {
      setErrorMessage("저장 중 오류가 발생했습니다. 다시 시도해주세요.");
      setShowError(true);
      setTimeout(() => setShowError(false), 3000);
    }
  };

  // 폼 초기화 핸들러
  const handleReset = () => {
    reset();
    setShowError(false);
    setShowSuccess(false);
  };

  return (
    <Container gradient={theme.gradient}>
      {/* Top App Bar */}
      <TopAppBar>
        <AppBarContent>
          <BackButton onClick={handleBack}>
            <ArrowLeftIcon />
          </BackButton>
          <AppInfo>
            <AppTitle>파블로브 생성</AppTitle>
            <AppSubtitle>새로운 조건반사를 만들어보세요</AppSubtitle>
          </AppInfo>
          <div style={{ width: "40px" }}></div>
        </AppBarContent>
      </TopAppBar>

      {/* Content */}
      <ContentWrapper>
        {/* Success/Error Messages */}
        {showSuccess && (
          <SuccessMessage>
            <CheckIcon /> 파블로프가 성공적으로 저장되었습니다!
          </SuccessMessage>
        )}

        {showError && <ErrorMessage>{errorMessage}</ErrorMessage>}

        {/* Form Card */}
        <FormCard>
          <FormTitle>새로운 파블로브 추가</FormTitle>

          <form onSubmit={handleSubmit(onSubmit)}>
            <FormGroup>
              <Label htmlFor="stimulus">자극 (상황)</Label>
              <Input
                id="stimulus"
                type="text"
                {...register("stimulus", {
                  required: "자극을 입력해주세요.",
                  minLength: {
                    value: 2,
                    message: "자극은 최소 2글자 이상 입력해주세요.",
                  },
                })}
              />
              {errors.stimulus && (
                <ErrorMessage>{errors.stimulus.message}</ErrorMessage>
              )}
            </FormGroup>

            <FormGroup>
              <Label htmlFor="response">반응 (행동 또는 생각)</Label>
              <TextArea
                id="response"
                {...register("response", {
                  required: "반응을 입력해주세요.",
                  minLength: {
                    value: 5,
                    message: "반응은 최소 5글자 이상 입력해주세요.",
                  },
                })}
              />
              {errors.response && (
                <ErrorMessage>{errors.response.message}</ErrorMessage>
              )}
            </FormGroup>

            <ButtonGroup>
              <Button type="button" variant="secondary" onClick={handleReset}>
                초기화
              </Button>
              <Button type="submit" variant="primary" disabled={isSubmitting}>
                {isSubmitting ? "저장 중..." : "저장하기"}
              </Button>
            </ButtonGroup>
          </form>
        </FormCard>

        {/* Preview Card */}
        {(watchedValues.stimulus || watchedValues.response) && (
          <PreviewCard theme={theme}>
            <PreviewTitle>미리보기</PreviewTitle>
            <PreviewContent>
              {watchedValues.stimulus && (
                <PreviewItem>
                  <PreviewLabel>자극:</PreviewLabel>
                  {watchedValues.stimulus}
                </PreviewItem>
              )}
              {watchedValues.response && (
                <PreviewItem>
                  <PreviewLabel>반응:</PreviewLabel>
                  {watchedValues.response}
                </PreviewItem>
              )}
            </PreviewContent>
          </PreviewCard>
        )}

        {/* Empty State */}
        {!watchedValues.stimulus && !watchedValues.response && (
          <EmptyState>
            <EmptyIcon>✍️</EmptyIcon>
            <EmptyTitle>새로운 파블로브를 만들어보세요</EmptyTitle>
            <EmptyDescription>
              위의 폼을 작성하여 나만의 조건반사를 추가할 수 있습니다
            </EmptyDescription>
          </EmptyState>
        )}
      </ContentWrapper>
    </Container>
  );
}
