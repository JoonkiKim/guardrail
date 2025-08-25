import React, { useState } from "react";
import { useRouter } from "next/router";
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

// 샘플 가드레일 데이터 (실제로는 API에서 가져올 데이터)
const SAMPLE_GUARDRAILS = [
  {
    id: 1,
    date: "2024-01-15",
    yesterdayMood: "고마움",
    todayImportant: "프로젝트 마감",
    happenedEvents:
      "팀원들과 함께 프로젝트를 완성했다. 서로의 아이디어를 공유하고 협력하는 과정에서 많은 것을 배웠다.",
    gratitude:
      "팀원들의 열정과 지원에 감사하다. 각자의 강점을 살려서 완벽한 결과물을 만들어냈다.",
    regrets:
      "시간 관리가 조금 부족했다. 더 체계적으로 계획을 세웠다면 더 여유롭게 작업할 수 있었을 것 같다.",
    lifeDirection:
      "창의적이고 의미 있는 일을 하면서 사람들과 함께 성장하는 삶을 살고 싶다.",
    yesterdayProgress:
      "프로젝트 완성을 통해 팀워크의 중요성을 다시 한번 깨달았다.",
    unknowns: "다음 프로젝트에서 어떻게 더 효율적으로 협업할 수 있을까?",
  },
  {
    id: 2,
    date: "2024-01-14",
    yesterdayMood: "걱정",
    todayImportant: "회의 준비",
    happenedEvents:
      "중요한 고객 미팅이 있었다. 예상보다 많은 질문을 받아서 긴장했지만, 차분히 대응했다.",
    gratitude: "동료가 미팅 전에 도움을 주어서 더 자신감을 가질 수 있었다.",
    regrets:
      "미팅 전에 더 충분한 준비를 했어야 했다. 자료를 더 꼼꼼히 검토했어야 했다.",
    lifeDirection: "전문성을 갖춘 신뢰받는 사람이 되고 싶다.",
    yesterdayProgress: "긴장 상황에서도 침착하게 대응하는 연습을 했다.",
    unknowns: "고객의 니즈를 더 정확히 파악하는 방법은 무엇일까?",
  },
  {
    id: 3,
    date: "2024-01-13",
    yesterdayMood: "가벼움",
    todayImportant: "휴식",
    happenedEvents:
      "주말을 맞아 가족들과 함께 시간을 보냈다. 오랜만에 마음 편히 쉬었다.",
    gratitude:
      "가족들의 따뜻한 관심과 사랑에 감사하다. 함께 있는 시간이 소중하다.",
    regrets: "없음",
    lifeDirection: "가족과 함께 건강하고 행복한 삶을 살고 싶다.",
    yesterdayProgress: "일과 삶의 균형을 맞추는 연습을 했다.",
    unknowns: "일과 가족 시간을 어떻게 더 잘 조화시킬 수 있을까?",
  },
  {
    id: 4,
    date: "2024-01-12",
    yesterdayMood: "무덤덤",
    todayImportant: "학습",
    happenedEvents:
      "새로운 기술을 배우기 위해 온라인 강의를 들었다. 처음에는 어려웠지만 점점 재미있어졌다.",
    gratitude: "배움의 기회를 제공해준 회사와 강사에게 감사하다.",
    regrets: "더 일찍 시작했어야 했다. 시간을 더 효율적으로 활용했어야 했다.",
    lifeDirection: "끊임없이 배우고 성장하는 사람이 되고 싶다.",
    yesterdayProgress: "새로운 분야에 도전하는 용기를 가졌다.",
    unknowns: "이 기술을 어떻게 실무에 적용할 수 있을까?",
  },
  {
    id: 5,
    date: "2024-01-11",
    yesterdayMood: "희망",
    todayImportant: "계획 수립",
    happenedEvents:
      "새해 계획을 세우고 목표를 정리했다. 작년의 성과를 돌아보고 올해의 방향을 설정했다.",
    gratitude: "지난해 함께해준 모든 사람들에게 감사하다. 많은 도움을 받았다.",
    regrets: "작년에 세웠던 일부 목표를 달성하지 못했다. 더 노력했어야 했다.",
    lifeDirection: "계획을 세우고 실천하는 사람이 되고 싶다.",
    yesterdayProgress: "새로운 시작에 대한 희망과 의지를 다졌다.",
    unknowns: "올해의 목표를 어떻게 체계적으로 달성할 수 있을까?",
  },
];

export default function GuardRailListPage() {
  const router = useRouter();
  const [colorway] = useState<keyof typeof COLORWAYS>("forest");
  const theme = COLORWAYS[colorway];

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
  const handleCardClick = (id: number) => {
    console.log("가드레일 클릭:", id);
    // TODO: 상세 페이지로 이동
    // router.push(`/guardRail/${id}`);
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
    const events = guardRail.happenedEvents?.slice(0, 50) || "";
    const gratitude = guardRail.gratitude?.slice(0, 30) || "";
    const progress = guardRail.yesterdayProgress?.slice(0, 40) || "";

    return events || gratitude || progress || "오늘의 기록이 없습니다.";
  };

  // 태그 생성
  const generateTags = (guardRail: any) => {
    const tags = [];
    if (guardRail.yesterdayMood) tags.push(guardRail.yesterdayMood);
    if (guardRail.todayImportant) tags.push("중요");
    if (guardRail.gratitude) tags.push("감사");
    if (guardRail.regrets && guardRail.regrets !== "없음") tags.push("성찰");
    return tags.slice(0, 3);
  };

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
        {SAMPLE_GUARDRAILS.length > 0 ? (
          <GuardRailList>
            {SAMPLE_GUARDRAILS.map((guardRail) => (
              <GuardRailCard
                key={guardRail.id}
                theme={theme}
                onClick={() => handleCardClick(guardRail.id)}
              >
                <CardHeader>
                  <CardDate>{formatDate(guardRail.date)}</CardDate>
                  {guardRail.yesterdayMood && (
                    <CardMood theme={theme}>{guardRail.yesterdayMood}</CardMood>
                  )}
                </CardHeader>

                <CardContent>
                  <CardTitle>
                    {guardRail.todayImportant || "오늘의 기록"}
                  </CardTitle>

                  <CardSummary>
                    {generateSummary(guardRail)}
                    {(guardRail.happenedEvents?.length > 50 ||
                      guardRail.gratitude?.length > 30 ||
                      guardRail.yesterdayProgress?.length > 40) &&
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
