import {
  Airplane01Icon,
  Film01Icon,
  GameController01Icon,
} from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";

import type { Interest } from "../types";

export const interests: Interest[] = [
  {
    icon: (
      <HugeiconsIcon icon={GameController01Icon} size={16} strokeWidth={1.5} />
    ),
    label: "home.interests.gaming",
  },
  {
    icon: <HugeiconsIcon icon={Film01Icon} size={16} strokeWidth={1.5} />,
    label: "home.interests.filmMaking",
  },
  {
    icon: <HugeiconsIcon icon={Airplane01Icon} size={16} strokeWidth={1.5} />,
    label: "home.interests.traveling",
  },
];
