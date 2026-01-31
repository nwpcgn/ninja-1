import { mount } from 'svelte'
import './app.css'
import App from './App.svelte'
// In your main.ts, or somewhere BEFORE any routers are created:
import { init, location } from '@svelte-router/core'

init({ defaultHash: true })
location.navigate('/')
const app = mount(App, {
	target: document.getElementById('app')!
})

export default app
