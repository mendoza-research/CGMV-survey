import { gql } from "@apollo/client";

export const LATEST_TREATMENT_QUERY = gql`
  query LatestTreatmentsQuery {
    cgmv_sessions(limit: 1, order_by: { start_time: desc }) {
      gamification
      stakes
    }
  }
`;

export const CREATE_CGMV_SESSION_QUERY = gql`
  mutation CreateSession(
    $os: String!
    $device_type: String!
    $browser_name: String!
    $browser_version: String!
    $ip_addr: inet!
    $gamification: String!
    $stakes: String!
    $screen_resolution: String!
  ) {
    insert_cgmv_sessions(
      objects: {
        browser_name: $browser_name
        browser_version: $browser_version
        device_type: $device_type
        os: $os
        ip_addr: $ip_addr
        gamification: $gamification
        stakes: $stakes
        screen_resolution: $screen_resolution
      }
    ) {
      affected_rows
      returning {
        session_id
      }
    }
  }
`;

export function getRecordPageDuration(pathName: string) {
  // Get the database field name from path
  // Example: /order-confirmed --> order_confirmed_page_duration
  let fieldName =
    pathName
      .replace(/[^\w]+/g, "_")
      .replace(/^_+|_+$/g, "")
      .toLowerCase() + "_page_duration";

  return gql`
  mutation RecordPageDuration($session_id: uuid!, $duration: Int!) {
    update_cgmv_sessions_by_pk(
      pk_columns: { session_id: $session_id }
      _set: {
        ${fieldName}: $duration,
      }
    ) {
      session_id
    }
  }
`;
}

export const RECORD_RECAPTCHA_RESULTS = gql`
  mutation RecordRecaptchaResults(
    $session_id: uuid!
    $recaptcha_success: Boolean!
    $recaptcha_timestamp: timestamptz!
  ) {
    update_cgmv_sessions_by_pk(
      pk_columns: { session_id: $session_id }
      _set: {
        recaptcha_success: $recaptcha_success
        recaptcha_timestamp: $recaptcha_timestamp
      }
    ) {
      session_id
    }
  }
`;

export function getSingleQuestionUpdateQuery(fieldName: string) {
  return gql`
  mutation RecordSingleResponse($session_id: uuid!, $response_num: Int!, $response_text: String) {
    update_cgmv_sessions_by_pk(
      pk_columns: { session_id: $session_id }
      _set: {
        ${fieldName.concat("_num")}: $response_num,
        ${fieldName.concat("_text")}: $response_text,
      }
    ) {
      session_id
    }
  }
`;
}

export const RECORD_STOCK_SELECTIONS = gql`
  mutation RecordInvestAmounts(
    $session_id: uuid!
    $stock_q1: Int!
    $stock_q2: Int!
    $stock_q3: Int!
    $stock_q4: Int!
    $stock_q5: Int!
    $stock_q6: Int!
    $stock_q7: Int!
    $stock_q8: Int!
    $stock_q9: Int!
    $stock_q10: Int!
    $free_stock: String!
    $stock_proceeds: numeric!
    $lottery_proceeds: numeric!
  ) {
    update_cgmv_sessions_by_pk(
      pk_columns: { session_id: $session_id }
      _set: {
        stock_q1: $stock_q1
        stock_q2: $stock_q2
        stock_q3: $stock_q3
        stock_q4: $stock_q4
        stock_q5: $stock_q5
        stock_q6: $stock_q6
        stock_q7: $stock_q7
        stock_q8: $stock_q8
        stock_q9: $stock_q9
        stock_q10: $stock_q10
        free_stock: $free_stock
        stock_proceeds: $stock_proceeds
        lottery_proceeds: $lottery_proceeds
      }
    ) {
      session_id
    }
  }
`;

export const RECORD_EXIT_SURVEY_QUERY = gql`
  mutation RecordSecondExitSurvey(
    $session_id: uuid!
    $used_robinhood: Int!
    $used_acorns: Int!
    $used_public: Int!
    $used_webull: Int!
    $used_sofi: Int!
    $used_ally_invest: Int!
    $used_other: Int!
    $other_platform: String!
    $never_used: Int!
    $invested_in_stock: Int!
    $plan_to_invest: Int!
    $attention_check: Int!
    $highest_degree: Int!
    $num_accy_courses: Int!
    $num_fin_courses: Int!
    $no_accy_fin_course: Int!
    $english_first_language: Int!
    $other_first_language: String!
    $age: Int!
    $gender: Int!
    $gender_self_describe: String!
  ) {
    update_cgmv_sessions_by_pk(
      pk_columns: { session_id: $session_id }
      _set: {
        used_robinhood: $used_robinhood
        used_acorns: $used_acorns
        used_public: $used_public
        used_webull: $used_webull
        used_sofi: $used_sofi
        used_ally_invest: $used_ally_invest
        used_other: $used_other
        other_platform: $other_platform
        never_used: $never_used
        invested_in_stock: $invested_in_stock
        plan_to_invest: $plan_to_invest
        attention_check: $attention_check
        highest_degree: $highest_degree
        num_accy_courses: $num_accy_courses
        num_fin_courses: $num_fin_courses
        no_accy_fin_course: $no_accy_fin_course
        english_first_language: $english_first_language
        other_first_language: $other_first_language
        age: $age
        gender: $gender
        gender_self_describe: $gender_self_describe
      }
    ) {
      session_id
    }
  }
`;

export const RECORD_TOTAL_PAYMENT_PAGE_QUERY = gql`
  mutation RecordOptionalGamePage(
    $session_id: uuid!
    $final_thoughts: String!
    $total_payment: numeric!
    $payment_code: String!
  ) {
    update_cgmv_sessions_by_pk(
      pk_columns: { session_id: $session_id }
      _set: {
        final_thoughts: $final_thoughts
        total_payment: $total_payment
        payment_code: $payment_code
        end_time: "now()"
      }
    ) {
      session_id
    }
  }
`;
