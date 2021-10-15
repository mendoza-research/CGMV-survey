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

export const UPDATE_INVEST_AMOUNTS_QUERY = gql`
  mutation RecordInvestAmounts(
    $session_id: uuid!
    $soundwaves_amount: numeric!
    $virtuoso_amount: numeric!
  ) {
    update_cgmv_sessions_by_pk(
      pk_columns: { session_id: $session_id }
      _set: {
        soundwaves_amount: $soundwaves_amount
        virtuoso_amount: $virtuoso_amount
      }
    ) {
      session_id
    }
  }
`;

export const RECORD_KNOWLEDGE_ITEM_CLICKS_QUERY = gql`
  mutation RecordKnowledgeItemClicks(
    $session_id: uuid!
    $click_eps: Int!
    $click_pe_ratio: Int!
    $click_debt_ratio: Int!
    $click_fiscal_year: Int!
    $click_market_cap: Int!
    $click_gross_margin: Int!
    $click_net_income: Int!
    $click_stock_split: Int!
  ) {
    update_cgmv_sessions_by_pk(
      pk_columns: { session_id: $session_id }
      _set: {
        click_eps: $click_eps
        click_pe_ratio: $click_pe_ratio
        click_debt_ratio: $click_debt_ratio
        click_fiscal_year: $click_fiscal_year
        click_market_cap: $click_market_cap
        click_gross_margin: $click_gross_margin
        click_net_income: $click_net_income
        click_stock_split: $click_stock_split
      }
    ) {
      session_id
    }
  }
`;

export const RECORD_PLATFORM_QUESTIONS_QUERY = gql`
  mutation RecordSingleResponse(
    $session_id: uuid!
    $risk_recollection: String!
    $overall_experience: Int!
  ) {
    update_cgmv_sessions_by_pk(
      pk_columns: { session_id: $session_id }
      _set: {
        risk_recollection: $risk_recollection
        overall_experience: $overall_experience
      }
    ) {
      session_id
    }
  }
`;

export const RECORD_FIRST_EXIT_SURVEY_QUERY = gql`
  mutation RecordFirstExitSurvey(
    $session_id: uuid!
    $attention_check: Int!
    $need_to_accomplish: Int!
    $strive_for_accomplishment: Int!
    $motivates_progress: Int!
    $time_pass_quickly: Int!
    $grabs_attention: Int!
    $lose_myself: Int!
    $playful_experience: Int!
    $feel_like_exploring_things: Int!
    $want_to_know_next: Int!
  ) {
    update_cgmv_sessions_by_pk(
      pk_columns: { session_id: $session_id }
      _set: {
        attention_check: $attention_check
        need_to_accomplish: $need_to_accomplish
        strive_for_accomplishment: $strive_for_accomplishment
        motivates_progress: $motivates_progress
        time_pass_quickly: $time_pass_quickly
        grabs_attention: $grabs_attention
        lose_myself: $lose_myself
        playful_experience: $playful_experience
        feel_like_exploring_things: $feel_like_exploring_things
        want_to_know_next: $want_to_know_next
      }
    ) {
      session_id
    }
  }
`;

export const RECORD_SECOND_EXIT_SURVEY_QUERY = gql`
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
    $investing_knowledge: Int!
    $plan_to_invest: Int!
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
        investing_knowledge: $investing_knowledge
        plan_to_invest: $plan_to_invest
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

export const RECORD_OPTIONAL_GAME_PAGE_QUERY = gql`
  mutation RecordOptionalGamePage(
    $session_id: uuid!
    $game_duration: Int!
    $final_thoughts: String!
    $payment_code: String!
  ) {
    update_cgmv_sessions_by_pk(
      pk_columns: { session_id: $session_id }
      _set: {
        game_duration: $game_duration
        final_thoughts: $final_thoughts
        end_time: "now()"
        payment_code: $payment_code
      }
    ) {
      session_id
    }
  }
`;
