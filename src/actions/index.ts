import siteData from "@config/siteData.json";
import { ActionError, defineAction } from "astro:actions";
import { z } from "astro:schema";
import { Resend } from "resend";

const resend = new Resend(import.meta.env.RESEND_API_KEY);

console.log(resend.apiKeys);

export const server = {
	send: defineAction({
		accept: "form",
		input: z.object({
			name: z.string(),
			email: z.string().email(),
			telefono: z.string(),
			asistentes: z.string(),
			mensaje: z.string(),
		}),
		handler: async ({ name, email, telefono, asistentes, mensaje }) => {
			const { data, error } = await resend.emails.send({
				from: siteData.contact.from,
				to: [siteData.contact.to],
				subject: siteData.contact.subject,
				html: `<strong>Nueva Confirmación!</strong><br>
               <p><strong>Nombre:</strong> ${name}</p>
               <p><strong>Email:</strong> ${email}</p>
               <p><strong>Teléfono:</strong> ${telefono}</p>
               <p><strong>Asistentes:</strong> ${asistentes}</p>
               <p><strong>Mensaje:</strong> ${mensaje}</p>`,
			});

			if (error) {
				throw new ActionError({
					code: "BAD_REQUEST",
					message: error.message,
				});
			}

			return data;
		},
	}),
};
