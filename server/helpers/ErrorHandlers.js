class ApiError extends Error {

	constructor(status, messages = [], parentError = null) {
		if(messages.length == 0) {
			messages = [`Error: ${status}`];
		} else {
			if(typeof messages == 'string') {
				messages = [messages];
			}
		}
		super(messages[0]);
		this.messages = messages;
		this.status = status;
		this.name = this.constructor.name;
		if(this.parentError) {
			this.source = parentError;
		}
		console.error(this);
	}
  
}



module.exports = {
	ApiError
};