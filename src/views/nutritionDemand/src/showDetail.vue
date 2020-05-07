<template>
    <div>
        <el-dialog
                :title="title"
                :visible="dialogVisible"
                @close="handleCancelChange"
        >
            <baseTable
                    :tableHeaders="tableHeaders"
                    :tableData="tableData"
                    :total="total"
                    @sizeChange="handleSizeChange"
                    @pageChange="handlePageChange"
            />
        </el-dialog>
    </div>
</template>

<script>
    import baseTable from "@/components/baseTable";
    export default {
        name: "showDetail",
        components: {
            baseTable,
        },
        props: {
            tableHeaders: {
                // 表格头 格式：[{label: "名称", prop: "保存的字段名", width: "单元格宽度"(非必填), align: "left || center || right"(默认居左)}]
                type: Array,
                default: () => []
            },
            tableData: {
                // 表格数据
                type: Array,
                default: () => []
            },
            title: String,
            total:  Number,
            dialogVisible: Boolean,
            formRef: String
        },
        methods: {
            handleSizeChange(val) {
                this.$emit("sizeChange", val);
            },
            handlePageChange(val) {
                this.$emit("pageChange", val);
            },
            handleCancelChange(){
                this.$emit("handleCancelChange");
            }
        }
    }
</script>

<style scoped>

</style>