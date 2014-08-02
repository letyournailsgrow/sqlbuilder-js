Ext.define('Ext.letyourneilsgrow.screen.SQLQueryBuilderTableTree', {
    extend: 'Ext.tree.Panel',
    alias: ['widget.sqbtabletree'],
    id: 'sqbTableTree',

    rootName: "Tabele",
	
    listeners: {
	    
        afterrender: function(){
            this.initTreeDragZone();
        },
	
        itemdblclick: function(view, record, el, index, event){
	    this.addTableWindow(record);
        }
    },
    
    initTreeDragZone: function(){
	// define drag zone    
        this.view.dragZone = new Ext.tree.ViewDragZone({
            view: this.view,
            ddGroup: 'sqlDDGroup',
            dragText: '{0} tabel {1}'
        });
    },
    
    addTableWindow:function(record){
	var sqlTablePanel = Ext.getCmp('SQLTableZonePanel');

	var tableWindow = sqlTablePanel.add({
		xtype: 'sqltablewindow',
		constrain: true,
		title: record.get('text')
	});
	
	tableWindow.show();
    },
	
    initComponent: function(){
    
	var me = this;
	    
        this.store = Ext.create('Ext.data.TreeStore', {
            root: {
                text: me.rootName,
                expanded: true
            },
            proxy: {
                type: 'ajax',
                url: 'data/database/getTables'
            }
        });
        
        this.callParent(arguments);
    }
});