Ext.define
	(
	'SMO.view.user.List',
		{
		extend: 'Ext.grid.Panel',
		alias : 'widget.userlist',
		title : 'All Users',
		store: 'Users',
		columns:
			[
				{header: 'LastName',  dataIndex: 'lastname',  flex: 1},
				{header: 'FirstName',  dataIndex: 'firstname',  flex: 1},
				{header: 'Type user', dataIndex: 'type', flex: 1},
				{header: 'Login', dataIndex: 'username', flex: 1},
				{header: 'Email', dataIndex: 'email', flex: 1},
				{header: 'Pass', dataIndex: 'password', flex: 1},
				{header: 'Country', dataIndex: 'country', flex: 1},
				{header: 'Sity', dataIndex: 'sity', flex: 1},
				{header: 'Gender', dataIndex: 'gender', flex: 1},
				{header: 'Age', dataIndex: 'age', flex: 1},
				{header: 'Birthday', dataIndex: 'birthday', flex: 1}
			]
		}
	);

