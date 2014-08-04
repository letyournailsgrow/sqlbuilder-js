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
    
    initSQLTable: function(){
        // se creaza un spiridus?:) care ia forma window-ului
        var sqlTablePanel = Ext.getCmp('SQLTableZonePanel');
        var xyParentPos = sqlTablePanel.el.getXY();
        var xyChildPos = this.el.getXY();
        var childSize = this.el.getSize();
        
        // create a sprite of type rectangle and set its position and size 
        // to position and size of the the sqltable 
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
        
	// se adauga sprite pe suprafata zonei de tabele
        this.shadowSprite = sqlTablePanel.down('draw').surface.add(sprite).show(true);
        
        //daca tabelul se redimensioneaza...se redimensioneaza si spiridusul
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
	
        /*
        // register a function for the mousedown event on the previously added sqltable and bind to this scope
        this.getHeader().el.on('mousedown', this.regStartDrag, this);
        
        this.getHeader().el.on('contextmenu', this.showSQLTableCM, this);
        
        this.getHeader().el.on('dblclick', this.showTableAliasEditForm, this);
        
        this.getHeader().origValue = '';
        
        // register method this.moveWindow for the mousemove event on the document and bind to this scope
        Ext.EventManager.on(document, 'mousemove', this.moveWindow, this);
        
        // register a function for the mouseup event on the document and add the this scope
        Ext.EventManager.on(document, 'mouseup', function(){
            // save the mousedown state
            this.bMouseDown = false;
        }, this);
        */
    },
    /*
     moveWindow: function(event, domEl, opt){
       
        if (this.bMouseDown) {
            // get relative x and y values (offset)
            var relPosMovement = this.getOffset('point');
            // move the sprite to the position of the window
            this.shadowSprite.onDrag(relPosMovement);
            // check if the sprite has any connections
            if (this.shadowSprite.bConnections) {
                // also move the associated connections 
                for (var i = ux.vqbuilder.connections.length; i--;) {
                    this.connection(ux.vqbuilder.connections[i]);
                }
            }
        }
    },*/
});