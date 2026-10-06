import { Link as RouterLink } from '@tanstack/react-router'
import { ArrowRight, CalendarDays, Clock3 } from 'lucide-react'
import { categoryOf, formatPostDate, postStats, type BlogPost } from '@/data/blogs'
import { ImageFrame } from '@/components/media/ImageFrame'

type BlogCardProps = {
  post: BlogPost
  /** Set on the first cards above the fold so their covers load eagerly. */
  priority?: boolean
}

/**
 * Blog card — the cover under an accent category tag, the date and reading
 * time, the title, the description and a "Read more" link. The whole card
 * links to the article; the title turns to the accent and the cover eases in
 * on hover, and the category tag is its own link to the filtered list.
 */
export function BlogCard({ post, priority = false }: BlogCardProps) {
  const category = categoryOf(post)
  const { readMinutes } = postStats(post)

  return (
    <article className="group relative flex h-full flex-col border border-black/10 bg-white transition-[border-color,box-shadow] duration-300 hover:border-accent hover:shadow-[0_16px_40px_#0000001a]">
      <div className="relative overflow-hidden bg-neutral-1">
        <ImageFrame image={post.cover} ratio="16/10" zoom priority={priority} sizes="(min-width: 1024px) 30vw, (min-width: 640px) 45vw, 100vw" />
        <RouterLink
          to="/blogs"
          search={{ category: category.slug }}
          className="m-tag absolute left-5 top-5 z-10 text-[14px] transition-colors hover:bg-accent-deep"
        >
          {category.name}
        </RouterLink>
      </div>

      <div className="flex flex-1 flex-col p-7 max-xs:p-6">
        <p className="flex flex-wrap items-center gap-x-4 gap-y-1 text-[13px] font-semibold uppercase tracking-[0.5px] text-neutral-6">
          <span className="inline-flex items-center gap-1.5">
            <CalendarDays size={14} strokeWidth={2} aria-hidden="true" className="text-accent" />
            <time dateTime={post.publishedAt}>{formatPostDate(post.publishedAt)}</time>
          </span>
          <span className="inline-flex items-center gap-1.5">
            <Clock3 size={14} strokeWidth={2} aria-hidden="true" className="text-accent" />
            {readMinutes} min read
          </span>
        </p>

        <h3 className="mt-4 font-heading text-[22px] font-bold leading-(--lh-sm) text-neutral-10 transition-colors duration-300 group-hover:text-accent max-xs:text-[20px]">
          {/* The stretched link: the whole card is clickable, and this is the one accessible link to the article. */}
          <RouterLink to="/blogs/$slug" params={{ slug: post.slug }} className="after:absolute after:inset-0 after:z-[1] after:content-['']">
            {post.title}
          </RouterLink>
        </h3>

        <p className="mt-3 line-clamp-3 text-[16px] leading-[1.6] text-neutral-8">{post.description}</p>

        <span
          aria-hidden="true"
          className="mt-auto inline-flex items-center gap-2 pt-6 font-heading text-[15px] font-semibold uppercase text-accent"
        >
          Read more
          <ArrowRight size={16} className="transition-transform duration-300 group-hover:translate-x-1" />
        </span>
      </div>
    </article>
  )
}
