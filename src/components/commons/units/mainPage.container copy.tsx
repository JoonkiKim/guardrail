// import React, { useMemo, useState } from "react";
// import {
//   Container,
//   TopAppBar,
//   AppBarContent,
//   AppIcon,
//   AppInfo,
//   AppTitle,
//   AppSubtitle,
//   ColorwaySelect,
//   DateDisplay,
//   ContentWrapper,
//   StreakRow,
//   StreakCard,
//   StreakLabel,
//   StreakValue,
//   StreakNumber,
//   StreakUnit,
//   ProgressBar,
//   ProgressFill,
//   MainLayout,
//   Sidebar,
//   MainContent,
//   Card,
//   CardHeader,
//   CardTitle,
//   CardContent,
//   NavItem,
//   NavIcon,
//   NavLabel,
//   NavArrow,
//   SectionTitle,
//   SectionIcon,
//   SectionText,
//   SectionHeading,
//   SectionSubtitle,
//   Input,
//   Textarea,
//   Button,
//   Badge,
//   Separator,
//   Switch,
//   BottomNav,
//   BottomNavContent,
//   BottomNavItem,
//   BottomNavIcon,
//   BottomNavLabel,
//   Fab,
// } from "./mainPage.style";

// // Colorway presets
// const COLORWAYS: Record<
//   string,
//   {
//     name: string;
//     gradient: string;
//     accentBg: string;
//     accentText: string;
//     button: string;
//     buttonHover: string;
//     ring: string;
//     chip: string;
//     emphCard: string;
//   }
// > = {
//   forest: {
//     name: "Forest",
//     gradient: "#dcfce7, #fef3c7, #f5f5f4",
//     accentBg: "#dcfce7",
//     accentText: "#166534",
//     button: "#16a34a",
//     buttonHover: "#15803d",
//     ring: "#bbf7d0",
//     chip: "#dcfce7",
//     emphCard: "rgba(220, 252, 231, 0.7)",
//   },
//   sunrise: {
//     name: "Sunrise",
//     gradient: "#fce7f3, #fef3c7, #f5f5f4",
//     accentBg: "#fce7f3",
//     accentText: "#be185d",
//     button: "#e11d48",
//     buttonHover: "#be123c",
//     ring: "#fbcfe8",
//     chip: "#fce7f3",
//     emphCard: "rgba(252, 231, 243, 0.7)",
//   },
//   ocean: {
//     name: "Ocean",
//     gradient: "#e0f2fe, #e0e7ff, #f5f5f4",
//     accentBg: "#e0e7ff",
//     accentText: "#3730a3",
//     button: "#4f46e5",
//     buttonHover: "#4338ca",
//     ring: "#c7d2fe",
//     chip: "#e0e7ff",
//     emphCard: "rgba(224, 242, 254, 0.7)",
//   },
// };

// export default function MainPage() {
//   const [nav, setNav] = useState<
//     "entry" | "todo" | "pavlov" | "daily" | "infusion" | "my"
//   >("entry");
//   const [colorway, setColorway] = useState<keyof typeof COLORWAYS>("forest");
//   const theme = COLORWAYS[colorway];
//   const today = useMemo(
//     () =>
//       new Date().toLocaleDateString(undefined, {
//         year: "numeric",
//         month: "long",
//         day: "numeric",
//         weekday: "short",
//       }),
//     []
//   );

//   // 아이콘 컴포넌트들
//   const LeafIcon = () => <span>🌿</span>;
//   const ListTodoIcon = () => <span>📝</span>;
//   const ActivityIcon = () => <span>⚡</span>;
//   const NotebookPenIcon = () => <span>✏️</span>;
//   const AnchorIcon = () => <span>⚓</span>;
//   const UserIcon = () => <span>👤</span>;
//   const ChevronRightIcon = () => <span>›</span>;
//   const CalendarIconComponent = () => <span>📅</span>;
//   const PlusIcon = () => <span>+</span>;
//   const BookOpenCheckIcon = () => <span>📖</span>;
//   const SparklesIcon = () => <span>✨</span>;
//   const WindIcon = () => <span>💨</span>;
//   const BrainIcon = () => <span>🧠</span>;

