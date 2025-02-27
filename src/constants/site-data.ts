import type { SiteDataProps } from "@/types/config"

export const siteData: SiteDataProps = {
	name: "Nuria & Cristian",
	// Your website's title and description (meta fields)
	title: "Bienvenidos a la boda de Nuria y Cristian",
	description:
		"En esta web podrás encontrar toda la informacion necesaria para el dia de nuestra boda",
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
}
