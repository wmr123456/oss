package com.shinowit.serverce;

import com.shinowit.dao.BaseDao;
import com.shinowit.entity.InstockdetailsinfoEntity;
import com.shinowit.entity.InstockinfoEntity;
import com.shinowit.entity.StockinfoEntity;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

/**
 * Created by Administrator on 2014/11/28.
 */
public class InstockInsertServerce {
    public boolean result = true;
    private InstockdetailsinfoEntity details;

    @Transactional
    public boolean inertExecute(BaseDao daoInstock, BaseDao daoInstockD, BaseDao stockDDao, List insertdlist, InstockinfoEntity instock1) {
        if (insertdlist.size() > 0) {
            if (instock1 != null) {
                try {
                    daoInstock.insert(instock1);
                    for (int i = 0; i < insertdlist.size(); i++) {
                        details = (InstockdetailsinfoEntity) insertdlist.get(i);
                        details.setInstockinfoByBillCode(instock1);
                        StockInfoServer stockserver = new StockInfoServer();
                        boolean result = stockserver.instockExecute(details, stockDDao);
//                        daoInstockD.insert(details);
                        if (true) {
                            daoInstockD.insert(details);
                        } else {
                            result = false;
                            return result;
                        }
                    }
                } catch (Exception e) {
                    e.printStackTrace();
                    result = false;
                }
            }
        }
        return result;
    }

    @Transactional
    public boolean delExecute(BaseDao daoInstock, BaseDao daoInstockD, BaseDao stockDDao, String[] idArray) {
        boolean result = true;
        for (int i = 0; i < idArray.length; i++) {
            String id = idArray[i];
            List<InstockdetailsinfoEntity> instockdList = daoInstock.queryByHql("from InstockdetailsinfoEntity where instockinfoByBillCode.billCode = ?", id);
            if (instockdList.size() != 0) {
                for (int j = 0; j < instockdList.size(); j++) {
                    details = instockdList.get(j);
                    StockInfoServer stockserver = new StockInfoServer();
                    result = stockserver.delStockExecute(details, stockDDao);
                    if (result == true) {
                        try {
                            daoInstockD.delete(details);
                        } catch (Exception e) {
                            e.printStackTrace();
                            result = false;
                        }
                    }
                }
                daoInstock.executeByHql("delete from InstockinfoEntity where billCode = ?", id);
            }
        }
        return result;
    }

    //    @Transactional
    public boolean editExecute(BaseDao<InstockinfoEntity> instockDao, BaseDao<InstockdetailsinfoEntity> instockDDao, BaseDao<StockinfoEntity> stockDDao, InstockinfoEntity instock, List<InstockdetailsinfoEntity> instockDlist) {
        List<InstockdetailsinfoEntity> detaileList = instockDDao.queryByHql("from InstockdetailsinfoEntity where instockinfoByBillCode.billCode = ?", instock.getBillCode());
        for (int i = 0; i < detaileList.size(); i++) {
            StockInfoServer serverce = new StockInfoServer();
            InstockdetailsinfoEntity detaile = detaileList.get(i);
            serverce.delStockExecute(detaile, stockDDao);
        }
        boolean result = instockDDao.executeByHql("delete from InstockdetailsinfoEntity where instockinfoByBillCode.billCode = ?", instock.getBillCode());
        instockDao.executeByHql("delete from InstockinfoEntity where billCode = ?", instock.getBillCode());

        try {
            instockDao.insert(instock);
        } catch (Exception e) {
            e.printStackTrace();
        }
        for (int i = 0; i < instockDlist.size(); i++) {
            InstockdetailsinfoEntity instockdetaile = instockDlist.get(i);
            instockdetaile.setInstockinfoByBillCode(instock);
            instockDDao.insert(instockdetaile);
            StockInfoServer stockInfoServer = new StockInfoServer();
            stockInfoServer.instockExecute(instockDlist.get(i), stockDDao);
        }
        return result;
    }
}
