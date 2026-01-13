import type { PageLoad } from './$types'

export const load = (async () => {
	return {
		title: 'Tui Toast'
	}
}) satisfies PageLoad
