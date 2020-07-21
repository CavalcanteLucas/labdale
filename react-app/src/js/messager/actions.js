export const CLEAR_SUCCESS_MESSAGE = "CLEAR_SUCCESS_MESSAGE";

export const clearSuccessMessage = index => ({
  type: CLEAR_SUCCESS_MESSAGE,
  extraData: {
    index
  }
});
