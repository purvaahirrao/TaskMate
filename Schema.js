const Joi=require('joi');

listSchema=Joi.object({
list:Joi.object(
    {
       title:Joi.string().required(),
       description:Joi.string().required(),
       image:Joi.string().allow("",null),
       duedate:Joi.date().required(),
       completed: Joi.boolean().default(false),
  
    }
).required()

});
module.exports={listSchema};