import { LinkPreset, type NavBarLink } from "@/types/config"
import { SiteText } from "./site-texts"

export const LinkPresets: { [key in LinkPreset]: NavBarLink } = {
	[LinkPreset.Home]: {
		name: SiteText.home,
		url: "/",
	},
	[LinkPreset.Gallery]: {
		name: SiteText.gallery,
		url: "/gallery",
	},
	[LinkPreset.Invitation]: {
		name: SiteText.invitation,
		url: "/invitation",
	},
}
