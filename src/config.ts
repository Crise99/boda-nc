import { LinkPreset, type NavBarConfig, type SiteConfig } from "@/types/config"

export const siteConfig: SiteConfig = {
	title: "Nuria y Cristian | 08 • 06 • 2025",
	subtitle: "Bienvenidos a nuestra boda",
	lang: "es",
}
export const navBarConfig: NavBarConfig = {
	links: [LinkPreset.Home, LinkPreset.Gallery, LinkPreset.Invitation],
}
