import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { useForm } from "react-hook-form"; // react-hook-form import 추가
import GuardRailSuccessModal from "../../modals/guardRailSuccessModal"; // 모달 import 추가
import {
  Container,
  TopAppBar,
  AppBarContent,
  BackButton,
  AppInfo,
  AppTitle,
  AppSubtitle,
  SaveButton,
  ContentWrapper,
  FormContainer,
  SectionTitle,
  SectionIcon,
  SectionText,
  SectionHeading,
  SectionSubtitle,
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  Input,
  Textarea,
  Button,
  Badge,
  Separator,
  Switch,
  GridContainer,
  FullWidthContainer,
  BottomNav,
  BottomNavContent,
  BottomNavItem,
  BottomNavIcon,
  BottomNavLabel,
  Fab,
} from "./guardRailWriter.style";

// Colorway presets (mainPage와 동일)
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

// 파블로프 데이터
const PAVLOV_DATA = [
  { stimulus: "거의 모든 상황", response: "10초 세며 숨 고르기" },
  {
    stimulus: "갈등",
    response: '"내가 맞다는 걸 증명해야 할 필요가 정말 있는가?"',
  },
  {
    stimulus: "갈등",
    response: '"상대방의 사정, 상대방의 의견을 궁금해 하고 있는가?"',
  },
  {
    stimulus: "갈등",
    response: '"이겨야 할 대상은 없다. 이해해야 할 사람만 있을 뿐이다."',
  },
  { stimulus: "감정적 동요", response: '"이건 무슨 감정인가?"' },
  {
    stimulus: "감정적 동요",
    response: '"내가 지금 배고프거나 피곤한가? 아님 진짜 감정인가?"',
  },
  { stimulus: "감정적 동요", response: '"10년 뒤에도 중요한 일인가?"' },
  {
    stimulus: "감정적 동요",
    response: '"이 순간은 전체 우주에서 얼마나 미세한가?"',
  },
  { stimulus: "감정적 동요", response: "자리에서 일어나 자극 없이 5분 걷기" },
  { stimulus: "감정적 동요", response: "목 뒤에 찬물 묻히기" },
  { stimulus: "감정적 동요", response: '"지금 해결하지 않아도 괜찮은가?"' },
  {
    stimulus: "계획이 틀어졌을 때",
    response: '"전체 그림에서 정말 중요한 부분인가?"',
  },
  {
    stimulus: "계획이 틀어졌을 때",
    response: '"지금 이 상황에서 통제 가능한 건 뭔가?"',
  },
  { stimulus: "데드타임", response: "언어 전환 (예: 외국어 문장 1개 암기)" },
  { stimulus: "데드타임", response: "짧은 신체 루틴 (월싯 1분)" },
  { stimulus: "좋은 의사결정", response: '"꼭 지금해야 하는가?"' },
  { stimulus: "좋은 의사결정", response: '"감정인가 판단인가?"' },
  {
    stimulus: "좋은 의사결정",
    response: '"핵심 기준은 뭔가? 그걸 만족하는 선택은?"',
  },
  {
    stimulus: "좋은 의사결정",
    response: '"내가 죽기 직전에 이 선택을 어떻게 평가할까?"',
  },
  {
    stimulus: "좋은 의사결정",
    response: '"10년 후 모든 걸 이룬 미래의 나라면 이 일에 어떻게 접근할까?"',
  },
  {
    stimulus: "좋은 의사결정",
    response: '"이 결정이 10년 후 내 삶에 어떤 의미가 있을까?"',
  },
  { stimulus: "의사결정으로 인한 스트레스", response: '"위임할 수 있는가?"' },
  { stimulus: "의사결정으로 인한 스트레스", response: '"가역적인가?"' },
  {
    stimulus: "의사결정으로 인한 스트레스",
    response: '"(완벽하지 않더라도) 충분히 좋은가? 좋다면 그렇게 하자."',
  },
  {
    stimulus: "의사결정으로 인한 스트레스",
    response: '"최악의 경우엔 어떻게 되나? 난 그걸 감당할 수 있나?"',
  },
  {
    stimulus: "문제 해결",
    response: '"이 문제를 해결하는 완전히 다른 방식은 없을까?"',
  },
  {
    stimulus: "문제 해결",
    response: '"처음부터 다시 시작한다면, 진짜 문제가 무엇이었나?"',
  },
  { stimulus: "소비 충동", response: '"좋다. 근데 필요하진 않다."' },
  {
    stimulus: "소비 충동",
    response: '"일시불이래도 살 것인가? (10만 원 이하는 무조건 일시불)"',
  },
  {
    stimulus: "소비 충동",
    response:
      '"가격을 떠나, 이걸 구매하는 데에 나의 시간, 집중력, 의사결정에 따른 정신적 피로를 투자할 가치가 있는가?"',
  },
  { stimulus: "소비 충동", response: "그래도 사고 싶으면 소비 리스트에 기록" },
  {
    stimulus: "콘텐츠 소비",
    response: '"여기에 시간 쓰는 게 정말 가치 있나?"',
  },
  {
    stimulus: "콘텐츠 소비",
    response: '"난 지금 이걸 정말로 궁금해하나, 원하나?"',
  },
  { stimulus: "의사소통", response: "이름 기억하고 시작" },
  { stimulus: "의사소통", response: '"듣기 비율이 얼마나 되는가?"' },
  {
    stimulus: "의사소통",
    response: '"상대방의 얘기하고 싶어하는 것은 무엇인가?"',
  },
  {
    stimulus: "의사소통",
    response: '"상대의 감정을 얻었는가? 이성보다 감정이 먼저다."',
  },
  {
    stimulus: "다맥락에 압도될 때",
    response: "모든 맥락을 두서없이 적고 가장 빨리 끝낼 수 있는 하나 먼저 처리",
  },
  {
    stimulus: "시간 허투루 보낼 때",
    response: '"10분은 깨어있는 시간의 1%다."',
  },
  { stimulus: "일 시작이 안 될 때", response: "3분으로 쪼개서 바로 한다" },
  { stimulus: "일이 열렸을 때", response: "바로 메모" },
  {
    stimulus: "자기 전",
    response: "오늘 하루 중 후회되는 (스스로에게 떳떳하지 못한) 행동이 있었나?",
  },
  {
    stimulus: "회의감",
    response: "지금 이 회의는 문제 해결을 위한 건가, 자기소모인가?",
  },
];

