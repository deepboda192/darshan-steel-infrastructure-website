import { useEffect, useMemo, useState } from 'react'
import { createFileRoute } from '@tanstack/react-router'
import { ArrowDownWideNarrow, ArrowUpNarrowWide, Search, X } from 'lucide-react'
import { company } from '@/data/company'
import { siteImages } from '@/data/images'
import { blogPosts, categoriesInUse, filterPosts, sortPosts, type BlogSort } from '@/data/blogs'
import { useMotion } from '@/lib/motion'
import { breadcrumbSchema, JsonLd } from '@/lib/schema'
import { cn } from '@/lib/cn'
import { InnerHero } from '@/components/site/InnerHero'
import { SectionIntro } from '@/components/site/SectionIntro'
import { BlogCard } from '@/components/blogs/BlogCard'

const TITLE = `Blogs | ${company.name}`
const DESCRIPTION =
  'Articles from Darshan Steel Infrastructure on pre-engineered buildings: how they compare with conventional construction, how they are designed, and what to decide before you build.'

/** Value of the category filter that shows every post. */
const ALL = 'all'

type BlogSearch = {
  /** Free-text query across title, description, tags and category. */
  q?: string
  /** A blogCategories slug. */
  category?: string
  /** Newest first unless set to oldest. */
  sort?: BlogSort
}

/**
 * Blogs index — the article list with its controls: a search box, one chip
 * per category in use (plus All), and a newest / oldest toggle. The controls
 * live in the URL, so a filtered list can be shared and the back button
 * restores it; the server renders the list for the URL it is given, so the
 * page is complete without JavaScript and nothing shifts on hydration.
 */
