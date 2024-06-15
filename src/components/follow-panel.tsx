import Panel from './panel';
import PanelItem from './panel-item';

export default function FollowPanel() {
	return (
		<Panel title='Who to follow' href='/'>
			<PanelItem
				src='https://images.unsplash.com/photo-1517849845537-4d257902454a?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxjb2xsZWN0aW9uLXBhZ2V8Mjd8NzkwMjQ2NTJ8fGVufDB8fHx8&auto=format&fit=crop&w=800&q=60'
				name='Charles Deluvio'
				username='charlesdeluvio'
				initials='CD'
			/>
			<PanelItem
				src='https://images.unsplash.com/photo-1613951085587-cfe5d0a6cffc?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxjb2xsZWN0aW9uLXBhZ2V8MTZ8NzkwMjQ2NTJ8fGVufDB8fHx8&auto=format&fit=crop&w=800&q=60'
				name='Tolga Ulkan'
				username='tolgaulkan'
				initials='TU'
			/>
			<PanelItem
				src='https://images.unsplash.com/photo-1614777735430-7b46df56b404?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxjb2xsZWN0aW9uLXBhZ2V8MXw3OTAyNDY1Mnx8ZW58MHx8fHw%3D&auto=format&fit=crop&w=800&q=60'
				name='Rob Potter'
				username='robpotter'
				initials='RB'
			/>
		</Panel>
	);
}
