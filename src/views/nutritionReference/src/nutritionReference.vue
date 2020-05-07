<template>
    <div class="nutritionReference">
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
    import {nutritionStandardAPI} from "@/api/nutritionStandard";

    export default {
        name: "nutritionReference",
        components: {
            baseSearch,
            baseTable
        },
        data() {
            return {
                searchData: [
                    {
                        label: "名称",
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
                        label: "名称",
                        prop: "name",
                        align: "center"
                    },
                    {
                        label: "年龄",
                        prop: "age",
                        align: "center"
                    },
                    {
                        label: "能量(千卡)",
                        prop: "energy",
                        align: "center"
                    },
                    {
                        label: "蛋白质(克)",
                        prop: "protein",
                        align: "center"
                    },
                    {
                        label: "脂肪(占能量百分比)",
                        prop: "fat",
                        align: "center"
                    },
                    {
                        label: "钙(毫克)",
                        prop: "calcium",
                        align: "center"
                    },
                    {
                        label: "铁(毫克)",
                        prop: "iron",
                        align: "center"
                    },
                    {
                        label: "碘(微克)",
                        prop: "iodine",
                        align: "center"
                    },
                    {
                        label: "维生素C(毫克)",
                        prop: "vitaminC",
                        align: "center"
                    },
                    {
                        label: "维生素B1(毫克)",
                        prop: "vitaminB1",
                        align: "center"
                    },
                    {
                        label: "维生素B2(毫克)",
                        prop: "vitaminB2",
                        align: "center"
                    },
                ],
                tableData: [],
                modelSearch: {},
                total: 0, //数据总条数
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
                nutritionStandardAPI.getStandardList(params).then(res => {
                    console.log(res);
                    if (res.data.status == 0) {
                        let targetArr = ["energy","protein","fat","calcium","iron","iodine","vitaminC","vitaminB1","vitaminB2"];
                        this.tableData = res.data.data.rows;
                        this.total = res.data.data.total;
                        this.tableData.forEach(ele => {
                            console.log(ele);
                            let dataArr = ele["remark"].split(',');
                            dataArr.forEach((item, index) => {
                                ele[targetArr[index]] = item;
                            })
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