package com.coinnolja.web.api.common.model;

public class Paging {

    private Integer pageIndex = 1;
    private int totalCnt = 0;
    private int pagePerUnit = 10;
    private int pageSize = 20;
    private int totalPageUnit;
    private int firstIndex;
    private long lastIndex = 0;
    private long initIndex = 0;
    private long finalIndex = 0;
    private String searchKey;
    private String searchVal;
    private String sortKey;
    private String sortVal;
    private String sort1;
    private String sort2;
    private String sort3;
    private String sort4;
    private String sort5;
    private int categoryId;

    public int getPageIndex() {
        return pageIndex;
    }

    public void setPageIndex(Integer pageIndex) {
        if (pageIndex == null || "".equals(pageIndex)) {
            pageIndex = 1;
        }
        this.pageIndex = pageIndex;
    }

    public long getTotalCnt() {
        return totalCnt;
    }

    public void setTotalCnt(int totalCnt) {
        this.totalCnt = totalCnt;
    }

    public int getPagePerUnit() {
        return pagePerUnit;
    }

    public void setPagePerUnit(int pagePerUnit) {
        this.pagePerUnit = pagePerUnit;
    }

    public int getPageSize() {
        return pageSize;
    }

    public void setPageSize(int pageSize) {
        this.pageSize = pageSize;
    }

    public long getTotalPageUnit() {
        if (this.totalCnt > 0) {
            this.totalPageUnit = this.totalCnt / this.pageSize + (this.totalCnt % this.pageSize > 0 ? 1 : 0);
        } else {
            totalPageUnit = 1;
        }
        return totalPageUnit;
    }

    public void setTotalPageUnit(int totalPageUnit) {
        this.totalPageUnit = totalPageUnit;
    }

    public void setFirstIndex(int firstIndex) {
        this.firstIndex = firstIndex;
    }

    public int getFirstIndex() {
        if(this.lastIndex < 1){
            firstIndex = (this.pageIndex - 1) * this.pageSize;
        }
        return firstIndex;
    }

    public long getLastIndex() { return lastIndex; }

    public void setLastIndex(long lastIndex) { this.lastIndex = lastIndex; }

    public long getInitIndex() { return initIndex; }

    public void setInitIndex(long initIndex) {this.initIndex = initIndex; }

    public long getFinalIndex() { return finalIndex; }

    public void setFinalIndex(long finalIndex) {this.finalIndex = finalIndex; }

    public String getSearchKey() { return searchKey; }

    public void setSearchKey(String searchKey) {
        this.searchKey = searchKey;
    }

    public String getSearchVal() {
        return searchVal;
    }

    public void setSearchVal(String searchVal) {
        this.searchVal = searchVal;
    }

    public String getSortKey() {
        return sortKey;
    }

    public void setSortKey(String sortKey) {
        this.sortKey = sortKey;
    }

    public String getSortVal() {
        return sortVal;
    }

    public void setSortVal(String sortVal) {
        this.sortVal = sortVal;
    }

    public String getSort1() {
        return sort1;
    }

    public void setSort1(String sort1) {
        this.sort1 = sort1;
    }

    public String getSort2() {
        return sort2;
    }

    public void setSort2(String sort2) {
        this.sort2 = sort2;
    }

    public String getSort3() {
        return sort3;
    }

    public void setSort3(String sort3) {
        this.sort3 = sort3;
    }

    public String getSort4() {
        return sort4;
    }

    public void setSort4(String sort4) {
        this.sort4 = sort4;
    }

    public String getSort5() {
        return sort5;
    }

    public void setSort5(String sort5) {
        this.sort5 = sort5;
    }

    public int getCategoryId() {
        return categoryId;
    }

    public void setCategoryId(int categoryId) {
        this.categoryId = categoryId;
    }

    @Override
    public String toString() {
        return "Paging{" +
                "pageIndex=" + pageIndex +
                ", totalCnt=" + totalCnt +
                ", pagePerUnit=" + pagePerUnit +
                ", pageSize=" + pageSize +
                ", totalPageUnit=" + totalPageUnit +
                ", firstIndex=" + firstIndex +
                ", lastIndex=" + lastIndex +
                ", initIndex=" + initIndex +
                ", searchKey='" + searchKey + '\'' +
                ", searchVal='" + searchVal + '\'' +
                ", sortKey='" + sortKey + '\'' +
                ", sortVal='" + sortVal + '\'' +
                ", sort1='" + sort1 + '\'' +
                ", sort2='" + sort2 + '\'' +
                ", sort3='" + sort3 + '\'' +
                ", sort4='" + sort4 + '\'' +
                ", sort5='" + sort5 + '\'' +
                '}';
    }
}
