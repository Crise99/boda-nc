import { getCollection } from "astro:content";

export async function getSortedExperiences(
	sortBy: "order" | "date",
	orderBy: "asc" | "desc",
): Promise<any[]> {
	const experiences = await getCollection("experiences", ({ data }) => {
		return data.draft !== true;
	});

	const sortFuncitons: Record<string, (a: any, b: any) => number> = {
		order: (a, b) => {
			if (a.data.order === b.data.order) return 0;
			return orderBy === "asc"
				? a.data.order > b.data.order
					? 1
					: -1
				: a.data.order < b.data.order
					? 1
					: -1;
		},
		date: (a, b) => {
			const dateA = new Date(a.data.date);
			const dateB = new Date(b.data.date);
			if (dateA === dateB) return 0;
			return orderBy === "asc" ? (dateA > dateB ? 1 : -1) : dateA < dateB ? 1 : -1;
		},
	};

	return experiences.sort(sortFuncitons[sortBy]);
}
