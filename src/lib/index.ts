// @index('./utils/**/*.ts', (f, _) => `export { default as ${_.camelCase(f.name)} } from '${f.path}${f.ext}'`)
export { default as assetLoader } from './utils/assetLoader.ts'
export { default as getFighter } from './utils/getFighter.ts'
export { default as getMsg } from './utils/getMsg.ts'
export { default as groupBy } from './utils/groupBy.ts'
export { default as loader } from './utils/Loader.ts'
export { default as randNum } from './utils/randNum.ts'
export { default as randRow } from './utils/randRow.ts'
export { default as sleep } from './utils/sleep.ts'
export { default as uuid } from './utils/uuid.ts'
// @endindex
// @index('./tui/*.svelte', (f, _) => `export { default as ${_.pascalCase(f.name)} } from '${f.path}${f.ext}'`)

// @endindex
// @index('./components/**/*.svelte', (f, _) => `export { default as ${_.pascalCase(f.name)} } from '${f.path}${f.ext}'`)
export { default as Counter } from './components/Counter.svelte'
export { default as FighterCard } from './components/FighterCard.svelte'
export { default as FighterInfo } from './components/FighterInfo.svelte'
export { default as Footer } from './components/Footer.svelte'
export { default as Header } from './components/Header.svelte'
export { default as Loading } from './components/Loading.svelte'
export { default as Notifications } from './components/notifications/Notifications.svelte'
export { default as Page } from './components/Page.svelte'
export { default as Progress } from './components/Progress.svelte'
export { default as SideBar } from './components/SideBar.svelte'
export { default as SideNav } from './components/SideNav.svelte'
export { default as Sprites } from './components/sprites/sprites.svelte'
export { default as TermCard } from './components/TermCard.svelte'
export { default as Typer } from './components/Typer.svelte'
// @endindex
// @index('./x*.ts', (f, _) => `export { default as ${f.name} } from '${f.path}'`)

// @endindex

export const NAV = [
	{
		href: '/',
		name: 'Lobby',
		icon: 'rpg-home',
		hidden: true,
		slug: 'init'
	},
	{
		href: '/dungeon',
		name: 'Dungeon',
		icon: 'rpg-tiles',
		hidden: false,
		slug: 'dungeon'
	},
	{
		href: '/arena',
		name: 'Arena',
		icon: 'rpg-server',
		hidden: false,
		slug: 'arena'
	},
	{
		href: '/settings',
		name: 'Settings',
		icon: 'rpg-tools',
		hidden: false,
		slug: 'settings'
	}
]

export const typeListObj = {
	primary: {
		name: 'Primary',
		bg: 'bg-primary',
		button: 'btn-primary'
	},
	info: {
		name: 'Info',
		bg: 'bg-info',
		button: 'btn-info'
	},
	success: {
		name: 'Success',
		bg: 'bg-success',
		button: 'btn-success'
	},
	warning: {
		name: 'Warning',
		bg: 'bg-warning',
		button: 'btn-warning'
	},
	error: {
		name: 'Error',
		bg: 'bg-error',
		button: 'btn-error'
	}
}
export const ICONS = [
	{
		name: 'Add',
		icon: 'rpg-add'
	},
	{
		name: 'Archive',
		icon: 'rpg-archive'
	},
	{
		name: 'Back',
		icon: 'rpg-back'
	},
	{
		name: 'Bar',
		icon: 'rpg-bar'
	},
	{
		name: 'Blank',
		icon: 'rpg-blank'
	},
	{
		name: 'Close',
		icon: 'rpg-close'
	},
	{
		name: 'Db',
		icon: 'rpg-db'
	},
	{
		name: 'Delete',
		icon: 'rpg-delete'
	},
	{
		name: 'Edit',
		icon: 'rpg-edit'
	},
	{
		name: 'Enemy',
		icon: 'rpg-enemy'
	},
	{
		name: 'Favicon',
		icon: 'rpg-favicon'
	},
	{
		name: 'Game',
		icon: 'rpg-game'
	},
	{
		name: 'Height',
		icon: 'rpg-height'
	},
	{
		name: 'Home',
		icon: 'rpg-home'
	},
	{
		name: 'Hp',
		icon: 'rpg-hp'
	},
	{
		name: 'Info',
		icon: 'rpg-info'
	},
	{
		name: 'Left',
		icon: 'rpg-left'
	},
	{
		name: 'Level',
		icon: 'rpg-level'
	},
	{
		name: 'Navi',
		icon: 'rpg-navi'
	},
	{
		name: 'Player',
		icon: 'rpg-player'
	},
	{
		name: 'Pokeball',
		icon: 'rpg-pokeball'
	},
	{
		name: 'Refresh',
		icon: 'rpg-refresh'
	},
	{
		name: 'Right',
		icon: 'rpg-right'
	},
	{
		name: 'Search',
		icon: 'rpg-search'
	},
	{
		name: 'Server',
		icon: 'rpg-server'
	},
	{
		name: 'Size',
		icon: 'rpg-size'
	},
	{
		name: 'Skull',
		icon: 'rpg-skull'
	},
	{
		name: 'Sort',
		icon: 'rpg-sort'
	},
	{
		name: 'Tag',
		icon: 'rpg-tag'
	},
	{
		name: 'Text',
		icon: 'rpg-text_format'
	},
	{
		name: 'Tiles',
		icon: 'rpg-tiles'
	},
	{
		name: 'Tools',
		icon: 'rpg-tools'
	},
	{
		name: 'User',
		icon: 'rpg-user'
	},
	{
		name: 'Warning',
		icon: 'rpg-warning'
	},
	{
		name: 'Weight',
		icon: 'rpg-weight'
	}
]
