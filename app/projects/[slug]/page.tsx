import { PROJECT_CATEGORIES } from "@/lib/projectsData";
import CategoryClient from "./CategoryClient";

// Generate all category slugs at build time for static export
export function generateStaticParams() {
  return PROJECT_CATEGORIES.map((cat) => ({ slug: cat.slug }));
}

export default function CategoryPage() {
  return <CategoryClient />;
}
