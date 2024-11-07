import { ADD_REMINDER, CLEAR_REMINDER, REMOVE_REMINDER } from "../types/types";
import { bake_cookie, read_cookie } from "sfcookies";

const reminders = (state = [], action) => {
  // let reminders = null;
  // state = read_cookie("reminders");

  // Read the cookie only if the state is empty
  if (state.length === 0) {
    state = read_cookie("reminders") || [];
  }

  let reminders = null;

  switch (action.type) {
    case ADD_REMINDER:
      reminders = [
        ...state,
        { text: action.text, date: action.date, id: Math.random() },
      ];
      bake_cookie("reminders", reminders);
      // console.log("from reducer", reminders);
      return reminders;

    case REMOVE_REMINDER:
      reminders = state.filter((reminder) => reminder.id !== action.id);
      bake_cookie("reminders", reminders);
      // console.log("from reducer", reminders);
      return reminders;

    case CLEAR_REMINDER:
      reminders = [];
      bake_cookie("reminders", reminders);
      // console.log("from reducer", reminders);
      return reminders;

    default:
      return state;
  }
};

export default reminders;
