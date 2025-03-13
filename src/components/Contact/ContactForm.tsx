import { useState } from "react";
import type { ChangeEvent } from "react";
import type { FormEvent } from "react";
import { toast } from "sonner";
import Cookies from "js-cookie";
import Loading from "@components/Loading/Loading";
import { COOKIES } from "@constants/cookies";
import "@/styles/global.css";
import type { WeddingFormState } from "@config/cookies.json";

export default function ContactForm() {
	// Form state
	const [formData, setFormData] = useState<WeddingFormState>({
		name: "",
		telefono: "",
		passengers: "1",
		vegans: "0",
		hasFoodRestriction: "no",
		restrictions: "",
		message: "",
		passengerNames: [],
	});
	const [loading, setLoading] = useState(false);

	// Handle form inputs
	const handleInputChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
		const { name, value } = e.target;
		setFormData((prev) => ({ ...prev, [name]: value }));

		// Update passenger names array when number of passengers changes
		if (name === "passengers") {
			const newNumPassengers = parseInt(value);
			const currentNumPassengers = parseInt(formData.passengers);

			if (newNumPassengers <= 1) {
				// If new value is 1 or less, clear passenger names
				setFormData((prev) => ({ ...prev, passengerNames: [] }));
			} else {
				setFormData((prev) => {
					const updatedPassengerNames = [...prev.passengerNames];

					if (newNumPassengers > currentNumPassengers + 1) {
						// Add empty fields for new passengers
						const additionalFields = Array(newNumPassengers - currentNumPassengers - 1).fill("");
						updatedPassengerNames.push(...additionalFields);
					} else if (newNumPassengers < currentNumPassengers + 1) {
						// Remove excess fields while preserving existing data
						updatedPassengerNames.splice(newNumPassengers - 1);
					}

					return { ...prev, passengerNames: updatedPassengerNames };
				});
			}
		}
	};

	const handlePassengerNameChange = (index: number, value: string) => {
		const updatedPassengerNames = [...formData.passengerNames];
		updatedPassengerNames[index] = value;
		setFormData((prev) => ({ ...prev, passengerNames: updatedPassengerNames }));
	};

	const handleRadioChange = (e: ChangeEvent<HTMLInputElement>) => {
		const { name, value } = e.target;
		setFormData((prev) => ({
			...prev,
			[name]: value,
			// Clear dependent fields when switching options
			...(name === "hasFoodRestriction" && value === "no" && { restrictions: "" }),
			...(name === "hasFoodRestriction" && value === "no" && { vegans: "0" }),
		}));
	};

	// Handle form submission
	const handleSubmit = async (e: FormEvent) => {
		setLoading(true);
		try {
			const response = await fetch("/api/send", {
				method: "POST",
				body: new FormData(e.target as HTMLFormElement),
			});
			await handleResponse(response);
		} catch (error) {
			console.error("Error:", error);
		} finally {
			setLoading(false);
		}
	};

	// Handle response from the API
	const handleResponse = async (response: Response) => {
		if (!response.ok && response.status === 500) {
			toast.error(
				"Parece que no hemos podido enviar tu mensaje. 💔 Por favor, inténtalo de nuevo. O ponte en contacto con nosotros.",
			);
		}

		if (response.ok) {
			// Save form data to cookies
			const cookieData: WeddingFormState = {
				name: formData.name,
				telefono: formData.telefono,
				passengers: formData.passengers,
				vegans: formData.vegans,
				hasFoodRestriction: formData.hasFoodRestriction,
				restrictions: formData.restrictions,
				passengerNames: formData.passengerNames,
				message: formData.message,
			};

			// Set cookie with 100 days expiration
			Cookies.set(COOKIES.WEDDING_FORM, JSON.stringify(cookieData), { expires: 100 });

			// Reset form
			setFormData({
				name: "",
				telefono: "",
				passengers: "1",
				vegans: "0",
				hasFoodRestriction: "no",
				restrictions: "",
				message: "",
				passengerNames: [],
			});

			toast.success(
				"Gracias por embarcar con nosotros en este viaje. Nos pondremos en contacto contigo ❤️",
			);

			// TODO : Buscar solución más elegante
			// Reload page after successful submission
			window.location.reload();
		}
	};

	return (
		<>
			<form
				id="contact-form"
				onSubmit={handleSubmit}
				className="flex h-full flex-col justify-between gap-4"
			>
				<div>
					<label htmlFor="contact-name" className="font-heading-1 text-lg uppercase">
						Nombre
					</label>
					<input
						type="text"
						className="form__input"
						name="name"
						id="contact-name"
						value={formData.name}
						onChange={handleInputChange}
						required
					/>
				</div>
				<div>
					<label htmlFor="contact-tel" className="font-heading-1 text-lg uppercase">
						Teléfono
					</label>
					<input
						type="tel"
						pattern="[0-9]{9}"
						className="form__input"
						name="telefono"
						id="contact-tel"
						value={formData.telefono}
						onChange={handleInputChange}
						required
					/>
				</div>

				<div>
					<label htmlFor="contact-passengers" className="font-heading-1 text-lg uppercase">
						Número de pasajeros
					</label>
					<input
						type="number"
						className="form__input"
						name="passengers"
						id="contact-passengers"
						min="1"
						max="10"
						value={formData.passengers}
						onChange={handleInputChange}
						required
					/>
				</div>

				{formData.passengers && parseInt(formData.passengers) > 1 && (
					<div className="bg-primary-300/15 p-4">
						<label className="font-heading-1 text-lg uppercase">Nombres de los pasajeros</label>
						<input
							type="text"
							className="form__input mt-2"
							placeholder="Te has saltado el nombre 🫣"
							value={formData.name}
							required
							disabled
						/>
						{Array.from({ length: parseInt(formData.passengers) - 1 }).map((_, index) => (
							<input
								key={index}
								type="text"
								className="form__input mt-2"
								placeholder={`Pasajero ${index + 2}`}
								value={formData.passengerNames[index] || ""}
								onChange={(e) => handlePassengerNameChange(index, e.target.value)}
								required
							/>
						))}
					</div>
				)}

				<div>
					<label className="font-heading-1 text-lg uppercase">
						¿Alguna restricción alimentaria?
					</label>
					<div className="mt-2 flex gap-4">
						<label className="inline-flex items-center">
							<input
								type="radio"
								name="hasFoodRestriction"
								value="no"
								checked={formData.hasFoodRestriction === "no"}
								onChange={handleRadioChange}
								className="form-radio text-primary-600 border-primary-600 ring-primary-600"
							/>
							<span className="ml-2">No</span>
						</label>
						<label className="inline-flex items-center">
							<input
								type="radio"
								name="hasFoodRestriction"
								value="yes"
								checked={formData.hasFoodRestriction === "yes"}
								onChange={handleRadioChange}
								className="form-radio text-primary-600 border-primary-600 ring-primary-600"
							/>
							<span className="ml-2">Sí</span>
						</label>
					</div>
				</div>

				{formData.hasFoodRestriction === "yes" && (
					<div className="bg-primary-300/15 p-4">
						<div>
							<label htmlFor="contact-restriction" className="font-heading-1 text-lg uppercase">
								Especifica tus alergias o restricciones
							</label>
							<textarea
								name="restrictions"
								className="form__input"
								id="contact-restrictions"
								rows={3}
								value={formData.restrictions}
								onChange={handleInputChange}
								placeholder="Por favor, indicanos cualquier alergia o restricción de cualquiera de los pasajeros."
								required
							/>
						</div>
						<div>
							<label htmlFor="contact-vegans" className="font-heading-1 text-lg uppercase">
								¿Menús vegetarianos?
							</label>
							<input
								type="number"
								name="vegans"
								className="form__input"
								id="contact-vegans"
								min="1"
								max={formData.passengers}
								value={formData.vegans}
								onChange={handleInputChange}
								required
							/>
						</div>
					</div>
				)}

				<div>
					<label htmlFor="contact-message" className="font-heading-1 text-lg uppercase">
						Mensaje para los novios
					</label>
					<textarea
						name="message"
						className="form__input"
						id="contact-message"
						rows={6}
						value={formData.message}
						onChange={handleInputChange}
						placeholder="Comparte tus mejores deseos con los novios"
						required
					/>
				</div>

				{loading && (
					<div className="flex">
						<button className="button group button--primary w-full gap-4 px-10 md:w-fit" disabled>
							<Loading size="small"></Loading>
							<span>Enviando 💌</span>
						</button>
					</div>
				)}
				{!loading && (
					<div className="flex">
						<button
							type="submit"
							className="button group button--primary w-full gap-2 px-10 md:w-fit"
						>
							Enviar
						</button>
					</div>
				)}
			</form>
		</>
	);
}
