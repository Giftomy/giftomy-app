// Just for external links
import config, { isProduction } from '@/configuration';
import Routes from '@/lib/constants/Routes';

const DOCS = 'https://docs.giftomy.xyz/';
const DISCOURSE = 'https://forum.giftomy.xyz/';

const links: any = {
	BACKEND: config.BACKEND_LINK,
	FRONTEND: 'https://giftomy.xyz/',
	REPORT_ISSUE: 'https://github.com/LoopDAO/giftomy-app/issues/new',
	ASK_QUESTION: 'https://giftomy.typeform.com/question',
	FEATURE_REQUEST: 'https://giftomy.typeform.com/featurerequest',
	FEEDBACK: 'https://giftomy.typeform.com/feedback',
	PROJECT_VERIFICATION: 'https://giftomy.typeform.com/verification',
	DISCORD: 'https://discord.gg/Uq2TaXP9bC',
	DISCOURSE,
	GIVBACK_TOKENS_FORUM: 'https://forum.giftomy.xyz/t/givbacks-token-list/253',
	GITHUB: 'https://github.com/LoopDAO',
	TWITTER: 'https://twitter.com/loop_dao',
	TELEGRAM: 'https://t.me/giftomy',
	MEDIUM: 'https://medium.com/@loop_dao/',
	YOUTUBE: 'https://www.youtube.com/channel/UClfutpRoY0WTVnq0oB0E0wQ',
	REDDIT: 'https://reddit.com/r/giftomy',
	DOCS,
	GIVFARM_DOCS: DOCS + 'giveconomy/givfarm',
	GIVSTREAM_DOCS: DOCS + 'giveconomy/givstream',
	GIVBACK_DOC: DOCS + 'giveconomy/givbacks',
	COVENANT_DOC: DOCS + 'whatisgiftomy/covenant/',
	GIVETH_DOCS: DOCS + 'whatisgiftomy/',
	USER_DOCS: DOCS + 'dapps/',
	DEVELOPER_DOCS: DOCS + 'dapps/giftomyioinstallation',
	CAMPAIGN_DOCS: DOCS + 'dapps/entitiesAndRoles/#campaigns',
	TRACES_DOCS: DOCS + 'dapps/entitiesAndRoles/#traces',
	MAKE_TRACEABLE_DOCS: DOCS + 'dapps/makeTraceableProject',
	TRACE: 'https://trace.giftomy.xyz/',
	COMMONS_STACK: 'https://commonsstack.org/',
	RECRUITEE: 'https://giftomy.recruitee.com/',
	JOINGIVFRENS: 'https://giftomy.typeform.com/regenfarms',
	HISTORY: 'https://docs.giftomy.xyz/whatisgiftomy/history',
	CALENDAR:
		'https://calendar.google.com',
};

if (!isProduction) {
	links.SUPPORT_US = Routes.Donate + '/giftomy-2021:-retreat-to-the-future';
} else {
	links.SUPPORT_US = Routes.Donate + '/the-giftomy-community-of-makers';
}

export default links;
