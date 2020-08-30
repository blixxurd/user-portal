class ApiError extends Error {

	constructor(status, messages = [], parentError = null, data = {}) {
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
		if(parentError) {
			this.source = parentError;
		}
		if(data) {
			this.data = data;
		}
		console.error(this);
	}
  
}

module.exports = {
	ApiError
};