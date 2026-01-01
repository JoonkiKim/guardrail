import { useState } from "react";
import { useRouter } from "next/router";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useMutation, useQuery } from "@apollo/client";
import { useRecoilValue } from "recoil";
import { authCheckedState } from "../../../../commons/stores";
import {
  CREATE_INFUSION,
  FETCH_INFUSIONS,
} from "../../../../commons/apis/graphql-queries";

// TypeScript types for GraphQL operations
interface InfusionDetail {
  id: string;
  description: string;
  periodType: string;
}

interface Infusion {
  id: string;
  title: string;
  category: "DECISION" | "STRESS" | "CONSUMPTION";
  description: string;
  infusionDetails: InfusionDetail[];
  createdAt: string;
  updatedAt: string;
}

interface FetchInfusionsData {
  fetchInfusions: Infusion[];
}

interface CreateInfusionData {
  createInfusion: Infusion;
}

// 뮤테이션 입력 타입 정의
interface CreateInfusionInput {
  title: string;
  category: "DECISION" | "STRESS" | "CONSUMPTION";
  description: string;
  infusionDetails: InfusionDetail[];
}

interface CreateInfusionVariables {
  createInfusionInput: CreateInfusionInput;
}
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
  ErrorMessage,
} from "./infusion.style";

// yup 검증 스키마 정의
const schema = yup.object({
  title: yup
    .string()
    .required("최소 1글자 이상 입력해주세요")
    .min(1, "최소 1글자 이상 입력해주세요"),
  background: yup
    .string()
    .required("최소 1글자 이상 입력해주세요")
    .min(1, "최소 1글자 이상 입력해주세요"),
  category: yup.string().required("카테고리를 선택해주세요"),
});

// yup 스키마에서 타입 추출
type FormData = yup.InferType<typeof schema>;

interface InfusionContainerProps {
  theme?: keyof typeof COLORWAYS;
}

