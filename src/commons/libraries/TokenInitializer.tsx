import { useEffect, useRef } from "react";
import { useRouter } from "next/router";
import { useSetRecoilState } from "recoil";
import { accessTokenState, authCheckedState } from "../stores";
import { useMutation } from "@apollo/client";
import {
  registerAccessTokenSetter,
  setAccessToken,
  clearAccessToken,
} from "../libraries/token";
import { RESTORE_ACCESS_TOKEN } from "../apis/graphql-queries";

// ✅ 인증이 필요 없는 페이지 목록
const PUBLIC_PATHS = ["/login", "/signUp", "/find-password"];

export default function TokenInitializer() {
  const setToken = useSetRecoilState(accessTokenState);
  const setChecked = useSetRecoilState(authCheckedState);
  const router = useRouter();

  // ✅ 초기화 완료 여부를 추적
  const isInitialized = useRef(false);

  // GraphQL mutation hook
  const [restoreAccessToken] = useMutation(RESTORE_ACCESS_TOKEN, {
    context: {
      headers: {
        authorization: "",
      },
    },
  });

  // ① RecoilRoot 안에서만 registerAccessTokenSetter를 호출
  useEffect(() => {
    registerAccessTokenSetter(setToken);
    return () => {
      clearAccessToken();
    };
  }, [setToken]);

  // ② 앱 시작 시 한 번만 토큰 갱신 (페이지 이동 시 재실행 안 됨)
  useEffect(() => {
    if (typeof window === "undefined") return;

    // ✅ 이미 초기화되었으면 실행 안 함
    if (isInitialized.current) {
      return;
    }

    // ✅ 공개 페이지면 토큰 갱신 스킵
    const isPublicPath = PUBLIC_PATHS.some((path) =>
      router.pathname.startsWith(path)
    );

    if (isPublicPath) {
      console.log("🔓 공개 페이지: 토큰 갱신 스킵");
      setChecked(true);
      isInitialized.current = true; // ✅ 초기화 완료 표시
      return;
    }

    console.log("🔄 TokenInitializer: 토큰 갱신 시도...");

    // ✅ 초기화 시작 표시
    isInitialized.current = true;

    restoreAccessToken()
      .then((res) => {
        console.log("✅ 리프레시 응답:", res);

        const newToken = res.data?.restoreAccessToken;
        console.log("newToken", newToken);

        if (newToken) {
          // ✅ 토큰 갱신 성공
          setAccessToken(newToken);
          console.log("✅ 리프레시 성공 (GraphQL)");
          console.log("📝 새 액세스 토큰:", newToken.substring(0, 20) + "...");
        } else {
          // ❌ 토큰이 없음 → 로그인 필요
          console.warn(
            "⚠️ 리프레시 응답에 토큰이 없습니다 → 로그인 페이지 이동"
          );
          clearAccessToken();

          if (!PUBLIC_PATHS.some((path) => router.pathname.startsWith(path))) {
            router.push("/login");
          }
        }
      })
      .catch((error) => {
        console.error("❌ 리프레시 실패:", error);

        // 인증 에러 확인
        const isAuthError =
          error.graphQLErrors?.some(
            (e: any) =>
              e.extensions?.code === "UNAUTHENTICATED" ||
              e.extensions?.code === "FORBIDDEN" ||
              e.extensions?.statusCode === 401 ||
              e.extensions?.statusCode === 403
          ) ||
          error.message.includes("Unauthorized") ||
          error.message.includes("Invalid token") ||
          error.message.includes("Token expired") ||
          error.message.includes("No refresh token");

        const isNetworkError = error.networkError !== null;

        const isServerError = error.graphQLErrors?.some(
          (e: any) =>
            e.extensions?.statusCode >= 500 ||
            e.extensions?.code === "INTERNAL_SERVER_ERROR"
        );

        if (isAuthError) {
          console.log("🔐 인증 실패 → 로그인 페이지 이동");
          clearAccessToken();

          if (!PUBLIC_PATHS.some((path) => router.pathname.startsWith(path))) {
            const returnUrl = encodeURIComponent(router.asPath);
            router.push(`/login?returnUrl=${returnUrl}`);
          }
        } else if (isNetworkError) {
          console.warn("🌐 네트워크 오류 → 토큰 유지, 오프라인 모드");
        } else if (isServerError) {
          console.warn("🔧 서버 오류 → 토큰 유지, 나중에 재시도");
        } else {
          console.error("❓ 알 수 없는 오류 → 로그인 페이지 이동");
          clearAccessToken();

          if (!PUBLIC_PATHS.some((path) => router.pathname.startsWith(path))) {
            router.push("/login");
          }
        }
      })
      .finally(() => {
        console.log("✔️ TokenInitializer: 인증 체크 완료");
        setChecked(true);
      });
  }, []); // ✅ 빈 배열 - 마운트 시 한 번만 실행!

  return null;
}
