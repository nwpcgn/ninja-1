import type { PageLoad } from './$types'

export const load = (async () => {
	return {
		title: 'Toast / Notification'
	}
}) satisfies PageLoad
