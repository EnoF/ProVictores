define(function(){
	var _private = {
			bindEvents : function(widget){
				widget.on('click', 'li', function(){
					var _li = $(this),
						_member = _li.data('guildmember'),
						_memberWidget = $('<section>');
					
					_memberWidget.data('widget', 'guildmember');
					_memberWidget.data('widgetParams', _member);
					_li.append(_memberWidget);
					_memberWidget.widget();
				});
			}
		},
		_public = {
			initialize : function(widget){
				_private.bindEvents(widget);
			}
		};
	
	return _public;
});
