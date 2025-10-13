import { useState, useMemo, useRef, useEffect, Fragment } from "react";
import { useRouter } from "next/router";
import { useQuery } from "@apollo/client";
import { FETCH_TODOS_BY_MONTH } from "../../../../commons/apis/graphql-queries";
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

// Todo 타입 정의 (GraphQL 스키마와 일치)
interface Todo {
  id: string;
  title: string;
  date: string;
  startTime: string;
  endTime: string;
  priority: "LOW" | "MEDIUM" | "HIGH";
  repeatType?: string;
  repeatUntil?: string;
  isRepeating: boolean;
  createdAt: string;
  updatedAt: string;
}

// 우선순위에 따른 아이콘과 색상 매핑
const getPriorityConfig = (priority: string) => {
  switch (priority) {
    case "HIGH":
      return {
        icon: "🔴",
        iconColor: "#e11d48",
        backgroundColor: "#fce7f3",
      };
    case "MEDIUM":
      return {
        icon: "🟡",
        iconColor: "#f97316",
        backgroundColor: "#fef3c7",
      };
    case "LOW":
      return {
        icon: "🟢",
        iconColor: "#16a34a",
        backgroundColor: "#dcfce7",
      };
    default:
      return {
        icon: "📝",
        iconColor: "#6b7280",
        backgroundColor: "#f5f5f4",
      };
  }
};

// 시간 포맷팅 함수
const formatTime = (startTime: string, endTime: string) => {
  if (!startTime) return "";
  if (endTime) {
    return `${startTime} - ${endTime}`;
  }
  return startTime;
};

export default function TodoListPage() {
  const router = useRouter();
  const [colorway, setColorway] = useState<keyof typeof COLORWAYS>("forest");
  const theme = COLORWAYS[colorway];
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isNavigating, setIsNavigating] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const todayRef = useRef<HTMLDivElement>(null);

  // 현재 날짜
  const today = useMemo(() => new Date(), []);

  // GraphQL 쿼리로 월별 투두 조회
  const { data, loading, error, refetch } = useQuery(FETCH_TODOS_BY_MONTH, {
    variables: {
      year: currentMonth.getFullYear(),
      month: currentMonth.getMonth() + 1, // JavaScript month는 0부터 시작하므로 +1
    },
    notifyOnNetworkStatusChange: true,
  });

  // 월 변경 시 데이터 다시 조회
  useEffect(() => {
    refetch({
      year: currentMonth.getFullYear(),
      month: currentMonth.getMonth() + 1,
    });
  }, [currentMonth, refetch]);

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

  // 투두 데이터를 날짜별로 그룹화
  const todosByDate = useMemo(() => {
    if (!data?.fetchTodosByMonth) return [];

    const grouped = data.fetchTodosByMonth.reduce((acc: any, todo: Todo) => {
      const todoDate = new Date(todo.date);
      const dateKey = todoDate.toDateString();

      if (!acc[dateKey]) {
        acc[dateKey] = {
          date: todoDate,
          dayName: todoDate.toLocaleDateString("en-US", { weekday: "short" }), // 영어 3글자로 변경
          todos: [],
        };
      }

      acc[dateKey].todos.push({
        id: todo.id,
        title: todo.title,
        time: formatTime(todo.startTime, todo.endTime),
        priority: todo.priority,
        ...getPriorityConfig(todo.priority),
        isRepeating: todo.isRepeating,
        repeatType: todo.repeatType,
      });

      return acc;
    }, {});

    // 날짜순으로 정렬
    return Object.values(grouped).sort(
      (a: any, b: any) => a.date.getTime() - b.date.getTime()
    );
  }, [data]);

  // 이벤트 클릭 핸들러 (투두 상세로 이동)
  const handleTodoClick = (todoId: string) => {
    console.log("투두 클릭:", todoId);
    setIsNavigating(true);
    router.push(`/todoList/${todoId}`);
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

    router.events.on("routeChangeStart", handleRouteChangeStart);
    router.events.on("routeChangeComplete", handleRouteChangeComplete);
    router.events.on("routeChangeError", handleRouteChangeError);

    return () => {
      router.events.off("routeChangeStart", handleRouteChangeStart);
      router.events.off("routeChangeComplete", handleRouteChangeComplete);
      router.events.off("routeChangeError", handleRouteChangeError);
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
            <AppSubtitle>
              {loading ? "로딩 중..." : "할 일을 관리해보세요"}
            </AppSubtitle>
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
        {/* 로딩 상태 */}
        {loading && (
          <EmptyState>
            <EmptyIcon>⏳</EmptyIcon>
            <EmptyTitle>투두를 불러오는 중...</EmptyTitle>
            <EmptyDescription>
              {currentMonth.getFullYear()}년 {currentMonth.getMonth() + 1}월
              투두를 조회하고 있습니다
            </EmptyDescription>
          </EmptyState>
        )}

        {/* 에러 상태 */}
        {error && (
          <EmptyState>
            <EmptyIcon>❌</EmptyIcon>
            <EmptyTitle>투두를 불러올 수 없습니다</EmptyTitle>
            <EmptyDescription>{error.message}</EmptyDescription>
          </EmptyState>
        )}

        {/* 투두 목록 */}
        {!loading && !error && (
          <EventList>
            {todosByDate.map((dayGroup: any, index: number) => {
              const isToday =
                dayGroup.date.toDateString() === today.toDateString();

              return (
                <Fragment key={dayGroup.date.toISOString()}>
                  {/* 주간 구분선 */}
                  {index > 0 &&
                    dayGroup.date.getMonth() !==
                      (todosByDate[index - 1] as any).date.getMonth() && (
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

                  <DayGroup ref={isToday ? todayRef : null}>
                    <DayHeader>
                      <DayCircle isToday={isToday}>
                        <DayName>{dayGroup.dayName.slice(0, 3)}</DayName>
                        <DayNumber>{dayGroup.date.getDate()}</DayNumber>
                      </DayCircle>
                    </DayHeader>

                    {dayGroup.todos.map((todo: any) => (
                      <EventCard
                        key={todo.id}
                        backgroundColor={todo.backgroundColor}
                        onClick={() => handleTodoClick(todo.id)}
                      >
                        <EventContent>
                          <EventTitle>{todo.title}</EventTitle>
                          <EventTime>{todo.time}</EventTime>
                          {todo.isRepeating && (
                            <EventDescription>
                              🔁 {todo.repeatType} 반복
                            </EventDescription>
                          )}
                        </EventContent>
                      </EventCard>
                    ))}
                  </DayGroup>
                </Fragment>
              );
            })}

            {/* 빈 상태 (투두가 없을 때) */}
            {todosByDate.length === 0 && !loading && (
              <EmptyState>
                <EmptyIcon>📅</EmptyIcon>
                <EmptyTitle>이번 달 일정이 없어요</EmptyTitle>
                <EmptyDescription>
                  새로운 투두를 추가해서 계획을 세워보세요
                </EmptyDescription>
              </EmptyState>
            )}
          </EventList>
        )}
      </ContentWrapper>

      {/* Floating Action Button - 로딩 중일 때 숨김 */}
      {!isNavigating && !loading && (
        <FloatingActionButton theme={theme} onClick={handleAddTodo}>
          <PlusIcon />
        </FloatingActionButton>
      )}
    </Container>
  );
}
