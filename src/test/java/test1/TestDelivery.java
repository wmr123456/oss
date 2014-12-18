package test1;

import com.shinowit.entity.DeliveryinfoEntity;
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

/**
 * Created by Administrator on 2014/12/15.
 */
@Transactional
@TransactionConfiguration(transactionManager = "transactionManager", defaultRollback = true)
@RunWith(SpringJUnit4ClassRunner.class)
@ContextConfiguration(locations = {"classpath:application-context.xml"})
public class TestDelivery {
    @Resource
    private SessionFactory sessionFactory;

    private Logger logger = Logger.getLogger(getClass());

    @Test
    public void testMyDao() {
        Session session = this.sessionFactory.openSession();
        try {
            Transaction trans = session.beginTransaction();
            MD5 md5 = new MD5();
            String pass = md5.GetMD5Code("123");
            for (int i = 0; i < 100000; i++) {
                DeliveryinfoEntity deliveryinfoEntity = new DeliveryinfoEntity();
                deliveryinfoEntity.setDeliveryName(String.valueOf(i));
                deliveryinfoEntity.setAddress("当地");
                deliveryinfoEntity.setLinkName("123");
                deliveryinfoEntity.setLinkTel("123");
                deliveryinfoEntity.setQq("123");
                deliveryinfoEntity.setEmail("123");
                deliveryinfoEntity.setSortId((byte) 1);
                deliveryinfoEntity.setStatus(true);
                session.save(deliveryinfoEntity);
            }
            trans.commit();
            session.close();
        } catch (Exception e) {
            e.printStackTrace();
        }
    }
}
