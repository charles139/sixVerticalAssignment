export interface IUsers {
	id: number,
	name: string,
	email: string,
	address: {
		street: string,
		suite: string,
		city: string,
		zipcode: string
	},
	phone: string
}