export default function InfusionContainer({
  theme = "forest",
}: InfusionContainerProps) {
  const router = useRouter();
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [activeCategory, setActiveCategory] = useState<string>("DECISION"); // 카테고리 상태 분리

  const currentTheme = COLORWAYS[theme];

  // react-hook-form 사용 (yup resolver 추가)
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    setValue,
    reset,
  } = useForm<FormData>({
    resolver: yupResolver(schema),
    mode: "onSubmit", // submit 시에만 검증
    defaultValues: {
      title: "",
      background: "",
      category: "DECISION",
    },
  });

  // 현재 선택된 카테고리 감시
  const watchedCategory = watch("category");

  // Apollo Client 쿼리 및 뮤테이션 훅 사용
  const authChecked = useRecoilValue(authCheckedState);
  const {
    data: infusionsData,
    loading,
    error,
  } = useQuery<FetchInfusionsData>(FETCH_INFUSIONS, {
    skip: !authChecked, // ✅ 토큰 갱신 완료 전까지 스킵
  });
  const [createInfusionMutation, { loading: createLoading }] = useMutation<
    CreateInfusionData,
    CreateInfusionVariables
  >(CREATE_INFUSION, {
    // 뮤테이션 성공 후 캐시 업데이트
    update(cache, { data }) {
      if (data?.createInfusion) {
        // 기존 캐시에서 fetchInfusions 쿼리 결과 가져오기
        const existingInfusions = cache.readQuery<FetchInfusionsData>({
          query: FETCH_INFUSIONS,
        });

        if (existingInfusions) {
          // 새로운 담금주를 기존 목록에 추가
          cache.writeQuery<FetchInfusionsData>({
            query: FETCH_INFUSIONS,
            data: {
              fetchInfusions: [
                data.createInfusion,
                ...existingInfusions.fetchInfusions,
              ],
            },
          });
        }
      }
    },
  });

  const handleBack = () => {
    router.back();
  };

  const handleCategoryFilter = (category: string) => {
    setSelectedCategory(category);
  };

  const handleInfusionClick = (infusionId: string) => {
    router.push(`/infusion/${infusionId}`);
  };

  // 카테고리 선택 핸들러
  const handleCategorySelect = (category: string) => {
    setActiveCategory(category);
    setValue("category", category); // 폼 값도 업데이트
  };

  // 폼 제출 핸들러
  const onSubmit = async (data: FormData) => {
    try {
      const result = await createInfusionMutation({
        variables: {
          createInfusionInput: {
            title: data.title,
            category: data.category as "DECISION" | "STRESS" | "CONSUMPTION",
            description: data.background,
            infusionDetails: [],
          },
        },
      });

      console.log("담금주 생성 성공:", result.data.createInfusion);

      // 성공 후 폼 초기화
      reset();
      setActiveCategory("DECISION"); // 카테고리 상태도 초기화
    } catch (error) {
      console.error("담금주 생성 실패:", error);
      alert("담금주 생성 중 오류가 발생했습니다.");
    }
  };

  // 카테고리별 필터링
  const infusions: Infusion[] = infusionsData?.fetchInfusions || [];
  const filteredInfusions =
    selectedCategory === "all"
      ? infusions
      : infusions.filter((item: Infusion) => {
          const categoryMap: { [key: string]: string } = {
            decision: "DECISION",
            stress: "STRESS",
            spending: "CONSUMPTION",
          };
          return item.category === categoryMap[selectedCategory];
        });

  // 카테고리 이름 변환
  const getCategoryName = (category: string) => {
    switch (category) {
      case "DECISION":
        return "의사결정";
      case "STRESS":
        return "스트레스";
      case "CONSUMPTION":
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
            <form onSubmit={handleSubmit(onSubmit)}>
              <Grid cols={1}>
                <Input placeholder="제목" {...register("title")} />
                {errors.title && (
                  <ErrorMessage>{errors.title.message}</ErrorMessage>
                )}

                <Tabs>
                  <TabsList>
                    <TabsTrigger
                      isActive={activeCategory === "DECISION"}
                      onClick={() => handleCategorySelect("DECISION")}
                      type="button" // 버튼 타입 명시
                    >
                      의사결정
                    </TabsTrigger>
                    <TabsTrigger
                      isActive={activeCategory === "STRESS"}
                      onClick={() => handleCategorySelect("STRESS")}
                      type="button" // 버튼 타입 명시
                    >
                      스트레스
                    </TabsTrigger>
                    <TabsTrigger
                      isActive={activeCategory === "CONSUMPTION"}
                      onClick={() => handleCategorySelect("CONSUMPTION")}
                      type="button" // 버튼 타입 명시
                    >
                      소비
                    </TabsTrigger>
                  </TabsList>
                </Tabs>
                {errors.category && (
                  <ErrorMessage>{errors.category.message}</ErrorMessage>
                )}
              </Grid>

              <Textarea
                placeholder="배경과 맥락을 적어두세요"
                {...register("background")}
              />
              {errors.background && (
                <ErrorMessage>{errors.background.message}</ErrorMessage>
              )}

              <Button
                bgColor={currentTheme.button}
                hoverColor={currentTheme.buttonHover}
                type="submit"
                disabled={createLoading}
              >
                {createLoading ? "저장 중..." : "담금 시작"}
              </Button>
            </form>
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

            {(loading || !authChecked) ? ( // ✅ 토큰 갱신 중일 때도 로딩 상태
              <div style={{ textAlign: "center", padding: "20px" }}>
                로딩 중...
              </div>
            ) : error ? (
              <div style={{ textAlign: "center", padding: "20px" }}>
                데이터를 불러오는 중 오류가 발생했습니다.
              </div>
            ) : (
              <Grid cols={1}>
                {filteredInfusions.map((item: Infusion) => (
                  <InfusionItem
                    key={item.id}
                    onClick={() => handleInfusionClick(item.id)}
                    style={{ cursor: "pointer" }}
                    ringColor={currentTheme.ring}
                  >
                    <InfusionHeader>
                      <InfusionTitle>
                        {item.title}
                        <CategoryBadge category={item.category}>
                          {getCategoryName(item.category)}
                        </CategoryBadge>
                      </InfusionTitle>
                    </InfusionHeader>
                    <Separator />
                    <InfusionPreview>{item.description}</InfusionPreview>
                  </InfusionItem>
                ))}
              </Grid>
            )}
          </CardContent>
        </Card>
      </ContentWrapper>
    </Container>
  );
}
