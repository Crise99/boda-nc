export interface SiteDataProps {
	name: String;
	title: string;
	description: string;
	useViewTransitions?: boolean; // defaults to false. Set to true to enable some Astro 3.0 view transitions
	author: {
		name: string;
		email: string;
		twitter: string; // used for twitter cards when sharing a blog post on twitter
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
}

// Update this file with your site specific information
const siteData: SiteDataProps = {
	name: "Nuria & Cristian",
	// Your website's title and description (meta fields)
	title: "Boda Nuria & Crisitan - Acompañanos en la aventura de nuestras vidas",
	description:
		"En esta web podrás encontrar toda la informacion necesaria para el dia de nuestra boda.",
	useViewTransitions: true,
	// Your information!
	author: {
		name: "Cosmic Themes",
		email: "creator@cosmicthemes.com",
		twitter: "Cosmic_Themes",
	},

	// default image for meta tags if the page doesn't have an image already
	defaultImage: {
		src: "/images/cosmic-themes-logo.jpg",
		alt: "Cosmic Themes logo",
	},
	contact: {
		from: "Boda Nuria y Cristian <onboarding@resend.dev>",
		to: "valenlj7@gmail.com",
		subject: "Nueva confirmación de asistencia",
	},
};

export default siteData;
