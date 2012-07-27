require.config({
	baseUrl : '../src/core/core-javascript'
});

require(['util/loader'],
function(loaderModule){
	loaderModule.setBasePath('../src/');
});