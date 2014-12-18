/*
 This file is part of Ext JS 4.2

 Copyright (c) 2011-2014 Sencha Inc

 Contact:  http://www.sencha.com/contact

 Commercial Usage
 Licensees holding valid commercial licenses may use this file in accordance with the Commercial
 Software License Agreement provided with the Software or, alternatively, in accordance with the
 terms contained in a written agreement between you and Sencha.

 If you are unsure which license is appropriate for your use, please contact the sales department
 at http://www.sencha.com/contact.

 Build date: 2014-09-02 11:12:40 (ef1fa70924f51a26dacbe29644ca3f31501a5fce)
 */
/**
 * The base class that other non-interacting Toolbar Item classes should extend in order to
 * get some basic common toolbar item functionality.
 */
Ext.define('Ext.toolbar.Item', {
    extend: 'Ext.Component',
    alias: 'widget.tbitem',
    alternateClassName: 'Ext.Toolbar.Item',
    enable: Ext.emptyFn,
    disable: Ext.emptyFn,
    focus: Ext.emptyFn
    /**
     * @cfg {String} overflowText
     * Text to be used for the menu if the item is overflowed.
     */
});