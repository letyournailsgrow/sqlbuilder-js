Ext.define('Ext.letyournailsgrow.sqlquerybuilder.view.SQLQueryBuilderPanel', {
    extend: 'Ext.panel.Panel',
    requires:[
	"Ext.letyournailsgrow.sqlquerybuilder.view.SQLTableListTree",
	
	"Ext.letyournailsgrow.sqlquerybuilder.view.SQLQueryBuilderTableZonePanel",
	"Ext.letyournailsgrow.sqlquerybuilder.view.SQLQueryBuilderResultPanel",
	"Ext.letyournailsgrow.sqlquerybuilder.view.SQLTableWindow",
	"Ext.letyournailsgrow.sqlquerybuilder.view.SQLTableWindowGrid",
	
	"Ext.letyournailsgrow.sqlquerybuilder.view.SQLProjectionAndSelectionGrid",
	
	"Ext.letyournailsgrow.sqlquerybuilder.view.SQLTableSprite",
	
	//model
	"Ext.letyournailsgrow.sqlquerybuilder.model.SQLTableModel",
	"Ext.letyournailsgrow.sqlquerybuilder.model.SQLProjectionAndSelectionModel",
	"Ext.letyournailsgrow.sqlquerybuilder.model.SQLJoinModel",

	//store
	"Ext.letyournailsgrow.sqlquerybuilder.store.SQLTableStore",
	"Ext.letyournailsgrow.sqlquerybuilder.store.SQLProjectionAndSelectionStore",
	"Ext.letyournailsgrow.sqlquerybuilder.store.SQLJoinStore",
	
	//controller	
	"Ext.letyournailsgrow.sqlquerybuilder.controller.SQLQueryBuilderController"
    ],
	
    layout: {
        type: 'border'
    },
    title: 'SQL Query Builder',
    
    id:"SQLQueryBuilderPanel",
    
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
	this.sqlQueryBuilderController = Ext.create("Ext.letyournailsgrow.sqlquerybuilder.controller.SQLQueryBuilderController");	 
        this.callParent(arguments);
    },
    
    getController:function(){
	return this.sqlQueryBuilderController;
    }
    
});
