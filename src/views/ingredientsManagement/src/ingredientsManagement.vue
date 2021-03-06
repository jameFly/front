<template>
    <div class="ingredientsManagement">
        <baseBar :title="barTitle"/>
        <baseSearch :searchData="searchData" :modelSearch="modelSearch" :searchWidth="searchWidth"/>
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
        <foodNutritionCircle
                :echartsNutritionData="echartsNutritionData"
                :echartsVisible="echartsVisible"
                :title="echartsTitle"
                @cancelEchartsData="cancelEchartsData"
        />
    </div>
</template>

<script>
  import baseSearch from "@/components/baseSearch";
  import baseTable from "@/components/baseTable";
  import baseModal from "./baseModal";
  import foodNutritionCircle from './foodNutritionCircle'
  import {reNull} from "@/utils/common.js";
  import {materialAPI} from "@/api/material"
  import baseBar from "@/components/baseBar"

  export default {
    name: "ingredientsManagement",
    components: {
      baseSearch,
      baseTable,
      baseModal,
      foodNutritionCircle,
      baseBar,
    },
    data() {
      return {
        barTitle: "食材管理",//小标题，lbw
        searchData: [//搜索框
          {
            label: "食材名称",
            type: "input",
            prop: "materialName",
            placeholder: "请输入食材名称"
          },
          {
            label: "时令",
            type: "select",
            prop: "seasons",
            options: [
              {value: "01", label: "一月"},
              {value: "02", label: "二月"},
              {value: "03", label: "三月"},
              {value: "04", label: "四月"},
              {value: "05", label: "五月"},
              {value: "06", label: "六月"},
              {value: "07", label: "七月"},
              {value: "08", label: "八月"},
              {value: "09", label: "九月"},
              {value: "10", label: "十月"},
              {value: "11", label: "十一月"},
              {value: "12", label: "十二月"},
            ],
            multiple: true,
            placeholder: "请选择时令"
          },
          {
            label: "食材类型",
            type: "select",
            prop: "materialType",
            options: [
              {value: "鱼类", label: "鱼类"},
              {value: "肉类", label: "肉类"},
              {value: "蔬菜", label: "蔬菜"},
              {value: "水果", label: "水果"},
              {value: "谷物", label: "谷物"},
              {value: "海鲜", label: "海鲜"},
              {value: "藻类", label: "藻类"},
            ],
            placeholder: "请选择食材类型",
            multiple: true,
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
        tableHeaders: [// 表数据的表头
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
            label: "价格(元/kg)",
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
                name: "营养详情",
                handleClick: this.showEchartsData
              },
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
        tableData: [],// 表数据内容
        topButtonList: [ // 新增按钮
          {
            name: "新增",
            handleClick: this.handleAddClick,// 新增食材，点击后弹出框
            type: "primary"
          }
        ],
        modelSearch: {},
        total: 0, //数据总条数
        searchWidth: 360,

        modalTitle: "新增食材",
        dialogVisible: false,
        addData: [
          {
            label: "食材id",
            type: "input",
            prop: "id",
            hidden: true,// 是否隐藏id框
            message: "必填项不能为空"
          },
          {
            label: "食材名称",
            type: "input",
            prop: "materialName",
            placeholder: "请输入食材名称",
            inRule: true,// 是否是必填项
            message: "必填项不能为空"
          },
          {
            label: "时令",
            type: "selectMultiple",// 多选框，单选是select
            prop: "seasons",
            placeholder: "请输入时令",
            inRule: true,
            message: "必填项不能为空",
            options: [
              {value: "01", label: "一月"},
              {value: "02", label: "二月"},
              {value: "03", label: "三月"},
              {value: "04", label: "四月"},
              {value: "05", label: "五月"},
              {value: "06", label: "六月"},
              {value: "07", label: "七月"},
              {value: "08", label: "八月"},
              {value: "09", label: "九月"},
              {value: "10", label: "十月"},
              {value: "11", label: "十一月"},
              {value: "12", label: "十二月"},
            ]
          },
          {
            label: "食材类型",
            type: "select",
            prop: "materialType",
            placeholder: "请输入食材类型",
            inRule: true,
            message: "必填项不能为空",
            options: [
              {value: "鱼类", label: "鱼类"},
              {value: "肉类", label: "肉类"},
              {value: "蔬菜", label: "蔬菜"},
              {value: "水果", label: "水果"},
              {value: "谷物", label: "谷物"},
              {value: "海鲜", label: "海鲜"},
              {value: "藻类", label: "藻类"},
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
        ],
        addModalData: {},
        isCustomAdd: true,
        addCustomData: [],
        materialNameList: [],
        currentPage: 1,
        pageSize: 10,

        isRules: true,
        formRef: "baseForm",

        echartsNutritionData: {},
        echartsVisible: false,
        echartsTitle: "营养含量详情图" // 详情图弹框标题
      }
    },
    methods: {
      showEchartsData(index, row) {// 详情饼状图
        console.log("详情")
        materialAPI.getMaterialChart(reNull({id: row.id})).then(res => {
          console.log('res', res);
          if (res.data.status == 0) {
            let data = res.data.data;
            this.echartsNutritionData = data ? data : {};
            this.echartsVisible = true;
            this.$nextTick(() => {
              this.$children[4].initPieCharts();
            })
            //获取图表数据
          } else {
            if (res.data.errorCode) {
              this.$message.error(res.data.errorCode);
            }
          }
        }).catch(err => {
          console.log('err', err)
        })
      },
      cancelEchartsData() { // 取消显示，×掉
        this.echartsNutritionData = {};
        this.echartsVisible = false
      },
      handleQueryClick() { // 点击查询
        console.log("查询");
        this.getList();
      },
      handleRefreshClick() { //清楚查询条件
        console.log("清除");
        this.modelSearch = {"seasons": [], "materialType": []}
      },
      handleAddClick() { //添加食材
        let _this = this;
        this.modalTitle = "新增食材";
        this.dialogVisible = true;
        this.addModalData = {};
        this.addCustomData = [];
        this.$nextTick(() => {
          this.$children[3].$refs[this.formRef].clearValidate(["seasons"]);
        });
      },
      handleEditClick(index, row) { //编辑食材
        console.log("编辑", index, row);
        this.modalTitle = "编辑食材";
        this.addModalData = {};
        this.addCustomData = [];
        materialAPI.getMaterialInfo(reNull({id: row.id})).then(res => {
          console.log('res', res);
          if (res.data.status == 0) {
            let data = res.data.data;
            data.seasons = res.data.data.seasons ? res.data.data.seasons.split(',') : [];
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
          console.log('err', err)
        })
      },
      handleDelClick(index, row) { // 删除食材
        console.log("删除", index, row);
        materialAPI.deleteMaterial(reNull({ids: row.id})).then(res => { //调用接口
          console.log('res', res);
          if (res.data.status == 0) {
            this.$message.success("删除成功！");
            this.getList(this.currentPage, this.pageSize);
          } else {
            if (res.data.errorCode) {
              this.$message.error(res.data.errorCode);
            }
          }
        }).catch(err => {
          console.log('err', err)
        })
      },
      // handleColClick(index, row) {
      //     console.log("收藏", index, row);
      // },
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
      handleAddModalData(fields) {//保存添加编辑表单数据
        //保存
        let addModalData = {...this.addModalData};//表单数据
        let addCustomData = [...this.addCustomData];//营养以及含量
        this.$children[3].$refs[this.formRef].validate(valid => {//验证表单
          if (valid) {
            console.log(this.inputRule());
            if (this.inputRule()) {//如果营养及含量格式正确
              //增加数据
              let componentTos = [];
              addCustomData.map(item => {
                componentTos.push({
                  typeId: item.nutrientName,
                  weight: item.components
                })
              });
              // delete addModalData.seasons;
              // delete addModalData.weight;
              addModalData = {
                ...addModalData,
                seasons: addModalData.seasons && addModalData.seasons.length ? addModalData.seasons.join(',') : '',
                componentTos
              };
              materialAPI.editMaterial(reNull(addModalData)).then(res => {
                console.log('res', res)
                if (res.data.status == 0) {
                  this.dialogVisible = false;
                  this.addModalData = {};
                  this.addCustomData = [];
                  this.$message.success("保存成功！");
                  this.getList();
                } else {
                  if (res.data.errorCode) {
                    this.$message.error(res.data.errorCode);
                  }
                }
              }).catch(err => {
                console.log('err', err)
              })
            } else {
              this.$message.error("营养及含量不能为空!");
            }
          }
        });
      },
      handleCancelModalData() {//取消新增食材
        this.modalTitle = "新增食材";
        this.dialogVisible = false;
        this.addModalData = {};
        this.addCustomData = [];
      },
      handleAddCustomDataList() {//增加营养含量框
        this.addCustomData.push({id: `add-${Date.now()}`});
      },
      reduceAddCustomDataList(index) {//删除自定义营养成分输入框
        this.addCustomData.splice(index, 1);
        this.disabledOpt();
      },
      onValueChange({value, index, name}) {//修改/编辑自定义营养成分输入框内容
        this.addCustomData[index][name] = value;
        this.disabledOpt();
      },
      getList(page, size) {//查询获取数据
        let modelSearch = {// 获取搜索框中查询条件
          ...this.modelSearch,
          seasons: this.modelSearch["seasons"].length
            ? this.modelSearch["seasons"].join(",")
            : "",
          materialType: this.modelSearch["materialType"].length
            ? this.modelSearch["materialType"].join(",")
            : "",
        };
        let params = {//分页条件
          page: page || 1,
          rows: size || 10,
          ...modelSearch
        };
        console.log(params);
        materialAPI.getMaterialList(reNull(params)).then(res => {//获取列表接口返回数据
          if (res.data.status == 0) {
            this.tableData = res.data.data.rows;
            this.total = res.data.data.total;
            this.tableData.forEach(ele => {
              console.log(111, ele);
              let nutrient = [];
              ele["componentTos"].map(item => {
                nutrient.push(item.typeName)//营养名字
              });
              ele["nutrient"] = nutrient.length ? nutrient.join(',') : ''
            });
          }
        });
      },
      getNutritionIds() {
        // 获取营养
        let options = [];
        materialAPI.getNutritionIds().then(res => {
          console.log(res);
          if (res.data.status == 0) {
            res.data.data.forEach(ele => {
              this.materialNameList.push({
                label: ele.name,
                value: ele.id
              })
            });
          }
        });
      },
      Init() {
        this.getList();
        this.getNutritionIds();
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
      inputRule() {// 判断营养及含量是否格式符合
        let res = false;
        console.log(this.addCustomData.length);
        if (this.addCustomData && this.addCustomData.length) {
          for (let i = 0; i < this.addCustomData.length; i++) {
            if (this.addCustomData[i].components && this.addCustomData[i].nutrientName) {
              res = true;
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