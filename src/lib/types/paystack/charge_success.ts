export interface ChargeSuccess {
	event: string;
	data: {
		id: number;
		domain: string;
		status: string;
		reference: string;
		amount: number;
		message: null;
		gateway_response: string;
		paid_at: string;
		created_at: string;
		channel: string;
		currency: string;
		ip_address: string;
		metadata: number;
		log: {
			time_spent: number;
			attempts: number;
			authentication: string;
			errors: number;
			success: boolean;
			mobile: boolean;
			input: any[];
			channel?: any;
			history: {
				type: string;
				message: string;
				time: number;
			}[];
		};
		fees?: any;
		customer: {
			id: number;
			first_name: string;
			last_name: string;
			email?: any;
			customer_code?: any;
			phone?: any;
			metadata?: any;
			risk_action?: any;
		};
		authorization?: {
			authorization_code?: any;
			bin?: any;
			last4?: any;
			exp_month?: any;
			exp_year?: any;
			card_type?: any;
			bank?: any;
			country_code?: any;
			brand?: any;
			account_name?: string;
		};
		plan?: any;
	};
}
