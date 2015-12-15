// userAgent
window.___E_mod(function (E, $) {

	var agent = window.navigator.userAgent.toLowerCase();

	E.isAndroid = agent.indexOf('android') > 0;

	E.isUC = agent.indexOf('ucbrowser') > 0;

	E.agent = agent;

});