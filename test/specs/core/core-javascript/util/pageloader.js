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
		
		//When
		pageloader.loadPage('home').then(function(html){
			_loaded = true;
			_html = html;
		});
		
		waitsFor(function(){
			return _loaded;
		});
		
		//Then
		runs(function(){
			expect(_loaded).toBeTruthy();
			expect(_html.length > 0).toBeTruthy();
		});
	});
	
});
