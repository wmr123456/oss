/**
 * Created by Administrator on 2014-11-06.
 */
Ext.define('ShinowMain', {
    extend: 'Ext.container.Viewport',
    initComponent: function () {
        var me = this;
        var logger = {};
        this.createMenuList();
        Ext.Ajax.request({
            url: 'userinfo',
            async: false,
            success: function (response) {
                logger = Ext.JSON.decode(response.responseText);
            }
        });
        var store1 = Ext.create('Ext.data.Store', {
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
                { name: 'merchandiseId', type: 'string', mapping: 'merchandiseinfoByMerchandiseId.merchandiseId'},
                { name: 'merchandiseName', type: 'string', mapping: 'merchandiseinfoByMerchandiseId.merchandiseName'},
                { name: 'num', type: 'int'}
            ],
            autoLoad: true
        });
        var donut = false;
        var chart = Ext.create('Ext.chart.Chart', {
            xtype: 'chart',
            animate: true,
            store: store1,
            shadow: true,
            legend: {
                position: 'right'
            },
            insetPadding: 60,
            theme: 'Base:gradients',
            series: [
                {
                    type: 'pie',
                    field: 'num',
                    showInLegend: true,
                    donut: donut,
                    tips: {
                        trackMouse: true,
                        renderer: function (storeItem) {
                            //calculate percentage.
                            var total = 0;
                            store1.each(function (rec) {
                                total += rec.get('num');
                            });
                            this.setTitle(storeItem.get('merchandiseName') + ': ' + Math.round(storeItem.get('num') / total * 100) + '%');
                        }
                    },
                    highlight: {
                        segment: {
                            margin: 20
                        }
                    },
                    label: {
                        field: 'merchandiseName',
                        display: 'num',
                        contrast: true,
                        font: '12px Arial'
                    }
                }
            ]
        });
        var chart1 = Ext.create('Ext.chart.Chart', {
            style: 'background:#fff',
            animate: true,
            shadow: true,
            store: store1,
            axes: [
                {
                    type: 'Numeric',
                    position: 'left',
                    fields: ['num'],
                    label: {
                        renderer: Ext.util.Format.numberRenderer('0,0')
                    },
                    title: '库存',
                    grid: true,
                    minimum: 0
                },
                {
                    type: 'Category',
                    position: 'bottom',
                    fields: ['merchandiseName'],
                    title: '商品'
                }
            ],
            series: [
                {
                    type: 'column',
                    axis: 'left',
                    highlight: true,
                    tips: {
                        trackMouse: true,
                        renderer: function (storeItem, item) {
                            this.setTitle(storeItem.get('merchandiseName') + ': ' + storeItem.get('num'));
                        }
                    },
                    label: {
                        display: 'insideEnd',
                        'text-anchor': 'middle',
                        field: 'num',
                        renderer: Ext.util.Format.numberRenderer('0'),
                        orientation: 'vertical',
                        color: '#333'
                    },
                    xField: 'merchandiseName',
                    yField: 'num'
                }
            ]
        });
        var username = logger.list[0], userId = logger.list[1], useridentity = logger.list[2];
        Ext.apply(this, {
            layout: 'border',
            items: [
                {
                    region: 'north',
                    border: false,
                    xtype: 'panel',
                    layout: 'column',
                    height: 90,
                    bodyStyle: {
                        backgroundColor: '#cbdbef'
                    },
                    margin: '0 0 5 0',
                    items: [
                        {
                            xtype: 'tbtext',
                            columnWidth: 1,
                            margin: '5 0 5 0',
                            text: '启奥实训电商后台管理系统',
                            style: {
                                color: 'blue',
                                fontSize: '30pt',
                                padding: '10 0 10 0',
                                TextAlign: 'center'
                            }
                        },
                        {
                            height: 15,
                            border: false,
                            bodyStyle: {
                                backgroundColor: '#cbdbef'
                            },
                            columnWidth: 1
                        },
                        {
                            xtype: 'panel',
                            border: false,
                            columnWidth: 1,
                            layout: 'column',
                            bodyStyle: {
                                backgroundColor: '#cbdbef'
                            }, items: [
                            {
                                columnWidth: .05,
                                xtype: 'tbtext',
                                text: '用户名：',//TODO 传session里的数据
                                style: {
                                    textAlign: 'right'
                                }
                            },
                            {
                                columnWidth: .05,
                                xtype: 'tbtext',
                                text: username,
                                border: false
                            },
                            {
                                columnWidth: .05,
                                xtype: 'tbtext',
                                text: '用户身份：',
                                style: {
                                    textAlign: 'right'
                                }
                            },
                            {
                                columnWidth: .8,
                                xtype: 'tbtext',
                                text: useridentity,
                                border: false
                            },
                            {
                                xtype: 'button',
                                text: '注销',
                                border: true,
                                columnWidth: .05,
                                border: false,
                                style: {
                                    background: '#cbdbef'
                                },
                                handler: function () {
                                    window.location = 'logout';
                                }
                            }
                        ]
                        }
                    ]
                },
                {
                    region: 'west',
                    layout: 'accordion',
                    collapsible: true,
                    split: true,
                    id: 'westID',
                    title: '菜单栏',
                    width: 200,
                    items: me.menuList
                },
                {
                    region: 'south',
                    xtype: 'toolbar',
                    height: 40,
                    MinValue: 40,
                    border: false,
                    items: ['->',
                        {

                            xtype: 'tbtext',
                            id: 'mydate',
                            style: {
                                fontSize: '20px',
                                fontWeight: 'bold',
                                color: 'silvery'
                            },
                            width: 200,
                            listeners: {
                                'render': function () {
                                    Ext.TaskManager.start({
                                        run: function () {
                                            Ext.getCmp('mydate').update('当前时间：' + Ext.util.Format.date((new Date()), 'Y-m-d H:i:s A'));
                                        },
                                        interval: 1000
                                    });
                                }
                            }

                        },
                        '->',
                        {
                            xtype: 'tbtext',
                            text: '版权所有 盗版必究',
                            style: {
                                color: 'red',
                                fontWeight: 'bold',
                                fontSize: '20px'
                            }
                        }
                    ]
                },
//               {
//                title: '用户权限',
//                region: 'east',     // position for region
//                xtype: 'panel',
//                width:300,
//                height: 100,
//                split: true         // enable resizing
//            },
                {
                    region: 'center',
                    id: 'mytabPanel',
                    xtype: 'tabpanel',
                    activeTab: 0,
                    items: [
                        {
                            closable: true,
                            title: '首页',
                            border: false,
                            layout: 'column',
                            items: [
                                {
                                    xtype: 'tbtext',
                                    columnWidth: 1,
                                    margin: '5 0 5 0',
                                    text: '欢迎使用，本管理系统',
                                    style: {
                                        color: 'blue',
                                        fontSize: '20pt',
                                        padding: '10 0 10 0',
                                        TextAlign: 'center'
                                    }
                                },
                                {
                                    columnWidth: .5,
                                    border: false,
                                    items: {
                                        width: 600,
                                        height: 600,
                                        border: false,
                                        layout: 'fit',
                                        items: chart
                                    }
                                },
                                {
                                    columnWidth: .5,
                                    border: false,
                                    items: {
                                        width: 600,
                                        height: 600,
                                        border: false,
                                        layout: 'fit',
                                        items: chart1
                                    }
                                }
                            ]
                        }
                    ]
                }
            ]
        })
        this.callParent();
    },
    menuList: new Array(),
    createMenuList: function () {
        var menuData = {}, tpl, me = this;
        tpl = new Ext.XTemplate(
            '<tpl for=".">',
            '<div class="part01" style=" width:90%; height:48px; margin-left: 10px; margin-top: 10px; margin-right: 10px;">',
            '<img style="width:48px; height:48px; float:left; margin-right: 10px;" src="{imgsrc}">',
            '<span>{title}</span>',
            '<div class="con" >',
            '<a style="margin-top: 15px;float: left ;font-size: 20px">{menuName}</a> ',
            '</div>',
            '</div>',
            '</tpl>'
        );

        Ext.Ajax.request({
            url: 'menuinfo',
            async: false,
            success: function (response) {
                menuData = Ext.JSON.decode(response.responseText);
            }
        });

        for (var i = 0, len = menuData.menulist.children.length; i < len; i++) {
            var storeID = 'store_' + i, item, title = menuData.menulist.children[i].menuinfoEntity.menuName;
            Ext.create('Ext.data.Store', {
                id: storeID,
                data: menuData.menulist.children[i].children,
                fields: [
                    {name: 'menuinfoEntity.menuId', type: 'string'}, //TODO 返回的根节点的各个字段名
                    {name: 'menuName', type: 'string', mapping: 'menuinfoEntity.menuName'},
                    {name: 'imgsrc', type: 'string', mapping: 'menuinfoEntity.img'},
//                        {name:'menuinfoByMenuId',type:'string'},
                    {name: 'url', type: 'string', mapping: 'menuinfoEntity.uRl'},
                    {name: 'sta', type: 'string', mapping: 'menuinfoEntity.sta'}
                ]
            });
            item = {
                xtype: 'panel',
                title: title,
                layout: 'fit',
                items: [
                    {
                        xtype: 'dataview',
                        store: Ext.data.StoreManager.lookup(storeID),
                        tpl: tpl,
                        itemSelector: 'div.part01',
                        listeners: {
                            itemclick: function (view, record) {
                                Ext.require(record.get('url'), function () {
                                    var center = Ext.getCmp('mytabPanel');
                                    var tab = center.items.get(record.get('sta'));
                                    if (!tab) {
                                        var obj = Ext.create(record.get('url'));
                                        center.add(obj);
                                        center.setActiveTab(obj);
                                    } else {
                                        if (center.setActiveTab() !== tab) {
                                            center.setActiveTab(obj);
                                        }
                                    }
                                }, this)
                            }
                        }
                    }
                ]
            };
            me.menuList.push(item);
        }
    }
})
