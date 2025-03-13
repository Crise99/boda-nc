export interface WeddingFormState {
	name: string;
	telefono: string;
	passengers: string;
	hasFoodRestriction: "yes" | "no";
	restrictions: string;
	vegans: string;
	message: string;
	passengerNames: string[];
}

export interface WeddingFormData {
	name: string;
	telefono: string;
	passengers: string;
	hasFoodRestriction: "yes" | "no";
	restrictions: string;
	vegans: string;
	message: string;
	passengerNames: string;
}
