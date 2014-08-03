Ext.define('Ext.letyourneilsgrow.sqlquerybuilder.store.SQLJoinStore', {
    extend: 'Ext.data.Store',
    autoSync: true,
    model: 'Ext.letyourneilsgrow.sqlquerybuilder.model.SQLJoinModel',
    proxy: {
        type: 'memory'
    }
});