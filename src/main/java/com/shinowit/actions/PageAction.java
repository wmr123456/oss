package com.shinowit.actions;

import com.opensymphony.xwork2.ActionSupport;
import com.shinowit.dao.BaseDao;
import com.shinowit.entity.*;
import com.shinowit.serverce.CharSet;

import javax.annotation.Resource;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;


/**
 * Created by Administrator on 2014/11/17.
 */
public class PageAction extends ActionSupport {
    private List<ProstatusinfoEntity> prostatuslist;
    @Resource
    private BaseDao<ProstatusinfoEntity> prostatusDao;

    private List<SupplierinfoEntity> supplierlist;
    @Resource
    private BaseDao<SupplierinfoEntity> daosupplier;

    private List<LoginfoEntity> logList;
    @Resource
    private BaseDao<LoginfoEntity> loginfoDao;

    private List<DeliveryinfoEntity> delierylist;
    @Resource
    private BaseDao<DeliveryinfoEntity> delieryDao;

    private List<MerchandisecinfoEntity> goodsClasslist;
    @Resource
    private BaseDao<MerchandisecinfoEntity> goodsClassDao;

    private List<MerchandiseinfoEntity> merchandiseinfolist;
    @Resource
    private BaseDao<MerchandiseinfoEntity> merchandiseinfoDao;

    private List<UnitinfoEntity> unitlist;
    @Resource
    private BaseDao<UnitinfoEntity> unitDao;

    private List<OrderdetailsinfoEntity> orderDlist;
    @Resource
    private BaseDao<OrderdetailsinfoEntity> orderDDao;

    private List<InstockinfoEntity> instockList;
    @Resource
    private BaseDao<InstockinfoEntity> instockDao;

    private List<InstockdetailsinfoEntity> indetaileInfoList;
    @Resource
    private BaseDao<InstockdetailsinfoEntity> indetaileDao;

    private List<StockinfoEntity> stockList;
    @Resource
    private BaseDao<StockinfoEntity> stockDao;

    private List<OutstockinfoEntity> outStackList;
    @Resource
    private BaseDao<OutstockinfoEntity> outSDao;

    private List<OutstockdetailsinfoEntity> outStackDList;
    @Resource
    private BaseDao<OutstockdetailsinfoEntity> outStackDDao;

    private List<OperinfoEntity> operList;
    @Resource
    private BaseDao<OperinfoEntity> operDao;

    private List<RoleinfoEntity> roleList;
    @Resource
    private BaseDao<RoleinfoEntity> roleDao;

    private List<AuthorizationEntity> authorizationList;
    @Resource
    private BaseDao<AuthorizationEntity> authoriDao;

    private int rows;
    private int count;
    private int limit;
    private int page;
    private String param1;
    private String param2;
    private String param3;
    private String param4;
    private String param5;
    private String param6;
    private Date param7;
    private Date param8;
    private String timeName;
    private Integer startPrice;
    private Integer endPrice;

    public String getParam1() {
        return param1;
    }

    public void setParam1(String param1) {
        this.param1 = param1;
    }

    public String getParam2() {
        return param2;
    }

    public void setParam2(String param2) {
        this.param2 = param2;
    }

    public String getParam4() {
        return param4;
    }

    public void setParam4(String param4) {
        this.param4 = param4;
    }

    public String getParam3() {
        return param3;
    }

    public void setParam3(String param3) {
        this.param3 = param3;
    }

    public String getParam5() {
        return param5;
    }

    public void setParam5(String param5) {
        this.param5 = param5;
    }

    public String getParam6() {
        return param6;
    }

    public void setParam6(String param6) {
        this.param6 = param6;
    }

    public Date getParam7() {
        return param7;
    }

    public void setParam7(Date param7) {
        this.param7 = param7;
    }

    public Date getParam8() {
        return param8;
    }

    public void setParam8(Date param8) {
        this.param8 = param8;
    }

    public Integer getStartPrice() {
        return startPrice;
    }

    public void setStartPrice(Integer startPrice) {
        this.startPrice = startPrice;
    }

    public Integer getEndPrice() {
        return endPrice;
    }

    public void setEndPrice(Integer endPrice) {
        this.endPrice = endPrice;
    }

    public int getPage() {
        return page;
    }

    public void setPage(int page) {
        this.page = page;
    }

    public int getLimit() {
        return limit;
    }

    public void setLimit(int limit) {
        this.limit = limit;
    }

    public int getRows() {
        return rows;
    }

    public void setRows(int rows) {
        this.rows = rows;
    }

    public int getCount() {
        return count;
    }

    public void setCount(int count) {
        this.count = count;
    }

    public List<AuthorizationEntity> getAuthorizationList() {
        return authorizationList;
    }

