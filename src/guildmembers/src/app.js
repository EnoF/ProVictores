define(['./guildmembers'],
function(Guildmembers){
	
	var	_public = {
		initialize : function(widget){
			var _guildmemberList = new Guildmembers(widget);
			return _guildmemberList.loadMemberList();
		}
	};
	
	return _public;
});
