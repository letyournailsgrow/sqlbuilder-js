Ext.define('Ext.letyournailsgrow.sqlquerybuilder.controller.SQLQueryBuilderController', {
	
    config: {
        tableStore: '',
        projectionAndSelectionStore: '',
        joinStore: ''
    },
    
    constructor: function(){
	 
	this.projectionAndSelectionStore = Ext.create('Ext.letyournailsgrow.sqlquerybuilder.store.SQLProjectionAndSelectionStore', {
            storeId: 'SQLProjectionAndSelectionStore'
        });	    
	
	this.tableStore = Ext.create('Ext.letyournailsgrow.sqlquerybuilder.store.SQLTableStore', {
            storeId: 'SQLTableStore'
        });
        
	this.joinStore = Ext.create('Ext.letyournailsgrow.sqlquerybuilder.store.SQLJoinStore', {
            storeId: 'SQLJoinStore'
        });
	
	this.connections = [];
        	        
        this.tableStore.on('update', this.onSQLTableUpdate, this);
        this.tableStore.on('add', this.onSQLTableAdd, this);
        this.tableStore.on('remove', this.onSQLTableRemove, this);
         
        this.projectionAndSelectionStore.on('update', this.onSQLProjectionAndSelectionChanges, this);
        this.projectionAndSelectionStore.on('remove', this.onSQLProjectionAndSelectionRemove, this);
                        
        this.joinStore.on('add', this.onSQLJoinChanges, this);
        this.joinStore.on('remove', this.onSQLJoinChanges, this);
        
        this.callParent(arguments);    
    },
    
    onSQLTableUpdate: function(tableStore, table, operation){
        alert("onSQLTableUpdate");
    },
    
    onSQLTableAdd: function(tableStore, table, index){
	alert("onSQLTableAdd");        
    },
    
    onSQLTableRemove: function(tableStore, table, index){
        alert("onSQLTableRemove");
    },
    
    onSQLJoinChanges: function(joinStore, join){
        alert("onSQLJoinChanges");
    },
    
    onSQLProjectionAndSelectionChanges: function(fieldStore, model, operation){
	alert("handleSQLFieldChanges");
    },
    
    onSQLProjectionAndSelectionRemove: function(fieldStore){
         alert("handleSQLFieldRemove");
    },
    
    addTable: function(table){
        this.tableStore.add(table);
    },
    
    getTableById: function(tableID){
        return this.tableStore.getById(tableID);
    },
    
    removeTableById: function(tableID){        
        var table = this.tableStore.getById(tableID);
        this.tableStore.remove(table);
    },
    
    addJoin: function(join){
	this.joinStore.add(join) ;
    },
    
    addConnection:function(connection){
	this.connections.push(connection);
    },
    
    getConnections:function(){
	return this.connections;
    },
    
    setConnections:function(connections){
	this.connections = connections;
    },
    
    removeJoinById: function(joinID){        
        var join = this.joinStore.getById(joinID);
        this.joinStore.remove(join);
    },
    
    removeFieldById: function(id){        
        var projectionAndSelection = this.projectionAndSelectionStore.getById(id);
        this.projectionAndSelectionStore.remove(projectionAndSelection);
    },
    
    addFieldRecord: function(record, bOutput){	 
        var tableAlias = this.getTableById(record.get('tableId')).get('tableAlias');        
	var expression = record.get('tableName') + '.' + record.get('field');
        if (tableAlias != '') {            
            expression = tableAlias + '.' + record.get('field');
        }
        
        var model = Ext.create('Ext.letyournailsgrow.sqlquerybuilder.model.SQLProjectionAndSelectionModel');        
        model.set('expression', expression);        
        model.set('output', bOutput);
        model.set('id', record.get('id'));        
        model.set('field', record.get('field'));        
        model.set('tableId', record.get('tableId'));        
        model.set('extCmpId', record.get('extCmpId'));
	
        this.addField(model);
    },
    addField: function(projectionAndSelection){
        this.projectionAndSelectionStore.add(projectionAndSelection);
    },
    removeFieldsByTableId: function(tableId){
        var records = [];
        this.projectionAndSelectionStore.each(function(model){
            if (model.get('tableId') == tableId) {
                records.push(model);
            }
        });
        this.projectionAndSelectionStore.remove(records);
    }
    
});