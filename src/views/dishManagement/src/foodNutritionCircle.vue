<!--<template>-->
    <!--<div className="foodNutritionCircle">-->
        <!--<el-dialog-->
                <!--:title={title}-->
                <!--:visible={echartsVisible}-->
                <!--@close="onCancel"-->
        <!--&gt;-->

        <!--</el-dialog>-->
        <!--<div style="width:500px;height:500px" ref="chart"></div>-->
    <!--</div>-->
<!--</template>-->

<script>
    export default {
        name: "foodNutritionCircle",
        data () {
            return {};
        },
        props:{
            title: String,
            echartsVisible: Boolean,

        },
        methods: {
            initCharts () {
                let myChart = this.$echarts.init(this.$refs.chart);
                console.log(this.$refs.chart)
                // 绘制图表
                myChart.setOption({
                    title: { text: '在Vue中使用echarts' },
                    tooltip: {},
                    xAxis: {
                        data: ["衬衫","羊毛衫","雪纺衫","裤子","高跟鞋","袜子"]
                    },
                    yAxis: {},
                    series: [{
                        name: '销量',
                        type: 'bar',
                        data: [5, 20, 36, 10, 10, 20]
                    }]
                });
            },
            onCancel() {
                this.$emit("cancelEchartsData");
            },
        },
        render(h) {
            const { title, echartsVisible, onCancel } = this;
            return (
                <div className="foodNutritionCircle">
                    <el-dialog
                        title={title}
                        visible={echartsVisible}
                        on-close={this.onCancel}
                    >
                        <div style="width:500px;height:500px" ref="chart"></div>
                    </el-dialog>
                </div>
            )
        },
        mounted () {
            this.$nextTick(() => {
                console.log(this.$refs.chart);
                this.initCharts()
            });
        }
    }
</script>

<style scoped>

</style>