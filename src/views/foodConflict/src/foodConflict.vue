<template>
    <div class="foodConflict">
        <baseBar :title="barTitle" />
        <baseSearch :searchData="searchData" :modelSearch="modelSearch"/>
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
                :isRules="isRules"
                @addModalData="handleAddModalData"
                @cancelModalData="handleCancelModalData"
        />
    </div>
</template>

<script>
    import baseSearch from "@/components/baseSearch";
    import baseTable from "@/components/baseTable";
    import {foodConflictAPI} from "@/api/foodConflict";
    import baseBar from "@/components/baseBar"
    import baseModal from "./baseModal";
    import { reNull } from "@/utils/common.js";
    export default {
        name: "foodConflict",
        components: {
            baseSearch,
            baseTable,
            baseModal,
            baseBar,
        },
        data() {
            return {
                barTitle: "食物冲突",
                searchData: [
                    {
                        label: "食物名称",
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
                        label: "食物名称",
                        prop: "name",
                        align: "center"
                    },
                    {
                        label: "冲突的食物",
                        prop: "conflictName",
                        align: "center"
                    },
                    {
                        label: "冲突原因",
                        prop: "cause",
                        align: "center"
                    }
                ],
                tableData: [],
                modelSearch: {},
                total: 0, //数据总条数
                topButtonList: [
                    {
                        name: "新增",
                        handleClick: this.handleAddClick
                    }
                ],

                modalTitle: "新增食物",
                dialogVisible: false,
                addData: [
                    {
                        label: "食物id",
                        type: "input",
                        prop: "id",
                        hidden: true,
                        message: "必填项不能为空"
                    },
                    {
                        label: "食物名称",
                        type: "input",
                        prop: "name",
                        placeholder: "请输入食物名称",
                        inRule: true,
                        message: "必填项不能为空"
                    },
                    {
                        label: "冲突食物",
                        type: "input",
                        prop: "conflictName",
                        placeholder: "请输入冲突食物",
                        inRule: true,
                        message: "必填项不能为空"
                    },
                    {
                        label: "冲突原因",
                        type: "inputTextarea",
                        prop: "cause",
                        placeholder: "请输入冲突原因",
                        inRule: true,
                        message: "必填项不能为空"
                    }
                ],
                addModalData: {},
                isRules: true,

                currentPage: 1,
                pageSize: 10,
                formRef: "baseForm"
            };
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
            handleAddClick() {
                let _this = this;
                this.modalTitle = "新增食物";
                this.dialogVisible = true;
                this.addModalData = {};
            },
            handleEditClick(index, row) {
                console.log("编辑", index, row);
                this.modalTitle = "编辑食物";
                this.addModalData = {};
                foodConflictAPI.getConflictInfo(reNull({id: row.id})).then(res => {
                    console.log('res',res);
                    if (res.data.status == 0) {
                        let data = res.data.data;
                        data.seasons = res.data.data.seasons ?  res.data.data.seasons.split(',') : [];
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
                foodConflictAPI.deleteConflict(reNull({ids: row.id})).then(res => {
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
            handleAddModalData(fields) {
                //保存
                let addModalData = { ...this.addModalData };
                this.$children[3].$refs[this.formRef].validate(valid => {
                    if (valid) {
                        //增加数据
                        foodConflictAPI.editConflict(reNull(addModalData)).then(res => {
                            console.log('res',res)
                            if (res.data.status == 0) {
                                this.dialogVisible = false;
                                this.addModalData = {};
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
                    }
                });
            },
            handleCancelModalData() {
                this.modalTitle = "新增食物";
                this.dialogVisible = false;
                this.addModalData = {};
            },
            getList(page, size) {
                let modelSearch = {...this.modelSearch,};
                let params = {
                    page: page || 1,
                    rows: size || 10,
                    ...modelSearch
                };
                foodConflictAPI.getConflictList(params).then(res => {
                    console.log(res);
                    if (res.data.status == 0) {
                        this.tableData = res.data.data.rows;
                        this.total = res.data.data.total;
                        this.tableData.forEach(ele => {
                            console.log(ele);

                        })
                    }
                })
            },
            Init() {
                this.getList();
            }
        },
        mounted() {
            this.Init();
        }
    };
</script>

<style>

</style>