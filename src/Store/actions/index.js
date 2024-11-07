import { ADD_REMINDER, CLEAR_REMINDER, REMOVE_REMINDER } from "../types/types";

export const ADDREMINDER = (text, date) => {
  const action = {
    type: ADD_REMINDER,
    text: text,
    date: date,
  };
  console.log("adding action", action);
  return action;
};

export const REMOVEREMINDER = (id) => {
  const action = {
    type: REMOVE_REMINDER,
    id: id,
  };
  console.log("REMOVERE reminder", action);
  return action;
};

export const CLEARREMINDER = () => {
  const action = {
    type: CLEAR_REMINDER,
  };
  console.log("clear reminder", action);
  return action;
};
