import React, { useState } from "react";
import { useRouter } from "next/router";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useRecoilValue } from "recoil";
import { authCheckedState } from "../../../../commons/stores";
import GuardRailSuccessModal from "../../modals/guardRailSuccessModal";
import AlertModal from "../../modals/alertModal";
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
  ErrorMessage,
} from "./guardRailWriter.style";
import { useMutation, useQuery } from "@apollo/client";
import {
  CREATE_GUARDRAIL,
  UPDATE_GUARDRAIL,
  FETCH_GUARDRAIL,
  FETCH_PAVLOVS,
} from "../../../../commons/apis/graphql-queries";

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

// 파블로프 타입 정의
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

// yup 검증 스키마 정의
const schema = yup.object({
  yesterdayMood: yup
    .string()
    .required("최소 1글자 이상 입력해주세요")
    .min(1, "최소 1글자 이상 입력해주세요"),
  todayImportant: yup
    .string()
    .required("최소 1글자 이상 입력해주세요")
    .min(1, "최소 1글자 이상 입력해주세요"),
  happenedEvents: yup
    .string()
    .required("최소 1글자 이상 입력해주세요")
    .min(1, "최소 1글자 이상 입력해주세요"),
  gratitude: yup
    .string()
    .required("최소 1글자 이상 입력해주세요")
    .min(1, "최소 1글자 이상 입력해주세요"),
  regrets: yup
    .string()
    .required("최소 1글자 이상 입력해주세요")
    .min(1, "최소 1글자 이상 입력해주세요"),
  lifeDirection: yup
    .string()
    .required("최소 1글자 이상 입력해주세요")
    .min(1, "최소 1글자 이상 입력해주세요"),
  yesterdayProgress: yup
    .string()
    .required("최소 1글자 이상 입력해주세요")
    .min(1, "최소 1글자 이상 입력해주세요"),
  unknowns: yup
    .string()
    .required("최소 1글자 이상 입력해주세요")
    .min(1, "최소 1글자 이상 입력해주세요"),
});

// yup 스키마에서 타입 추출
type FormData = yup.InferType<typeof schema>;

// TypeScript types for GraphQL operations
interface Guardrail {
  id: string;
  feeling: string;
  mostImpt: string;
  diary: string;
  thanks: string;
  regret: string;
  direction: string;
  oneStep: string;
  ignorance: string;
  createdAt: string;
  updatedAt: string;
}

interface CreateGuardrailData {
  createGuardrail: Guardrail;
}

// 뮤테이션 입력 타입 정의
interface CreateGuardrailInput {
  feeling: string;
  mostImpt: string;
  diary: string;
  thanks: string;
  regret: string;
  direction: string;
  oneStep: string;
  ignorance: string;
}

interface CreateGuardrailVariables {
  createGuardrailInput: CreateGuardrailInput;
}

// UPDATE용 타입 정의
interface UpdateGuardrailInput {
  feeling?: string;
  mostImpt?: string;
  diary?: string;
  thanks?: string;
  regret?: string;
  direction?: string;
  oneStep?: string;
  ignorance?: string;
}

interface UpdateGuardrailVariables {
  guardrailId: string;
  updateGuardrailInput: UpdateGuardrailInput;
}

interface UpdateGuardrailData {
  updateGuardrail: Guardrail;
}

