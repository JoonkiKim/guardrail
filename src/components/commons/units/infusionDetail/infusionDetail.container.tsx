import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { useQuery, useMutation } from "@apollo/client";
import {
  FETCH_INFUSION,
  UPDATE_INFUSION,
  DELETE_INFUSION,
} from "../../../../commons/apis/graphql-queries";
import CheckModal from "../../../commons/modals/checkModal";
import AlertModal from "../../../commons/modals/alertModal";
import {
  Container,
  TopAppBar,
  AppBarContent,
  AppInfo,
  AppTitle,
  AppSubtitle,
  BackButton,
  ActionButtons,
  ActionButton,
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
  ButtonGroup,
  Button,
  COLORWAYS,
} from "./infusionDetail.style";

interface InfusionDetailContainerProps {
  theme?: keyof typeof COLORWAYS;
}

// PeriodType enum (GraphQL 스키마와 일치)
enum PeriodType {
  ONE_WEEK = "ONE_WEEK",
  ONE_MONTH = "ONE_MONTH",
  ONE_YEAR = "ONE_YEAR",
  TEN_YEARS = "TEN_YEARS",
}

export default function InfusionDetailContainer({
  theme = "forest",
}: InfusionDetailContainerProps) {
  const router = useRouter();
  const { infusionId } = router.query;
  const [thoughts, setThoughts] = useState<Record<string, string>>({
    ONE_WEEK: "",
    ONE_MONTH: "",
    ONE_YEAR: "",
    TEN_YEARS: "",
  });
  const [isSaving, setIsSaving] = useState(false);
  const [designOption, setDesignOption] = useState<
    "accordion" | "tabs" | "scroll"
  >("accordion");
  const [expandedThoughts, setExpandedThoughts] = useState<
    Record<string, boolean>
  >({
    ONE_WEEK: false,
    ONE_MONTH: false,
    ONE_YEAR: false,
    TEN_YEARS: false,
  });
  const [showSuccess, setShowSuccess] = useState(false);
  const [showError, setShowError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showDeleteSuccessModal, setShowDeleteSuccessModal] = useState(false);
  const [showDeleteErrorModal, setShowDeleteErrorModal] = useState(false);
  const [deleteErrorMessage, setDeleteErrorMessage] = useState("");
  const [showUpdateSuccessModal, setShowUpdateSuccessModal] = useState(false);

  const currentTheme = COLORWAYS[theme];

  // GraphQL 쿼리로 담금주 데이터 조회
  const { data, loading, error, refetch } = useQuery(FETCH_INFUSION, {
    variables: { infusionId: infusionId as string },
    skip: !infusionId,
  });

  // GraphQL mutation - UPDATE
  const [updateInfusion, { loading: isUpdating }] = useMutation(
    UPDATE_INFUSION,
    {
      onCompleted: (data) => {
        console.log("담금주 업데이트 완료:", data);
        setIsSaving(false);
        setShowUpdateSuccessModal(true);
      },
      onError: (error) => {
        console.error("담금주 업데이트 실패:", error);
        setIsSaving(false);
        setErrorMessage("저장 중 오류가 발생했습니다: " + error.message);
        setShowError(true);
        setTimeout(() => setShowError(false), 3000);
      },
    }
  );

  // GraphQL mutation - DELETE
  const [deleteInfusion, { loading: isDeleting }] = useMutation(
    DELETE_INFUSION,
    {
      onCompleted: () => {
        console.log("담금주 삭제 완료");
        setShowDeleteModal(false);
        setShowDeleteSuccessModal(true);
      },
      onError: (error) => {
        console.error("담금주 삭제 실패:", error);
        setShowDeleteModal(false);
        setDeleteErrorMessage(error.message);
        setShowDeleteErrorModal(true);
      },
      // 목록 쿼리만 무효화 (현재 상세 페이지는 건드리지 않음)
      update(cache, { data }) {
        if (data?.deleteInfusion) {
          // fetchInfusions 목록 쿼리만 무효화
          cache.evict({ fieldName: "fetchInfusions" });
          cache.gc();
        }
      },
    }
  );

  // API 데이터를 기반으로 thoughts 초기화
  useEffect(() => {
    if (data?.fetchInfusion?.infusionDetails) {
      const newThoughts: Record<string, string> = {
        ONE_WEEK: "",
        ONE_MONTH: "",
        ONE_YEAR: "",
        TEN_YEARS: "",
      };

      // periodType에 따른 defaultValue 설정
      data.fetchInfusion.infusionDetails.forEach((detail: any) => {
        if (detail.periodType && detail.description) {
          newThoughts[detail.periodType] = detail.description;
        }
      });

      setThoughts(newThoughts);
    }
  }, [data]);

  // 시간별 생각 데이터
  const thoughtPeriods = [
    {
      key: PeriodType.ONE_WEEK,
      label: "1주 뒤",
      icon: "🗓️",
      iconBg: "#fef3c7",
      iconColor: "#92400e",
    },
    {
      key: PeriodType.ONE_MONTH,
      label: "1달 뒤",
      icon: "🗓️",
      iconBg: "#fce7f3",
      iconColor: "#be185d",
    },
    {
      key: PeriodType.ONE_YEAR,
      label: "1년 뒤",
      icon: "🗓️",
      iconBg: "#e0e7ff",
      iconColor: "#3730a3",
    },
    {
      key: PeriodType.TEN_YEARS,
      label: "10년 뒤",
      icon: "⏰",
      iconBg: "#dcfce7",
      iconColor: "#166534",
    },
  ];

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

  // 날짜 포맷팅 함수
  const formatDate = (dateString: string) => {
    let date: Date;

    if (dateString.includes("T")) {
      date = new Date(dateString);
    } else if (dateString.includes("-")) {
      date = new Date(dateString + "T00:00:00");
    } else {
      date = new Date(dateString);
    }

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

  // 삭제 버튼 클릭 핸들러
  const handleDeleteClick = () => {
    setShowDeleteModal(true);
  };

  // 삭제 확인 핸들러
  const handleDeleteConfirm = async () => {
    try {
      await deleteInfusion({
        variables: { infusionId: infusionId as string },
      });
    } catch (error) {
      console.error("Delete error:", error);
    }
  };

  // 삭제 취소 핸들러
  const handleDeleteCancel = () => {
    setShowDeleteModal(false);
  };

  // 삭제 성공 모달 닫기 핸들러
  const handleDeleteSuccessModalClose = () => {
    setShowDeleteSuccessModal(false);
    router.push("/infusion");
  };

  // 삭제 에러 모달 닫기 핸들러
  const handleDeleteErrorModalClose = () => {
    setShowDeleteErrorModal(false);
    setDeleteErrorMessage("");
  };

  // 업데이트 성공 모달 닫기 핸들러
  const handleUpdateSuccessModalClose = () => {
    setShowUpdateSuccessModal(false);
    router.push("/infusion");
  };

  // 저장 핸들러
  const handleSave = async () => {
    setIsSaving(true);
    setShowError(false);

    try {
      const infusion = data?.fetchInfusion;

      if (!infusion) {
        setErrorMessage("담금주 데이터를 찾을 수 없습니다.");
        setShowError(true);
        setIsSaving(false);
        return;
      }

      // infusionDetails 배열 생성 (빈 값은 제외)
      const infusionDetails = Object.entries(thoughts)
        .filter(([_, description]) => description.trim() !== "")
        .map(([periodType, description]) => ({
          description: description.trim(),
          periodType: periodType as PeriodType,
        }));

      // 최소 하나의 생각이 입력되었는지 확인
      if (infusionDetails.length === 0) {
        setErrorMessage("최소 하나의 시간대에 생각을 입력해주세요.");
        setShowError(true);
        setIsSaving(false);
        return;
      }

      // GraphQL 스키마에 맞게 데이터 변환
      const updateInfusionInput = {
        title: infusion.title,
        category: infusion.category,
        description: infusion.description,
        infusionDetails: infusionDetails,
      };

      console.log("담금주 업데이트 요청:", {
        infusionId,
        updateInfusionInput,
      });

      // GraphQL mutation 실행
      await updateInfusion({
        variables: {
          infusionId: infusionId as string,
          updateInfusionInput: updateInfusionInput,
        },
      });
    } catch (error) {
      console.error("담금주 저장 중 오류:", error);
      setIsSaving(false);
    }
  };

  // 디자인 옵션 1: 아코디언 스타일
  const renderAccordionDesign = () => (
    <ThoughtsSection>
      {thoughtPeriods.map((period) => (
        <ThoughtItem key={period.key} isExpanded={expandedThoughts[period.key]}>
          <ThoughtHeader onClick={() => handleAccordionToggle(period.key)}>
            <ThoughtTitle>
              <ThoughtLabel>{period.label}</ThoughtLabel>
            </ThoughtTitle>
            <ThoughtArrow isExpanded={expandedThoughts[period.key]}>
              ▼
            </ThoughtArrow>
          </ThoughtHeader>
          <ThoughtContent isExpanded={expandedThoughts[period.key]}>
            <ThoughtTextarea
              placeholder={`어떻게 생각하고 있나요?`}
              value={thoughts[period.key]}
              onChange={(e) => handleThoughtChange(period.key, e.target.value)}
            />
          </ThoughtContent>
        </ThoughtItem>
      ))}
    </ThoughtsSection>
  );

  // 로딩 상태
  if (loading) {
    return (
      <Container gradient={currentTheme.gradient}>
        <TopAppBar>
          <AppBarContent>
            <BackButton onClick={handleBack}>←</BackButton>
            <AppInfo>
              <AppTitle>담금주 상세</AppTitle>
              <AppSubtitle>로딩 중...</AppSubtitle>
            </AppInfo>
            <div style={{ width: "40px" }}></div>
          </AppBarContent>
        </TopAppBar>
        <ContentWrapper>
          <Card>
            <CardContent>
              <div style={{ textAlign: "center", padding: "40px" }}>
                담금주 정보를 불러오는 중...
              </div>
            </CardContent>
          </Card>
        </ContentWrapper>
      </Container>
    );
  }

  // 에러 상태
  if (error) {
    return (
      <Container gradient={currentTheme.gradient}>
        <TopAppBar>
          <AppBarContent>
            <BackButton onClick={handleBack}>←</BackButton>
            <AppInfo>
              <AppTitle>담금주 상세</AppTitle>
              <AppSubtitle>오류가 발생했습니다</AppSubtitle>
            </AppInfo>
            <div style={{ width: "40px" }}></div>
          </AppBarContent>
        </TopAppBar>
        <ContentWrapper>
          <Card>
            <CardContent>
              <div style={{ textAlign: "center", padding: "40px" }}>
                <p>담금주 정보를 불러올 수 없습니다.</p>
                <p>{error.message}</p>
              </div>
            </CardContent>
          </Card>
        </ContentWrapper>
      </Container>
    );
  }

  const infusion = data?.fetchInfusion;

  if (!infusion) {
    return (
      <Container gradient={currentTheme.gradient}>
        <TopAppBar>
          <AppBarContent>
            <BackButton onClick={handleBack}>←</BackButton>
            <AppInfo>
              <AppTitle>담금주 상세</AppTitle>
              <AppSubtitle>담금주를 찾을 수 없습니다</AppSubtitle>
            </AppInfo>
            <div style={{ width: "40px" }}></div>
          </AppBarContent>
        </TopAppBar>
        <ContentWrapper>
          <Card>
            <CardContent>
              <div style={{ textAlign: "center", padding: "40px" }}>
                해당 담금주를 찾을 수 없습니다.
              </div>
            </CardContent>
          </Card>
        </ContentWrapper>
      </Container>
    );
  }

  return (
    <Container gradient={currentTheme.gradient}>
      {/* 삭제 확인 모달 */}
      <CheckModal
        isOpen={showDeleteModal}
        onClose={handleDeleteCancel}
        onConfirm={handleDeleteConfirm}
        title="담금주 삭제"
        message={`정말로 이 담금주를 삭제하시겠습니까?`}
        confirmText="🗑️ 삭제"
        cancelText="취소"
        isLoading={isDeleting}
        type="danger"
        theme={currentTheme}
      />

      {/* 삭제 성공 모달 */}
      <AlertModal
        isOpen={showDeleteSuccessModal}
        onClose={handleDeleteSuccessModalClose}
        title="삭제 완료"
        message="담금주가 성공적으로 삭제되었습니다."
        buttonText="확인"
        type="success"
        theme={currentTheme}
      />

      {/* 삭제 에러 모달 */}
      <AlertModal
        isOpen={showDeleteErrorModal}
        onClose={handleDeleteErrorModalClose}
        title="삭제 실패"
        message={`삭제 중 오류가 발생했습니다.\n${deleteErrorMessage}`}
        buttonText="확인"
        type="error"
        theme={currentTheme}
      />

      {/* 업데이트 성공 모달 */}
      <AlertModal
        isOpen={showUpdateSuccessModal}
        onClose={handleUpdateSuccessModalClose}
        title="저장 완료"
        message="담금주가 성공적으로 저장되었습니다."
        buttonText="확인"
        type="success"
        theme={currentTheme}
      />

      {/* Top App Bar */}
      <TopAppBar>
        <AppBarContent>
          <BackButton onClick={handleBack}>←</BackButton>
          <AppInfo>
            <AppTitle>담금주 상세</AppTitle>
            <AppSubtitle>시간이 지나며 변하는 생각을 기록해보세요</AppSubtitle>
          </AppInfo>
          {/* 삭제 버튼 추가 (todoDetail과 동일한 스타일) */}
          <ActionButtons>
            <ActionButton
              onClick={handleDeleteClick}
              title="삭제"
              disabled={isDeleting}
            >
              {isDeleting ? "⏳" : "🗑️"}
            </ActionButton>
          </ActionButtons>
        </AppBarContent>
      </TopAppBar>

      {/* Content */}
      <ContentWrapper>
        {/* 에러 메시지만 유지 (성공 메시지는 모달로 대체) */}
        {showError && (
          <div
            style={{
              padding: "16px",
              marginBottom: "16px",
              backgroundColor: "#fee2e2",
              color: "#991b1b",
              borderRadius: "8px",
              textAlign: "center",
              fontWeight: "500",
            }}
          >
            {errorMessage}
          </div>
        )}

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
                disabled={isSaving || isDeleting}
              >
                취소
              </Button>
              <Button
                theme={currentTheme}
                onClick={handleSave}
                disabled={isSaving || isDeleting}
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
