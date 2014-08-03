Ext.define('Ext.letyourneilsgrow.sqlquerybuilder.view.SQLQueryBuilderPanel', {
    extend: 'Ext.panel.Panel',
    requires:[
	"Ext.letyourneilsgrow.sqlquerybuilder.view.SQLTableListTree",
	
	"Ext.letyourneilsgrow.sqlquerybuilder.view.SQLQueryBuilderTableZonePanel",
	"Ext.letyourneilsgrow.sqlquerybuilder.view.SQLQueryBuilderResultPanel",
	
	"Ext.letyourneilsgrow.sqlquerybuilder.view.SQLTableWindow",
	"Ext.letyourneilsgrow.sqlquerybuilder.view.SQLTableWindowGrid",
	
	"Ext.letyourneilsgrow.sqlquerybuilder.view.SQLProjectionAndSelectionGrid",
	
	//model
	"Ext.letyourneilsgrow.sqlquerybuilder.model.SQLTableModel",
	"Ext.letyourneilsgrow.sqlquerybuilder.model.SQLProjectionAndSelectionModel",
	"Ext.letyourneilsgrow.sqlquerybuilder.model.SQLJoinModel",

	//store
	"Ext.letyourneilsgrow.sqlquerybuilder.store.SQLTableStore",
	"Ext.letyourneilsgrow.sqlquerybuilder.store.SQLProjectionAndSelectionStore",
	"Ext.letyourneilsgrow.sqlquerybuilder.store.SQLJoinStore",
	
	//controller	
	"Ext.letyourneilsgrow.sqlquerybuilder.controller.SQLQueryBuilderController"
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
			    xtype: 'sqltablelisttree',
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
		            xtype: 'sqlprojectionandselectiongrid',
			//	xtype:'panel',
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
	var sqlQueryBuilderController = Ext.create("Ext.letyourneilsgrow.sqlquerybuilder.controller.SQLQueryBuilderController");	 
	
        this.callParent(arguments);
    }
});
