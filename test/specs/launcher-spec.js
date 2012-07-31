describe('A guest launches a widget from the launch bar opening a new widget', function(){
	
	var _launchBar = $("<section>");
	
	beforeEach(function(){
		$('body').append($('<section>').addClass('.testArea'));
		$('.testArea').append(_launchBar);
	});
	
	afterEach(function(){
		_launchBar = $("<section>");
		$('.testArea').remove();
	});
	
	it('should load the widget with information about ProVictores', function(){
		//Given The about widget is defined
		_launchBar.data("widget", "launcher");
		loadWidget();
			
		runs(function(){
			//When The About link is clicked
			
			//Then the widget should have a navigation element
			//  The about widget should be loaded in the context
			expect(_launchBar.find('nav').length).toBeGreaterThan(0);
			expect(false).toBeTruthy(); //Test not implemented yet
		})
	});
	
	function loadWidget(){
		
		var _loaded = false;
		
		require(['util/loader'], function(){
			_launchBar.widget().then(function(){
				_loaded = true;
			});
		});
		
		waitsFor(function(){
			return _loaded;
		});
		
	}
});