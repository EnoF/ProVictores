define(['util/loader', 'util/service'],
function(loader, service){
	var _private = {
			widget : null,
			loadSection : null,
			iterateWidgetStack : function(newWidget){
				var _currentWidget = _private.widget.find('.pv-current'),
					_previousWidget = _private.widget.find('.pv-previous');
				_previousWidget.removeClass('pv-previous');
				_currentWidget.removeClass('pv-current').addClass('pv-previous');
				newWidget.addClass('pv-current');
			},
			bindEvents : function(widget){
				widget.on('click', 'nav a', function(event){
					event.preventDefault();
					var _widgetId = this.id.replace(/launch\-/, ''),
						_newWidget = $('<section>').data('widget', _widgetId);
					_private.iterateWidgetStack(_newWidget);	
					_private.loadSection.append(_newWidget);
					_newWidget.widget(_widgetId);
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
