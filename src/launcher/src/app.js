define(['util/loader', 'util/service'],
function(loader, service){
	var _private = {
			widget : null,
			loadSection : null,
			bindEvents : function(widget){
				widget.on('click', 'nav a', function(event){
					event.preventDefault();
					var _widgetId = this.id.replace(/launch\-/, ''),
						_newWidget = $('<section>').data('widget', _widgetId);
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
