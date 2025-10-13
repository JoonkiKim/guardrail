import React, { useState } from "react";
import { useRouter } from "next/router";
import { useQuery } from "@apollo/client";
import { FETCH_GUARDRAILS } from "../../../../commons/apis/graphql-queries";
import {
  Container,
  TopAppBar,
  AppBarContent,
  AppInfo,
  AppTitle,
  AppSubtitle,
  BackButton,
  ContentWrapper,
  GuardRailList,
  GuardRailCard,
  CardHeader,
  CardDate,
  CardMood,
  CardContent,
  CardTitle,
  CardSummary,
  CardTags,
  Tag,
  EmptyState,
  EmptyIcon,
  EmptyTitle,
  EmptyDescription,
  AddButton,
} from "./guardRailList.style";

// Colorway presets (기존 테마와 동일)
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

export default function GuardRailListPage() {
  const router = useRouter();
  const [colorway] = useState<keyof typeof COLORWAYS>("forest");
  const theme = COLORWAYS[colorway];

  // Apollo Client 쿼리 훅 사용
  const { data, loading, error } = useQuery(FETCH_GUARDRAILS);

  // 아이콘 컴포넌트들
  const ArrowLeftIcon = () => <span>←</span>;
  const PlusIcon = () => <span>+</span>;

  // 뒤로가기 핸들러
  const handleBack = () => {
    router.back();
  };

  // 새 가드레일 작성 핸들러
  const handleAddGuardRail = () => {
    router.push("/writeGuardRail");
  };

  // 가드레일 카드 클릭 핸들러
  const handleCardClick = (id: string) => {
    console.log("가드레일 클릭:", id);
    // TODO: 상세 페이지로 이동
    router.push(`/guardRailList/${id}`);
  };

  // 날짜 포맷팅
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const today = new Date();
    const diffTime = Math.abs(today.getTime() - date.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    if (diffDays === 1) return "어제";
    if (diffDays === 2) return "그제";
    if (diffDays <= 7) return `${diffDays - 1}일 전`;

    return date.toLocaleDateString("ko-KR", {
      month: "short",
      day: "numeric",
    });
  };

  // 요약 텍스트 생성
  const generateSummary = (guardRail: any) => {
    const diary = guardRail.diary?.slice(0, 50) || "";
    const thanks = guardRail.thanks?.slice(0, 30) || "";
    const oneStep = guardRail.oneStep?.slice(0, 40) || "";

    return diary || thanks || oneStep || "오늘의 기록이 없습니다.";
  };

  // 태그 생성
  const generateTags = (guardRail: any) => {
    const tags = [];
    if (guardRail.feeling) tags.push(guardRail.feeling);
    if (guardRail.mostImpt) tags.push("중요");
    if (guardRail.thanks) tags.push("감사");
    if (guardRail.ignorance) tags.push("성찰");
    return tags.slice(0, 3);
  };

  // 로딩 상태 처리
  if (loading) {
    return (
      <Container gradient={theme.gradient}>
        <TopAppBar>
          <AppBarContent>
            <BackButton onClick={handleBack}>←</BackButton>
            <AppInfo>
              <AppTitle>가드레일 목록</AppTitle>
              <AppSubtitle>나의 일상을 돌아보세요</AppSubtitle>
            </AppInfo>
            <AddButton theme={theme} onClick={handleAddGuardRail}>
              <PlusIcon />
            </AddButton>
          </AppBarContent>
        </TopAppBar>
        <ContentWrapper>
          <div style={{ textAlign: "center", padding: "40px" }}>
            <div>로딩 중...</div>
          </div>
        </ContentWrapper>
      </Container>
    );
  }

  // 에러 상태 처리
  if (error) {
    return (
      <Container gradient={theme.gradient}>
        <TopAppBar>
          <AppBarContent>
            <BackButton onClick={handleBack}>←</BackButton>
            <AppInfo>
              <AppTitle>가드레일 목록</AppTitle>
              <AppSubtitle>나의 일상을 돌아보세요</AppSubtitle>
            </AppInfo>
            <AddButton theme={theme} onClick={handleAddGuardRail}>
              <PlusIcon />
            </AddButton>
          </AppBarContent>
        </TopAppBar>
        <ContentWrapper>
          <div style={{ textAlign: "center", padding: "40px" }}>
            <div>데이터를 불러오는 중 오류가 발생했습니다.</div>
            <div style={{ fontSize: "14px", color: "#666", marginTop: "8px" }}>
              {error.message}
            </div>
          </div>
        </ContentWrapper>
      </Container>
    );
  }

  const guardrails = data?.fetchGuardrails || [];

  return (
    <Container gradient={theme.gradient}>
      {/* Top App Bar */}
      <TopAppBar>
        <AppBarContent>
          <BackButton onClick={handleBack}>←</BackButton>
          <AppInfo>
            <AppTitle>가드레일 목록</AppTitle>
            <AppSubtitle>나의 일상을 돌아보세요</AppSubtitle>
          </AppInfo>
          <AddButton theme={theme} onClick={handleAddGuardRail}>
            <PlusIcon />
          </AddButton>
        </AppBarContent>
      </TopAppBar>

      {/* Content */}
      <ContentWrapper>
        {/* 가드레일 목록 */}
        {guardrails.length > 0 ? (
          <GuardRailList>
            {guardrails.map((guardRail: any) => (
              <GuardRailCard
                key={guardRail.id}
                theme={theme}
                onClick={() => handleCardClick(guardRail.id)}
              >
                <CardHeader>
                  <CardDate>{formatDate(guardRail.createdAt)}</CardDate>
                  {guardRail.feeling && (
                    <CardMood theme={theme}>{guardRail.feeling}</CardMood>
                  )}
                </CardHeader>

                <CardContent>
                  <CardTitle>{guardRail.mostImpt || "오늘의 기록"}</CardTitle>

                  <CardSummary>
                    {generateSummary(guardRail)}
                    {(guardRail.diary?.length > 50 ||
                      guardRail.thanks?.length > 30 ||
                      guardRail.oneStep?.length > 40) &&
                      "..."}
                  </CardSummary>

                  {/* <CardTags>
                    {generateTags(guardRail).map((tag, index) => (
                      <Tag key={index} theme={theme}>
                        {tag}
                      </Tag>
                    ))}
                  </CardTags> */}
                </CardContent>
              </GuardRailCard>
            ))}
          </GuardRailList>
        ) : (
          <EmptyState>
            <EmptyIcon>📝</EmptyIcon>
            <EmptyTitle>아직 가드레일이 없어요</EmptyTitle>
            <EmptyDescription>
              첫 번째 가드레일을 작성해보세요
              <br />
              매일의 생각을 정리하는 습관을 만들어보세요
            </EmptyDescription>
          </EmptyState>
        )}
      </ContentWrapper>
    </Container>
  );
}
