import type { SingleFilter } from "~/types/filter";

export interface FilterItem {
  id: number;
  title: string;
  icon: string;
  filter: SingleFilter;
}

export const filterItems: FilterItem[] = [
  {
    id: 1,
    title: "Sort",
    icon: "mi:sort",
    filter: "sort",
  },
  {
    id: 2,
    title: "Pitch Type",
    icon: "material-symbols:stadium-outline",
    filter: "pitch-type",
  },
  {
    id: 3,
    title: "Price per Hour",
    icon: "hugeicons:money-01",
    filter: "price-per-hour",
  },
  {
    id: 4,
    title: "Availability",
    icon: "material-symbols:schedule-outline",
    filter: "availability",
  },
  {
    id: 5,
    title: "Purpose",
    icon: "mdi:soccer-field",
    filter: "purpose",
  },
  {
    id: 6,
    title: "Facilities",
    icon: "mdi:shower-head",
    filter: "facilities",
  },
];
