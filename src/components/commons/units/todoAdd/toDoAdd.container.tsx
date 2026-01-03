import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { useForm } from "react-hook-form";
import { useMutation, useQuery } from "@apollo/client";
import { useRecoilValue } from "recoil";
import { authCheckedState } from "../../../../commons/stores";
import {
  CREATE_TODO,
  UPDATE_TODO,
  FETCH_TODO,
} from "../../../../commons/apis/graphql-queries"; // GraphQL mutation import
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
import TodoSuccessModal from "../../../../components/commons/modals/TodoSuccessModal";

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

// 폼 데이터 타입 정의 (GraphQL 스키마와 일치)
interface TodoFormData {
  title: string;
  description: string;
  date: string;
  startTime: string;
  endTime: string;
  priority: "LOW" | "MEDIUM" | "HIGH"; // GraphQL enum과 일치
  category: string;
  isRecurring: boolean;
  recurringType: "daily" | "weekly" | "monthly" | "none";
  recurringEndDate: string;
}

// 커스텀 시간 선택 컴포넌트
interface CustomTimeSelectorProps {
  value: string;
  onChange: (time: string) => void;
  placeholder: string;
  error?: string;
}

const CustomTimeSelector: React.FC<CustomTimeSelectorProps> = ({
  value,
  onChange,
  placeholder,
  error,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedHour, setSelectedHour] = useState<string>("");
  const [selectedMinute, setSelectedMinute] = useState<string>("");

  // 현재 선택된 시간을 파싱
  React.useEffect(() => {
    if (value) {
      const [hour, minute] = value.split(":");
      setSelectedHour(hour || "");
      setSelectedMinute(minute || "");
    } else {
      setSelectedHour("");
      setSelectedMinute("");
    }
  }, [value]);

  // 시간 옵션 생성 (00 ~ 23)
  const hourOptions = Array.from({ length: 24 }, (_, i) =>
    i.toString().padStart(2, "0")
  );

  // 분 옵션 생성 (00, 15, 30, 45)
  const minuteOptions = ["00", "15", "30", "45"];

  // 시간 완성 시 onChange 호출
  const handleTimeComplete = (hour: string, minute: string) => {
    if (hour && minute) {
      const timeString = `${hour}:${minute}`;
      onChange(timeString);
      setIsOpen(false);
    }
  };

  // 시간 선택 핸들러
  const handleHourSelect = (hour: string) => {
    setSelectedHour(hour);
    if (selectedMinute) {
      handleTimeComplete(hour, selectedMinute);
    }
  };

  // 분 선택 핸들러
  const handleMinuteSelect = (minute: string) => {
    setSelectedMinute(minute);
    if (selectedHour) {
      handleTimeComplete(selectedHour, minute);
    }
  };

  // 시간 포맷팅 (HH:MM → HH시 MM분)
  const formatDisplayTime = (time: string) => {
    if (!time) return "";
    const [hours, minutes] = time.split(":");
    return `${hours}시 ${minutes}분`;
  };

  return (
    <div style={{ position: "relative", width: "100%" }}>
      <div
        style={{
          width: "100%",
          padding: "12px 16px",
          border: `2px solid ${error ? "#ef4444" : "#e5e7eb"}`,
          borderRadius: "8px",
          fontSize: "16px",
          backgroundColor: "white",
          cursor: "pointer",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          color: value ? "inherit" : "#9ca3af",
        }}
        onClick={() => setIsOpen(!isOpen)}
      >
        <span>{value ? formatDisplayTime(value) : placeholder}</span>
        <span style={{ fontSize: "12px" }}>{isOpen ? "▲" : "▼"}</span>
      </div>

      {isOpen && (
        <div
          style={{
            position: "absolute",
            top: "100%",
            left: 0,
            right: 0,
            backgroundColor: "white",
            border: "2px solid #e5e7eb",
            borderTop: "none",
            borderRadius: "0 0 8px 8px",
            maxHeight: "300px",
            overflow: "hidden",
            zIndex: 1000,
            boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1)",
          }}
        >
          {/* 시와 분 선택 영역 */}
          <div
            style={{
              display: "flex",
              minHeight: "200px",
            }}
          >
            {/* 시 선택 열 */}
            <div style={{ flex: 1, borderRight: "1px solid #e5e7eb" }}>
              <div
                style={{
                  padding: "8px",
                  backgroundColor: "#f3f4f6",
                  textAlign: "center",
                  fontSize: "12px",
                  fontWeight: "600",
                  color: "#6b7280",
                  borderBottom: "1px solid #e5e7eb",
                }}
              >
                시
              </div>
              <div style={{ maxHeight: "160px", overflowY: "auto" }}>
                {hourOptions.map((hour) => (
                  <div
                    key={hour}
                    style={{
                      padding: "10px 12px",
                      cursor: "pointer",
                      backgroundColor:
                        selectedHour === hour ? "#3b82f6" : "white",
                      color: selectedHour === hour ? "white" : "#374151",
                      textAlign: "center",
                      fontSize: "14px",
                      fontWeight: "500",
                      borderBottom: "1px solid #f3f4f6",
                      transition: "all 0.2s ease",
                    }}
                    onClick={() => handleHourSelect(hour)}
                    onMouseEnter={(e) => {
                      if (selectedHour !== hour) {
                        e.currentTarget.style.backgroundColor = "#f9fafb";
                      }
                    }}
                    onMouseLeave={(e) => {
                      if (selectedHour !== hour) {
                        e.currentTarget.style.backgroundColor = "white";
                      }
                    }}
                  >
                    {hour}
                  </div>
                ))}
              </div>
            </div>

            {/* 분 선택 열 */}
            <div style={{ flex: 1 }}>
              <div
                style={{
                  padding: "8px",
                  backgroundColor: "#f3f4f6",
                  textAlign: "center",
                  fontSize: "12px",
                  fontWeight: "600",
                  color: "#6b7280",
                  borderBottom: "1px solid #e5e7eb",
                }}
              >
                분
              </div>
              <div style={{ maxHeight: "160px", overflowY: "auto" }}>
                {minuteOptions.map((minute) => (
                  <div
                    key={minute}
                    style={{
                      padding: "10px 12px",
                      cursor: "pointer",
                      backgroundColor:
                        selectedMinute === minute ? "#3b82f6" : "white",
                      color: selectedMinute === minute ? "white" : "#374151",
                      textAlign: "center",
                      fontSize: "14px",
                      fontWeight: "500",
                      borderBottom: "1px solid #f3f4f6",
                      transition: "all 0.2s ease",
                    }}
                    onClick={() => handleMinuteSelect(minute)}
                    onMouseEnter={(e) => {
                      if (selectedMinute !== minute) {
                        e.currentTarget.style.backgroundColor = "#f9fafb";
                      }
                    }}
                    onMouseLeave={(e) => {
                      if (selectedMinute !== minute) {
                        e.currentTarget.style.backgroundColor = "white";
                      }
                    }}
                  >
                    {minute}
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* 선택된 시간 표시 */}
          {(selectedHour || selectedMinute) && (
            <div
              style={{
                padding: "12px 16px",
                backgroundColor: "#f0f9ff",
                borderTop: "1px solid #e5e7eb",
                textAlign: "center",
                fontSize: "14px",
                color: "#0369a1",
                fontWeight: "500",
              }}
            >
              {selectedHour && selectedMinute
                ? `${selectedHour}시 ${selectedMinute}분`
                : selectedHour
                ? `${selectedHour}시 선택됨`
                : `${selectedMinute}분 선택됨`}
            </div>
          )}
        </div>
      )}

      {/* 외부 클릭 시 드롭다운 닫기 */}
      {isOpen && (
        <div
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            zIndex: 999,
          }}
          onClick={() => setIsOpen(false)}
        />
      )}
    </div>
  );
};

