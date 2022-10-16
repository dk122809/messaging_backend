import express from "express";
import { create, find, join, joinedTeam } from "../../controllers/team";
import requestValidator from "../../middlewares/requestValidation";
import { teamCreate, teamJoin } from "../../validations/team";

const router = express.Router();

router
  .route("/")
  /**
   * @api {post} team/ create
   * @apiHeader {String} Authorization bearer bd970a05-0ec1-4412-8b28-657962f0f778
   * @apiDescription Create a new team
   * @apiVersion 1.0.0
   * @apiName TeamCreate
   * @apiGroup Team
   * @apiPermission public
   *
   * @apiParam  {String{1..128}}          name     Team name
   *
   * @apiSuccess (Created 201) {Boolean}  status     response status
   * @apiSuccess (Created 201) {String}  message   response message
   * @apiSuccess (Created 201) {Object}  data    created team data
   *
   * @apiError (Bad Request 400) {Boolean}  status  response status
   * @apiError (Bad Request 400) {String}  message  response message
   * @apiError (Bad Request 400) {Object}  error  errors in json
   * @apiError (Bad Request 400) {Object}  data  empty array
   */
  .post(requestValidator(teamCreate), create)

  /**
   * @api {put} team/ join
   * @apiHeader {String} Authorization bearer bd970a05-0ec1-4412-8b28-657962f0f778
   * @apiDescription join team
   * @apiVersion 1.0.0
   * @apiName TeamJoin
   * @apiGroup Team
   * @apiPermission public
   *
   * @apiQuery  {String}          teamId     team unique id
   *
   * @apiSuccess (Ok 200) {Boolean}  status     response status
   * @apiSuccess (Ok 200) {String}  message   response message
   * @apiSuccess (Ok 200) {Object}  data    updated team detail
   *
   * @apiError (Bad Request 400) {Boolean}  status  response status
   * @apiError (Bad Request 400) {String}  message  response message
   * @apiError (Bad Request 400) {Object}  error  errors in json
   * @apiError (Bad Request 400) {Object}  data  empty array
   */
  .put(requestValidator(teamJoin), join)

  /**
   * @api {get} team/ getTeam
   * @apiHeader {String} Authorization bearer bd970a05-0ec1-4412-8b28-657962f0f778
   * @apiDescription find all team
   * @apiVersion 1.0.0
   * @apiName FindTeam
   * @apiGroup Team
   * @apiPermission public
   *
   * @apiSuccess (Ok 200) {Boolean}  status     response status
   * @apiSuccess (Ok 200) {String}  message   response message
   * @apiSuccess (Ok 200) {Object}  data    all team details
   *
   * @apiError (Bad Request 400) {Boolean}  status  response status
   * @apiError (Bad Request 400) {String}  message  response message
   * @apiError (Bad Request 400) {Object}  error  errors in json
   * @apiError (Bad Request 400) {Object}  data  empty array
   */
  .get(find);

/**
 * @api {get} team/joinedTeam get user joined team
 * @apiHeader {String} Authorization bearer bd970a05-0ec1-4412-8b28-657962f0f778
 * @apiDescription find all joined team
 * @apiVersion 1.0.0
 * @apiName FindJoinedTeam
 * @apiGroup Team
 * @apiPermission public
 *
 * @apiSuccess (Ok 200) {Boolean}  status     response status
 * @apiSuccess (Ok 200) {String}  message   response message
 * @apiSuccess (Ok 200) {Object}  data    all team details
 *
 * @apiError (Bad Request 400) {Boolean}  status  response status
 * @apiError (Bad Request 400) {String}  message  response message
 * @apiError (Bad Request 400) {Object}  error  errors in json
 * @apiError (Bad Request 400) {Object}  data  empty array
 */
router.get("/joinedTeam", joinedTeam);

export default router;
