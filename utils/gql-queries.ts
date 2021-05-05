import { gql } from "@apollo/client";

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
