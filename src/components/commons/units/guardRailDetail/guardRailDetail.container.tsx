import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { useQuery, useMutation } from "@apollo/client";
import { useRecoilValue } from "recoil";
import { authCheckedState } from "../../../../commons/stores";
import {
  FETCH_GUARDRAIL,
  DELETE_GUARDRAIL,
  FETCH_GUARDRAILS,
} from "../../../../commons/apis/graphql-queries";
import CheckModal from "../../../commons/modals/checkModal";
import AlertModal from "../../../commons/modals/alertModal";
import {
  Container,
  TopAppBar,
  AppBarContent,
  BackButton,
  AppInfo,
  AppTitle,
  AppSubtitle,
  ActionButtons,
  ActionButton,
  ContentWrapper,
  DetailContainer,
  HeaderSection,
  HeaderContent,
  HeaderIcon,
  HeaderInfo,
  HeaderTitle,
  HeaderSubtitle,
  HeaderMeta,
  MetaBadge,
  Section,
  SectionHeader,
  SectionIcon,
  SectionTitle,
  SectionContent,
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  ContentText,
  GridContainer,
  FullWidthContainer,
  PavlovCard,
  PavlovStimulus,
  PavlovResponse,
  LoadingSpinner,
  ErrorMessage,
  EmptyState,
  EmptyIcon,
  EmptyTitle,
  EmptyDescription,
  ActionSection,
  Button,
} from "./guardRailDetail.style";

// ─── Colorway System (matching mainPage) ─────────────────────────────
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

// GuardRail 타입 정의 (GraphQL 스키마와 일치)
interface GuardRail {
  id: string;
  feeling: string;
  mostImpt: string;
  diary: string;
  thanks: string;
  direction: string;
  oneStep: string;
  ignorance: string;
  createdAt: string;
  updatedAt: string;
}

