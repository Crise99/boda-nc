export type SiteConfig = {
	title: string
	subtitle: string
	lang: string
}

export enum LinkPreset {
	Home = 0,
	Gallery = 1,
	Invitation = 2,
}

export type NavBarLink = {
	name: string
	url: string
	newTab?: boolean
	external?: boolean
}

export type NavBarConfig = {
	links: (NavBarLink | LinkPreset)[]
}
