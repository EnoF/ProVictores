define(['util/loader', 'util/service'],
function(loader, service){
	var _private = {
			widget : null,
			loadSection : null,
			iterateWidgetStack : function(newWidget){
				var _currentWidget = _private.widget.find('.pv-current'),
					_previousWidget = _private.widget.find('.pv-previous'),
					_forwardWidget = _private.widget.find('.pv-forward');
				_forwardWidget.remove();
				_previousWidget.remove();
				_currentWidget.removeClass('pv-current').addClass('pv-previous');
				newWidget.addClass('pv-current');
			},
			loadPreviousWidget : function(widgetId){
				var _widget,
					_container,
					_current = _private.widget.find('.pv-current');
				if(_current.children('.pv-' + widgetId).length > 0){
					_private.widget.trigger('initialized');
					return _current;
				}
				_widget = _private.widget.find('.pv-content > .pv-previous > .pv-' + widgetId + ', .pv-content > .pv-forward > .pv-' + widgetId);
				_container = _widget.parent();
				if(_widget.length > 0){
					_current.removeClass('pv-current');
					_current.addClass('pv-forward');
					_container.removeClass('pv-previous').removeClass('pv-hidden').removeClass('pv-forward');
					_container.addClass('pv-current');
					_private.widget.trigger('initialized');
				}
				
				return _widget;
			},
			getWidget : function(widgetId){
				var _widget = _private.loadPreviousWidget(widgetId);
				if(_widget.length === 0){
					_widget = $('<section>').data('widget', widgetId);	
					_private.iterateWidgetStack(_widget);	
					_private.loadSection.append(_widget);
					_widget.widget(widgetId);
				}
			},
			bindEvents : function(widget){
				widget.on('click', 'nav a', function(event){
					event.preventDefault();
					var _widgetId = this.id.replace(/launch\-/, '');
					
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
