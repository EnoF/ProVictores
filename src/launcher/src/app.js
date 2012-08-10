define(['util/loader', 'util/service'],
function(loader, service){
	var _private = {
			widget : null,
			loadSection : null,
			iterateWidgetStack : function(newWidget){
				var _currentWidget = _private.widget.find('.pv-current'),
					_previousWidget = _private.widget.find('.pv-previous'),
					_forwardWidget = _private.widget.find('.pv-forward');
				_forwardWidget.destroy();
				_previousWidget.destroy();
				newWidget.addClass('pv-forward');
				_private.pushCurrentToPrevious(newWidget);
			},
			pushCurrentTo : function(newState){
				var _current = _private.widget.find('.pv-current');
				
				_current.removeClass('pv-current');
				_current.addClass('pv-' + newState);
				_current.find('article').addClass('pv-disabled');
			},
			pushCurrentFrom : function(oldState){
				var _old = _private.widget.find('.pv-' + oldState);
				
				_old.removeClass('pv-' + oldState).removeClass('pv-hidden');
				_old.addClass('pv-current');
				_old.find('.pv-disabled').removeClass('pv-disabled');
			},
			pushCurrentToForward : function(widget){
				_private.pushCurrentTo('forward');
				_private.pushCurrentFrom('previous');
			},
			pushCurrentToPrevious : function(widget){
				_private.pushCurrentTo('previous');
				_private.pushCurrentFrom('forward');
			},
			loadPreviousWidget : function(widgetId){
				var _previousWidget,
					_forwardWidget,
					_current = _private.widget.find('.pv-current'),
					_loaded = $.Deferred();
				//Return when trying to load the widget which is already loaded
				if(_current.children('.pv-' + widgetId).length > 0){
					_loaded.resolve();
				}
				_previousWidget = _private.widget.find('.pv-content > .pv-previous > .pv-' + widgetId);
				_forwardWidget = _private.widget.find('.pv-content > .pv-forward > .pv-' + widgetId);
				//A widget can only be opened once
				//Therefore if trying to load a widget in either previous or forward state
				//Push accordingly
				if(_previousWidget.length > 0){
					_private.pushCurrentToForward(_previousWidget);
					_loaded.resolve();
				}else if(_forwardWidget.length > 0){
					_private.pushCurrentToPrevious(_forwardWidget);
					_loaded.resolve();
				}else{
					//When the widget was not loaded before
					//Loading a previous widget has failed
					_loaded.reject();
				}
				return _loaded;
			},
			getWidget : function(widgetId){
				_private.loadPreviousWidget(widgetId).then(function(){
					//Notify the widget all widgets have been initialised
					_private.widget.trigger('initialized');
				}).fail(function(){
					_widget = $('<section>').data('widget', widgetId);	
					_private.loadSection.append(_widget);
					_private.iterateWidgetStack(_widget);	
					//Widget will be notified when initialized
					_widget.widget();
				});
			},
			bindEvents : function(widget){
				widget.on('click', 'nav a', function(event){
					event.preventDefault();
					var _widgetId = this.id.replace(/launch\-/, '');
					_private.getWidget(_widgetId);
				});
				
				widget.on('click', '.pv-previous, .pv-forward', function(){
					var _widgetId = $(this).data('widget');
					_private.getWidget(_widgetId);
				});
			}
		},
		_public = {
			initialize : function(widget){
				_private.widget = widget;
				_private.loadSection = widget.find('section:first');
				_private.bindEvents(widget);
				return $.Deferred().resolve();
			}
		};
	
	return _public;
});
