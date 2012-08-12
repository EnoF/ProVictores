describe('A guest launches a widget from the launch bar opening a new widget', function(){
	
	var _launcher;
	
	beforeEach(function(){
		$('body').append($('<section>').addClass('testArea'));
		_launcher = $("<section>").data('widget', 'launcher');
		$('.testArea').append(_launcher);
	});
	
	afterEach(function(){
		$('.testArea').remove();
	});
	
	it('should load the widget with information about ProVictores', function(){
		//Given The about widget is defined
		loadWidget();
			
		launchWidget('aboutprovictores');
		
		runs(function(){
			//Then the widget should have a navigation element
			//  The about widget should be loaded in the context
			expect(_launcher.find('nav').length).toBeGreaterThan(0);
			expect(_launcher.find('.pv-aboutprovictores').length).toBeGreaterThan(0);
		});
	});
	
	it('should place a loaded widget in the previous widget spot when launching a new widget', function(){
		//Given The about widget is launched
		loadWidget();
		
		launchWidget('aboutprovictores');
		
		//When The Guild Members widget is launched
		launchWidget('guildmembers');
		
		//Then The about widget should have the .pv-previous class
		//  The Guild Members widget should have the .pv-current class
		runs(function(){
			expect(_launcher.find('.pv-previous .pv-aboutprovictores').length).toBeGreaterThan(0);
			expect(_launcher.find('.pv-current .pv-guildmembers').length).toBeGreaterThan(0);
		});
	});
	
	it('should launch the guildmembers widget when clicked on the guildmembers widget in the home widget', function(){
		//Given the home widget is launched
		loadWidget();
		launchWidget('home');
		
		clickIn('.pv-current .pv-guildmembers');
		
		runs(function(){
			expect(_launcher.find('.pv-current .pv-guildmembers').length).toEqual(1);
		})
	});
	
	it('should hide widgets which were previously in the previous state', function(){
		//Given The about widget is launched
		loadWidget();
		
		launchWidget('aboutprovictores');
		
		//When The Guild Members widget is launched
		launchWidget('guildmembers');
		
		//Then The about widget should have the .pv-previous class
		//  The Guild Members widget should have the .pv-current class
		launchWidget('home');
		
		//Then The about widget should have the .pv-previous class
		//  The Guild Members widget should have the .pv-current class
		runs(function(){
			expect(_launcher.find('.pv-aboutprovictores').length).toEqual(0);
			expect(_launcher.find('.pv-previous .pv-guildmembers').length).toBeGreaterThan(0);
			expect(_launcher.find('.pv-current .pv-home').length).toBeGreaterThan(0);
		});
	});
	
	it('should reuse an widget if it was opened before', function(){
		//Given The about widget is launched
		loadWidget();
		
		launchWidget('aboutprovictores');
		
		//When The Guild Members widget is launched		
		launchWidget('guildmembers');
		
		//Then The about widget should have the .pv-previous class
		//  The Guild Members widget should have the .pv-current class
		launchWidget('aboutprovictores');
		
		//Then The about widget should have the .pv-previous class
		//  The Guild Members widget should have the .pv-current class
		runs(function(){
			expect(_launcher.find('.pv-aboutprovictores').length).toBeGreaterThan(0);
			expect(_launcher.find('.pv-aboutprovictores').length).toBeLessThan(2);
			expect(_launcher.find('.pv-current').length).toBeLessThan(2);
		});
	});
	
	it('should not reload a widget if the widget was a child widget', function(){
		//Given The about widget is launched
		loadWidget();
		
		launchWidget('home');
		
		//When The Guild Members widget is launched
		launchWidget('aboutprovictores');
		
		//Then The about widget should have the .pv-previous class
		//  The Guild Members widget should have the .pv-current class
		launchWidget('home');
		
		//Then The about widget should have the .pv-previous class
		//  The Guild Members widget should have the .pv-current class
		launchWidget('guildmembers');
		
		//Then The about widget should have the .pv-previous class
		//  The Guild Members widget should have the .pv-current class
		runs(function(){
			expect(_launcher.find('.pv-aboutprovictores').length).toEqual(0);
			expect(_launcher.find('.pv-aboutprovictores').length).toBeLessThan(2);
			expect(_launcher.find('.pv-current').length).toBeLessThan(2);
			expect(_launcher.find('.pv-forward').length).toBeLessThan(2);
		});
	});
	
	it('should disable widget events of widgets in pv-previous zone', function(){
		//Given the home widget is launched in pv-previous zone
		loadWidget();
		
		launchWidget('home');
		launchWidget('aboutprovictores');
		
		//When clicking on the guildmember the guildmember widget should not be loaded
		runs(function(){
			expect(_launcher.find('.pv-home.pv-disabled').length).toEqual(1);
		});
	});
	
	it('should disable widget events of widgets in pv-forward zone', function(){
		//Given the home widget is launched in pv-forward zone
		loadWidget();
		
		launchWidget('home');
		launchWidget('aboutprovictores');
		launchWidget('home');
		
		//When clicking on the guildmember the guildmember widget should not be loaded
		runs(function(){
			expect(_launcher.find('.pv-aboutprovictores.pv-disabled').length).toEqual(1);
		});
	});
	
	it('should open the widget when clicked on the previous widget', function(){
		//Given the home widget is launched in pv-previous zone
		loadWidget();
		
		launchWidget('home');
		launchWidget('aboutprovictores');
		//When clicking on previous zone
		clickWidget('.pv-previous');
		
		//Then the about provictores should move to a disabled zone
		runs(function(){
			expect(_launcher.find('.pv-aboutprovictores.pv-disabled').length).toEqual(1);
		});
	});
	
	it('should open the widget when clicked on the forward widget', function(){
		//Given the about widget is launched in pv-forward zone
		loadWidget();
		
		launchWidget('home');
		launchWidget('aboutprovictores');
		launchWidget('home');
		
		//When clicking on forward zone
		clickWidget('.pv-forward');
		
		//Then the about provictores should move to a disabled zone
		runs(function(){
			expect(_launcher.find('.pv-home.pv-disabled').length).toEqual(1);
		});
	});
	
	it('should push the current widget to previous zone', function(){
		//Given the about widget is launched in pv-forward zone
		loadWidget();
		
		launchWidget('home');
		launchWidget('aboutprovictores');
		launchWidget('home');
		
		//When clicking on forward zone
		clickWidget('.pv-forward');
		
		//Then the about provictores should move to a disabled zone
		runs(function(){
			expect(_launcher.find('.pv-previous > .pv-home.pv-disabled').length).toEqual(1);
		});
	});
	
	function clickWidget(widget){
		var _loaded = false;
		
		runs(function(){
			_launcher.one('initialized', function(){
				_loaded = true;
			});
			
			_launcher.find(widget).click();
		});
		
		waitsFor(function(){
			return _loaded;
		});
	}
	
	function clickIn(selector){
		var _loaded = false;
		
		_launcher.one('initialized', function(){
			_loaded = true;
		});
		_launcher.find(selector).click();
		
		waitsFor(function(){
			return _loaded;
		});
	}
	
	function launchWidget(widgetId){
		clickWidget('#launch-' + widgetId);
	}
	
	function loadWidget(){
		
		var _loaded = false;
		
		require(['util/loader'], function(){
			_launcher.widget().then(function(){
				_loaded = true;
			});
		});
		
		waitsFor(function(){
			return _loaded;
		});
		
	}
});