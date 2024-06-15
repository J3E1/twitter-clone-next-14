import Panel from "./panel";
import PanelItemTrends from "./panel-item-trends";

export default function WhatsHappeningPanel() {
	return (
		<Panel title="What's happening" href='/'>
			<PanelItemTrends title='Next JS' category='Development' stat='57.5K' />
			<PanelItemTrends title='Figma' category='Design' stat='107.5K' />
			<PanelItemTrends title='Webflow' category='Design' stat='127.5K' />
			<PanelItemTrends
				title='Tailwind CSS'
				category='Development'
				stat='87.5K'
			/>
			<PanelItemTrends title='Vercel' category='Development' stat='27.5K' />
		</Panel>
	);
}