export default function TodoAddPage({
  isEdit = false,
  todoId,
}: {
  isEdit?: boolean;
  todoId?: string;
}) {
  const router = useRouter();
  const [colorway] = useState<keyof typeof COLORWAYS>("forest");
  const theme = COLORWAYS[colorway];
  const [showModal, setShowModal] = useState(false);
  const [showNoChangesMessage, setShowNoChangesMessage] = useState(false);
  const [isRecurringDropdownOpen, setIsRecurringDropdownOpen] = useState(false);
  const [isPriorityDropdownOpen, setIsPriorityDropdownOpen] = useState(false);

  // GraphQL mutations
  const [createTodo, { loading: isCreating, error: createError }] = useMutation(
    CREATE_TODO,
    {
      onCompleted: (data) => {
        console.log("투두 생성 완료:", data);
        setShowModal(true); // 성공 시 모달 표시
      },
      onError: (error) => {
        console.error("투두 생성 실패:", error);
      },
    }
  );

  const [updateTodo, { loading: isUpdating, error: updateError }] = useMutation(
    UPDATE_TODO,
    {
      onCompleted: (data) => {
        console.log("투두 수정 완료:", data);
        setShowModal(true); // 성공 시 모달 표시
      },
      onError: (error) => {
        console.error("투두 수정 실패:", error);
      },
    }
  );

  const isSubmitting = isCreating || isUpdating;
  const mutationError = createError || updateError;

  // 기존 투두 데이터 조회 (편집 모드일 때만)
  const authChecked = useRecoilValue(authCheckedState);
  const {
    data: todoData,
    loading: isTodoLoading,
    error: todoError,
  } = useQuery(FETCH_TODO, {
    variables: { todoId: todoId as string },
    skip: !isEdit || !todoId || !authChecked, // ✅ 토큰 갱신 완료 전까지 스킵
    onCompleted: (data) => {
      if (data?.fetchTodo) {
        const todo = data.fetchTodo;
        // 폼 기본값 설정
        reset({
          title: todo.title || "",
          description: todo.description || "",
          date: todo.date ? todo.date.split("T")[0] : "",
          startTime: todo.startTime || "",
          endTime: todo.endTime || "",
          priority: todo.priority || "MEDIUM",
          category: "", // 카테고리는 스키마에 없으므로 빈 문자열
          isRecurring: Boolean(todo.repeatType && todo.repeatType !== "none"),
          recurringType: todo.repeatType || "none",
          recurringEndDate: todo.repeatUntil
            ? todo.repeatUntil.split("T")[0]
            : "",
        });
      }
    },
  });

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
      date: new Date().toISOString().split("T")[0],
      startTime: "",
      endTime: "",
      priority: "MEDIUM", // GraphQL enum과 일치
      category: "",
      isRecurring: false,
      recurringType: "none",
      recurringEndDate: "",
    },
  });

  const isRecurring = watch("isRecurring");

  // 변경사항 확인 함수 (편집 모드용)
  const hasChanges = () => {
    if (!isEdit || !todoData?.fetchTodo) return false;

    // 현재 폼 값들
    const currentValues = watch();
    const originalTodo = todoData.fetchTodo;

    // 원본 데이터와 비교
    return (
      currentValues.title !== (originalTodo.title || "") ||
      currentValues.description !== (originalTodo.description || "") ||
      currentValues.date !==
        (originalTodo.date ? originalTodo.date.split("T")[0] : "") ||
      currentValues.startTime !== (originalTodo.startTime || "") ||
      currentValues.endTime !== (originalTodo.endTime || "") ||
      currentValues.priority !== (originalTodo.priority || "MEDIUM") ||
      currentValues.isRecurring !==
        Boolean(
          originalTodo.repeatType && originalTodo.repeatType !== "none"
        ) ||
      currentValues.recurringType !== (originalTodo.repeatType || "none") ||
      currentValues.recurringEndDate !==
        (originalTodo.repeatUntil ? originalTodo.repeatUntil.split("T")[0] : "")
    );
  };

  // 아이콘 컴포넌트들
  const ArrowLeftIcon = () => <span>←</span>;
  const TaskIcon = () => <span>📝</span>;
  const TimeIcon = () => <span>⏰</span>;

  const RepeatIcon = () => <span>🔁</span>;

  // 뒤로가기 핸들러
  const handleBack = () => {
    router.back();
  };

  // 날짜를 ISO string으로 변환하는 헬퍼 함수 (항상 string 반환 보장)
  const formatDateToString = (dateValue: string | Date): string => {
    // 이미 ISO string 형식인지 확인
    if (typeof dateValue === 'string') {
      // 이미 ISO 형식이면 그대로 반환
      if (dateValue.includes('T') && (dateValue.includes('Z') || dateValue.includes('+'))) {
        return dateValue;
      }
      // 날짜 문자열 형식인 경우 (예: "2026-01-03")
      return new Date(dateValue + "T00:00:00Z").toISOString();
    }
    // Date 객체인 경우
    return dateValue.toISOString();
  };

  const formatRepeatUntilToString = (dateValue: string | Date | undefined): string | null => {
    if (!dateValue) return null;
    if (typeof dateValue === 'string') {
      // 이미 ISO 형식이면 그대로 반환
      if (dateValue.includes('T') && (dateValue.includes('Z') || dateValue.includes('+'))) {
        return dateValue;
      }
      // 날짜 문자열 형식인 경우
      return new Date(dateValue + "T23:59:59Z").toISOString();
    }
    // Date 객체인 경우
    return dateValue.toISOString();
  };

  // 폼 제출 핸들러
  const onSubmit = async (data: TodoFormData) => {
    try {
      if (isEdit) {
        // 편집 모드: 변경사항 확인
        if (!hasChanges()) {
          setShowNoChangesMessage(true);
          setTimeout(() => setShowNoChangesMessage(false), 3000);
          return;
        }

        // 수정된 데이터로 업데이트
        const updateTodoInput = {
          title: data.title,
          description: data.description || null,
          date: String(formatDateToString(data.date)), // 명시적으로 String으로 변환
          startTime: data.startTime,
          endTime: data.endTime,
          priority: data.priority,
          repeatType:
            data.isRecurring && data.recurringType !== "none"
              ? data.recurringType
              : null,
          repeatUntil:
            data.isRecurring && data.recurringEndDate
              ? String(formatRepeatUntilToString(data.recurringEndDate))
              : null,
        };

        console.log("투두 수정 요청:", updateTodoInput);

        await updateTodo({
          variables: {
            todoId: todoId as string, // todoId를 별도로 전달
            updateTodoInput: updateTodoInput,
          },
        });
      } else {
        // 생성 모드: 기존 로직
        const createTodoInput = {
          title: data.title,
          description: data.description || null,
          date: String(formatDateToString(data.date)), // 명시적으로 String으로 변환
          startTime: data.startTime,
          endTime: data.endTime,
          priority: data.priority,
          repeatType:
            data.isRecurring && data.recurringType !== "none"
              ? data.recurringType
              : null,
          repeatUntil:
            data.isRecurring && data.recurringEndDate
              ? String(formatRepeatUntilToString(data.recurringEndDate))
              : null,
        };

        console.log("투두 생성 요청:", createTodoInput);

        await createTodo({
          variables: {
            createTodoInput: createTodoInput,
          },
        });
      }
    } catch (error) {
      console.error("투두 처리 중 오류:", error);
    }
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

  // 우선순위 드롭다운 토글
  const handlePriorityDropdownToggle = () => {
    setIsPriorityDropdownOpen(!isPriorityDropdownOpen);
  };

  // 우선순위 선택
  const handlePrioritySelect = (priority: "LOW" | "MEDIUM" | "HIGH") => {
    setValue("priority", priority);
    setIsPriorityDropdownOpen(false);
  };

  // 우선순위 이름을 한글로 변환하는 함수 (GraphQL enum과 일치)
  const getPriorityDisplayName = (priority: string) => {
    const priorityMap: Record<string, string> = {
      LOW: "낮음",
      MEDIUM: "보통",
      HIGH: "높음",
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

  const handleCloseModal = () => {
    setShowModal(false);
  };

  return (
    <Container gradient={theme.gradient}>
      {/* 변경사항 없음 토스트 메시지 - 최상위 레이어 */}
      {showNoChangesMessage && (
        <div
          style={{
            position: "fixed",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            zIndex: 9999,
            backgroundColor: "rgba(255, 255, 255, 0.95)",
            backdropFilter: "blur(10px)",
            border: `2px solid ${theme.accentBg}`,
            borderRadius: "16px",
            padding: "24px 32px",
            boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
            display: "flex",
            alignItems: "center",
            gap: "12px",
            minWidth: "300px",
            maxWidth: "400px",
            animation: "slideInFromTop 0.3s ease-out",
          }}
        >
          <div
            style={{
              width: "40px",
              height: "40px",
              borderRadius: "50%",
              backgroundColor: theme.accentBg,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: "18px",
              flexShrink: 0,
            }}
          >
            ℹ️
          </div>
          <div>
            <div
              style={{
                fontSize: "16px",
                fontWeight: "600",
                color: theme.accentText,
                marginBottom: "4px",
              }}
            >
              변경사항 없음
            </div>
            <div
              style={{
                fontSize: "14px",
                color: "#6b7280",
              }}
            >
              수정할 내용이 없습니다.
            </div>
          </div>
        </div>
      )}

      {/* 배경 오버레이 */}
      {showNoChangesMessage && (
        <div
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: "rgba(0, 0, 0, 0.3)",
            zIndex: 9998,
            animation: "fadeIn 0.3s ease-out",
          }}
          onClick={() => setShowNoChangesMessage(false)}
        />
      )}

      {/* CSS 애니메이션 스타일 */}
      <style jsx>{`
        @keyframes slideInFromTop {
          0% {
            opacity: 0;
            transform: translate(-50%, -60%);
          }
          100% {
            opacity: 1;
            transform: translate(-50%, -50%);
          }
        }
        
        @keyframes fadeIn {
          0% {
            opacity: 0;
          }
          100% {
            opacity: 1;
          }
        }
      `}</style>

      {/* Top App Bar */}
      <TopAppBar>
        <AppBarContent>
          <BackButton onClick={handleBack}>
            <ArrowLeftIcon />
          </BackButton>
          <AppInfo>
            <AppTitle>TO-DO {isEdit ? "수정" : "추가"}</AppTitle>
            <AppSubtitle>
              {isEdit ? "할 일을 수정해보세요" : "새로운 할 일을 등록해보세요"}
            </AppSubtitle>
          </AppInfo>
          <div style={{ width: "40px" }}></div> {/* 자리만 차지하는 빈 div */}
        </AppBarContent>
      </TopAppBar>

      {/* Content */}
      <ContentWrapper>
        {isEdit && isTodoLoading ? (
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              height: "200px",
              fontSize: "18px",
              color: theme.accentText,
            }}
          >
            투두 데이터를 불러오는 중...
          </div>
        ) : (
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
                <Label>시작 시간</Label>
                <CustomTimeSelector
                  value={watch("startTime")}
                  onChange={(time) => setValue("startTime", time)}
                  placeholder="시작 시간을 선택하세요"
                  error={errors.startTime?.message}
                />
              </FormGroup>

              <FormGroup>
                <Label>종료 시간</Label>
                <CustomTimeSelector
                  value={watch("endTime")}
                  onChange={(time) => setValue("endTime", time)}
                  placeholder="종료 시간을 선택하세요"
                  error={errors.endTime?.message}
                />
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
                      isSelected={watch("priority") === "LOW"}
                      onClick={() => handlePrioritySelect("LOW")}
                    >
                      낮음
                    </PriorityOption>
                    <PriorityOption
                      isSelected={watch("priority") === "MEDIUM"}
                      onClick={() => handlePrioritySelect("MEDIUM")}
                    >
                      보통
                    </PriorityOption>
                    <PriorityOption
                      isSelected={watch("priority") === "HIGH"}
                      onClick={() => handlePrioritySelect("HIGH")}
                    >
                      높음
                    </PriorityOption>
                  </PriorityOptions>
                </PriorityDropdown>
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
                  반복 설정하기
                </Label>
              </FormGroup>

              {isRecurring && (
                <>
                  <FormGroup>
                    <Label>반복 주기</Label>
                    <RecurringDropdown isOpen={isRecurringDropdownOpen}>
                      <RecurringSelector
                        onClick={handleRecurringDropdownToggle}
                      >
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

                  <FormGroup>
                    <Label>반복 종료일</Label>
                    <div
                      style={{
                        position: "relative",
                        display: "inline-block",
                        width: "100%",
                      }}
                    >
                      <Input
                        type="date"
                        {...register("recurringEndDate")}
                        min={new Date().toISOString().split("T")[0]}
                        style={{
                          color: watch("recurringEndDate")
                            ? "inherit"
                            : "transparent",
                          width: "100%",
                          minWidth: "200px", // 최소 너비 설정
                        }}
                      />
                      {!watch("recurringEndDate") && (
                        <div
                          style={{
                            position: "absolute",
                            top: "50%",
                            left: "16px",
                            transform: "translateY(-50%)",
                            color: "#9ca3af",
                            pointerEvents: "none",
                            fontSize: "16px",
                            whiteSpace: "nowrap",
                            overflow: "hidden",
                          }}
                        >
                          종료일을 선택하세요
                        </div>
                      )}
                    </div>
                    {errors.recurringEndDate && (
                      <ErrorMessage>
                        {errors.recurringEndDate.message}
                      </ErrorMessage>
                    )}
                  </FormGroup>
                </>
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
                {isSubmitting
                  ? "저장 중..."
                  : isEdit
                  ? "투두 수정"
                  : "투두 추가"}
              </Button>
            </ButtonGroup>

            {/* 성공 메시지 */}
            {/* 성공 모달 렌더링 */}
            <TodoSuccessModal
              isOpen={showModal}
              onClose={handleCloseModal}
              theme={theme}
            />

            {/* 에러 메시지 */}
            {mutationError && (
              <ErrorMessage>
                {isEdit ? "투두 수정" : "투두 생성"} 중 오류가 발생했습니다:{" "}
                {mutationError.message}
              </ErrorMessage>
            )}
          </FormContainer>
        )}
      </ContentWrapper>
    </Container>
  );
}
