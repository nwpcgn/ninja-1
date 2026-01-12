import type { PageLoad } from './$types'

export const load = (async () => {
	return {
		title: 'Tui Components'
	}
}) satisfies PageLoad
