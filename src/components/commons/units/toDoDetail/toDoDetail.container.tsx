import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
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

// ─── Sample Todo Detail Data ─────────────────────────────
const SAMPLE_TODO_DETAIL = {
  id: 6,
  title: "아침 운동하기",
  time: "7:00 AM",
  icon: "🏃",
  iconColor: "#16a34a",
  backgroundColor: "#dcfce7",
  description:
    "매일 아침 30분간 조깅을 통해 하루를 활기차게 시작합니다. 공원에서 신선한 공기를 마시며 건강한 생활 습관을 만들어가고 있습니다.",
  status: "completed",
  priority: "high",
  tags: ["건강", "운동", "아침루틴"],
  createdAt: "2025-08-21",
  updatedAt: "2025-08-21",
  location: "한강공원",
  estimatedDuration: "30분",
  notes: "운동화와 물병 준비 필수",
};

// ─── Main Component ─────────────────────────────
export default function ToDoDetailContainer() {
  const router = useRouter();
  const { id } = router.query;
  // ─── 초기 상태 변경 ─────────────────────────────
  const [todoDetail, setTodoDetail] = useState<any>(SAMPLE_TODO_DETAIL); // 초기값 설정
  const [isLoading, setIsLoading] = useState(false); // 초기값을 false로 변경
  const [error, setError] = useState("");
  const [colorway, setColorway] = useState<keyof typeof COLORWAYS>("forest");
  const theme = COLORWAYS[colorway];

  // ─── Load Todo Detail ─────────────────────────────
  useEffect(() => {
    const loadTodoDetail = async () => {
      // setIsLoading(true); // 로딩 상태 제거
      setError("");

      try {
        // 실제 API 호출 시에는 이렇게 사용
        // const response = await API.get(`/todos/${id}`);
        // setTodoDetail(response.data);

        // 샘플 데이터를 즉시 설정
        setTodoDetail(SAMPLE_TODO_DETAIL);
        // setIsLoading(false); // 로딩 상태 제거
      } catch (error: any) {
        console.error("Todo detail loading error:", error);
        setError("할 일 상세 정보를 불러오는데 실패했습니다");
        // setIsLoading(false); // 로딩 상태 제거
      }
    };

    if (id) {
      loadTodoDetail();
    }
  }, [id]);

  // ─── Navigation Handlers ─────────────────────────────
  const handleBack = () => {
    router.back();
  };

  const handleEdit = () => {
    router.push(`/todo/edit/${id}`);
  };

  const handleDelete = async () => {
    if (confirm("정말로 이 할 일을 삭제하시겠습니까?")) {
      try {
        // 실제 API 호출 시에는 이렇게 사용
        // await API.delete(`/todos/${id}`);

        alert("할 일이 삭제되었습니다");
        router.push("/todo");
      } catch (error) {
        console.error("Delete error:", error);
        alert("삭제 중 오류가 발생했습니다");
      }
    }
  };

  const handleComplete = async () => {
    try {
      // 실제 API 호출 시에는 이렇게 사용
      // await API.patch(`/todos/${id}`, { status: "completed" });

      setTodoDetail({
        ...todoDetail,
        status: todoDetail.status === "completed" ? "pending" : "completed",
      });
    } catch (error) {
      console.error("Complete error:", error);
      alert("상태 변경 중 오류가 발생했습니다");
    }
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

  // ─── Get Status Text ─────────────────────────────
  const getStatusText = (status: string) => {
    switch (status) {
      case "completed":
        return "완료";
      case "in-progress":
        return "진행중";
      case "pending":
        return "대기중";
      default:
        return "알 수 없음";
    }
  };

  // ─── Get Priority Text ─────────────────────────────
  const getPriorityText = (priority: string) => {
    switch (priority) {
      case "high":
        return "높음";
      case "medium":
        return "보통";
      case "low":
        return "낮음";
      default:
        return "보통";
    }
  };

  // ─── Loading State ─────────────────────────────
  if (isLoading) {
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
          <ErrorMessage>{error}</ErrorMessage>
        </ContentWrapper>
      </Container>
    );
  }

  // ─── Empty State ─────────────────────────────
  if (!todoDetail) {
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
      <TopAppBar>
        <AppBarContent>
          <BackButton onClick={handleBack}>←</BackButton>
          <AppInfo>
            <AppTitle>할 일 상세</AppTitle>
            <AppSubtitle>{todoDetail.title}</AppSubtitle>
          </AppInfo>
          <ActionButtons>
            <ActionButton onClick={handleEdit} title="수정">
              ✏️
            </ActionButton>
            <ActionButton onClick={handleDelete} title="삭제">
              🗑️
            </ActionButton>
          </ActionButtons>
        </AppBarContent>
      </TopAppBar>

      <ContentWrapper>
        <DetailCard>
          <DetailHeader>
            <DetailIcon
              backgroundColor={todoDetail.backgroundColor}
              color={todoDetail.iconColor}
            >
              {todoDetail.icon}
            </DetailIcon>
            <div>
              <DetailTitle>{todoDetail.title}</DetailTitle>
              <div style={{ display: "flex", gap: "8px", marginTop: "8px" }}>
                <StatusBadge status={todoDetail.status}>
                  {getStatusText(todoDetail.status)}
                </StatusBadge>
                <PriorityBadge priority={todoDetail.priority}>
                  {getPriorityText(todoDetail.priority)}
                </PriorityBadge>
              </div>
            </div>
          </DetailHeader>

          <DetailMeta>
            <MetaItem>
              <MetaIcon>🕐</MetaIcon>
              <DateInfo>
                <DateText>{todoDetail.time}</DateText>
                <TimeText>예정 시간</TimeText>
              </DateInfo>
            </MetaItem>

            {todoDetail.location && (
              <MetaItem>
                <MetaIcon>🗺️</MetaIcon>
                <MetaText>{todoDetail.location}</MetaText>
              </MetaItem>
            )}

            {todoDetail.estimatedDuration && (
              <MetaItem>
                <MetaIcon>⏱️</MetaIcon>
                <MetaText>
                  예상 소요시간: {todoDetail.estimatedDuration}
                </MetaText>
              </MetaItem>
            )}

            <MetaItem>
              <MetaIcon>📅</MetaIcon>
              <DateInfo>
                <DateText>생성: {formatDate(todoDetail.createdAt)}</DateText>
                <TimeText>수정: {formatDate(todoDetail.updatedAt)}</TimeText>
              </DateInfo>
            </MetaItem>
          </DetailMeta>

          {todoDetail.tags && todoDetail.tags.length > 0 && (
            <TagsContainer>
              {todoDetail.tags.map((tag: string, index: number) => (
                <Tag key={index}>{tag}</Tag>
              ))}
            </TagsContainer>
          )}

          {todoDetail.description && (
            <DetailDescription>
              <DescriptionTitle>설명</DescriptionTitle>
              <DescriptionText>{todoDetail.description}</DescriptionText>
            </DetailDescription>
          )}

          {todoDetail.notes && (
            <DetailDescription>
              <DescriptionTitle>메모</DescriptionTitle>
              <DescriptionText>{todoDetail.notes}</DescriptionText>
            </DetailDescription>
          )}
          {/* 
          <DetailActions>
            <ActionButtonLarge
              variant="secondary"
              theme={theme}
              onClick={handleComplete}
            >
              {todoDetail.status === "completed"
                ? "미완료로 변경"
                : "완료로 변경"}
            </ActionButtonLarge>
            <ActionButtonLarge
              variant="primary"
              theme={theme}
              onClick={handleEdit}
            >
              수정하기
            </ActionButtonLarge>
          </DetailActions> */}
        </DetailCard>
      </ContentWrapper>
    </Container>
  );
}
