require.config({
	baseUrl : '../src/core/core-javascript'
});

require(['util/loader', 'util/service'],
function(loaderModule, service){
	loaderModule.setBasePath('../src/');
});

//Set the animations off to speed up the unit tests
$.fx.off = true;
