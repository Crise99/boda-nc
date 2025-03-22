export const prerender = false;
import type { WeddingFormData } from "@config/cookies.json";
import siteData from "@config/siteData.json";
import WeddingEmail from "@emails/weddingEmail";
import { render } from "@react-email/render";
import type { APIRoute } from "astro";
import { Resend } from "resend";

const resend = new Resend(import.meta.env.RESEND_API_KEY);

export const POST: APIRoute = async ({ request, redirect }) => {
	try {
		// Get form data and ensure type safety
		const formData = await request.formData();
		const formValues: WeddingFormData = {
			name: formData.get("name")?.toString() || "",
			telefono: formData.get("telefono")?.toString() || "",
			passengers: formData.get("passengers")?.toString() || "1",
			hasFoodRestriction: (formData.get("hasFoodRestriction")?.toString() === "yes"
				? "yes"
				: "no") as "yes" | "no",
			restrictions: formData.get("restrictions")?.toString() || "",
			vegans: formData.get("vegans")?.toString() || "0",
			message: formData.get("message")?.toString() || "",
			passengerNames: formData.get("passengerNames")?.toString() || "",
			stayAtVenue: formData.get("stayAtVenue")?.toString() === "true" ? true : false,
		};

		// Create the email with typed content
		const emailContent = WeddingEmail(formValues);
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
			return redirect("/invitation/?error=true#contact-form", 302);
		}

		return redirect("/invitation/?success=true#contact-form", 302);
	} catch (error) {
		console.error("Error processing form:", error);
		return redirect("/invitation/?error=true#contact-form", 302);
	}
};