// ─── Main Component ─────────────────────────────
export default function GuardRailDetailContainer() {
  const router = useRouter();
  const { guardRailId } = router.query;
  const [colorway, setColorway] = useState<keyof typeof COLORWAYS>("forest");
  const theme = COLORWAYS[colorway];
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showDeleteSuccessModal, setShowDeleteSuccessModal] = useState(false);
  const [showDeleteErrorModal, setShowDeleteErrorModal] = useState(false);
  const [deleteErrorMessage, setDeleteErrorMessage] = useState("");
  const authChecked = useRecoilValue(authCheckedState);

  // GraphQL 쿼리로 가드레일 상세 조회
  const { data, loading, error } = useQuery(FETCH_GUARDRAIL, {
    variables: { guardrailId: guardRailId as string },
    skip: !guardRailId || !authChecked, // ✅ 토큰 갱신 완료 전까지 스킵
  });

  // 가드레일 삭제 mutation
  const [deleteGuardrail, { loading: isDeleting }] = useMutation(
    DELETE_GUARDRAIL,
    {
      onCompleted: () => {
        console.log("가드레일 삭제 완료");
        setShowDeleteModal(false);
        setShowDeleteSuccessModal(true);
      },
      onError: (error) => {
        console.error("가드레일 삭제 실패:", error);
        setShowDeleteModal(false);
        setDeleteErrorMessage(error.message);
        setShowDeleteErrorModal(true);
      },
      // 목록 쿼리만 무효화 (현재 상세 페이지는 건드리지 않음)
      update(cache, { data }) {
        if (data?.deleteGuardrail) {
          // fetchGuardrails 목록 쿼리만 무효화
          cache.evict({ fieldName: "fetchGuardrails" });
          cache.gc();
        }
      },
    }
  );

  // ─── Navigation Handlers ─────────────────────────────
  const handleBack = () => {
    router.back();
  };

  const handleEdit = () => {
    router.push(`/guardRailList/${guardRailId}/edit`);
  };

  const handleDeleteClick = () => {
    setShowDeleteModal(true);
  };

  const handleDeleteConfirm = async () => {
    try {
      await deleteGuardrail({
        variables: { guardrailId: guardRailId as string },
      });
    } catch (error) {
      console.error("Delete error:", error);
    }
  };

  const handleDeleteCancel = () => {
    setShowDeleteModal(false);
  };

  const handleDeleteSuccessModalClose = () => {
    setShowDeleteSuccessModal(false);
    router.push("/guardRailList");
  };

  const handleDeleteErrorModalClose = () => {
    setShowDeleteErrorModal(false);
    setDeleteErrorMessage("");
  };

  // ─── Format Date ─────────────────────────────
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("ko-KR", {
      year: "numeric",
      month: "long",
      day: "numeric",
      weekday: "long",
    });
  };

  // ─── Loading State ─────────────────────────────
  if (loading || !authChecked) { // ✅ 토큰 갱신 중일 때도 로딩 상태
    return (
      <Container gradient={theme.gradient}>
        <TopAppBar>
          <AppBarContent>
            <BackButton onClick={handleBack}>←</BackButton>
            <AppInfo>
              <AppTitle>가드레일 상세</AppTitle>
              <AppSubtitle>로딩 중...</AppSubtitle>
            </AppInfo>
            <ActionButtons />
          </AppBarContent>
        </TopAppBar>

        <ContentWrapper>
          <EmptyState>
            <EmptyIcon>⏳</EmptyIcon>
            <EmptyTitle>가드레일을 불러오는 중...</EmptyTitle>
            <EmptyDescription>잠시만 기다려주세요.</EmptyDescription>
          </EmptyState>
        </ContentWrapper>
      </Container>
    );
  }

  // ─── Error State ─────────────────────────────
  if (error) {
    return (
      <Container gradient={theme.gradient}>
        <TopAppBar>
          <AppBarContent>
            <BackButton onClick={handleBack}>←</BackButton>
            <AppInfo>
              <AppTitle>가드레일 상세</AppTitle>
              <AppSubtitle>오류 발생</AppSubtitle>
            </AppInfo>
            <ActionButtons />
          </AppBarContent>
        </TopAppBar>

        <ContentWrapper>
          <EmptyState>
            <EmptyIcon>❌</EmptyIcon>
            <EmptyTitle>가드레일을 불러올 수 없습니다</EmptyTitle>
            <EmptyDescription>{error.message}</EmptyDescription>
          </EmptyState>
        </ContentWrapper>
      </Container>
    );
  }

  const guardRail = data?.fetchGuardrail;

  // ─── Empty State ─────────────────────────────
  if (!guardRail) {
    return (
      <Container gradient={theme.gradient}>
        <TopAppBar>
          <AppBarContent>
            <BackButton onClick={handleBack}>←</BackButton>
            <AppInfo>
              <AppTitle>가드레일 상세</AppTitle>
              <AppSubtitle>찾을 수 없음</AppSubtitle>
            </AppInfo>
            <ActionButtons />
          </AppBarContent>
        </TopAppBar>

        <ContentWrapper>
          <EmptyState>
            <EmptyIcon>🛡️</EmptyIcon>
            <EmptyTitle>가드레일을 찾을 수 없습니다</EmptyTitle>
            <EmptyDescription>
              요청하신 가드레일이 존재하지 않거나 삭제되었을 수 있습니다.
            </EmptyDescription>
          </EmptyState>
        </ContentWrapper>
      </Container>
    );
  }

  // ─── Main Content ─────────────────────────────
  return (
    <Container gradient={theme.gradient}>
      {/* 삭제 확인 모달 */}
      <CheckModal
        isOpen={showDeleteModal}
        onClose={handleDeleteCancel}
        onConfirm={handleDeleteConfirm}
        title="가드레일 삭제"
        message={`정말로 이 가드레일을 삭제하시겠습니까?`}
        confirmText="🗑️ 삭제"
        cancelText="취소"
        isLoading={isDeleting}
        type="danger"
        theme={theme}
      />

      {/* 삭제 성공 모달 */}
      <AlertModal
        isOpen={showDeleteSuccessModal}
        onClose={handleDeleteSuccessModalClose}
        title="삭제 완료"
        message="가드레일이 성공적으로 삭제되었습니다."
        buttonText="확인"
        type="success"
        theme={theme}
      />

      {/* 삭제 에러 모달 */}
      <AlertModal
        isOpen={showDeleteErrorModal}
        onClose={handleDeleteErrorModalClose}
        title="삭제 실패"
        message={`삭제 중 오류가 발생했습니다.\n${deleteErrorMessage}`}
        buttonText="확인"
        type="error"
        theme={theme}
      />

      <TopAppBar>
        <AppBarContent>
          <BackButton onClick={handleBack}>←</BackButton>
          <AppInfo>
            <AppTitle>가드레일 상세</AppTitle>
            <AppSubtitle>{formatDate(guardRail.createdAt)}</AppSubtitle>
          </AppInfo>
          <ActionButtons>
            <ActionButton theme={theme} onClick={handleEdit}>
              ✏️
            </ActionButton>
            <ActionButton
              theme={theme}
              onClick={handleDeleteClick}
              disabled={isDeleting}
              style={{
                opacity: isDeleting ? 0.6 : 1,
                cursor: isDeleting ? "not-allowed" : "pointer",
              }}
            >
              {isDeleting ? "⏳" : "🗑️"}
            </ActionButton>
          </ActionButtons>
        </AppBarContent>
      </TopAppBar>

      <ContentWrapper>
        <DetailContainer>
          {/* Yesterday Reflection Section */}
          <Section>
            <SectionContent>
              <GridContainer>
                <FullWidthContainer>
                  <Card>
                    <CardHeader>
                      <CardTitle>어제의 기분은 어땠나?</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <ContentText>
                        {guardRail.feeling || "기록이 없습니다."}
                      </ContentText>
                    </CardContent>
                  </Card>
                </FullWidthContainer>

                <FullWidthContainer>
                  <Card>
                    <CardHeader>
                      <CardTitle>어제 가장 중요한 것은 무엇이었나?</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <ContentText>
                        {guardRail.mostImpt || "기록이 없습니다."}
                      </ContentText>
                    </CardContent>
                  </Card>
                </FullWidthContainer>

                <FullWidthContainer>
                  <Card>
                    <CardHeader>
                      <CardTitle>어제 일어난 주요 사건들은?</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <ContentText>
                        {guardRail.diary || "기록이 없습니다."}
                      </ContentText>
                    </CardContent>
                  </Card>
                </FullWidthContainer>

                <FullWidthContainer>
                  <Card>
                    <CardHeader>
                      <CardTitle>감사했던 것들</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <ContentText>
                        {guardRail.thanks || "기록이 없습니다."}
                      </ContentText>
                    </CardContent>
                  </Card>
                </FullWidthContainer>

                <FullWidthContainer>
                  <Card>
                    <CardHeader>
                      <CardTitle>아쉬웠던 것들</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <ContentText>
                        {guardRail.oneStep || "기록이 없습니다."}
                      </ContentText>
                    </CardContent>
                  </Card>
                </FullWidthContainer>

                <FullWidthContainer>
                  <Card>
                    <CardHeader>
                      <CardTitle>내 삶은 어디를 향하는가?</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <ContentText>
                        {guardRail.direction || "기록이 없습니다."}
                      </ContentText>
                    </CardContent>
                  </Card>
                </FullWidthContainer>

                <FullWidthContainer>
                  <Card>
                    <CardHeader>
                      <CardTitle>어제 바람직한 방향으로 움직였나?</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <ContentText>
                        {guardRail.oneStep || "기록이 없습니다."}
                      </ContentText>
                    </CardContent>
                  </Card>
                </FullWidthContainer>

                <FullWidthContainer>
                  <Card>
                    <CardHeader>
                      <CardTitle>모르는 것들</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <ContentText>
                        {guardRail.ignorance || "기록이 없습니다."}
                      </ContentText>
                    </CardContent>
                  </Card>
                </FullWidthContainer>
              </GridContainer>
            </SectionContent>
          </Section>

          {/* Action Buttons */}
          <ActionSection>
            <Button
              variant="primary"
              theme={theme}
              onClick={() => router.push("/guardRailList")}
              disabled={isDeleting}
            >
              📋 목록으로
            </Button>
          </ActionSection>
        </DetailContainer>
      </ContentWrapper>
    </Container>
  );
}
