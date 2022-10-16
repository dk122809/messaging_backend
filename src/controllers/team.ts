import {
  createdSuccess,
  founddSuccess,
  joinedSuccess,
  TEAM_NAME_TAKEN,
  USER_ALREADY_IN_TEAM,
} from "../utils/responseMessages";
import httpStatus from "http-status";
import Team from "../models/team";

/**
 * create team and returns team detail
 * @public
 */
const create = async function (req, res, next) {
  try {
    const { id } = req.userData;
    const data = {
      name: req.body.name,
      team_lead: id,
      member: [id],
    };
    const team = await (await Team.create(data)).populate("member team_lead", "name");
    return next({
      statusCode: httpStatus.CREATED,
      status: true,
      message: createdSuccess("Team"),
      data: team,
    });
  } catch (err) {
    let payload = {
      statusCode: httpStatus.BAD_REQUEST,
      status: false,
      message: err.message,
    };
    if (err.code === 11000) {
      payload.message = TEAM_NAME_TAKEN;
      payload["error"] = [{ username: TEAM_NAME_TAKEN }];
    }
    return next(payload);
  }
};

/**
 * find all team and returns teams detail
 * @public
 */
const find = async function (req, res, next) {
  try {
    const teams = await Team.find()
      .populate("member team_lead", "name")
      .select("name createdAt updatedAt team_lead");
    return next({
      statusCode: httpStatus.OK,
      status: true,
      message: founddSuccess("Teams"),
      data: teams,
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
 * join team and returns teams detail
 * @public
 */
const join = async function (req, res, next) {
  try {
    const { id } = req.userData;
    let foundTeam = await Team.findById(req.body.teamId);
    if (foundTeam.member.includes(id)) {
      return next({
        statusCode: httpStatus.BAD_REQUEST,
        status: false,
        message: USER_ALREADY_IN_TEAM,
      });
    }
    foundTeam.member.push(id);
    await foundTeam.save();
    const updatedTeam = await Team.findById(req.body.teamId)
      .populate("member team_lead", "name")
      .select("name createdAt updatedAt team_lead");
    return next({
      statusCode: httpStatus.OK,
      status: true,
      message: joinedSuccess("Teams"),
      data: updatedTeam,
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
 * get user joined team and returns teams detail
 * @public
 */
const joinedTeam = async function (req, res, next) {
  try {
    const { id } = req.userData;
    const teams = await Team.find({
      member: {
        $in: [id],
      },
    })
      .populate("member team_lead", "name")
      .select("name createdAt updatedAt team_lead");
    return next({
      statusCode: httpStatus.OK,
      status: true,
      message: founddSuccess("Teams"),
      data: teams,
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

export { create, find, join, joinedTeam };
