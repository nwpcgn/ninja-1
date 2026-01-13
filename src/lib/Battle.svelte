<script lang="ts">
	import { blankFighter } from './game.svelte.ts'
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

	class Fighter {
		id: string = $state('')
		name: string = $state('')
		info: string = $state('')
		hp: number = $state(0)
		maxHp: number = $state(0)
		atc: number = $state(0)
		def: number = $state(0)
		level: number = $state(0)
		img: string = $state('https://i.imgur.com/rylze1Q.png')
		avatar: string = $state('https://i.imgur.com/msl9MJN.png')
		moves: Move[] = $state([])
		xp: number = $state(0)
		constructor(obj: FighterType) {
			this.id = obj.id
			this.name = obj.name
			this.info = obj.info
			this.maxHp = obj.hp
			this.hp = this.maxHp
			this.atc = obj.atc
			this.def = obj.def
			this.level = obj.level
			this.img = obj.img
			this.avatar = obj.avatar
			this.moves = obj.moves
			this.xp = 0
		}
	}
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
	let gegner: FighterType = $state(new Fighter(blankFighter))
	let isPlayer = $state(false)
	let isOpponent = $state(false)
	let lock = $state(false)
	const getNewFighter = async (target: boolean) => {
		lock = true
		await sleep(200)
		if (target) {
			isOpponent = false
			gegner = new Fighter(getFighter())
		} else {
			isPlayer = false
			player = new Fighter(getFighter())
		}
		await sleep()
		lock = false
	}
	const setNewFighter = (target: boolean) => {
		if (target) {
			if (gegner) {
				isOpponent = true
			}
		} else {
			if (player) {
				isPlayer = true
			}
		}
	}
</script>

<TuiGrid>
	<TuiCard title="Hero">
		<FighterCard
			fighter={player}
			className={player?.id === 'blank' ? 'opacity-10' : ''}></FighterCard>
		{#snippet fooBar()}
			<TuiNav end>
				<TuiBtn type="info" onclick={() => getNewFighter(false)} disabled={lock}
					>New</TuiBtn>
				<TuiBtn
					type="primary"
					onclick={() => setNewFighter(false)}
					disabled={lock}>Select</TuiBtn>
			</TuiNav>
		{/snippet}
	</TuiCard>
	<TuiCard title="Enemy">
		<FighterCard
			fighter={gegner}
			className={gegner?.id === 'blank' ? 'opacity-10' : ''}></FighterCard>
		{#snippet fooBar()}
			<TuiNav end>
				<TuiBtn type="info" onclick={() => getNewFighter(true)} disabled={lock}
					>New</TuiBtn>
				<TuiBtn
					type="primary"
					onclick={() => setNewFighter(true)}
					disabled={lock}>Select</TuiBtn>
			</TuiNav>
		{/snippet}
	</TuiCard>
</TuiGrid>
<TuiNav center>
	<span class="tag is-success" class:is-active={isPlayer}>Hero</span>
	<span class="tag is-success" class:is-active={isOpponent}>Enemy</span>
	<span class="px-4" class:opacity-10={!isPlayer || !isOpponent}> --> </span>
	<button
		class="button"
		class:is-primary={isPlayer && isOpponent}
		disabled={!isPlayer || !isOpponent}>Fight</button>
</TuiNav>
