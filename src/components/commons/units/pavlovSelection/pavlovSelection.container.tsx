import React, { useState, useMemo } from "react";
import { useRouter } from "next/router";
import { useQuery } from "@apollo/client";
import { FETCH_PAVLOVS } from "../../../../commons/apis/graphql-queries";
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
  FloatingActionButton,
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

// Pavlov 타입 정의 (GraphQL 스키마와 일치)
interface Pavlov {
  id: string;
  name: string;
  pavlovDetails: PavlovDetail[];
  createdAt: string;
  updatedAt: string;
}

interface PavlovDetail {
  id: string;
  description: string;
}

export default function PavlovSelectionPage() {
  const router = useRouter();
  const [colorway] = useState<keyof typeof COLORWAYS>("forest");
  const theme = COLORWAYS[colorway];
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [selectedStimulus, setSelectedStimulus] = useState<string>("");
  const [isNavigating, setIsNavigating] = useState(false);

  // GraphQL 쿼리로 파블로프 목록 조회
  const { data, loading, error } = useQuery<{ fetchPavlovs: Pavlov[] }>(
    FETCH_PAVLOVS,
    {
      notifyOnNetworkStatusChange: true,
    }
  );

  // API에서 가져온 파블로프 데이터를 기존 형식으로 변환
  const pavlovData = useMemo(() => {
    if (!data?.fetchPavlovs) return [];

    return data.fetchPavlovs.flatMap((pavlov) =>
      pavlov.pavlovDetails.map((detail) => ({
        stimulus: pavlov.name,
        response: detail.description,
      }))
    );
  }, [data]);

  // 고유한 stimulus 목록 생성 (API 데이터 기반)
  const uniqueStimuli = useMemo(() => {
    if (!data?.fetchPavlovs) return [];

    const stimuli = Array.from(
      new Set(data.fetchPavlovs.map((pavlov) => pavlov.name))
    );
    return stimuli.sort();
  }, [data]);

  // 선택된 stimulus에 해당하는 responses 필터링
  const filteredResponses = useMemo(() => {
    if (!selectedStimulus) return [];
    return pavlovData.filter((item) => item.stimulus === selectedStimulus);
  }, [selectedStimulus, pavlovData]);

  // 아이콘 컴포넌트들
  const ArrowLeftIcon = () => <span>←</span>;
  const BrainIcon = () => <span>🧠</span>;
  const ChevronDownIcon = () => <span>▼</span>;
  const PlusIcon = () => <span>+</span>;

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

  // 새 파블로프 추가 핸들러
  const handleAddTodo = () => {
    console.log("새 파블로프 추가");
    setIsNavigating(true);
    router.push("/pavlov/writer");
  };

  // 로딩 상태
  if (loading) {
    return (
      <Container gradient={theme.gradient}>
        <TopAppBar>
          <AppBarContent>
            <BackButton onClick={handleBack}>
              <ArrowLeftIcon />
            </BackButton>
            <AppInfo>
              <AppTitle>파블로프 선택</AppTitle>
              <AppSubtitle>로딩 중...</AppSubtitle>
            </AppInfo>
            <div style={{ width: "40px" }}></div>
          </AppBarContent>
        </TopAppBar>

        <ContentWrapper>
          <EmptyState>
            <EmptyIcon>⏳</EmptyIcon>
            <EmptyTitle>파블로프를 불러오는 중...</EmptyTitle>
            <EmptyDescription>
              서버에서 파블로프 데이터를 가져오고 있습니다
            </EmptyDescription>
          </EmptyState>
        </ContentWrapper>
      </Container>
    );
  }

  // 에러 상태
  if (error) {
    return (
      <Container gradient={theme.gradient}>
        <TopAppBar>
          <AppBarContent>
            <BackButton onClick={handleBack}>
              <ArrowLeftIcon />
            </BackButton>
            <AppInfo>
              <AppTitle>파블로프 선택</AppTitle>
              <AppSubtitle>오류 발생</AppSubtitle>
            </AppInfo>
            <div style={{ width: "40px" }}></div>
          </AppBarContent>
        </TopAppBar>

        <ContentWrapper>
          <EmptyState>
            <EmptyIcon>❌</EmptyIcon>
            <EmptyTitle>파블로프를 불러올 수 없습니다</EmptyTitle>
            <EmptyDescription>{error.message}</EmptyDescription>
          </EmptyState>
        </ContentWrapper>
      </Container>
    );
  }

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
        {/* ✅ 파블로프가 있을 때만 드롭다운 표시 */}
        {!loading && !error && uniqueStimuli.length > 0 && (
          <>
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

            {/* Response 목록 또는 선택 안내 */}
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
          </>
        )}

        {/* ✅ 파블로프가 없는 경우 */}
        {!loading && !error && uniqueStimuli.length === 0 && (
          <EmptyState>
            <EmptyIcon>📝</EmptyIcon>
            <EmptyTitle>아직 파블로프가 없어요</EmptyTitle>
            <EmptyDescription>
              새로운 파블로프를 추가해서 시작해보세요
            </EmptyDescription>
          </EmptyState>
        )}
      </ContentWrapper>

      {!isNavigating && (
        <FloatingActionButton theme={theme} onClick={handleAddTodo}>
          <PlusIcon />
        </FloatingActionButton>
      )}
    </Container>
  );
}
