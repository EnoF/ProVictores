define(['./guildmembers'],
function(Guildmembers){
	
	var	_public = {
		initialize : function(widget, state){
			var _guildmemberList = new Guildmembers(widget, state);
			return _guildmemberList.loadMemberList();
		}
	};
	
	return _public;
});
