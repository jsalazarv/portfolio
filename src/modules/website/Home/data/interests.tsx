import { Gamepad2, Film, Plane } from "lucide-react";

import type { Interest } from "../types";

export const interests: Interest[] = [
  {
    icon: <Gamepad2 className="w-4 h-4" />,
    label: "home.interests.gaming",
  },
  {
    icon: <Film className="w-4 h-4" />,
    label: "home.interests.filmMaking",
  },
  {
    icon: <Plane className="w-4 h-4" />,
    label: "home.interests.traveling",
  },
];
