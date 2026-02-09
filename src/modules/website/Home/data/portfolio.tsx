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
    label: "home.portfolio.bento",
    url: "https://bento.me/juansalazar",
  },
  {
    icon: <BehanceIcon />,
    label: "home.portfolio.behance",
    url: "https://behance.net/juansalazar",
  },
  {
    icon: <InstagramIcon />,
    label: "home.portfolio.instagram",
    url: "https://instagram.com/juansalazar",
  },
  {
    icon: <YoutubeIcon />,
    label: "home.portfolio.youtube",
    url: "https://youtube.com/@juansalazar",
  },
  {
    icon: <DribbbleIcon />,
    label: "home.portfolio.dribbble",
    url: "https://dribbble.com/juansalazar",
  },
];
