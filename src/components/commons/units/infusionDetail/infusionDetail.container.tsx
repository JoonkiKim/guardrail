import React, { useState, useEffect } from "react";
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
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  TitleSection,
  Title,
  CategoryBadge,
  DateText,
  Description,
  ThoughtsSection,
  ThoughtItem,
  ThoughtHeader,
  ThoughtTitle,
  ThoughtIcon,
  ThoughtLabel,
  ThoughtArrow,
  ThoughtContent,
  ThoughtTextarea,
  TabsContainer,
  TabsList,
  Tab,
  TabContent,
  TabTextarea,
  ScrollContainer,
  ScrollThoughtItem,
  ScrollThoughtHeader,
  ScrollThoughtLabel,
  ScrollThoughtTextarea,
  ButtonGroup,
  Button,
  StatusBadge,
  COLORWAYS,
} from "./infusionDetail.style";

// 샘플 데이터
const SAMPLE_INFUSION = {
  id: 1,
  title: "이직 고민",
  category: "decision",
  status: "숙성중",
  createdAt: "2024-01-15", // ISO 형식에서 시간 부분 제거
  description:
    "현재 팀에서의 배움과 다음 단계에서 원하는 것의 교집합을 그려본다. 지금까지의 경험을 바탕으로 어떤 방향으로 성장하고 싶은지, 그리고 그것이 현재 회사에서 가능한지에 대해 깊이 생각해보고 싶다.",
  thoughts: {
    week1: "",
    month1: "",
    year1: "",
    year10: "",
  },
};

interface InfusionDetailContainerProps {
  theme?: keyof typeof COLORWAYS;
}