export default function GuardRailWriter({
  isEdit = false,
  guardRailId,
}: {
  isEdit: boolean;
  guardRailId?: string;
}) {
  const router = useRouter();
  const [colorway, setColorway] = useState<keyof typeof COLORWAYS>("forest");
  const theme = COLORWAYS[colorway];
  const [nav, setNav] = useState<
    "entry" | "todo" | "pavlov" | "daily" | "infusion" | "my"
  >("daily");

  // 모달 상태 추가
  const [showModal, setShowModal] = useState(false);
  const [showUpdateSuccessModal, setShowUpdateSuccessModal] = useState(false);

  // 랜덤 파블로프 상태
  const [randomPavlov, setRandomPavlov] = useState<{
    stimulus: string;
    response: string;
  } | null>(null);

  // 기존 가드레일 데이터 조회 (편집 모드일 때만)
  const authChecked = useRecoilValue(authCheckedState);

  // 파블로프 데이터 조회
  const { data: pavlovsData, loading: isPavlovsLoading } = useQuery<{
    fetchPavlovs: Pavlov[];
  }>(FETCH_PAVLOVS, {
    skip: !authChecked, // 토큰 갱신 완료 전까지 스킵
    onCompleted: (data) => {
      // 파블로프 데이터를 변환하여 랜덤으로 하나 선택
      if (data?.fetchPavlovs && data.fetchPavlovs.length > 0) {
        // 모든 파블로프를 평탄화하여 {stimulus, response} 형태로 변환
        const allPavlovs = data.fetchPavlovs.flatMap((pavlov) =>
          pavlov.pavlovDetails.map((detail) => ({
            stimulus: pavlov.name,
            response: detail.description,
          }))
        );

        // 랜덤으로 하나 선택
        if (allPavlovs.length > 0) {
          const randomIndex = Math.floor(Math.random() * allPavlovs.length);
          setRandomPavlov(allPavlovs[randomIndex]);
        }
      }
    },
  });
  const { data: guardrailData, loading: isGuardrailLoading } = useQuery(
    FETCH_GUARDRAIL,
    {
      variables: { guardrailId: guardRailId as string },
      skip: !isEdit || !guardRailId || !authChecked, // ✅ 토큰 갱신 완료 전까지 스킵
      onCompleted: (data) => {
        if (data?.fetchGuardrail) {
          const guardrail = data.fetchGuardrail;
          // 폼 기본값 설정
          reset({
            yesterdayMood: guardrail.feeling || "",
            todayImportant: guardrail.mostImpt || "",
            happenedEvents: guardrail.diary || "",
            gratitude: guardrail.thanks || "",
            regrets: guardrail.regret || "",
            lifeDirection: guardrail.direction || "",
            yesterdayProgress: guardrail.oneStep || "",
            unknowns: guardrail.ignorance || "",
          });
        }
      },
    }
  );

  // react-hook-form 사용 (yup resolver 추가)
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    reset,
  } = useForm<FormData>({
    resolver: yupResolver(schema), // yup resolver 추가
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

  // Apollo Client 뮤테이션 훅 사용 - CREATE
  const [createGuardrailMutation, { loading: isCreating, error: createError }] =
    useMutation<CreateGuardrailData, CreateGuardrailVariables>(
      CREATE_GUARDRAIL
    );

  // Apollo Client 뮤테이션 훅 사용 - UPDATE
  const [updateGuardrailMutation, { loading: isUpdating, error: updateError }] =
    useMutation<UpdateGuardrailData, UpdateGuardrailVariables>(
      UPDATE_GUARDRAIL,
      {
        onCompleted: (data) => {
          console.log("가드레일 수정 성공:", data?.updateGuardrail);
          // 수정 성공 시 AlertModal 표시
          setShowUpdateSuccessModal(true);
        },
        onError: (error) => {
          console.error("가드레일 수정 실패:", error);
          alert("가드레일 수정 중 오류가 발생했습니다.");
        },
      }
    );

  const loading = isCreating || isUpdating;
  const error = createError || updateError;

  const onSubmit = async (data: FormData) => {
    console.log("=== onSubmit 함수 실행됨 ===");
    console.log("가드레일 저장:", data);

    try {
      if (isEdit && guardRailId) {
        // 편집 모드: UPDATE API 사용
        await updateGuardrailMutation({
          variables: {
            guardrailId: guardRailId,
            updateGuardrailInput: {
              feeling: data.yesterdayMood,
              mostImpt: data.todayImportant,
              diary: data.happenedEvents,
              thanks: data.gratitude,
              regret: data.regrets,
              direction: data.lifeDirection,
              oneStep: data.yesterdayProgress,
              ignorance: data.unknowns,
            },
          },
        });
        // onCompleted 콜백에서 모달 표시 처리
      } else {
        // 생성 모드: CREATE API 사용
        const result = await createGuardrailMutation({
          variables: {
            createGuardrailInput: {
              feeling: data.yesterdayMood,
              mostImpt: data.todayImportant,
              diary: data.happenedEvents,
              thanks: data.gratitude,
              regret: data.regrets,
              direction: data.lifeDirection,
              oneStep: data.yesterdayProgress,
              ignorance: data.unknowns,
            },
          },
        });

        console.log("가드레일 저장 성공:", result.data?.createGuardrail);

        // 생성 성공 시 기존 모달 표시
        setShowModal(true);
      }

      console.log("모달 상태 변경 후:", true);
    } catch (error) {
      console.error("가드레일 처리 실패:", error);
      // 에러는 onError 콜백에서 처리됨
    }

    console.log("=== onSubmit 함수 완료 ===");
  };

  // const handleSaveClick = () => {
  //   console.log("=== 저장 버튼 클릭됨 ===");
  //   console.log("모달 상태 변경 전:", showModal);

  //   // 폼 데이터 가져오기 (선택사항)
  //   const formData = watch();
  //   console.log("폼 데이터:", formData);

  //   // 모달 표시
  //   setShowModal(true);
  //   console.log("모달 상태 변경 후:", true);
  //   console.log("=== 저장 버튼 클릭 완료 ===");
  // };

  const handleBack = () => {
    router.push("/");
  };

  const handleCloseModal = () => {
    console.log("모달 닫기 호출");
    setShowModal(false);
  };

  const handleUpdateSuccessModalClose = () => {
    setShowUpdateSuccessModal(false);
    router.push(`/guardRailList/${guardRailId}`);
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
        {isPavlovsLoading ? (
          <div
            style={{
              textAlign: "center",
              padding: "20px",
              color: theme.accentText,
            }}
          >
            파블로프를 불러오는 중...
          </div>
        ) : randomPavlov ? (
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
                }}
              >
                {randomPavlov.response}
              </div>
            </div>
          </div>
        ) : (
          <div
            style={{
              textAlign: "center",
              padding: "20px",
              color: "#6b7280",
            }}
          >
            작성된 파블로프가 없습니다.
            <br />
            <Button
              theme={theme}
              type="button"
              onClick={() => router.push("/pavlovWriter")}
              style={{
                marginTop: "12px",
                fontSize: "12px",
                padding: "8px 16px",
              }}
            >
              파블로프 작성하기
            </Button>
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
            <AppTitle>
              {isEdit ? "데일리 가드레일 수정" : "데일리 가드레일 작성"}
            </AppTitle>
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

        {/* 오늘의 파블로프 섹션 - 편집 모드가 아닐 때만 표시 */}
        {!isEdit && <TodayPavlovSection />}

        {/* 로딩 상태 표시 (편집 모드일 때만) */}
        {isEdit && isGuardrailLoading ? (
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              height: "200px",
              fontSize: "18px",
              color: theme.accentText,
            }}
          >
            가드레일 데이터를 불러오는 중...
          </div>
        ) : (
          <form
            onSubmit={handleSubmit(onSubmit)}
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "24px",
            }}
          >
            <GridContainer>
              <Card>
                <CardHeader>
                  <CardTitle size="sm">어제의 기분 한 단어</CardTitle>
                </CardHeader>
                <CardContent>
                  <Input {...register("yesterdayMood")} />
                  {errors.yesterdayMood && (
                    <ErrorMessage>{errors.yesterdayMood.message}</ErrorMessage>
                  )}
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle size="sm">오늘 가장 중요한 한 가지</CardTitle>
                </CardHeader>
                <CardContent>
                  <Input {...register("todayImportant")} />
                  {errors.todayImportant && (
                    <ErrorMessage>{errors.todayImportant.message}</ErrorMessage>
                  )}
                </CardContent>
              </Card>
            </GridContainer>

            <Card>
              <CardHeader>
                <CardTitle size="sm">있었던 일 (일기)</CardTitle>
              </CardHeader>
              <CardContent>
                <Textarea rows={6} {...register("happenedEvents")} />
                {errors.happenedEvents && (
                  <ErrorMessage>{errors.happenedEvents.message}</ErrorMessage>
                )}
              </CardContent>
            </Card>

            <GridContainer>
              <Card>
                <CardHeader>
                  <CardTitle size="sm">감사한 것</CardTitle>
                </CardHeader>
                <CardContent>
                  <Textarea rows={6} {...register("gratitude")} />
                  {errors.gratitude && (
                    <ErrorMessage>{errors.gratitude.message}</ErrorMessage>
                  )}
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle size="sm">후회하는 일</CardTitle>
                </CardHeader>
                <CardContent>
                  <Textarea rows={6} {...register("regrets")} />
                  {errors.regrets && (
                    <ErrorMessage>{errors.regrets.message}</ErrorMessage>
                  )}
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
                  <Textarea rows={6} {...register("lifeDirection")} />
                  {errors.lifeDirection && (
                    <ErrorMessage>{errors.lifeDirection.message}</ErrorMessage>
                  )}
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle size="sm">
                    어제 나는 바람직한 방향으로 한 걸음 움직였는가?
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <Textarea rows={6} {...register("yesterdayProgress")} />
                  {errors.yesterdayProgress && (
                    <ErrorMessage>
                      {errors.yesterdayProgress.message}
                    </ErrorMessage>
                  )}
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
                <Textarea rows={4} {...register("unknowns")} />
                {errors.unknowns && (
                  <ErrorMessage>{errors.unknowns.message}</ErrorMessage>
                )}
                <div style={{ marginTop: "12px" }}>
                  <Button variant="secondary" theme={theme} type="button">
                    <SparklesIcon />
                    제안 받기
                  </Button>
                </div>
              </CardContent>
            </Card>

            <div style={{ display: "flex", justifyContent: "flex-end" }}>
              <Button theme={theme} type="submit" disabled={loading}>
                {loading
                  ? "저장 중..."
                  : isEdit
                  ? "가드레일 수정"
                  : "오늘의 가드레일 저장"}
              </Button>
            </div>
          </form>
        )}
      </ContentWrapper>

      {/* 모달 렌더링 */}
      <GuardRailSuccessModal
        isOpen={showModal}
        onClose={handleCloseModal}
        theme={theme}
      />

      {/* 수정 성공 모달 */}
      <AlertModal
        isOpen={showUpdateSuccessModal}
        onClose={handleUpdateSuccessModalClose}
        title="수정 완료"
        message="가드레일이 성공적으로 수정되었습니다."
        buttonText="확인"
        type="success"
        theme={theme}
      />
    </Container>
  );
}
