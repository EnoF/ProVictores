describe('A guest opens about ProVictores widget to gain more information about ProVictores', function(){
	
	var _aboutWidget = $("<section>");
	
	beforeEach(function(){
		$('body').append($('<section>').addClass('testArea'));
		$('.testArea').append(_aboutWidget);
	});
	
	afterEach(function(){
		_aboutWidget = $("<section>");
		$('.testArea').remove();
	});
	
	it('should load the widget with information about ProVictores', function(){
		//Given The about widget is defined
		_aboutWidget.data("widget", "aboutprovictores");
			
		//When The widget is loaded
		loadWidget();
		
		//Then the widget should have a title "About ProVictores"
		//  a <p> with text 
		runs(function(){
			expect(_aboutWidget.find('h2').text()).toEqual('About ProVictores');
			expect(_aboutWidget.find('p').length).toBeGreaterThan(0);
		})
	});
	
	function loadWidget(){
		
		var _loaded = false;
		
		require(['util/loader'], function(){
			_aboutWidget.widget().then(function(){
				_loaded = true;
			});
		});
		
		waitsFor(function(){
			return _loaded;
		});
		
	}
});