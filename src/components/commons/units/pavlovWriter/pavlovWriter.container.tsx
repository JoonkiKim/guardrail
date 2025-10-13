import React, { useState } from "react";
import { useRouter } from "next/router";
import { useForm } from "react-hook-form";
import { useMutation, useQuery } from "@apollo/client";
import {
  CREATE_PAVLOV,
  UPDATE_PAVLOV,
  FETCH_PAVLOVS,
} from "../../../../commons/apis/graphql-queries";
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
  AddButton,
  StimulusDropdown,
  StimulusSelector,
  StimulusText,
  StimulusArrow,
  StimulusOptions,
  StimulusOption,
} from "./pavlovWriter.style";

// Colorway presets (pavlovSelection과 동일) - 동일
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

// Pavlov 타입 정의 (GraphQL 스키마와 일치)
interface Pavlov {
  id: string;
  name: string;
  pavlovDetails: PavlovDetail[];
  createdAt: string;
  updatedAt: string;
}

interface PavlovDetail {
  id: string;
  description: string;
}

interface PavlovFormData {
  stimulus: string;
  responses: string[];
}

export default function PavlovWriterPage() {
  const router = useRouter();
  const [colorway] = useState<keyof typeof COLORWAYS>("forest");
  const theme = COLORWAYS[colorway];

  // 반응 입력창 개수 관리
  const [responseCount, setResponseCount] = useState(3);

  // 드롭다운 상태 관리
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  // 자극 입력 모드 관리 (드롭다운 vs 텍스트 입력)
  const [isCustomStimulusMode, setIsCustomStimulusMode] = useState(false);

  // 선택된 파블로프 ID 저장 (업데이트용)
  const [selectedPavlovId, setSelectedPavlovId] = useState<string | null>(null);

  // GraphQL 쿼리로 기존 파블로프 목록 조회
  const { data: pavlovsData, refetch } = useQuery<{ fetchPavlovs: Pavlov[] }>(
    FETCH_PAVLOVS,
    {
      notifyOnNetworkStatusChange: true,
    }
  );

  // 서버에서 가져온 파블로프 데이터
  const pavlovs = pavlovsData?.fetchPavlovs || [];

  // 서버에서 가져온 파블로프 데이터를 기존 형식으로 변환
  const pavlovData = React.useMemo(() => {
    if (!pavlovsData?.fetchPavlovs) return [];

    return pavlovsData.fetchPavlovs.flatMap((pavlov) =>
      pavlov.pavlovDetails.map((detail) => ({
        stimulus: pavlov.name,
        response: detail.description,
      }))
    );
  }, [pavlovsData]);

  // 고유한 stimulus 목록 추출 (서버 데이터만)
  const uniqueStimuli = React.useMemo(() => {
    return Array.from(new Set(pavlovData.map((item) => item.stimulus))).sort();
  }, [pavlovData]);

  // react-hook-form 설정
  const {
    register,
    handleSubmit,
    watch,
    reset,
    setValue,
    formState: { errors },
  } = useForm<PavlovFormData>({
    defaultValues: {
      stimulus: "",
      responses: ["", "", ""],
    },
  });

  // 폼 상태
  const [showSuccess, setShowSuccess] = useState(false);
  const [showError, setShowError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  // GraphQL mutation - CREATE
  const [createPavlov, { loading: isCreating, error: createError }] =
    useMutation(CREATE_PAVLOV, {
      onCompleted: (data) => {
        console.log("파블로프 생성 완료:", data);
        setShowSuccess(true);
        setTimeout(() => setShowSuccess(false), 3000);

        // 폼 초기화
        reset();
        setResponseCount(3);
        setIsCustomStimulusMode(false);
        setSelectedPavlovId(null);

        // 목록 새로고침
        refetch();
      },
      onError: (error) => {
        console.error("파블로프 생성 실패:", error);
        setErrorMessage(
          "파블로프 저장 중 오류가 발생했습니다. 다시 시도해주세요."
        );
        setShowError(true);
        setTimeout(() => setShowError(false), 3000);
      },
    });

  // GraphQL mutation - UPDATE
  const [updatePavlov, { loading: isUpdating, error: updateError }] =
    useMutation(UPDATE_PAVLOV, {
      onCompleted: (data) => {
        console.log("파블로프 업데이트 완료:", data);
        setShowSuccess(true);
        setTimeout(() => setShowSuccess(false), 3000);

        // 폼 초기화
        reset();
        setResponseCount(3);
        setIsCustomStimulusMode(false);
        setSelectedPavlovId(null);

        // 목록 새로고침
        refetch();
      },
      onError: (error) => {
        console.error("파블로프 업데이트 실패:", error);
        setErrorMessage(
          "파블로프 업데이트 중 오류가 발생했습니다. 다시 시도해주세요."
        );
        setShowError(true);
        setTimeout(() => setShowError(false), 3000);
      },
    });

  const isSubmitting = isCreating || isUpdating;
  const mutationError = createError || updateError;

  // 폼 데이터 감시 (미리보기용)
  const watchedValues = watch();

  // 아이콘 컴포넌트들
  const ArrowLeftIcon = () => <span>←</span>;
  const CheckIcon = () => <span>✓</span>;
  const ChevronDownIcon = () => <span>▼</span>;
  const PlusIcon = () => <span>+</span>;

  // 뒤로가기 핸들러
  const handleBack = () => {
    router.back();
  };

  // 반응 입력창 추가 핸들러
  const handleAddResponse = () => {
    setResponseCount((prev) => prev + 1);
    // 새로운 빈 반응 입력창을 추가
    setValue(`responses.${responseCount}`, "");
  };

  // 드롭다운 토글 핸들러
  const handleDropdownToggle = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  // stimulus 선택 핸들러 (서버 데이터만 사용)
  const handleStimulusSelect = (stimulus: string) => {
    setValue("stimulus", stimulus);
    setIsDropdownOpen(false);
    setIsCustomStimulusMode(false);

    // 선택된 stimulus에 해당하는 Pavlov 찾기
    const selectedPavlov = pavlovs.find((p) => p.name === stimulus);
    if (selectedPavlov) {
      setSelectedPavlovId(selectedPavlov.id);
    }

    // 선택된 stimulus에 해당하는 responses 찾기 (서버 데이터에서)
    const matchingResponses = pavlovData
      .filter((item) => item.stimulus === stimulus)
      .map((item) => item.response);

    // 반응 입력창 개수를 responses 개수만큼 설정 (최소 3개)
    const newResponseCount = Math.max(matchingResponses.length, 3);
    setResponseCount(newResponseCount);

    // responses 배열을 새로운 길이로 설정하고 기존 responses로 채우기
    const newResponses = Array(newResponseCount)
      .fill("")
      .map((_, index) => matchingResponses[index] || "");

    // 각 반응 입력창에 값을 설정
    newResponses.forEach((response, index) => {
      setValue(`responses.${index}`, response);
    });
  };

  // 새로운 자극 추가 모드로 전환
  const handleAddNewStimulus = () => {
    setIsCustomStimulusMode(true);
    setIsDropdownOpen(false);
    setValue("stimulus", "");
    setSelectedPavlovId(null);

    // 반응 입력창을 기본 3개로 리셋
    setResponseCount(3);
    setValue("responses", ["", "", ""]);
  };

  // 드롭다운 모드로 돌아가기
  const handleBackToDropdown = () => {
    setIsCustomStimulusMode(false);
    setValue("stimulus", "");
    setSelectedPavlovId(null);

    // 반응 입력창을 기본 3개로 리셋
    setResponseCount(3);
    setValue("responses", ["", "", ""]);
  };

  // 폼 제출 핸들러
  const onSubmit = async (data: PavlovFormData) => {
    setShowError(false);

    try {
      // 빈 반응 필터링
      const validResponses = data.responses.filter(
        (response) => response.trim() !== ""
      );

      if (validResponses.length === 0) {
        setErrorMessage("최소 하나의 반응을 입력해주세요.");
        setShowError(true);
        setTimeout(() => setShowError(false), 3000);
        return;
      }

      // 기존 자극을 선택한 경우 (UPDATE)
      if (selectedPavlovId) {
        // GraphQL 스키마에 맞게 데이터 변환 (입력된 모든 반응)
        const updatePavlovInput = {
          name: data.stimulus.trim(),
          pavlovDetails: validResponses.map((response) => ({
            description: response.trim(),
          })),
        };

        console.log("파블로프 업데이트 요청:", {
          pavlovId: selectedPavlovId,
          updatePavlovInput,
        });

        // GraphQL mutation 실행 (UPDATE)
        await updatePavlov({
          variables: {
            pavlovId: selectedPavlovId,
            updatePavlovInput: updatePavlovInput,
          },
        });
      } else {
        // 새로운 자극인 경우 (CREATE)
        const createPavlovInput = {
          name: data.stimulus.trim(),
          pavlovDetails: validResponses.map((response) => ({
            description: response.trim(),
          })),
        };

        console.log("파블로프 생성 요청:", createPavlovInput);

        // GraphQL mutation 실행 (CREATE)
        await createPavlov({
          variables: {
            createPavlovInput: createPavlovInput,
          },
        });
      }
    } catch (error) {
      console.error("파블로프 처리 중 오류:", error);
    }
  };

  // 폼 초기화 핸들러
  const handleReset = () => {
    reset();
    setResponseCount(3);
    setShowError(false);
    setShowSuccess(false);
    setSelectedPavlovId(null);
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

        {/* Error Message for GraphQL errors */}
        {mutationError && (
          <ErrorMessage>
            파블로프 생성 중 오류가 발생했습니다: {mutationError.message}
          </ErrorMessage>
        )}

        {/* Form Card */}
        <FormCard>
          <FormTitle>새로운 파블로브 추가</FormTitle>

          <form onSubmit={handleSubmit(onSubmit)}>
            <FormGroup>
              <Label>자극 (상황)</Label>

              {isCustomStimulusMode ? (
                // 텍스트 입력 모드
                <div>
                  <Input
                    type="text"
                    placeholder="새로운 자극을 입력하세요"
                    {...register("stimulus", {
                      required: "자극을 입력해주세요.",
                      minLength: {
                        value: 2,
                        message: "자극은 최소 2글자 이상 입력해주세요.",
                      },
                    })}
                  />
                  <Button
                    type="button"
                    variant="secondary"
                    onClick={handleBackToDropdown}
                    style={{
                      marginTop: "8px",
                      fontSize: "14px",
                      padding: "8px 16px",
                    }}
                  >
                    ← 기존 자극에서 선택하기
                  </Button>
                </div>
              ) : (
                // 드롭다운 모드
                <StimulusDropdown isOpen={isDropdownOpen}>
                  <StimulusSelector onClick={handleDropdownToggle}>
                    <StimulusText>
                      {watchedValues.stimulus || "자극을 선택하세요"}
                    </StimulusText>
                    <StimulusArrow isOpen={isDropdownOpen}>
                      <ChevronDownIcon />
                    </StimulusArrow>
                  </StimulusSelector>
                  <StimulusOptions isOpen={isDropdownOpen}>
                    {/* 새로운 자극 추가 옵션 */}
                    <StimulusOption
                      isSelected={false}
                      onClick={handleAddNewStimulus}
                      style={{
                        backgroundColor: "#f0f9ff",
                        borderBottom: "1px solid #e5e7eb",
                        fontWeight: "600",
                        color: "#0369a1",
                      }}
                    >
                      <PlusIcon /> 새로운 자극 추가하기
                    </StimulusOption>

                    {/* 기존 자극 옵션들 (서버 데이터만) */}
                    {uniqueStimuli.map((stimulus) => (
                      <StimulusOption
                        key={stimulus}
                        isSelected={watchedValues.stimulus === stimulus}
                        onClick={() => handleStimulusSelect(stimulus)}
                      >
                        {stimulus}
                      </StimulusOption>
                    ))}
                  </StimulusOptions>
                </StimulusDropdown>
              )}

              {errors.stimulus && (
                <ErrorMessage>{errors.stimulus.message}</ErrorMessage>
              )}
            </FormGroup>

            <FormGroup>
              <Label>반응 (행동 또는 생각)</Label>
              {Array.from({ length: responseCount }, (_, index) => (
                <Input
                  key={index}
                  type="text"
                  placeholder="반응입력"
                  {...register(`responses.${index}` as const, {
                    minLength: {
                      value: 2,
                      message: "반응은 최소 2글자 이상 입력해주세요.",
                    },
                  })}
                  style={{
                    marginBottom: index < responseCount - 1 ? "12px" : "0",
                  }}
                />
              ))}

              {/* + 버튼 */}
              <AddButton type="button" onClick={handleAddResponse}>
                +
              </AddButton>

              {/* 반응 에러 메시지 */}
              {errors.responses && (
                <ErrorMessage>
                  {errors.responses[0]?.message ||
                    "반응 입력에 오류가 있습니다."}
                </ErrorMessage>
              )}
            </FormGroup>

            <ButtonGroup>
              <Button type="submit" variant="primary" disabled={isSubmitting}>
                {isSubmitting ? "저장 중..." : "저장하기"}
              </Button>
            </ButtonGroup>
          </form>
        </FormCard>

        {/* Preview Card */}
        {(watchedValues.stimulus ||
          watchedValues.responses?.some((r) => r && r.trim())) && (
          <PreviewCard theme={theme}>
            <PreviewTitle>미리보기</PreviewTitle>
            <PreviewContent>
              {watchedValues.stimulus && (
                <PreviewItem>
                  <PreviewLabel>자극:</PreviewLabel>
                  {watchedValues.stimulus}
                </PreviewItem>
              )}
              {watchedValues.responses
                ?.filter((r) => r && r.trim())
                .map((response, index) => (
                  <PreviewItem key={index}>
                    <PreviewLabel>반응 {index + 1}:</PreviewLabel>
                    {response}
                  </PreviewItem>
                ))}
            </PreviewContent>
          </PreviewCard>
        )}

        {/* Empty State */}
        {!watchedValues.stimulus &&
          !watchedValues.responses?.some((r) => r && r.trim()) && (
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
