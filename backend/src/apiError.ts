type ErrorData = {
	[key: string]: string[] | string;
};

export default class ApiError {
	public message: string;
	public statusCode: number;
	public data?: ErrorData;

	constructor(message: string, statusCode: number, data?: ErrorData) {
		this.message = message;
		this.statusCode = statusCode;
		this.data = data;
	}

	static notFound(message: string, data?: ErrorData) {
		return new ApiError(message, 404, data);
	}

	static badRequest(message: string, data?: ErrorData) {
		return new ApiError(message, 400, data);
	}
}
