package test1;

import com.shinowit.dao.BaseDao;
import com.shinowit.entity.*;
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
public class TestInstock {
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
            MD5 md5 = new MD5();
            String pass = md5.GetMD5Code("123");
            MerchandiseinfoEntity merchandiseinfoEntity = new MerchandiseinfoEntity();
            merchandiseinfoEntity.setMerchandiseId("1");
            OperinfoEntity operinfoEntity = new OperinfoEntity();
            operinfoEntity.setOperId("1");
            SupplierinfoEntity supplierinfoEntity = new SupplierinfoEntity();
            supplierinfoEntity.setSupplierId("1");
            for (int i = 0; i < 100000; i++) {
                InstockdetailsinfoEntity instockdetailsinfoEntity1 = new InstockdetailsinfoEntity();
                instockdetailsinfoEntity1.setMerchandiseinfoByMerchandiseId(merchandiseinfoEntity);
                instockdetailsinfoEntity1.setNum(100);
                instockdetailsinfoEntity1.setPrice(new BigDecimal(5));
                instockdetailsinfoEntity1.setTotal(new BigDecimal(500));
                InstockdetailsinfoEntity instockdetailsinfoEntity2 = new InstockdetailsinfoEntity();
                instockdetailsinfoEntity2.setMerchandiseinfoByMerchandiseId(merchandiseinfoEntity);
                instockdetailsinfoEntity2.setNum(100);
                instockdetailsinfoEntity2.setPrice(new BigDecimal(5));
                instockdetailsinfoEntity2.setTotal(new BigDecimal(500));
                InstockinfoEntity instockinfoEntity = new InstockinfoEntity();
                instockinfoEntity.setOperinfoByOperId(operinfoEntity);
                instockinfoEntity.setSupplierinfoBySupplierId(supplierinfoEntity);
                instockinfoEntity.setInType((byte) 1);
                SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
                instockinfoEntity.setInTime(Timestamp.valueOf(sdf.format(new Date())));
                instockinfoEntity.setHander("王茂瑞");
                instockinfoEntity.setTotalMoney(new BigDecimal(1000));
                instockinfoEntity.setRemark(String.valueOf(i));
                session.save(instockinfoEntity);
                instockdetailsinfoEntity1.setInstockinfoByBillCode(instockinfoEntity);
                instockdetailsinfoEntity2.setInstockinfoByBillCode(instockinfoEntity);
                session.save(instockdetailsinfoEntity1);
                List<StockinfoEntity> list = stockDao.queryByHql("from StockinfoEntity where merchandiseinfoByMerchandiseId.merchandiseId = ?", instockdetailsinfoEntity1.getMerchandiseinfoByMerchandiseId().getMerchandiseId());
                StockinfoEntity stock = list.get(0);
                stock.setNum(instockdetailsinfoEntity1.getNum() + stock.getNum());
                stock.setAvgPrice((stock.getAvgPrice().multiply(new BigDecimal(stock.getNum())).add(instockdetailsinfoEntity1.getPrice().multiply(new BigDecimal(instockdetailsinfoEntity1.getNum())))).divide(new BigDecimal(stock.getNum()).add(new BigDecimal(instockdetailsinfoEntity2.getNum()))));
                stockDao.update(stock);
                session.save(instockdetailsinfoEntity2);
                List<StockinfoEntity> list1 = stockDao.queryByHql("from StockinfoEntity where merchandiseinfoByMerchandiseId.merchandiseId = ?", instockdetailsinfoEntity1.getMerchandiseinfoByMerchandiseId().getMerchandiseId());
                stock = list1.get(0);
                stock.setNum(instockdetailsinfoEntity2.getNum() + stock.getNum());
                stock.setAvgPrice((stock.getAvgPrice().multiply(new BigDecimal(stock.getNum())).add(instockdetailsinfoEntity2.getPrice().multiply(new BigDecimal(instockdetailsinfoEntity2.getNum())))).divide(new BigDecimal(stock.getNum()).add(new BigDecimal(instockdetailsinfoEntity2.getNum()))));
                session.update(stock);
//                stockDao.update(stock);
            }
            trans.commit();
            session.close();
        } catch (Exception e) {
            e.printStackTrace();
        }
    }
}

