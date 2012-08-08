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
				_private.pushCurrentTo('previous');
				newWidget.addClass('pv-current');
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
					_current = _private.widget.find('.pv-current');
				if(_current.children('.pv-' + widgetId).length > 0){
					_private.widget.trigger('initialized');
					return _current;
				}
				_previousWidget = _private.widget.find('.pv-content > .pv-previous > .pv-' + widgetId);
				_forwardWidget = _private.widget.find('.pv-content > .pv-forward > .pv-' + widgetId);
				if(_previousWidget.length > 0){
					_private.pushCurrentToForward(_previousWidget);
					_private.widget.trigger('initialized');
					return _previousWidget;
				}else if(_forwardWidget.length > 0){
					_private.pushCurrentToPrevious(_forwardWidget);
					_private.widget.trigger('initialized');
					return _forwardWidget;
				}else{
					return [];
				}
			},
			getWidget : function(widgetId){
				var _widget = _private.loadPreviousWidget(widgetId);
				if(_widget.length === 0){
					_widget = $('<section>').data('widget', widgetId);	
					_private.iterateWidgetStack(_widget);	
					_private.loadSection.append(_widget);
					_widget.widget();
				}
			},
			bindEvents : function(widget){
				widget.on('click', 'nav a', function(event){
					event.preventDefault();
					var _widgetId = this.id.replace(/launch\-/, '');
					_private.getWidget(_widgetId);
				});
				
				widget.on('click', '.pv-previous, .pv-forward', function(){
					var _widgetId = $(this).data('widget');
					_private.loadPreviousWidget(_widgetId);
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
