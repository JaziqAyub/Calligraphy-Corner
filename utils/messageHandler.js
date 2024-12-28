const messageHandler = async (res, status, messsage, payload)=>{
return res.status(status).json({messsage : messsage, payload : payload})
}
module.exports = {messageHandler}