//   // 컴포넌트 함수들
//   const NavCard = () => (
//     <Card>
//       <CardHeader>
//         <CardTitle>길의 난간</CardTitle>
//       </CardHeader>
//       <CardContent>
//         <NavItem isActive={nav === "todo"} onClick={() => setNav("todo")}>
//           <NavIcon accentText={theme.accentText}>
//             <ListTodoIcon />
//           </NavIcon>
//           <NavLabel>투두</NavLabel>
//           <NavArrow>
//             <ChevronRightIcon />
//           </NavArrow>
//         </NavItem>
//         <NavItem isActive={nav === "pavlov"} onClick={() => setNav("pavlov")}>
//           <NavIcon accentText={theme.accentText}>
//             <ActivityIcon />
//           </NavIcon>
//           <NavLabel>파블로프 보기</NavLabel>
//           <NavArrow>
//             <ChevronRightIcon />
//           </NavArrow>
//         </NavItem>
//         <NavItem isActive={nav === "daily"} onClick={() => setNav("daily")}>
//           <NavIcon accentText={theme.accentText}>
//             <NotebookPenIcon />
//           </NavIcon>
//           <NavLabel>데일리 가드레일</NavLabel>
//           <NavArrow>
//             <ChevronRightIcon />
//           </NavArrow>
//         </NavItem>
//         <NavItem
//           isActive={nav === "infusion"}
//           onClick={() => setNav("infusion")}
//         >
//           <NavIcon accentText={theme.accentText}>
//             <AnchorIcon />
//           </NavIcon>
//           <NavLabel>담금주 기록</NavLabel>
//           <NavArrow>
//             <ChevronRightIcon />
//           </NavArrow>
//         </NavItem>
//         <NavItem isActive={nav === "my"} onClick={() => setNav("my")}>
//           <NavIcon accentText={theme.accentText}>
//             <UserIcon />
//           </NavIcon>
//           <NavLabel>마이페이지</NavLabel>
//           <NavArrow>
//             <ChevronRightIcon />
//           </NavArrow>
//         </NavItem>
//       </CardContent>
//     </Card>
//   );

//   const StreakRowComponent = () => (
//     <StreakRow>
//       <StreakCard ring={theme.ring}>
//         <StreakLabel>연속 기록</StreakLabel>
//         <StreakValue>
//           <StreakNumber>7</StreakNumber>
//           <StreakUnit>days</StreakUnit>
//         </StreakValue>
//         <ProgressBar>
//           <ProgressFill button={theme.button} buttonHover={theme.buttonHover} />
//         </ProgressBar>
//       </StreakCard>
//       <StreakCard ring={theme.ring} bg={theme.emphCard}>
//         <StreakLabel>다음 리마인드</StreakLabel>
//         <div style={{ marginTop: "4px", fontSize: "14px" }}>
//           1달 뒤 · "관계 갈등"
//         </div>
//       </StreakCard>
//       <StreakCard ring={theme.ring}>
//         <StreakLabel>오늘의 한 가지</StreakLabel>
//         <div style={{ marginTop: "4px", fontSize: "14px" }}>
//           회의 전에 감사 한 줄
//         </div>
//       </StreakCard>
//     </StreakRow>
//   );

//   const RoutineCard = () => (
//     <Card>
//       <CardHeader>
//         <CardTitle>루틴 알림</CardTitle>
//       </CardHeader>
//       <CardContent>
//         <div
//           style={{
//             display: "flex",
//             alignItems: "center",
//             justifyContent: "space-between",
//             marginBottom: "12px",
//           }}
//         >
//           <div>
//             <p style={{ fontSize: "14px", fontWeight: "500", margin: 0 }}>
//               매일 기록 시간
//             </p>
//             <p style={{ fontSize: "12px", color: "#6b7280", margin: 0 }}>
//               조용한 시간에 가드레일을 세워요
//             </p>
//           </div>
//           <Input type="time" defaultValue="21:00" style={{ width: "auto" }} />
//         </div>
//         <Separator />
//         <div
//           style={{
//             display: "flex",
//             alignItems: "center",
//             justifyContent: "space-between",
//           }}
//         >
//           <div>
//             <p style={{ fontSize: "14px", fontWeight: "500", margin: 0 }}>
//               알림 받기
//             </p>
//             <p style={{ fontSize: "12px", color: "#6b7280", margin: 0 }}>
//               브라우저/모바일 푸시
//             </p>
//           </div>
//           <Switch type="checkbox" defaultChecked />
//         </div>
//       </CardContent>
//     </Card>
//   );

//   const BottomNavComponent = () => (
//     <BottomNav>
//       <BottomNavContent>
//         <BottomNavItem
//           isActive={nav === "todo"}
//           accentText={theme.accentText}
//           onClick={() => setNav("todo")}
//         >
//           <BottomNavIcon>
//             <ListTodoIcon />
//           </BottomNavIcon>
//           <BottomNavLabel>투두</BottomNavLabel>
//         </BottomNavItem>
//         <BottomNavItem
//           isActive={nav === "pavlov"}
//           accentText={theme.accentText}
//           onClick={() => setNav("pavlov")}
//         >
//           <BottomNavIcon>
//             <BrainIcon />
//           </BottomNavIcon>
//           <BottomNavLabel>파블로프</BottomNavLabel>
//         </BottomNavItem>
//         <BottomNavItem
//           isActive={nav === "daily"}
//           accentText={theme.accentText}
//           onClick={() => setNav("daily")}
//         >
//           <BottomNavIcon>
//             <NotebookPenIcon />
//           </BottomNavIcon>
//           <BottomNavLabel>가드레일</BottomNavLabel>
//         </BottomNavItem>
//         <BottomNavItem
//           isActive={nav === "infusion"}
//           accentText={theme.accentText}
//           onClick={() => setNav("infusion")}
//         >
//           <BottomNavIcon>
//             <AnchorIcon />
//           </BottomNavIcon>
//           <BottomNavLabel>담금주</BottomNavLabel>
//         </BottomNavItem>
//         <BottomNavItem
//           isActive={nav === "my"}
//           accentText={theme.accentText}
//           onClick={() => setNav("my")}
//         >
//           <BottomNavIcon>
//             <UserIcon />
//           </BottomNavIcon>
//           <BottomNavLabel>마이</BottomNavLabel>
//         </BottomNavItem>
//       </BottomNavContent>
//     </BottomNav>
//   );

