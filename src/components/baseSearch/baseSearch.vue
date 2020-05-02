<script>
export default {
  name: "baseSearch",
  props: {
    searchData: { //搜索栏数据 格式：[{label: "xxx", type: "input || select || ...", prop: "保存的字段名"}]
      type: Array,
      default: () => []
    },
    modelSearch: {
      type: Object,
      default: () => {}
    },
    searchWidth: {
      type: Number,
      default: 400
    }
  },
  methods: {
    renderFormItem(item) {
      const { modelSearch, searchWidth } = this;
      const {
        type,
        label,
        prop,
        placeholder,
        buttonList,
        handleClick,
        options,
        icon
      } = item;
      if (item.type === "input") {
        return (
          <div class="searchInput" style={{ width: searchWidth + "px" }}>
            <span domPropsInnerHTML={label}></span>
            <el-input
              v-model={modelSearch[prop]}
              placeholder={placeholder}
            ></el-input>
          </div>
        );
      }else if (item.type === "inputNumber") {
          return (
              <div class="searchInput" style={{width: searchWidth + "px"}}>
                  <span domPropsInnerHTML={label}></span>
                  <el-input-number
                      class="input-number"
                      v-model={modelSearch[prop]}
                      placeholder={placeholder}
                      min={0}
                      controls-position="right"
                  ></el-input-number>
              </div>
          );
      } else if (item.type === "button" && item.label == "查询") {
        return (
          <div class="searchBtn" on-click={e => handleClick(e)}>
            <i class={icon}></i>
            <span>{label}</span>
          </div>
        );
      } else if (item.type === "button" && item.label == "清除") {
        return (
          <div class="searchBtn refreshBtn" on-click={e => handleClick(e)}>
            <i class={icon}></i>
            <span>{label}</span>
          </div>
        );
      } else if (item.type === "select") {
        return (
          <div class="searchInput" style={{ width: searchWidth + "px" }}>
            <span domPropsInnerHTML={label}></span>
            <el-select v-model={modelSearch[prop]} multiple={item.multiple} placeholder={placeholder}>
              {item.options.length &&
                item.options.map(item => {
                  return (
                    <el-option
                      key={item.value}
                      label={item.label}
                      value={item.value}
                    ></el-option>
                  );
                })}
            </el-select>
          </div>
        );
      }
    }
  },
  render(h) {
    const { searchData, renderFormItem } = this;
    return (
      <div class="search_head">
        {searchData.map(item => {
          return renderFormItem(item);
        })}
      </div>
    );
  }
};
</script>

<style lang="scss">
.search_head {
  display: flex;
  flex-flow: wrap;
  box-sizing: border-box;
  .searchInput {
    display: flex;
    align-items: center;
    margin-right: 20px;
    margin-bottom: 20px;
    span {
      width: 20%;
      font-size: 14px;
      font-family: Microsoft YaHei;
      font-weight: 400;
      color: rgba(102, 102, 102, 1);
    }
      .input-number {
          width: 100%;
          .el-input {
              input {
                  height: 39px;
                  text-align: left;
              }
          }
      }
  }
  .searchBtn {
    margin-right: 20px;
    width: 64px;
    height: 32px;
    line-height: 32px;
    text-align: center;
    border: 1px solid rgba(106, 141, 195, 1);
    border-radius: 4px;
    background: rgba(15, 76, 129, 1);
    cursor: pointer;
    span {
      width: 28px;
      height: 12px;
      font-size: 14px;
      font-family: Microsoft YaHei;
      font-weight: 400;
      color: rgba(255, 255, 255, 1);
    }
  }
  .refreshBtn {
    border: 1px solid rgba(106, 141, 195, 1);
    background-color: #fff;
    span {
      color: rgba(106, 141, 195, 1);
    }
    &:hover {
      background-color: #ecf5ff;
    }
  }
}
.el-select {
  width: 100%;
}
.el-input__icon {
  line-height: 32px;
}
</style>