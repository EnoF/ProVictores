describe('module : service', function(){
	var service;
	
	beforeEach(function(){
		
		waitsFor(function(){			
			require(['util/service'],
			function(serviceModule){
				service = serviceModule;
			});
			
			return service !== undefined;
		});
		
	});
	
	it('should be able to do get requests', function(){
		//Given the service url: 
		//  test/services/guildmember/1
		var _loaded = false,
			_url = "guildmember/1",
			_response;
		
		//When getting the service
		service.get(_url).then(function(response){
			_response = response;
			_loaded = true;
		});
		
		waitsFor(function(){
			return _loaded;
		});
		
		//Then the response should contain the guild leader
		runs(function(){
			expect(_loaded).toBeTruthy();
			expect(_response.name).toEqual("EnoF");
			expect(_response.rank).toEqual("Guild Leader");
		});
	});
});
