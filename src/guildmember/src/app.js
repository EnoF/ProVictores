define(['util/service'],
function(service){
	var _private = {
			bindEvents : function(widget){
			}
		},
		_public = {
			initialize : function(widget, id){
				if(id === undefined){
					throw new Error("Define the params to initialize GuildMember Widget")
				}
				return service.get('services/guildmember/' + id).then(function(member){
					widget.find('.pv-guildmember-name').text(member.name);
					widget.find('.pv-guildmember-rank').text(member.rank);

					_private.bindEvents(widget);
				}).fail(function(){
					
				});
			}
		};
	
	return _public;
});
