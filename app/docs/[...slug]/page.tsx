import React from "react";
import { notFound } from "next/navigation";
import { Metadata } from "next";
import { docArticles, docGroups } from "@/lib/docs-data";
import { DocsSidebar } from "@/components/docs/DocsSidebar";
import { DocsBreadcrumbs } from "@/components/docs/DocsBreadcrumbs";
import { DocsToc } from "@/components/docs/DocsToc";
import { DocsPrevNext } from "@/components/docs/DocsPrevNext";
import { DocsMarkdownRenderer } from "@/components/docs/DocsMarkdownRenderer";

interface DocsArticlePageProps {
  params: {
    slug: string[];
  };
}

export async function generateStaticParams() {
  return Object.keys(docArticles).map((key) => ({
    slug: key.split("/"),
  }));
}

export async function generateMetadata({ params }: DocsArticlePageProps): Promise<Metadata> {
  const slugKey = params.slug.join("/");
  const article = docArticles[slugKey];

  if (!article) {
    return {
      title: "Documentation — Runmark",
    };
  }

  return {
    title: `${article.title} — Runmark Documentation`,
    description: article.description,
  };
}

export default function DocsArticlePage({ params }: DocsArticlePageProps) {
  const slugKey = params.slug.join("/");
  const article = docArticles[slugKey];

  if (!article) {
    notFound();
  }

  return (
    <div className="py-8 md:py-12 bg-[#FAF8F3]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row gap-10 lg:gap-12">
          
          {/* Left Sidebar */}
          <DocsSidebar />

          {/* Main Article Content */}
          <article className="flex-grow min-w-0 bg-[#FFFDF9] border border-[#E8E2D9] rounded-3xl p-6 sm:p-10 shadow-warm-sm">
            <DocsBreadcrumbs group={article.group} title={article.title} />

            <div className="prose prose-slate max-w-none">
              <DocsMarkdownRenderer content={article.markdownContent} />
            </div>

            <DocsPrevNext currentSlug={slugKey} />
          </article>

          {/* Right On-Page Table of Contents */}
          <aside className="hidden lg:block w-56 shrink-0">
            <DocsToc headings={article.headings} />
          </aside>

        </div>
      </div>
    </div>
  );
}
