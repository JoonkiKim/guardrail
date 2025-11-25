import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/router";
import { useMutation, useQuery } from "@apollo/client";
import {
  FETCH_LOGIN_USER,
  UPDATE_PUSH_NOTIFICATION,
  UPDATE_REMINDER_HOUR,
} from "../../../../commons/apis/graphql-queries";
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
import { usePushSubscription } from "../../../../commons/hooks/usePushSubscription";

interface MypageContainerProps {
  theme?: keyof typeof COLORWAYS;
}

export default function MypageContainer({
  theme = "forest",
}: MypageContainerProps) {
  const router = useRouter();
  const [notifications, setNotifications] = useState(true);
  const [selectedTheme, setSelectedTheme] = useState(theme);
  const [selectedHour, setSelectedHour] = useState(21); // ✅ 시간만 저장 (0-23)
  const [isSavingTime, setIsSavingTime] = useState(false);
  const saveTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  // fetchLoginUser 쿼리 실행
  const { data, loading, error } = useQuery(FETCH_LOGIN_USER, {
    onCompleted: (data) => {
      console.log("✅ 사용자 정보 조회 성공:", data);
      console.log("사용자 ID:", data.fetchLoginUser.id);
      console.log("사용자 이름:", data.fetchLoginUser.name);
      console.log("사용자 이메일:", data.fetchLoginUser.email);
      console.log("사용자 전화번호:", data.fetchLoginUser.phone);
      console.log("사용자 생년월일:", data.fetchLoginUser.birthDate);
      console.log("마케팅 동의 여부:", data.fetchLoginUser.marketingAgreed);
      console.log("이용약관 동의 여부:", data.fetchLoginUser.termsAgreed);
      console.log(
        "개인정보처리방침 동의 여부:",
        data.fetchLoginUser.privacyAgreed
      );
      console.log("계정 생성일:", data.fetchLoginUser.createdAt);
      console.log("계정 수정일:", data.fetchLoginUser.updatedAt);
    },
    onError: (error) => {
      console.error("❌ 사용자 정보 조회 실패:", error);
      console.error("에러 메시지:", error.message);
      console.error("GraphQL 에러:", error.graphQLErrors);
      console.error("네트워크 에러:", error.networkError);
    },
  });

  const currentTheme = COLORWAYS[selectedTheme];

  const handleBack = () => {
    router.back();
  };

  // ✅ 사용자 정보 추출 (로딩 중이거나 에러 시 기본값)
  const userName = data?.fetchLoginUser?.name || "사용자";
  const userEmail = data?.fetchLoginUser?.email || "이메일 정보 없음";

  // 로딩 중일 때 콘솔 로그
  useEffect(() => {
    if (loading) {
      console.log("🔄 사용자 정보 로딩 중...");
    }
  }, [loading]);

  // 에러 발생 시 콘솔 로그
  useEffect(() => {
    if (error) {
      console.error("❌ 에러 발생:", error);
    }
  }, [error]);

  // 샘플 데이터
  const userStats = {
    streak: 7,
    totalRecords: 42,
    totalInfusions: 8,
  };

  // const monthlyRecords = [
  //   1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21,
  //   22, 23, 24, 25, 26, 27, 28, 29, 30,
  // ];

  // const goals = [
  //   {
  //     id: 1,
  //     title: "매일 가드레일 작성",
  //     progress: 85,
  //     icon: "📝",
  //   },
  //   {
  //     id: 2,
  //     title: "주 3회 담금주 기록",
  //     progress: 60,
  //     icon: "🍇",
  //   },
  //   {
  //     id: 3,
  //     title: "월 20회 파블로프 연습",
  //     progress: 75,
  //     icon: "🧠",
  //   },
  // ];

  // const templates = [
  //   {
  //     id: 1,
  //     title: "일일 회고 템플릿",
  //     description: "하루를 마무리하며 감사와 성찰을 기록",
  //   },
  //   {
  //     id: 2,
  //     title: "갈등 해결 템플릿",
  //     description: "관계에서의 갈등을 차분히 분석하고 해결책 모색",
  //   },
  //   {
  //     id: 3,
  //     title: "목표 설정 템플릿",
  //     description: "구체적이고 실현 가능한 목표를 설정",
  //   },
  // ];
  const { subscribeToPush, unsubscribeFromPush } = usePushSubscription();
  const [updatePushNotification] = useMutation(UPDATE_PUSH_NOTIFICATION);
  const pushNotificationEnabled =
    data?.fetchLoginUser?.pushNotificationEnabled ?? false;

  useEffect(() => {
    setNotifications(pushNotificationEnabled);
  }, [pushNotificationEnabled]);

  const handleNotificationToggle = async (checked: boolean) => {
    // 낙관적 업데이트
    setNotifications(checked);

    try {
      if (checked) {
        // 1. 브라우저에서 구독 + 백엔드에 구독 정보 저장
        await subscribeToPush();

        // 2. pushNotificationEnabled를 true로 업데이트
        await updatePushNotification({
          variables: {
            updatePushNotificationInput: {
              enabled: true,
            },
          },
        });
      } else {
        // 1. 브라우저에서 구독 해제 + 백엔드에서 구독 정보 삭제
        await unsubscribeFromPush();

        // 2. pushNotificationEnabled를 false로 업데이트
        await updatePushNotification({
          variables: {
            updatePushNotificationInput: {
              enabled: false,
            },
          },
        });
      }
    } catch (error) {
      console.error("푸시 구독 설정 변경 실패:", error);
      // 에러 발생 시 이전 상태로 롤백
      setNotifications(!checked);
      alert("푸시 알림 설정 변경에 실패했습니다. 다시 시도해주세요.");
    }
  };

  const [updateReminderHour] = useMutation(UPDATE_REMINDER_HOUR, {
    onCompleted: () => {
      console.log("✅ 알림 시간 업데이트 완료");
      setIsSavingTime(false);
    },
    onError: (error) => {
      console.error("❌ 알림 시간 업데이트 실패:", error);
      setIsSavingTime(false);
      alert("알림 시간 저장에 실패했습니다. 다시 시도해주세요.");
    },
  });

  // 사용자 정보에서 reminderHour를 가져와서 시간으로 설정
  useEffect(() => {
    if (
      data?.fetchLoginUser?.reminderHour !== null &&
      data?.fetchLoginUser?.reminderHour !== undefined
    ) {
      // reminderHour는 Int (0-23) 형식
      const hour = data.fetchLoginUser.reminderHour;
      setSelectedHour(hour);
    }
  }, [data?.fetchLoginUser?.reminderHour]);

  // 시간 변경 핸들러 (디바운싱 적용)
  const handleHourChange = (hour: number) => {
    setSelectedHour(hour);

    // 이전 타이머 취소
    if (saveTimeoutRef.current) {
      clearTimeout(saveTimeoutRef.current);
    }

    // 1초 후에 저장 (디바운싱)
    saveTimeoutRef.current = setTimeout(async () => {
      if (isNaN(hour) || hour < 0 || hour > 23) {
        return;
      }

      setIsSavingTime(true);

      try {
        await updateReminderHour({
          variables: {
            updateReminderHourInput: {
              reminderHour: hour,
            },
          },
        });
      } catch (error) {
        console.error("알림 시간 저장 실패:", error);
        // 에러 발생 시 이전 시간으로 롤백
        if (data?.fetchLoginUser?.reminderHour !== null) {
          const previousHour = data.fetchLoginUser.reminderHour;
          setSelectedHour(previousHour);
        }
      }
    }, 1000);
  };

  // 컴포넌트 언마운트 시 타이머 정리
  useEffect(() => {
    return () => {
      if (saveTimeoutRef.current) {
        clearTimeout(saveTimeoutRef.current);
      }
    };
  }, []);

  return (
    <Container gradient={currentTheme.gradient}>
      {/* Top App Bar */}
      <TopAppBar>
        <AppBarContent>
          <BackButton onClick={handleBack}>←</BackButton>
          <AppInfo>
            <AppTitle>마이페이지</AppTitle>
            {/* <AppSubtitle>나의 기록과 설정을 관리해보세요</AppSubtitle> */}
          </AppInfo>
          <div style={{ width: "40px" }}></div>
        </AppBarContent>
      </TopAppBar>

      {/* Content */}
      <ContentWrapper>
        {/* 1. 프로필 섹션 */}
        <ProfileSection>
          <ProfileHeader>
            {/* <ProfileAvatar
              bgColor={currentTheme.accentBg}
              textColor={currentTheme.accentText}
            >
              👤
            </ProfileAvatar> */}
            <ProfileInfo>
              {/* ✅ fetchLoginUser에서 받아온 이름 표시 */}
              <ProfileName>
                {loading ? "로딩 중..." : `${userName}님`}
              </ProfileName>
              {/* ✅ fetchLoginUser에서 받아온 이메일 표시 */}
              <ProfileEmail>{loading ? "로딩 중..." : userEmail}</ProfileEmail>
            </ProfileInfo>
          </ProfileHeader>
          {/* <ProfileStats>
            <StatItem>
              <StatNumber>{userStats.totalRecords}</StatNumber>
              <StatLabel>총 가드레일</StatLabel>
            </StatItem>
            <StatItem>
              <StatNumber>{userStats.totalInfusions}</StatNumber>
              <StatLabel>총 담금주</StatLabel>
            </StatItem>
            <StatItem>
              <StatNumber>{userStats.streak}</StatNumber>
              <StatLabel>투두 기록 일수</StatLabel>
            </StatItem>
          </ProfileStats> */}
        </ProfileSection>

        {/* 2. 통계 & 성과 */}
        {/* <Card>
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
        </Card> */}

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
                  onChange={(e) => handleNotificationToggle(e.target.checked)}
                />
                <span></span>
              </Switch>
            </SettingItem>

            <SettingItem>
              <SettingInfo>
                <SettingLabel>기록 시간</SettingLabel>
                <SettingDescription>
                  매일 가드레일 기록 알림을 받을 시간을 설정하세요
                </SettingDescription>
              </SettingInfo>
              <div style={{ position: "relative" }}>
                <Select
                  value={selectedHour}
                  onChange={(e) => handleHourChange(Number(e.target.value))}
                  disabled={isSavingTime}
                  style={{
                    padding: "8px 12px",
                    border: "1px solid #d1d5db",
                    borderRadius: "8px",
                    fontSize: "14px",
                    minWidth: "120px",
                    opacity: isSavingTime ? 0.6 : 1,
                    cursor: isSavingTime ? "not-allowed" : "pointer",
                  }}
                >
                  {Array.from({ length: 24 }, (_, i) => (
                    <option key={i} value={i}>
                      {i}시
                    </option>
                  ))}
                </Select>
                {isSavingTime && (
                  <span
                    style={{
                      position: "absolute",
                      right: "12px",
                      top: "50%",
                      transform: "translateY(-50%)",
                      fontSize: "12px",
                      color: "#6b7280",
                      pointerEvents: "none",
                    }}
                  >
                    저장 중...
                  </span>
                )}
              </div>
            </SettingItem>

            {/* <SettingItem>
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
            </SettingItem> */}
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
