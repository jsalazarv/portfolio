import { Gamepad2, Film, Plane } from "lucide-react";

import type { Interest } from "../types";

export const interests: Interest[] = [
  {
    icon: <Gamepad2 className="w-4 h-4" />,
    label: "Gaming",
  },
  {
    icon: <Film className="w-4 h-4" />,
    label: "Film Making",
  },
  {
    icon: <Plane className="w-4 h-4" />,
    label: "Traveling",
  },
];
