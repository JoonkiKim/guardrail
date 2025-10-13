import { gql } from "@apollo/client";

// 가드레일 생성 뮤테이션
export const CREATE_GUARDRAIL = gql`
  mutation CreateGuardrail($createGuardrailInput: CreateGuardrailInput!) {
    createGuardrail(createGuardrailInput: $createGuardrailInput) {
      id
      feeling
      mostImpt
      diary
      thanks
      direction
      oneStep
      ignorance
      createdAt
      updatedAt
    }
  }
`;

// 가드레일 목록 조회 쿼리
export const FETCH_GUARDRAILS = gql`
  query FetchGuardrails {
    fetchGuardrails {
      id
      feeling
      mostImpt
      diary
      thanks
      direction
      oneStep
      ignorance
      createdAt
      updatedAt
    }
  }
`;

// 특정 가드레일 조회 쿼리
export const FETCH_GUARDRAIL = gql`
  query FetchGuardrail($guardrailId: String!) {
    fetchGuardrail(guardrailId: $guardrailId) {
      id
      feeling
      mostImpt
      diary
      thanks
      direction
      oneStep
      ignorance
      createdAt
      updatedAt
    }
  }
`;

// 가드레일 수정 뮤테이션
export const UPDATE_GUARDRAIL = gql`
  mutation UpdateGuardrail(
    $guardrailId: String!
    $updateGuardrailInput: UpdateGuardrailInput!
  ) {
    updateGuardrail(
      guardrailId: $guardrailId
      updateGuardrailInput: $updateGuardrailInput
    ) {
      id
      feeling
      mostImpt
      diary
      thanks
      direction
      oneStep
      ignorance
      createdAt
      updatedAt
    }
  }
`;

// 가드레일 삭제 뮤테이션
export const DELETE_GUARDRAIL = gql`
  mutation DeleteGuardrail($guardrailId: String!) {
    deleteGuardrail(guardrailId: $guardrailId)
  }
`;

// 담금주 생성 뮤테이션
export const CREATE_INFUSION = gql`
  mutation CreateInfusion($createInfusionInput: CreateInfusionInput!) {
    createInfusion(createInfusionInput: $createInfusionInput) {
      id
      title
      category
      description
      infusionDetails {
        id
        description
        periodType
      }
      createdAt
      updatedAt
    }
  }
`;

// 담금주 수정 뮤테이션
export const UPDATE_INFUSION = gql`
  mutation UpdateInfusion(
    $infusionId: String!
    $updateInfusionInput: UpdateInfusionInput!
  ) {
    updateInfusion(
      infusionId: $infusionId
      updateInfusionInput: $updateInfusionInput
    ) {
      id
      title
      category
      description
      infusionDetails {
        id
        description
        periodType
      }
      createdAt
      updatedAt
    }
  }
`;

// 담금주 삭제 뮤테이션
export const DELETE_INFUSION = gql`
  mutation DeleteInfusion($infusionId: String!) {
    deleteInfusion(infusionId: $infusionId)
  }
`;

// 담금주 목록 조회 쿼리
export const FETCH_INFUSIONS = gql`
  query FetchInfusions {
    fetchInfusions {
      id
      title
      category
      description
      infusionDetails {
        id
        description
        periodType
      }
      createdAt
      updatedAt
    }
  }
`;

// 특정 담금주 조회 쿼리
export const FETCH_INFUSION = gql`
  query FetchInfusion($infusionId: String!) {
    fetchInfusion(infusionId: $infusionId) {
      id
      title
      category
      description
      infusionDetails {
        id
        description
        periodType
      }
      createdAt
      updatedAt
    }
  }
`;

// 투두 생성 뮤테이션
export const CREATE_TODO = gql`
  mutation CreateTodo($createTodoInput: CreateTodoInput!) {
    createTodo(createTodoInput: $createTodoInput) {
      id
      title
      description
      date
      startTime
      endTime
      priority
      repeatType
      repeatUntil
      isRepeating
      createdAt
      updatedAt
    }
  }
`;

// 월별 투두 조회 쿼리
export const FETCH_TODOS_BY_MONTH = gql`
  query FetchTodosByMonth($year: Float!, $month: Float!) {
    fetchTodosByMonth(year: $year, month: $month) {
      id
      title
      date
      startTime
      endTime
      priority
      repeatType
      repeatUntil
      isRepeating
      createdAt
      updatedAt
    }
  }
`;

// 특정 투두 조회 쿼리
export const FETCH_TODO = gql`
  query FetchTodo($todoId: String!) {
    fetchTodo(todoId: $todoId) {
      id
      title
      description
      date
      startTime
      endTime
      priority
      repeatType
      repeatUntil
      isRepeating
      createdAt
      updatedAt
    }
  }
`;

// 투두 수정 뮤테이션
export const UPDATE_TODO = gql`
  mutation UpdateTodo($todoId: String!, $updateTodoInput: UpdateTodoInput!) {
    updateTodo(todoId: $todoId, updateTodoInput: $updateTodoInput) {
      id
      title
      description
      date
      startTime
      endTime
      priority
      repeatType
      repeatUntil
      isRepeating
      createdAt
      updatedAt
    }
  }
`;

// 투두 삭제 뮤테이션
export const DELETE_TODO = gql`
  mutation DeleteTodo($todoId: String!) {
    deleteTodo(todoId: $todoId)
  }
`;

// 파블로프 생성 뮤테이션
export const CREATE_PAVLOV = gql`
  mutation CreatePavlov($createPavlovInput: CreatePavlovInput!) {
    createPavlov(createPavlovInput: $createPavlovInput) {
      id
      name
      pavlovDetails {
        id
        description
      }
      createdAt
      updatedAt
    }
  }
`;

// 파블로프 수정 뮤테이션
export const UPDATE_PAVLOV = gql`
  mutation UpdatePavlov(
    $pavlovId: String!
    $updatePavlovInput: UpdatePavlovInput!
  ) {
    updatePavlov(pavlovId: $pavlovId, updatePavlovInput: $updatePavlovInput) {
      id
      name
      pavlovDetails {
        id
        description
      }
      createdAt
      updatedAt
    }
  }
`;

// 파블로프 목록 조회 쿼리
export const FETCH_PAVLOVS = gql`
  query FetchPavlovs {
    fetchPavlovs {
      id
      name
      pavlovDetails {
        id
        description
      }
      createdAt
      updatedAt
    }
  }
`;

// ============= AUTH =============
export const LOGIN = gql`
  mutation Login($email: String!, $password: String!) {
    login(email: $email, password: $password)
  }
`;

export const RESTORE_ACCESS_TOKEN = gql`
  mutation RestoreAccessToken {
    restoreAccessToken
  }
`;

export const LOGOUT = gql`
  mutation Logout {
    logout
  }
`;

export const CREATE_USER = gql`
  mutation CreateUser($createUserInput: CreateUserInput!) {
    createUser(createUserInput: $createUserInput) {
      id
      name
      email
      createdAt
    }
  }
`;
