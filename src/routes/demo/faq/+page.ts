import type { PageLoad } from './$types'

export const load = (async () => {
	return {
		title: 'Tui FAQ',
		faqData: [
			{
				id: '1',
				frage: 'Worum geht es in The Rocky Horror Picture Show?',
				antwort:
					'Der Film erzählt von Brad und Janet, die in einem Schloss voller exzentrischer Figuren landen und dort mit sexueller Freiheit, Identität und Chaos konfrontiert werden.'
			},
			{
				id: '2',
				frage: 'Wer ist Dr. Frank-N-Furter?',
				antwort:
					'Ein charismatischer Außerirdischer und Wissenschaftler, der Rocky erschafft und gesellschaftliche Normen bewusst provoziert.'
			},
			{
				id: '3',
				frage: 'Was ist Rocky?',
				antwort:
					'Rocky ist ein künstlich erschaffener, muskulöser Mann und eine Parodie auf Frankensteins Monster.'
			},
			{
				id: '4',
				frage: 'Warum gilt der Film als Kultklassiker?',
				antwort:
					'Durch Mitternachtsvorführungen, Zuschauerinteraktion, provokante Themen und ikonische Songs.'
			},
			{
				id: '5',
				frage: 'Welche Themen behandelt der Film?',
				antwort:
					'Sexuelle Selbstbestimmung, Identität, Rollenbilder, Nonkonformität und Lust versus Moral.'
			},
			{
				id: '6',
				frage: 'Ist der Film eine Komödie oder ein Musical?',
				antwort:
					'Beides – er kombiniert Musicalnummern mit Horror-, Sci-Fi- und Comedy-Elementen.'
			}
		]
	}
}) satisfies PageLoad
