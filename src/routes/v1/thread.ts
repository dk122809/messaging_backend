import express from "express";
import { create, join, find } from "../../controllers/thread";
import requestValidator from "../../middlewares/requestValidation";
import { threadCreate, threadJoin } from "../../validations/thread";

const router = express.Router();

router
  .route("/")
  /**
   * @api {post} thread/ create
   * @apiHeader {String} Authorization bearer bd970a05-0ec1-4412-8b28-657962f0f778
   * @apiDescription Create a new thread
   * @apiVersion 1.0.0
   * @apiName ThreadCreate
   * @apiGroup Thread
   * @apiPermission public
   *
   * @apiParam  {Boolean}          is_group     Thread is group or not
   * @apiParam  {String}          group_name     Name of the group (optional parameter)
   *
   * @apiSuccess (Created 201) {Boolean}  status     response status
   * @apiSuccess (Created 201) {String}  message   response message
   * @apiSuccess (Created 201) {Object}  data    created thread data
   *
   * @apiError (Bad Request 400) {Boolean}  status  response status
   * @apiError (Bad Request 400) {String}  message  response message
   * @apiError (Bad Request 400) {Object}  error  errors in json
   * @apiError (Bad Request 400) {Object}  data  empty array
   */
  .post(requestValidator(threadCreate), create)

  /**
   * @api {get} thread/ get
   * @apiHeader {String} Authorization bearer bd970a05-0ec1-4412-8b28-657962f0f778
   * @apiDescription find all thread containing user id
   * @apiVersion 1.0.0
   * @apiName ThreadFind
   * @apiGroup Thread
   * @apiPermission public
   *
   * @apiSuccess (Ok 200) {Boolean}  status     response status
   * @apiSuccess (Ok 200) {String}  message   response message
   * @apiSuccess (Ok 200) {Object}  data    find thread data
   *
   * @apiError (Bad Request 400) {Boolean}  status  response status
   * @apiError (Bad Request 400) {String}  message  response message
   * @apiError (Bad Request 400) {Object}  error  errors in json
   * @apiError (Bad Request 400) {Object}  data  empty array
   */
   .get(find)


router
  .route("/join")
  /**
   * @api {post} thread/join join
   * @apiHeader {String} Authorization bearer bd970a05-0ec1-4412-8b28-657962f0f778
   * @apiDescription join a thread
   * @apiVersion 1.0.0
   * @apiName ThreadJoin
   * @apiGroup Thread
   * @apiPermission public
   *
   * @apiParam  {String}          threadId     thread id which have to be join
   *
   * @apiSuccess (Ok 200) {Boolean}  status     response status
   * @apiSuccess (Ok 200) {String}  message   response message
   * @apiSuccess (Ok 200) {Object}  data    joined thread data
   *
   * @apiError (Bad Request 400) {Boolean}  status  response status
   * @apiError (Bad Request 400) {String}  message  response message
   * @apiError (Bad Request 400) {Object}  error  errors in json
   * @apiError (Bad Request 400) {Object}  data  empty array
   */
  .post(requestValidator(threadJoin), join);

export default router;
