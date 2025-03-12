export interface SiteDataProps {
	name: String;
	title: string;
	description: string;
	useViewTransitions?: boolean; // defaults to false. Set to true to enable some Astro 3.0 view transitions
	author: {
		name: string;
		email: string;
	};
	defaultImage: {
		src: string;
		alt: string;
	};
	contact: {
		from: string;
		to: string;
		subject: string;
	};
	wedding: {
		date: string;
		account: string;
		dateDetail: {
			wday: string;
			time: string;
			day: string;
			month: string;
			year: string;
		};
	};
}

// Update this file with your site specific information
const siteData: SiteDataProps = {
	name: "Nuria & Cristian",
	title: "Boda Nuria & Crisitan - Acompañanos en la aventura de nuestras vidas",
	description:
		"En esta web podrás encontrar toda la informacion necesaria para el dia de nuestra boda.",
	useViewTransitions: true,
	author: {
		name: "Crise99 & vLorente",
		email: "",
	},

	// default image for meta tags if the page doesn't have an image already
	defaultImage: {
		src: "/images/cosmic-themes-logo.jpg",
		alt: "Nuria & Cristian logo",
	},
	contact: {
		from: "Boda Nuria y Cristian <onboarding@resend.dev>",
		to: import.meta.env.RESEND_USER_EMAIL,
		subject: "Nueva confirmación de asistencia",
	},
	wedding: {
		date: "2025-06-08T17:00:00Z",
		account: "ES1111111111111111111111",
		dateDetail: {
			wday: "Domingo",
			time: "17:00",
			day: "08",
			month: "Junio",
			year: "2025",
		},
	},
};

export default siteData;
