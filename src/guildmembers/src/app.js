define(function(){
	var _private = {
			bindEvents : function(widget){
				widget.on('click', 'li', function(){
					console.debug("CLICKED", this);
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
