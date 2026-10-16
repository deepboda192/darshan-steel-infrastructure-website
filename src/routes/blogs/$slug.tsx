import { createFileRoute, notFound, Link as RouterLink } from '@tanstack/react-router'
import { ArrowLeft, CalendarDays, Clock3, ListChecks, UserRound } from 'lucide-react'
import { company } from '@/data/company'
import { blogPosts, categoryOf, formatPostDate, getPost, postStats, type BlogPost } from '@/data/blogs'
import { useMotion } from '@/lib/motion'
import { breadcrumbSchema, JsonLd, type Json } from '@/lib/schema'
import { InnerHero } from '@/components/site/InnerHero'
import { SectionIntro } from '@/components/site/SectionIntro'
import { Button } from '@/components/site/Button'
import { ImageFrame } from '@/components/media/ImageFrame'
import { Logo } from '@/components/layout/Logo'
import Link from '@/components/site/NextLink'
import { BlogBody } from '@/components/blogs/BlogBody'
import { BlogCard } from '@/components/blogs/BlogCard'

/** Rich results: the article as a BlogPosting by the company, and its FAQ as a FAQPage. */
function articleSchema(post: BlogPost): Json {
  const { words } = postStats(post)
  return {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: post.title,
    description: post.description,
    image: `${company.siteUrl}${post.cover.src}`,
    datePublished: post.publishedAt,
    dateModified: post.updatedAt ?? post.publishedAt,
    author: { '@type': 'Organization', name: company.name, url: company.siteUrl },
    publisher: {
      '@type': 'Organization',
      name: company.name,
      url: company.siteUrl,
      logo: { '@type': 'ImageObject', url: `${company.siteUrl}/brand/dsi-logo.png` },
    },
    mainEntityOfPage: `${company.siteUrl}/blogs/${post.slug}`,
    articleSection: categoryOf(post).name,
    keywords: post.tags.join(', '),
    wordCount: words,
    inLanguage: 'en-IN',
  }
}

function faqSchema(post: BlogPost): Json {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: post.faq.map((item) => ({
      '@type': 'Question',
      name: item.question,
      acceptedAnswer: { '@type': 'Answer', text: item.answer },
    })),
  }
}

/**
 * Blog article — the inner-page hero on the cover, then the piece: category,
 * date, reading time and author; the direct answer; the key takeaways; the
 * body beside a sticky rail with the section list and a contact card; the
 * FAQ as accordions; more articles; and the closing call to action. The copy
 * is a data/blogs.ts post; the loader has already thrown notFound() for an
 * unknown slug.
 */
