import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import resetPasswordFields from "../../Constants/ResetPasswordFields";
import {
  isResetPasswordError,
  resetPasswordOnChange,
  resetPasswordRequest,
} from "../../Redux/action/resetPassword";
import Alert from "../ReusableComponents/Alert";
import DemoButton from "../ReusableComponents/DemoButton";
import DemoInput from "../ReusableComponents/DemoInput";
import validation from "../validation";

const ResetPassword = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {}, []);

  const state = useSelector((state) => state);
  const myState = state.resetPasswordReducer;
  const userData = myState.user;
  const message = myState.message;
  const formerror = myState.formerror;

  const handalSubmit = (e) => {
    e.preventDefault();
    let error = {};

    Object.entries(userData).forEach(([key, value]) => {
      console.log("key,value :>> ", key, value);
      const newError = validation(key, value, userData);
      // const newError = validation(key, value);
      if (newError) error[key] = newError;
    });
    if (Object.entries(error).length) {
      dispatch(isResetPasswordError(error));
      return;
    }
    dispatch(resetPasswordRequest(navigate));
  };
  const handleChange = (e) => {
    dispatch(resetPasswordOnChange(e.target.name, e.target.value));
  };

  return (
    <>
      <div className="container my-3">
        <div className="container">
          <form onSubmit={handalSubmit}>
            {resetPasswordFields.map((input, index) => {
              return (
                <DemoInput
                  key={index}
                  {...input}
                  value={userData[input.name] || ""}
                  onChange={handleChange}
                  error={formerror || ""}
                />
              );
            })}

            <DemoButton type={"submit"}>Submit</DemoButton>
          </form>
        </div>
      </div>
    </>
  );
};

export default ResetPassword;
