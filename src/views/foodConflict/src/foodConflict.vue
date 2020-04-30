<template>
    <div class="foodConflict">
        <baseSearch :searchData="searchData" :modelSearch="modelSearch"/>
        <baseTable
                :tableHeaders="tableHeaders"
                :tableData="tableData"
                :total="total"
                @sizeChange="handlesizeChange"
                @pageChange="handlepageChange"
        />
    </div>
</template>

<script>
    import baseSearch from "@/components/baseSearch";
    import baseTable from "@/components/baseTable";
    import {foodConflictAPI} from "@/api/foodConflict";

    export default {
        name: "foodConflict",
        components: {
            baseSearch,
            baseTable
        },
        data() {
            return {
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
                total: 2 //数据总条数
            };
        },
        methods: {
            handleQueryClick() {
                console.log("查询");
                this.getList();
            },
            handleRefreshClick() {
                console.log("清除");
            },
            handlesizeChange(val) {
                console.log(val);
            },
            handlepageChange(val) {
                console.log(val);
            },
            getList() {
                let params = {
                    page: 1,
                    rows: 10,
                    ...this.modelSearch
                };
                foodConflictAPI.getConflictList(params).then(res => {
                    console.log(res);
                    if (res.data.status == 0) {

                        this.tableData = res.data.data.rows;
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