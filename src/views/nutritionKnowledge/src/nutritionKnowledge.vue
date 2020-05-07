<template>
    <div class="nutritionKnowledge">
        <baseBar :title="barTitle" />
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
    import {nutritionKnowledgeAPI} from "@/api/nutritionKnowledge";
    import baseBar from "@/components/baseBar"
    export default {
        name: "nutritionKnowledge",
        components: {
            baseSearch,
            baseTable,
            baseBar,
        },
        data() {
            return {
                barTitle: "营养小知识",
                searchData: [
                    {
                        label: "营养名称",
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
                        label: "营养名称",
                        prop: "name",
                        align: "center"
                    },
                    {
                        label: "功能",
                        prop: "function",
                        align: "center"
                    },
                    {
                        label: "缺乏症",
                        prop: "peculiarity",
                        align: "center"
                    },
                    {
                        label: "营养来源",
                        prop: "source",
                        align: "center"
                    }
                ],
                tableData: [],
                modelSearch: {},
                total: 0,//数据总条数
                currentPage: 1,
                pageSize: 10,
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
            getList(page, size) {
                let modelSearch = {...this.modelSearch,};
                let params = {
                    page: page || 1,
                    rows: size || 10,
                    ...modelSearch
                };
                nutritionKnowledgeAPI.getKnowledgeList(params).then(res => {
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