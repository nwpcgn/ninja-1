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
export { default as TuiBtn } from './tui/TuiBtn.svelte'
export { default as TuiCard } from './tui/TuiCard.svelte'
export { default as TuiCollapse } from './tui/TuiCollapse.svelte'
export { default as TuiGrid } from './tui/TuiGrid.svelte'
export { default as TuiGridSection } from './tui/TuiGridSection.svelte'
export { default as TuiHeader } from './tui/TuiHeader.svelte'
export { default as TuiNav } from './tui/TuiNav.svelte'
export { default as TuiToster } from './tui/TuiToster.svelte'
// @endindex
// @index('./nes/**/*.svelte', (f, _) => `export { default as ${_.pascalCase(f.name)} } from '${f.path}${f.ext}'`)

// @endindex
// @index('./*.ts', (f, _) => `export { default as ${f.name} } from '${f.path}'`)
export { default as atlas } from './atlas'
export { default as nav } from './nav'
export { default as typeList } from './typeList'
// @endindex
