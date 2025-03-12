export interface WeddingFormData {
	name: string;
	email: string;
	telefono: string;
	asistentes: string;
	hasVegans: "yes" | "no";
	vegans?: string;
	hasAllergies: "yes" | "no";
	allergies?: string;
}
