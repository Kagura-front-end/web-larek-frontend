export class OrderService {
	private payment?: string;
	private address?: string;
	private email?: string;
	private phone?: string;

	setPayment(method: string) {
		this.payment = method;
	}

	getPayment() {
		return this.payment;
	}

	setAddress(value: string) {
		this.address = value;
	}

	getAddress() {
		return this.address;
	}

	setEmail(value: string) {
		this.email = value;
	}

	getEmail() {
		return this.email;
	}

	setPhone(value: string) {
		this.phone = value;
	}

	getPhone() {
		return this.phone;
	}

	reset() {
		this.payment = undefined;
		this.address = undefined;
		this.email = undefined;
		this.phone = undefined;
	}
}
