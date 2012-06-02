Ext.define
	(
	'SMO.store.Users',
		{
		extend: 'Ext.data.Store',
		model: 'SMO.model.User',
		autoLoad: true, 
		proxy: 
			{
			type: 'ajax',
			api: 
				{
				read: '/read',
				update: '/update'
				},
			reader: 
				{
				type: 'json',
				root: 'users',
				successProperty: 'success'
				},
			writer:
				{
				type:'json'
				}
			}
		}
	);
