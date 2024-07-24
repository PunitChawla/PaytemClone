const zod = require("zod");
const userStructure = zod.object({
    username : zod.string().email(),
    password : zod.string(),
    firstname : zod.string(),
    lastname : zod.string(),
})

const signinStructure = zod.object({
    username : zod.string().email(),
    password : zod.string()
})


module.exports = {
    userStructure,
    signinStructure
}