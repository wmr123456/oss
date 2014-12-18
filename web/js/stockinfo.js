/**
 * Created by Administrator on 2014/12/2.
 */
Ext.define('js.stockinfo', {
    extend: 'Ext.grid.Panel',
    initComponent: function () {
        var me = this;
        var store = Ext.create('Ext.data.Store', {
            id: 'stockingoPanel', //TODO 分页的ID
            pageSize: 20,
            autoLoad: false,
            proxy: {
                type: 'ajax',
                url: 'stockinfopage', //TODO 要访问的action名称
                reader: {
                    type: 'json',
                    root: 'stockList',
                    totalProperty: 'rows'//TODO action中返回来的总数量
                }
            },
            fields: [
                {name: 'id', type: 'string'}, //TODO 名称和属性
                {name: 'avgPrice', type: 'BigDecimal'},
                {name: 'num', type: 'int'},
                {name: 'merchandiseinfoByMerchandiseId.merchandiseName', type: 'string'},
                {name:'merchandiseinfoByMerchandiseId.merchandisecinfoByMerchandiseCid.merchandiseCName'}
            ],
            listeners: {
                beforeload:function(store,operation){
                    var name = Ext.getCmp('stockparam1Class');
                    var name1 = Ext.getCmp('stockparam1Value');
                    if(name){
                        if(name.getValue()){
                            if(operation.params){
                                operation.params.param1=name.getValue()
                            }else{
                                operation.params={param1:name.getValue()};
                            }
                        };
                        if(name1){
                            if(name1.getValue()){
                                if(operation.params){
                                    operation.params.param2=name1.getValue()    //encodeURIComponent()
                                }else{
                                    operation.params={
                                        param2:name1.getValue(name1.getValue())
                                    };
                                }
                            }
                        };
                    }
                }
            }
        });
        store.load({
            params: {
                start: 0,
                limit: 20
            }
        });
        var store2 = Ext.create('Ext.data.Store',{
            fields:['text','name'],
            data:[{
                'text':'商品名称','name':'merchandiseinfoByMerchandiseId.merchandiseName'
            },{
                'text':'商品分类','name':'merchandiseinfoByMerchandiseId.merchandisecinfoByMerchandiseCid.merchandiseCName'
            }]
        });
        Ext.apply(this, {
            id: 'stockinfopage',
            stripeRows: true,
            border: false,
            closable: true,
            title: '仓库管理',//TODO 表格的名称
            store: Ext.data.StoreManager.lookup('stockingoPanel'), //TODO store的ID
            columns: [
                {text: '商品ID号', dataIndex: 'id', align: 'center', menuDisabled: true,hidden:true},//TODO  falex:1这一列一直到最后
                {text: '商品名称', dataIndex: 'merchandiseinfoByMerchandiseId.merchandiseName', align: 'center', menuDisabled: true},
                {text: '商品总数', dataIndex: 'num', align: 'center', menuDisabled: true},
                {text: '商品加权平均价', dataIndex: 'avgPrice', align: 'center', menuDisabled: true},
                {text:'商品类别',dataIndex:'merchandiseinfoByMerchandiseId.merchandisecinfoByMerchandiseCid.merchandiseCName',align:'center',menuDisabled:true}
            ],
            dockedItems: [{
                    xtype:'form',
                    layout:'column',
                    border:false,
                    bodyStyle:{
                        background:'#cbdbef'
                    },
                    items:[{
                        xtype:'combo',
                        id:'stockparam1Class',
                        name:'param1',
                        width:112,
                        emptyText:'请选择查询方式',
                        emptyValue:'0',
                        store:store2,
                        displayField:'text',
                        valueField:'name'
                    },{
                        xtype:'textfield',
                        id:'stockparam1Value',
                        name:'param2'
                    },{ xtype:'button',text:'搜索',border:false,style:{background:'#cbdbef'}, handler:function(){
                        Ext.getCmp('stockinfopage').store.load({
                            params:{
                                param1:Ext.getCmp('stockparam1Class').getValue(),
                                param2:Ext.getCmp('stockparam1Value').getValue()
                            }
                        });
                    }
                    }]
            },
                {
                    xtype: 'pagingtoolbar',
                    store: store,
                    dock: 'bottom',
                    displayInfo: true
                }
            ]
        });
        this.callParent();
    },
    insert: function () {
        var me = this;
        var window = Ext.create('Ext.window.Window', {
            title: '数据添加窗口',
            items: [
                {
                    xtype: 'form',
                    layout: 'form',
                    border: false,
                    id: '',//TODO 数据窗口的ID
                    frame: true,
                    bodyPadding: '5 5 0',
                    width: 390,
                    fieldDefaults: {
                        msgTarget: 'side',
                        labelWidth: 75
                    },
                    defaultType: 'textfield',
                    items: [
                        {
                            fieldLabel: 'id',
                            name: ''//TODO 数据库中字段的名字
                        },
                        {
                            fieldLabel: 'id',
                            name: ''//TODO 数据库中字段的名字
                        }
                    ]
                }
            ],
            buttons: [
                {text: '确定', handler: function () {
                }},// TODO 调用执行方法
                {text: '清空', handler: function () {
                    Ext.getCmp('').getForm().reset()
                }}
            ]
        });
        window.show();
        window.center();
    },
    del: function () {
        var me = this;
        var record = Ext.getCmp('').getSelectionModel.getSelection()[0];
        var window = Ext.create('Ext.window.Window', {
            title: '你确定要删除这个用户吗？',
            id: 'del',
            items: [
                {
                    xtype: 'form',
                    layout: 'form',
                    border: false,
                    id: 'delFrom',
                    frame: true,
                    bodyPadding: '5 5 0',
                    width: 390,
                    fieldDefaults: {
                        msgTarget: 'side',
                        labelWidth: 75
                    },
                    defaultType: 'textfield',
                    items: [
                        {
                            fieldLabel: '',
                            name: '',
                            allowBlank: false,
                            value: record.get('')//TODO id
                        },
                        {
                            fieldLabel: ''
                        }
                    ]
                }
            ],
            buttons: [
                {text: '确定', handler: function () {
                }},
                {text: '取消', handler: function () {
                    Ext.getCmp().close()
                }}
            ]
        });
        window.show();
        window.center()
    },
    edit: function () {
        var me = this;
        var record = Ext.getCmp('').getSelectionModel().getSelection()[0];
        var window = Ext.create('Ext.window.Window', {
            title: '修改信息',
            id: 'edit',
            items: [
                {
                    xtype: 'form',
                    layout: 'form',
                    border: false,
                    id: 'editForm',
                    frame: true,
                    bodyPadding: '5 5 0',
                    width: 390,
                    fieldDefaults: {
                        msgTarget: 'side',
                        labelWidth: 75
                    },
                    defaultType: 'textfield',
                    items: [
                        {}//TODO 要修改的列，数据库中飞空的列
                    ]
                }
            ],
            buttons: [
                {text: '修改', handler: function () {
                }},//TODO 修改的执行方法
                {text: '关闭', handler: function () {
                    Ext.getCmp('edit').close()
                }}
            ]
        })
    },
    execute: function (id, url) {
        var from = Ext.getCmp(id).getForm();
        if (form.isValid()) {
            form.submit({
                url: url,
                success: function (form, action) {
                },
                failure: function (form, action) {
                    Ext.MessageBox.show({
                        title: '异常提示',
                        msg: '由于网络原因你发送的请求无法完成，请检查你的网络，是否已连接！',
                        icon: Ext.MessageBox.QUESTION,
                        buttons: Ext.MessageBox.YES
                    })
                }
            })
        }
    }
})