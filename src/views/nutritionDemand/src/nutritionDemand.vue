<template>
  <div class="nutritionDemand">
    <baseSearch :searchData="searchData" :modelSearch="modelSearch" :searchWidth="searchWidth" />
    <baseTable
            :topButtonList="topButtonList"
            :tableHeaders="tableHeaders"
            :tableData="tableData"
            :total="total"
            @sizeChange="handlesizeChange"
            @pageChange="handlepageChange"
    />
    <baseModal
            :formRef="formRef"
            :title="modalTitle"
            :dialogVisible="dialogVisible"
            :addData="addData"
            :addModalData="addModalData"
            :addCustomData="addCustomData"
            :materialNameList="materialNameList"
            :isCustomAdd="isCustomAdd"
            :isRules="isRules"
            @addModalData="handleAddModalData"
            @cancelModalData="handleCancelModalData"
            @handleAddCustomDataList="handleAddCustomDataList"
            @reduceAddCustomDataList="reduceAddCustomDataList"
            @onValueChange="onValueChange"
    />
    <showDetail
            :tableHeaders="detailHeaders"
            :tableData="detailTableData"
            :total="detailTotal"
            :title="detailTitle"
            :dialogVisible="isShowDetail"
            @sizeChange="handleDetailSizeChange"
            @pageChange="handleDetailPageChange"
            @handleCancelChange="handleDetailChange"
    />

  </div>
</template>