function BlogPostPage() {
  const { slug } = Route.useParams()
  const post = getPost(slug) as BlogPost
  useMotion()

  const category = categoryOf(post)
  const { readMinutes } = postStats(post)
  const sections = post.blocks.filter((b): b is Extract<BlogPost['blocks'][number], { type: 'h2' }> => b.type === 'h2')
  const more = blogPosts.filter((p) => p.slug !== post.slug).slice(0, 3)

  return (
    <>
      <JsonLd
        data={[
          breadcrumbSchema([
            { name: 'Home', path: '/' },
            { name: 'Blogs', path: '/blogs' },
            { name: post.title, path: `/blogs/${post.slug}` },
          ]),
          articleSchema(post),
          faqSchema(post),
        ]}
      />

      <InnerHero
        tall
        title={post.title}
        image={post.cover}
        crumbs={[{ label: 'Home', href: '/' }, { label: 'Blogs', href: '/blogs' }, { label: category.name }]}
      />

      <article className="m-section" aria-labelledby="post-title">
        <div className="m-container">
          {/* ---------------- standfirst ---------------- */}
          <div className="grid grid-cols-[1.72fr_1fr] items-start gap-[75px] max-lg:grid-cols-1 max-lg:gap-10" data-reveal="up">
            <div>
              <div className="flex flex-wrap items-center gap-x-5 gap-y-3 text-[14px] font-semibold uppercase tracking-[0.5px] text-neutral-6">
                <RouterLink to="/blogs" search={{ category: category.slug }} className="m-tag text-[14px] transition-colors hover:bg-accent-deep">
                  {category.name}
                </RouterLink>
                <span className="inline-flex items-center gap-2">
                  <CalendarDays size={15} strokeWidth={2} aria-hidden="true" className="text-accent" />
                  <time dateTime={post.publishedAt}>{formatPostDate(post.publishedAt)}</time>
                </span>
                <span className="inline-flex items-center gap-2">
                  <Clock3 size={15} strokeWidth={2} aria-hidden="true" className="text-accent" />
                  {readMinutes} min read
                </span>
                <span className="inline-flex items-center gap-2">
                  <UserRound size={15} strokeWidth={2} aria-hidden="true" className="text-accent" />
                  {post.author}
                </span>
              </div>
              <h2 id="post-title" className="sr-only">
                {post.title}
              </h2>
              {/* The direct answer: the piece in one paragraph, for readers in a hurry and for answer engines. */}
              <p className="mt-8 text-[22px] font-medium leading-[1.5] text-neutral-10 max-md:text-[19px]">{post.answer}</p>
            </div>

            <aside className="border border-black/10 bg-neutral-1 p-8 max-xs:p-6" aria-labelledby="post-takeaways">
              <p id="post-takeaways" className="flex items-center gap-3 font-heading text-[18px] font-bold leading-(--lh-sm) text-neutral-10">
                <span className="m-icon-box h-9 w-9">
                  <ListChecks size={18} strokeWidth={2} aria-hidden="true" />
                </span>
                Key takeaways
              </p>
              <ol className="mt-5 flex flex-col gap-3.5">
                {post.takeaways.map((item, n) => (
                  <li key={item} className="flex items-start gap-3.5 text-[15px] leading-[1.55] text-neutral-8">
                    <span className="pt-[3px] font-heading text-[12px] font-bold tabular-nums text-accent">{String(n + 1).padStart(2, '0')}</span>
                    {item}
                  </li>
                ))}
              </ol>
            </aside>
          </div>

          {/* ---------------- cover ---------------- */}
          <div className="relative mt-14 overflow-hidden bg-neutral-1 pt-[50%] max-lg:pt-[56%] max-xs:pt-[64%]" data-reveal="up">
            <div className="absolute inset-0">
              <ImageFrame image={post.cover} ratio="fill" priority sizes="(min-width: 1370px) 1310px, 100vw" />
            </div>
          </div>

          {/* ---------------- body + rail ---------------- */}
          <div className="grid grid-cols-[1.72fr_1fr] items-start gap-[75px] pt-16 max-lg:grid-cols-1 max-lg:gap-16">
            <div data-reveal="up">
              <BlogBody blocks={post.blocks} />
            </div>

            <aside className="flex flex-col gap-5 lg:sticky lg:top-24" data-reveal="up">
              <nav aria-label="In this article" className="border border-black/10 bg-neutral-1 p-7 max-xs:p-5">
                <p className="text-[13px] font-semibold uppercase tracking-[0.5px] text-neutral-6">In this article</p>
                <ol className="mt-4 flex flex-col">
                  {sections.map((section, i) => (
                    <li key={section.id} className="border-b border-black/10 last:border-b-0">
                      <a
                        href={`#${section.id}`}
                        className="group flex items-start gap-3.5 py-2.5 text-[15px] leading-[1.45] text-neutral-9 transition-colors hover:text-accent"
                      >
                        <span className="pt-[2px] font-heading text-[12px] font-bold tabular-nums text-neutral-5 group-hover:text-accent">
                          {String(i + 1).padStart(2, '0')}
                        </span>
                        {section.text}
                      </a>
                    </li>
                  ))}
                </ol>
              </nav>

              <div className="flex flex-col">
                <div className="flex flex-col items-center gap-6 bg-secondary px-8 py-10 text-center text-white">
                  <Logo variant="mark" tone="dark" height={52} />
                  <div className="flex flex-col gap-2">
                    <p className="m-h5 light">Planning a building?</p>
                    <p className="text-[15px] leading-[1.5] text-neutral-2">
                      Send us the plot size, the use inside and the target date. A first sizing and a frame
                      recommendation cost nothing.
                    </p>
                  </div>
                </div>
                <Button href="/?intent=quote#contact" arrow={false} className="w-full justify-center">
                  Request a quote
                </Button>
              </div>
            </aside>
          </div>
        </div>
      </article>

      {/* ---------------- FAQ ---------------- */}
      {post.faq.length > 0 && (
        <section className="m-section bg-neutral-1" aria-labelledby="post-faq">
          <div className="m-container">
            <div className="flex items-start justify-between gap-16 max-lg:flex-col max-lg:gap-12">
              <div className="w-full max-w-[440px] lg:sticky lg:top-24" data-reveal="up">
                <SectionIntro subtitle="FAQ" title={<span id="post-faq">Questions people ask.</span>} />
                <p className="m-paragraph mt-8">
                  Short answers to the questions this article raises. For the building itself, see{' '}
                  <Link href="/about-peb" className="m-link">
                    About PEB
                  </Link>
                  .
                </p>
              </div>
              <dl className="w-full max-w-[760px] max-lg:max-w-none" data-reveal="up">
                {post.faq.map((item, i) => (
                  <details key={item.question} className="group border-b border-black/10" open={i === 0}>
                    <summary className="flex cursor-pointer list-none items-center justify-between gap-6 py-6 font-heading text-[20px] font-semibold leading-(--lh-sm) text-neutral-10 marker:hidden [&::-webkit-details-marker]:hidden max-xs:text-[18px]">
                      <dt>{item.question}</dt>
                      <span
                        aria-hidden="true"
                        className="relative h-6 w-6 shrink-0 before:absolute before:left-1/2 before:top-1/2 before:h-[2px] before:w-4 before:-translate-x-1/2 before:-translate-y-1/2 before:bg-accent after:absolute after:left-1/2 after:top-1/2 after:h-4 after:w-[2px] after:-translate-x-1/2 after:-translate-y-1/2 after:bg-accent after:transition-[rotate] after:duration-300 group-open:after:rotate-90"
                      />
                    </summary>
                    <dd className="m-paragraph pb-7 pr-12 max-xs:pr-0">{item.answer}</dd>
                  </details>
                ))}
              </dl>
            </div>
          </div>
        </section>
      )}

      {/* ---------------- more articles ---------------- */}
      <section className="m-section" aria-label="More articles">
        <div className="m-container">
          <div className="flex flex-col gap-16 max-md:gap-12">
            <div className="flex items-center justify-between gap-8 max-md:flex-col max-md:items-start" data-reveal="up">
              <h2 className="m-h2">More articles</h2>
              <Button href="/blogs" variant="outline">
                All articles
              </Button>
            </div>
            {more.length > 0 ? (
              <ul className="grid grid-cols-3 gap-[30px] max-lg:grid-cols-2 max-sm:grid-cols-1" data-reveal="up">
                {more.map((p) => (
                  <li key={p.slug}>
                    <BlogCard post={p} />
                  </li>
                ))}
              </ul>
            ) : (
              <div className="flex flex-col items-start gap-5 border border-dashed border-neutral-4 px-8 py-10 max-xs:px-6" data-reveal="up">
                <p className="m-paragraph medium max-w-[520px]">
                  This is the first article. More are on the way; the list at Blogs will grow as they are published.
                </p>
                <Link href="/blogs" className="inline-flex items-center gap-2 font-heading text-[15px] font-semibold uppercase text-accent">
                  <ArrowLeft size={16} aria-hidden="true" />
                  Back to all articles
                </Link>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* ---------------- closing ---------------- */}
      <section className="m-section bg-secondary text-white" aria-label="Start a project">
        <div className="m-container">
          <div className="flex flex-col items-center gap-8 text-center" data-reveal="up">
            <SectionIntro
              tone="light"
              align="center"
              subtitle="Next step"
              title="Compare the two for your own building."
              className="max-w-[640px]"
            />
            <p className="max-w-[560px] text-[18px] leading-[1.5] text-neutral-1 max-md:text-[16px]">
              Plot size, use and target date are enough for DSI to propose a frame and a first sizing,
              with the cost and the programme against conventional construction.
            </p>
            <div className="flex flex-wrap items-center justify-center gap-4">
              <Button href="/?intent=quote#contact">Request a quote</Button>
              <Button href="/about-peb" variant="outline" tone="dark">
                About PEB
              </Button>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}

export const Route = createFileRoute('/blogs/$slug')({
  // The posts are imported here rather than at the top of the route module:
  // the loader and head() run from the shell bundle every page downloads,
  // while the page component (its own chunk) imports the posts statically.
  loader: async ({ params }) => {
    const { getPost, categoryOf } = await import('@/data/blogs')
    const post = getPost(params.slug)
    if (!post) throw notFound()
    return {
      title: post.seoTitle,
      description: post.description,
      image: post.cover.src,
      publishedAt: post.publishedAt,
      modifiedAt: post.updatedAt ?? post.publishedAt,
      section: categoryOf(post).name,
    }
  },
  head: ({ params, loaderData: post }) => {
    const title = post ? post.title : `Blogs | ${company.name}`
    const description = post?.description ?? ''
    const url = `${company.siteUrl}/blogs/${params.slug}`
    return {
      meta: [
        { title },
        { name: 'description', content: description },
        { property: 'og:title', content: title },
        { property: 'og:description', content: description },
        { property: 'og:type', content: 'article' },
        { property: 'og:url', content: url },
        ...(post
          ? [
              { property: 'og:image', content: `${company.siteUrl}${post.image}` },
              { property: 'article:published_time', content: post.publishedAt },
              { property: 'article:modified_time', content: post.modifiedAt },
              { property: 'article:section', content: post.section },
              { name: 'twitter:card', content: 'summary_large_image' },
            ]
          : []),
      ],
      links: [{ rel: 'canonical', href: url }],
    }
  },
  component: BlogPostPage,
})
