Ext.tip.QuickTipManager.init();

Ext.namespace("letyournailsgrow.sqlquerybuilder");

Ext.Loader.setConfig({
    enabled: true,
    paths: {
        Ext: "sqlbuilder-js"
    }
});

Ext.application({
  //  name: "sqb",
    autoCreateViewport: false,
    launch: function(){
	var sqbPanel = Ext.create("Ext.letyournailsgrow.sqlquerybuilder.view.SQLQueryBuilderPanel",{
		region: "center"
	});    
	Ext.create("Ext.container.Viewport", {
		layout: {
			type: "border"
		},
		defaults: {
			split: true
		},
		items:[
			sqbPanel
		]
	});
    }
});