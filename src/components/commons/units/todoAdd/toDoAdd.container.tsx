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
  FormContainer,
  FormSection,
  SectionTitle,
  SectionIcon,
  FormGroup,
  Label,
  Input,
  Textarea,
  TimeInput,
  Select,
  ButtonGroup,
  Button,
  PriorityBadge,
  ErrorMessage,
  SuccessMessage,
  RecurringDropdown,
  RecurringSelector,
  RecurringText,
  RecurringArrow,
  RecurringOptions,
  RecurringOption,
  CategoryDropdown,
  CategorySelector,
  CategoryText,
  CategoryArrow,
  CategoryOptions,
  CategoryOption,
  PriorityDropdown,
  PrioritySelector,
  PriorityText,
  PriorityArrow,
  PriorityOptions,
  PriorityOption,
} from "./toDoAdd.style";

// Colorway presets (mainPage와 동일)
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

// 폼 데이터 타입 정의
interface TodoFormData {
  title: string;
  description: string;
  date: string;
  time: string;
  priority: "low" | "medium" | "high";
  category: string;
  isRecurring: boolean;
  recurringType: "daily" | "weekly" | "monthly" | "none";
}

export default function TodoAddPage() {
  const router = useRouter();
  const [colorway] = useState<keyof typeof COLORWAYS>("forest");
  const theme = COLORWAYS[colorway];
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [isRecurringDropdownOpen, setIsRecurringDropdownOpen] = useState(false);
  const [isCategoryDropdownOpen, setIsCategoryDropdownOpen] = useState(false);
  const [isPriorityDropdownOpen, setIsPriorityDropdownOpen] = useState(false);

  // react-hook-form 사용
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    reset,
    setValue,
  } = useForm<TodoFormData>({
    defaultValues: {
      title: "",
      description: "",
      date: new Date().toISOString().split("T")[0], // 오늘 날짜
      time: "",
      priority: "medium",
      category: "",
      isRecurring: false,
      recurringType: "none",
    },
  });

  const isRecurring = watch("isRecurring");

  // 아이콘 컴포넌트들
  const ArrowLeftIcon = () => <span>←</span>;
  const TaskIcon = () => <span>📝</span>;
  const TimeIcon = () => <span>⏰</span>;
  const CategoryIcon = () => <span>🏷️</span>;
  const RepeatIcon = () => <span>🔁</span>;

  // 뒤로가기 핸들러
  const handleBack = () => {
    router.back();
  };

  // 폼 제출 핸들러
  const onSubmit = async (data: TodoFormData) => {
    setIsSubmitting(true);
    console.log("투두 추가:", data);

    // TODO: API 호출로 투두 저장
    // await saveTodo(data);

    // 성공 메시지 표시
    setTimeout(() => {
      setSubmitSuccess(true);
      setIsSubmitting(false);

      // 2초 후 이전 페이지로 이동
      setTimeout(() => {
        router.back();
      }, 2000);
    }, 1000);
  };

  // 폼 초기화 핸들러
  const handleReset = () => {
    reset();
  };

  // 반복 설정 드롭다운 토글
  const handleRecurringDropdownToggle = () => {
    setIsRecurringDropdownOpen(!isRecurringDropdownOpen);
  };

  // 반복 설정 선택
  const handleRecurringSelect = (type: "daily" | "weekly" | "monthly") => {
    setValue("recurringType", type);
    setIsRecurringDropdownOpen(false);
  };

  // 카테고리 드롭다운 토글
  const handleCategoryDropdownToggle = () => {
    setIsCategoryDropdownOpen(!isCategoryDropdownOpen);
  };

  // 카테고리 선택
  const handleCategorySelect = (category: string) => {
    setValue("category", category);
    setIsCategoryDropdownOpen(false);
  };

  // 우선순위 드롭다운 토글
  const handlePriorityDropdownToggle = () => {
    setIsPriorityDropdownOpen(!isPriorityDropdownOpen);
  };

  // 우선순위 선택
  const handlePrioritySelect = (priority: "low" | "medium" | "high") => {
    setValue("priority", priority);
    setIsPriorityDropdownOpen(false);
  };

  // 우선순위 이름을 한글로 변환하는 함수
  const getPriorityDisplayName = (priority: string) => {
    const priorityMap: Record<string, string> = {
      low: "낮음",
      medium: "보통",
      high: "높음",
    };
    return priorityMap[priority] || "보통";
  };

  // 카테고리 이름을 한글로 변환하는 함수
  const getCategoryDisplayName = (category: string) => {
    const categoryMap: Record<string, string> = {
      work: "업무",
      personal: "개인",
      health: "건강",
      study: "학습",
      family: "가족",
      hobby: "취미",
    };
    return categoryMap[category] || "카테고리 선택";
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
            <AppTitle>TO-DO 추가</AppTitle>
            <AppSubtitle>새로운 할 일을 등록해보세요</AppSubtitle>
          </AppInfo>
          <div style={{ width: "40px" }}></div> {/* 자리만 차지하는 빈 div */}
        </AppBarContent>
      </TopAppBar>

      {/* Content */}
      <ContentWrapper>
        <FormContainer onSubmit={handleSubmit(onSubmit)}>
          {/* 기본 정보 섹션 */}
          <FormSection>
            <SectionTitle>
              <SectionIcon
                accentBg={theme.accentBg}
                accentText={theme.accentText}
              >
                <TaskIcon />
              </SectionIcon>
              기본 정보
            </SectionTitle>

            <FormGroup>
              <Label>제목 *</Label>
              <Input
                placeholder="할 일의 제목을 입력하세요"
                {...register("title", {
                  required: "제목을 입력해주세요",
                  minLength: {
                    value: 2,
                    message: "최소 2자 이상 입력해주세요",
                  },
                })}
              />
              {errors.title && (
                <ErrorMessage>{errors.title.message}</ErrorMessage>
              )}
            </FormGroup>

            <FormGroup>
              <Label>설명</Label>
              <Textarea
                placeholder="할 일에 대한 설명을 입력하세요"
                {...register("description")}
              />
            </FormGroup>
          </FormSection>

          {/* 시간 설정 섹션 */}
          <FormSection>
            <SectionTitle>
              <SectionIcon
                accentBg={theme.accentBg}
                accentText={theme.accentText}
              >
                <TimeIcon />
              </SectionIcon>
              시간 설정
            </SectionTitle>

            <FormGroup>
              <Label>날짜 *</Label>
              <Input
                type="date"
                {...register("date", { required: "날짜를 선택해주세요" })}
              />
              {errors.date && (
                <ErrorMessage>{errors.date.message}</ErrorMessage>
              )}
            </FormGroup>

            <FormGroup>
              <Label>시간</Label>
              <TimeInput type="time" {...register("time")} />
            </FormGroup>

            <FormGroup>
              <Label>우선순위</Label>
              <PriorityDropdown isOpen={isPriorityDropdownOpen}>
                <PrioritySelector onClick={handlePriorityDropdownToggle}>
                  <PriorityText>
                    {getPriorityDisplayName(watch("priority"))}
                  </PriorityText>
                  <PriorityArrow isOpen={isPriorityDropdownOpen}>
                    ▼
                  </PriorityArrow>
                </PrioritySelector>
                <PriorityOptions isOpen={isPriorityDropdownOpen}>
                  <PriorityOption
                    isSelected={watch("priority") === "low"}
                    onClick={() => handlePrioritySelect("low")}
                  >
                    낮음
                  </PriorityOption>
                  <PriorityOption
                    isSelected={watch("priority") === "medium"}
                    onClick={() => handlePrioritySelect("medium")}
                  >
                    보통
                  </PriorityOption>
                  <PriorityOption
                    isSelected={watch("priority") === "high"}
                    onClick={() => handlePrioritySelect("high")}
                  >
                    높음
                  </PriorityOption>
                </PriorityOptions>
              </PriorityDropdown>
            </FormGroup>
          </FormSection>

          {/* 카테고리 섹션 */}
          <FormSection>
            <SectionTitle>
              <SectionIcon
                accentBg={theme.accentBg}
                accentText={theme.accentText}
              >
                <CategoryIcon />
              </SectionIcon>
              카테고리
            </SectionTitle>

            <FormGroup>
              <Label>카테고리</Label>
              <CategoryDropdown isOpen={isCategoryDropdownOpen}>
                <CategorySelector onClick={handleCategoryDropdownToggle}>
                  <CategoryText>
                    {getCategoryDisplayName(watch("category"))}
                  </CategoryText>
                  <CategoryArrow isOpen={isCategoryDropdownOpen}>
                    ▼
                  </CategoryArrow>
                </CategorySelector>
                <CategoryOptions isOpen={isCategoryDropdownOpen}>
                  <CategoryOption
                    isSelected={watch("category") === "work"}
                    onClick={() => handleCategorySelect("work")}
                  >
                    업무
                  </CategoryOption>
                  <CategoryOption
                    isSelected={watch("category") === "personal"}
                    onClick={() => handleCategorySelect("personal")}
                  >
                    개인
                  </CategoryOption>
                  <CategoryOption
                    isSelected={watch("category") === "health"}
                    onClick={() => handleCategorySelect("health")}
                  >
                    건강
                  </CategoryOption>
                  <CategoryOption
                    isSelected={watch("category") === "study"}
                    onClick={() => handleCategorySelect("study")}
                  >
                    학습
                  </CategoryOption>
                  <CategoryOption
                    isSelected={watch("category") === "family"}
                    onClick={() => handleCategorySelect("family")}
                  >
                    가족
                  </CategoryOption>
                  <CategoryOption
                    isSelected={watch("category") === "hobby"}
                    onClick={() => handleCategorySelect("hobby")}
                  >
                    취미
                  </CategoryOption>
                </CategoryOptions>
              </CategoryDropdown>
            </FormGroup>
          </FormSection>

          {/* 반복 설정 섹션 */}
          <FormSection>
            <SectionTitle>
              <SectionIcon
                accentBg={theme.accentBg}
                accentText={theme.accentText}
              >
                <RepeatIcon />
              </SectionIcon>
              반복 설정
            </SectionTitle>

            <FormGroup>
              <Label>
                <input
                  type="checkbox"
                  {...register("isRecurring")}
                  style={{ marginRight: "8px" }}
                />
                반복 설정
              </Label>
            </FormGroup>

            {isRecurring && (
              <FormGroup>
                <Label>반복 주기</Label>
                <RecurringDropdown isOpen={isRecurringDropdownOpen}>
                  <RecurringSelector onClick={handleRecurringDropdownToggle}>
                    <RecurringText>
                      {watch("recurringType") === "daily" && "매일"}
                      {watch("recurringType") === "weekly" && "매주"}
                      {watch("recurringType") === "monthly" && "매월"}
                      {watch("recurringType") === "none" && "선택하세요"}
                    </RecurringText>
                    <RecurringArrow isOpen={isRecurringDropdownOpen}>
                      ▼
                    </RecurringArrow>
                  </RecurringSelector>
                  <RecurringOptions isOpen={isRecurringDropdownOpen}>
                    <RecurringOption
                      isSelected={watch("recurringType") === "daily"}
                      onClick={() => handleRecurringSelect("daily")}
                    >
                      매일
                    </RecurringOption>
                    <RecurringOption
                      isSelected={watch("recurringType") === "weekly"}
                      onClick={() => handleRecurringSelect("weekly")}
                    >
                      매주
                    </RecurringOption>
                    <RecurringOption
                      isSelected={watch("recurringType") === "monthly"}
                      onClick={() => handleRecurringSelect("monthly")}
                    >
                      매월
                    </RecurringOption>
                  </RecurringOptions>
                </RecurringDropdown>
              </FormGroup>
            )}
          </FormSection>

          {/* 버튼 그룹 */}
          <ButtonGroup>
            <Button
              type="button"
              variant="secondary"
              theme={theme}
              onClick={handleReset}
            >
              초기화
            </Button>
            <Button type="submit" theme={theme} disabled={isSubmitting}>
              {isSubmitting ? "저장 중..." : "투두 추가"}
            </Button>
          </ButtonGroup>

          {/* 성공 메시지 */}
          {submitSuccess && (
            <SuccessMessage>
              투두가 성공적으로 추가되었습니다! 잠시 후 이전 페이지로
              이동합니다.
            </SuccessMessage>
          )}
        </FormContainer>
      </ContentWrapper>
    </Container>
  );
}
