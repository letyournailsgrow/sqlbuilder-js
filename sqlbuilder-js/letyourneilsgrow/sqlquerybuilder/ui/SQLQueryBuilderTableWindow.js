Ext.define('Ext.letyourneilsgrow.sqlquerybuilder.ui.SQLQueryBuilderTableWindow', {
    extend: 'Ext.window.Window',
    minWidth: 150,
    alias: ['widget.sqltablewindow'],
 
    height: 200,
    width: 150,
  
    layout: {
        type: 'fit'
    },
    closable: true,
    
    listeners: {
        show: function(){
            
        },
        beforeclose: function(){
            
        }
    },
    
  
    
     initComponent: function(){
        
        // UUID
        this.tableId = 1;
        
        var store = Ext.create('Ext.data.Store', {
            autoLoad: true,
            fields: [{
                name: 'id',
                type: 'string'
            }, {
                name: 'tableName',
                type: 'string'
            }, {
                name: 'tableId',
                type: 'string',
                defaultValue: this.tableId
            }, {
                name: 'field',
                type: 'string'
            }, {
                name: 'extCmpId',
                type: 'string',
                defaultValue: this.id
            }, {
                name: 'type',
                type: 'string'
            }, {
                name: 'null',
                type: 'string'
            }, {
                name: 'key',
                type: 'string'
            }, {
                name: 'default',
                type: 'string'
            }, {
                name: 'extra',
                type: 'string'
            }],
            proxy: {
                type: 'ajax',
                url: 'data/database/getTableFields',
                extraParams: {
                    tablename: this.title
                },
                reader: {
                    type: 'json'
                }
            }
        });
        
        tableModel = Ext.create("Ext.letyourneilsgrow.sqlquerybuilder.model.SQLTableModel", {
            id: this.tableId,
            name: this.title,
            alias: ''
        });
	        
        this.items = [{
            xtype: 'sqbtablefieldsgrid',
            store: store
        }];
        
        this.callParent(arguments);
    },
});