package com.shinowit.serverce;

import com.shinowit.dao.BaseDao;
import com.shinowit.entity.OutstockdetailsinfoEntity;
import com.shinowit.entity.OutstockinfoEntity;
import com.shinowit.entity.StockinfoEntity;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

/**
 * Created by Administrator on 2014/12/3.
 */
public class OutStackInfoActionServer {
    private OutstockdetailsinfoEntity detaile;

    @Transactional
    public boolean outStackActionServer(BaseDao<OutstockinfoEntity> outStackDao, BaseDao<OutstockdetailsinfoEntity> outStackDDao, BaseDao<StockinfoEntity> stackDao, OutstockinfoEntity outstack, List<OutstockdetailsinfoEntity> stackDList) {
        boolean result = true;
        outStackDao.insert(outstack);
        if (stackDList.size() != 0 && stackDList != null) {
            for (int i = 0; i < stackDList.size(); i++) {
                OutstockdetailsinfoEntity outStackDetaile = stackDList.get(i);
                StockInfoServer stock = new StockInfoServer();
                boolean outStackresult = stock.outStackExecute(outStackDetaile, stackDao);
                if (outStackresult) {
                    outStackDetaile.setOutstockinfoByOutCode(outstack);
                    outStackDDao.insert(outStackDetaile);
                } else {
                    result = false;
                    outStackDao.delete(outstack);
                    return result;
                }
            }
        }
        return result;
    }

    @Transactional
    public boolean delExecute(BaseDao<OutstockinfoEntity> outStackDao, BaseDao<OutstockdetailsinfoEntity> outStackDDao, BaseDao<StockinfoEntity> stockDao, String[] idArray) {
        boolean result = true;
        for (int i = 0; i < idArray.length; i++) {
            String id = idArray[i];
            List<OutstockdetailsinfoEntity> outStackList = outStackDDao.queryByHql("from OutstockdetailsinfoEntity where outstockinfoByOutCode.outCode = ?", id);
            if (outStackList.size() != 0) {
                for (int j = 0; j < outStackList.size(); j++) {
                    detaile = outStackList.get(j);
                    StockInfoServer stockserver = new StockInfoServer();
                    result = stockserver.delOutStackExecute(detaile, stockDao);
                    outStackDDao.delete(detaile);

                }
                outStackDao.executeByHql("delete from OutstockinfoEntity where outCode = ?", id);
            }

        }
        return result;
    }

    public boolean outStackEditExecute(BaseDao<OutstockinfoEntity> outStackDao, BaseDao<OutstockdetailsinfoEntity> outStackDDao, BaseDao<StockinfoEntity> stockDao, OutstockinfoEntity outStack, List<OutstockdetailsinfoEntity> outstockdetailsinfoEntityList) {
        boolean result = true;
        boolean consequence = false;
        List<OutstockdetailsinfoEntity> outDetaileList = outStackDDao.queryByHql("from OutstockdetailsinfoEntity where outstockinfoByOutCode.outCode = ?", outStack.getOutCode());
        if (outDetaileList.size() != 1) {
            result = false;
            return result;
        } else {
            for (int i = 0; i < outDetaileList.size(); i++) {
                OutstockdetailsinfoEntity outstockdetailsinfoEntity = outDetaileList.get(i);
                StockInfoServer stockInfoServer = new StockInfoServer();
                consequence = stockInfoServer.editOutStackExecute(outstockdetailsinfoEntity, stockDao);
            }
            if (consequence) {
                consequence = outStackDDao.executeByHql("delete from OutstockdetailsinfoEntity where outstockinfoByOutCode.outCode = ?", outStack.getOutCode());
                if (consequence) {
                    outStackDao.executeByHql("delete from OutstockinfoEntity where outCode = ?", outStack.getOutCode());
                    outStackDao.insert(outStack);
                    for (int j = 0; j < outstockdetailsinfoEntityList.size(); j++) {
                        OutstockdetailsinfoEntity outstockdetailsinfoEntity = outstockdetailsinfoEntityList.get(j);
                        outstockdetailsinfoEntity.setOutstockinfoByOutCode(outStack);
                        List<StockinfoEntity> stockList = stockDao.queryByHql("from StockinfoEntity where merchandiseinfoByMerchandiseId.merchandiseId = ?", outstockdetailsinfoEntity.getMerchandiseinfoByMerchandiseId().getMerchandiseId());
                        outstockdetailsinfoEntity.setStockPrice(stockList.get(0).getAvgPrice());
                        outStackDDao.insert(outstockdetailsinfoEntity);
                        StockInfoServer stockInfoServer = new StockInfoServer();
                        stockInfoServer.outStackExecute(outstockdetailsinfoEntity, stockDao);
                    }
                }
            }
        }
        return result;
    }
}
