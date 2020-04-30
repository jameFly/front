
<script>
export default {
  name: "baseModal",
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
    isCustomAdd: Boolean,
    title: String,
    dialogVisible: Boolean,
    addModalData: {
      type: Object,
      default: () => {}
    },
    rules: {
      type: Object,
      default: () => {}
    },
    materialNameList: {
      type: Array,
      default: () => []
    },
    isRules: {
      type: Boolean,
      default: false
    },
    formRef: String
  },
  methods: {
    renderFormItem(item) {
      const { addModalData, searchWidth } = this;
      const {
        type,
        label,
        prop,
        hidden,
        placeholder,
        buttonList,
        handleClick,
        options,
        icon
      } = item;
      if (item.type === "input") {
        return (
          <el-form-item label={label} hidden={hidden} prop={prop}>
            <el-input
              v-model={addModalData[prop]}
              placeholder={placeholder}
            ></el-input>
          </el-form-item>
        );
      } else if (item.type === "inputNumber") {
        return (
          <el-form-item label={label} hidden={hidden} prop={prop}>
            <el-input-number
              class="input-number"
              v-model={addModalData[prop]}
              placeholder={placeholder}
              min={0}
              controls-position="right"
            ></el-input-number>
          </el-form-item>
        );
      } else if (item.type === "inputTextarea") {
        return (
          <el-form-item label={label} hidden={hidden} prop={prop}>
            <el-input
              v-model={addModalData[prop]}
              placeholder={placeholder}
              type="textarea"
              rows={5}
              //autosize="{ minRows: 5, maxRows: 10}"
            ></el-input>
          </el-form-item>
        );
      } else if (item.type === "select") {
        return (
          <el-form-item label={label} prop={prop}>
            <el-select v-model={addModalData[prop]} placeholder={placeholder}>
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
          </el-form-item>
        );
      } else if (item.type === "selectMultiple") {
        return (
          <el-form-item label={label} prop={prop}>
            <el-select
              v-model={addModalData[prop]}
              multiple={true}
              placeholder={placeholder}
            >
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
          </el-form-item>
        );
      }
    },
    renderCustomFormItem({ item, index, len, reduce, onValueChange }) {
      const { materialNameList } = this;
      const isShowReduce = len > 1;
      const { id, nutrientName, components } = item;
      return (
        <el-row class="input-customer-content">
          <el-col span={4}>{`第${index + 1}种食材`}</el-col>
          <el-col span={8}>
            <el-select
              class="input-nutrientName"
              v-model={this.addCustomData[index]["nutrientName"]}
              placeholder={"请选择"}
              on-change={value => onValueChange(value, index, "nutrientName")}
            >
              {materialNameList.length &&
                materialNameList.map((item, itemIndex) => {
                  return (
                    <el-option
                      key={index + "-" + itemIndex}
                      label={item.label}
                      value={item.value}
                      disabled={item.disabled}
                    ></el-option>
                  );
                })}
            </el-select>
          </el-col>
          <el-col span={8}>
            <el-input-number
              v-model={this.addCustomData[index]["components"]}
              class="input-components"
              placeholder={"请输入"}
              controls-position="right"
              min={0}
              max={100}
              on-blur={e => onValueChange(e.target.value, index, "components")}
            ></el-input-number>
          </el-col>
          <el-col span={4} class="input-reduce">
            {isShowReduce && (
              <i
                class="el-icon-remove-outline fontSize20"
                on-click={() => reduce(index)}
              />
            )}
          </el-col>
        </el-row>
      );
    },
    onOk() {
      let fields = [
        { label: "foodName", name: "菜品名" },
        { label: "seasons", name: "时令" },
        { label: "price", name: "价格" },
        { label: "weight", name: "菜品克重" }
      ];
      //let val = "添加菜品";
      this.$emit("addModalData", fields);
    },
    onCancel() {
      this.$emit("cancelModalData");
    },
    addCustomDataList() {
      this.$emit("handleAddCustomDataList");
    },
    reduce(index) {
      this.$emit("reduceAddCustomDataList", index);
    },
    onValueChange(value, index, name) {
      this.$emit("onValueChange", { value, index, name });
    }
  },
  render(h) {
    const {
      addData,
      renderFormItem,
      title,
      dialogVisible,
      addModalData,
      isCustomAdd,
      addCustomData,
      renderCustomFormItem,
      reduce,
      onValueChange,
      formRules,
      formRef,
      inline
    } = this;
    return (
      <div>
        <div>
          <el-dialog
            title={title}
            visible={dialogVisible}
            on-close={this.onCancel}
          >
            <el-form
              label-width="80px"
              ref={formRef}
              rules={formRules}
              {...{ props: { model: addModalData } }}
            >
              {addData.map(item => {
                return renderFormItem(item);
              })}
              {isCustomAdd && (
                <el-row class="customer-title">
                  <el-col span={4} class="customer-title-top left">
                    食材及含量
                  </el-col>
                  <el-col span={8} class="customer-title-top left">
                    食材
                  </el-col>
                  <el-col span={8} class="customer-title-top left">
                    含量
                  </el-col>
                  <el-col span={4} class="customer-title-top center">
                    <el-button
                      icon="el-icon-plus"
                      on-click={this.addCustomDataList}
                    />
                  </el-col>
                </el-row>
              )}
              {isCustomAdd &&
                addCustomData.map((item, index) => {
                  return renderCustomFormItem({
                    len: addCustomData.length,
                    item,
                    index,
                    reduce,
                    onValueChange
                  });
                })}
              <div class="modal-button">
                <el-button on-click={this.onCancel}>取消</el-button>
                <el-button type="primary" on-click={this.onOk}>
                  确定
                </el-button>
              </div>
            </el-form>
          </el-dialog>
        </div>
      </div>
    );
  },
  computed: {
    formRules() {
      if (!this.isRules) return null;
      let rules = {};
      if (this.addData && this.addData.length) {
        this.addData.forEach(ele => {
          if (ele.inRule) {
            let obj = {};
            rules[ele.prop] = [
              {
                ...obj,
                required: true,
                message: ele.message,
                trigger:
                  ele.type === "input" ||
                  ele.type === "textarea" ||
                  ele.type === "inputNumber"
                    ? "blur"
                    : "change"
              }
            ];
          }
        });
      }
      return rules;
    }
  }
};
</script>

<style lang="scss">
.input-number {
  width: 100%;
  .el-input {
    input {
      height: 39px;
      text-align: left;
    }
  }
}
.customer-title {
  margin-left: 80px;
  margin-bottom: 10px;
  .customer-title-top {
    height: 40px;
    text-align: left;
    line-height: 40px;
  }
  .left {
    text-align: left;
  }
  .center {
    text-align: center;
  }
}
.input-customer-content {
  margin-left: 80px;
  height: 50px;
  line-height: 50px;
  text-align: left;
  .input-nutrientName {
    width: 120px;
    margin: 0;
  }
  .input-components {
    margin: 0;
    width: 120px;
    .el-input {
      input {
        height: 39px;
        text-align: left;
      }
    }
  }
  .input-reduce {
    text-align: center;
    .fontSize20 {
      font-size: 20px;
      color: red;
    }
  }
}
.modal-button {
  margin-top: 10px;
  height: 50px;
  line-height: 50px;
  text-align: right;
}
</style>