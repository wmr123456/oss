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
import java.math.BigDecimal;
import java.sql.Timestamp;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.List;

/**
 * Created by Administrator on 2014/12/15.
 */
@Transactional
@TransactionConfiguration(transactionManager = "transactionManager", defaultRollback = true)
@RunWith(SpringJUnit4ClassRunner.class)
@ContextConfiguration(locations = {"classpath:application-context.xml"})
public class TestOutStack {
    @Resource
    private SessionFactory sessionFactory;
    @Resource
    private BaseDao<StockinfoEntity> entityBaseDao;

    private Logger logger = Logger.getLogger(getClass());

    @Test
    public void testMyDao() {
        Session session = this.sessionFactory.openSession();
        OperinfoEntity oper = new OperinfoEntity();
        oper.setOperId("1");
        MerchandiseinfoEntity merchandiseinfoEntity = new MerchandiseinfoEntity();
        merchandiseinfoEntity.setMerchandiseId("1");
        try {
            Transaction trans = session.beginTransaction();
            for (int i = 0; i < 100000; i++) {
                OutstockdetailsinfoEntity outstockdetailsinfoEntity = new OutstockdetailsinfoEntity();
                outstockdetailsinfoEntity.setMerchandiseinfoByMerchandiseId(merchandiseinfoEntity);
                outstockdetailsinfoEntity.setNum(200);
                outstockdetailsinfoEntity.setPrice(new BigDecimal(10));
                outstockdetailsinfoEntity.setStockPrice(new BigDecimal(5));
                outstockdetailsinfoEntity.setTotal(new BigDecimal(2000));
                OutstockinfoEntity outstockinfoEntity = new OutstockinfoEntity();
                SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
                outstockinfoEntity.setOutTime(Timestamp.valueOf(sdf.format(new Date())));
                outstockinfoEntity.setHander("王茂瑞");
                outstockinfoEntity.setTotalType((byte) 1);
                outstockinfoEntity.setTotalMoney(new BigDecimal(2000));
                outstockinfoEntity.setRemark(String.valueOf(i));
                outstockinfoEntity.setOperinfoByoperId(oper);
                session.save(outstockinfoEntity);
                outstockdetailsinfoEntity.setOutstockinfoByOutCode(outstockinfoEntity);
                session.save(outstockdetailsinfoEntity);
                List<StockinfoEntity> list = entityBaseDao.queryByHql("from StockinfoEntity where merchandiseinfoByMerchandiseId.merchandiseId = ?", outstockdetailsinfoEntity.getMerchandiseinfoByMerchandiseId().getMerchandiseId());
                StockinfoEntity stock = list.get(0);
                stock.setNum(stock.getNum() - outstockdetailsinfoEntity.getNum());
                session.update(stock);
//                entityBaseDao.update(stock);
            }
            trans.commit();
            session.close();
        } catch (Exception e) {
            e.printStackTrace();
        }
    }
}