export default function InfusionDetailContainer({
  theme = "forest",
}: InfusionDetailContainerProps) {
  const router = useRouter();
  const { infusionId } = router.query;
  const [infusion, setInfusion] = useState(SAMPLE_INFUSION);
  const [thoughts, setThoughts] = useState(infusion.thoughts);
  const [isSaving, setIsSaving] = useState(false);
  const [designOption, setDesignOption] = useState<
    "accordion" | "tabs" | "scroll"
  >("accordion");
  const [expandedThoughts, setExpandedThoughts] = useState<
    Record<string, boolean>
  >({
    week1: false,
    month1: false,
    year1: false,
    year10: false,
  });

  const currentTheme = COLORWAYS[theme];

  // 시간별 생각 데이터
  const thoughtPeriods = [
    {
      key: "week1",
      label: "1주 뒤",
      icon: "🗓️",
      iconBg: "#fef3c7",
      iconColor: "#92400e",
    },
    {
      key: "month1",
      label: "1달 뒤",
      icon: "🗓️",
      iconBg: "#fce7f3",
      iconColor: "#be185d",
    },
    {
      key: "year1",
      label: "1년 뒤",
      icon: "🗓️",
      iconBg: "#e0e7ff",
      iconColor: "#3730a3",
    },
    {
      key: "year10",
      label: "10년 뒤",
      icon: "⏰",
      iconBg: "#dcfce7",
      iconColor: "#166534",
    },
  ];

  // 카테고리 이름 변환
  const getCategoryName = (category: string) => {
    switch (category) {
      case "decision":
        return "의사결정";
      case "stress":
        return "스트레스";
      case "spending":
        return "소비";
      default:
        return "기타";
    }
  };

  // 날짜 포맷팅 함수
  const formatDate = (dateString: string) => {
    // 여러 날짜 형식 지원
    let date: Date;

    if (dateString.includes("T")) {
      // ISO 8601 형식 (2024-01-15T10:30:00Z)
      date = new Date(dateString);
    } else if (dateString.includes("-")) {
      // YYYY-MM-DD 형식
      date = new Date(dateString + "T00:00:00");
    } else {
      // 기타 형식
      date = new Date(dateString);
    }

    // 유효한 날짜인지 확인
    if (isNaN(date.getTime())) {
      return "날짜 정보 없음";
    }

    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    const day = date.getDate();

    return `${year}년 ${month}월 ${day}일`;
  };

  // 뒤로가기 핸들러
  const handleBack = () => {
    router.back();
  };

  // 생각 입력 핸들러
  const handleThoughtChange = (period: string, value: string) => {
    setThoughts((prev) => ({
      ...prev,
      [period]: value,
    }));
  };

  // 아코디언 토글 핸들러
  const handleAccordionToggle = (period: string) => {
    setExpandedThoughts((prev) => ({
      ...prev,
      [period]: !prev[period],
    }));
  };

  // 저장 핸들러
  const handleSave = async () => {
    setIsSaving(true);
    console.log("저장 중:", { infusionId, thoughts });

    // TODO: API 호출
    // await saveInfusionThoughts(infusionId, thoughts);

    setTimeout(() => {
      setIsSaving(false);
      // 성공 메시지 표시 또는 페이지 이동
    }, 1000);
  };

  // 디자인 옵션 1: 아코디언 스타일
  const renderAccordionDesign = () => (
    <ThoughtsSection>
      {thoughtPeriods.map((period) => (
        <ThoughtItem key={period.key} isExpanded={expandedThoughts[period.key]}>
          <ThoughtHeader onClick={() => handleAccordionToggle(period.key)}>
            <ThoughtTitle>
              {/* <ThoughtIcon bgColor={period.iconBg} textColor={period.iconColor}>
                {period.icon}
              </ThoughtIcon> */}
              <ThoughtLabel>{period.label}</ThoughtLabel>
            </ThoughtTitle>
            <ThoughtArrow isExpanded={expandedThoughts[period.key]}>
              ▼
            </ThoughtArrow>
          </ThoughtHeader>
          <ThoughtContent isExpanded={expandedThoughts[period.key]}>
            <ThoughtTextarea
              placeholder={`어떻게 생각하고 있나요?`}
              value={thoughts[period.key as keyof typeof thoughts]}
              onChange={(e) => handleThoughtChange(period.key, e.target.value)}
            />
          </ThoughtContent>
        </ThoughtItem>
      ))}
    </ThoughtsSection>
  );

  return (
    <Container gradient={currentTheme.gradient}>
      {/* Top App Bar */}
      <TopAppBar>
        <AppBarContent>
          <BackButton onClick={handleBack}>←</BackButton>
          <AppInfo>
            <AppTitle>담금주 상세</AppTitle>
            <AppSubtitle>시간이 지나며 변하는 생각을 기록해보세요</AppSubtitle>
          </AppInfo>
          <div style={{ width: "40px" }}></div>
        </AppBarContent>
      </TopAppBar>

      {/* Content */}
      <ContentWrapper>
        {/* 기본 정보 */}
        <Card>
          <TitleSection>
            <Title>{infusion.title}</Title>
            <div
              style={{
                display: "flex",
                gap: "12px",
                alignItems: "center",
                flexWrap: "wrap",
              }}
            >
              <CategoryBadge category={infusion.category}>
                {getCategoryName(infusion.category)}
              </CategoryBadge>
              <DateText>{formatDate(infusion.createdAt)}</DateText>
            </div>
          </TitleSection>
          <Description>{infusion.description}</Description>
        </Card>

        {/* 시간별 생각 입력 */}
        <Card>
          <CardHeader>
            <CardTitle>시간별 생각 기록</CardTitle>
          </CardHeader>
          <CardContent>
            {/* 선택된 디자인 렌더링 */}
            {designOption === "accordion" && renderAccordionDesign()}

            <ButtonGroup>
              <Button
                theme={currentTheme}
                variant="secondary"
                onClick={handleBack}
              >
                취소
              </Button>
              <Button
                theme={currentTheme}
                onClick={handleSave}
                disabled={isSaving}
              >
                {isSaving ? "저장 중..." : "저장하기"}
              </Button>
            </ButtonGroup>
          </CardContent>
        </Card>
      </ContentWrapper>
    </Container>
  );
}
