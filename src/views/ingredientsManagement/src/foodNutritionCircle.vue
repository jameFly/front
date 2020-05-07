
<script>
export default {
  name: "foodNutritionCircle",
  data() {
    return {};
  },
  props: {
    title: String,
    echartsVisible: Boolean,
    echartsNutritionData: {
        type: Object,
        default: () => {}
    }
  },
  methods: {
    onCancel() {
      this.$emit("cancelEchartsData");
    },
    initPieCharts() {
        const { nameList = [], contentList = [], name = '' } = this.echartsNutritionData;
        let isData = this.echartsNutritionData ? true : false
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
                text: name,
                left: 'center'
            },
            tooltip: {
                trigger: 'item',
                formatter: '{a} <br/>{b} : {c} ({d}%)'
            },
            legend: {
                orient: 'vertical',
                left: 'left',
                data: nameList
            },
            series: [
                {
                    name: '营养名称及含量',
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
        >
            <div class="charts">
                <div style="width:700px;height:400px" ref="pieChart"></div>
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