// 폼 데이터 타입 정의
interface FormData {
  yesterdayMood: string;
  todayImportant: string;
  happenedEvents: string;
  gratitude: string;
  regrets: string;
  lifeDirection: string;
  yesterdayProgress: string;
  unknowns: string;
}

export default function GuardRailWriter() {
  const router = useRouter();
  const [colorway, setColorway] = useState<keyof typeof COLORWAYS>("forest");
  const theme = COLORWAYS[colorway];
  const [nav, setNav] = useState<
    "entry" | "todo" | "pavlov" | "daily" | "infusion" | "my"
  >("daily");

  // 모달 상태 추가
  const [showModal, setShowModal] = useState(false);

  // 랜덤 파블로프 상태
  const [randomPavlov, setRandomPavlov] = useState<{
    stimulus: string;
    response: string;
  } | null>(null);

  // 컴포넌트 마운트 시 랜덤 파블로프 선택
  useEffect(() => {
    const randomIndex = Math.floor(Math.random() * PAVLOV_DATA.length);
    setRandomPavlov(PAVLOV_DATA[randomIndex]);
  }, []);

  // react-hook-form 사용
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm<FormData>({
    defaultValues: {
      yesterdayMood: "",
      todayImportant: "",
      happenedEvents: "",
      gratitude: "",
      regrets: "",
      lifeDirection: "",
      yesterdayProgress: "",
      unknowns: "",
    },
  });

  // 아이콘 컴포넌트들
  const ArrowLeftIcon = () => <span>←</span>;
  const LeafIcon = () => <span>🌿</span>;
  const ListTodoIcon = () => <span>📝</span>;
  const BrainIcon = () => <span>🧠</span>;
  const NotebookPenIcon = () => <span>✏️</span>;
  const AnchorIcon = () => <span>⚓</span>;
  const UserIcon = () => <span>👤</span>;
  const PlusIcon = () => <span>+</span>;
  const SparklesIcon = () => <span>✨</span>;

  const onSubmit = (data: FormData) => {
    console.log("=== onSubmit 함수 실행됨 ===");
    console.log("가드레일 저장:", data);
    console.log("모달 상태 변경 전:", showModal);

    // 여기에 저장 로직 추가

    // 모달 표시
    setShowModal(true);
    console.log("모달 상태 변경 후:", true);
    console.log("=== onSubmit 함수 완료 ===");
  };

  const handleSaveClick = () => {
    console.log("=== 저장 버튼 클릭됨 ===");
    console.log("모달 상태 변경 전:", showModal);

    // 폼 데이터 가져오기 (선택사항)
    const formData = watch();
    console.log("폼 데이터:", formData);

    // 모달 표시
    setShowModal(true);
    console.log("모달 상태 변경 후:", true);
    console.log("=== 저장 버튼 클릭 완료 ===");
  };

  const handleBack = () => {
    router.push("/");
  };

  const handleCloseModal = () => {
    console.log("모달 닫기 호출"); // 디버깅 추가
    setShowModal(false);
  };

  // 오늘의 파블로프 섹션
  const TodayPavlovSection = () => (
    <Card
      style={{
        background: `linear-gradient(135deg, ${theme.accentBg}, ${theme.emphCard})`,
        border: `1px solid ${theme.ring}`,
        borderRadius: "12px",
        marginBottom: "20px",
        overflow: "hidden",
        boxShadow: "0 2px 8px rgba(0, 0, 0, 0.05)",
      }}
    >
      <CardHeader
        style={{
          padding: "16px 20px 12px",
          borderBottom: `1px solid ${theme.ring}`,
          background: "rgba(255, 255, 255, 0.6)",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
          <div
            style={{
              width: "32px",
              height: "32px",
              borderRadius: "50%",
              background: theme.button,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: "white",
              fontSize: "14px",
              fontWeight: "600",
            }}
          >
            🧠
          </div>
          <div>
            <CardTitle
              style={{
                fontSize: "16px",
                fontWeight: "600",
                color: theme.accentText,
                margin: 0,
              }}
            >
              오늘의 파블로프
            </CardTitle>
            <div
              style={{
                fontSize: "12px",
                color: "#6b7280",
                marginTop: "2px",
              }}
            >
              매일 새로운 조건반사 훈련
            </div>
          </div>
        </div>
      </CardHeader>

      <CardContent style={{ padding: "16px 20px" }}>
        {randomPavlov && (
          <div>
            <div
              style={{
                marginBottom: "16px",
                marginLeft: "5px",
              }}
            >
              <div
                style={{
                  fontSize: "12px",
                  color: theme.accentText,
                  fontWeight: "600",
                  textTransform: "uppercase",
                  letterSpacing: "0.5px",
                  marginBottom: "8px",
                }}
              >
                {randomPavlov.stimulus}
              </div>
              <div
                style={{
                  width: "100px",
                  height: "2px",
                  alignSelf: "center",
                  background: theme.button,
                  borderRadius: "1px",
                }}
              />
            </div>

            <div
              style={{
                background: "rgba(255, 255, 255, 0.8)",
                padding: "16px",
                borderRadius: "10px",
                border: `1px solid ${theme.ring}`,
                position: "relative",
              }}
            >
              <div
                style={{
                  fontSize: "0.8rem",
                  color: "#374151",
                  lineHeight: "1.6",
                  fontWeight: "500",
                  textAlign: "center",
                  // fontStyle: "italic",
                }}
              >
                {randomPavlov.response}
              </div>
            </div>

            {/* <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                marginTop: "12px",
                paddingTop: "8px",
                borderTop: `1px solid ${theme.ring}`,
              }}
            >
              <div
                style={{
                  fontSize: "12px",
                  color: "#6b7280",
                }}
              >
                이 문장을 오늘 하루 동안 기억해보세요
              </div>
              <Button
                theme={theme}
                style={{
                  fontSize: "12px",
                  padding: "6px 12px",
                  height: "auto",
                  borderRadius: "12px",
                }}
                onClick={() => {
                  const newRandom =
                    PAVLOV_DATA[Math.floor(Math.random() * PAVLOV_DATA.length)];
                  setRandomPavlov(newRandom);
                }}
              >
                다른 문장 보기
              </Button>
            </div> */}
          </div>
        )}
      </CardContent>
    </Card>
  );

  return (
    <Container gradient={theme.gradient}>
      {/* Top App Bar */}
      <TopAppBar>
        <AppBarContent>
          <BackButton onClick={handleBack}>←</BackButton>
          <AppInfo>
            <AppTitle>데일리 가드레일 작성</AppTitle>
            <AppSubtitle>오늘의 생각을 정리해보세요</AppSubtitle>
          </AppInfo>
          <div style={{ width: "40px" }}></div>
        </AppBarContent>
      </TopAppBar>

      {/* Content */}
      <ContentWrapper>
        {/* <SectionTitle>
          <SectionIcon accentBg={theme.accentBg} accentText={theme.accentText}>
            <LeafIcon />
          </SectionIcon>
          <SectionText>
            <SectionHeading>데일리 가드레일</SectionHeading>
          </SectionText>
        </SectionTitle> */}

        {/* 오늘의 파블로프 섹션 추가 */}
        <TodayPavlovSection />

        <FormContainer onSubmit={handleSubmit(onSubmit)}>
          <GridContainer>
            <Card>
              <CardHeader>
                <CardTitle size="sm">어제의 기분 한 단어</CardTitle>
              </CardHeader>
              <CardContent>
                <Input
                  // placeholder="예: 고마움, 걱정, 가벼움, 무덤덤"
                  {...register("yesterdayMood")}
                />
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle size="sm">오늘 가장 중요한 한 가지</CardTitle>
              </CardHeader>
              <CardContent>
                <Input
                  // placeholder="가장 중요한 하나에 집중해요"
                  {...register("todayImportant")}
                />
              </CardContent>
            </Card>
          </GridContainer>

          <Card>
            <CardHeader>
              <CardTitle size="sm">있었던 일 (일기)</CardTitle>
            </CardHeader>
            <CardContent>
              <Textarea
                rows={6}
                // placeholder="어제/오늘 있었던 일을 차분히 적어보세요"
                {...register("happenedEvents")}
              />
            </CardContent>
          </Card>

          <GridContainer>
            <Card>
              <CardHeader>
                <CardTitle size="sm">감사한 것</CardTitle>
              </CardHeader>
              <CardContent>
                <Textarea
                  rows={6}
                  // placeholder="사소해도 좋아요. 고마웠던 장면을 적어보세요"
                  {...register("gratitude")}
                />
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle size="sm">후회하는 일</CardTitle>
              </CardHeader>
              <CardContent>
                <Textarea
                  rows={6}
                  // placeholder="자책 대신 사실을 적습니다"
                  {...register("regrets")}
                />
              </CardContent>
            </Card>
          </GridContainer>

          <GridContainer>
            <Card>
              <CardHeader>
                <CardTitle size="sm">
                  내 삶은 어디를 향하는가? <br />
                  나의 화두는 원하는 것과 일치하는가?
                </CardTitle>
              </CardHeader>
              <CardContent>
                <Textarea
                  rows={6}
                  // placeholder="나의 방향을 한 단락으로 적어봅니다"
                  {...register("lifeDirection")}
                />
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle size="sm">
                  어제 나는 바람직한 방향으로 한 걸음 움직였는가?
                </CardTitle>
              </CardHeader>
              <CardContent>
                <Textarea
                  rows={6}
                  // placeholder="작은 걸음도 걸음입니다"
                  {...register("yesterdayProgress")}
                />
              </CardContent>
            </Card>
          </GridContainer>

          <Card>
            <CardHeader>
              <CardTitle size="sm">모르는 것</CardTitle>
            </CardHeader>
            <CardContent>
              <div style={{ marginBottom: "12px" }}>
                <p style={{ fontSize: "12px", color: "#6b7280", margin: 0 }}>
                  AI가 질문을 제안해 줄 수 있어요
                </p>
              </div>
              <Textarea
                rows={4}
                // placeholder="요즘 막히는 지점이나 잘 모르겠는 부분을 적어두세요"
                {...register("unknowns")}
              />
              <div style={{ marginTop: "12px" }}>
                <Button variant="secondary" theme={theme} type="button">
                  <SparklesIcon />
                  제안 받기
                </Button>
              </div>
            </CardContent>
          </Card>

          <div style={{ display: "flex", justifyContent: "flex-end" }}>
            <Button
              theme={theme}
              type="button" // submit에서 button으로 변경
              onClick={handleSaveClick} // 클릭 핸들러 추가
            >
              오늘의 가드레일 저장
            </Button>
          </div>
        </FormContainer>
      </ContentWrapper>

      {/* 모달 렌더링 */}
      <GuardRailSuccessModal
        isOpen={showModal}
        onClose={handleCloseModal}
        theme={theme}
      />
    </Container>
  );
}
