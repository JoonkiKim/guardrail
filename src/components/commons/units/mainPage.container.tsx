import React, { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { NetworkStatus, useQuery } from "@apollo/client";
import { FETCH_GUARDRAILS } from "../../../commons/apis/graphql-queries";
import {
  Container,
  TopAppBar,
  AppBarContent,
  AppInfo,
  AppTitle,
  ContentWrapper,
  MainLayout,
  MainContent,
  CardHeader,
  CardContent,
  // ✅ 새로 추가된 styled components
  EntryScreenWrapper,
  HeaderSection,
  DateTitle,
  GuardrailCard,
  GuardrailTitle,
  GuardrailList,
  GuardrailItem,
  GuardrailItemContent,
  GuardrailItemHeader,
  GuardrailItemTitle,
  MoodBadge,
  GuardrailSummary,
  GuardrailDate,
  ViewAllButtonWrapper,
  ViewAllButton,
  MainActionWrapper,
  MainActionButton,
  // ✅ 새로 추가된 컴포넌트들
  EmptyState,
  EmptyIcon,
  EmptyTitle,
  EmptyDescription,
  LoadingState,
  LoadingSpinner,
  ErrorState,
  ErrorIcon,
  ErrorTitle,
  ErrorDescription,
} from "./mainPage.style";

// Colorway presets
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

export default function MainPage() {
  const router = useRouter();
  const [nav, setNav] = useState<
    "entry" | "todo" | "pavlov" | "daily" | "infusion" | "my"
  >("entry");
  const [colorway, setColorway] = useState<keyof typeof COLORWAYS>("forest");
  const theme = COLORWAYS[colorway];

  // ✅ Apollo Client 쿼리 훅 사용
  const { data, loading, error, refetch, networkStatus } = useQuery(
    FETCH_GUARDRAILS,
    {
      notifyOnNetworkStatusChange: true,
    }
  );

  useEffect(() => {
    const handleRouteChange = (url: string) => {
      if (url === "/" || url.startsWith("/main")) {
        refetch();
      }
    };

    const handleVisibilityChange = () => {
      if (!document.hidden) {
        refetch();
      }
    };

    router.events.on("routeChangeComplete", handleRouteChange);
    document.addEventListener("visibilitychange", handleVisibilityChange);

    refetch();

    return () => {
      router.events.off("routeChangeComplete", handleRouteChange);
      document.removeEventListener("visibilitychange", handleVisibilityChange);
    };
  }, [refetch, router]);

  const today = useMemo(() => {
    const now = new Date();
    const year = now.getFullYear();
    const month = String(now.getMonth() + 1).padStart(2, "0");
    const day = String(now.getDate()).padStart(2, "0");
    const weekday = ["일", "월", "화", "수", "목", "금", "토"][now.getDay()];

    return `${year}.${month}.${day} ${weekday}`;
  }, []);

  // ✅ 날짜 포맷팅 함수
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");

    return `${year}.${month}.${day}`;
  };

  // ✅ 요약 텍스트 생성 함수
  const generateSummary = (guardrail: any) => {
    const diary = guardrail.diary?.slice(0, 50) || "";
    const thanks = guardrail.thanks?.slice(0, 30) || "";
    const oneStep = guardrail.oneStep?.slice(0, 40) || "";

    return diary || thanks || oneStep || "기록이 없습니다.";
  };

  const guardrails = data?.fetchGuardrails ?? [];
  // ✅ 최근 3개의 가드레일 가져오기
  // 렌더 직전에 바로 정렬·슬라이스
  const recentGuardrails = [...guardrails]
    .sort(
      (a, b) =>
        new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    )
    .slice(0, 3);

  const handleGuardrailClick = (guardrailId: string) => {
    router.push(`/guardRailList/${guardrailId}`);
  };

  const isRefetching = networkStatus === NetworkStatus.refetch;
  const isLoading = loading || isRefetching;

  const EntryScreen = () => (
    <EntryScreenWrapper id="entry-screen-wrapper">
      {/* 헤더 섹션 */}

      {/* 가드레일 섹션 */}
      <GuardrailCard id="guardrail-card" ring={theme.ring}>
        <CardHeader id="guardrail-card-header">
          <GuardrailTitle id="guardrail-title" accentText={theme.accentText}>
            최근 가드레일
          </GuardrailTitle>
        </CardHeader>
        <CardContent id="guardrail-card-content">
          {isLoading ? (
            <LoadingState>
              <LoadingSpinner />
              <EmptyTitle>가드레일을 불러오는 중...</EmptyTitle>
              <EmptyDescription>잠시만 기다려주세요</EmptyDescription>
            </LoadingState>
          ) : error ? (
            <ErrorState>
              <ErrorIcon>⚠️</ErrorIcon>
              <ErrorTitle>가드레일을 불러올 수 없습니다</ErrorTitle>
              <ErrorDescription>
                {error.message ||
                  "일시적인 오류가 발생했습니다. 다시 시도해주세요."}
              </ErrorDescription>
            </ErrorState>
          ) : recentGuardrails.length === 0 ? (
            <EmptyState>
              <EmptyIcon>📝</EmptyIcon>
              <EmptyTitle>아직 가드레일이 없어요</EmptyTitle>
              <EmptyDescription>
                첫 번째 가드레일을 작성해보세요
              </EmptyDescription>
            </EmptyState>
          ) : (
            <GuardrailList id="guardrail-list">
              {recentGuardrails.map((guardrail, index) => (
                <GuardrailItem
                  onClick={() => handleGuardrailClick(guardrail.id)}
                  id={`guardrail-item-${guardrail.id}`}
                  key={guardrail.id}
                  isFirst={index === 0}
                  accentBg={theme.accentBg}
                  ring={theme.ring}
                >
                  <GuardrailItemContent
                    id={`guardrail-content-${guardrail.id}`}
                  >
                    <GuardrailItemHeader
                      id={`guardrail-header-${guardrail.id}`}
                    >
                      <GuardrailItemTitle
                        id={`guardrail-title-${guardrail.id}`}
                      >
                        {guardrail.mostImpt || "오늘의 기록"}
                      </GuardrailItemTitle>
                      {guardrail.feeling && (
                        <MoodBadge
                          id={`mood-badge-${guardrail.id}`}
                          ring={theme.ring}
                          accentText={theme.accentText}
                        >
                          {guardrail.feeling}
                        </MoodBadge>
                      )}
                    </GuardrailItemHeader>
                    <GuardrailSummary id={`guardrail-summary-${guardrail.id}`}>
                      {generateSummary(guardrail)}
                    </GuardrailSummary>
                    <GuardrailDate
                      id={`guardrail-date-${guardrail.id}`}
                      accentText={theme.accentText}
                    >
                      {formatDate(guardrail.createdAt)}
                    </GuardrailDate>
                  </GuardrailItemContent>
                </GuardrailItem>
              ))}
            </GuardrailList>
          )}

          <ViewAllButtonWrapper id="view-all-button-wrapper">
            <Link href="/guardRailList" passHref>
              <ViewAllButton id="view-all-button" theme={theme}>
                가드레일 전체 보기 →
              </ViewAllButton>
            </Link>
          </ViewAllButtonWrapper>
        </CardContent>
      </GuardrailCard>

      {/* 메인 액션 버튼 */}
      <MainActionWrapper id="main-action-wrapper">
        <Link href="/writeGuardRail" passHref>
          <MainActionButton
            id="main-action-button"
            theme={theme}
            button={theme.button}
            buttonHover={theme.buttonHover}
          >
            ✏️ 오늘의 가드레일 쓰기
          </MainActionButton>
        </Link>
      </MainActionWrapper>
    </EntryScreenWrapper>
  );

  return (
    <Container id="main-page-container" gradient={theme.gradient}>
      {/* Top App Bar */}
      <TopAppBar id="main-top-app-bar">
        <AppBarContent id="main-app-bar-content">
          <AppInfo id="main-app-info">
            <AppTitle id="main-app-title" accentText={theme.accentText}>
              Guardrail Diary
            </AppTitle>
            <HeaderSection id="main-header-section">
              <DateTitle id="main-date-title" accentText={theme.accentText}>
                {today}
              </DateTitle>
            </HeaderSection>
          </AppInfo>
        </AppBarContent>
      </TopAppBar>

      {/* Content */}
      <ContentWrapper id="main-content-wrapper">
        <MainLayout id="main-layout">
          <MainContent id="main-content">
            {nav === "entry" && <EntryScreen />}
          </MainContent>
        </MainLayout>
      </ContentWrapper>
    </Container>
  );
}
