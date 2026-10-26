import { PortableText, type PortableTextComponents, type PortableTextProps } from "@portabletext/react";
import Image from "next/image";
import Link from "next/link";
import type { BodyImage } from "@/lib/blog";

interface ArticleBodyProps {
  value: PortableTextProps["value"];
}

interface LinkMark {
  href: string;
}

const bodyTextClass = "mt-5 text-lg leading-8 text-neutral-300";

const components: PortableTextComponents = {
  block: {
    normal: ({ children }) => <p className={bodyTextClass}>{children}</p>,
    h2: ({ children }) => <h2 className="mt-12 text-2xl font-semibold tracking-tight">{children}</h2>,
    h3: ({ children }) => <h3 className="mt-8 text-xl font-semibold tracking-tight">{children}</h3>,
    blockquote: ({ children }) => (
      <blockquote className="mt-6 border-l-2 border-accent pl-5 text-lg italic leading-8 text-neutral-300">
        {children}
      </blockquote>
    ),
  },
  list: {
    bullet: ({ children }) => <ul className={`${bodyTextClass} list-disc space-y-2 pl-6`}>{children}</ul>,
    number: ({ children }) => <ol className={`${bodyTextClass} list-decimal space-y-2 pl-6`}>{children}</ol>,
  },
  marks: {
    link: ({ children, value }: { children: React.ReactNode; value?: LinkMark }) => {
      const href = value?.href ?? "#";
      const className = "text-accent underline underline-offset-4 transition-opacity hover:opacity-80";
      if (href.startsWith("/")) {
        return (
          <Link href={href} className={className}>
            {children}
          </Link>
        );
      }
      return (
        <a href={href} className={className} target="_blank" rel="noopener noreferrer">
          {children}
        </a>
      );
    },
  },
  types: {
    image: ({ value }: { value: BodyImage }) => (
      <figure className="mt-8">
        <Image
          src={value.url}
          alt={value.alt}
          width={value.width}
          height={value.height}
          sizes="(min-width: 768px) 768px, 100vw"
          className="w-full rounded-2xl"
        />
        {value.caption && <figcaption className="mt-3 text-sm text-neutral-500">{value.caption}</figcaption>}
      </figure>
    ),
  },
};

export function ArticleBody({ value }: ArticleBodyProps) {
  return <PortableText value={value} components={components} />;
}
