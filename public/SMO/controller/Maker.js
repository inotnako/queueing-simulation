Ext.define
	(
	'SMO.controller.Maker',
		{
		extend: 'Ext.app.Controller',
		stores: ['Users'],
		models: ['User'],
	//	views: 
	//		['editor.Canvas'],
		refs: 
			[
				{
				ref: 'canvas',
				selector: 'editorcanvas'
				}
			],
		init: function() 
			{
			this.control
				(
					{
					'canvas': 
						{
						itemdblclick: this.editCanvas
						}
					}
				);
			},
		editCanvas: function() 
			{
			Ext.Msg.alert('','editCanvas');
			}
		}
	);