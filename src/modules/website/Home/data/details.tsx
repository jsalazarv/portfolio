import { Calendar01Icon, Call02Icon, GlobeIcon } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";

import type { Detail } from "../types";

export const details: Detail[] = [
  {
    icon: <HugeiconsIcon icon={Calendar01Icon} size={16} strokeWidth={1.5} />,
    label: "home.details.age",
  },
  {
    icon: <HugeiconsIcon icon={GlobeIcon} size={16} strokeWidth={1.5} />,
    label: "home.details.website",
  },
  {
    icon: <HugeiconsIcon icon={Call02Icon} size={16} strokeWidth={1.5} />,
    label: "home.details.phone",
  },
  {
    icon: "🇲🇽",
    label: "home.details.country",
  },
];
