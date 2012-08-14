define(['util/loader', 'util/service'],
function(loader, service){
	function Announcement(widget, id){
		
		var _private = {
			id : id,
			widget : widget,
			loadAnnouncement : function(){
				var _announcementLoaded = $.Deferred();
				
				service.get('announcement/' + _private.id).then(function(announcement){
					try{
						var _postTime = new Date(announcement.postTime),
							_month = _postTime.getMonth() + 1 + "",
							_date,
							_minutes = _postTime.getMinutes().toString(),
							_time;
						_month = _month.length === 2 ? _month : "0" + _month;
						_date = _postTime.getDate() + "-" + 
								_month + "-" +
								_postTime.getFullYear();
						_minutes = _minutes.length === 2 ? _minutes : "0" + _minutes;
						_time = _postTime.getHours() + ":" + _minutes;
						_private.widget.find('.pv-title').text(announcement.title);
						_private.widget.find('.pv-name').text(announcement.author.name);
						_private.widget.find('.pv-date').text(_date);
						_private.widget.find('.pv-time').text(_time);
						_private.widget.find('.pv-message').text(announcement.message);
						
						_announcementLoaded.resolve();
					}catch(e){
						_announcementLoaded.reject(e);
					}
				}).fail(function(){
					_announcementLoaded.reject();
				});
				
				return _announcementLoaded;
			}
		};
		
		this.loadAnnouncement = _private.loadAnnouncement;
	}
	
	return Announcement;
});