<script>
import baseSearch from "@/components/baseSearch";
import baseTable from "@/components/baseTable";
import baseModal from "./baseModal";
import showDetail from "./showDetail"
import { nutritionalNeedAPI } from "@/api/nutritionNeed";
import { materialAPI } from "@/api/material";
import { reNull } from "@/utils/common.js";
export default {
    name: "nutritionDemand",
    components: {
        baseSearch,
        baseTable,
        baseModal,
        showDetail
    },
    data(){
        return{
            searchData: [
                {
                    label: "营养需求",
                    type: "input",
                    prop: "name"
                },
                {
                    label: "查询",
                    type: "button",
                    icon: "", // 前缀图标
                    handleClick: this.handleQueryClick //处理函数
                },
                {
                    label: "清除",
                    type: "button",
                    icon: "",
                    handleClick: this.handleRefreshClick
                }
            ],
            tableHeaders: [
                {
                    label: "营养需求名",
                    prop: "name",
                    align: "center"
                },
                {
                    label: "营养成分",
                    prop: "nutritionalNames",
                    align: "center"
                },
                {
                    label: "描述",
                    prop: "remark",
                    align: "center"
                },

                {
                    label: "操作",
                    align: "center",
                    buttonList: [
                        {
                            name: "编辑",
                            handleClick: this.handleEditClick
                        },
                        {
                            name: "删除",
                            handleClick: this.handleDelClick
                        },
                        {
                            name: "详情",
                            handleClick: this.handleDetailClick
                        }
                    ]
                }
            ],
            tableData: [],
            topButtonList: [
                {
                    name: "新增",
                    handleClick: this.handleAddClick
                }
            ],
            modelSearch: {},
            total: 0, //数据总条数
            searchWidth: 360,

            modalTitle: "新增营养需求",
            dialogVisible: false,
            addData: [
                {
                    label: "营养需求id",
                    type: "input",
                    prop: "id",
                    hidden: true,
                    message: "必填项不能为空"
                },
                {
                    label: "营养需求",
                    type: "input",
                    prop: "name",
                    placeholder: "请输入营养需求名",
                    inRule: true,
                    message: "必填项不能为空"
                },
                {
                    label: "描述",
                    type: "inputTextarea",
                    prop: "remark",
                    placeholder: "请输入描述"
                }
            ],
            addModalData: {},
            isCustomAdd: true,
            addCustomData: [],
            materialNameList: [],
            currentPage: 1,
            pageSize: 10,

            isRules: true,
            formRef: "baseForm",

            isShowDetail: false,
            detailTitle: "详情",
            detailHeaders:[
                {
                    label: "菜品名称",
                    prop: "foodName",
                    align: "center"
                },
                {
                    label: "需求克重",
                    prop: "needWeight",
                    align: "center"
                }
            ],
            detailTotal: 0,
            detailTableData:[],
            detailCurrentPage: 1,
            detailPageSize: 10,
        }
    },
    methods: {
        handleQueryClick() {
            console.log("查询");
            this.getList();
        },
        handleRefreshClick() {
            console.log("清除");
            this.modelSearch = {}
        },
        handleAddClick() {
            let _this = this;
            this.modalTitle = "新增营养需求";
            this.dialogVisible = true;
            this.addModalData = {};
            this.addCustomData = [];
            // this.$nextTick(() => {
            //     this.$children[2].$refs[this.formRef].clearValidate(["seasons"]);
            // });
        },
        handleEditClick(index, row) {
            console.log("编辑", index, row);
            this.modalTitle = "编辑营养需求";
            this.addModalData = {};
            this.addCustomData = [];
            nutritionalNeedAPI.getNeedInfo(reNull({id: row.id})).then(res => {
                console.log('res',res);
                if (res.data.status == 0) {
                    let data = res.data.data;
                    this.addModalData = data;
                    let componentTos = data.componentTos;
                    componentTos.map(item => {
                        this.addCustomData.push({
                            nutrientName: item.typeId,
                            components: item.weight
                        })
                    });
                    this.dialogVisible = true;
                } else {
                    if (res.data.errorCode) {
                        this.$message.error(res.data.errorCode);
                    }
                }
            }).catch(err => {
                console.log('err',err)
            })
        },
        handleDelClick(index, row) {
            console.log("删除", index, row);
            nutritionalNeedAPI.deleteNeed(reNull({ids: row.id})).then(res => {
                console.log('res',res);
                if (res.data.status == 0) {
                    this.$message.success("删除成功！");
                    this.getList(this.currentPage, this.pageSize);
                } else {
                    if (res.data.errorCode) {
                        this.$message.error(res.data.errorCode);
                    }
                }
            }).catch(err => {
                console.log('err',err)
            })
        },
        // handleColClick(index, row) {
        //     console.log("收藏", index, row);
        // },
        handleDetailChange() {
            this.isShowDetail = false;
            this.detailCurrentPage = 1;
            this.detailPageSize = 10;
        },
        handleDetailSizeChange(val) {
            this.detailPageSize = val;
            let page = this.detailCurrentPage;
            let size = val;
            console.log(val);
            this.handleDetailClick(page, size);
        },
        handleDetailPageChange(val) {
            this.detailCurrentPage = val;
            console.log(val);
            let page = val;
            let size = this.detailPageSize;
            this.handleDetailClick(page, size);
        },
        handleDetailClick(index ,row, page, size){
            console.log("详情", index, row);
            let params = {
                id: row.id,
                page: page || 1,
                size: size || 10
            };
            nutritionalNeedAPI.getNeedFoods(reNull(params)).then(res => {
                console.log('res',res);
                if (res.data.status == 0) {
                    this.detailTableData = res.data.data.rows;
                    this.detailTotal = res.data.data.total;
                    this.isShowDetail = true;
                } else {
                    if (res.data.errorCode) {
                        this.$message.error(res.data.errorCode);
                    }
                }
            }).catch(err => {
                console.log('err',err)
            })
        },
        handlesizeChange(val) {
            this.pageSize = val;
            console.log(val);
            this.getList(this.currentPage, val, "handlesizeChange");
        },
        handlepageChange(val) {
            this.currentPage = val;
            console.log(val);
            this.getList(val, this.pageSize, "handlepageChange");
        },
        handleAddModalData() {
            //保存
            let addModalData = { ...this.addModalData };
            let addCustomData = [ ...this.addCustomData ];
            this.$children[2].$refs[this.formRef].validate(valid => {
                if (valid) {
                    if (this.inputRule()) {
                        //增加数据
                        let componentTos = [];
                        addCustomData.map(item => {
                            componentTos.push({
                                typeId: item.nutrientName,
                                weight: item.components
                            })
                        });
                        // delete addModalData.seasons;
                        // delete addModalData.weight;
                        addModalData = {
                            ...addModalData,
                            componentTos
                        };
                        console.log(addModalData);
                        nutritionalNeedAPI.editNeed(reNull(addModalData)).then(res => {
                            console.log('res',res)
                            if (res.data.status == 0) {
                                this.dialogVisible = false;
                                this.addModalData = {};
                                this.addCustomData = [];
                                this.$message.success("保存成功！");
                                this.getList();
                            } else {
                                if (res.data.errorCode) {
                                    this.$message.error(res.data.errorCode);
                                }
                            }
                        }).catch(err => {
                            console.log('err',err)
                        })
                    } else {
                        this.$message.error("营养及含量不能为空!");
                    }
                }
            });
        },
        handleCancelModalData() {
            this.modalTitle = "新增营养需求";
            this.dialogVisible = false;
            this.addModalData = {};
            this.addCustomData = [];
        },
        handleAddCustomDataList() {
            this.addCustomData.push({ id: `add-${Date.now()}` });
        },
        reduceAddCustomDataList(index) {
            this.addCustomData.splice(index, 1);
            this.disabledOpt();
        },
        onValueChange({ value, index, name }) {
            this.addCustomData[index][name] = value;
            this.disabledOpt();
        },
        getList(page, size) {
            let modelSearch = {...this.modelSearch,};
            let params = {
                page: page || 1,
                rows: size || 10,
                ...modelSearch
            };
            nutritionalNeedAPI.getNeedList(reNull(params)).then(res => {
                if (res.data.status == 0) {
                    this.tableData = res.data.data.rows;
                    this.total = res.data.data.total;
                    this.tableData.forEach(ele => {
                        console.log(ele);
                        ele["nutritionalNames"] = ele["nutritionalNames"].length ? ele["nutritionalNames"].join(",") : '';
                    });
                }
            });
        },
        getMaterialIdList() {
            // 获取营养
            let options = [];
            materialAPI.getMaterialIds().then(res => {
                console.log(res);
                if (res.data.status == 0) {
                    res.data.data.forEach(ele => {
                        this.materialNameList.push({
                            label: ele.name,
                            value: ele.id
                        })
                    });
                }
            });
        },
        Init() {
            this.getList();
            this.getMaterialIdList();
        },
        disabledOpt() {
            this.materialNameList.forEach(ele => {
                this.$delete(ele, "disabled");
            });
            this.addCustomData.forEach(ele => {
                let listIndex = this.materialNameList.findIndex(item => {
                    return ele.nutrientName == item.value;
                });
                if (listIndex != -1) {
                    this.materialNameList[listIndex]["disabled"] = true;
                }
            });
        },
        inputRule() {
            let res = false;
            console.log(this.addCustomData.length);
            if (this.addCustomData && this.addCustomData.length) {
                for (let i = 0; i < this.addCustomData.length; i++) {
                    if (this.addCustomData[i].components && this.addCustomData[i].nutrientName) {
                        res = true;
                        break;
                    }
                }
            }
            return res;
        }
    },
    mounted() {
        this.Init();
    }
}
</script>

<style>

</style>