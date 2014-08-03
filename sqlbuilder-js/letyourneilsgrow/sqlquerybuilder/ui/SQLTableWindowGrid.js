Ext.define('Ext.letyourneilsgrow.sqlquerybuilder.ui.SQLTableWindowGrid', {
    extend: 'Ext.grid.Panel',
    alias: ['widget.sqbtablefieldsgrid'],
    border: false,
    hideHeaders: true,
	
   viewConfig: {
        listeners: {
		render: function(view){
			this.dd = {};
			
			this.dd.dragZone = new Ext.view.DragZone({
			    view: view,
			    ddGroup: 'SQLTableWindowGridDDGroup',
			    dragText: '{0} selected table column{1}',
			    onInitDrag: function(x, y){
				var me = this, 
				      data = me.dragData, 
				      view = data.view, 
				      selectionModel = view.getSelectionModel(), 
				      record = view.getRecord(data.item), 
				      e = data.event;
				data.records = [record];
				me.ddel.update(me.getDragText());
				me.proxy.update(me.ddel.dom);
				me.onStartDrag(x, y);
				return true;
			    }
			});
			
			this.dd.dropZone = new Ext.grid.ViewDropZone({
			    view: view,
			    ddGroup: 'SQLTableWindowGridDDGroup',
			    handleNodeDrop: function(data, record, position){
				    
			    },
			    onNodeOver: function(node, dragZone, e, data){
				var me = this, 
				      view = me.view, 
				      pos = me.getPosition(e, node), 
				      overRecord = view.getRecord(node), 
				      draggingRecords = data.records;
				
				if (!Ext.Array.contains(data.records, me.view.getRecord(node))) {
				    if (!Ext.Array.contains(draggingRecords, overRecord) && data.records[0].get('field') != '*') {
					me.valid = true;					
				    }
				    else {					
					me.valid = false;
				    }
				}
				return me.valid ? me.dropAllowed : me.dropNotAllowed;
			    },
			    onContainerOver: function(dd, e, data){
				var me = this;				
				me.valid = false;
				return me.dropNotAllowed;
			    }
			});
                },
		
		drop: function(node, data, dropRec, dropPosition){			     			   
			
			  if (node.boundView) {
				  /*
				var sqlTable1 = data.view.up('window');
				var sqlTable2 = Ext.getCmp(node.boundView).up('window');
				  
				sqlTable1.shadowSprite.bConnections = true;				
				sqlTable2.shadowSprite.bConnections = true;

				//var dropTable = getTableById(sqlTable1.tableId);
				//var targetTable = getTableById(sqlTable2.tableId);
				
				var connection = sqlTable2.connection(sqlTable1.shadowSprite, sqlTable2.shadowSprite, "#000", [data.item.viewIndex, node.viewIndex]);

				sqlTable1.connectionUUIDs.push(connection.uuid);
				sqlTable2.connectionUUIDs.push(connection.uuid);
								
				//connection.bgLine.el.on('contextmenu', showJoinCM, connection);
				//connection.line.el.on('contextmenu', showJoinCM, connection);
		    
				// se creaza o legaura (join) intre tabele:	
				var joinCondition = '';		
				if (dropTable.get('tableAlias') != '') {
					joinCondition = joinCondition + dropTable.get('tableAlias') + '.' + join.get('leftTableField') + '=';
				}else {
					joinCondition = joinCondition + dropTable.get('tableName') + '.' + join.get('leftTableField') + '=';
				}                    
				if (targetTable.get('tableAlias') != '') {
					joinCondition = joinCondition + targetTable.get('tableAlias') + '.' + join.get('rightTableField');
				} else {
					joinCondition = joinCondition + targetTable.get('tableName') + '.' + join.get('rightTableField');
				}
				
				var join = Ext.create('Ext.letyourneilsgrow.sqlquerybuilder.model.SQLJoinModel');			
				join.set('id', connection.uuid);			
				join.set('leftTableId', sqlTable1.tableId);			
				join.set('leftTableField', data.records[0].get('field'));			
				join.set('rightTableId', sqlTable2.tableId);			
				join.set('rightTableField', sqlTable2.down('grid').store.getAt(node.viewIndex).get('field'));			
				join.set('joinType', 'INNER');					                    
				join.set('joinCondition', joinCondition);
				*/
			}
		}
            
	}
    },
		
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