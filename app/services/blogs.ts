export type Blog = {
  id: number;
  title: string;
  author: string;
  url: string;
  likes: number;
};

type BlogStore = {
  blogs: Blog[];
  nextId: number;
};

const initialBlogs: Blog[] = [
  {
    id: 1,
    title: "React patterns",
    author: "Michael Chan",
    url: "https://reactpatterns.com/",
    likes: 7,
  },
  {
    id: 2,
    title: "Go To Statement Considered Harmful",
    author: "Edsger W. Dijkstra",
    url: "https://homepages.cwi.nl/~storm/teaching/reader/Dijkstra68.pdf",
    likes: 5,
  },
  {
    id: 3,
    title: "Clean Code with Next.js",
    author: "Robert C. Martin",
    url: "https://www.oreilly.com/library/view/clean-code-a/9780136083238/",
    likes: 3,
  },
];

const globalWithBlogStore = globalThis as typeof globalThis & {
  fullStackOpenBlogStore?: BlogStore;
};

const store =
  globalWithBlogStore.fullStackOpenBlogStore ??
  {
    blogs: initialBlogs.map((blog) => ({ ...blog })),
    nextId: initialBlogs.length + 1,
  };

globalWithBlogStore.fullStackOpenBlogStore = store;

let nextId = store.nextId;

const copyBlog = (blog: Blog): Blog => ({ ...blog });

export const getBlogs = (): Blog[] => store.blogs.map(copyBlog);

export const getBlogById = (id: number): Blog | undefined => {
  const blog = store.blogs.find((candidate) => candidate.id === id);
  return blog ? copyBlog(blog) : undefined;
};

export const addBlog = (title: string, author: string, url: string): Blog => {
  const cleanTitle = title.trim();
  const cleanAuthor = author.trim();
  const cleanUrl = url.trim();

  if (!cleanTitle || !cleanAuthor || !cleanUrl) {
    throw new Error("title, author and url are required");
  }

  nextId = Math.max(nextId, store.nextId);

  const blog: Blog = {
    id: nextId,
    title: cleanTitle,
    author: cleanAuthor,
    url: cleanUrl,
    likes: 0,
  };

  nextId += 1;
  store.nextId = nextId;
  store.blogs.push(blog);

  return copyBlog(blog);
};

export const incrementBlogLikes = (id: number): Blog | undefined => {
  const blog = store.blogs.find((candidate) => candidate.id === id);

  if (!blog) {
    return undefined;
  }

  blog.likes += 1;
  return copyBlog(blog);
};
