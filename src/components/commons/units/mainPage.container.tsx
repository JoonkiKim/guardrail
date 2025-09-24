import React, { useMemo, useState } from "react";
import Link from "next/link";
import {
  Container,
  TopAppBar,
  AppBarContent,
  AppIcon,
  AppInfo,
  AppTitle,
  AppSubtitle,
  ColorwaySelect,
  DateDisplay,
  ContentWrapper,
  StreakRow,
  StreakCard,
  StreakLabel,
  StreakValue,
  StreakNumber,
  StreakUnit,
  ProgressBar,
  ProgressFill,
  MainLayout,
  Sidebar,
  MainContent,
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  NavItem,
  NavIcon,
  NavLabel,
  NavArrow,
  SectionTitle,
  SectionIcon,
  SectionText,
  SectionHeading,
  SectionSubtitle,
  Input,
  Textarea,
  Button,
  Badge,
  Separator,
  Switch,
  BottomNav,
  BottomNavContent,
  BottomNavItem,
  BottomNavIcon,
  BottomNavLabel,
  Fab,
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

// 샘플 데이터
const SAMPLE_PAVLOV = {
  stimulus: "감정적 동요",
  response: "10초 세며 숨 고르기",
};

const SAMPLE_TODOS = [
  {
    id: 1,
    title: "프로젝트 문서 작성",
    time: "09:00",
    description: "신규 프로젝트 기획서 초안 작성",
    completed: false,
  },
  {
    id: 2,
    title: "팀 미팅 참석",
    time: "14:00",
    description: "주간 스프린트 리뷰 미팅",
    completed: false,
  },
  {
    id: 3,
    title: "코드 리뷰",
    time: "16:00",
    description: "동료의 PR 리뷰 및 피드백",
    completed: true,
  },
];

const SAMPLE_GUARDRAILS = [
  {
    id: 1,
    date: "2024-01-15",
    mood: "만족스러움",
    title: "오늘의 성찰",
    summary: "프로젝트 완성으로 팀워크의 중요성을 깨달았다",
  },
  {
    id: 2,
    date: "2024-01-14",
    mood: "감사함",
    title: "일상의 소중함",
    summary: "소소한 순간들에 감사하는 마음을 갖게 되었다",
  },
];

export default function MainPage() {
  const [nav, setNav] = useState<
    "entry" | "todo" | "pavlov" | "daily" | "infusion" | "my"
  >("entry");
  const [colorway, setColorway] = useState<keyof typeof COLORWAYS>("forest");
  const theme = COLORWAYS[colorway];
  const today = useMemo(
    () =>
      new Date().toLocaleDateString(undefined, {
        year: "numeric",
        month: "long",
        day: "numeric",
        weekday: "short",
      }),
    []
  );

  // 아이콘 컴포넌트들
  const LeafIcon = () => <span>🌿</span>;
  const ListTodoIcon = () => <span>📝</span>;
  const ActivityIcon = () => <span>⚡</span>;
  const NotebookPenIcon = () => <span>✏️</span>;
  const AnchorIcon = () => <span>⚓</span>;
  const UserIcon = () => <span>👤</span>;
  const ChevronRightIcon = () => <span>›</span>;
  const CalendarIconComponent = () => <span>📅</span>;
  const PlusIcon = () => <span>+</span>;
  const BookOpenCheckIcon = () => <span>📖</span>;
  const SparklesIcon = () => <span>✨</span>;
  const WindIcon = () => <span>💨</span>;
  const BrainIcon = () => <span>🧠</span>;

  const EntryScreen = () => (
    <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
      {/* 헤더 섹션 */}
      <div style={{ textAlign: "center", marginBottom: "8px" }}>
        <div
          style={{
            fontSize: "24px",
            fontWeight: "700",
            color: theme.accentText,
            marginBottom: "4px",
          }}
        >
          {today}
        </div>
        {/* <div style={{ fontSize: "14px", color: "#6b7280" }}>
          오늘도 의미있는 하루 되세요
        </div> */}
      </div>

      {/* 그리드 레이아웃 */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: "16px",
          marginBottom: "8px",
        }}
      >
        {/* 파블로프 카드 */}
        <Card
          style={{
            background: `linear-gradient(135deg, ${theme.accentBg}, ${theme.emphCard})`,
            border: `2px solid ${theme.ring}`,
            position: "relative",
            overflow: "hidden",
          }}
        >
          <div
            style={{
              position: "absolute",
              top: "12px",
              right: "12px",
              fontSize: "24px",
              opacity: 0.3,
            }}
          >
            {/* 🧠 */}
          </div>
          <CardHeader style={{ paddingBottom: "8px" }}>
            <CardTitle
              style={{
                fontSize: "16px",
                fontWeight: "600",
                color: theme.accentText,
              }}
            >
              오늘의 파블로프
            </CardTitle>
          </CardHeader>
          <CardContent style={{ paddingTop: "0" }}>
            <div style={{ marginBottom: "12px" }}>
              <div
                style={{
                  fontSize: "12px",
                  color: theme.accentText,
                  fontWeight: "600",
                  marginBottom: "4px",
                  textTransform: "uppercase",
                  letterSpacing: "0.5px",
                }}
              >
                {SAMPLE_PAVLOV.stimulus}
              </div>
              <div
                style={{
                  fontSize: "14px",
                  color: "#374151",
                  fontWeight: "500",
                  lineHeight: "1.4",
                }}
              >
                {SAMPLE_PAVLOV.response}
              </div>
            </div>
            <Link href="/pavlov" passHref>
              <Button
                theme={theme}
                style={{
                  width: "100%",
                  fontSize: "12px",
                  padding: "8px 12px",
                  borderRadius: "6px",
                }}
              >
                더 보기 →
              </Button>
            </Link>
          </CardContent>
        </Card>

        {/* 투두 카드 */}
        <Card
          style={{
            background: "rgba(255, 255, 255, 0.9)",
            border: `2px solid ${theme.ring}`,
            position: "relative",
            overflow: "hidden",
          }}
        >
          <div
            style={{
              position: "absolute",
              top: "12px",
              right: "12px",
              fontSize: "24px",
              opacity: 0.3,
            }}
          >
            {/* 📝 */}
          </div>
          <CardHeader style={{ paddingBottom: "8px" }}>
            <CardTitle
              style={{
                fontSize: "16px",
                fontWeight: "600",
                color: theme.accentText,
              }}
            >
              오늘의 할 일
            </CardTitle>
          </CardHeader>
          <CardContent style={{ paddingTop: "0" }}>
            <div style={{ marginBottom: "12px" }}>
              {SAMPLE_TODOS.slice(0, 3).map((todo) => (
                <div
                  key={todo.id}
                  style={{
                    fontSize: "12px",
                    color: "#374151",
                    marginBottom: "6px",
                  }}
                >
                  {todo.title}
                </div>
              ))}
              {SAMPLE_TODOS.length > 3 && (
                <div
                  style={{
                    fontSize: "12px",
                    color: "#6b7280",
                    fontStyle: "italic",
                    marginTop: "4px",
                  }}
                >
                  ...
                </div>
              )}
            </div>
            <Link href="/todoList" passHref>
              <Button
                theme={theme}
                style={{
                  width: "100%",
                  fontSize: "12px",
                  padding: "8px 12px",
                  borderRadius: "6px",
                }}
              >
                전체 보기 →
              </Button>
            </Link>
          </CardContent>
        </Card>
      </div>

      {/* 가드레일 섹션 */}
      <Card
        style={{
          background: "rgba(255, 255, 255, 0.9)",
          border: `2px solid ${theme.ring}`,
          position: "relative",
          overflow: "hidden",
        }}
      >
        <div
          style={{
            position: "absolute",
            top: "16px",
            right: "16px",
            fontSize: "28px",
            opacity: 0.2,
          }}
        >
          {/* 🛡️ */}
        </div>
        <CardHeader>
          <CardTitle
            style={{
              fontSize: "18px",
              fontWeight: "600",
              color: theme.accentText,
            }}
          >
            최근 가드레일
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div
            style={{ display: "flex", flexDirection: "column", gap: "12px" }}
          >
            {SAMPLE_GUARDRAILS.map((guardrail, index) => (
              <div
                key={guardrail.id}
                style={{
                  display: "flex",
                  alignItems: "flex-start",
                  gap: "12px",
                  padding: "12px",
                  borderRadius: "10px",
                  background:
                    index === 0 ? theme.accentBg : "rgba(255, 255, 255, 0.5)",
                  border: `1px solid ${theme.ring}`,
                  transition: "all 0.2s ease",
                }}
              >
                {/* <div
                  style={{
                    width: "32px",
                    height: "32px",
                    borderRadius: "8px",
                    background: theme.button,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    color: "white",
                    fontSize: "12px",
                    fontWeight: "600",
                    flexShrink: 0,
                  }}
                >
                  {index + 1}
                </div> */}
                <div style={{ flex: 1 }}>
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "8px",
                      marginBottom: "4px",
                    }}
                  >
                    <div
                      style={{
                        fontSize: "14px",
                        fontWeight: "600",
                        color: "#374151",
                      }}
                    >
                      {guardrail.title}
                    </div>
                    <div
                      style={{
                        padding: "2px 6px",
                        borderRadius: "4px",
                        background: theme.ring,
                        fontSize: "10px",
                        color: theme.accentText,
                        fontWeight: "500",
                      }}
                    >
                      {guardrail.mood}
                    </div>
                  </div>
                  <div
                    style={{
                      fontSize: "12px",
                      color: "#6b7280",
                      lineHeight: "1.4",
                      marginBottom: "4px",
                    }}
                  >
                    {guardrail.summary}
                  </div>
                  <div
                    style={{
                      fontSize: "11px",
                      color: theme.accentText,
                      fontWeight: "500",
                    }}
                  >
                    {guardrail.date}
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div style={{ marginTop: "16px" }}>
            <Link href="/guardRailList" passHref>
              <Button
                theme={theme}
                style={{
                  width: "100%",
                  fontSize: "14px",
                  padding: "12px",
                  borderRadius: "8px",
                }}
              >
                가드레일 전체 보기 →
              </Button>
            </Link>
          </div>
        </CardContent>
      </Card>

      {/* 메인 액션 버튼 */}
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          marginTop: "8px",
        }}
      >
        <Link href="/writeGuardRail" passHref>
          <Button
            theme={theme}
            style={{
              padding: "16px 24px",
              fontSize: "16px",
              fontWeight: "600",
              borderRadius: "12px",
              boxShadow: `0 4px 12px ${theme.button}30`,
              background: `linear-gradient(135deg, ${theme.button}, ${theme.buttonHover})`,
              border: "none",
            }}
          >
            ✏️ 오늘의 가드레일 쓰기
          </Button>
        </Link>
      </div>
    </div>
  );

  return (
    <Container gradient={theme.gradient}>
      {/* Top App Bar */}
      <TopAppBar>
        <AppBarContent>
          <AppInfo>
            <AppTitle>Guardrail Diary</AppTitle>
            <AppSubtitle>길에서 벗어나지 않도록 붙드는 매일의 기록</AppSubtitle>
          </AppInfo>
        </AppBarContent>
      </TopAppBar>

      {/* Content */}
      <ContentWrapper>
        <MainLayout>
          <MainContent>{nav === "entry" && <EntryScreen />}</MainContent>
        </MainLayout>
      </ContentWrapper>
    </Container>
  );
}
