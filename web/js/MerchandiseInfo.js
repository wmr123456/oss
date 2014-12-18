/**
 * Created by Administrator on 2014/11/23.
 */
Ext.define('js.MerchandiseInfo', {
    extend: 'Ext.grid.Panel',
    storeClass: Ext.create('Ext.data.Store', {
        autoLoad: true,
        proxy: {
            type: 'ajax',
            url: 'goodspagelist', //TODO 要访问的action名称
            reader: {
                type: 'json',
                root: 'goodsClasslist'
//                totalProperty: 'count'
            }
        },
        fields: [
            {'name': 'merchandiseCName', type: 'string'},
            {'name': 'merchandiseCid', type: 'string'}
        ]
    }),
    storeUnit: Ext.create('Ext.data.Store', {
        autoLoad: true,
        proxy: {
            type: 'ajax',
            url: 'unitInfopage',
            reader: {
                type: 'json',
                root: 'unitlist'
            }
        },
        fields: [
            {name: 'unitInfoName', type: 'string'},
            {name: 'unitInfoId', type: 'byte'}
        ],
        listeners: {
            beforeload: function (store, operation) {
                var name = Ext.getCmp('merchandiseparam1');
                var name1 = Ext.getCmp('merchandiseparam2');
                var name2 = Ext.getCmp('startPrice');
                var name3 = Ext.getCmp('endPrice');
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
                ;
                if (name2) {
                    if (name2.getValue()) {
                        if (operation.params) {
                            operation.params.startPrice = name2.getValue()
                        } else {
                            operation.params = {
                                startPrice: name2.getValue(name2.getValue())
                            }
                        }
                    }
                    if (name3.getValue()) {
                        if (operation.params) {
                            operation.params.endPrice = name3.getValue()
                        } else {
                            operation.params = {
                                endPrice: name3.getValue(name3.getValue())
                            }
                        }

                    }
                }
            }
        }
    }),
    storeProStatus: Ext.create('Ext.data.Store', {
        autoLoad: true,
        proxy: {
            type: 'ajax',
            url: 'proStatuspage',
            reader: {
                type: 'json',
                root: 'prostatuslist'
            }
        },
        fields: [
            {name: 'proStatusName', type: 'string'},
            {name: 'proStatusId', type: 'string'}
        ]
    }),
    initComponent: function () {
        var me = this;
        var store = Ext.create('Ext.data.Store', {
            id: 'merchandiseinPanel', //TODO 分页的ID
            pageSize: 20,
            autoLoad: false,
            proxy: {
                type: 'ajax',
                url: 'merchandisepage', //TODO 要访问的action名称
                reader: {
                    type: 'json',
                    root: 'merchandiseinfolist',
                    totalProperty: 'count'
                }
            },
            fields: [
                {name: 'merchandiseId', type: 'string'}, //TODO 名称和属性
                {name: 'merchandiseName', type: 'string'},
                {name: 'merchandiseAb', type: 'string'},
                {name: 'price', type: 'long'},
                {name: 'spec', type: 'string'},
                {name: 'descri', type: 'string'},
                {name: 'remark', type: 'string'},
                {name: 'saleStatus', type: 'boolean'},
                {name: 'picPath', type: 'string'},
                {name: 'clickCount', type: 'int'},
                {name: 'prostatusinfoByProStatusId.proStatusName', type: 'string', flex: 1},
                {name: 'unitinfoByUnitInfoId.unitInfoName', type: 'string', flex: 1},
                {name: 'merchandisecinfoByMerchandiseCid.merchandiseCName', type: 'string', flex: 1}
            ]
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
                    'text': '按商品名称', 'name': 'merchandiseName'
                },
                {
                    'text': '按助记码', 'name': 'merchandiseAb'
                },
                {
                    'text': '按规格', 'name': 'spec'
                },
                {
                    'text': '描述', 'name': 'descri'
                },
                {
                    'text': '商品类别', 'name': 'merchandisecinfoByMerchandiseCid.merchandiseCName'
                },
                {
                    'text': '单位', 'name': 'unitinfoByUnitInfoId.unitInfoName'
                },
                {
                    'text': '销售状态', 'name': 'prostatusinfoByProStatusId.proStatusName'
                }
            ]
        });
        var selModel = Ext.create(Ext.selection.CheckboxModel);
        Ext.apply(this, {
            id: 'merchandisepage',
            stripeRows: true,
            border: false,
            selModel: selModel,
            closable: true,
            title: '商品信息管理',//TODO 表格的名称
            store: Ext.data.StoreManager.lookup('merchandiseinPanel'), //TODO store的ID
            columns: [
                {text: '商品名称', dataIndex: 'merchandiseName', align: 'center', menuDisabled: true, flex: 1},//TODO  flex:1这一列一直到最后
                {text: '商品ID', dataIndex: 'merchandiseId', align: 'center', menuDisabled: true, hidden: true},
                {text: '商品助记码', dataIndex: 'merchandiseAb', align: 'center', menuDisabled: true, flex: 1},
                {text: '商品类别', dataIndex: 'merchandisecinfoByMerchandiseCid.merchandiseCName', align: 'center', menuDisabled: true, flex: 1},
                {text: '价格', dataIndex: 'price', align: 'center', menuDisabled: true, flex: 1},
                {text: '单位', dataIndex: 'unitinfoByUnitInfoId.unitInfoName', align: 'center', menuDisabled: true, flex: 1},
                {text: '规格', dataIndex: 'spec', align: 'center', menuDisabled: true, flex: 1},
                {text: '销售状态', dataIndex: 'prostatusinfoByProStatusId.proStatusName', align: 'center', menuDisabled: true, flex: 1},
                {text: '描述', dataIndex: 'descri', align: 'center', menuDisabled: true, flex: 1},
                {text: '备注', dataIndex: 'remark', align: 'center', menuDisabled: true, flex: 1},
                {text: '销售状态', dataIndex: 'saleStatus', align: 'center', menuDisabled: true, flex: 1, hidden: true},
                {text: '图片路径', dataIndex: 'picPath', align: 'center', menuDisabled: true, flex: 1},
                {text: '点击数', dataIndex: 'clickCount', align: 'center', menuDisabled: true, flex: 1, hidden: true}
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
                            id: 'merchandiseparam1',
                            name: 'merchandiseparam1',
                            width: 112,
                            emptyText: '请选择查询方式',
                            emptyValue: '0',
                            store: store2,
                            displayField: 'text',
                            valueField: 'name'
                        },
                        {
                            xtype: 'textfield',
                            id: 'merchandiseparam2',
                            name: 'merchandiseparam2'
                        },
                        {
                            xtype: 'tbtext',
                            text: '按单价查询:'
                        },
                        {
                            xtype: 'textfield',
                            id: 'startPrice',
                            name: 'startPrice'
                        },
                        {
                            xtype: 'tbtext',
                            text: '到'
                        },
                        {
                            xtype: 'textfield',
                            id: 'endPrice',
                            name: 'endPrice'
                        },
                        { xtype: 'button', text: '搜索', border: false, style: {background: '#cbdbef'}, handler: function () {
                            Ext.getCmp('merchandisepage').store.load({
                                params: {
                                    param1: Ext.getCmp('merchandiseparam1').getValue(),
                                    param2: Ext.getCmp('merchandiseparam2').getValue(),
                                    startPrice: Ext.getCmp('startPrice').getValue(),
                                    endPrice: Ext.getCmp('endPrice').getValue()
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
            ],
            tbar: [
                {xtype: 'button', text: '添加', handler: function () {
                    if (!Ext.getCmp('merchandiseInsert')) {
                        me.insert()
                    }
                }},
                {xtype: 'button', text: '删除', handler: function () {
                    me.del();
                }},
                {xtype: 'button', text: '修改', handler: function () {
                    if (!Ext.getCmp('merchandiseEdit')) {
                        me.edit()
                    }
                }}
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
                    id: 'merchandiseinsert',//TODO 数据窗口的ID
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
                            fieldLabel: '商品名称',
                            aloowBlank: true,
                            name: 'mecd.merchandiseName'     //TODO 数据库中字段的名字
                        },
                        {
                            fieldLabel: '商品助记码',
                            name: 'mecd.merchandiseAb'       //TODO 数据库中字段的名字
                        },
                        {
                            xtype: 'combo',
                            fieldLabel: '商品类别',
                            store: me.storeClass,
                            name: 'mecd.merchandisecinfoByMerchandiseCid.merchandiseCid',
                            displayField: 'merchandiseCName',
                            valueField: 'merchandiseCid'
                        },
                        {
                            fieldLabel: '价格',
                            name: 'mecd.price'//TODO 数据库中字段的名字
                        },
                        {
                            xtype: 'combo',
                            fieldLabel: '商品单位',
                            store: me.storeUnit,
                            name: 'mecd.unitinfoByUnitInfoId.unitInfoName',
                            aloowBlank: true,
                            displayField: 'unitInfoName',
                            valueField: 'unitInfoId'
                        },
                        {
                            xtype: 'combo',
                            fieldLabel: '销售状态',
                            store: me.storeProStatus,
                            name: 'mecd.prostatusinfoByProStatusId.proStatusId',
                            displayField: 'proStatusName',
                            valueField: 'proStatusId'
                        },
                        {
                            fieldLabel: '规格',
                            name: 'mecd.',
                            aloowBlank: true,
                            name: 'mecd.spec'//TODO 数据库中字段的名字
                        },
                        {
                            fieldLabel: '销售状态',
                            name: 'mecd.saleStatus',//TODO 数据库中字段的名字
                            aloowBlank: true
                        },
                        {
                            fieldLabel: '描述',
                            name: 'mecd.descri',
                            name: 'mecd.'//TODO 数据库中字段的名字
                        },
                        {
                            fieldLabel: '备注',
                            name: 'mecd.remark'//TODO 数据库中字段的名字
                        },
                        {
                            fieldLabel: '图片路径',
                            name: 'mecd.picPath'//TODO 数据库中字段的名字
                        }
                    ]
                }
            ],
            buttons: [
                {text: '确定', handler: function () {
                    me.execute('merchandiseinsert', 'merchandiseInsert')
                }},// TODO 调用执行方法
                {text: '清空', handler: function () {
                    Ext.getCmp('merchandiseinsert').getForm().reset()
                }}
            ]
        });
        window.show();
        window.center();
    },
    del: function () {
        var me = this;
        var record = Ext.getCmp('merchandisepage').getSelectionModel().getSelection();
        var length = record.length;
        var list = '';
        if (length > 1) {
            for (var i = 0; i < length; i++) {
                list += record[i].raw.merchandiseId;
                if (i != length - 1) {
                    list += ',';
                }
            }
        } else {
            list += record[0].raw.merchandiseId;
        }
        Ext.Ajax.request({
            url: 'merchandiseDel',
            method: 'post',
            params: {idList: list},
            success: function () {
                Ext.getCmp('merchandisepage').store.reload(

                );
            }
        })
    },
    edit: function () {
        var me = this;
        var recordedit = Ext.getCmp('merchandisepage').getSelectionModel().getSelection();
        if (recordedit.length > 1) {
            Ext.MessageBox.show({
                title: '异常提示',
                msg: '修改数据每次只能修改一条，请重新选择',
                icon: Ext.MessageBox.INFO,
                buttons: Ext.MessageBox.YES
            })
        } else if (recordedit.length == 1) {
            var window = Ext.create('Ext.window.Window', {
                title: '修改信息',
                id: 'merchandiseEdit',
                items: [
                    {
                        xtype: 'form',
                        layout: 'form',
                        border: false,
                        id: 'merchandiseEditForm',
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
                                fieldLabel: '商品ID',
                                name: 'mecd.merchandiseId',//TODO 数据库中字段的名字
                                value: recordedit[0].raw.merchandiseId,
                                hidden: true
                            },
                            {
                                fieldLabel: '商品名称',
                                name: 'mecd.merchandiseName',//TODO 数据库中字段的名字
                                value: recordedit[0].raw.merchandiseName,
                                displayField: 'merchandiseCName',
                                valueField: 'merchandiseCid'
                            },
                            {
                                fieldLabel: '助记码',
                                name: 'mecd.merchandiseAb',
                                value: recordedit[0].raw.merchandiseAb//TODO 数据库中字段的名字

                            },
                            {
                                xtype: 'combo',
                                fieldLabel: '商品类别',
                                store: me.storeClass,
                                name: 'mecd.merchandisecinfoByMerchandiseCid.merchandiseCid',
                                value: recordedit[0].raw.merchandisecinfoByMerchandiseCid.merchandiseCid,//TODO 数据库中字段的名字
                                displayField: 'merchandiseCName',
                                valueField: 'merchandiseCid'

                            },
                            {
                                fieldLabel: '价格',
                                name: 'mecd.price',//sortId
                                value: recordedit[0].raw.price
                            },
                            {
                                fieldLabel: '规格',
                                name: 'mecd.spec',//sortId
                                value: recordedit[0].raw.spec
                            },
                            {
                                xtype: 'combo',
                                fieldLabel: '单位',
                                store: me.storeUnit,
                                name: 'mecd.unitinfoByUnitInfoId.unitInfoId',//sortId
                                value: recordedit[0].raw.unitinfoByUnitInfoId.unitInfoId,
                                displayField: 'unitInfoName',
                                valueField: 'unitInfoId'
                            },
                            {
                                xtype: 'combo',
                                fieldLabel: '销售状态',
                                store: me.storeProStatus,
                                name: 'mecd.prostatusinfoByProStatusId.proStatusId',//sortId
                                value: recordedit[0].raw.prostatusinfoByProStatusId.proStatusId,
                                displayField: 'proStatusName',
                                valueField: 'proStatusId'
                            },
                            {
                                fieldLabel: '描述',
                                name: 'mecd.descri',
                                value: recordedit[0].raw.descri
                            },
                            {
                                fieldLabel: '备注',
                                name: 'mecd.remark',
                                value: recordedit[0].raw.remark
                            },
                            {
                                fieldLabel: '图片',
                                name: 'mecd.picPath',
                                value: recordedit[0].raw.picPath
                            },
                            {
                                fieldLabel: '点击数',
                                name: 'mecd.clickCount',
                                value: recordedit[0].raw.clickCount
                            }
                        ]
                    }
                ],
                buttons: [
                    {text: '保存', handler: function () {
                        me.execute('merchandiseEditForm', 'merchandiseEdit')
                    }},//TODO 修改的执行方法
                    {text: '关闭', handler: function () {
                        Ext.getCmp('merchandiseEdit').close()
                    }}
                ]
            });
            window.center();
            window.show();
        } else {
            Ext.MessageBox.show({
                title: '异常提示',
                msg: '请选择一条数据,进行修改',
                icon: Ext.MessageBox.INFO,
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
                    Ext.getCmp('merchandisepage').store.reload();
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
                        icon: Ext.MessageBox.INFO,
                        buttons: Ext.MessageBox.YES
                    })
                }
            })
        }
    }
})