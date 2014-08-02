Ext.define('Ext.letyourneilsgrow.screen.SQLQueryBuilderTableZonePanel', {
    extend: 'Ext.panel.Panel',
    alias: ['widget.sqbtablezonepanel'],
    id: 'SQLTableZonePanel',
    items: [{
        xtype: 'draw',
        listeners: {
            afterrender: function(){
                this.initDropTarget();
            }
        },
        initDropTarget: function(){
          
	    var me = this;
	
            // define drop zone		
            this.dropTarget = Ext.create('Ext.dd.DropTarget', this.el, {
                ddGroup: 'sqlDDGroup',
                notifyDrop: function(source, event, data){
		    me.addTableWindow(data.records[0]);	
                    return true;
                }
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
    }
    
    }]
});