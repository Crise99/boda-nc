import "@/styles/global.css";
import { useState } from "react";
import categories from "@/data/categories-info.json";
import styles from "@/components/Gallery/styles/Categories.module.css";
import Gallery from "@/components/Gallery/Gallery";
import Title from "@/components/Gallery/Title";

export default function Categories() {
	const [cat, setCategory] = useState<string>("1");
	return (
		<>
			<div className="flex flex-col items-center">
				<Title className="mt-24" title="Galería" subtitle="Todas las fotos de nuestra boda" />
				{/* Desktop buttons */}
				<div className="mt-24 hidden h-24 w-full md:flex">
					{categories.map(({ category, name }) => (
						<button
							key={category}
							className={`flex-1 rounded-t-2xl text-xl font-bold text-white transition-colors ${styles.tab} ${cat == category ? "z/10 bg-primary-200" : "bg-primary-400 hover:bg-primary-500"} `}
							onClick={() => setCategory(category)}
						>
							{name}
						</button>
					))}
				</div>
				{/* Mobile dropdown */}
				<div className="mt-24 flex w-full md:hidden">
					<select
						className="bg-primary-100 trasnsition-colors mx-8 w-full rounded-xl p-4 text-lg font-bold shadow-md"
						value={cat}
						onChange={(e) => setCategory(e.target.value)}
					>
						{categories.map(({ category, name }) => (
							<option key={category} value={category}>
								{name}
							</option>
						))}
					</select>
				</div>
			</div>
			<Gallery category={cat} />
		</>
	);
}
