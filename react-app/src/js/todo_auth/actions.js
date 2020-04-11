import axios from "axios";

export const REGISTER_SUCCESS = "REGISTER_SUCCESS";
export const REGISTER_FAILURE = "REGISTER_FAILURE";

export const register = (username, password) => async dispatch => {
    const config = {
        headers: {
            "Content-Type": "application/json"
        },
    };
    const body = JSON.stringify({ username, password })
    try {
        const response = await axios.post("/api/todo-auth/register/", body, config);
        dispatch({
            type: REGISTER_SUCCESS,
            data: response.data
        })
        return response.status ;
    } catch (err) {
        dispatch({
            type: REGISTER_FAILURE,
            errors: err.response.data
        });
        return err.response.status;
    };

}