    public void setAuthorizationList(List<AuthorizationEntity> authorizationList) {
        this.authorizationList = authorizationList;
    }

    public List<RoleinfoEntity> getRoleList() {
        return roleList;
    }

    public void setRoleList(List<RoleinfoEntity> roleList) {
        this.roleList = roleList;
    }

    public List<OperinfoEntity> getOperList() {
        return operList;
    }

    public void setOperList(List<OperinfoEntity> operList) {
        this.operList = operList;
    }

    public List<OutstockdetailsinfoEntity> getOutStackDList() {
        return outStackDList;
    }

    public void setOutStackDList(List<OutstockdetailsinfoEntity> outStackDList) {
        this.outStackDList = outStackDList;
    }

    public List<OutstockinfoEntity> getOutStackList() {
        return outStackList;
    }

    public void setOutStackList(List<OutstockinfoEntity> outStackList) {
        this.outStackList = outStackList;
    }

    public List<StockinfoEntity> getStockList() {
        return stockList;
    }

    public void setStockList(List<StockinfoEntity> stockList) {
        this.stockList = stockList;
    }

    public List<InstockdetailsinfoEntity> getIndetaileInfoList() {
        return indetaileInfoList;
    }

    public void setIndetaileInfoList(List<InstockdetailsinfoEntity> indetaileInfoList) {
        this.indetaileInfoList = indetaileInfoList;
    }

    public List<MerchandiseinfoEntity> getMerchandiseinfolist() {
        return merchandiseinfolist;
    }

    public void setMerchandiseinfolist(List<MerchandiseinfoEntity> merchandiseinfolist) {
        this.merchandiseinfolist = merchandiseinfolist;
    }

    public List<OrderdetailsinfoEntity> getOrderDlist() {
        return orderDlist;
    }

    public void setOrderDlist(List<OrderdetailsinfoEntity> orderDlist) {
        this.orderDlist = orderDlist;
    }

    public List<UnitinfoEntity> getUnitlist() {
        return unitlist;
    }

    public void setUnitlist(List<UnitinfoEntity> unitlist) {
        this.unitlist = unitlist;
    }

    public List<MerchandisecinfoEntity> getGoodsClasslist() {
        return goodsClasslist;
    }

    public void setGoodsClasslist(List<MerchandisecinfoEntity> goodsClasslist) {
        this.goodsClasslist = goodsClasslist;
    }

    public List<DeliveryinfoEntity> getDelierylist() {
        return delierylist;
    }

    public void setDelierylist(List<DeliveryinfoEntity> delierylist) {
        this.delierylist = delierylist;
    }

    public List<LoginfoEntity> getLogList() {
        return logList;
    }

    public void setLogList(List<LoginfoEntity> logList) {
        this.logList = logList;
    }

    public List<SupplierinfoEntity> getSupplierlist() {
        return supplierlist;
    }

    public void setSupplierlist(List<SupplierinfoEntity> supplierlist) {
        this.supplierlist = supplierlist;
    }

    public List<ProstatusinfoEntity> getProstatuslist() {
        return prostatuslist;
    }

    public void setProstatuslist(List<ProstatusinfoEntity> prostatuslist) {
        this.prostatuslist = prostatuslist;
    }

    public List<InstockinfoEntity> getInstockList() {
        return instockList;
    }

    public void setInstockList(List<InstockinfoEntity> instockList) {
        this.instockList = instockList;
    }

    public String executeSupplier() {
        String hqlNum = "select count(*) from SupplierinfoEntity where 1 =1";
        String hql = "from SupplierinfoEntity where 1 = 1";
        String timename = "";
        List<Object> list = hqlparam(daosupplier, hqlNum, hql, param1, param2, param3, param4, param5, param6, param7, param8, timename);
        rows = (Integer) list.get(0);
        supplierlist = (List) list.get(1);
        return SUCCESS;
    }

    public String executeProStutus() {
        String hqlNum = "select count(*) from ProstatusinfoEntity where 1 = 1";
        String hql = "from ProstatusinfoEntity where 1 = 1";
        String timename = "";
        List<Object> list = hqlparam(prostatusDao, hqlNum, hql, param1, param2, param3, param4, param5, param6, param7, param8, timename);
        rows = (Integer) list.get(0);
        prostatuslist = (List) list.get(1);
        return SUCCESS;
    }

    public String loginfoExecute() {
        String hqlNum = "select count(*) from LoginfoEntity where 1 = 1";
        String hql = "from LoginfoEntity where 1 = 1";
        String timename = "logTime";
        List<Object> list = hqlparam(loginfoDao, hqlNum, hql, param1, param2, param3, param4, param5, param6, param7, param8, timename);
        rows = (Integer) list.get(0);
        logList = (List) list.get(1);
        return SUCCESS;
    }

