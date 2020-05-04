
<script>
    import baseTable from "@/components/baseTable";
    export default {
        name: "showCollection",
        components: {
            baseTable,
        },
        props: {
            addData: {
                //搜索栏数据 格式：[{label: "xxx", type: "input || select || ...", prop: "保存的字段名"}]
                type: Array,
                default: () => []
            },
            addCustomData: {
                type: Array,
                default: () => []
            },
            title: String,
            dialogVisible: Boolean,
            formRef: String
        },
    }
</script>

<style scoped>

</style>