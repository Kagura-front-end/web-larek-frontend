export class Api {
	readonly baseUrl: string;
	protected options: RequestInit;

	constructor(baseUrl: string, options: RequestInit = {}) {
		this.baseUrl = baseUrl;
		this.options = {
			headers: {
				'Content-Type': 'application/json',
				...(options.headers ?? {}),
			},
		};
	}

	protected handleResponse<T>(response: Response): Promise<T> {
		if (response.ok) {
			return response.json() as Promise<T>;
		} else {
			return response.json().then(data =>
				Promise.reject(data.error ?? response.statusText),
			);
		}
	}

	public get<T>(uri: string): Promise<T> {
		return fetch(this.baseUrl + uri, {
			...this.options,
			method: 'GET',
		})
			.then((response) => this.handleResponse<T>(response))
			.catch((error) => {
				console.error('GET error:', error);
				return Promise.reject(error);
			});
	}

	public post<T>(
		uri: string,
		data: object,
		method: 'POST' | 'PUT' | 'DELETE' = 'POST',
	): Promise<T> {
		return fetch(this.baseUrl + uri, {
			...this.options,
			method,
			body: JSON.stringify(data),
		})
			.then((response) => this.handleResponse<T>(response))
			.catch((error) => {
				console.error(`${method} error:`, error);
				return Promise.reject(error);
			});
	}
}