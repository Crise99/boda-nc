import { LinkPreset, type NavBarLink } from "@/types/config"
import { siteText } from "./site-texts"

export const LinkPresets: { [key in LinkPreset]: NavBarLink } = {
	[LinkPreset.Home]: {
		name: siteText.home,
		url: "/",
	},
	[LinkPreset.Gallery]: {
		name: siteText.gallery,
		url: "/gallery",
	},
	[LinkPreset.Invitation]: {
		name: siteText.invitation,
		url: "/invitation",
	},
}