    public String deliveryExecute() {
        String hqlNum = "select count(*) from DeliveryinfoEntity where 1=1";
        String hql = "from DeliveryinfoEntity where 1= 1";
        List<Object> listparam = new ArrayList<Object>();
        if (param1 != null && param1.trim().length() > 0) {
            if (param2 != null && param2.trim().length() > 0) {
                CharSet char1 = new CharSet();
                param2 = char1.charSet(param2);
                String param = "%";
                param += param2;
                param2 = param + "%";
                listparam.add(param2);
                hqlNum += " and " + param1 + " like ? ";
                hql += " and " + param1 + " like ?";
            }
        }
        if (param3 != null && param3.trim().length() > 0) {
            if (param4 != null && param4.trim().length() > 0) {
                CharSet char1 = new CharSet();
                param4 = char1.charSet(param4);
                String param = "%";
                param += param4;
                param4 = param + "%";
                listparam.add(param4);
                hqlNum += " and " + param3 + " like ? ";
                hql += " and " + param3 + " like ?";
            }
        }
        if (param5 != null && param5.trim().length() > 0) {
            if (param6 != null && param6.trim().length() > 0) {
                CharSet char1 = new CharSet();
                param6 = char1.charSet(param6);
                String param = "%";
                param += param6;
                param6 = param + "%";
                listparam.add(param6);
                hqlNum += " and " + param5 + " like ? ";
                hql += " and " + param5 + " like ?";
            }
        }
        if (listparam != null && listparam.size() > 0) {
            Object[] obj = listparam.toArray();
            rows = delieryDao.queryRecordCount(hqlNum, obj);
            delierylist = delieryDao.queryForPage(hql, page, limit, obj);
        } else {
            rows = delieryDao.queryRecordCount(hqlNum);
            delierylist = delieryDao.queryForPage(hql, page, limit);
        }
        return SUCCESS;
    }

    public String goodsClassExecute() {  //TODO 差状态查询没写
        String hqlNum = "select count(*) from MerchandisecinfoEntity where 1 = 1";
        String hql = "from MerchandisecinfoEntity where 1 = 1";
        String timename = "";
        List<Object> list = hqlparam(goodsClassDao, hqlNum, hql, param1, param2, param3, param4, param5, param6, param7, param8, timename);
        count = (Integer) list.get(0);
        goodsClasslist = (List) list.get(1);
        return SUCCESS;
    }

    public String merchandiseinfoExecute() {
        String hqlNum = "select count(*) from MerchandiseinfoEntity where 1 = 1";
        String hql = "from MerchandiseinfoEntity where 1 = 1";
        String timebname = "";
        if (startPrice != null && endPrice != null) {
            hqlNum += "and price between " + startPrice + " and " + endPrice;
            hql += "and price between " + startPrice + " and " + endPrice;
        }
        List<Object> list = hqlparam(merchandiseinfoDao, hqlNum, hql, param1, param2, param3, param4, param5, param6, param7, param8, timebname);
        count = (Integer) list.get(0);
        merchandiseinfolist = (List) list.get(1);
        return SUCCESS;
    }

    public String unitInfoExecute() {
        rows = unitDao.queryRecordCount("select count(*) from UnitinfoEntity where 1 = 1");
        unitlist = unitDao.queryForPage("from UnitinfoEntity where 1 = 1", page, limit);
        return SUCCESS;
    }

    public String orderDetaileInfoExecute() {
        String hqlNum = "select count(*) from OrderdetailsinfoEntity where 1 = 1 ";
        String hql = "from OrderdetailsinfoEntity where 1 = 1";
        String timename = "";
        List<Object> list = hqlparam(instockDao, hqlNum, hql, param1, param2, param3, param4, param5, param6, param7, param8, timename);
        rows = (Integer) list.get(0);
        orderDlist = (List) list.get(1);
        return SUCCESS;
    }

    public String instockinfoExecute() {
        String hqlNum = "select count(*) from InstockinfoEntity where 1 = 1 ";
        String hql = "from InstockinfoEntity where 1 = 1";
        String timename = "";
        List<Object> list = hqlparam(orderDDao, hqlNum, hql, param1, param2, param3, param4, param5, param6, param7, param8, timename);
        rows = (Integer) list.get(0);
//        instockList = (List)list.get(1);
        setInstockList((List) list.get(1));
        return SUCCESS;
    }

    public String instockdetailteExecute() {
//        String hqlNum = "select count(*) from InstockdetailsinfoEntity where instockinfoByBillCode instockinfoByBillCode.billCode = ";
        String hql = "from InstockdetailsinfoEntity where instockinfoByBillCode.billCode = ? ";
        indetaileInfoList = indetaileDao.queryByHql(hql, param1);
        count = indetaileInfoList.size();
        return SUCCESS;
    }

