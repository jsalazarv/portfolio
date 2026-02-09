import { Calendar, Globe, Phone } from "lucide-react";

import type { Detail } from "../types";

export const details: Detail[] = [
  {
    icon: <Calendar className="w-4 h-4" />,
    label: "home.details.age",
  },
  {
    icon: <Globe className="w-4 h-4" />,
    label: "home.details.website",
  },
  {
    icon: <Phone className="w-4 h-4" />,
    label: "home.details.phone",
  },
  {
    icon: "🇲🇽",
    label: "home.details.country",
  },
];
