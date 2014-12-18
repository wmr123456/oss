/**
 * Created by Administrator on 2014/11/17.
 */
Ext.define('js.goodsclass', {
    extend: 'Ext.grid.Panel',
    initComponent: function () {
        var me = this;
        var store1 = Ext.create('Ext.data.Store', {
            id: 'goodsPanel',
            pageSize: 34,
            autoLoad: false,
            allowDeselect: true,
            proxy: {
                type: 'ajax',
                url: 'goodspagelist', //TODO 要访问的action名称
                reader: {
                    type: 'json',
                    root: 'goodsClasslist',
                    successProperty: 'success',
                    totalProperty: "count"//TODO action中返回来的总数量
                }
            },
            fields: [
                {name: 'merchandiseCName', type: 'string'}, //TODO 名称和属性
                {name: 'status', type: 'boolean'},
                {name: 'merchandiseCid', type: 'string'}
            ],
            listeners: {
                beforeload: function (store, operation) {
                    var name = Ext.getCmp('goodsClass');
                    var name1 = Ext.getCmp('goodsValue');

                    if (name) {
                        if (name.getValue()) {
                            if (operation.params) {
                                operation.params.param1 = name.getValue()
                            } else {
                                operation.params = {param1: name.getValue()};
                            }
                        }
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
                    }
                }
            }
        });
        store1.load({
            params: {
                start: 0,
                limit: 34
            }
        });
        var store2 = Ext.create('Ext.data.Store', {
            fields: ['text', 'name'],
            data: [
                {'text': '按状态', 'name': 'status'},
                {'text': '按分类名称', 'name': 'merchandiseCName'}
            ]
        });
        var selModel = Ext.create(Ext.selection.CheckboxModel);
        Ext.apply(this, {
            xtype: 'grid',
            id: 'goodscClassPage',
            stripeRows: true,
            border: false,
            selModel: selModel,
            closable: true,
            singleSelect: false,
            title: '商品分类管理',//TODO 表格的名称
            store: Ext.data.StoreManager.lookup('goodsPanel'), //TODO store的ID
            columns: [
                {text: '分类名称', dataIndex: 'merchandiseCName', align: 'center', menuDisabled: true, flex: 1}, //TODO  flex:1这一列一直到最后
                {text: '状态', dataIndex: 'status', align: 'center', menuDisabled: true, flex: 1},
                {text: 'id', dataIndex: 'merchandiseCid', align: 'center', menuDisabled: true, hidden: true},
                {text: '排序', dataIndex: 'sortId', align: 'center', menuDisabled: true, hidden: true}
            ],
            dockedItems: [
                {
                    dock: 'top',
                    xtype: 'toolbar'
                },
                {
                    dock: 'bottom',
                    xtype: 'pagingtoolbar',
                    store: store1,
                    dock: 'bottom',
                    displayInfo: true
                }
            ],
            tbar: [
                {xtype: 'button', text: '添加', handler: function () {
                    if (!Ext.getCmp('goodsClassInsert')) {
                        me.insert();
                    }
                }},
                {xtype: 'button', text: '删除', handler: function () {
                    me.del()
                }},
                {xtype: 'button', text: '修改', handler: function () {
                    if (!Ext.getCmp('goodsClassedit')) {
                        me.edit()
                    }
                }},
                {
                    xtype: 'combo',
                    id: 'goodsClass',
                    name: 'goodsClass',
                    width: 112,
                    emptyText: '请选择查询方式',
                    store: store2,
                    displayField: 'text',
                    valueField: 'name'
                },
                {
                    xtype: 'textfield',
                    id: 'goodsValue',
                    name: 'goodsValue'
                },
                { xtype: 'button', text: '搜索', border: false, handler: function () {
                    Ext.getCmp('goodscClassPage').store.load({
                        params: {
                            param1: Ext.getCmp('goodsClass').getValue(),
                            param2: Ext.getCmp('goodsValue').getValue()
                        }
                    });
                }
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
                    id: 'goodsClassInsert',//TODO 数据窗口的ID
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
                            fieldLabel: '类别名称',
                            name: 'mchdc.merchandiseCName'//TODO 数据库中字段的名字
                        },
                        {
                            fieldLabel: '状态（1上架和0下架）',
                            name: 'mchdc.status'//TODO 数据库中字段的名字
                        }
                    ]
                }
            ],
            buttons: [
                {text: '确定', handler: function () {
                    me.execute('goodsClassInsert', 'goodsInsert')
                }},// TODO 调用执行方法
                {text: '清空', handler: function () {
                    Ext.getCmp('goodsClassInsert').getForm().reset()
                }}
            ]
        });
        window.show();
        window.center();
    },
    del: function () {
        var me = this;
        var record = Ext.getCmp('goodscClassPage').getSelectionModel().getSelection();
        var length = record.length;
        var list = '';
        if (length > 1) {
            for (var i = 0; i < length; i++) {
                list += record[i].raw.merchandiseCid;
                if (i != length - 1) {
                    list += ',';
                }
            }
        } else {
            list += record[0].raw.merchandiseCid;
        }
        Ext.Ajax.request({
            url: 'goodsdel',
            method: 'post',
            params: {idList: list},
            success: function () {
                Ext.getCmp('goodscClassPage').store.reload(

                );
            }
        })
    },
    edit: function () {
        var me = this;
        var recordedit = Ext.getCmp('goodscClassPage').getSelectionModel().getSelection();
        if (recordedit.length > 1) {
            Ext.MessageBox.show({
                title: '异常提示',
                msg: '修改数据每次只能修改一条，请重新选择',
                icon: Ext.MessageBox.QUESTION,
                buttons: Ext.MessageBox.YES
            })
        } else if (recordedit.length == 1) {
            var window = Ext.create('Ext.window.Window', {
                title: '修改信息',
                id: 'goodsClassedit',
                items: [
                    {
                        xtype: 'form',
                        layout: 'form',
                        border: false,
                        id: 'goodsclasseditForm',
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
                                fieldLabel: '类别名称',
                                name: 'mchdc.merchandiseCName',//TODO 数据库中字段的名字
                                value: recordedit[0].raw.merchandiseCName
                            },
                            {
                                fieldLabel: '状态（1上架和0下架）',
                                name: 'mchdc.status',
                                value: recordedit[0].raw.status//TODO 数据库中字段的名字

                            },
                            {
                                fieldLabel: 'id（1上架和0下架）',
                                name: 'mchdc.merchandiseCid',//sortId
                                value: recordedit[0].raw.merchandiseCid,
                                hidden: true
                            },
                            {
                                fieldLabel: '状态（1上架和0下架）',
                                name: 'mchdc.sortId',//
                                value: recordedit[0].raw.sortId,
                                hidden: true
                            }
                        ]
                    }
                ],
                buttons: [
                    {text: '保存', handler: function () {
                        me.execute('goodsclasseditForm', 'goodsedit')
                    }},//TODO 修改的执行方法
                    {text: '关闭', handler: function () {
                        Ext.getCmp('goodsClassedit').close()
                    }}
                ]
            });
            window.center();
            window.show();
        } else {
            Ext.MessageBox.show({
                title: '异常提示',
                msg: '请选择一条数据,进行修改',
                icon: Ext.MessageBox.QUESTION,
                buttons: Ext.MessageBox.YES
            })
        }
    },
    execute: function (id, url) {
        var form = Ext.getCmp(id).getForm();
        if (form.isValid()) {
            form.submit({
                url: url,
                success: function (form, action) {
                    var msg = Ext.JSON.decode(action.response.responseText);
                    Ext.getCmp('goodscClassPage').store.reload();
                    Ext.MessageBox.show({
                        title: '系统提示',
                        msg: msg.message,
                        icon: Ext.MessageBox.INFO,
                        buttons: Ext.MessageBox.YES
                    })
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