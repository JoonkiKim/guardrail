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
  DetailContainer,
  HeaderSection,
  HeaderContent,
  HeaderIcon,
  HeaderInfo,
  HeaderTitle,
  HeaderSubtitle,
  HeaderMeta,
  MetaBadge,
  Section,
  SectionHeader,
  SectionIcon,
  SectionTitle,
  SectionContent,
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  ContentText,
  GridContainer,
  FullWidthContainer,
  PavlovCard,
  PavlovStimulus,
  PavlovResponse,
  LoadingSpinner,
  ErrorMessage,
  EmptyState,
  EmptyIcon,
  EmptyTitle,
  EmptyDescription,
  ActionSection,
  Button,
} from "./guardRailDetail.style";

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

// ─── Sample GuardRail Detail Data ─────────────────────────────
const SAMPLE_GUARDRAIL_DETAIL = {
  id: 1,
  title: "2025년 8월 21일 가드레일",
  subtitle: "하루의 성찰과 내일을 위한 준비",
  date: "2025-08-21",
  status: "completed",
  icon: "🛡️",
  sections: {
    yesterday: {
      mood: "오늘은 새로운 프로젝트를 시작하면서 기대감과 약간의 긴장감이 있었습니다. 팀원들과의 협업이 잘 이루어져서 만족스러운 하루였습니다.",
      important: "새로운 프로젝트의 초기 기획과 팀원들과의 브레인스토밍",
      events:
        "오전에 클라이언트 미팅, 오후에 개발팀과의 협업 회의, 저녁에 개인 프로젝트 진행",
      gratitude:
        "팀원들의 적극적인 참여와 아이디어 공유, 좋은 날씨와 건강한 몸 상태",
      regrets:
        "시간 관리가 조금 부족했고, 개인적인 운동 시간을 확보하지 못한 점",
      direction:
        "현재 진행 중인 프로젝트를 성공적으로 완료하고, 팀원들과의 협업을 더욱 강화하는 것이 목표입니다. 개인적인 성장과 건강 관리에도 더 신경 써야겠습니다.",
      progress:
        "새로운 기술 스택을 학습했고, 팀원들과의 소통이 개선되었습니다.",
      unknowns:
        "새로운 프로젝트의 예상치 못한 기술적 도전과 시장 반응에 대한 우려",
    },
    pavlov: [
      { stimulus: "거의 모든 상황", response: "10초 세며 숨 고르기" },
      { stimulus: "감정적 동요", response: '"이건 무슨 감정인가?"' },
      {
        stimulus: "갈등",
        response: '"내가 맞다는 걸 증명해야 할 필요가 정말 있는가?"',
      },
      { stimulus: "소비 충동", response: '"좋다. 근데 필요하진 않다."' },
    ],
  },
};

