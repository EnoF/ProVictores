define(function(){
	var _private = {
			bindEvents : function(widget){
			}
		},
		_public = {
			initialize : function(widget, params){
				if(params === undefined){
					throw new Error("Define the params to initialize GuildMember Widget")
				}
				widget.find('.pv-guildmember-name').text(params.name);
				widget.find('.pv-guildmember-rank').text(params.rank);
				_private.bindEvents(widget);
			}
		};
	
	return _public;
});
