/* eslint-disable @typescript-eslint/no-explicit-any */
import { compileMDX } from "next-mdx-remote/rsc";
import React from "react";
import Image from "next/image";

// Custom components available within MDX files
const components = {
  img: (props: any) => (
    <div className="relative w-full h-80 my-8 rounded-xl overflow-hidden shadow-md" >
      <Image
        {...props}
        fill
        className="object-cover"
        alt={props.alt || "MDX Image"}
      />
    </div>
  ),
  h1: (props: any) => <h1 className="text-4xl font-bold mt-12 mb-6" {...props} />,
  h2: (props: any) => <h2 className="text-3xl font-bold mt-10 mb-4" {...props} />,
  h3: (props: any) => <h3 className="text-2xl font-semibold mt-8 mb-3" {...props} />,
  p: (props: any) => <p className="leading-relaxed mb-6 text-lg text-foreground/90" {...props} />,
  ul: (props: any) => <ul className="list-disc pl-6 mb-6 space-y-2" {...props} />,
  ol: (props: any) => <ol className="list-decimal pl-6 mb-6 space-y-2" {...props} />,
  li: (props: any) => <li className="text-lg" {...props} />,
  a: (props: any) => <a className="text-accent hover:underline" {...props} />,
  blockquote: (props: any) => (
    <blockquote className="border-l-4 border-accent pl-4 italic text-foreground/80 my-6" {...props} />
  ),
  code: (props: any) => (
    <code className="bg-secondary px-1.5 py-0.5 rounded-md text-sm font-mono" {...props} />
  ),
  pre: (props: any) => (
    <pre className="bg-secondary p-4 rounded-xl overflow-x-auto my-6 border" {...props} />
  ),
};

export async function parseMdx<TFrontmatter = Record<string, any>>(rawMdx: string) {
  const { content, frontmatter } = await compileMDX<TFrontmatter>({
    source: rawMdx,
    options: {
      parseFrontmatter: true,
      mdxOptions: {
        remarkPlugins: [],
        rehypePlugins: [],
      },
    },
    components,
  });

  return { content, frontmatter };
}
