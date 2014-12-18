/**
 * Created by Administrator on 2014-11-06.
 */
Ext.define('Login', {
    extend: 'Ext.form.Panel',
    initComponent: function () {
        var me = this;
        var cwidth = document.body.clientWidth * 0.43, cheight = window.innerWidth * 0.26;
//        alert(cheight);
        Ext.apply(this, {
            title: '登录',
            id: 'loginform',
            layout: 'form',
            frame: true,
            //badyPadding:5,
            width: 280,
            x: cwidth,
            y: cheight,
            defaults: {
                xtype: 'textfield',
                allowBlank: false,
                labelWidth: 45,
                labelAlign: 'right'
            },
            items: [
                {fieldLabel: '用户名',
                    name: 'oper.operName'
                },
                {
                    fieldLabel: '密码',
                    inputType: 'password',
                    name: 'oper.password'
                },
                {
                    xtype: 'panel',
                    layout: 'column',
                    border: false,
                    bodyStyle: {
                        backgroundColor: '#dfe9f6'
                    },
                    items: [
                        {
                            xtype: 'textfield',
                            fieldLabel: '验证码',
                            name: 'validcode',
                            id: 'validcode',
                            labelAlign: 'right',
                            labelWidth: 45,
                            allowBlank: false,
                            columnWidth: .7,
                            enableKeyEvents: true,
                            listeners: {
                                specialkey: function (field, e) {
                                    if (e.getKey() == Ext.EventObject.ENTER) {
                                        me.doLogin()
                                    }
                                }
                            }
                        },
                        {
                            xtype: 'panel',
                            border: false,
                            bodyStyle: {
                                backgroundColor: '#dfe9f6'
                            },
                            html: '&nbsp;<img id="myImg" src="jsp/validCode.jsp" style="width: 72px;height: 22px" onclick="this.src=\'jsp/validCode.jsp?r=\'+Math.random()"/>',
                            columnWidth: .3
                        }
                    ]
                }
            ],
            buttonAlign: 'center',
            buttons: [
                {text: '登录', handler: function () {
                    me.doLogin()
                }},
                {text: '重置', handler: function () {
                    this.up('form').getForm().reset()
                }}
            ]
        });
        this.callParent();
    },
    doLogin: function () {
        var form = Ext.getCmp('loginform').getForm();
        if (form.isValid()) {
            var valid = Ext.getCmp('validcode');
//          TODO   验证码校验
            form.submit({
                waitMsg: '正在进行登陆验证,请稍后...',
                url: 'mylogin',
                success: function (form, action) {
                    var msg = Ext.JSON.decode(action.response.responseText);
                    if (msg.have) {
                        window.location = 'log';
                        return;
                    }
                    Ext.MessageBox.show({
                        title: '系统提示',
                        msg: msg.message,
                        icon: Ext.MessageBox.WARNING,
                        buttons: Ext.MessageBox.YES
                    });
                    Ext.getCmp('loginform').getForm().reset();
                },
                failure: function (form, actin) {
                    Ext.MessageBox.show({
                        title: '系统提示',
                        msg: '网络原因无法正常发送请求，请联系网络管理员！',
                        icon: Ext.MessageBox.QUESTION,
                        buttons: Ext.MessageBox.YES
                    });
                }
            });
        }
    }
})
Ext.define('Demo.controller.Controller', {
    extend: 'Ext.app.Controller',
    init: function () {
        this.control({
            'viewport > form textfield[name=validcode]': {
                keypress: this.userLogin
            }
        })
    },
    userLogin: function (b, e, eOpts) {
        //e.getKey()是获取按键的号码，13代表是回车键
        if (e.getKey() == 13) {
            Ext.Msg.alert('提示', '您已经按下了回车键，可以在这里提交表单做登录操作了... ...')
        }
    }
});