    public String stockinfoExecute() {
        String hqlNum = "select count(*) from StockinfoEntity where 1 = 1";
        String hql = "from StockinfoEntity where 1 = 1";
        String timename = "";
        List<Object> list = hqlparam(stockDao, hqlNum, hql, param1, param2, param3, param4, param5, param6, param7, param8, timename);
        rows = (Integer) list.get(0);
        setStockList((List) list.get(1));
        return SUCCESS;
    }

    public String outStackExecute() {
        String hqlNum = "select count(*) from OutstockinfoEntity where 1 = 1";
        String hql = "from OutstockinfoEntity where 1 = 1";
        String timename = "";
        List<Object> list = hqlparam(outSDao, hqlNum, hql, param1, param2, param3, param4, param5, param6, param7, param8, timename);
        rows = (Integer) list.get(0);
        setOutStackList((List) list.get(1));
        return SUCCESS;
    }

    public String outStackdetaileExecute() {
        String hql = "from OutstockdetailsinfoEntity where outstockinfoByOutCode.outCode = ?";
        outStackDList = outStackDDao.queryByHql(hql, param1);
        return SUCCESS;
    }

    public String operinfoExecute() {
        String hqlNum = "select count(*) from OperinfoEntity where 1 = 1";
        String hql = "from OperinfoEntity where 1 = 1";
        String timename = "";
        List<Object> list = hqlparam(operDao, hqlNum, hql, param1, param2, param3, param4, param5, param6, param7, param8, timename);
        rows = (Integer) list.get(0);
        operList = (List) list.get(1);
        return SUCCESS;
    }

    public String roleinfoExecute() {
        String hql = "from RoleinfoEntity where 1 = 1";
        roleList = roleDao.queryByHql(hql);
        return SUCCESS;
    }

    public String authorizationExecute() {
        String hql = "from AuthorizationEntity where 1 = 1 and ";
        if (param1 != null && param1.trim().length() > 0) {
            hql += "and roleId = ?";
            authorizationList = authoriDao.queryByHql(hql, param1);
            rows = authoriDao.listAll(AuthorizationEntity.class).size();
        } else {
            authorizationList = authoriDao.queryForPage(hql, page, limit);
            rows = authoriDao.listAll(AuthorizationEntity.class).size();
        }
        return SUCCESS;
    }

    public List<Object> hqlparam(BaseDao dao, String hqlNum, String hql, String param1, String param2, String param3, String param4, String param5, String param6, Date param7, Date param8, String timename) {
        List<Object> listparam = new ArrayList<Object>();
        List datalist = new ArrayList();
        int num = 0;
        List<Object> list = new ArrayList<Object>();
        if (param1 != null && param1.trim().length() > 0) {
            if (param2 != null && param2.trim().length() > 0) {
                CharSet char1 = new CharSet();
                param2 = char1.charSet(param2);
                String param = "%";
                param += param2;
                param2 = param + "%";
                listparam.add(param2);
                hqlNum += " and " + param1 + " like ? ";
                hql += " and " + param1 + " like ?";
            }
        }
        if (param3 != null && param3.trim().length() > 0) {
            if (param4 != null && param4.trim().length() > 0) {
                CharSet char1 = new CharSet();
                param4 = char1.charSet(param4);
                String param = "%";
                param += param4;
                param4 = param + "%";
                listparam.add(param4);
                hqlNum += " and " + param3 + " like ? ";
                hql += " and " + param3 + " like ?";
            }
        }
        if (param5 != null && param5.trim().length() > 0) {
            if (param6 != null && param6.trim().length() > 0) {
                CharSet char1 = new CharSet();
                param6 = char1.charSet(param6);
                String param = "%";
                param += param6;
                param6 = param + "%";
                listparam.add(param6);
                hqlNum += " and " + param5 + " like ? ";
                hql += " and " + param5 + " like ?";
            }
        }
        if (param7 != null && param8 != null) {
            hqlNum += " and " + timename + " between ? and ?";
            hql += " and " + timename + " between ? and ?";
            listparam.add(param7);
            listparam.add(param8);
        }
        if (listparam != null && listparam.size() > 0) {
            Object[] obj = listparam.toArray();
            num = dao.queryRecordCount(hqlNum, obj);
            datalist = dao.queryForPage(hql, page, limit, obj);
        } else {
            num = dao.queryRecordCount(hqlNum);
            datalist = dao.queryForPage(hql, page, limit);
        }
        list.add(num);
        list.add(datalist);
        return list;
    }
}
