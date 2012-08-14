define(['./announcement'],
function(Announcement){
	var _private = {
			
		},
		_public = {
			initialize : function(widget, id){
				var _announcement = new Announcement(widget, id);
				return _announcement.loadAnnouncement();
			}
		};
	
	return _public;
});
