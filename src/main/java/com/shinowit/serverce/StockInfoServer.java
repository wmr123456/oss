package com.shinowit.serverce;

import com.shinowit.dao.BaseDao;
import com.shinowit.entity.InstockdetailsinfoEntity;
import com.shinowit.entity.OutstockdetailsinfoEntity;
import com.shinowit.entity.StockinfoEntity;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.util.List;

/**
 * Created by Administrator on 2014/12/1.
 */
@Service
public class StockInfoServer {
    //    @Transactional
    public boolean instockExecute(InstockdetailsinfoEntity instockD, BaseDao<StockinfoEntity> instockDDao) {
        boolean result = true;
        String id = instockD.getMerchandiseinfoByMerchandiseId().getMerchandiseId();
        List<StockinfoEntity> list = instockDDao.queryByHql("from StockinfoEntity where merchandiseinfoByMerchandiseId.merchandiseId = ?", id);
        if (list.size() == 0) {
            StockinfoEntity stockinfoEntity = new StockinfoEntity();
            stockinfoEntity.setAvgPrice(instockD.getPrice());
            stockinfoEntity.setNum(instockD.getNum());
            stockinfoEntity.setMerchandiseinfoByMerchandiseId(instockD.getMerchandiseinfoByMerchandiseId());
            instockDDao.insert(stockinfoEntity);
        } else if (list.size() == 1) {
            StockinfoEntity stockinfoEntity = (StockinfoEntity) list.get(0);
            if (stockinfoEntity.getNum() + instockD.getNum() == 0) {
                BigDecimal avgPrice = new BigDecimal(0);
                stockinfoEntity.setAvgPrice(avgPrice);
                stockinfoEntity.setNum(0);
                try {
                    instockDDao.update(stockinfoEntity);
                } catch (Exception e) {
                    e.printStackTrace();
                    result = false;
                } finally {
                    return result;
                }
            } else if (stockinfoEntity.getNum() + instockD.getNum() > 0) {
                BigDecimal oldNUm = new BigDecimal(stockinfoEntity.getNum());
                BigDecimal oldTotal = stockinfoEntity.getAvgPrice().multiply(oldNUm);
                BigDecimal newNUm = new BigDecimal(instockD.getNum());
                BigDecimal newTotal = instockD.getPrice().multiply(newNUm);
                stockinfoEntity.setAvgPrice((oldTotal.add(newTotal)).divide((oldNUm.add(newNUm)), 2));
                stockinfoEntity.setNum(stockinfoEntity.getNum() + instockD.getNum());
                try {
                    instockDDao.update(stockinfoEntity);
                } catch (Exception e) {
                    e.printStackTrace();
                    result = false;
                } finally {
                    return result;
                }
            } else {      //小于0的时候不执行
                result = false;
                return result;
            }
        } else {
            result = false;
        }
        return result;
    }

    public boolean delStockExecute(InstockdetailsinfoEntity instockD, BaseDao<StockinfoEntity> stockDao) {
        boolean result = true;
        int delStockNum = instockD.getNum();
        BigDecimal delPrice = instockD.getPrice();
        List<StockinfoEntity> stockList = stockDao.queryByHql("from StockinfoEntity where merchandiseinfoByMerchandiseId.merchandiseId = ?", instockD.getMerchandiseinfoByMerchandiseId().getMerchandiseId());
        for (int n = 0; n < stockList.size(); n++) {
            if (stockList.size() != 0 && stockList.get(n).getNum() > delStockNum) {
                StockinfoEntity stockDetaile = stockList.get(n);
                BigDecimal oldNUm = new BigDecimal(stockDetaile.getNum());
                BigDecimal oldTotal = stockDetaile.getAvgPrice().multiply(oldNUm);
                BigDecimal newNUm = new BigDecimal(delStockNum);
                BigDecimal newTotal = delPrice.multiply(newNUm);
                stockDetaile.setAvgPrice((oldTotal.subtract(newTotal)).divide((oldNUm.subtract(newNUm)), 2));
                stockDetaile.setNum(stockDetaile.getNum() - delStockNum);
                stockDao.update(stockDetaile);
            } else if (stockList.get(n).getNum() == delStockNum) {
                StockinfoEntity stockDetaile = stockList.get(n);
                stockDetaile.setAvgPrice(new BigDecimal(0.00));
                stockDetaile.setNum(0);
                stockDao.update(stockDetaile);
            } else {
                result = false;
                return result;
            }
        }
        return result;
    }

    public boolean outStackExecute(OutstockdetailsinfoEntity outstackD, BaseDao<StockinfoEntity> stockDao) {
        boolean result = true;
        List<StockinfoEntity> stockList = stockDao.queryByHql("from StockinfoEntity where merchandiseinfoByMerchandiseId.merchandiseId = ?", outstackD.getMerchandiseinfoByMerchandiseId().getMerchandiseId());
        if (stockList.size() != 1) {
            result = false;
            return result;
        } else {
            StockinfoEntity outStack = stockList.get(0);
            if (outStack.getNum() < outstackD.getNum()) {
                result = false;
                return result;
            } else {
                int outNum = outstackD.getNum();
                outStack.setNum(outStack.getNum() - outNum);
                stockDao.update(outStack);
                outstackD.setStockPrice(outStack.getAvgPrice());
            }
        }
        return result;
    }

    public boolean delOutStackExecute(OutstockdetailsinfoEntity outStackD, BaseDao<StockinfoEntity> stackDao) {
        boolean result = false;
        List<StockinfoEntity> stockList = stackDao.queryByHql("from StockinfoEntity where merchandiseinfoByMerchandiseId.merchandiseId = ?", outStackD.getMerchandiseinfoByMerchandiseId().getMerchandiseId());
        for (int n = 0; n < stockList.size(); n++) {
            int addNum = outStackD.getNum();
            StockinfoEntity stockDetaile = stockList.get(n);
            stockDetaile.setNum(stockDetaile.getNum() + addNum);
            stackDao.update(stockDetaile);
        }
        return result;
    }

    public boolean editOutStackExecute(OutstockdetailsinfoEntity outStackD, BaseDao<StockinfoEntity> stackDao) {
        boolean result = true;
        List<StockinfoEntity> merList = stackDao.queryByHql("from StockinfoEntity where merchandiseinfoByMerchandiseId.merchandiseId = ?", outStackD.getMerchandiseinfoByMerchandiseId().getMerchandiseId());
        if (merList.size() != 1) {
            result = false;
            return result;
        } else {
            StockinfoEntity stockinfoEntity = merList.get(0);
            stockinfoEntity.setNum((stockinfoEntity.getNum() + outStackD.getNum()));
            stackDao.update(stockinfoEntity);
        }
        return result;
    }
}
