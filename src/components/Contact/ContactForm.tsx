import { useState } from "react";
import type { ChangeEvent } from "react";
import type { FormEvent } from "react";
import { toast } from "sonner";
import Cookies from "js-cookie";
import Loading from "@components/Loading/Loading";
import { COOKIES } from "@constants/cookies";
import "@/styles/client.css";

interface FormState {
	name: string;
	email: string;
	telefono: string;
	asistentes: string;
	hasVegans: "yes" | "no";
	vegans: string;
	hasAllergies: "yes" | "no";
	allergies: string;
	message: string;
}

export default function ContactForm() {
	// Form state
	const [formData, setFormData] = useState<FormState>({
		name: "",
		email: "",
		telefono: "",
		asistentes: "",
		hasVegans: "no",
		vegans: "",
		hasAllergies: "no",
		allergies: "",
		message: "",
	});
	const [loading, setLoading] = useState(false);

	// Validations
	const validateForm = (): boolean => {
		// Validate vegans count
		if (formData.hasVegans === "yes") {
			const vegansCount = parseInt(formData.vegans);
			const asistentesCount = parseInt(formData.asistentes);
			if (vegansCount > asistentesCount) {
				toast.info("El número de comensales veganos no puede ser mayor que el total de asistentes");
				return false;
			}
		}

		return true;
	};

	// Handle form inputs
	const handleInputChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
		const { name, value } = e.target;
		setFormData((prev) => ({ ...prev, [name]: value }));
	};
	const handleRadioChange = (e: ChangeEvent<HTMLInputElement>) => {
		const { name, value } = e.target;
		setFormData((prev) => ({
			...prev,
			[name]: value,
			// Clear dependent fields when switching options
			...(name === "hasVegans" && value === "no" && { vegans: "" }),
			...(name === "hasAllergies" && value === "no" && { allergies: "" }),
		}));
	};

	// Handle form submission
	const handleSubmit = async (e: FormEvent) => {
		e.preventDefault();
		if (!validateForm()) {
			return;
		}
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
			const cookieData = {
				name: formData.name,
				email: formData.email,
				telefono: formData.telefono,
				asistentes: formData.asistentes,
				hasVegans: formData.hasVegans,
				vegans: formData.vegans,
				hasAllergies: formData.hasAllergies,
				allergies: formData.allergies,
			};

			// Set cookie with 100 days expiration
			Cookies.set(COOKIES.WEDDING_FORM, JSON.stringify(cookieData), { expires: 100 });

			// Reset form
			setFormData({
				name: "",
				email: "",
				telefono: "",
				asistentes: "",
				hasVegans: "no",
				vegans: "",
				hasAllergies: "no",
				allergies: "",
				message: "",
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
						Nombre completo
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
				<div className="flex flex-col gap-1">
					<label htmlFor="contact-email" className="font-heading-1 text-lg uppercase">
						E-mail
					</label>
					<input
						type="email"
						pattern="[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}"
						className="form__input"
						name="email"
						id="contact-email"
						value={formData.email}
						onChange={handleInputChange}
						required
					/>
				</div>

				<div>
					<label htmlFor="contact-tel" className="font-heading-1 text-lg uppercase">
						Teléfono de contacto
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
					<label htmlFor="contact-asistentes" className="font-heading-1 text-lg uppercase">
						Número de asistentes
					</label>
					<input
						type="number"
						className="form__input"
						name="asistentes"
						id="contact-asistentes"
						max="10"
						value={formData.asistentes}
						onChange={handleInputChange}
						required
					/>
				</div>

				<div>
					<label className="font-heading-1 text-lg uppercase">¿Algún comensal es vegano?</label>
					<div className="mt-2 flex gap-4">
						<label className="inline-flex items-center">
							<input
								type="radio"
								name="hasVegans"
								value="no"
								checked={formData.hasVegans === "no"}
								onChange={handleRadioChange}
								className="form-radio text-primary-600 border-primary-600 ring-primary-600"
							/>
							<span className="ml-2">No</span>
						</label>
						<label className="inline-flex items-center">
							<input
								type="radio"
								name="hasVegans"
								value="yes"
								checked={formData.hasVegans === "yes"}
								onChange={handleRadioChange}
								className="form-radio text-primary-600 border-primary-600 ring-primary-600"
							/>
							<span className="ml-2">Sí</span>
						</label>
					</div>
				</div>

				{formData.hasVegans === "yes" && (
					<div>
						<label htmlFor="contact-vegans" className="font-heading-1 text-lg uppercase">
							Número de comensales veganos
						</label>
						<input
							type="number"
							name="vegans"
							className="form__input"
							id="contact-vegans"
							min="1"
							max="10"
							value={formData.vegans}
							onChange={handleInputChange}
							required
						/>
					</div>
				)}

				<div>
					<label className="font-heading-1 text-lg uppercase">
						¿Tienes alguna alergia alimentaria?
					</label>
					<div className="mt-2 flex gap-4">
						<label className="inline-flex items-center">
							<input
								type="radio"
								name="hasAllergies"
								value="no"
								checked={formData.hasAllergies === "no"}
								onChange={handleRadioChange}
								className="form-radio text-primary-600 border-primary-600 ring-primary-600"
							/>
							<span className="ml-2">No</span>
						</label>
						<label className="inline-flex items-center">
							<input
								type="radio"
								name="hasAllergies"
								value="yes"
								checked={formData.hasAllergies === "yes"}
								onChange={handleRadioChange}
								className="form-radio text-primary-600 border-primary-600 ring-primary-600"
							/>
							<span className="ml-2">Sí</span>
						</label>
					</div>
				</div>

				{formData.hasAllergies === "yes" && (
					<div>
						<label htmlFor="contact-allergies" className="font-heading-1 text-lg uppercase">
							Especifica tus alergias
						</label>
						<textarea
							name="allergies"
							className="form__input"
							id="contact-allergies"
							rows={3}
							value={formData.allergies}
							onChange={handleInputChange}
							placeholder="Por favor, indica tus alergias alimentarias"
							required
						/>
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
