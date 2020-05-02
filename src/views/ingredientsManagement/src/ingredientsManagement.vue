<template>
  <div class="ingredientsManagement">
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
  </div>
</template>

<script>
import baseSearch from "@/components/baseSearch";
import baseTable from "@/components/baseTable";
import baseModal from "./baseModal";
import { reNull } from "@/utils/common.js";
import { materialAPI } from "@/api/material"
export default {
    name: "ingredientsManagement",
    components: {
        baseSearch,
        baseTable,
        baseModal
    },
    data(){
        return{
            searchData: [
                {
                    label: "食材名称",
                    type: "input",
                    prop: "materialName"
                },
                {
                    label: "时令",
                    type: "select",
                    prop: "seasons",
                    options: [
                        { value: "01", label: "一月" },
                        { value: "02", label: "二月" },
                        { value: "03", label: "三月" },
                        { value: "04", label: "四月" },
                        { value: "05", label: "五月" },
                        { value: "06", label: "六月" },
                        { value: "07", label: "七月" },
                        { value: "08", label: "八月" },
                        { value: "09", label: "九月" },
                        { value: "10", label: "十月" },
                        { value: "11", label: "十一月" },
                        { value: "12", label: "十二月" },
                    ],
                    multiple: true
                },
                {
                    label: "食材类型",
                    type: "input",
                    prop: "materialType"
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
                    label: "食材名称",
                    prop: "materialName",
                    align: "center"
                },
                {
                    label: "食材类型",
                    prop: "materialType",
                    align: "center"
                },
                {
                    label: "时令(月)",
                    prop: "seasons",
                    align: "center"
                },
                {
                    label: "价格(元)",
                    prop: "price",
                    align: "center"
                },
                {
                    label: "营养成分",
                    prop: "nutrient",
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
            total: 2, //数据总条数
            searchWidth: 360,

            modalTitle: "新增菜品",
            dialogVisible: false,
            addData: [
                {
                    label: "菜品id",
                    type: "input",
                    prop: "id",
                    hidden: true,
                    message: "必填项不能为空"
                },
                {
                    label: "菜品名",
                    type: "input",
                    prop: "foodName",
                    placeholder: "请输入菜品名",
                    inRule: true,
                    message: "必填项不能为空"
                },
                {
                    label: "时令",
                    type: "selectMultiple",
                    prop: "seasons",
                    placeholder: "请输入时令",
                    inRule: true,
                    message: "必填项不能为空",
                    options: [
                        { value: 1, label: "春季" },
                        { value: 2, label: "夏季" },
                        { value: 3, label: "秋季" },
                        { value: 4, label: "冬季" }
                    ]
                },
                {
                    label: "价格",
                    type: "inputNumber",
                    prop: "price",
                    placeholder: "请输入价格",
                    inRule: true,
                    message: "必填项不能为空"
                },
                {
                    label: "菜品克重",
                    type: "inputNumber",
                    prop: "weight",
                    placeholder: "请输入菜品克重,单位（克）"
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
            addCustomData: [
                {
                    id: 1,
                    nutrientName: 1,
                    components: 20
                }
            ],
            materialNameList: [
                {
                    value: 1,
                    label: "牛肉"
                },
                {
                    value: 2,
                    label: "鸡蛋"
                },
                {
                    value: 3,
                    label: "牛肉1"
                },
                {
                    value: 4,
                    label: "牛肉2"
                }
            ],
            currentPage: 1,
            pageSize: 10,

            isRules: true,
            formRef: "baseForm"
        }
    },
    methods: {
        handleQueryClick() {
            console.log("查询");
            this.getList();
        },
        handleRefreshClick() {
            console.log("清除");
        },
        handleAddClick() {
            let _this = this;
            this.modalTitle = "新增营养需求";
            this.dialogVisible = true;
            this.addModalData = {};
            this.addCustomData = [];
            this.$nextTick(() => {
                this.$children[2].$refs[this.formRef].clearValidate(["seasons"]);
            });
        },
        handleEditClick(index, row) {
            console.log("编辑", index, row);
            this.modalTitle = "编辑营养需求";
            this.dialogVisible = true;
        },
        handleDelClick(index, row) {
            console.log("删除", index, row);
        },
        handleColClick(index, row) {
            console.log("收藏", index, row);
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
        handleAddModalData(fields) {
            //保存
            let addModalData = { ...this.addModalData };
            this.$children[2].$refs[this.formRef].validate(valid => {
                if (valid) {
                    if (this.inputRule()) {
                        //增加数据
                        console.log(addModalData);
                    } else {
                        this.$message.error("食材含量不能为空!");
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
            let modelSearch = {
                ...this.modelSearch,
                seasons:this.modelSearch["seasons"].length
                    ? this.modelSearch["seasons"].join(",")
                    : "",
            };
            let params = {
                page: page || 1,
                rows: size || 10,
                ...modelSearch
            };
            console.log(params);
            materialAPI.getMaterialList(reNull(params)).then(res => {
                if (res.data.status == 0) {
                    this.tableData = res.data.data.rows;
                    this.total = res.data.data.total;
                    this.tableData.forEach(ele => {
                        console.log(111,ele);
                        let nutrient = [];
                        ele["componentTos"].map(item => {
                            nutrient.push(item.typeName)
                        });
                        ele["nutrient"] = nutrient.length ? nutrient.join(',') : ''
                    });
                }
            });
        },
        getMaterialIdList() {
            // 获取食材下拉框
            /*let options = [];
            foodAPI.getMaterialIds().then(res => {
                console.log(res);
                if (res.data.status == 0) {
                    res.data.data.forEach(ele => {
                        this.searchData[1].options.push({
                            label: ele.name,
                            value: ele.id
                        });
                    });
                }
            });*/
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
            let res = true;
            if (this.addCustomData && this.addCustomData.length) {
                for (let i = 0; i < this.addCustomData.length; i++) {
                    if (!this.addCustomData[i].components) {
                        res = false;
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