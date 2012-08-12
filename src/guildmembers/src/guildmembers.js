define(['util/loader', 'util/service'],
function(loader, service){
	function Guildmembers(widget){
		var _private = {
			widget : widget,
			placeholder : widget.find('.pv-widget-placeholder'),
			bindEvents : function(){
				_private.widget.on('click', 'li', function(){
					if(_private.widget.is('.pv-disabled')) return;
					var _li = $(this),
						_member = _li.data('guildmember'),
						_memberWidget = _private.placeholder;
					_memberWidget.data('widget', 'guildmember');
					_memberWidget.data('widgetParams', _member);
					_private.placeholder.find('.pv-guildmember').destroy();
					_memberWidget.widget();
				});
			},
			loadMemberList : function(){
				var _deferred = $.Deferred();
				service.get('guildmember').then(function(memberList){
					loader.loadTemplate('guildmembers', 'guildmember').then(function(template){
						var _member,
							_currentMember,
							_memberEntry;
						for(_member in memberList){
							_currentMember = memberList[_member];
							_memberEntry = template.find("li").clone();
							_memberEntry.find(".pv-guildmember-name").text(_currentMember.name);
							_memberEntry.find(".pv-guildmember-avatar").text(_currentMember.avatar);
							_memberEntry.find(".pv-guildmember-rank").text(_currentMember.rank);
							_memberEntry.attr('data-guildmember', _currentMember.id);
							_private.widget.find("ol").append(_memberEntry);
						}
						
						_deferred.resolve();
					}).fail(function(){
						_deferred.reject();
					});
				}).fail(function(){
					_deferred.reject();
				});
				return _deferred;
			}
		};
		
		this.loadMemberList = _private.loadMemberList;
		
		_private.bindEvents();
	}
	
	return Guildmembers;
});
