// place files you want to import through the `$lib` alias in this folder.
export const nav = [
	{
		href: '/',
		name: 'Lobby',
		icon: 'rpg-home',
		slug: 'lobby'
	},
	{
		href: '/dungeon',
		name: 'Dungeon',
		icon: 'rpg-navi',
		slug: 'dungeon'
	},
	{
		href: '/demo',
		name: 'Arena',
		icon: 'rpg-db',
		slug: 'arena'
	}
]

// @index('./utils/**/*.ts', (f, _) => `export { default as ${_.camelCase(f.name)} } from '${f.path}${f.ext}'`)
export { default as assetLoader } from './utils/assetLoader.ts'
export { default as groupBy } from './utils/groupBy.ts'
export { default as loader } from './utils/Loader.ts'
export { default as randNum } from './utils/randNum.ts'
export { default as sleep } from './utils/sleep.ts'
export { default as uuid } from './utils/uuid.ts'
// @endindex
// @index('./*.svelte', (f, _) => `export { default as ${_.pascalCase(f.name)} } from '${f.path}${f.ext}'`)

// @endindex
// @index('./nes/**/*.svelte', (f, _) => `export { default as ${_.pascalCase(f.name)} } from '${f.path}${f.ext}'`)

// @endindex
// @index('./tui/*.svelte', (f, _) => `export { default as ${_.pascalCase(f.name)} } from '${f.path}${f.ext}'`)
export { default as Toster } from './tui/Toster.svelte'
export { default as TuiAccordion } from './tui/TuiAccordion.svelte'
export { default as TuiAlert } from './tui/TuiAlert.svelte'
export { default as TuiBreadcump } from './tui/TuiBreadcump.svelte'
export { default as TuiBtn } from './tui/TuiBtn.svelte'
export { default as TuiButton } from './tui/TuiButton.svelte'
export { default as TuiCard } from './tui/TuiCard.svelte'
export { default as TuiCollapse } from './tui/TuiCollapse.svelte'
export { default as TuiColor } from './tui/TuiColor.svelte'
export { default as TuiDropdown } from './tui/TuiDropdown.svelte'
export { default as TuiForm } from './tui/TuiForm.svelte'
export { default as TuiKbd } from './tui/TuiKbd.svelte'
export { default as TuiList } from './tui/TuiList.svelte'
export { default as TuiLog } from './tui/TuiLog.svelte'
export { default as TuiMenu } from './tui/TuiMenu.svelte'
export { default as TuiNavBar } from './tui/TuiNavBar.svelte'
export { default as TuiProgress } from './tui/TuiProgress.svelte'
export { default as TuiTable } from './tui/TuiTable.svelte'
export { default as TuiTags } from './tui/TuiTags.svelte'
export { default as TuiTypo } from './tui/TuiTypo.svelte'
export { default as TuiUtils } from './tui/TuiUtils.svelte'
// @endindex
