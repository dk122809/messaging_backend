import User from "../models/user";
import jwt from "jsonwebtoken";
import { config } from "../config/vars";
import {
  createdSuccess,
  LOGIN_SUCCESS,
  USERNAME_TAKEN,
  UNAUTHORIZED,
} from "../utils/responseMessages";
import httpStatus from "http-status";

/**
 * Returns user data and token if registration was successful
 * @public
 */
const signup = async function (req, res, next) {
  try {
    let user = await User.create(req.body);
    let { id, username, name } = user;

    let token = jwt.sign(
      {
        id,
      },
      config.secret_key
    );
    return next({
      statusCode: httpStatus.CREATED,
      status: true,
      message: createdSuccess("User"),
      data: {
        id,
        username,
        name,
        token,
      },
    });
  } catch (err) {
    let payload = {
      statusCode: httpStatus.BAD_REQUEST,
      status: false,
      message: err.message,
    };
    if (err.code === 11000) {
      payload.message = USERNAME_TAKEN;
      payload["error"] = [{ username: USERNAME_TAKEN }];
    }
    return next(payload);
  }
};

/**
 * Returns user data and token if login was successful
 * @public
 */
const signin = async function (req, res, next) {
  try {
    // finding a user
    let user = await User.findOne({
      username: req.body.username,
    });
    // checking if their password matches what was sent to the server
    let { id, username, name } = user;
    let isMatch = await user.comparePassword(req.body.password);
    // if it all matches
    if (isMatch) {
      let token = jwt.sign(
        {
          id,
        },
        config.secret_key
      );
      return next({
        statusCode: httpStatus.OK,
        status: true,
        message: LOGIN_SUCCESS,
        data: {
          id,
          username,
          name,
          token,
        },
      });
    }
    return next({
      statusCode: httpStatus.UNAUTHORIZED,
      status: false,
      message: UNAUTHORIZED,
      error: [],
    });
  } catch (err) {
    return next({
      statusCode: httpStatus.BAD_REQUEST,
      status: false,
      message: err.message,
    });
  }
};

export { signup, signin };
