<script lang="ts">
	import { blankFighter, Fighter } from './game.svelte.ts'
	import { quadIn, quartInOut } from 'svelte/easing'
	import { slide } from 'svelte/transition'
	// import { log, type MessageType } from './log.svelte.ts'
	import {
		TuiGrid,
		sleep,
		TuiCard,
		TuiBtn,
		getMsg,
		TuiNav,
		getFighter
	} from './'
	import FighterCard from './components/FighterCard.svelte'
	import type { FighterType, Move } from './types'
	import Loading from './components/Loading.svelte'
	class BattleSystem {
		// Schadensberechnung unter Einbeziehung von atc und def
		private calculateDamage(
			attacker: FighterType,
			move: Move,
			defender: FighterType
		): number {
			const rawDamage = move.damage + attacker.atc
			const mitigation = Math.floor(defender.def / 2)
			return Math.max(1, rawDamage - mitigation)
		}

		private checkHit(move: Move): boolean {
			const roll = Math.floor(Math.random() * 10) + 1
			return roll <= move.dice // Nutzt den dice-Wert als Trefferchance
		}

		public executeTurn(
			player: FighterType,
			moveIndex: number,
			opponent: FighterType
		) {
			console.log(
				`--- ${player.name} (Lvl ${player.level}) vs. ${opponent.name} ---`
			)

			// Spieler-Zug
			this.performAttack(player, player.moves[moveIndex], opponent)

			if (opponent.hp <= 0) {
				console.log(`${opponent.name} wurde besiegt!`)
				this.gainExperience(player, 50) // Spieler erhält XP
				return
			}

			// Gegner-Zug (KI)
			const randomMove =
				opponent.moves[Math.floor(Math.random() * opponent.moves.length)]
			this.performAttack(opponent, randomMove, player)

			if (player.hp <= 0) {
				console.log(`${player.name} ist KO gegangen!`)
			}
		}

		private performAttack(
			attacker: FighterType,
			move: Move,
			defender: FighterType
		) {
			console.log(`${attacker.name} nutzt ${move.name}!`)
			if (this.checkHit(move)) {
				const dmg = this.calculateDamage(attacker, move, defender)
				defender.hp -= dmg
				console.log(
					`Treffer! ${dmg} Schaden. ${defender.name} verbleibende HP: ${Math.max(0, defender.hp)}`
				)
			} else {
				console.log(`${attacker.name} hat verfehlt!`)
			}
		}

		// Level-Up Logik
		private gainExperience(fighter: FighterType, amount: number) {
			fighter.xp += amount
			console.log(`${fighter.name} erhält ${amount} XP.`)

			const xpToNextLevel = fighter.level * 100
			if (fighter.xp >= xpToNextLevel) {
				this.levelUp(fighter)
			}
		}

		private levelUp(fighter: FighterType) {
			fighter.level++
			fighter.xp = 0
			// Statuswerte erhöhen sich beim Level-Up
			fighter.maxHp += 10
			fighter.hp = fighter.maxHp // Vollständige Heilung
			fighter.atc += 2
			fighter.def += 1

			console.log(
				`✨ LEVEL UP! ${fighter.name} ist jetzt Level ${fighter.level}!`
			)
			console.log(
				`Stats erhöht: HP: ${fighter.maxHp}, ATC: ${fighter.atc}, DEF: ${fighter.def}`
			)
		}
	}
	let player: FighterType = $state(new Fighter(blankFighter))
	let enemy: FighterType = $state(new Fighter(blankFighter))
	let isPlayer = $state(false)
	let isOpponent = $state(false)
	let lock = $state(false)
	const getNewFighter = async (target: boolean) => {
		lock = true

		await sleep(200)
		if (target) {
			enemy = new Fighter(blankFighter)
			isOpponent = false
			enemy = new Fighter(getFighter())
		} else {
			player = new Fighter(blankFighter)
			isPlayer = false
			player = new Fighter(getFighter())
		}
		await sleep()
		lock = false
	}
	const setNewFighter = (target: boolean) => {
		if (target) {
			if (enemy) {
				isOpponent = true
			}
		} else {
			if (player) {
				isPlayer = true
			}
		}
	}
	const clear = async (target: boolean) => {
		await sleep(200)
		if (target) {
			enemy = new Fighter(blankFighter)
			isOpponent = false
		} else {
			player = new Fighter(blankFighter)
			isPlayer = false
		}
		await sleep()
	}
	let promise1 = $state(sleep())
	let promise2 = $state(sleep())
</script>

<TuiGrid>
	<TuiCard title="Hero">
		{#await promise1}
			{@render loader()}
		{:then value}
			<FighterCard {value} fighter={player} blank={player.id === ''}
			></FighterCard>
		{/await}
		{#snippet fooBar()}
			<TuiNav end>
				{#if isPlayer}
					<TuiBtn type="danger" disabled={lock} onclick={() => clear(false)}
						>Clear</TuiBtn>
					<span class="flex-1"></span>
				{/if}
				<TuiBtn
					type="info"
					onclick={() => {
						promise1 = getNewFighter(false)
					}}
					disabled={lock}>Find</TuiBtn>
				<TuiBtn
					type="success"
					onclick={() => setNewFighter(false)}
					disabled={lock || player.id === ''}>Pick</TuiBtn>
			</TuiNav>
		{/snippet}
	</TuiCard>
	<TuiCard title="Enemy">
		{#await promise2}
			{@render loader()}
		{:then value}
			<FighterCard {value} fighter={enemy} blank={enemy.id === ''}
			></FighterCard>
		{/await}
		{#snippet fooBar()}
			<TuiNav end>
				{#if isOpponent}
					<TuiBtn type="danger" disabled={lock} onclick={() => clear(true)}
						>Clear</TuiBtn>
					<span class="flex-1"></span>
				{/if}
				<TuiBtn
					type="info"
					onclick={() => {
						promise2 = getNewFighter(true)
					}}
					disabled={lock}>Find</TuiBtn>
				<TuiBtn
					type="success"
					onclick={() => setNewFighter(true)}
					disabled={lock || enemy.id === ''}>Pick</TuiBtn>
			</TuiNav>
		{/snippet}
	</TuiCard>
</TuiGrid>

{#if player.id || enemy.id}
	<div transition:slide={{ duration: 400, easing: quadIn }}>
		<TuiNav center>
			<span class="tag is-info" class:is-active={isPlayer}>Hero</span>
			<span class="tag is-warning" class:is-active={isOpponent}>Enemy</span>
			<span class="px-4" class:opacity-10={!isPlayer || !isOpponent}>
				-->
			</span>
			<button
				class="button"
				class:is-primary={isPlayer && isOpponent}
				disabled={!isPlayer || !isOpponent}>Fight</button>
		</TuiNav>
	</div>
{/if}

{#snippet loader()}
	<FighterCard fighter={blankFighter} blank></FighterCard>
	<Loading></Loading>
{/snippet}
