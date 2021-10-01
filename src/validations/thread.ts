import Joi from "joi";

const threadCreate = Joi.object({
  is_group: Joi.boolean().required(),
  group_name: Joi.boolean().optional(),
});

const threadJoin = Joi.object({
    threadId: Joi.string().required(),
  });

export { threadCreate, threadJoin };
  