function BlogsPage() {
  const search = Route.useSearch()
  const navigate = Route.useNavigate()
  useMotion()

  const query = search.q ?? ''
  const category = search.category ?? ALL
  const sort: BlogSort = search.sort ?? 'newest'

  // The box is typed into locally and pushed to the URL as it changes, so a
  // shared link carries the query without each keystroke fighting the router.
  const [draft, setDraft] = useState(query)
  useEffect(() => setDraft(query), [query])

  const update = (patch: Partial<BlogSearch>) =>
    navigate({
      search: (prev) => {
        const next = { ...prev, ...patch }
        return {
          q: next.q?.trim() ? next.q : undefined,
          category: next.category && next.category !== ALL ? next.category : undefined,
          sort: next.sort === 'oldest' ? 'oldest' : undefined,
        }
      },
      replace: true,
      resetScroll: false,
    })

  const categories = useMemo(() => categoriesInUse(), [])
  const shown = useMemo(
    () => sortPosts(filterPosts(blogPosts, query, category === ALL ? undefined : category), sort),
    [query, category, sort],
  )
  const filtered = query.trim().length > 0 || category !== ALL

  return (
    <>
      <JsonLd
        data={breadcrumbSchema([
          { name: 'Home', path: '/' },
          { name: 'Blogs', path: '/blogs' },
        ])}
      />

      <InnerHero
        title="Blogs"
        image={siteImages.blogsHero}
        crumbs={[{ label: 'Home', href: '/' }, { label: 'Blogs' }]}
      />

      <section className="m-section" aria-label="All articles">
        <div className="m-container">
          <div className="flex flex-col gap-16 max-md:gap-12">
            <div className="flex items-end justify-between gap-10 max-lg:flex-col max-lg:items-start max-lg:gap-6" data-reveal="up">
              <div className="max-w-[640px]">
                <SectionIntro subtitle="Insights" title="Straight answers on steel buildings." />
              </div>
              <p className="mb-2 max-w-[440px] text-[18px] leading-[1.5] text-neutral-8 max-md:text-[16px]">
                What a pre-engineered building is, how it compares, how it is designed and what to
                decide before you build, written by the engineers who build them.
              </p>
            </div>

            {/* ---------------- controls ---------------- */}
            <div className="flex flex-col gap-5 border-y border-black/10 py-6" data-reveal="up">
              <div className="flex items-center justify-between gap-5 max-md:flex-col max-md:items-stretch">
                {/* search */}
                <form
                  role="search"
                  className="relative w-full max-w-[460px] max-md:max-w-none"
                  onSubmit={(e) => {
                    e.preventDefault()
                    update({ q: draft })
                  }}
                >
                  <label htmlFor="blog-search" className="sr-only">
                    Search articles
                  </label>
                  <Search
                    size={18}
                    strokeWidth={2}
                    aria-hidden="true"
                    className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-neutral-6"
                  />
                  <input
                    id="blog-search"
                    type="search"
                    value={draft}
                    onChange={(e) => {
                      setDraft(e.target.value)
                      update({ q: e.target.value })
                    }}
                    placeholder="Search articles, e.g. cost, crane, insulation"
                    autoComplete="off"
                    className="h-[46px] w-full border border-neutral-4 bg-white pl-11 pr-11 text-[16px] text-neutral-10 outline-none transition-[border-color,box-shadow] duration-200 placeholder:text-neutral-5 focus:border-accent focus:shadow-[0_0_0_3px_#03599e26] [&::-webkit-search-cancel-button]:hidden"
                  />
                  {draft && (
                    <button
                      type="button"
                      aria-label="Clear search"
                      onClick={() => {
                        setDraft('')
                        update({ q: undefined })
                      }}
                      className="absolute right-2 top-1/2 flex h-8 w-8 -translate-y-1/2 items-center justify-center text-neutral-6 transition-colors hover:text-accent"
                    >
                      <X size={16} strokeWidth={2.2} aria-hidden="true" />
                    </button>
                  )}
                </form>

                {/* sort */}
                <div role="group" aria-label="Sort articles" className="flex shrink-0 items-center gap-3">
                  <span className="text-[13px] font-semibold uppercase tracking-[0.5px] text-neutral-6 max-xs:hidden">Sort</span>
                  <div className="flex border border-neutral-4">
                    {(
                      [
                        { value: 'newest', label: 'Newest first', Icon: ArrowDownWideNarrow },
                        { value: 'oldest', label: 'Oldest first', Icon: ArrowUpNarrowWide },
                      ] as const
                    ).map(({ value, label, Icon }) => (
                      <button
                        key={value}
                        type="button"
                        aria-pressed={sort === value}
                        onClick={() => update({ sort: value })}
                        className={cn(
                          'inline-flex h-[44px] items-center gap-2 px-4 font-heading text-[14px] font-semibold uppercase transition-colors duration-200',
                          sort === value ? 'bg-accent text-white' : 'bg-white text-neutral-9 hover:text-accent',
                        )}
                      >
                        <Icon size={16} strokeWidth={2} aria-hidden="true" />
                        {label}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* categories: on phones the chips stay on one line and scroll sideways. */}
              <div className="flex items-center justify-between gap-6 max-md:flex-col max-md:items-start max-md:gap-4">
                <div
                  role="group"
                  aria-label="Filter by category"
                  className="flex flex-wrap gap-2.5 max-md:-mx-(--container-pad) max-md:flex-nowrap max-md:overflow-x-auto max-md:px-(--container-pad) max-md:pb-1 max-md:[scrollbar-width:none]"
                >
                  <button type="button" className="m-chip" aria-pressed={category === ALL} onClick={() => update({ category: undefined })}>
                    All
                  </button>
                  {categories.map((c) => (
                    <button key={c.slug} type="button" className="m-chip" aria-pressed={category === c.slug} onClick={() => update({ category: c.slug })}>
                      {c.name}
                    </button>
                  ))}
                </div>
                <p className="shrink-0 text-[14px] text-neutral-6" aria-live="polite">
                  {shown.length === blogPosts.length
                    ? `${blogPosts.length} ${blogPosts.length === 1 ? 'article' : 'articles'}`
                    : `${shown.length} of ${blogPosts.length} ${blogPosts.length === 1 ? 'article' : 'articles'}`}
                </p>
              </div>
            </div>

            {/* ---------------- articles ----------------
                The entrance runs on the list, not the cards: cards come and go
                with the filters, and a card mounted after the motion armed
                would otherwise stay hidden. */}
            {shown.length > 0 ? (
              <ul className="grid grid-cols-3 gap-[30px] max-lg:grid-cols-2 max-sm:grid-cols-1" data-reveal="up">
                {shown.map((post, i) => (
                  <li key={post.slug}>
                    <BlogCard post={post} priority={i < 3} />
                  </li>
                ))}
              </ul>
            ) : (
              <div className="flex flex-col items-start gap-5 border border-dashed border-neutral-4 px-8 py-12 max-xs:px-6" data-reveal="up">
                <p className="font-heading text-[22px] font-bold leading-(--lh-sm) text-neutral-10">No articles match.</p>
                <p className="m-paragraph medium max-w-[520px]">
                  Try a shorter search term or another category. New articles are added as they are written.
                </p>
                {filtered && (
                  <button type="button" className="m-btn-outline" onClick={() => update({ q: undefined, category: undefined })}>
                    Clear filters
                  </button>
                )}
              </div>
            )}
          </div>
        </div>
      </section>
    </>
  )
}

export const Route = createFileRoute('/blogs/')({
  validateSearch: (search: Record<string, unknown>): BlogSearch => ({
    q: typeof search.q === 'string' && search.q.trim() ? search.q : undefined,
    category: typeof search.category === 'string' && search.category ? search.category : undefined,
    sort: search.sort === 'oldest' ? 'oldest' : undefined,
  }),
  head: () => ({
    meta: [
      { title: TITLE },
      { name: 'description', content: DESCRIPTION },
      { property: 'og:title', content: TITLE },
      { property: 'og:description', content: DESCRIPTION },
      { property: 'og:type', content: 'website' },
      { property: 'og:url', content: `${company.siteUrl}/blogs` },
    ],
    links: [{ rel: 'canonical', href: `${company.siteUrl}/blogs` }],
  }),
  component: BlogsPage,
})
