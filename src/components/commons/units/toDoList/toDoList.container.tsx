import { useState, useMemo, useRef, useEffect, Fragment } from "react";
import { useRouter } from "next/router";
import {
  Container,
  TopAppBar,
  AppBarContent,
  AppInfo,
  AppTitle,
  AppSubtitle,
  MonthSelector,
  MonthText,
  ArrowIcon,
  MonthDropdown,
  MonthList,
  MonthOption,
  ActionButtons,
  ActionButton,
  ContentWrapper,
  EventList,
  DayGroup,
  DayHeader,
  DayCircle,
  DayName,
  DayNumber,
  DayInfo,
  DayLabel,
  DayDate,
  EventCard,
  EventIcon,
  EventContent,
  EventTitle,
  EventTime,
  EventDescription,
  WeekSeparator,
  SeparatorText,
  SeparatorLine,
  FloatingActionButton,
  EmptyState,
  EmptyIcon,
  EmptyTitle,
  EmptyDescription,
  BackButton,
} from "./toDoList.style";

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
    accentBg: "#fef3c7", // 웜톤으로 변경 (기존: "#dcfce7")
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

// 샘플 이벤트 데이터 (2025년 8월 기준)
const SAMPLE_EVENTS = [
  {
    id: 1,
    date: new Date(2025, 7, 19), // August 19, 2025
    dayName: "Tuesday",
    events: [
      {
        id: 1,
        title: "Fuminori x Plato/tiro (Damien, Evan, Yur",
        time: "2-3 PM",
        icon: "f",
        iconColor: "#f97316",
        backgroundColor: "#fef3c7",
      },
      {
        id: 2,
        title: "damien<>yuna",
        time: "4-6 PM",
        icon: "y",
        iconColor: "#16a34a",
        backgroundColor: "#dcfce7",
      },
      {
        id: 3,
        title: "Foundation Reading",
        time: "8-10 PM",
        icon: "📖",
        iconColor: "#16a34a",
        backgroundColor: "#dcfce7",
        isWide: true,
        description: "Open book icon with abstract shapes",
      },
    ],
  },
  {
    id: 2,
    date: new Date(2025, 7, 20), // August 20, 2025
    dayName: "Wednesday",
    events: [
      {
        id: 4,
        title: "Damien <> Luke",
        time: "9-9:45 AM",
        icon: "👤",
        iconColor: "#3b82f6",
        backgroundColor: "#dbeafe",
      },
      {
        id: 5,
        title: "Damien <> Luke",
        time: "9-9:45 AM",
        icon: "👤",
        iconColor: "#8b5a3c",
        backgroundColor: "#fef3c7",
      },
    ],
  },
  {
    id: 3,
    date: new Date(2025, 7, 21), // August 21, 2025 (오늘 날짜)
    dayName: "Thursday",
    events: [
      {
        id: 6,
        title: "아침 운동하기",
        time: "7:00 AM",
        icon: "🏃",
        iconColor: "#16a34a",
        backgroundColor: "#dcfce7",
      },
      {
        id: 7,
        title: "이메일 확인",
        time: "9:00 AM",
        icon: "📧",
        iconColor: "#3b82f6",
        backgroundColor: "#dbeafe",
      },
      {
        id: 8,
        title: "점심 약속",
        time: "12:00 PM",
        icon: "🍽️",
        iconColor: "#f97316",
        backgroundColor: "#fef3c7",
      },
      {
        id: 9,
        title: "회의 준비",
        time: "2:00 PM",
        icon: "📋",
        iconColor: "#8b5a3c",
        backgroundColor: "#fef3c7",
      },
      {
        id: 10,
        title: "저녁 식사",
        time: "7:00 PM",
        icon: "🍽️",
        iconColor: "#e11d48",
        backgroundColor: "#fce7f3",
      },
    ],
  },
  {
    id: 4,
    date: new Date(2025, 7, 22), // August 22, 2025
    dayName: "Friday",
    events: [
      {
        id: 11,
        title: "Team Retro",
        time: "5-6 PM",
        icon: "👤",
        iconColor: "#8b5a3c",
        backgroundColor: "#fef3c7",
      },
    ],
  },
  {
    id: 5,
    date: new Date(2025, 7, 25), // August 25, 2025
    dayName: "Monday",
    events: [
      {
        id: 12,
        title: "Weekly Sync",
        time: "5:30-6 PM",
        icon: "y",
        iconColor: "#16a34a",
        backgroundColor: "#fef3c7",
      },
    ],
  },
  {
    id: 6,
    date: new Date(2025, 7, 27), // August 27, 2025
    dayName: "Wednesday",
    events: [
      {
        id: 13,
        title: "Damien <> Luke",
        time: "9-9:45 AM",
        icon: "👤",
        iconColor: "#3b82f6",
        backgroundColor: "white",
        borderColor: "#3b82f6",
      },
      {
        id: 14,
        title: "Damien <> Luke",
        time: "9-9:45 AM",
        icon: "👤",
        iconColor: "#8b5a3c",
        backgroundColor: "#fef3c7",
      },
    ],
  },
];

