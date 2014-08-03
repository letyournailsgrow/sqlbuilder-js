Ext.define('Ext.letyourneilsgrow.sqlquerybuilder.store.SQLProjectionAndSelectionStore', {
    extend: 'Ext.data.Store',
    autoSync: true,
    model: 'Ext.letyourneilsgrow.sqlquerybuilder.model.SQLProjectionAndSelectionModel',
    proxy: {
        type: 'memory'
    }
});
