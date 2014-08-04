Ext.define('Ext.letyournailsgrow.sqlquerybuilder.store.SQLProjectionAndSelectionStore', {
    extend: 'Ext.data.Store',
    autoSync: true,
    model: 'Ext.letyournailsgrow.sqlquerybuilder.model.SQLProjectionAndSelectionModel',
    proxy: {
        type: 'memory'
    }
});