export default function TodoListPage() {
  const router = useRouter();
  const [colorway, setColorway] = useState<keyof typeof COLORWAYS>("forest");
  const theme = COLORWAYS[colorway];
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isNavigating, setIsNavigating] = useState(false); // 네비게이션 상태 추가
  const dropdownRef = useRef<HTMLDivElement>(null);
  const todayRef = useRef<HTMLDivElement>(null); // 오늘 날짜 ref 추가

  // 현재 날짜
  const today = useMemo(() => new Date(), []);

  // 드롭다운 외부 클릭 시 닫기
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // 초기 로드 시 오늘 날짜로 스크롤
  useEffect(() => {
    // 약간의 지연을 두어 DOM이 완전히 렌더링된 후 스크롤
    const timer = setTimeout(() => {
      if (todayRef.current) {
        todayRef.current.scrollIntoView({
          behavior: "smooth",
          block: "center",
        });
      }
    }, 100);

    return () => clearTimeout(timer);
  }, []); // 빈 의존성 배열로 컴포넌트 마운트 시 한 번만 실행

  // 월 선택 핸들러
  const handleMonthSelect = (monthIndex: number) => {
    const newMonth = new Date(currentMonth);
    newMonth.setMonth(monthIndex);
    setCurrentMonth(newMonth);
    setIsDropdownOpen(false);
  };

  // 드롭다운 토글 핸들러
  const handleDropdownToggle = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  // 월 이름 포맷팅
  const monthName = useMemo(() => {
    return currentMonth.toLocaleDateString("ko-KR", {
      month: "long",
    });
  }, [currentMonth]);

  // 월 옵션 생성 (현재 연도의 모든 월)
  const monthOptions = useMemo(() => {
    const currentYear = new Date().getFullYear();
    return Array.from({ length: 12 }, (_, index) => {
      const date = new Date(currentYear, index, 1);
      return {
        index,
        name: date.toLocaleDateString("ko-KR", { month: "long" }),
        isSelected:
          index === currentMonth.getMonth() &&
          currentMonth.getFullYear() === currentYear,
      };
    });
  }, [currentMonth]);

  // 아이콘 컴포넌트들
  const SearchIcon = () => <span>🏠</span>;
  const TodayIcon = () => (
    <span
      style={{
        display: "inline-flex",
        alignItems: "center",
        justifyContent: "center",
        width: "24px",
        height: "24px",
        borderRadius: "6px",
        border: `2px solid ${theme.accentText}`,
        background: `${theme.accentBg}`,
        color: theme.accentText,
        fontSize: "12px",
        fontWeight: "600",
        fontFamily: "monospace",
        boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
      }}
    >
      {today.getDate()}
    </span>
  ); // 오늘 날짜 표시
  const ProfileIcon = () => <span>👤</span>;
  const PlusIcon = () => <span>+</span>;
  const ChevronDownIcon = () => <span>▼</span>;
  const ChevronLeftIcon = () => <span>◀</span>;
  const ChevronRightIcon = () => <span>▶</span>;

  // 뒤로가기 핸들러 (로딩 상태 추가)
  const handleBack = () => {
    setIsNavigating(true); // 로딩 시작
    router.back();
  };

  // 오늘 날짜로 스크롤 핸들러
  const handleTodayClick = () => {
    console.log("오늘 날짜로 스크롤:", today.getDate());
    if (todayRef.current) {
      // 먼저 요소로 스크롤
      todayRef.current.scrollIntoView({
        behavior: "smooth",
        block: "center", // start로 변경
      });
    }
  };

  // 새 투두 추가 핸들러 (로딩 상태 추가)
  const handleAddTodo = () => {
    console.log("새 투두 추가");
    setIsNavigating(true); // 로딩 시작
    router.push("/todoAdd"); // /todoAdd 페이지로 이동
  };

  // 이벤트 클릭 핸들러
  const handleEventClick = (eventId: number) => {
    console.log("이벤트 클릭:", eventId);
    // TODO: 이벤트 상세 페이지로 이동
  };

  // 라우터 이벤트 리스너 추가
  useEffect(() => {
    const handleRouteChangeStart = () => {
      setIsNavigating(true);
    };

    const handleRouteChangeComplete = () => {
      setIsNavigating(false);
    };

    const handleRouteChangeError = () => {
      setIsNavigating(false);
    };

    router.events.on('routeChangeStart', handleRouteChangeStart);
    router.events.on('routeChangeComplete', handleRouteChangeComplete);
    router.events.on('routeChangeError', handleRouteChangeError);

    return () => {
      router.events.off('routeChangeStart', handleRouteChangeStart);
      router.events.off('routeChangeComplete', handleRouteChangeComplete);
      router.events.off('routeChangeError', handleRouteChangeError);
    };
  }, [router.events]);

  return (
    <Container gradient={theme.gradient}>
      {/* Top App Bar */}
      <TopAppBar>
        <AppBarContent>
          <BackButton onClick={handleBack}>←</BackButton>
          <AppInfo>
            <AppTitle>TO-DO</AppTitle>
            <AppSubtitle>할 일을 관리해보세요</AppSubtitle>
          </AppInfo>
          <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
            <MonthSelector ref={dropdownRef} onClick={handleDropdownToggle}>
              <MonthText>{monthName}</MonthText>
              <ArrowIcon isOpen={isDropdownOpen}>
                <ChevronDownIcon />
              </ArrowIcon>
              <MonthDropdown isOpen={isDropdownOpen}>
                <MonthList>
                  {monthOptions.map((month) => (
                    <MonthOption
                      key={month.index}
                      isSelected={month.isSelected}
                      onClick={(e) => {
                        e.stopPropagation();
                        handleMonthSelect(month.index);
                      }}
                    >
                      {month.name}
                    </MonthOption>
                  ))}
                </MonthList>
              </MonthDropdown>
            </MonthSelector>

            <ActionButtons>
              <ActionButton onClick={handleTodayClick}>
                <TodayIcon />
              </ActionButton>
            </ActionButtons>
          </div>
        </AppBarContent>
      </TopAppBar>

      {/* Content */}
      <ContentWrapper>
        <EventList>
          {SAMPLE_EVENTS.map((dayGroup, index) => {
            const isToday =
              dayGroup.date.toDateString() === today.toDateString();

            return (
              <Fragment key={dayGroup.id}>
                {/* 주간 구분선 (첫 번째 그룹이 아니고 월이 바뀌는 경우) */}
                {index > 0 &&
                  dayGroup.date.getMonth() !==
                    SAMPLE_EVENTS[index - 1].date.getMonth() && (
                    <WeekSeparator>
                      <SeparatorText>
                        {dayGroup.date
                          .toLocaleDateString("en-US", {
                            month: "long",
                            year: "numeric",
                          })
                          .toUpperCase()}{" "}
                        {dayGroup.date.getDate()} -{" "}
                        {dayGroup.date.getDate() + 6}
                      </SeparatorText>
                      <SeparatorLine />
                    </WeekSeparator>
                  )}

                <DayGroup
                  ref={isToday ? todayRef : null} // 오늘 날짜에만 ref 추가
                >
                  <DayHeader>
                    <DayCircle isToday={isToday}>
                      <DayName>{dayGroup.dayName.slice(0, 3)}</DayName>
                      <DayNumber>{dayGroup.date.getDate()}</DayNumber>
                    </DayCircle>
                    {/* <DayInfo>
                      <DayLabel>{dayGroup.dayName}</DayLabel>
                      <DayDate>{dayGroup.date.getDate()}</DayDate>
                    </DayInfo> */}
                  </DayHeader>

                  {dayGroup.events.map((event) => (
                    <EventCard
                      key={event.id}
                      backgroundColor={event.backgroundColor}
                      borderColor={event.borderColor}
                      isWide={event.isWide}
                      onClick={() => handleEventClick(event.id)}
                    >
                      {/* <EventIcon
                        backgroundColor={event.iconColor}
                        color="white"
                      >
                        {event.icon}
                      </EventIcon> */}
                      <EventContent>
                        <EventTitle>{event.title}</EventTitle>
                        <EventTime>{event.time}</EventTime>
                        {event.description && (
                          <EventDescription>
                            {event.description}
                          </EventDescription>
                        )}
                      </EventContent>
                    </EventCard>
                  ))}
                </DayGroup>
              </Fragment>
            );
          })}

          {/* 빈 상태 (이벤트가 없을 때) */}
          {SAMPLE_EVENTS.length === 0 && (
            <EmptyState>
              <EmptyIcon>📅</EmptyIcon>
              <EmptyTitle>이번 달 일정이 없어요</EmptyTitle>
              <EmptyDescription>
                새로운 투두를 추가해서 계획을 세워보세요
              </EmptyDescription>
            </EmptyState>
          )}
        </EventList>
      </ContentWrapper>

      {/* Floating Action Button - 로딩 중일 때 숨김 */}
      {!isNavigating && (
        <FloatingActionButton theme={theme} onClick={handleAddTodo}>
          <PlusIcon />
        </FloatingActionButton>
      )}
    </Container>
  );
}
