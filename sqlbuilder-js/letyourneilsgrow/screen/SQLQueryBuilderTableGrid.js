Ext.define('Ext.letyourneilsgrow.screen.SQLQueryBuilderTableFieldsGrid', {
    extend: 'Ext.grid.Panel',
    alias: ['widget.sqbtablefieldsgrid'],
    border: false,
    hideHeaders: true,
	
    initComponent: function(){
    
        this.columns = [{
		    xtype: 'gridcolumn',
		    width: 16,
		    dataIndex: 'key',
		    renderer: function(val, meta, model){
			if (val == 'PRI') {
			    meta.style = 'background-image:url(resources/images/key.gif) !important;background-position:2px 3px;background-repeat:no-repeat;';
			}
			return '&nbsp;';
		    }
		}, {
		    xtype: 'gridcolumn',
		    flex: 1,
		    dataIndex: 'field',
		    renderer: function(val, meta, model){
			if (model.get('key') == 'PRI') {
			    return '<span style="font-weight: bold;">' + val + '</span>&nbsp;&nbsp;<span style="color:#aaa;">' + model.get('type') + '</span>';
			}
			return val + '&nbsp;&nbsp;<span style="color:#999;">' + model.get('type') + '</span>';
			
		    }
        }];
        
        this.selModel = Ext.create('Ext.selection.CheckboxModel', {
            mode: 'SIMPLE',
            checkOnly: true,
            listeners: {
                select: function(selModel, data){
			
                },
                deselect: function(selModel, data){
                   
		}
            }
        });
        
        this.callParent(arguments);
    }
    
});