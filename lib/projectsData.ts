// Centralised data for every project category and its individual projects.
// Pure module — safe to import from server and client code.
// Replace placeholder images with real ones in /public/images/projects/.

export interface ProjectItem {
  name: string;
  location: string;
  year: string;
  area: string;
  image: string;
}

export interface ProjectCategory {
  slug: string;
  name: string;
  shortName: string;
  description: string;
  coverImage: string;
  projects: ProjectItem[];
}

export const PROJECT_CATEGORIES: ProjectCategory[] = [
  {
    slug: "residential",
    name: "Residential Projects",
    shortName: "RESIDENTIAL",
    description:
      "Custom homes and villas designed around how you live — grounded in site, climate, and the rhythms of daily use.",
    coverImage: "/images/residential/res1.png",
    projects: [
      {
        name: "LAKE VIEW VILLA",
        location: "Erode",
        year: "2025",
        area: "3,200 sq ft",
        image: "/images/residential/res1.png",
      },
      {
        name: "COURTYARD RESIDENCE",
        location: "Salem",
        year: "2024",
        area: "2,800 sq ft",
        image: "/images/residential/res2.png",
      },
      {
        name: "HILLTOP BUNGALOW",
        location: "Ooty",
        year: "2024",
        area: "4,100 sq ft",
        image: "/images/residential/res3.png",
      },
      {
        name: "TWIN HOUSE",
        location: "Coimbatore",
        year: "2023",
        area: "2,400 sq ft",
        image: "/images/residential/res4.png",
      },
      {
        name: "GARDEN VILLA",
        location: "Tirunelveli",
        year: "2023",
        area: "3,600 sq ft",
        image: "/images/residential/res5.png",
      },
      {
        name: "MODERN DUPLEX",
        location: "Madurai",
        year: "2022",
        area: "2,900 sq ft",
        image: "/images/residential/res6.png",
      },
      {
        name: "PREMIUM RESIDENCE",
        location: "Coimbatore",
        year: "2022",
        area: "3,400 sq ft",
        image: "/images/residential/res7.png",
      },
      {
        name: "CORNER PLOT HOUSE",
        location: "Erode",
        year: "2021",
        area: "2,600 sq ft",
        image: "/images/residential/res8.png",
      },
      {
        name: "COMPACT VILLA",
        location: "Salem",
        year: "2021",
        area: "1,800 sq ft",
        image: "/images/residential/res9.png",
      },
      {
        name: "LUXURY BUNGALOW",
        location: "Ooty",
        year: "2021",
        area: "5,200 sq ft",
        image: "/images/residential/res10.png",
      },
      {
        name: "ELEVATION HOUSE",
        location: "Namakkal",
        year: "2020",
        area: "3,000 sq ft",
        image: "/images/residential/res11.png",
      },
      {
        name: "HERITAGE VILLA",
        location: "Tiruchirappalli",
        year: "2020",
        area: "4,500 sq ft",
        image: "/images/residential/res12.png",
      },
    ],
  },
  {
    slug: "commercial",
    name: "Commercial Projects",
    shortName: "COMMERCIAL",
    description:
      "Office blocks, retail spaces, and hospitality buildings — built for performance, presence, and lasting value.",
    coverImage: "/images/commercial/commercial-1.png",
    projects: [
      {
        name: "VLUX 3 STAR HOTEL",
        location: "Erode",
        year: "2025",
        area: "18,000 sq ft",
        image: "/images/commercial/commercial-1.png",
      },
      {
        name: "TECH PARK BLOCK A",
        location: "Coimbatore",
        year: "2024",
        area: "32,000 sq ft",
        image: "/images/commercial/commercial-2.png",
      },
      {
        name: "RETAIL COMPLEX",
        location: "Salem",
        year: "2024",
        area: "12,500 sq ft",
        image: "/images/commercial/commercial-3.png",
      },
      {
        name: "CORPORATE OFFICE",
        location: "Tiruchirappalli",
        year: "2023",
        area: "8,400 sq ft",
        image: "/images/commercial/commercial-4.png",
      },
      {
        name: "SHOPPING PLAZA",
        location: "Erode",
        year: "2023",
        area: "22,000 sq ft",
        image: "/images/commercial/commercial-5.png",
      },
      {
        name: "BUSINESS CENTER",
        location: "Madurai",
        year: "2022",
        area: "15,600 sq ft",
        image: "/images/commercial/commercial-6.png",
      },
      {
        name: "WAREHOUSE COMPLEX",
        location: "Namakkal",
        year: "2022",
        area: "40,000 sq ft",
        image: "/images/commercial/commercial-7.png",
      },
      {
        name: "COMMERCIAL TOWER",
        location: "Coimbatore",
        year: "2021",
        area: "28,000 sq ft",
        image: "/images/commercial/commercial-8.png",
      },
    ],
  },
  {
    slug: "apartment",
    name: "Apartment Projects",
    shortName: "APARTMENT",
    description:
      "Multi-storey residences that balance privacy with community — efficient plans, generous light, enduring structure.",
    coverImage: "/images/TWO BLOCKS. OF G+10 APARTMENTS.png",
    projects: [
      {
        name: "BVK BRINDAVAN",
        location: "Erode",
        year: "2025",
        area: "1,20,000 sq ft",
        image: "/images/apartments/apa1.png",
      },
      {
        name: "SKYLINE TOWERS",
        location: "Coimbatore",
        year: "2024",
        area: "85,000 sq ft",
        image: "/images/apartments/apa2.png",
      },
      {
        name: "GREEN GROVE FLATS",
        location: "Salem",
        year: "2023",
        area: "64,000 sq ft",
        image: "/images/apartments/apa3.png",
      },
    ],
  },
  {
    slug: "roads-culverts",
    name: "Roads & Culverts",
    shortName: "ROADS",
    description:
      "Infrastructure that connects — precision-graded roads, engineered culverts, and drainage systems built to endure.",
    coverImage: "/images/ongoingHome.png",
    projects: [
      {
        name: "NH-44 BYPASS ROAD",
        location: "Erode District",
        year: "2025",
        area: "12 km",
        image: "/images/road/road1.png",
      },
      {
        name: "INDUSTRIAL CORRIDOR",
        location: "Salem",
        year: "2024",
        area: "8 km",
        image: "/images/road/road2.png",
      },
      {
        name: "CANAL CULVERT BRIDGE",
        location: "Namakkal",
        year: "2024",
        area: "240 m",
        image: "/images/road/road3.png",
      },
      {
        name: "TOWNSHIP ROAD NETWORK",
        location: "Coimbatore",
        year: "2023",
        area: "5 km",
        image: "/images/road/road4.png",
      },
    ],
  },
  {
    slug: "government",
    name: "Government Projects",
    shortName: "GOVERNMENT",
    description:
      "Public buildings designed for civic dignity — functional, transparent, and built with accountability.",
    coverImage: "/images/govt1.png",
    projects: [
      {
        name: "GOVERNMENT HALL",
        location: "Erode",
        year: "2024",
        area: "15,000 sq ft",
        image: "/images/govt/govt1.png",
      },
      {
        name: "BUS TERMINAL",
        location: "Salem",
        year: "2024",
        area: "28,000 sq ft",
        image: "/images/govt/govt2.png",
      },
      {
        name: "SANSKAR MAHAL",
        location: "Erode",
        year: "2023",
        area: "22,000 sq ft",
        image: "/images/govt/govt3.png",
      },
      {
        name: "DISTRICT COLLECTORATE",
        location: "Namakkal",
        year: "2023",
        area: "18,500 sq ft",
        image: "/images/govt.png",
      },
      {
        name: "CIVIC CENTER",
        location: "Tiruppur",
        year: "2022",
        area: "30,000 sq ft",
        image: "/images/govt/govt5.png",
      },
      {
        name: "MUNICIPAL OFFICE",
        location: "Karur",
        year: "2022",
        area: "12,000 sq ft",
        image: "/images/govt/govt6.png",
      },
    ],
  },
  {
    slug: "interior",
    name: "Interior Projects",
    shortName: "INTERIOR",
    description:
      "Interior environments shaped by material, light, and proportion — spaces that feel as good as they look.",
    coverImage: "/images/interior.png",
    projects: [
      {
        name: "INTERIOR FOLD",
        location: "Erode",
        year: "2024",
        area: "3,200 sq ft",
        image: "/images/interior/int1.png",
      },
      {
        name: "PENTHOUSE LOUNGE",
        location: "Coimbatore",
        year: "2024",
        area: "1,800 sq ft",
        image: "/images/interior/int2.png",
      },
      {
        name: "EXECUTIVE CABIN",
        location: "Salem",
        year: "2023",
        area: "900 sq ft",
        image: "/images/interior/int3.png",
      },
    ],
  },
  {
    slug: "religious",
    name: "Religious Projects",
    shortName: "RELIGIOUS",
    description:
      "Temples, halls, and sacred spaces — rooted in tradition, realised with contemporary construction excellence.",
    coverImage: "/images/religious/rel1.png",
    projects: [
      {
        name: "TEMPLE RENOVATION",
        location: "Erode",
        year: "2024",
        area: "8,500 sq ft",
        image: "/images/religious/rel1.png",
      },
      {
        name: "PRAYER HALL",
        location: "Salem",
        year: "2023",
        area: "6,200 sq ft",
        image: "/images/religious/rel2.png",
      },
      {
        name: "COMMUNITY MANDAPAM",
        location: "Namakkal",
        year: "2023",
        area: "4,800 sq ft",
        image: "/images/religious/rel3.png",
      },
    ],
  },
];

/** Look up a category by its URL slug */
export function getCategoryBySlug(slug: string): ProjectCategory | undefined {
  return PROJECT_CATEGORIES.find((c) => c.slug === slug);
}
