Ext.define('Ext.letyourneilsgrow.sqlquerybuilder.ui.SQLQueryBuilderPanel', {
    extend: 'Ext.panel.Panel',
    requires:[
	"Ext.letyourneilsgrow.sqlquerybuilder.ui.SQLTableListTree",
	
	"Ext.letyourneilsgrow.sqlquerybuilder.ui.SQLQueryBuilderTableZonePanel",
	"Ext.letyourneilsgrow.sqlquerybuilder.ui.SQLQueryBuilderResultPanel",
	
	
	
	"Ext.letyourneilsgrow.sqlquerybuilder.ui.SQLTableWindow",
	"Ext.letyourneilsgrow.sqlquerybuilder.ui.SQLTableWindowGrid",
	
	"Ext.letyourneilsgrow.sqlquerybuilder.ui.SQLProjectionAndSelectionGrid",
	
	//model
	"Ext.letyourneilsgrow.sqlquerybuilder.model.SQLTableModel",
	"Ext.letyourneilsgrow.sqlquerybuilder.model.SQLProjectionAndSelectionModel",

	//store
	"Ext.letyourneilsgrow.sqlquerybuilder.store.SQLProjectionAndSelectionStore"
		
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
	// must be move to another place (controller)      
        this.projectionAndSelectionStore = Ext.create('Ext.letyourneilsgrow.sqlquerybuilder.store.SQLProjectionAndSelectionStore', {
            storeId: 'SQLProjectionAndSelectionStore'
        });
	
        this.callParent(arguments);
    }
});
