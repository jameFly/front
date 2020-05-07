
<script>
    export default {
        name: "baseBar",
        props: {
            title: String,
        },
        render(h) {
            const { title } = this.props;

            return (
                <div class="t-title-bar">
                    <span></span>
                    <h3>{title}</h3>
                </div>
            )
        }
    }
</script>

<style lang="scss">
.t-title-bar{
    height:30px;
    padding: 5px 0;
    margin-top: 8px;
    margin-bottom: 8px;
    & span {
        float: left;
        height: 14px;
        line-height: 20px;
        border: 2px;
        margin-right: 8px;
        margin-top: 3px;
    }
    & .sp-border {
        border:  2px solid #5e7bf7;
    }
    & h3 {
        margin-bottom: 0;
        font-size: 14px;
        font-weight: 700;
        line-height: 20px;
        color: #35383f;
    }
}
</style>