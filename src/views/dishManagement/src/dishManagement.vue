<template>
  <div class="dishManagement">
    <baseSearch :searchData="searchData" :modelSearch="modelSearch" :searchWidth="searchWidth" />
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
    <showCollection
            :tableHeaders="collectHeaders"
            :tableData="collectTableData"
            :total="collectTotal"
            :title="collectTitle"
            :dialogVisible="isShowCollection"
            @sizeChange="handleCollectSizeChange"
            @pageChange="handleCollectPageChange"
            @handleCancelChange="handleCancelChange"
    />
    <foodNutritionCircle
            :echartsFoodData="echartsFoodData"
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
import showCollection from './showCollection'
import foodNutritionCircle from './foodNutritionCircle'
import { materialAPI } from "@/api/material";
import { foodAPI } from "@/api/food";
import { foodCollectAPI } from "@/api/foodCollect";
import { reNull } from "@/utils/common.js";
export default {
  name: "dishManagement",
  components: {
    baseSearch,
    baseTable,
    baseModal,
    showCollection,
    foodNutritionCircle
  },
  data() {
    return {
      searchData: [
        {
          label: "菜品名称",
          type: "input",
          prop: "foodName",
          placeholder:"请输入菜品名称"
        },
        {
          label: "食材",
          type: "select",
          prop: "materialIds",
          placeholder:"请选择食材",
          options: [],
          multiple: true
        },
        {
            label: "时令",
            type: "select",
            prop: "seasons",
            placeholder:"请选择食材",
            options: [
                { value: "01", label: "一月" },
                { value: "02", label: "二月" },
                { value: "03", label: "三月" },
                { value: "04", label: "四月" },
                { value: "05", label: "五月" },
                { value: "06", label: "六月" },
                { value: "07", label: "七月" },
                { value: "08", label: "八月" },
                { value: "09", label: "九月" },
                { value: "10", label: "十月" },
                { value: "11", label: "十一月" },
                { value: "12", label: "十二月" },
            ],
            multiple: true
        },
        {
          label: "营养成分",
          type: "select",
          prop: "nutritionalIds",
          options: [],
          multiple: true,
          placeholder:"请选择营养成分",
        },
        {
          label: "最低价格",
          type: "inputNumber",
          prop: "priceFrom",
          placeholder:"请输入最低价格",
        },
        {
          label: "最高价格",
          type: "inputNumber",
          prop: "priceTo",
          placeholder:"请输入最高价格",
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
          label: "菜品名称",
          prop: "foodName",
          align: "center"
        },
        {
          label: "时令(月)",
          prop: "seasons",
          align: "center"
        },
        {
          label: "克重(g)",
          prop: "weight",
          align: "center"
        },
        {
          label: "价格(元)",
          prop: "price",
          align: "center"
        },
        {
          label: "食材",
          prop: "material",
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
              name: "编辑",
              handleClick: this.handleEditClick
            },
            {
              name: "删除",
              handleClick: this.handleDelClick
            },
            {
              name: "收藏",
              handleClick: this.handleColClick
            },
           {
              name: "查看",
              handleClick: this.showEchartsData
           }
          ]
        }
      ],
      tableData: [{id:1, foodName:"lala"}],
      topButtonList: [
        {
          name: "新增",
          handleClick: this.handleAddClick
        },
        {
          name: "收藏夹",
          handleClick: this.showCollection
        }
      ],
      modelSearch: {},
      total: 0, //数据总条数
      searchWidth: 360,

      modalTitle: "新增菜品",
      dialogVisible: false,
      addData: [
        {
          label: "菜品id",
          type: "input",
          prop: "id",
          hidden: true,
          message: "必填项不能为空"
        },
        {
          label: "菜品名",
          type: "input",
          prop: "foodName",
          placeholder: "请输入菜品名",
          inRule: true,
          message: "必填项不能为空"
        },
        {
          label: "时令",
          type: "selectMultiple",
          prop: "seasons",
          options: [
            { value: "01", label: "一月" },
            { value: "02", label: "二月" },
            { value: "03", label: "三月" },
            { value: "04", label: "四月" },
            { value: "05", label: "五月" },
            { value: "06", label: "六月" },
            { value: "07", label: "七月" },
            { value: "08", label: "八月" },
            { value: "09", label: "九月" },
            { value: "10", label: "十月" },
            { value: "11", label: "十一月" },
            { value: "12", label: "十二月" },
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
        {
          label: "菜品克重",
          type: "inputNumber",
          prop: "weight",
          placeholder: "请输入菜品克重,单位（克）"
        },
        {
          label: "描述",
          type: "inputTextarea",
          prop: "remark",
          placeholder: "请输入描述"
        }
      ],
      addModalData: {},
      isCustomAdd: true,
      addCustomData: [],
      materialNameList: [],
      currentPage: 1,
      pageSize: 10,
      isRules: true,
      formRef: "baseForm",

      isShowCollection: false,
      collectTitle: "我的收藏",
      collectHeaders:[
          {
              label: "菜品名称",
              prop: "foodName",
              align: "center"
          },
          {
              label: "时令(月)",
              prop: "seasons",
              align: "center"
          },
          {
              label: "克重",
              prop: "weight",
              align: "center"
          },
          {
              label: "价格(元)",
              prop: "price",
              align: "center"
          },
          {
              label: "食材",
              prop: "material",
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
                      name: "取消收藏",
                      handleClick: this.cancelCollect
                  }
              ]
          }
      ],
      collectTotal: 0,
      collectTableData:[],
      collectCurrentPage: 1,
      collectPageSize: 10,

      echartsFoodData: {},
      echartsNutritionData: {},
      echartsVisible: false,
      echartsTitle: "详情图"
    };
  },
  methods: {
    showEchartsData(index, row) {
        console.log("详情")
        foodAPI.getFoodChart(reNull({id: row.id})).then(res => {
            console.log('res',res);
            if (res.data.status == 0) {
                let data = res.data.data;
                this.echartsFoodData = data.length ? data[0] : {};
                this.echartsTitle = data.length ? `${data[0].name}详情图` : "详情图";
                this.echartsNutritionData = data.length ? data[1] : {};
                this.echartsVisible = true;
                this.$nextTick(() => {
                    this.$children[4].initCharts();
                    this.$children[4].initPieCharts();
                })
                //获取图表数据
            } else {
                if (res.data.errorCode) {
                    this.$message.error(res.data.errorCode);
                }
            }
        }).catch(err => {
            console.log('err',err)
        })
    },
    cancelEchartsData() {
        this.echartsFoodData = {};
        this.echartsNutritionData = {};
        this.echartsVisible = false
    },
    handleQueryClick() {
      console.log("查询");
      this.getList();
    },
    handleRefreshClick() {
      console.log("清除");
      this.modelSearch = {}
    },
    handleAddClick() {
      let _this = this;
      this.modalTitle = "新增菜品";
      this.dialogVisible = true;
      this.addModalData = {};
      this.addCustomData = [];
      this.$nextTick(() => {
        this.$children[2].$refs[this.formRef].clearValidate(["seasons"]);
      });
    },
    handleEditClick(index, row) {
      console.log("编辑", index, row);
        this.modalTitle = "编辑菜品";
        this.addModalData = {};
        this.addCustomData = [];
        foodAPI.getFoodInfo(reNull({id: row.id})).then(res => {
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
        foodAPI.deleteFood(reNull({ids: row.id})).then(res => {
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
    handleColClick(index, row) {
      console.log("收藏", index, row);
        foodAPI.collectFood(reNull({ids: row.id, status: true})).then(res => {
            console.log('res',res);
            if (res.data.status == 0) {
                this.$message.success("收藏成功！");
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
    handleAddModalData() {
      //保存
      let addModalData = { ...this.addModalData };
      let addCustomData = [ ...this.addCustomData ];
      this.$children[2].$refs[this.formRef].validate(valid => {
          if (valid) {
          if (this.inputRule()) {
            //增加数据
            let componentTos = [];
            addCustomData.map(item => {
                  componentTos.push({
                      typeId: item.nutrientName,
                      weight: item.components
                  })
            });
            delete addModalData.weight;
            delete addModalData.seasons;
            addModalData = {
                ...addModalData,
                componentTos
            };
            foodAPI.editFood(reNull(addModalData)).then(res => {
                console.log('res',res)
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
                console.log('err',err)
            })
          } else {
            this.$message.error("食材及含量不能为空!");
          }
        }
      });
    },
    handleCancelModalData() {
      this.modalTitle = "新增菜品";
      this.dialogVisible = false;
      this.addModalData = {};
      this.addCustomData = [];
    },
    handleAddCustomDataList() {
      this.addCustomData.push({ id: `add-${Date.now()}` });
    },
    reduceAddCustomDataList(index) {
      this.addCustomData.splice(index, 1);
      this.disabledOpt();
    },
    onValueChange({ value, index, name }) {
      this.addCustomData[index][name] = value;
      this.disabledOpt();
    },
    showCollection() {
        this.isShowCollection = true;
        this.getCollectionList()
    },
    handleCancelChange() {
        this.isShowCollection = false
    },
    handleCollectSizeChange(val) {
        this.collectPageSize = val;
        console.log(val);
        this.getCollectionList(this.collectCurrentPage, val, "handlesizeChange");
    },
    handleCollectPageChange(val) {
        this.collectCurrentPage = val;
        console.log(val);
        this.getCollectionList(val, this.collectPageSize, "handlepageChange");
    },
    getList(page, size) {
      let modelSearch = {
          ...this.modelSearch,
          materialIds:this.modelSearch["materialIds"].length
              ? this.modelSearch["materialIds"].join(",")
              : "",
          nutritionalIds:this.modelSearch["nutritionalIds"].length
              ? this.modelSearch["nutritionalIds"].join(",")
              : "",
          seasons:this.modelSearch["seasons"].length
              ? this.modelSearch["seasons"].join(",")
              : "",
      };
      if (modelSearch.priceFrom && modelSearch.priceTo) {
          if (modelSearch.priceFrom >= modelSearch.priceTo) {
              this.$message.error("最低价格必须小于最高价格");
              return;
          }
      }
      let params = {
        page: page || 1,
        rows: size || 10,
        ...modelSearch
      };
      foodAPI.getFoodList(reNull(params)).then(res => {
        if (res.data.status == 0) {
          this.tableData = res.data.data.rows;
          this.total = res.data.data.total;
          this.tableData.forEach(ele => {
            console.log(ele);
            ele["material"] = ele["materialNames"].join(",");
            ele["nutrient"] = ele["nutrientNames"].join(",");
          });
        }
      });
    },
    getCollectionList(page, size){
        let params = {
            page: page || 1,
            rows: size || 10,
        };
        foodCollectAPI.getCollectList(reNull(params)).then(res => {
            if (res.data.status == 0) {
                this.collectTableData = res.data.data.rows;
                this.collectTotal = res.data.data.total;
                this.collectTableData.forEach(ele => {
                    console.log(ele);
                    if (ele["nutrientNames"].length > 3){
                        let nutrient = [];
                        for(let i = 0; i < 3; i++){
                            nutrient.push(ele["nutrientNames"][i])
                        }
                        ele["material"] = ele["materialNames"].join(",");
                        ele["nutrient"] = `${nutrient.join(",")}...`;
                    } else {
                        ele["material"] = ele["materialNames"].join(",");
                        ele["nutrient"] = ele["nutrientNames"].join(",");
                    }
                });
            }
        });
    },
    cancelCollect(index, row) {
        console.log("取消收藏");
        foodAPI.collectFood({ids: row.id, status: false}).then(res => {
            console.log('res',res);
            if (res.data.status == 0) {
                this.$message.success("取消收藏成功！");
                this.getCollectionList(this.collectCurrentPage, this.collectPageSize);
            } else {
                if (res.data.errorCode) {
                    this.$message.error(res.data.errorCode);
                }
            }
        }).catch(err => {
            console.log('err',err)
        })
    },
    getMaterialIdList() {
      // 获取食材下拉框
      let options = [];
      foodAPI.getMaterialIds().then(res => {
        console.log(res);
        if (res.data.status == 0) {
          res.data.data.forEach(ele => {
            this.searchData[1].options.push({
              label: ele.name,
              value: ele.id
            });
            this.materialNameList.push({
                label: ele.name,
                value: ele.id
            })
          });
        }
      });
    },
    getMaterialIds(){
        materialAPI.getMaterialIds().then(res => {
            console.log(res);
            if (res.data.status == 0) {
                res.data.data.forEach(ele => {
                    this.searchData[3].options.push({
                        label: ele.name,
                        value: ele.id
                    });
                });
            }
        })
    },
    Init() {
      this.getList();
      this.getMaterialIdList();
      this.getMaterialIds();
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
    inputRule() {
      let res = false;
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
};
</script>

<style>
</style>