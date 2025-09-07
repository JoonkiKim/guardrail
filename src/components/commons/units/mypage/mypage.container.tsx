import { useState } from "react";
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
  ProfileSection,
  ProfileHeader,
  ProfileAvatar,
  ProfileInfo,
  ProfileName,
  ProfileEmail,
  ProfileStats,
  StatItem,
  StatNumber,
  StatLabel,
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  SettingItem,
  SettingInfo,
  SettingLabel,
  SettingDescription,
  Switch,
  Select,
  Button,
  Calendar,
  CalendarHeader,
  CalendarDay,
  ChartContainer,
  GoalItem,
  GoalIcon,
  GoalInfo,
  GoalTitle,
  GoalProgress,
  ProgressBar,
  ProgressFill,
  TemplateItem,
  TemplateTitle,
  TemplateDescription,
  Separator,
  COLORWAYS,
} from "./mypage.style";

interface MypageContainerProps {
  theme?: keyof typeof COLORWAYS;
}

export default function MypageContainer({
  theme = "forest",
}: MypageContainerProps) {
  const router = useRouter();
  const [notifications, setNotifications] = useState(true);
  const [selectedTheme, setSelectedTheme] = useState(theme);
  const [selectedTime, setSelectedTime] = useState("21:00");

  const currentTheme = COLORWAYS[selectedTheme];

  const handleBack = () => {
    router.back();
  };

  // 샘플 데이터
  const userStats = {
    streak: 7,
    totalRecords: 42,
    totalInfusions: 8,
  };

  const monthlyRecords = [
    1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21,
    22, 23, 24, 25, 26, 27, 28, 29, 30,
  ];

  const goals = [
    {
      id: 1,
      title: "매일 가드레일 작성",
      progress: 85,
      icon: "📝",
    },
    {
      id: 2,
      title: "주 3회 담금주 기록",
      progress: 60,
      icon: "🍇",
    },
    {
      id: 3,
      title: "월 20회 파블로프 연습",
      progress: 75,
      icon: "🧠",
    },
  ];

  const templates = [
    {
      id: 1,
      title: "일일 회고 템플릿",
      description: "하루를 마무리하며 감사와 성찰을 기록",
    },
    {
      id: 2,
      title: "갈등 해결 템플릿",
      description: "관계에서의 갈등을 차분히 분석하고 해결책 모색",
    },
    {
      id: 3,
      title: "목표 설정 템플릿",
      description: "구체적이고 실현 가능한 목표를 설정",
    },
  ];

  return (
    <Container gradient={currentTheme.gradient}>
      {/* Top App Bar */}
      <TopAppBar>
        <AppBarContent>
          <BackButton onClick={handleBack}>←</BackButton>
          <AppInfo>
            <AppTitle>마이페이지</AppTitle>
            <AppSubtitle>나의 기록과 설정을 관리해보세요</AppSubtitle>
          </AppInfo>
          <div style={{ width: "40px" }}></div>
        </AppBarContent>
      </TopAppBar>

      {/* Content */}
      <ContentWrapper>
        {/* 1. 프로필 섹션 */}
        <ProfileSection>
          <ProfileHeader>
            <ProfileAvatar
              bgColor={currentTheme.accentBg}
              textColor={currentTheme.accentText}
            >
              👤
            </ProfileAvatar>
            <ProfileInfo>
              <ProfileName>사용자님</ProfileName>
              <ProfileEmail>user@example.com</ProfileEmail>
            </ProfileInfo>
          </ProfileHeader>
          <ProfileStats>
            <StatItem>
              <StatNumber>{userStats.streak}</StatNumber>
              <StatLabel>연속 기록</StatLabel>
            </StatItem>
            <StatItem>
              <StatNumber>{userStats.totalRecords}</StatNumber>
              <StatLabel>총 가드레일</StatLabel>
            </StatItem>
            <StatItem>
              <StatNumber>{userStats.totalInfusions}</StatNumber>
              <StatLabel>총 담금주</StatLabel>
            </StatItem>
          </ProfileStats>
        </ProfileSection>

        {/* 2. 통계 & 성과 */}
        <Card>
          <CardHeader>
            <CardTitle>이번 달 기록 현황</CardTitle>
          </CardHeader>
          <CardContent>
            <Calendar>
              <CalendarHeader>일</CalendarHeader>
              <CalendarHeader>월</CalendarHeader>
              <CalendarHeader>화</CalendarHeader>
              <CalendarHeader>수</CalendarHeader>
              <CalendarHeader>목</CalendarHeader>
              <CalendarHeader>금</CalendarHeader>
              <CalendarHeader>토</CalendarHeader>
              {monthlyRecords.map((day) => (
                <CalendarDay key={day} hasRecord={Math.random() > 0.3}>
                  {day}
                </CalendarDay>
              ))}
            </Calendar>
          </CardContent>
        </Card>

        {/* 3. 설정 & 환경 */}
        <Card>
          <CardHeader>
            <CardTitle>설정</CardTitle>
          </CardHeader>
          <CardContent>
            <SettingItem>
              <SettingInfo>
                <SettingLabel>알림 받기</SettingLabel>
                <SettingDescription>
                  브라우저/모바일 푸시 알림
                </SettingDescription>
              </SettingInfo>
              <Switch>
                <input
                  type="checkbox"
                  checked={notifications}
                  onChange={(e) => setNotifications(e.target.checked)}
                />
                <span></span>
              </Switch>
            </SettingItem>

            <SettingItem>
              <SettingInfo>
                <SettingLabel>기록 시간</SettingLabel>
                <SettingDescription>
                  매일 기록할 시간을 설정하세요
                </SettingDescription>
              </SettingInfo>
              <input
                type="time"
                value={selectedTime}
                onChange={(e) => setSelectedTime(e.target.value)}
                style={{
                  padding: "8px 12px",
                  border: "1px solid #d1d5db",
                  borderRadius: "8px",
                  fontSize: "14px",
                }}
              />
            </SettingItem>

            <SettingItem>
              <SettingInfo>
                <SettingLabel>테마</SettingLabel>
                <SettingDescription>
                  원하는 컬러 테마를 선택하세요
                </SettingDescription>
              </SettingInfo>
              <Select
                value={selectedTheme}
                onChange={(e) =>
                  setSelectedTheme(e.target.value as keyof typeof COLORWAYS)
                }
              >
                <option value="forest">Forest</option>
                <option value="sunrise">Sunrise</option>
                <option value="ocean">Ocean</option>
              </Select>
            </SettingItem>
          </CardContent>
        </Card>

        {/* 4. 개인화 기능 */}
        {/* <Card>
          <CardHeader>
            <CardTitle>목표 달성 현황</CardTitle>
          </CardHeader>
          <CardContent>
            {goals.map((goal) => (
              <GoalItem key={goal.id}>
                <GoalIcon
                  bgColor={currentTheme.accentBg}
                  textColor={currentTheme.accentText}
                >
                  {goal.icon}
                </GoalIcon>
                <GoalInfo>
                  <GoalTitle>{goal.title}</GoalTitle>
                  <GoalProgress>{goal.progress}% 완료</GoalProgress>
                  <ProgressBar>
                    <ProgressFill
                      progress={goal.progress}
                      bgColor={currentTheme.button}
                    />
                  </ProgressBar>
                </GoalInfo>
              </GoalItem>
            ))}
          </CardContent>
        </Card> */}

        {/* <Card>
          <CardHeader>
            <CardTitle>저장된 템플릿</CardTitle>
          </CardHeader>
          <CardContent>
            {templates.map((template) => (
              <TemplateItem key={template.id}>
                <TemplateTitle>{template.title}</TemplateTitle>
                <TemplateDescription>
                  {template.description}
                </TemplateDescription>
              </TemplateItem>
            ))}
          </CardContent>
        </Card> */}

        {/* 5. 학습 & 성장 */}
        {/* <Card>
          <CardHeader>
            <CardTitle>기록 히스토리</CardTitle>
          </CardHeader>
          <CardContent>
            <Button
              bgColor={currentTheme.button}
              hoverColor={currentTheme.buttonHover}
              variant="secondary"
            >
              전체 기록 보기
            </Button>
            <Separator />
            <div
              style={{
                fontSize: "14px",
                color: "#6b7280",
                textAlign: "center",
              }}
            >
              �� AI 인사이트와 성장 그래프는 곧 제공될 예정입니다
            </div>
          </CardContent>
        </Card> */}
      </ContentWrapper>
    </Container>
  );
}
