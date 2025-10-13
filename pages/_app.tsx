// _app.tsx
import { Global, css } from "@emotion/react";
import { RecoilRoot } from "recoil";
import Layout from "../src/components/commons/layout";
import "../styles/globals.css";
import Head from "next/head";
import { Router, useRouter } from "next/router";
import { useEffect, useState } from "react";

import TokenInitializer from "../src/commons/libraries/TokenInitializer";
import {
  LoadingIcon,
  LoadingOverlay,
} from "../src/commons/libraries/loadingOverlay";

import { ApolloProvider } from "@apollo/client";
import { apolloClient } from "../src/commons/apis/apollo-client";
function MyApp({ Component, pageProps }) {
  const router = useRouter();
  const isResultPage = router.pathname === "/result";
  // console.log("분기 합침 테스트");

  /* --------- Service Worker 등록 --------- */
  useEffect(() => {
    if ("serviceWorker" in navigator) {
      const onLoad = () =>
        navigator.serviceWorker.register("/sw.js").catch(console.error); // 등록 실패 시 콘솔 확인
      window.addEventListener("load", onLoad);
      return () => window.removeEventListener("load", onLoad);
    }
  }, []);

  /* ---------------------------------------- */

  useEffect(() => {
    function setRealVh() {
      const h = window.visualViewport
        ? window.visualViewport.height
        : window.innerHeight;
      document.documentElement.style.setProperty("--vh", `${h * 0.01}px`);
    }

    setRealVh(); // 초기 1회

    const vv = window.visualViewport;
    if (vv) {
      vv.addEventListener("resize", setRealVh);
      vv.addEventListener("scroll", setRealVh);
      return () => {
        vv.removeEventListener("resize", setRealVh);
        vv.removeEventListener("scroll", setRealVh);
      };
    } else {
      window.addEventListener("resize", setRealVh);
      return () => window.removeEventListener("resize", setRealVh);
    }
  }, []);
  const pretendardStyles = css`
    /* Thin (100) */
    @font-face {
      font-family: "Pretendard";
      src: url("/fonts/Pretendard-Thin.otf") format("opentype");
      font-weight: 100;
      font-style: normal;
      font-display: swap;
    }

    /* ExtraLight (200) */
    @font-face {
      font-family: "Pretendard";
      src: url("/fonts/Pretendard-ExtraLight.otf") format("opentype");
      font-weight: 200;
      font-style: normal;
      font-display: swap;
    }

    /* Light (300) */
    @font-face {
      font-family: "Pretendard";
      src: url("/fonts/Pretendard-Light.otf") format("opentype");
      font-weight: 300;
      font-style: normal;
      font-display: swap;
    }

    /* Regular (400) */
    @font-face {
      font-family: "Pretendard";
      src: url("/fonts/Pretendard-Regular.otf") format("opentype");
      font-weight: 400;
      font-style: normal;
      font-display: swap;
    }

    /* Medium (500) */
    @font-face {
      font-family: "Pretendard";
      src: url("/fonts/Pretendard-Medium.otf") format("opentype");
      font-weight: 500;
      font-style: normal;
      font-display: swap;
    }

    /* SemiBold (600) */
    @font-face {
      font-family: "Pretendard";
      src: url("/fonts/Pretendard-SemiBold.otf") format("opentype");
      font-weight: 600;
      font-style: normal;
      font-display: swap;
    }

    /* Bold (700) */
    @font-face {
      font-family: "Pretendard";
      src: url("/fonts/Pretendard-Bold.otf") format("opentype");
      font-weight: 700;
      font-style: normal;
      font-display: swap;
    }

    /* ExtraBold (800) */
    @font-face {
      font-family: "Pretendard";
      src: url("/fonts/Pretendard-ExtraBold.otf") format("opentype");
      font-weight: 800;
      font-style: normal;
      font-display: swap;
    }

    /* Black (900) */
    @font-face {
      font-family: "Pretendard";
      src: url("/fonts/Pretendard-Black.otf") format("opentype");
      font-weight: 900;
      font-style: normal;
      font-display: swap;
    }

    /* 전역 기본 폰트 지정 */
    html,
    body,
    #__next {
      font-family: "Pretendard", sans-serif;
    }

    /* 모바일 화면 유지 스타일 */
    body {
      max-width: 480px;
      margin: 0 auto;
      background: #f5f5f4;
      position: relative;
      min-height: 100vh;
    }

    /* 데스크톱에서 모바일 화면 중앙 정렬 */
    @media (min-width: 481px) {
      body {
        box-shadow: 0 0 20px rgba(0, 0, 0, 0.1);
      }
    }

    /* 하단 네비게이션을 위한 컨테이너 스타일 */
    #__next {
      max-width: 480px;
      margin: 0 auto;
      position: relative;
      min-height: 100vh;
    }

    /* 하단 네비게이션이 항상 보이도록 */
    nav[class*="BottomNav"] {
      max-width: 480px !important;
      left: 50% !important;
      transform: translateX(-50%) !important;
    }

    /* 스크롤바 스타일링 */
    ::-webkit-scrollbar {
      width: 6px;
    }

    ::-webkit-scrollbar-track {
      background: #f1f1f1;
    }

    ::-webkit-scrollbar-thumb {
      background: #c1c1c1;
      border-radius: 3px;
    }

    ::-webkit-scrollbar-thumb:hover {
      background: #a8a8a8;
    }
  `;

  const [loadingRoute, setLoadingRoute] = useState(false);

  useEffect(() => {
    const handleStart = () => setLoadingRoute(true);
    const handleComplete = () => setLoadingRoute(false);
    Router.events.on("routeChangeStart", handleStart);
    Router.events.on("routeChangeComplete", handleComplete);
    Router.events.on("routeChangeError", handleComplete);
    return () => {
      Router.events.off("routeChangeStart", handleStart);
      Router.events.off("routeChangeComplete", handleComplete);
      Router.events.off("routeChangeError", handleComplete);
    };
  }, []);

  return (
    <>
      <Head>
        <title>GDR</title>
        <meta name="description" content="가드레일 다이어리" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/images/GDR.png" />
        <link rel="manifest" href="/manifest.json" />
        <meta name="theme-color" content="#000000" />
        {/* Open Graph 태그 - 전역 설정 */}
        {/* <meta property="og:title" content="SNU baseball" />
        <meta
          property="og:description"
          content="서울대학교 야구 동아리 통합 플랫폼입니다. 실시간 경기 중계, 일정, 선수 정보, 랭킹을 확인하세요."
        />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://snubaseball.site/" />
        <meta
          property="og:image"
          content="https://snubaseball.site/images/og-logo.png"
        />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" /> */}
      </Head>
      <Global styles={pretendardStyles} />
      <RecoilRoot>
        <ApolloProvider client={apolloClient}>
          <TokenInitializer />
          <LoadingOverlay visible={loadingRoute}>
            <LoadingIcon spin fontSize={48} />
          </LoadingOverlay>

          <Layout>
            {/* 페이지 컴포넌트에도 필요하다면 mobileOnly 전달 */}
            <Component {...pageProps} />
          </Layout>
        </ApolloProvider>
      </RecoilRoot>
    </>
  );
}

export default MyApp;
