// @index('./*.svelte', (f, _) => `export { default as ${_.pascalCase(f.name)} } from '${f.path}${f.ext}'`)
export { default as TuiBtn } from './TuiBtn.svelte'
export { default as TuiCard } from './TuiCard.svelte'
export { default as TuiCollapse } from './TuiCollapse.svelte'
export { default as TuiGrid } from './TuiGrid.svelte'
export { default as TuiGridSection } from './TuiGridSection.svelte'
export { default as TuiHeader } from './TuiHeader.svelte'
export { default as TuiNav } from './TuiNav.svelte'
export { default as TuiToster } from './TuiToster.svelte'
// @endindex

// @index('./*.svelte', (f, _) => `// ${_.pascalCase(f.name)}, `)
// TuiBtn,
// TuiCard,
// TuiCollapse,
// TuiGrid,
// TuiGridSection,
// TuiHeader,
// TuiNav,
// TuiToster,
// @endindex
