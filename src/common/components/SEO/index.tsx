import { useEffect } from "react";

interface SEOProps {
  title: string;
  description: string;
  image?: string;
  url?: string;
  type?: "website" | "article";
  publishedTime?: string;
  author?: string;
  tags?: string[];
}

export function SEO({
  title,
  description,
  image,
  url,
  type = "website",
  publishedTime,
  author,
  tags,
}: SEOProps) {
  useEffect(() => {
    document.title = title;

    setMetaTag("name", "description", description);

    setMetaTag("property", "og:title", title);
    setMetaTag("property", "og:description", description);
    setMetaTag("property", "og:type", type);

    if (image) {
      setMetaTag("property", "og:image", image);
      setMetaTag("name", "twitter:image", image);
    }

    if (url) {
      setMetaTag("property", "og:url", url);
    }

    setMetaTag(
      "name",
      "twitter:card",
      image ? "summary_large_image" : "summary",
    );
    setMetaTag("name", "twitter:title", title);
    setMetaTag("name", "twitter:description", description);

    if (type === "article") {
      if (publishedTime) {
        setMetaTag("property", "article:published_time", publishedTime);
      }
      if (author) {
        setMetaTag("property", "article:author", author);
      }
      if (tags && tags.length > 0) {
        tags.forEach((tag) => {
          setMetaTag("property", "article:tag", tag);
        });
      }
    }
  }, [title, description, image, url, type, publishedTime, author, tags]);

  return null;
}

function setMetaTag(
  attribute: "name" | "property",
  attributeValue: string,
  content: string,
) {
  let element = document.querySelector(
    `meta[${attribute}="${attributeValue}"]`,
  ) as HTMLMetaElement;

  if (!element) {
    element = document.createElement("meta");
    element.setAttribute(attribute, attributeValue);
    document.head.appendChild(element);
  }

  element.setAttribute("content", content);
}