// ─── Main Component ─────────────────────────────
export default function GuardRailDetailContainer() {
  const router = useRouter();
  const { id } = router.query;
  const [guardRailDetail, setGuardRailDetail] = useState<any>(
    SAMPLE_GUARDRAIL_DETAIL
  );
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [colorway, setColorway] = useState<keyof typeof COLORWAYS>("forest");
  const theme = COLORWAYS[colorway];

  // ─── Load GuardRail Detail ─────────────────────────────
  useEffect(() => {
    const loadGuardRailDetail = async () => {
      setError("");

      try {
        // 실제 API 호출 시에는 이렇게 사용
        // const response = await API.get(`/guardrails/${id}`);
        // setGuardRailDetail(response.data);

        // 현재는 샘플 데이터 사용
        setGuardRailDetail(SAMPLE_GUARDRAIL_DETAIL);
      } catch (error: any) {
        console.error("GuardRail detail loading error:", error);
        setError("가드레일 상세 정보를 불러오는데 실패했습니다");
      }
    };

    if (id) {
      loadGuardRailDetail();
    }
  }, [id]);

  // ─── Navigation Handlers ─────────────────────────────
  const handleBack = () => {
    router.back();
  };

  const handleEdit = () => {
    router.push(`/guardrail/edit/${id}`);
  };

  const handleDelete = async () => {
    if (confirm("정말로 이 가드레일을 삭제하시겠습니까?")) {
      try {
        // 실제 API 호출 시에는 이렇게 사용
        // await API.delete(`/guardrails/${id}`);

        alert("가드레일이 삭제되었습니다");
        router.push("/guardrail");
      } catch (error) {
        console.error("Delete error:", error);
        alert("삭제 중 오류가 발생했습니다");
      }
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

  // ─── Error State ─────────────────────────────
  if (error) {
    return (
      <Container gradient={theme.gradient}>
        <TopAppBar>
          <AppBarContent>
            <BackButton onClick={handleBack}>←</BackButton>
            <AppInfo>
              <AppTitle>가드레일 상세</AppTitle>
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
  if (!guardRailDetail) {
    return (
      <Container gradient={theme.gradient}>
        <TopAppBar>
          <AppBarContent>
            <BackButton onClick={handleBack}>←</BackButton>
            <AppInfo>
              <AppTitle>가드레일 상세</AppTitle>
              <AppSubtitle>찾을 수 없음</AppSubtitle>
            </AppInfo>
            <ActionButtons />
          </AppBarContent>
        </TopAppBar>

        <ContentWrapper>
          <EmptyState>
            <EmptyIcon>🛡️</EmptyIcon>
            <EmptyTitle>가드레일을 찾을 수 없습니다</EmptyTitle>
            <EmptyDescription>
              요청하신 가드레일이 존재하지 않거나 삭제되었을 수 있습니다.
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
            <AppTitle>가드레일 상세</AppTitle>
            <AppSubtitle>{guardRailDetail.title}</AppSubtitle>
          </AppInfo>
          <ActionButtons>
            <ActionButton theme={theme} onClick={handleEdit}>
              ✏️
            </ActionButton>
            <ActionButton theme={theme} onClick={handleDelete}>
              🗑️
            </ActionButton>
          </ActionButtons>
        </AppBarContent>
      </TopAppBar>

      <ContentWrapper>
        <DetailContainer>
          {/* Header Section */}
          {/* <HeaderSection>
            <HeaderContent>
              <HeaderIcon
                accentBg={theme.accentBg}
                accentText={theme.accentText}
              >
                {guardRailDetail.icon}
              </HeaderIcon>
              <HeaderInfo>
                <HeaderTitle>{guardRailDetail.title}</HeaderTitle>
                <HeaderSubtitle>{guardRailDetail.subtitle}</HeaderSubtitle>
                <HeaderMeta>
                  <MetaBadge variant="date" theme={theme}>
                    📅 {formatDate(guardRailDetail.date)}
                  </MetaBadge>
                  <MetaBadge variant="status" theme={theme}>
                    ✅{" "}
                    {guardRailDetail.status === "completed" ? "완료" : "진행중"}
                  </MetaBadge>
                </HeaderMeta>
              </HeaderInfo>
            </HeaderContent>
          </HeaderSection> */}

          {/* Yesterday Reflection Section */}
          <Section>
            {/* <SectionHeader>
              <SectionIcon
                accentBg={theme.accentBg}
                accentText={theme.accentText}
              >
                ��
              </SectionIcon>
              <SectionTitle>어제의 성찰</SectionTitle>
            </SectionHeader> */}
            <SectionContent>
              <GridContainer>
                <FullWidthContainer>
                  <Card>
                    <CardHeader>
                      <CardTitle>어제의 기분은 어땠나?</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <ContentText>
                        {guardRailDetail.sections.yesterday.mood}
                      </ContentText>
                    </CardContent>
                  </Card>
                </FullWidthContainer>

                <FullWidthContainer>
                  <Card>
                    <CardHeader>
                      <CardTitle>어제 가장 중요한 것은 무엇이었나?</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <ContentText>
                        {guardRailDetail.sections.yesterday.important}
                      </ContentText>
                    </CardContent>
                  </Card>
                </FullWidthContainer>

                <FullWidthContainer>
                  <Card>
                    <CardHeader>
                      <CardTitle>어제 일어난 주요 사건들은?</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <ContentText>
                        {guardRailDetail.sections.yesterday.events}
                      </ContentText>
                    </CardContent>
                  </Card>
                </FullWidthContainer>

                <FullWidthContainer>
                  <Card>
                    <CardHeader>
                      <CardTitle>감사했던 것들</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <ContentText>
                        {guardRailDetail.sections.yesterday.gratitude}
                      </ContentText>
                    </CardContent>
                  </Card>
                </FullWidthContainer>

                <FullWidthContainer>
                  <Card>
                    <CardHeader>
                      <CardTitle>아쉬웠던 것들</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <ContentText>
                        {guardRailDetail.sections.yesterday.regrets}
                      </ContentText>
                    </CardContent>
                  </Card>
                </FullWidthContainer>

                <FullWidthContainer>
                  <Card>
                    <CardHeader>
                      <CardTitle>내 삶은 어디를 향하는가?</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <ContentText>
                        {guardRailDetail.sections.yesterday.direction}
                      </ContentText>
                    </CardContent>
                  </Card>
                </FullWidthContainer>

                <FullWidthContainer>
                  <Card>
                    <CardHeader>
                      <CardTitle>어제 바람직한 방향으로 움직였나?</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <ContentText>
                        {guardRailDetail.sections.yesterday.progress}
                      </ContentText>
                    </CardContent>
                  </Card>
                </FullWidthContainer>

                <FullWidthContainer>
                  <Card>
                    <CardHeader>
                      <CardTitle>모르는 것들</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <ContentText>
                        {guardRailDetail.sections.yesterday.unknowns}
                      </ContentText>
                    </CardContent>
                  </Card>
                </FullWidthContainer>
              </GridContainer>
            </SectionContent>
          </Section>

          {/* Pavlov Section */}
          {/* <Section>
            <SectionHeader>
              <SectionIcon
                accentBg={theme.accentBg}
                accentText={theme.accentText}
              >
                ��
              </SectionIcon>
              <SectionTitle>파블로프 반응</SectionTitle>
            </SectionHeader>
            <SectionContent>
              {guardRailDetail.sections.pavlov.map(
                (item: any, index: number) => (
                  <PavlovCard key={index} theme={theme}>
                    <PavlovStimulus>자극: {item.stimulus}</PavlovStimulus>
                    <PavlovResponse>반응: {item.response}</PavlovResponse>
                  </PavlovCard>
                )
              )}
            </SectionContent>
          </Section> */}

          {/* Action Buttons */}
          <ActionSection>
            {/* <Button variant="secondary" theme={theme} onClick={handleEdit}>
              ✏️ 수정하기
            </Button> */}
            <Button
              variant="primary"
              theme={theme}
              onClick={() => router.push("/guardRailList")}
            >
              📋 목록으로
            </Button>
          </ActionSection>
        </DetailContainer>
      </ContentWrapper>
    </Container>
  );
}
