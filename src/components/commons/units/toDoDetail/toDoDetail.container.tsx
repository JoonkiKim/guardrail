import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { useQuery, useMutation } from "@apollo/client";
import { useRecoilValue } from "recoil";
import { authCheckedState } from "../../../../commons/stores";
import {
  FETCH_TODO,
  DELETE_TODO,
} from "../../../../commons/apis/graphql-queries";
import CheckModal from "../../../commons/modals/checkModal";
import AlertModal from "../../../commons/modals/alertModal";
import {
  Container,
  TopAppBar,
  AppBarContent,
  BackButton,
  AppInfo,
  AppTitle,
  AppSubtitle,
  ActionButtons,
  ActionButton,
  ContentWrapper,
  DetailCard,
  DetailHeader,
  DetailIcon,
  DetailTitle,
  DetailMeta,
  MetaItem,
  MetaIcon,
  MetaText,
  DetailDescription,
  DescriptionTitle,
  DescriptionText,
  DetailActions,
  ActionButtonLarge,
  StatusBadge,
  PriorityBadge,
  TagsContainer,
  Tag,
  DateInfo,
  DateText,
  TimeText,
  LoadingSpinner,
  ErrorMessage,
  EmptyState,
  EmptyIcon,
  EmptyTitle,
  EmptyDescription,
} from "./toDoDetail.style";

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

// Todo 타입 정의 (GraphQL 스키마와 일치)
interface Todo {
  id: string;
  title: string;
  description?: string; // description 필드 추가
  date: string;
  startTime: string;
  endTime: string;
  priority: "LOW" | "MEDIUM" | "HIGH";
  repeatType?: string;
  repeatUntil?: string;
  isRepeating: boolean;
  createdAt: string;
  updatedAt: string;
}

// GraphQL 응답 타입 정의
interface FetchTodoResponse {
  fetchTodo: Todo;
}

