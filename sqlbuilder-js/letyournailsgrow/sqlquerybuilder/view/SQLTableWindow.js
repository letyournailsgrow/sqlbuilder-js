Ext.define('Ext.letyournailsgrow.sqlquerybuilder.view.SQLTableWindow', {
    extend: 'Ext.window.Window',
    minWidth: 150,
    alias: ['widget.sqltablewindow'],
 
    height: 200,
    width: 150,
  	    
    layout: {
        type: 'fit'
    },
    
    closable: true,
  
    shadowSprite: {},		
	    
    listeners: {
        show: function(){
		this.initSQLTable();
        },
        beforeclose: function(){
            
        }
    },
          
     initComponent: function(){
        
	var me = this;
	this.isMouseDown = false; // util pentru spiridus
	     
        // UUID
        this.tableId = this.createUUID();
                
        this.items = [{
            xtype: 'sqbtablefieldsgrid',
            store:  me.getGridStore(me.title, me.tableId, me.id)
        }];
	
	var tableModel = Ext.create("Ext.letyournailsgrow.sqlquerybuilder.model.SQLTableModel", {
            id: this.tableId,
            name: this.title,
            alias: ''
        });
	Ext.getCmp('SQLQueryBuilderPanel').getController().addTable(tableModel);
	
        this.callParent(arguments);
    },

    getGridStore:function(title,tableId, cmpId){
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
                defaultValue: tableId
            }, {
                name: 'field',
                type: 'string'
            }, {
                name: 'extCmpId',
                type: 'string',
                defaultValue: cmpId
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
                    tablename: title
                },
                reader: {
                    type: 'json'
                }
            }
        });
	return store;
    },
    
    createUUID: function(){
        // http://www.ietf.org/rfc/rfc4122.txt
        var s = [];
        var hexDigits = "0123456789abcdef";
        for (var i = 0; i < 36; i++) {
            s[i] = hexDigits.substr(Math.floor(Math.random() * 0x10), 1);
        }
        s[14] = "4"; // bits 12-15 of the time_hi_and_version field to 0010
        s[19] = hexDigits.substr((s[19] & 0x3) | 0x8, 1); // bits 6-7 of the clock_seq_hi_and_reserved to 01
        s[8] = s[13] = s[18] = s[23] = "-";
        
        var uuid = s.join("");
        return uuid;
    },
    
    // se creeaza un spiridus cu aceleasi dimensiuni ca fereastra
    getSprite:function(tableZone){
        var xyParentPos = tableZone.el.getXY();
        var xyChildPos = this.el.getXY();
        var childSize = this.el.getSize();
        
        var sprite = Ext.create('Ext.letyournailsgrow.sqlquerybuilder.view.SQLTableSprite', {
            type: 'rect',
            stroke: '#fff',
	    fill: '#ff0',
            height: childSize.height - 4,
            width: childSize.width - 4,
            x: xyChildPos[0] - xyParentPos[0] + 2,
            y: xyChildPos[1] - xyParentPos[1] + 2,
            scrollTop: 0
        });
	return sprite;
	
    },
    
    initSQLTable: function(){
       
	var tableZone = Ext.getCmp('SQLTableZonePanel');   
	// SPIRIDUS    
        var sprite = this.getSprite(tableZone);
        
	// SPIRIDUS: se adauga sprite/spiridus pe suprafata zonei de tabele
        this.shadowSprite = tableZone.down('draw').surface.add(sprite).show(true);
        
        // SPIRIDUS: daca tabelul se redimensioneaza...se redimensioneaza si spiridusul
        this.resizer.on('resize', function(resizer, width, height, event){
            this.shadowSprite.setAttributes({
                width: width - 6,
                height: height - 6
            }, true);
	  
            // also move the associated connections 
           // for (var i = ux.vqbuilder.connections.length; i--;) {
               // this.connection(ux.vqbuilder.connections[i]);
           // }
        }, this);
	
        // SPIRIDUS: cand se face click cu ajutorul mouse-ului pe header-ul ferestrei se poate considera ca se poate trage si spiridusul
        this.getHeader().el.on('mousedown', this.startDragSprite, this);
	
        /*
        this.getHeader().el.on('contextmenu', this.showSQLTableCM, this);
        this.getHeader().el.on('dblclick', this.showTableAliasEditForm, this);
        this.getHeader().origValue = '';
        */
       
	// SPIRIDUS: util pentru a muta spiridusul
	Ext.EventManager.on(document, 'mousemove', this.moveWindow, this);
        
        // SPIRIDUS: util pentru a marca mutarea ferestrei (pentru spiridus)
        Ext.EventManager.on(document, 'mouseup', function(){
            this.isMouseDown = false;
        }, this);
        
    },
    
     // SPIRIDUS
     moveWindow: function(event, domEl, opt){
        if (this.isMouseDown) {
            // se trimite spiridusului cat s-a mutat (distanta) 
            this.shadowSprite.onDrag(this.getOffset());
          
		/*
            if (this.shadowSprite.bConnections) {
                // also move the associated connections 
                for (var i = ux.vqbuilder.connections.length; i--;) {
                    this.connection(ux.vqbuilder.connections[i]);
                }
            }*/
        }
    },
    
     // SPIRIDUS
     startDragSprite: function(){
        // save the mousedown state
        this.isMouseDown = true;
        // start the drag of the sprite
        this.shadowSprite.startDrag(this.getId());
    },
    
    // SPIRIDUS
     getOffset: function(){
        var xy = this.dd.getXY('point');
	var s = this.dd.startXY;
   
        return [xy[0] - s[0], 
		   xy[1] - s[1]];
    },
});