/**
 * Created by Administrator on 2014/11/25.
 */
Ext.define('js.orderDetailsInfo1', {//TODO 多了一个1
    extend: 'Ext.grid.Panel',
    initComponent: function () {
        var me = this;
        var store = Ext.create('Ext.data.Store', {
            id: 'orderDetailsinfoPanel', //TODO 分页的ID
            pageSize: 20,
            autoLoad: false,
            proxy: {
                type: 'ajax',
                url: 'orderdetaileinfopage', //TODO 要访问的action名称
                reader: {
                    type: 'json',
                    root: 'orderDlist',
                    totalProperty: 'rows'//TODO action中返回来的总数量
                }
            },
            fields: [
                {name: 'id', type: 'string'}, //TODO 名称和属性
                {name: 'orderinfoByBillCode.billCode', type: 'string'},
                {name: 'merchandiseinfoByMerchandiseId.merchandiseName', type: 'string'},
                {name: 'unitinfoByUnitInfoId.unitInfoName', type: 'string'},
                {name: 'price', type: 'double'},
                {name: 'sum', type: 'int'}
            ]
        });
        store.load({
            params: {
                start: 0,
                limit: 20
            }
        });
        Ext.apply(this, {
            id: 'orderDetailspage',
            stripeRows: true,
            border: false,
            closable: true,
            title: '订单管理',//TODO 表格的名称
            store: Ext.data.StoreManager.lookup('orderDetailsinfoPanel'), //TODO store的ID
            columns: [
                {text: '明细ID', dataIndex: 'id', align: 'center', menuDisabled: true, flex: 1}, //TODO  falex:1这一列一直到最后
                {text: '订货单号', dataIndex: 'orderinfoByBillCode.billCode', align: 'center', menuDisabled: true, flex: 1},
                {text: '商品名称', dataIndex: 'merchandiseinfoByMerchandiseId.merchandiseName', align: 'center', menuDisabled: true, flex: 1},
                {text: '单价', dataIndex: 'price', align: 'center', menuDisabled: true, flex: 1},
                {text: '单位', dataIndex: 'unitinfoByUnitInfoId.unitInfoName', align: 'center', menuDisabled: true, flex: 1},
                {text: '数量', dataIndex: 'sum', align: 'center', menuDisabled: true, flex: 1}
            ],
            dockedItems: [
                {
                    xtype: 'pagingtoolbar',
                    store: store,
                    dock: 'bottom',
                    displayInfo: true
                }
            ],
            tbar: [
                {xtype: 'button', text: '查看详情', handler: function () {
                    if (!Ext.getCmp('orderinfoShow')) {
                        if (Ext.getCmp('orderDetailspage').getSelectionModel().getSelection().length == 1) {
                            var record = Ext.getCmp('orderDetailspage').getSelectionModel().getSelection()[0];
                            me.show1(record);
                        } else {
                            Ext.MessageBox.show({
                                title: '异常提示',
                                msg: '请选择一条数据查看！',
                                icon: Ext.MessageBox.INFO,
                                buttons: Ext.MessageBox.YES
                            })
                        }
                    }
                }},
                {xtype: 'button', text: '修改', handler: function () {
                    if (!Ext.getCmp('')) {
                    }
                }}
            ]
        });
        this.callParent();
    },
    show1: function (record) {
        var store1 = Ext.create('Ext.data.Store', {
            id: 'storid1',
            pageSize: 6,
            proxy: {
                type: 'ajax',
                url: '',//TODO 差查询方法
                reader: {
                    type: 'json',
                    root: 'orderDlist',
                    totalProperty: 'rows'
                }
            },
            fields: [
                {name: 'billCode', type: 'string'},
                {name: 'memberinfoByMemberId.memberId', type: 'string'},
                {name: 'deliveryinfoByDeliveryId.deliveryId', type: 'string'},
                {name: 'operinfoByoperId.operId', type: 'string'},
                {name: 'outstockinfoByoutID.outCode', type: 'string'},
                {name: 'postBillCode', type: 'string'},
                {name: 'billStatus', type: 'byte'},
                {name: 'billData', type: 'Timestamp'},
                {name: 'consignee', type: 'string'},
                {name: 'phone', type: 'string'},
                {name: 'adress', type: 'string'},
                {name: 'postcode', type: 'string'},
                {name: 'price', type: 'double'},
                {name: 'remark', type: 'string'}
            ],
            autoLoad: true
        });
//        store1.load({
//            params: {
//                start: 1,
//                limit: 6
//            }
//        });
        Ext.create('Ext.window.Window', {
            title: '详细信息',
            width: 500,
            height: 350,
            layout: 'fit',
            items: [
                {
                    xtype: 'grid',
                    id: 'grid2',
                    store: store1, //store1,
                    columns: [
                        {text: '订单号', dataIndex: 'billCode', align: 'center', menuDisabled: true},
                        {text: '会员ID', dataIndex: 'memberinfoByMemberId.memberId', align: 'center', menuDisabled: true},
                        {text: '配送商编码', dataIndex: 'deliveryinfoByDeliveryId.deliveryId', align: 'center', menuDisabled: true},
                        {text: '操作员编码', dataIndex: 'operinfoByoperId.operId', align: 'center', menuDisabled: true},
                        {text: '出库单号', dataIndex: 'outstockinfoByoutID.outCode', align: 'center', menuDisabled: true},
                        {text: '快递单号', dataIndex: 'postBillCode', align: 'center', menuDisabled: true},
                        {text: '订单状态', dataIndex: 'billStatus', align: 'center', menuDisabled: true},
                        {text: '订购时间', dataIndex: 'billData', align: 'center', menuDisabled: true},
                        {text: '收货人姓名', dataIndex: 'consignee', align: 'center', menuDisabled: true},
                        {text: '联系电话', dataIndex: 'phone', align: 'center', menuDisabled: true},
                        {text: '配送地址', dataIndex: 'adress', align: 'center', menuDisabled: true},
                        {text: '邮编', dataIndex: 'postcode', align: 'center', menuDisabled: true},
                        {text: '金额', dataIndex: 'price', align: 'center', menuDisabled: true},
                        {text: '备注', dataIndex: 'remark', align: 'center', menuDisabled: true}
                    ]
                }

            ],
            dockedItems: [
                {
                    xtype: 'pagingtoolbar',
                    store: store1,
                    dock: 'bottom',
                    displayInfo: true
                }
            ]

        }).show();

//    },

//    var window = Ext.create('Ext.window.Window',{
//                    title:'订单详情',
//                    width:500,
//                    height:200,
//                    layout:'fit',
//                    items:[{
//                        xtype:'grid',
//                        border:false,
//                        store:store1,
//                        id:'orderinfoShow',
//                        columns:[
//                            {text:'订单号',dataIndex:'billCode',align:'center',menuDisabled:true},
//                            {text:'会员ID',dataIndex:'memberinfoByMemberId.memberId',align:'center',menuDisabled:true},
//                            {text:'配送商编码',dataIndex:'deliveryinfoByDeliveryId.deliveryId',align:'center',menuDisabled:true},
//                            {text:'操作员编码',dataIndex:'operinfoByoperId.operId',align:'center',menuDisabled:true},
//                            {text:'出库单号',dataIndex:'outstockinfoByoutID.outCode',align:'center',menuDisabled:true},
//                            {text:'快递单号',dataIndex:'postBillCode',align:'center',menuDisabled:true},
//                            {text:'订单状态',dataIndex:'billStatus',align:'center',menuDisabled:true},
//                            {text:'订购时间',dataIndex:'billData',align:'center',menuDisabled:true},
//                            {text:'收货人姓名',dataIndex:'consignee',align:'center',menuDisabled:true},
//                            {text:'联系电话',dataIndex:'phone',align:'center',menuDisabled:true},
//                            {text:'配送地址',dataIndex:'adress',align:'center',menuDisabled:true},
//                            {text:'邮编',dataIndex:'postcode',align:'center',menuDisabled:true},
//                            {text:'金额',dataIndex:'price',align:'center',menuDisabled:true},
//                            {text:'备注',dataIndex:'remark',align:'center',menuDisabled:true}
//                         ],
//                        dockedItems: [{
//                            xtype: 'pagingtoolbar',
//                            store: store1,
//                            dock: 'bottom',
//                            displayInfo: true
//                        }]
//                    }]
//                }).show().center();
    }
//    insert:function(){
//        var me = this;
//        var window = Ext.create('Ext.window.Window',{
//            title:'数据添加窗口',
//            items:[{
//                xtype:'form',
//                layout:'form',
//                border:false,
//                id:'',//TODO 数据窗口的ID
//                frame:true,
//                bodyPadding:'5 5 0',
//                width:390,
//                fieldDefaults:{
//                    msgTarget:'side',
//                    labelWidth:75
//                },
//                defaultType:'textfield',
//                items:[{
//                    fieldLabel:'id',
//                    name:''//TODO 数据库中字段的名字
//                },{
//                    fieldLabel:'id',
//                    name:''//TODO 数据库中字段的名字
//                }]
//            }],
//            buttons:[
//                {text:'确定',handler:function(){}},// TODO 调用执行方法
//                {text:'清空',handler:function(){Ext.getCmp('').getForm().reset()}}
//            ]
//        });
//        window.show();
//        window.center();
//    },
//    del:function(){
//        var me = this;
//        var record = Ext.getCmp('').getSelectionModel.getSelection()[0];
//        var window = Ext.create('Ext.window.Window',{
//            title:'你确定要删除这个用户吗？',
//            id:'del',
//            items:[
//                {
//                    xtype:'form',
//                    layout:'form',
//                    border:false,
//                    id:'delFrom',
//                    frame:true,
//                    bodyPadding:'5 5 0',
//                    width:390,
//                    fieldDefaults:{
//                        msgTarget:'side',
//                        labelWidth:75
//                    },
//                    defaultType:'textfield',
//                    items:[
//                        {
//                            fieldLabel: '',
//                            name: '',
//                            allowBlank: false,
//                            value: record.get('')//TODO id
//                        },{
//                            fieldLabel:''
//                        }]
//                }],
//            buttons:[
//                {text:'确定',handler:function(){}},
//                {text:'取消',handler:function(){Ext.getCmp().close()}}
//            ]
//        });
//        window.show();
//        window.center()
//    },
//    edit:function(){
//        var me = this;
//        var record = Ext.getCmp('').getSelectionModel().getSelection()[0];
//        var window = Ext.create('Ext.window.Window',{
//            title:'修改信息',
//            id:'edit',
//            items:[{
//                xtype:'form',
//                layout:'form',
//                border:false,
//                id:'editForm',
//                frame:true,
//                bodyPadding:'5 5 0',
//                width:390,
//                fieldDefaults:{
//                    msgTarget:'side',
//                    labelWidth:75
//                },
//                defaultType:'textfield',
//                items:[
//                    {}//TODO 要修改的列，数据库中飞空的列
//                ]
//            }],
//            buttons:[
//                {text:'修改',handler:function(){}},//TODO 修改的执行方法
//                {text:'关闭',handler:function(){Ext.getCmp('edit').close()}}
//            ]
//        })
//    },
//    execute:function(id,url){
//        var form = Ext.getCmp(id).getForm();
//        if(form.isValid()){
//            form.submit({
//                url:url,
//                success:function(form,action){},
//                failure:function(form,action){
//                    Ext.MessageBox.show({
//                        title:'异常提示',
//                        msg:'由于网络原因你发送的请求无法完成，请检查你的网络，是否已连接！',
//                        icon:Ext.MessageBox.QUESTION,
//                        buttons:Ext.MessageBox.YES
//                    })
//                }
//            })
//        }
//    }
})