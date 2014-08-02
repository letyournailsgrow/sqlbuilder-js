Ext.define('Ext.letyourneilsgrow.screen.SQLQueryBuilderPanel', {
    extend: 'Ext.panel.Panel',
    requires:[
	"Ext.letyourneilsgrow.screen.SQLQueryBuilderTableTree",
	"Ext.letyourneilsgrow.screen.SQLQueryBuilderTableWindow",
	"Ext.letyourneilsgrow.screen.SQLQueryBuilderTableZonePanel",
	"Ext.letyourneilsgrow.screen.SQLQueryBuilderResultPanel",
	
	"Ext.letyourneilsgrow.screen.SQLQueryBuilderTableFieldsGrid",
	
	//model
	"Ext.letyourneilsgrow.model.SQLTableModel"
    ],
	
    layout: {
        type: 'border'
    },
    title: 'SQL Query Builder',
    
     items:[
	{
		xtype: 'panel',
		border: false,
		margin: 5,
		layout: {
		    type: 'border'
		},
		region: 'center',
		split: true,
		items: [
			{
			    xtype: 'sqbtabletree',
			    html:'SELECT/DRAG TABLES ZONE',	
			    border: false,
			    region: 'west',
			    width: 300,
			    split: true
			},{
			    xtype: 'sqbtablezonepanel',
			    html:'TABLES SELECTED',	
			    border: false,
			    region: 'center',
			    split: true,
			    layout: 'fit'
			}, {
		            xtype: 'panel',
			    html:'PROJECTION & SELECTION',	
			    border: false,
			    region: 'south',
			    height: 150,
			    split: true
			}]
	},
	{
		xtype:'sqbresultpanel',
		border: false,
		region: 'south',
		autoScroll: true,
		html: 'SQL ...<br>FROM ...',
		margin: 3,
		padding:2,
		height: 100,
		split: true
	},
     ],
	
     initComponent: function(){
        this.callParent(arguments);
    }
});
