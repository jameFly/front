
<script>
export default {
  name: "foodNutritionCircle",
  data() {
    return {};
  },
  props: {
    title: String,
    echartsVisible: Boolean,
    echartsFoodData: {
        type: Object,
        default: () => {}
    },
    echartsNutritionData: {
        type: Object,
        default: () => {}
    }
  },
  methods: {
    initCharts() {
      const { nameList = [], contentList = [] } = this.echartsFoodData;
      let myChart = this.$echarts.init(this.$refs.chart);
      console.log(this.$refs.chart);
      // 绘制图表
      myChart.setOption({
        title: { text: "食材含量图" },
        tooltip: {},
        xAxis: {
            name:"名称",
          data: nameList
        },
        yAxis: {
            name:"含量/克"
        },
        series: [
          {
            name: "含量(克)",
            type: "bar",
            data: contentList
          }
        ]
      });
    },
    onCancel() {
      this.$emit("cancelEchartsData");
    },
    initPieCharts() {
        const { nameList = [], contentList = [] } = this.echartsNutritionData;
        let data = [];
        let i;
        for( i = 0; i< nameList.length; i++){
            data.push({
                value: contentList[i],
                name: nameList[i]
            })
        }
        let myChart = this.$echarts.init(this.$refs.pieChart);
        console.log(this.$refs.pieChart);
        myChart.setOption({
            title: {
                text: '营养含量图',
                left: 'center'
            },
            tooltip: {
                trigger: 'item',
                formatter: '{a} <br/>{b} : {c} ({d}%)'
            },
            legend: {
                orient: 'vertical',
                left: 'left',
                data: nameList,
            },
            series: [
                {
                    name: '营养含量(克)',
                    type: 'pie',
                    radius: '55%',
                    center: ['50%', '60%'],
                    data: data,
                    emphasis: {
                        itemStyle: {
                            shadowBlur: 10,
                            shadowOffsetX: 0,
                            shadowColor: 'rgba(0, 0, 0, 0.5)'
                        }
                    }
                }
            ]
        })
    }
  },
  render(h) {
    const { title, echartsVisible, onCancel } = this;
    return (
      <div className="foodNutritionCircle">
        <el-dialog
          title={title}
          visible={echartsVisible}
          on-close={this.onCancel}
          width="1150px"
        >
            <div class="charts">
                <div style="width:400px;height:400px" ref="chart"></div>
                <div style="width:650px;height:400px" ref="pieChart"></div>
            </div>
        </el-dialog>
      </div>
    );
  },
  mounted() {}
};
</script>

<style  lang="scss">
    .charts{
        display: flex;
        justify-content: center;
        align-content: center;
    }
</style>