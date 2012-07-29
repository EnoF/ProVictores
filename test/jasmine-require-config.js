require.config({
	baseUrl : '../src/core/core-javascript'
});

require(['util/loader', 'util/service'],
function(loaderModule, service){
	loaderModule.setBasePath('../src/');
});