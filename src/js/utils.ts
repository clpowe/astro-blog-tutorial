import { Post } from '../types/types'

export function slugify(text: string): string {
	return text
		.toString()
		.toLowerCase()
		.replace(/\s+/g, '-')
		.replace(/[^\w-]+/g, '')
		.replace(/--+/g, '-')
		.replace(/^-+/, '')
		.replace(/-+$/, '')
}

export function formatDate(date: string): string {
	return new Date(date).toLocaleDateString('en-US', {
		timeZone: 'UTC'
	})
}

type FormatPostOptions = {
	filterOutDrafts?: boolean
	filterOutFuturePosts?: boolean
	sortByDate?: boolean
	limit?: any
}

export function formatBlogPost(
	posts,
	{
		filterOutDrafts = true,
		filterOutFuturePosts = true,
		sortByDate = true,
		limit = undefined
	}: FormatPostOptions = {}
) {
	const filteredPosts = posts.reduce((acc, post) => {
		const { date, draft } = post.frontmatter
		// filterOutdrafts if true
		if (filterOutDrafts && draft) return acc

		// filterOutFuturePosts if true
		if (filterOutFuturePosts && new Date(date) > new Date()) return acc

		// add post to acc
		acc.push(post)

		return acc
	}, [])

	// sort by date or randomize
	if (sortByDate) {
		filteredPosts.sort(
			(a, b) => new Date(b.frontmatter.date) - new Date(a.frontmatter.date)
		)
	} else {
		filteredPosts.sort(() => Math.random() - 0.5)
	}

	if (typeof limit === 'number') {
		return filteredPosts.slice(0, limit)
	}

	return filteredPosts
}
