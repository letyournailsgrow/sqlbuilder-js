Ext.define('Ext.letyournailsgrow.sqlquerybuilder.view.SQLProjectionAndSelectionGrid', {
    extend: 'Ext.grid.Panel',
    requires: ['Ext.ux.CheckColumn'],	    
    alias: ['widget.sqlprojectionandselectiongrid'],
    id: 'SQLProjectionAndSelectionGrid',
    store: 'SQLProjectionAndSelectionStore',
    columnLines: true,
    
    plugins: [
		Ext.create('Ext.grid.plugin.CellEditing', {
			clicksToEdit: 1
		})
    ],
	
    viewConfig: {
        listeners: {
            render: function(view){
                this.dd = {};
                this.dd.dropZone = new Ext.grid.ViewDropZone({
                    view: view,
                    ddGroup: 'SQLProjectionAndSelectionGridDDGroup',
                    handleNodeDrop: function(data, record, position){
                        
                    }
                });
            },
            drop: function(node, data, dropRec, dropPosition){
		    
            }
        }
    },
    
    columns: [{
        xtype: 'actioncolumn',
	menuDisabled: true,
        text: 'Action',
        width: 60,
	    
	items: [
	    {
		icon: 'resources/images/up_arrow.gif',
		tooltip: 'Move Column Up',           
	    }, 
	    {
		icon: 'resources/images/down_arrow.gif',            
	    }, 
	    {
		icon: 'resources/images/remove.gif',
		iconCls: 'x-grid-center-icon',
		tooltip: 'Delete Column',            
	}]
    }, {
        xtype: 'checkcolumn',
	sortable: false,
        text: 'Output',
        flex: 0.075,
        menuDisabled: true,
        dataIndex: 'output',
	align: 'center'
    }, {
        xtype: 'gridcolumn',
        text: 'Expression',
	sortable: false,
	menuDisabled: true,
        flex: 0.225,
        dataIndex: 'expression',
        editor: 'textfield'
    }, {
        xtype: 'gridcolumn',
        text: 'Aggregate',
        flex: 0.125,
	sortable: false,
        menuDisabled: true,
        dataIndex: 'aggregate',
        editor: 'textfield'
    }, {
        xtype: 'gridcolumn',
        text: 'Alias',
        flex: 0.125,
	sortable: false,
        menuDisabled: true,
        dataIndex: 'alias',
        editor: 'textfield'
    }, {
        xtype: 'gridcolumn',
        text: 'Sort Type',
        flex: 0.125,
	sortable: false,
        menuDisabled: true,
        dataIndex: 'sorttype'
    }, {
        xtype: 'gridcolumn',
        text: 'Sort Order',
        flex: 0.125,
	sortable: false,
        menuDisabled: true,
        dataIndex: 'sortorder'
    }, {
        xtype: 'checkcolumn',
        text: 'Grouping',
        flex: 0.075,
	sortable: false,
        menuDisabled: true,
        dataIndex: 'grouping',
	align: 'center'
    }, {
        xtype: 'gridcolumn',
        text: 'Criteria',
        flex: 0.125,
	sortable: false,
        menuDisabled: true,
        dataIndex: 'criteria',
        editor: 'textfield'
    }],
    
    initComponent: function(){
        this.callParent(arguments);
    }
        
});
