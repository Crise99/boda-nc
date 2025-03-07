export const prerender = false;
import siteData from "@config/siteData.json";
import WeddingEmail from "@emails/weddingEmail";
import { render } from "@react-email/render";
import type { APIRoute } from "astro";
import { Resend } from "resend";

const resend = new Resend(import.meta.env.RESEND_API_KEY);

export const POST: APIRoute = async ({ request, redirect }) => {
	try {
		// Get form data
		const formData = await request.formData();
		const name = formData.get("name")?.toString() || "";
		const email = formData.get("email")?.toString() || "";
		const telefono = formData.get("telefono")?.toString() || "";
		const asistentes = formData.get("asistentes")?.toString() || "";
		const mensaje = formData.get("message")?.toString() || "";
		const hasVegans = formData.get("hasVegans")?.toString() || "";
		const vegans = formData.get("vegans")?.toString() || "";
		const hasAllergies = formData.get("hasAllergies")?.toString() || "";
		const allergies = formData.get("allergies")?.toString() || "";

		// Create the email
		const emailContent = WeddingEmail({
			name,
			email,
			telefono,
			asistentes,
			mensaje,
			hasAllergies,
			allergies,
			hasVegans,
			vegans,
		});
		const html = await render(emailContent);
		const text = await render(emailContent, {
			plainText: true,
		});

		// send an email
		const { error } = await resend.emails.send({
			from: siteData.contact.from,
			to: siteData.contact.to,
			subject: siteData.contact.subject,
			html,
			text,
		});

		if (error) {
			console.error("Error processing form:", error);
			return redirect("/?error=true#contact-form", 302);
		}

		return redirect("/?success=true#contact-form", 302);
	} catch (error) {
		console.error("Error processing form:", error);
		return redirect("/?error=true#contact-form", 302);
	}
};
