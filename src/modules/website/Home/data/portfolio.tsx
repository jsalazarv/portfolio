import type { PortfolioLink } from "../types";

import {
  BehanceIcon,
  InstagramIcon,
  YoutubeIcon,
  DribbbleIcon,
} from "@/common/components/icons";

export const portfolioLinks: PortfolioLink[] = [
  {
    icon: "🟡",
    label: "Bento",
    url: "https://bento.me/juansalazar",
  },
  {
    icon: <BehanceIcon />,
    label: "Behance",
    url: "https://behance.net/juansalazar",
  },
  {
    icon: <InstagramIcon />,
    label: "Instagram",
    url: "https://instagram.com/juansalazar",
  },
  {
    icon: <YoutubeIcon />,
    label: "Youtube",
    url: "https://youtube.com/@juansalazar",
  },
  {
    icon: <DribbbleIcon />,
    label: "Dribbble",
    url: "https://dribbble.com/juansalazar",
  },
];
