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
