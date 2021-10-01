import {
  createdSuccess,
  founddSuccess,
  joinedSuccess,
  USER_ALREADY_IN_TEAM,
} from "../utils/responseMessages";
import httpStatus from "http-status";
import Thread from "../models/thread";

/**
 * create thread and returns thread detail
 * @public
 */
const create = async function (req, res, next) {
  try {
    const { id } = req.userData;
    const data = {
      ...req.body,
      participants: [id],
    };
    const thread = await (
      await Thread.create(data)
    ).populate("participants", "name");
    return next({
      statusCode: httpStatus.CREATED,
      status: true,
      message: createdSuccess("Thread"),
      data: thread,
    });
  } catch (err) {
    let payload = {
      statusCode: httpStatus.BAD_REQUEST,
      status: false,
      message: err.message,
    };
    return next(payload);
  }
};

/**
 * join thread and returns thread detail
 * @public
 */
const join = async function (req, res, next) {
  try {
    const { id } = req.userData;
    let foundThread = await Thread.findById(req.body.threadId);
    if (foundThread.participants.includes(id)) {
      return next({
        statusCode: httpStatus.BAD_REQUEST,
        status: false,
        message: USER_ALREADY_IN_TEAM,
      });
    }
    foundThread.participants.push(id);
    const threadJoined = await (
      await foundThread.save()
    ).populate("participants", "name");
    return next({
      statusCode: httpStatus.OK,
      status: true,
      message: joinedSuccess("Thread"),
      data: threadJoined,
    });
  } catch (err) {
    let payload = {
      statusCode: httpStatus.BAD_REQUEST,
      status: false,
      message: err.message,
    };
    return next(payload);
  }
};

/**
 * find all thread of specific user and returns thread details
 * @public
 */
const find = async function (req, res, next) {
  try {
    const { id } = req.userData;
    const threads = await Thread.find({ participants: { $in: id } }).populate("participants", "name");
    return next({
      statusCode: httpStatus.OK,
      status: true,
      message: founddSuccess("Thread"),
      data: threads,
    });
  } catch (err) {
    let payload = {
      statusCode: httpStatus.BAD_REQUEST,
      status: false,
      message: err.message,
    };
    return next(payload);
  }
};

export { create, join, find };
