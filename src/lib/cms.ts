import postsData from "./data/posts.json";

import type { BlogPost } from "@/common/types/blog.types";

export interface CmsClient {
  getPosts(): Promise<BlogPost[]>;
  getPost(slug: string): Promise<BlogPost | null>;
}

function sortByPublishedDateDesc(posts: BlogPost[]): BlogPost[] {
  return [...posts].sort(
    (a, b) =>
      new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime(),
  );
}

export const mockCmsClient: CmsClient = {
  async getPosts() {
    const posts = postsData as BlogPost[];
    return sortByPublishedDateDesc(
      posts.filter((post) => post.status === "published"),
    );
  },
  async getPost(slug) {
    const posts = postsData as BlogPost[];
    return (
      posts.find((post) => post.slug === slug && post.status === "published") ??
      null
    );
  },
};

export function createCmsClient(
  provider: string = import.meta.env.CMS_PROVIDER ?? "mock",
): CmsClient {
  if (provider === "mock") return mockCmsClient;
  throw new Error(
    `Unknown CMS_PROVIDER "${provider}". Only "mock" is implemented until EmDash is configured.`,
  );
}

export const cms: CmsClient = createCmsClient();
