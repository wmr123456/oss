/**
 * Created by Administrator on 2014-11-12.
 */
Ext.define('js.logpage', {
    extend: 'Ext.grid.Panel',
    initComponent: function () {
        var me = this;
        var store = Ext.create('Ext.data.Store', {
            id: 'loginfoPanel', //TODO 分页的ID
            pageSize: 20,
            autoLoad: false,
            proxy: {
                type: 'ajax',
                url: 'loginfopage', //TODO 要访问的action名称
                reader: {
                    type: 'json',
                    root: 'logList',
                    totalProperty: 'rows'//TODO action中返回来的总数量
                }
            },
            fields: [
                {name: 'id', type: 'string'}, //TODO 名称和属性
                {name: 'logTime', type: 'Timestamp'},
                {name: 'ip', type: 'string'},
                {name: 'content', type: 'string'},
                {name: 'operinfoByOperId.operName', type: 'string'}
            ],
            listeners: {
                beforeload: function (store, operation) {
                    var name = Ext.getCmp('logpageparam1Class');
                    var name1 = Ext.getCmp('logpageparam1Value');
                    var name2 = Ext.getCmp('logpageparam2Class');
                    var name3 = Ext.getCmp('logpageparam2Value');
                    var name4 = Ext.getCmp('logpageparam7');
                    var name5 = Ext.getCmp('logpageparam8');
                    if (name) {
                        if (name.getValue()) {
                            if (operation.params) {
                                operation.params.param1 = name.getValue()
                            } else {
                                operation.params = {param1: name.getValue()};
                            }
                        }
                        ;
                        if (name1) {
                            if (name1.getValue()) {
                                if (operation.params) {
                                    operation.params.param2 = name1.getValue()    //encodeURIComponent()
                                } else {
                                    operation.params = {
                                        param2: name1.getValue(name1.getValue())
                                    };
                                }
                            }
                        }
                        ;
                    }
                    ;
                    if (name3) {
                        if (name2) {
                            if (name2.getValue()) {
                                if (operation.params) {
                                    operation.params.param3 = name2.getValue()    //encodeURIComponent()
                                } else {
                                    operation.params = {
                                        param3: name1.getValue(name2.getValue())
                                    };
                                }
                            }
                        }
                        ;
                        if (name3) {
                            if (name3.getValue()) {
                                if (operation.params) {
                                    operation.params.param4 = name3.getValue()    //encodeURIComponent()
                                } else {
                                    operation.params = {
                                        param4: name1.getValue(name3.getValue())
                                    };
                                }
                            }
                        }
                        ;
                    }
                    ;
                    if (name5) {
                        if (name4) {
                            if (name4.getValue()) {
                                if (operation.params) {
                                    operation.params.param7 = name4.getValue()    //encodeURIComponent()
                                } else {
                                    operation.params = {
                                        param7: name4.getValue(name4.getValue())
                                    };
                                }
                            }
                        }
                        ;
                        if (name5) {
                            if (name5.getValue()) {
                                if (operation.params) {
                                    operation.params.param8 = name5.getValue()    //encodeURIComponent()
                                } else {
                                    operation.params = {
                                        param8: name5.getValue(name5.getValue())
                                    };
                                }
                            }
                        }
                        ;
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
        var store2 = Ext.create('Ext.data.Store', {
            fields: ['text', 'name'],
            data: [
                {
                    'text': '按操作员', 'name': 'operinfoByOperId.operName'
                },
                {
                    'text': '按IP', 'name': 'ip'
                },
                {
                    'text': '按内容', 'name': 'content'
                }
            ]
        })
        Ext.apply(this, {
            id: 'logpage',
            stripeRows: true,
            border: false,
            closable: true,
            title: '查看日志',//TODO 表格的名称
            store: Ext.data.StoreManager.lookup('loginfoPanel'), //TODO store的ID
            columns: [
                {text: 'ID', dataIndex: 'id', align: 'center', menuDisabled: true, hidden: true}, //TODO  falex:1这一列一直到最后
                {text: '操作员', dataIndex: 'operinfoByOperId.operName', align: 'center', menuDisabled: true, width: 150},
                {text: 'IP', dataIndex: 'ip', align: 'center', menuDisabled: true, width: 150},
                {text: '时间', dataIndex: 'logTime', align: 'center', menuDisabled: true, width: 200},
                {text: '内容', dataIndex: 'content', align: 'center', menuDisabled: true, flex: 1}
            ],
            dockedItems: [
                {
                    xtype: 'form',
                    layout: 'column',
                    border: false,
                    bodyStyle: {
                        background: '#cbdbef'
                    },
                    items: [
                        {
                            xtype: 'combo',
                            id: 'logpageparam1Class',
                            name: 'logpageparam1',
                            width: 112,
                            emptyText: '请选择查询方式',
                            emptyValue: '0',
                            store: store2,
                            displayField: 'text',
                            valueField: 'name'
                        },
                        {
                            xtype: 'textfield',
                            id: 'logpageparam1Value',
                            name: 'logpageparam2'
                        },
                        {
                            xtype: 'combo',
                            id: 'logpageparam2Class',
                            name: 'logpageparam3',
                            width: 112,
                            emptyText: '请选择查询方式',
                            emptyValue: '0',
                            store: store2,
                            displayField: 'text',
                            valueField: 'name'
                        },
                        {
                            xtype: 'textfield',
                            id: 'logpageparam2Value',
                            name: 'logpageparam4'
                        },
                        {
                            xtype: 'tbtext',
                            text: '按时间：'
                        },
                        {
                            xtype: 'datefield',
                            id: 'logpageparam7',
                            format: 'Y-m-d',
//                    altFormats: "Y/m/d|Ymd",
                            emptyText: '请选择开始时间'
                        },
                        {xtype: 'tbtext',
                            text: '  到  '
                        },
                        {
                            xtype: 'datefield',
                            id: 'logpageparam8',
                            format: 'Y-m-d',
//                    altFormats: "Y/m/d|Ymd",
                            emptyText: '请选择截止时间'
                        },
                        { xtype: 'button', text: '搜索', border: false, style: {background: '#cbdbef'}, handler: function () {
                            Ext.getCmp('logpage').store.load({
                                params: {
                                    param1: Ext.getCmp('logpageparam1Class').getValue(),
                                    param2: Ext.getCmp('logpageparam1Value').getValue(),
                                    param3: Ext.getCmp('logpageparam2Class').getValue(),
                                    param4: Ext.getCmp('logpageparam2Value').getValue(),
                                    param7: Ext.getCmp('logpageparam7').getValue(),
                                    param8: Ext.getCmp('logpageparam8').getValue()
                                }
                            });
                        }
                        }
                    ]
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
    execute: function (id, url) {
        var form = Ext.getCmp(id).getForm();
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