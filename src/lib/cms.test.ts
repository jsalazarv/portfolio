import { describe, expect, it } from "vitest";

import { createCmsClient, mockCmsClient } from "./cms";

describe("mockCmsClient", () => {
  it("returns only published posts sorted by publishedAt desc", async () => {
    const posts = await mockCmsClient.getPosts();

    expect(posts.length).toBeGreaterThan(0);
    expect(posts.every((p) => p.status === "published")).toBe(true);
    for (let i = 1; i < posts.length; i++) {
      expect(
        new Date(posts[i - 1].publishedAt).getTime(),
      ).toBeGreaterThanOrEqual(new Date(posts[i].publishedAt).getTime());
    }
  });

  it("returns a post by slug", async () => {
    const posts = await mockCmsClient.getPosts();
    const target = posts[0];

    const found = await mockCmsClient.getPost(target.slug);

    expect(found?.slug).toBe(target.slug);
  });

  it("returns null for an unknown slug", async () => {
    const found = await mockCmsClient.getPost("no-existe-este-slug");

    expect(found).toBeNull();
  });
});

describe("createCmsClient", () => {
  it("returns the mock client for the mock provider", () => {
    expect(createCmsClient("mock")).toBe(mockCmsClient);
  });

  it("throws for an unimplemented provider", () => {
    expect(() => createCmsClient("emdash")).toThrow(/emdash/i);
  });
});
