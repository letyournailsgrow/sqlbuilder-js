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
		// add new rows to the SQLFieldsGrid after a drop
                //for (var i = 0, l = data.records.length; i < l; i++) {
                   // ux.vqbuilder.sqlSelect.addFieldRecord(data.records[i], false);
                //}    
            }
        }
    },
    
    columns: [{
        xtype: 'actioncolumn',
	menuDisabled: true,
        text: 'Action',
        width: 60,
	/*
	    moveGridRow: function(grid, record, index, direction){
            var store = grid.getStore();
            if (direction < 0) {
                index--;
                if (index < 0) {
                    return;
                }
            }
            else {
                index++;
                if (index >= grid.getStore().getCount()) {
                    return;
                }
            }
            // prepare manual syncing
            store.suspendAutoSync();
            // disable firing store events
            store.suspendEvents();
            // remove record and insert record at new index
            store.remove(record);
            store.insert(index, record);
            // enable firing store events
            store.resumeEvents();
            store.resumeAutoSync();
            // manual sync the store
            store.sync();
        },
	*/	    
	items: [
	    {
		icon: 'resources/images/up_arrow.gif',
		tooltip: 'Move Column Up',     
/*
		    getClass: function(value, metadata, record){
                var store, index;
                store = record.store;
                index = store.indexOf(record);
                if (index == 0) {
                    return 'x-action-icon-disabled';
                }
                else {
                    return 'x-grid-center-icon';
                }
            },
            handler: function(grid, rowIndex, colIndex){
                var rec = grid.getStore().getAt(rowIndex);
                this.moveGridRow(grid, rec, rowIndex, -1);
            }
*/		    
	    }, 
	    {
		icon: 'resources/images/down_arrow.gif',      
/*
		    getClass: function(value, metadata, record){
                var store, index;
                store = record.store;
                index = store.indexOf(record);
                if ((index + 1) == store.getCount()) {
                    return 'x-action-icon-disabled';
                }
                else {
                    return 'x-grid-center-icon';
                }
            },
            tooltip: 'Move Column Down',
            handler: function(grid, rowIndex, colIndex){
                var rec = grid.getStore().getAt(rowIndex);
                this.moveGridRow(grid, rec, rowIndex, 1);
            }
*/		    
	    }, 
	    {
		icon: 'resources/images/remove.gif',
		iconCls: 'x-grid-center-icon',
		tooltip: 'Delete Column',      
/*
 handler: function(grid, rowIndex, colIndex){
                var rec = grid.getStore().getAt(rowIndex), store, tableId, tableGrid, selectionModel, bDel = true;
                // rec contains column grid model, the one to remove
                // get tableId of original sqltable
                tableId = rec.get('extCmpId');
                // get the sql tables grid and its selection
                tableGrid = Ext.getCmp(tableId).down('gridpanel');
                selectionModel = tableGrid.getSelectionModel();
                Ext.Array.each(selectionModel.getSelection(), function(selection){
                    // deselect the selection wich corresponds to the column 
                    // we want to remove from the column grid
                    if (rec.get('id') == selection.get('id')) {
                        // deselect current selection
                        // deselection will lead to removal, look for method deselect at the SQLTableGrid
                        selectionModel.deselect(selection);
                        bDel = false;
                    }
                });
                if (bDel) {
                    store = grid.getStore();
                    store.remove(rec);
                }
            }
*/	    
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
