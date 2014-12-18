/**
 * Created by Administrator on 2014/12/2.
 */
Ext.define('js.outStackinfo',{
    extend:'Ext.grid.Panel',
    initComponent:function(){
        var me = this;
        var store = Ext.create('Ext.data.Store',{
            id:'outstackPanel', //TODO 分页的ID
            pageSize:20,
            autoLoad:false,
            proxy: {
                type:'ajax',
                url:'outstockinfopage', //TODO 要访问的action名称
                reader:{
                    type:'json',
                    root:'outStackList',
                    totalProperty:'rows'//TODO action中返回来的总数量
                }
            },
            fields:[
                {name:'outCode',type:'string'}, //TODO 名称和属性
                {name:'outTime',type:'Timestamp'},
                {name:'hander',type:'string'},
                {name:'totalType',type:'byte'},
                {name:'totalMoney',type:'BigDecimal'},
                {name:'remark',type:'string'},
                {name:'operinfoByoperId.operId',type:'string'}
            ]
        });
        store.load({
            params:{
                start:0,
                limit:20
            }
        });
        var selModel = Ext.create(Ext.selection.CheckboxModel);
        Ext.apply(this,{
            id:'outStackInfopage',
            selModel:selModel,
            stripeRows:true,
            border:false,
            closable: true,
            title:'出库管理',//TODO 表格的名称
            store:Ext.data.StoreManager.lookup('outstackPanel'), //TODO store的ID
            columns:[
                {text:'出库单号',dataIndex:'outCode',align:'center',menuDisabled:true,flex:1}, //TODO  falex:1这一列一直到最后
                {text:'操作员',dataIndex:'operinfoByoperId.operId',align:'center',menuDisabled:true,flex:1},
                {text:'出库时间',dataIndex:'outTime',align:'center',menuDisabled:true,flex:1},
                {text:'经手人',dataIndex:'hander',align:'center',menuDisabled:true,flex:1},
                {text:'出库方式',dataIndex:'totalType',align:'center',menuDisabled:true,flex:1},
                {text:'出库金额',dataIndex:'totalMoney',align:'center',menuDisabled:true,flex:1},
                {text:'备注',dataIndex:'remark',align:'center',menuDisabled:true,flex:1}
            ],
            dockedItems:[{
                xtype:'pagingtoolbar',
                store:store,
                dock:'bottom',
                displayInfo:true
            }],
            tbar:[{
                xtype:'button',text:'查看详情',handler:function(){
                    var record = Ext.getCmp('outStackInfopage').getSelectionModel().getSelection();
                    if(record.length!=1){
                        Ext.MessageBox.show({
                            title:'提示消息',
                            msg:'请选择一条数据查看！',
                            icon:Ext.MessageBox.QUESTION,
                            buttons:Ext.MessageBox.YES
                        })
                    }else{
                        me.showDetaile(record[0]);
                    }
                }
            },
                {xtype:'button',text:'添加',handler:function(){
                    if(!Ext.getCmp('outstockInsertWindow')){
                        me.insertWindow();
                    }
                }},
                {xtype:'button',text:'删除',handler:function(){
                    me.delWindow();
                }},
                {xtype:'button',text:'修改',handler:function(){
                    if(!Ext.getCmp('outstockEditWindow')){
                        me.editWindow();
                    }
                }}
            ]
        });
        this.callParent();
    },
    showDetaile:function(record){
        var storedetaile = Ext.create('Ext.data.Store',{
            id:'outStackstoredata',
            pageSize:5,
            proxy:{
                type:'ajax',
                url:'outstockdetaileinfopage?param1='+record.get('outCode'),
                reader:{
                    type:'json',
                    root:'outStackDList',
                    totalProperty : "rows"
                }
            },
            fields:[
                {name:'id',type:'string'},
                {name:"num",type:'int'},
                {name:'price',type:'BigDecimal'},
                {name:'merchandiseinfoByMerchandiseId.merchandiseName',type:'string'},
                {name:'merchandiseinfoByMerchandiseId.unitinfoByUnitInfoId.unitInfoName'}
            ],
            autoLoad:true
        });
        storedetaile.load({
            params:{
                start:0,
                limit:5
            }
        });
        Ext.create('Ext.window.Window',{
            title:'订单详情',
            id:'outStackWindow',
            width:500,
            height:350,
            layout:'fit',
            items:[
                {
                    xtype:'grid',
                    id:'outStackdetaileData',
                    store:storedetaile,
                    columns:[
                        {text:'商品名称',dataIndex:'merchandiseinfoByMerchandiseId.merchandiseName',flex:1,align:'center'},
                        {text:'数量',dataIndex:'num',flex:1,align:'center'},
                        {text:'单价',dataIndex:'price',flex:1,align:'center'},
                        {text:'单位',dataIndex:'merchandiseinfoByMerchandiseId.unitinfoByUnitInfoId.unitInfoName',flex:1,align:'center'}
                    ]
                }
            ],
            dockedItems:[{
                xtype:'pagingtoolbar',
                store:storedetaile,
                dock:'bottom',
                displayInfo:true
            }]
        }).show();
    },
    insertWindow:function(){
        var logger1={};
        var totalmoney='';
        Ext.Ajax.request({
            url: 'userinfo',
            async: false,
            success: function (response) {
                logger1 = Ext.JSON.decode(response.responseText);
            }
        });
        var inTypeStore=Ext.create('Ext.data.Store',{
            fields: ['abbr','name'],
            data: [
                {'abbr': '1','name': '正常出库'},
                {'abbr': '2','name': '报损'},
                {'abbr': '3','name': '盘亏'}
            ]
        });
        var userName = logger1.list[0],userID= logger1.list[1];
        var me= this,cellEditing;
        comboText='';
        cellEditing = new Ext.grid.plugin.CellEditing({
            clicksToEdit: 1,
            listeners: {
                edit: function (editor, context){
                    var myStore = Ext.data.StoreManager.lookup('outStackInsertStore');
                    if (context.value || context.value == 0) {
                        if (context.field === 'merchandiseName') {
                            context.record.set('merchandiseId', context.value);
                            context.record.set('merchandiseName', me.comboText);
                        }
                        if (context.field === 'num'){
                            if (context.record.get('price') >= 0) {
                                context.record.set('total', context.value * context.record.get('price'));
                            }
                        }
                        if (context.field === 'price') {
                            if (context.record.get('num') >= 0) {
                                context.record.set('total', context.value * context.record.get('num'));
                            }
                        }
                        if (context.record.get('merchandiseId') !== '' && context.record.get('num') > 0) {
                            var isEmptyRow = false;
                            context.grid.store.each(function (record) {
                                if (record.get('merchandiseId') === '' || record.get('num') <= 0) {
                                    isEmptyRow = true;
                                    return false;
                                }
                            });
                            if (!isEmptyRow){
                                context.grid.store.add({});
                            }
                            totalmoney = 0;
                            for(var i = 0; i < myStore.data.items.length; i++){
                                if(!isNaN(myStore.data.items[i].data.total)&&myStore.data.items[i].data.total !=''){
                                    totalmoney +=myStore.data.items[i].data.total;
                                    Ext.getCmp('money').setValue(totalmoney);
                                }
                            }
                        }
                    }
                }
            }
        });
        Ext.create('Ext.window.Window',{
            title:'新增出库',
            id:'outstockInsertWindow',
            layout:'vbox',
            width: '42.5%',
            height:'60%',
            layout: 'vbox',
            items: [{
                xtype: 'form',
                width: '100%',
                layout: 'column',
                border:false,
                bodyStyle:{
                    background:'#dfe9f5'
                },
                id: 'outstockInserForm',
                defaults: {
                    xtype: 'textfield',
                    labelAlign:'right',
                    margin:'10 0 10 0',
                    allowBlank:false
                },
                items: [{
                    fileLabel:'操作员ID',
                    hidden:true,
                    name:'outStack.operinfoByoperId.operId',
                    value:userID
                },
                    {
                        fieldLabel: '操作员',
                        value:userName,
                        disabled:true,
                        columnWidth:.3,
                        name:'outStack.operinfoByoperId.operName'
                    },
                    {
                        fieldLabel:'经手人',
                        name:'outStack.hander',
                        columnWidth:.3
                    },{
                        xtype:'combo',
                        store:inTypeStore,
                        fieldLabel:'出库方式',
                        name:'outStack.totalType',
                        columnWidth:.3,
                        displayField: 'name',
                        valueField: 'abbr'
                    },{
                        xtype:'datefield',
                        fieldLabel:'出库时间',
                        format: 'Y-m-d H:i:s',
                        value: new Date(),
                        name:'outStack.outTime',
                        columnWidth:.3
                    },{
                        fieldLabel:'总计',
                        name:'outStack.totalMoney',
                        columnWidth:.3,
                        id:'money'
                    },
                    {
                        xtype:'textarea',
                        fieldLabel: '备注',
                        allowBlank:true,
                        columnWidth:.9,
                        name:'outStack.remark'
                    }
                ]
            }, {
                xtype: 'grid',
                width: '100%',
                id: 'outstockInsernGrid',
                flex: 2,
                plugins: [cellEditing],
                store: Ext.create('Ext.data.Store', {
                    id:'outStackInsertStore',
                    data: [
                        {}
                    ],
                    fields: ['merchandiseId', 'merchandiseName', 'num', 'price', 'total']
                }),
                columns: [
                    {
                        text: '商品编号',
                        dataIndex: 'merchandiseId',
                        name:'merchandiseId',
                        hidden: true
                    },
                    {
                        text: '商品名称',
                        flex:1,
                        dataIndex: 'merchandiseName',
                        menuDisabled:true,
                        width:200,
                        align:'center',
                        name:'merchandiseName',
                        editor: {
                            allowBlank: false,
                            xtype: 'combobox',
                            editable:false,
                            store: Ext.create('Ext.data.Store', {
                                proxy: {
                                    type: 'ajax',
                                    url: '/stockinfopage',//访问的url路径
                                    reader: {
                                        type: 'json',
                                        root: 'stockList',
                                        totalProperty: "rows"
                                    }
                                },
                                fields: [
                                    { name: 'merchandiseId', type: 'string',mapping:'merchandiseinfoByMerchandiseId.merchandiseId'},
                                    { name: 'merchandiseName', type: 'string',mapping:'merchandiseinfoByMerchandiseId.merchandiseName'}
                                ]
                            }),
                            displayField: 'merchandiseName',
                            valueField: 'merchandiseId',
                            listeners: {
                                select: function (combo, records) {
                                    me.comboText = records[0].get('merchandiseName');
                                }
                            }
                        }
                    },
                    {
                        text: '数量',
                        flex:1,
                        dataIndex: 'num',
                        menuDisabled:true,
                        width:200,
                        align:'center',
                        editor: {
                            xtype: 'numberfield',
                            allowBlank: false
                        }
                    },
                    {
                        text: '单价',
                        flex:1,
                        align:'center',
                        width:200,
                        menuDisabled:true,
                        dataIndex: 'price',
                        editor: {
                            xtype: 'numberfield',
                            allowBlank: false
                        }
                    },
                    {
                        text: '总额',
                        flex:1,
                        menuDisabled:true,
                        width:200,
                        align:'center',
                        dataIndex: 'total'
                    }
                ]
            }],
            tbar: [
                {
                    text: '提交',
                    handler: function () {
                        var postData = '';
                        var mydata = Ext.data.StoreManager.lookup('outStackInsertStore').data.items;
                        Ext.each(mydata,function(item,index){
                            if(!item.data.total){
                                return;
                            }
                            postData += 'outStackList['+index+'].merchandiseinfoByMerchandiseId.merchandiseId=' + item.data.merchandiseId + '&outStackList['+index+'].num=' + item.data.num + '&outStackList['+index+'].price=' + item.data.price + '&outStackList['+index+'].total=' + item.data.total;
                            if(index!=mydata.length-1){
                                postData+='&'
                            }
                        })
                        Ext.getCmp('outstockInserForm').submit({
                            url: 'outStackInert?'+postData,
                            success: function (form, action) {
                                var msg = Ext.JSON.decode(action.response.responseText);
                                Ext.MessageBox.show({
                                    title: '系统提示',
                                    msg: msg.message,
                                    icon: Ext.MessageBox.WARNING,
                                    buttons: Ext.MessageBox.YES,
                                    fn:function(){
                                        Ext.getCmp('outstockInsertWindow').close();
                                    }
                                });
                                Ext.getCmp('outStackInfopage').store.reload();
                            }
                        });
                    }
                }
            ]
        }).show();
    },
    editWindow:function(){
        var record2 = Ext.getCmp('outStackInfopage').getSelectionModel().getSelection();
        if(record2.length==0){
            Ext.MessageBox.show({
                title:'系统提示',
                msg:'请选择一条数据进行修改！',
                icon:Ext.MessageBox.INFO,
                buttons:Ext.MessageBox.YES
            })
        }else if(record2.length>1){
            Ext.MessageBox.show({
                title:'系统提示',
                msg:'本产品不支持多条修改，请选择一条数据修改！',
                icon:Ext.MessageBox.INFO,
                buttons:Ext.MessageBox.YES
            })
        }else {
            var logger1={};
            var totalmoney='';
            Ext.Ajax.request({
                url: 'userinfo',
                async: false,
                success: function (response) {
                    logger1 = Ext.JSON.decode(response.responseText);
                }
            });
            var inTypeStore=Ext.create('Ext.data.Store',{
                fields: ['abbr','name'],
                data: [
                    {'abbr': '1','name': '正常出库'},
                    {'abbr': '2','name': '报损'},
                    {'abbr': '3','name': '盘亏'}
                ]
            });
            var userName = logger1.list[0],userID= logger1.list[1];
            var me= this,cellEditing;
            comboText='';
            cellEditing = new Ext.grid.plugin.CellEditing({
                clicksToEdit: 1,
                listeners: {
                    edit: function (editor, context){
                        var myStore = editOutstackDetaile;//Ext.data.StoreManager.lookup('outStackInsertStore');
                        if (context.value || context.value == 0) {
                            if (context.field === 'merchandiseinfoByMerchandiseId.merchandiseName') {
                                context.record.set('merchandiseinfoByMerchandiseId.merchandiseId', context.value);
                                context.record.set('merchandiseinfoByMerchandiseId.merchandiseName', me.comboText);
                            }
                            if (context.field === 'num'){
                                if (context.record.get('price') >= 0){
                                    context.record.set('total', context.value * context.record.get('price'));
                                }
                            }
                            if (context.field === 'price') {
                                if (context.record.get('num') >= 0) {
                                    context.record.set('total', context.value * context.record.get('num'));
                                }
                            }
                            if (context.record.get('merchandiseinfoByMerchandiseId.merchandiseId') !== '' && context.record.get('num') > 0) {
                                var isEmptyRow = false;
                                context.grid.store.each(function (record) {
                                    if (record.get('merchandiseinfoByMerchandiseId.merchandiseId') === '' || record.get('num') <= 0) {
                                        isEmptyRow = true;
                                        return false;
                                    }
                                });
                                if (!isEmptyRow){
                                    context.grid.store.add({});
                                }
                                totalmoney = 0;
                                for(var i = 0; i < myStore.data.items.length; i++){
                                    if(!isNaN(myStore.data.items[i].data.total)&&myStore.data.items[i].data.total !=''){
                                        totalmoney +=myStore.data.items[i].data.total;
                                        Ext.getCmp('money').setValue(totalmoney);
                                    }
                                }
                            }
                        }
                    }
                }
            });
            var editOutstackDetaile = Ext.create('Ext.data.Store',{
                pageSize: 5,
                proxy: {
                    type: 'ajax',
                    url: 'outstockdetaileinfopage?param1=' + record2[0].get('outCode'),
                    reader: {
                        type: 'json',
                        root: 'outStackDList',
                        totalProperty: "count"
                    }
                },
                fields: [
                    {name: 'id', type: 'string'},
                    {name: "num", type: 'int'},
                    {name: 'price', type: 'BigDecimal'},
                    {name: 'stockPrice', type: 'BigDecimal'},
                    {name:'merchandiseinfoByMerchandiseId.merchandiseName',type:'string'},
                    {name:'merchandiseinfoByMerchandiseId.merchandiseId',type:'string'},
                    {name:'total',type:'BigDecimal'}
                ],
                autoLoad: true
            })
            var selModel = Ext.create(Ext.selection.CheckboxModel);
            Ext.create('Ext.window.Window',{
                title:'新增出库',
                id:'outstockEditWindow',
                layout:'vbox',
                width: '42.5%',
                height:'60%',
                layout: 'vbox',
                items: [{
                    xtype: 'form',
                    width: '100%',
                    layout: 'column',
                    border:false,
                    bodyStyle:{
                        background:'#dfe9f5'
                    },
                    id: 'outstockEditForm',
                    defaults: {
                        xtype: 'textfield',
                        labelAlign:'right',
                        margin:'10 0 10 0',
                        allowBlank:false
                    },
                    items: [{
                        fileLabel:'出库单ID',
                        name:'outStack.outCode',
                        hidden:true,
                        value:record2[0].get('outCode')
                    },{
                        fileLabel:'操作员ID',
                        hidden:true,
                        name:'outStack.operinfoByoperId.operId',
                        value:userID
                    },
                        {
                            fieldLabel: '操作员',
                            value:userName,
                            disabled:true,
                            columnWidth:.3,
                            name:'outStack.operinfoByoperId.operName'
                        },
                        {
                            fieldLabel:'经手人',
                            name:'outStack.hander',
                            columnWidth:.3,
                            value:record2[0].get('hander')
                        },{
                            xtype:'combo',
                            store:inTypeStore,
                            fieldLabel:'出库方式',
                            name:'outStack.totalType',
                            columnWidth:.3,
                            value:record2[0].get('totalType'),
                            displayField: 'name',
                            valueField: 'abbr'
                        },{
                            xtype:'datefield',
                            fieldLabel:'出库时间',
                            format: 'Y-m-d H:i:s',
                            value: new Date(),
                            name:'outStack.outTime',
                            columnWidth:.3
                        },{
                            fieldLabel:'总计',
                            name:'outStack.totalMoney',
                            columnWidth:.3,
                            value:record2[0].get('totalMoney'),
                            id:'money'
                        },
                        {
                            xtype:'textarea',
                            fieldLabel: '备注',
                            allowBlank:true,
                            columnWidth:.9,
                            value:record2[0].get('remark'),
                            name:'outStack.remark'
                        }
                    ]
                }, {
                    xtype: 'grid',
                    width: '100%',
                    selModel:selModel,
                    id: 'outstockEditnGrid',
                    flex: 2,
                    plugins: [cellEditing],
                    store: editOutstackDetaile,
                    columns: [
                        {
                            text: '商品编号',
                            dataIndex: 'merchandiseinfoByMerchandiseId.merchandiseId',
                            name:'merchandiseId',
                            hidden: true
                        },
                        {
                            text: '商品名称',
                            flex: 1,
                            dataIndex: 'merchandiseinfoByMerchandiseId.merchandiseName',
                            menuDisabled: true,
                            width: 200,
                            align: 'center',
                            name: 'merchandiseName',
                            editor: {
                                allowBlank: false,
                                xtype: 'combobox',
                                editable: false,
                                store: Ext.create('Ext.data.Store', {
                                    autoLoad:true,
                                    proxy: {
                                        type: 'ajax',
                                        url: '/stockinfopage',//访问的url路径
                                        reader: {
                                            type: 'json',
                                            root: 'stockList',
                                            totalProperty: "rows"
                                        }
                                    },
                                    fields: [
                                        { name: 'merchandiseId', type: 'string',mapping:'merchandiseinfoByMerchandiseId.merchandiseId'},
                                        { name: 'merchandiseName', type: 'string',mapping:'merchandiseinfoByMerchandiseId.merchandiseName'}
                                    ]
                                }),
                                displayField: 'merchandiseName',
                                valueField: 'merchandiseId',
                                listeners: {
                                    select: function (combo, records) {
                                        me.comboText = records[0].get('merchandiseName');
                                    }
                                }
                            }
                        },
                        {
                            text: '数量',
                            flex:1,
                            dataIndex: 'num',
                            menuDisabled:true,
                            width:200,
                            align:'center',
                            editor: {
                                xtype: 'numberfield',
                                allowBlank: false
                            }
                        },
                        {
                            text: '单价',
                            flex:1,
                            align:'center',
                            width:200,
                            menuDisabled:true,
                            dataIndex: 'price',
                            editor: {
                                xtype: 'numberfield',
                                allowBlank: false
                            }
                        },
                        {
                            text: '总额',
                            flex:1,
                            menuDisabled:true,
                            width:200,
                            align:'center',
                            dataIndex: 'total'
                        }
                    ]
                }],
                tbar: [
                    {
                        text: '保存',
                        handler: function () {
                            var postData = '';
                            var mydata = editOutstackDetaile.data.items;
                            Ext.each(mydata,function(item,index){
                                if(!item.data.total){
                                    return;
                                }
                                postData += 'outStackList['+index+'].merchandiseinfoByMerchandiseId.merchandiseId=' + item.get('merchandiseinfoByMerchandiseId.merchandiseId') + '&outStackList['+index+'].num=' + item.data.num + '&outStackList['+index+'].price=' + item.data.price+ '&outStackList['+index+'].total=' + item.data.total;
                                if(index!=mydata.length-1){
                                    postData+='&'
                                }
                            })
                            Ext.getCmp('outstockEditForm').submit({
                                url: 'outStackEdit?'+postData,
                                success: function (form, action) {
                                    var msg = Ext.JSON.decode(action.response.responseText);
                                    Ext.MessageBox.show({
                                        title: '系统提示',
                                        msg: msg.message,
                                        icon: Ext.MessageBox.WARNING,
                                        buttons: Ext.MessageBox.YES,
                                        fn:function(){
                                            Ext.getCmp('outstockEditWindow').close();
                                        }
                                    });
                                    Ext.getCmp('outStackInfopage').store.reload();
                                }
                            });
                        }
                    },
                    {
                        text: '删除',
                        handler: function () {
                            var rows = Ext.getCmp('outstockEditnGrid').getSelectionModel().getSelection();//获取所选行数
                            for (var i = 0; i < rows.length; i++) {
                                editOutstackDetaile.remove(rows[i]); //执行删除
                            }
                        }
                    },
                    {
                        text: '添加明细',
                        handler: function () {
                            var myStore = editOutstackDetaile;
                            myStore.add({});
                        }
                    }
                ]
            }).show();
        }
    },
    delWindow:function(){
        var record3 = Ext.getCmp('outStackInfopage').getSelectionModel().getSelection();
        if(record3.length==0){
            Ext.MessageBox.show({
                title:'系统提示',
                msg:'删除操作，最少要选择一条数据，请选择则数据！',
                icon:Ext.MessageBox.INFO,
                buttons:Ext.MessageBox.YES
            })
        }else if(record3.length==1){
            Ext.MessageBox.show({
                title:'系统提示',
                msg:'宁确定要删除这条数据吗？！',
                icon:Ext.MessageBox.INFO,
                buttons:Ext.MessageBox.YESNO,
                fn: function(btn) {
                    if (btn === 'yes') {
                        var me = this;
                        var record = Ext.getCmp('outStackInfopage').getSelectionModel().getSelection();
                        var length = record.length;
                        var list= record[0].raw.outCode;
                        Ext.Ajax.request({
                            url:'outStackDel',
                            method:'post',
                            params:{idList:list},
                            success:function(){
                                Ext.getCmp('outStackInfopage').store.reload();
                            }
                        })
                    }
                }
            })
        }else if(record3.length>1){
            Ext.MessageBox.show({
                title:'系统提示',
                msg:'宁确定要删除这些数据吗？！',
                icon:Ext.MessageBox.INFO,
                buttons:Ext.MessageBox.YESNO,
                fn: function(btn) {
                    if (btn === 'yes'){

                        var record = Ext.getCmp('outStackInfopage').getSelectionModel().getSelection();
                        var length = record.length;
                        var list='';
                        for(var i =0;i<length;i++){
                            list += record[i].raw.billCode;
                            if(i!=length-1){
                                list+=',';
                            }
                        }
                        Ext.Ajax.request({
                            url:'outStackDel',
                            method:'post',
                            params:{idList:list},
                            success:function(){
                                Ext.getCmp('outStackInfopage').store.reload();
                            }
                        })
                    } else if (btn === 'no') {
                        console.log('No pressed');
                    } else {
                        console.log('Cancel pressed');
                    }
                }
            })
        }
    }
})