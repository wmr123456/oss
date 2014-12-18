package test1;
/**
 * Created by Administrator on 2014-11-06.
 */

import com.shinowit.entity.OperinfoEntity;
import com.shinowit.entity.RoleinfoEntity;
import com.shinowit.serverce.MD5;
import org.apache.log4j.Logger;
import org.hibernate.Session;
import org.hibernate.SessionFactory;
import org.hibernate.Transaction;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.test.context.ContextConfiguration;
import org.springframework.test.context.junit4.SpringJUnit4ClassRunner;
import org.springframework.test.context.transaction.TransactionConfiguration;
import org.springframework.transaction.annotation.Transactional;

import javax.annotation.Resource;
import java.util.List;


@Transactional
@TransactionConfiguration(transactionManager = "transactionManager", defaultRollback = true)
@RunWith(SpringJUnit4ClassRunner.class)
@ContextConfiguration(locations = {"classpath:application-context.xml"})
//public class Test1{
//    @Resource
//    private MenuDao menuDao;
//    private Logger logger = Logger.getLogger(getClass());
//
//    @Test
//    @Transactional
//    public void test(){
//        TreeNode node = menuDao.queryModule("");
//        System.out.print(node.getChildren().size());
//    }
//}

public class TestUuid {

    @Resource
    private SessionFactory sessionFactory;

    private Logger logger = Logger.getLogger(getClass());

    @Test
//    public void loadTree()throws Exception{
//        System.out.println(JSONUtils.JavaToJson(recursiveTree(1)));
//    }


    public void testMyDao() {
        Session session = this.sessionFactory.openSession();
        try {
            Transaction trans = session.beginTransaction();
            MD5 md5 = new MD5();
            String pass = md5.GetMD5Code("123");
            for (int i = 0; i < 100000; i++) {
                OperinfoEntity oper = new OperinfoEntity();
                RoleinfoEntity role = new RoleinfoEntity();
                int roleId = (int) (Math.random() * 6);
                role.setRoleId(String.valueOf(roleId + 1));
                oper.setRoleinfoByRoleId(role);
                oper.setOperName(String.valueOf(i));
                oper.setPassword(pass);
                oper.setAddress("当地");
                oper.setLinkTel("123");
                oper.setQq("123");
                oper.setEmail("123");
                oper.setTelphone("123");
                oper.setStatus(true);
                oper.setSortId(i);
                session.save(oper);
            }
            trans.commit();
            session.close();
//            UuidTestEntity stu=new UuidTestEntity();
//            stu.setName("李四");
//            stu.setTest("test");
//
//            session.save(stu);
//
//            trans.commit();
//
//            session.close();
//
//            logger.debug(stu.getName());
        } catch (Exception e) {
            e.printStackTrace();
        }
        try {
            org.hibernate.Query query = session.createQuery("from OperinfoEntity ");
            List<OperinfoEntity> list = query.list();
            if (list.size() != 0) {
                for (int i = 0; i < list.size(); i++) {
                    logger.error(list.get(i).getAddress() + "\t" + list.get(i).getOperName());
                }
            }
        } catch (Exception e) {

        }
    }
}

