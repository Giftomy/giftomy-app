// Just for external links
import config, { isProduction } from '@/configuration';
import Routes from '@/lib/constants/Routes';

const DOCS = 'https://docs.giftomy.xyz/';
const DISCOURSE = 'https://forum.giftomy.xyz/';

const links: any = {
	BACKEND: config.BACKEND_LINK,
	FRONTEND: 'https://giftomy.xyz/',
	REPORT_ISSUE: 'https://github.com/LoopDAO/giftomy-app/issues/new',
	DISCORD: 'https://discord.gg/Uq2TaXP9bC',
	DISCOURSE,
	GITHUB: 'https://github.com/LoopDAO',
	TWITTER: 'https://twitter.com/loop_dao',
	TELEGRAM: 'https://t.me/giftomy',
	MEDIUM: 'https://medium.com/@loop_dao/',
	YOUTUBE: 'https://www.youtube.com/channel/UClfutpRoY0WTVnq0oB0E0wQ',
	REDDIT: 'https://reddit.com/r/giftomy',
	DOCS,
	COVENANT_DOC: DOCS + 'whatisgiftomy/covenant/',
	USER_DOCS: DOCS + 'dapps/',
	DEVELOPER_DOCS: DOCS + 'dapps/giftomyioinstallation',
	CAMPAIGN_DOCS: DOCS + 'dapps/entitiesAndRoles/#campaigns',
	TRACES_DOCS: DOCS + 'dapps/entitiesAndRoles/#traces',
	MAKE_TRACEABLE_DOCS: DOCS + 'dapps/makeTraceableProject',
	COMMONS_STACK: 'https://commonsstack.org/',
	RECRUITEE: 'https://giftomy.recruitee.com/',
	HISTORY: 'https://docs.giftomy.xyz/whatisgiftomy/history',
	CALENDAR: 'https://calendar.google.com',
};

export default links;
