define(['util/loader', 'util/service'],
function(loader, service){
	var _private = {
			widget : null,
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
		},
		_public = {
			initialize : function(widget){
				_private.widget = widget;
				_private.bindEvents(widget);
				return _private.loadMemberList();
			}
		};
	
	return _public;
});
