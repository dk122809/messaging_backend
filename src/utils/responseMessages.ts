const createdSuccess = (key) => {
  return `${key} created successfuly.`;
};

const updatedSuccess = (key) => {
  return `${key} updated successfuly.`;
};

const founddSuccess = (key) => {
  return `${key} found successfuly.`;
};

const joinedSuccess = (key) => {
  return `${key} joined successfuly.`;
};

// custom error message
// user
const USERNAME_TAKEN = "Sorry, that username is taken.";
const UNAUTHORIZED = "Unauthorized user.";
const LOGIN_SUCCESS = "User login successfuly.";

// team / thread
const TEAM_NAME_TAKEN = "Sorry, that team name is taken.";
const USER_ALREADY_IN_TEAM = "This user is already in the given team / thread.";

export {
  createdSuccess,
  updatedSuccess,
  founddSuccess,
  joinedSuccess,
  USERNAME_TAKEN,
  UNAUTHORIZED,
  TEAM_NAME_TAKEN,
  USER_ALREADY_IN_TEAM,
  LOGIN_SUCCESS,
};
