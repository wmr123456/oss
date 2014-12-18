package test1;

import com.shinowit.dao.BaseDao;
import com.shinowit.entity.*;
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
public class TestMerchan {
    @Resource
    private SessionFactory sessionFactory;

    @Resource
    private BaseDao<StockinfoEntity> stockDao;

    private Logger logger = Logger.getLogger(getClass());

    @Test
    public void testMyDao() {
        Session session = this.sessionFactory.openSession();
        try {
            Transaction trans = session.beginTransaction();
            MerchandisecinfoEntity mer = new MerchandisecinfoEntity();
            UnitinfoEntity unit = new UnitinfoEntity();
            unit.setUnitInfoId((byte) 1);
            ProstatusinfoEntity prostatusinfoEntity = new ProstatusinfoEntity();
            prostatusinfoEntity.setProStatusId("1");
            mer.setMerchandiseCid("1");
            for (int i = 0; i < 100000; i++) {
                MerchandiseinfoEntity merchandiseinfoEntity = new MerchandiseinfoEntity();
                merchandiseinfoEntity.setMerchandisecinfoByMerchandiseCid(mer);
                merchandiseinfoEntity.setUnitinfoByUnitInfoId(unit);
                merchandiseinfoEntity.setMerchandiseName(String.valueOf(i));
                merchandiseinfoEntity.setMerchandiseAb(String.valueOf(i));
                merchandiseinfoEntity.setSaleStatus(true);
                merchandiseinfoEntity.setSpec(String.valueOf(i));
                merchandiseinfoEntity.setDescri(String.valueOf(i));
                merchandiseinfoEntity.setRemark("1");
                merchandiseinfoEntity.setProstatusinfoByProStatusId(prostatusinfoEntity);
                session.save(merchandiseinfoEntity);
            }
            trans.commit();
            session.close();
        } catch (Exception e) {
            e.printStackTrace();
        }
    }
}
