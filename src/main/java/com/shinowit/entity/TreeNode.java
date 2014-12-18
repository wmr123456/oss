package com.shinowit.entity;

import java.util.ArrayList;
import java.util.List;

/**
 * Created by Administrator on 2014/12/4.
 */
public class TreeNode {
    public TreeNode parent;
    private MenuinfoEntity menuinfoEntity;
    private boolean checked;
    private List<TreeNode> children = new ArrayList<TreeNode>();


    public MenuinfoEntity getMenuinfoEntity() {
        return menuinfoEntity;
    }

    public void setMenuinfoEntity(MenuinfoEntity menuinfoEntity) {
        this.menuinfoEntity = menuinfoEntity;
    }

    public List<TreeNode> getChildren() {
        return children;
    }

    public void setChildren(List<TreeNode> children) {
        this.children = children;
    }

    public void addChild(TreeNode childNode) {
        childNode.parent = this;
        children.add(childNode);
    }

    public boolean isLeaf() {
        return children.size() == 0;
    }

    public boolean isChecked() {
        return checked;
    }

    public void setChecked(boolean checked) {
        this.checked = checked;
    }
}
