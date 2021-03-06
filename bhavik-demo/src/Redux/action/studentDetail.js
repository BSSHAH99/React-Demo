import { ActionType } from "./action-type";
import Api from "../../Services/apiInstance";

export const fetchStudentDetailRequest = (id) => {
  return async (dispatch) => {
    await Api.get("/dashboard/Teachers/viewStudentDetail?id=" + id)
      .then((res) => {
        console.log("res.data.data :>> ", res.data.data);
        dispatch(fetchStudentDetailSuccess(res.data.data));
      })
      .catch((error) => dispatch(fetchStudentDetailFailure(error.message)));
  };
};

export const fetchStudentDetailSuccess = (users) => {
  return {
    type: ActionType.FETCH_STUDENT_DETAIL_SUCCESS,
    payload: users,
  };
};

export const fetchStudentDetailFailure = (error) => {
  return {
    type: ActionType.FETCH_STUDENT_DETAIL_FAILURE,
    payload: error,
  };
};

export const StudentDetailReset = () => {
  return {
    type: ActionType.STUDENT_DETAIL_RESET,
  };
};
