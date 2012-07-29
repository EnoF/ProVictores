define(function(){
	var _private = {
			bindEvents : function(widget){
				widget.on('click', 'li', function(){
					var _li = $(this),
						_member = _li.data('guildmember'),
						_memberWidget = $('<section>');
					_memberWidget.data('widget', 'guildmember');
					_memberWidget.data('widgetParams', _member);
					widget.find('.pv-guildmember').destroy();
					_li.append(_memberWidget);
					_memberWidget.widget();
				});
			}
		},
		_public = {
			initialize : function(widget){
				_private.bindEvents(widget);
				return $.Deferred().resolve();
			}
		};
	
	return _public;
});
