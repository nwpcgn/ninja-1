import type { LayoutLoad } from './$types'

export const load = (async () => {
	return {
		menu: [
			{
				href: '/demo',
				name: 'Tui',
				icon: 'rpg-server'
			},
			{
				href: '/demo/toast',
				name: 'Toast',
				icon: 'rpg-server'
			},
			{
				href: '/demo/faq',
				name: 'Faq',
				icon: 'rpg-tools'
			}
		]
	}
}) satisfies LayoutLoad
