import Joi from "joi";

const teamCreate = Joi.object({
  name: Joi.string().required().max(128),
});

const teamJoin = Joi.object({
  teamId: Joi.string().required(),
});


export { teamCreate, teamJoin };
  
