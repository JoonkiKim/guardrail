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
  SectionTitle,
  SectionIcon,
  SectionText,
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  Input,
  Textarea,
  Button,
  Badge,
  Tabs,
  TabsList,
  TabsTrigger,
  Separator,
  Grid,
  InfusionItem,
  InfusionHeader,
  InfusionTitle,
  InfusionMeta,
  InfusionPreview,
  TimeOptionsContainer,
  ReminderInfo,
  CategoryBadge,
  FilterContainer,
  FilterButton,
  COLORWAYS,
  mockInfusions,
  CardTitleWithIcon,
} from "./soaking.style";

interface SoakingContainerProps {
  theme?: keyof typeof COLORWAYS;
}

export default function SoakingContainer({
  theme = "forest",
}: SoakingContainerProps) {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState("decision");
  const [title, setTitle] = useState("");
  const [background, setBackground] = useState("");
  const [thoughts, setThoughts] = useState("");
  const [selectedTime, setSelectedTime] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("all");

  const currentTheme = COLORWAYS[theme];

  const timeOptions = ["1주 뒤", "1달 뒤", "1년 뒤", "10년 뒤"];

  // 카테고리별 데이터 추가
  const enhancedMockInfusions = [
    {
      id: 1,
      title: "이직 고민",
      category: "decision",
      status: "숙성중",
      next: "1달 뒤",
      preview:
        "지금 팀에서의 배움과 다음 단계에서 원하는 것의 교집합을 그려본다.",
    },
    {
      id: 2,
      title: "소비 패턴 점검",
      category: "spending",
      status: "숙성중",
      next: "1주 뒤",
      preview: "감정 기반 소비가 늘어난 이유를 환경/습관으로 분해한다.",
    },
    {
      id: 3,
      title: "관계 갈등",
      category: "stress",
      status: "수확함",
      next: "완료",
      preview:
        "사실-느낌-요구를 분리해 보니, 부탁을 미리 말하는 연습이 필요했다.",
    },
    {
      id: 4,
      title: "프로젝트 방향성",
      category: "decision",
      status: "숙성중",
      next: "2주 뒤",
      preview: "현재 프로젝트의 방향이 올바른지 다시 한번 검토해본다.",
    },
    {
      id: 5,
      title: "업무 스트레스",
      category: "stress",
      status: "숙성중",
      next: "3일 뒤",
      preview: "업무에서 받는 스트레스의 원인을 분석하고 대처 방안을 모색한다.",
    },
  ];

  const handleTimeSelect = (time: string) => {
    setSelectedTime(time);
  };

  const handleSave = () => {
    // 여기에 저장 로직 추가
    console.log({
      title,
      type: activeTab,
      background,
      thoughts,
      reminderTime: selectedTime,
    });
  };

  const handleBack = () => {
    router.back();
  };

  const handleCategoryFilter = (category: string) => {
    setSelectedCategory(category);
  };

  // 카테고리별 필터링
  const filteredInfusions =
    selectedCategory === "all"
      ? enhancedMockInfusions
      : enhancedMockInfusions.filter(
          (item) => item.category === selectedCategory
        );

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

  return (
    <Container gradient={currentTheme.gradient}>
      {/* Top App Bar */}
      <TopAppBar>
        <AppBarContent>
          <BackButton onClick={handleBack}>←</BackButton>
          <AppInfo>
            <AppTitle>담금주 기록</AppTitle>
            <AppSubtitle>긴 호흡으로 생각을 담가봅니다</AppSubtitle>
          </AppInfo>
          <div style={{ width: "40px" }}></div>
        </AppBarContent>
      </TopAppBar>

      {/* Content */}
      <ContentWrapper>
        {/* 새 담금주 */}
        <Card>
          <CardHeader>
            <CardTitleWithIcon>새 담금주 🍇</CardTitleWithIcon>
          </CardHeader>
          <CardContent>
            <Grid cols={2}>
              <Input
                placeholder="제목"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
              <Tabs>
                <TabsList>
                  <TabsTrigger
                    isActive={activeTab === "decision"}
                    onClick={() => setActiveTab("decision")}
                  >
                    의사결정
                  </TabsTrigger>
                  <TabsTrigger
                    isActive={activeTab === "stress"}
                    onClick={() => setActiveTab("stress")}
                  >
                    스트레스
                  </TabsTrigger>
                  <TabsTrigger
                    isActive={activeTab === "spending"}
                    onClick={() => setActiveTab("spending")}
                  >
                    소비
                  </TabsTrigger>
                </TabsList>
              </Tabs>
            </Grid>

            <Textarea
              placeholder="배경과 맥락을 적어두세요"
              value={background}
              onChange={(e) => setBackground(e.target.value)}
            />
            {/* 
            <TimeOptionsContainer>
              {timeOptions.map((time) => (
                <Badge
                  key={time}
                  bgColor="#fef3c7"
                  textColor="#92400e"
                  selectedBg="#fbbf24"
                  selectedText="#92400e"
                  isSelected={selectedTime === time}
                  onClick={() => handleTimeSelect(time)}
                >
                  {time}
                </Badge>
              ))}
              <ReminderInfo>
                <span>🔔</span>
                숙성 리마인드
              </ReminderInfo>
            </TimeOptionsContainer> */}

            <Button
              bgColor={currentTheme.button}
              hoverColor={currentTheme.buttonHover}
              onClick={handleSave}
            >
              담금 시작
            </Button>
          </CardContent>
        </Card>

        {/* 숙성 목록 */}
        <Card>
          <CardHeader>
            <CardTitle>숙성 목록</CardTitle>
          </CardHeader>
          <CardContent>
            {/* 카테고리 필터 */}
            <FilterContainer>
              <FilterButton
                isActive={selectedCategory === "all"}
                theme={currentTheme}
                onClick={() => handleCategoryFilter("all")}
              >
                전체
              </FilterButton>
              <FilterButton
                isActive={selectedCategory === "decision"}
                theme={currentTheme}
                onClick={() => handleCategoryFilter("decision")}
              >
                의사결정
              </FilterButton>
              <FilterButton
                isActive={selectedCategory === "stress"}
                theme={currentTheme}
                onClick={() => handleCategoryFilter("stress")}
              >
                스트레스
              </FilterButton>
              <FilterButton
                isActive={selectedCategory === "spending"}
                theme={currentTheme}
                onClick={() => handleCategoryFilter("spending")}
              >
                소비
              </FilterButton>
            </FilterContainer>

            <Grid cols={1}>
              {filteredInfusions.map((item) => (
                <InfusionItem key={item.id} ringColor={currentTheme.ring}>
                  <InfusionHeader>
                    <InfusionTitle>
                      {item.title}
                      <CategoryBadge category={item.category}>
                        {getCategoryName(item.category)}
                      </CategoryBadge>
                    </InfusionTitle>
                  </InfusionHeader>
                  {/* <InfusionMeta>다음 리마인드: {item.next}</InfusionMeta> */}
                  <Separator />
                  <InfusionPreview>{item.preview}</InfusionPreview>
                </InfusionItem>
              ))}
            </Grid>
          </CardContent>
        </Card>
      </ContentWrapper>
    </Container>
  );
}