//   const FabComponent = () => (
//     <Fab theme={theme} onClick={() => setNav("pavlov")}>
//       <PlusIcon />
//     </Fab>
//   );

//   const EntryScreen = () => (
//     <div style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
//       <SectionTitle>
//         <SectionIcon accentBg={theme.accentBg} accentText={theme.accentText}>
//           <LeafIcon />
//         </SectionIcon>
//         <SectionText>
//           <SectionHeading>오늘의 길잡이</SectionHeading>
//           <SectionSubtitle>
//             매일의 행동이 내 철학과 삶의 방향을 닮아가도록
//           </SectionSubtitle>
//         </SectionText>
//       </SectionTitle>

//       <Card>
//         <CardHeader>
//           <CardTitle size="sm">
//             매일의 행동이 내 철학적 원칙을 반영하고 있는가?
//           </CardTitle>
//         </CardHeader>
//         <CardContent>
//           <div style={{ fontSize: "14px", color: "#374151" }}>
//             <ol style={{ paddingLeft: "20px", margin: 0 }}>
//               <li>자기 자신에게 떳떳하도록 하는 것.</li>
//               <li>무지를 떠올리며 이치를 궁구하는 것.</li>
//               <li>허무의 증명을 목적으로 회의하지 않는 것.</li>
//               <li>
//                 시공의 무한함과 그를 현상하는 나 자신을 동시에 주목하는 것.
//               </li>
//               <li>
//                 아름답다고 옳은 게 아님을, 옳다고 선한 게 아님을, 선하다고
//                 아름다운 게 아님을 기억하는 것.
//               </li>
//             </ol>
//           </div>
//         </CardContent>
//       </Card>

//       <Card>
//         <CardHeader>
//           <CardTitle size="sm">
//             몸과 마음이 모두 건강하고, 경제적으로 풍요롭고, 인간관계가 탄탄하며,
//             스스로의 삶에 주체성과 만족감을 느끼는 삶.
//           </CardTitle>
//         </CardHeader>
//         <CardContent>
//           <div style={{ display: "flex", flexWrap: "wrap", gap: "8px" }}>
//             {[
//               "신체 (Physical Health)",
//               "정신 (Mental & Emotional Health)",
//               "관계 (Relationships)",
//               "재정 (Finance)",
//               "커리어 & 성장 (Career & Professional Growth)",
//               "생산성 (Productivity & Time Management)",
//               "정체성 & 환경 (Identity & Environment)",
//             ].map((t, i) => (
//               <Badge key={i} theme={theme}>
//                 {t}
//               </Badge>
//             ))}
//           </div>
//         </CardContent>
//       </Card>

//       <div style={{ display: "flex", justifyContent: "flex-end" }}>
//         <Button theme={theme} onClick={() => setNav("daily")}>
//           오늘의 가드레일 쓰기
//         </Button>
//       </div>
//     </div>
//   );

//   return (
//     <Container gradient={theme.gradient}>
//       {/* Top App Bar */}
//       <TopAppBar>
//         <AppBarContent>
//           <AppIcon accentBg={theme.accentBg} accentText={theme.accentText}>
//             <LeafIcon />
//           </AppIcon>
//           <AppInfo>
//             <AppTitle>Guardrail Diary</AppTitle>
//             <AppSubtitle>길에서 벗어나지 않도록 붙드는 따뜻한 기록</AppSubtitle>
//           </AppInfo>

//           <ColorwaySelect
//             value={colorway}
//             onChange={(e) =>
//               setColorway(e.target.value as keyof typeof COLORWAYS)
//             }
//           >
//             {Object.entries(COLORWAYS).map(([key, v]) => (
//               <option key={key} value={key}>
//                 {v.name}
//               </option>
//             ))}
//           </ColorwaySelect>

//           <DateDisplay>
//             <CalendarIconComponent />
//             <span>{today}</span>
//           </DateDisplay>
//         </AppBarContent>
//       </TopAppBar>

//       {/* Content */}
//       <ContentWrapper>
//         <StreakRowComponent />

//         <MainLayout>
//           <Sidebar>
//             <NavCard />
//             <div style={{ marginTop: "24px" }}>
//               <RoutineCard />
//             </div>
//           </Sidebar>

//           <MainContent>{nav === "entry" && <EntryScreen />}</MainContent>
//         </MainLayout>
//       </ContentWrapper>

//       {/* Bottom Navigation for mobile */}
//       <BottomNavComponent />

//       {/* Floating Action Button: quick Pavlov */}
//       <FabComponent />
//     </Container>
//   );
// }
