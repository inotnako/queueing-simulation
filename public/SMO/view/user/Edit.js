Ext.define
	(
	'SMO.view.user.Edit', 
		{
		extend: 'Ext.window.Window',
		alias : 'widget.useredit',
		requires: ['Ext.form.Panel'],
		title : 'Edit User',
		layout: 'fit',
		autoShow: true,
		height: 370,
		width: 280,
		
		initComponent: function()
			{
			this.items = 
				[
					{
					xtype: 'form',
					padding: '5 5 0 5',
					border: false,
					style: 'background-color: #fff;',
					items: 
						[
							{
							xtype: 'textfield',
							name : 'lastname',
							fieldLabel: 'Last name'
							},
							{
							xtype: 'textfield',
							name : 'firstname',
							fieldLabel: 'First name'
							},
							{
							xtype: 'textfield',
							name : 'country',
							fieldLabel: 'Country'
							},
							{
							xtype: 'textfield',
							name : 'sity',
							fieldLabel: 'Sity'
							},
							{
							xtype: 'textfield',
							name : 'type',
							fieldLabel: 'Type user'
							},
							{
							xtype: 'textfield',
							name : 'username',
							fieldLabel: 'Login'
							},
							{
							xtype: 'textfield',
							name : 'email',
							fieldLabel: 'Email'
							},
							{
							xtype: 'textfield',
							name : 'password',
							fieldLabel: 'Pass'
							},
							{
							xtype: 'textfield',
							name : 'gender',
							fieldLabel: 'Gender'
							},
							{
							xtype: 'textfield',
							name : 'age',
							fieldLabel: 'Age'
							},
							{
							xtype: 'datefield',
							name : 'birthday',
							fieldLabel: 'Birthday'
							}
						]
					}
				];
			this.buttons =
				[
					{
					text: 'Save',
					action: 'save'
					},
					{
					text: 'Cancel',
					scope: this,
					handler: this.close
					}
				];
			this.callParent(arguments);
			}
		}
	);