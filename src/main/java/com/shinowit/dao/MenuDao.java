package com.shinowit.dao;

import com.shinowit.entity.MenuinfoEntity;
import com.shinowit.entity.TreeNode;
import org.hibernate.Query;
import org.hibernate.Session;
import org.hibernate.SessionFactory;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import javax.annotation.Resource;
import java.util.List;

/**
 * Created by Administrator on 2014/12/4.
 */
@Repository
public class MenuDao {
    @Resource
    private SessionFactory sessionFactory;

    private void querySubModule(TreeNode parentNode, String roleId) {
        Session session = sessionFactory.openSession();
        String sql = "select distinct c.* from roleinfo a inner join authorization b on a.RoleID = b.RoleID  inner join menuinfo c on b.MenuID = c.MenuID where a.RoleID = ? and c.PmenuID = ?";
        Query query = session.createSQLQuery(sql).addEntity(MenuinfoEntity.class);
        query.setParameter(0, roleId);
        query.setParameter(1, parentNode.getMenuinfoEntity().getMenuId());
        List<MenuinfoEntity> moduleList = query.list();
        session.close();
        for (MenuinfoEntity module : moduleList) {
            TreeNode node = new TreeNode();
            node.setMenuinfoEntity(module);
            parentNode.addChild(node);
            querySubModule(node, roleId);
        }
    }

    @Transactional
    public TreeNode queryModule(String roleId) {
        TreeNode result = new TreeNode();
        Session session = sessionFactory.openSession();
        String sql = "SELECT distinct  c.* from roleinfo a INNER JOIN authorization b on a.RoleID = b.RoleID INNER JOIN menuinfo c ON c.MenuID = b.MenuID where  a.RoleID = ? and PmenuID is null ";
        try {
            Query query = session.createSQLQuery(sql).addEntity(MenuinfoEntity.class);
            query.setParameter(0, roleId);
            List<MenuinfoEntity> menuinfoEntities = query.list();
            session.close();
            for (MenuinfoEntity menuinfoEntity : menuinfoEntities) {
                TreeNode node = new TreeNode();
                node.setMenuinfoEntity(menuinfoEntity);
                result.addChild(node);
                querySubModule(node, roleId);
            }
        } catch (Exception e) {
            e.printStackTrace();
        }
        return result;
    }

    public TreeNode queryMenu() {
        TreeNode result = new TreeNode();
        Session session = sessionFactory.openSession();
        String sql = "select * from menuinfo where PmenuID is null";
        try {
            Query query = session.createSQLQuery(sql).addEntity(MenuinfoEntity.class);
            List<MenuinfoEntity> menuinfoEntities = query.list();
            session.close();
            for (MenuinfoEntity menuinfoEntity : menuinfoEntities) {
                TreeNode node = new TreeNode();
                node.setMenuinfoEntity(menuinfoEntity);
                result.addChild(node);
                querySubMenu(node);
            }
        } catch (Exception e) {
            e.printStackTrace();
        }
        return result;
    }

    public void querySubMenu(TreeNode parentNode) {
        Session session = sessionFactory.openSession();
        String sql = "select * from menuinfo where PmenuID = ?";
        Query query = session.createSQLQuery(sql).addEntity(MenuinfoEntity.class);
        query.setParameter(0, parentNode.getMenuinfoEntity().getMenuId());
        List<MenuinfoEntity> moduleList = query.list();
        session.close();
        for (MenuinfoEntity module : moduleList) {
            TreeNode node = new TreeNode();
            node.setMenuinfoEntity(module);
            parentNode.addChild(node);
            querySubMenu(node);
        }
    }
}
