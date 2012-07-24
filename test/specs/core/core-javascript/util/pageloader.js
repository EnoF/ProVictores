describe('module : pageloader', function(){
	
	var pageloader;
	
	beforeEach(function(){
		
		waitsFor(function(){			
			require(['util/pageloader'],
			function(loader){
				pageloader = loader;
				pageloader.setBasePath('../src/');
			});
			
			return pageloader !== undefined;
		});
		
	});
	
	it('should be able to load home page', function(){
		// Given PageLoader is loaded
		var _loaded = false,
			_html;
		expect(pageloader).toBeDefined();
		
		//When Loading the widget page Home
		pageloader.loadPage('home').then(function(html){
			_loaded = true;
			_html = $("<html>").html(html);
		});
		
		waitsFor(function(){
			return _loaded;
		});
		
		//Then The page should be an html page containing
		//  a h2 with as text Welcome to ProVictores
		//  a p with as text This is the guild website of ProVictores!
		runs(function(){
			expect(_loaded).toBeTruthy();
			expect(_html.length > 0).toBeTruthy();
			expect(_html.find("h2").text()).toEqual("Welcome to ProVictores");
			expect(_html.find("p").text()).toEqual("This is the guild website of ProVictores!");
		});
	});
	
});
