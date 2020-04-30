<template>
  <div class="baseTable">
    <div class="btn_wrapper">
      <el-button
        v-for="(item, index) in topButtonList"
        :key="index"
        class="topBtn"
        @click="item.handleClick"
      >{{item.name}}</el-button>
    </div>
    <el-table
      :data="tableData"
      :header-cell-style="{
        'background-color': 'rgba(106, 141, 195, 0.05)',
        'height':'54px'        
      }"
      :border="border"
    >
      <el-table-column
        v-if="hasIndex"
        type="index"
        :index="handleIndex"
        label="序号"
        align="center"
        width="50"
      ></el-table-column>
      <el-table-column
        v-for="(item, index) in tableHeaders"
        :key="index"
        :label="item.label"
        :prop="item.prop"
        :width="item.width"
        :align="item.align"
        header-align="center"
      >
        <template v-slot="scope" v-if="item.label == '操作'">
          <template v-if="item.buttonList && item.buttonList.length">
            <span
              v-for="(key, value) in item.buttonList"
              :key="value"
              class="btnItem"
              @click="key.handleClick(scope.$index, scope.row)"
            >{{key.name}}</span>
          </template>
          <template v-if="scope.row.iconList && scope.row.iconList.length">
            <i
              v-for="(iconItem, iconIndex) in scope.row.iconList"
              :key="iconIndex"
              :class="iconItem.class"
              class="iconfont"
              @click="iconItem.handleClick(scope.$index, scope.row)"
            ></i>
            <span>{{scope.row[item.prop]}}</span>
          </template>
        </template>
      </el-table-column>
    </el-table>
    <pagination
      :currentPag="currentPage"
      :pageSize="pageSize"
      :total="total "
      @sizeChange="handleSizeChange"
      @pageChange="handlePageChange"
    />
  </div>
</template>

<script>
import pagination from "@/components/pagination";
export default {
  name: "baseTable",
  props: {
    topButtonList: {
      // 顶端按钮
      type: Array,
      default: () => []
    },
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
    hasIndex: {
      // 是否需要多选框
      type: Boolean,
      default: false
    },
    handleIndex: {
      // 处理多选框序号
      type: Function,
      default: index => {
        return index + 1;
      }
    },
    border: {
      // 是否需要竖边框
      type: Boolean,
      default: false
    },
    currentPage: Number, // 当前页码
    pageSize: Number, // 每页条数
    total: Number // 总数
  },
  components: {
    pagination
  },
  methods: {
    handleSizeChange(val) {
      this.$emit("sizeChange", val);
    },
    handlePageChange(val) {
      this.$emit("pageChange", val);
    }
  }
};
</script>

<style lang="scss">
.baseTable {
  margin-top: 20px;
  &:after {
    clear: both;
    content: "";
  }
  .topBtn {
    float: left;
    margin-bottom: 20px;
  }
  .btnItem {
    font-family: Microsoft YaHei;
    font-weight: 400;
    color: rgba(106, 141, 195, 1);
    cursor: pointer;
    margin-left: 12px;
  }
  .iconfont {
    font-size: 16px;
    margin-left: 10px;
    cursor: pointer;
  }
  .icon-edit {
    color: #409eff;
  }
  .icon-delete {
    color: #f56c6c;
  }
  .icon-auth {
    color: #87d5ad;
  }
  .icon-manage {
    color: #386998;
  }
}
</style>