export default function ToDoDetailContainer() {
  const router = useRouter();
  const { todoId } = router.query;
  const [colorway, setColorway] = useState<keyof typeof COLORWAYS>("forest");
  const theme = COLORWAYS[colorway];
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [showErrorModal, setShowErrorModal] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const authChecked = useRecoilValue(authCheckedState);

  // GraphQL 쿼리로 투두 상세 조회 (타입 적용)
  const { data, loading, error } = useQuery<FetchTodoResponse>(FETCH_TODO, {
    variables: { todoId: todoId as string },
    skip: !todoId || !authChecked, // ✅ 토큰 갱신 완료 전까지 스킵
  });

  // 투두 삭제 mutation
  const [deleteTodo, { loading: isDeleting }] = useMutation(DELETE_TODO, {
    onCompleted: () => {
      setShowDeleteModal(false);
      setShowSuccessModal(true);
    },
    onError: (error) => {
      console.error("Delete error:", error);
      setShowDeleteModal(false);
      setErrorMessage(error.message);
      setShowErrorModal(true);
    },
  });

  console.log("data", data);
  // 이제 data?.fetchTodo는 Todo 타입으로 인식됨
  const todo: Todo | undefined = data?.fetchTodo;

  // ─── Navigation Handlers ─────────────────────────────
  const handleBack = () => {
    router.back();
  };

  const handleEdit = () => {
    router.push(`/todoList/${todoId}/edit`);
  };

  const handleDeleteClick = () => {
    setShowDeleteModal(true);
  };

  const handleDeleteConfirm = async () => {
    try {
      await deleteTodo({
        variables: { todoId: todoId as string },
      });
    } catch (error) {
      console.error("Delete error:", error);
    }
  };

  const handleDeleteCancel = () => {
    setShowDeleteModal(false);
  };

  const handleSuccessModalClose = () => {
    setShowSuccessModal(false);
    router.push("/todoList");
  };

  const handleErrorModalClose = () => {
    setShowErrorModal(false);
    setErrorMessage("");
  };

  // ─── Format Date ─────────────────────────────
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("ko-KR", {
      year: "numeric",
      month: "long",
      day: "numeric",
      weekday: "long",
    });
  };

  // ─── Format Time ─────────────────────────────
  const formatTime = (startTime: string, endTime: string) => {
    if (!startTime) return "시간 미정";
    if (endTime) {
      return `${startTime} - ${endTime}`;
    }
    return startTime;
  };

  // ─── Get Priority Text ─────────────────────────────
  const getPriorityText = (priority: string) => {
    switch (priority) {
      case "HIGH":
        return "높음";
      case "MEDIUM":
        return "보통";
      case "LOW":
        return "낮음";
      default:
        return "보통";
    }
  };

  // ─── Get Priority Color ─────────────────────────────
  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "HIGH":
        return "#e11d48";
      case "MEDIUM":
        return "#f97316";
      case "LOW":
        return "#16a34a";
      default:
        return "#6b7280";
    }
  };

  // ─── Get Repeat Type Text ─────────────────────────────
  const getRepeatTypeText = (repeatType: string) => {
    switch (repeatType) {
      case "daily":
        return "매일";
      case "weekly":
        return "매주";
      case "monthly":
        return "매월";
      default:
        return "반복 없음";
    }
  };

  // ─── Loading State ─────────────────────────────
  if (loading || !authChecked) { // ✅ 토큰 갱신 중일 때도 로딩 상태
    return (
      <Container gradient={theme.gradient}>
        <TopAppBar>
          <AppBarContent>
            <BackButton onClick={handleBack}>←</BackButton>
            <AppInfo>
              <AppTitle>할 일 상세</AppTitle>
              <AppSubtitle>로딩 중...</AppSubtitle>
            </AppInfo>
            <ActionButtons />
          </AppBarContent>
        </TopAppBar>

        <ContentWrapper>
          <DetailCard>
            <div style={{ textAlign: "center", padding: "40px 0" }}>
              <LoadingSpinner />
              <p style={{ marginTop: "16px", color: "#6b7280" }}>
                할 일 정보를 불러오는 중...
              </p>
            </div>
          </DetailCard>
        </ContentWrapper>
      </Container>
    );
  }

  // ─── Error State ─────────────────────────────
  if (error) {
    return (
      <Container gradient={theme.gradient}>
        <TopAppBar>
          <AppBarContent>
            <BackButton onClick={handleBack}>←</BackButton>
            <AppInfo>
              <AppTitle>할 일 상세</AppTitle>
              <AppSubtitle>오류 발생</AppSubtitle>
            </AppInfo>
            <ActionButtons />
          </AppBarContent>
        </TopAppBar>

        <ContentWrapper>
          <EmptyState>
            <EmptyIcon>❌</EmptyIcon>
            <EmptyTitle>할 일을 불러올 수 없습니다</EmptyTitle>
            <EmptyDescription>{error.message}</EmptyDescription>
          </EmptyState>
        </ContentWrapper>
      </Container>
    );
  }

  // ─── Empty State ─────────────────────────────
  if (!todo) {
    return (
      <Container gradient={theme.gradient}>
        <TopAppBar>
          <AppBarContent>
            <BackButton onClick={handleBack}>←</BackButton>
            <AppInfo>
              <AppTitle>할 일 상세</AppTitle>
              <AppSubtitle>찾을 수 없음</AppSubtitle>
            </AppInfo>
            <ActionButtons />
          </AppBarContent>
        </TopAppBar>

        <ContentWrapper>
          <EmptyState>
            <EmptyIcon>📝</EmptyIcon>
            <EmptyTitle>할 일을 찾을 수 없습니다</EmptyTitle>
            <EmptyDescription>
              요청하신 할 일이 존재하지 않거나 삭제되었을 수 있습니다.
            </EmptyDescription>
          </EmptyState>
        </ContentWrapper>
      </Container>
    );
  }

  // ─── Main Content ─────────────────────────────
  return (
    <Container gradient={theme.gradient}>
      {/* 삭제 확인 모달 */}
      <CheckModal
        isOpen={showDeleteModal}
        onClose={handleDeleteCancel}
        onConfirm={handleDeleteConfirm}
        title="할 일 삭제"
        message={`정말로 이 할 일을 삭제하시겠습니까?`}
        confirmText="🗑️ 삭제"
        cancelText="취소"
        isLoading={isDeleting}
        type="danger"
        theme={theme}
      />

      {/* 삭제 성공 모달 */}
      <AlertModal
        isOpen={showSuccessModal}
        onClose={handleSuccessModalClose}
        title="삭제 완료"
        message="할 일이 성공적으로 삭제되었습니다."
        buttonText="확인"
        type="success"
        theme={theme}
      />

      {/* 삭제 에러 모달 */}
      <AlertModal
        isOpen={showErrorModal}
        onClose={handleErrorModalClose}
        title="삭제 실패"
        message={`삭제 중 오류가 발생했습니다.\n${errorMessage}`}
        buttonText="확인"
        type="error"
        theme={theme}
      />

      <TopAppBar>
        <AppBarContent>
          <BackButton onClick={handleBack}>←</BackButton>
          <AppInfo>
            <AppTitle>할 일 상세</AppTitle>
            <AppSubtitle>{todo.title}</AppSubtitle>
          </AppInfo>
          <ActionButtons>
            <ActionButton
              onClick={handleDeleteClick}
              title="삭제"
              disabled={isDeleting}
              style={{
                opacity: isDeleting ? 0.6 : 1,
                cursor: isDeleting ? "not-allowed" : "pointer",
              }}
            >
              {isDeleting ? "⏳" : "🗑️"}
            </ActionButton>
          </ActionButtons>
        </AppBarContent>
      </TopAppBar>

      <ContentWrapper>
        <DetailCard>
          <DetailHeader>
            <div>
              <DetailTitle>{todo.title}</DetailTitle>
              <div style={{ display: "flex", gap: "8px", marginTop: "8px" }}>
                <PriorityBadge priority={todo.priority.toLowerCase()}>
                  우선순위 {getPriorityText(todo.priority)}
                </PriorityBadge>
                {todo.isRepeating && (
                  <StatusBadge status="repeating">
                    🔁 {getRepeatTypeText(todo.repeatType || "")}
                  </StatusBadge>
                )}
              </div>
            </div>
          </DetailHeader>

          <DetailMeta>
            {/* Description 섹션 추가 */}
            {todo.description && (
              <DetailDescription>
                <DescriptionText>{todo.description}</DescriptionText>
              </DetailDescription>
            )}
            <MetaItem>
              <MetaIcon>📅</MetaIcon>
              <DateInfo>
                <DateText>{formatDate(todo.date)}</DateText>
                <TimeText>날짜</TimeText>
              </DateInfo>
            </MetaItem>

            <MetaItem>
              <MetaIcon>🕐</MetaIcon>
              <DateInfo>
                <DateText>{formatTime(todo.startTime, todo.endTime)}</DateText>
                <TimeText>시간</TimeText>
              </DateInfo>
            </MetaItem>

            {todo.isRepeating && todo.repeatType && (
              <MetaItem>
                <MetaIcon>🔁</MetaIcon>
                <MetaText>
                  반복: {getRepeatTypeText(todo.repeatType)}
                  {todo.repeatUntil &&
                    ` (종료: ${formatDate(todo.repeatUntil)})`}
                </MetaText>
              </MetaItem>
            )}
          </DetailMeta>

          <DetailActions>
            <ActionButtonLarge
              variant="primary"
              theme={theme}
              onClick={handleEdit}
              disabled={isDeleting}
            >
              수정하기
            </ActionButtonLarge>
            <ActionButtonLarge
              variant="secondary"
              theme={theme}
              onClick={() => router.push("/todoList")}
              disabled={isDeleting}
            >
              목록으로
            </ActionButtonLarge>
          </DetailActions>
        </DetailCard>
      </ContentWrapper>
    </Container>
  );
}
