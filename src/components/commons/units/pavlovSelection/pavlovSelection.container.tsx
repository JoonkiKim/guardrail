import React, { useState, useMemo } from "react";
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
  StimulusDropdown,
  StimulusSelector,
  StimulusText,
  StimulusArrow,
  StimulusOptions,
  StimulusOption,
  ResponseList,
  ResponseCard,
  ResponseText,
  EmptyState,
  EmptyIcon,
  EmptyTitle,
  EmptyDescription,
} from "./pavlovSelection.style";

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

export default function PavlovSelectionPage() {
  const router = useRouter();
  const [colorway] = useState<keyof typeof COLORWAYS>("forest");
  const theme = COLORWAYS[colorway];
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [selectedStimulus, setSelectedStimulus] = useState<string>("");

  // 고유한 stimulus 목록 생성
  const uniqueStimuli = useMemo(() => {
    const stimuli = Array.from(
      new Set(PAVLOV_DATA.map((item) => item.stimulus))
    );
    return stimuli.sort();
  }, []);

  // 선택된 stimulus에 해당하는 responses 필터링
  const filteredResponses = useMemo(() => {
    if (!selectedStimulus) return [];
    return PAVLOV_DATA.filter((item) => item.stimulus === selectedStimulus);
  }, [selectedStimulus]);

  // 아이콘 컴포넌트들
  const ArrowLeftIcon = () => <span>←</span>;
  const BrainIcon = () => <span>🧠</span>;
  const ChevronDownIcon = () => <span>▼</span>;

  // 뒤로가기 핸들러
  const handleBack = () => {
    router.back();
  };

  // 드롭다운 토글 핸들러
  const handleDropdownToggle = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  // stimulus 선택 핸들러
  const handleStimulusSelect = (stimulus: string) => {
    setSelectedStimulus(stimulus);
    setIsDropdownOpen(false);
  };

  return (
    <Container gradient={theme.gradient}>
      {/* Top App Bar */}
      <TopAppBar>
        <AppBarContent>
          <BackButton onClick={handleBack}>
            <ArrowLeftIcon />
          </BackButton>
          <AppInfo>
            <AppTitle>파블로프 선택</AppTitle>
            <AppSubtitle>상황에 맞는 응답을 찾아보세요</AppSubtitle>
          </AppInfo>
          <div style={{ width: "40px" }}></div>
        </AppBarContent>
      </TopAppBar>

      {/* Content */}
      <ContentWrapper>
        {/* Stimulus 선택 드롭다운 */}
        <StimulusDropdown isOpen={isDropdownOpen}>
          <StimulusSelector onClick={handleDropdownToggle}>
            <StimulusText>
              {selectedStimulus || "상황을 선택하세요"}
            </StimulusText>
            <StimulusArrow isOpen={isDropdownOpen}>
              <ChevronDownIcon />
            </StimulusArrow>
          </StimulusSelector>
          <StimulusOptions isOpen={isDropdownOpen}>
            {uniqueStimuli.map((stimulus) => (
              <StimulusOption
                key={stimulus}
                isSelected={selectedStimulus === stimulus}
                onClick={() => handleStimulusSelect(stimulus)}
              >
                {stimulus}
              </StimulusOption>
            ))}
          </StimulusOptions>
        </StimulusDropdown>

        {/* Response 목록 */}
        {selectedStimulus ? (
          <ResponseList>
            {filteredResponses.map((item, index) => (
              <ResponseCard key={index} theme={theme}>
                <ResponseText>{item.response}</ResponseText>
              </ResponseCard>
            ))}
          </ResponseList>
        ) : (
          <EmptyState>
            <EmptyIcon>🧠</EmptyIcon>
            <EmptyTitle>상황을 선택해주세요</EmptyTitle>
            <EmptyDescription>
              위의 드롭다운에서 상황을 선택하면
              <br />
              해당하는 응답들을 확인할 수 있습니다
            </EmptyDescription>
          </EmptyState>
        )}
      </ContentWrapper>
    </Container>
  );
}
