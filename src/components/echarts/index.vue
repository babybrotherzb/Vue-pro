<template>
    <div :class="className" :id='id' :style="{'width':width, 'height': height,'overflow':'hidden','margin':'0 auto'}"></div>
</template>
<script>
import echarts from 'echarts'
export default {
    name: 'echarts_com',
    props: {
        className: {
            type: String,
            default: 'echart'
        },
        id: { // id必须传递
            type: String,
            required: true
        },
        width: {
            type: String,
            default: '100%'
        },
        height: {
            type: String,
            default: '200px'
        },
        option: {  // 不是必须的
            type: Object
        }
    },
    data() {
        return {
            chart: null,
            defaultOption: { // 默认配置
                title: {
                    text: ''
                },
                tooltip: {
                    trigger: 'axis',
                    color: '#333'
                },
                legend: {
                    itemWidth: 10,
                    itemHeight: 10,
                    x: 'center',
                    y: 'bottom'
                },
                grid: {
                    left: '2%',
                    right: '2%',
                    bottom: '3%',
                    containLabel: true
                },
                color: ['#0099ff', '#38afff', '#2bd681', '#5ce68a', '#ffdd00', '#faf446', '#ff6a14', '#ff9214', '#ff4942', '#fa5a55'],
                toolbox: {
                    show: false
                },
                series: []
            }
        }
    },
    mounted() {
        const _this = this
        _this.initChart()
    },
    beforeDestroy() {
        if (!this.chart) {
            return
        }
        this.chart.dispose()
        this.chart = null
    },
    methods: {
        initChart() {
            const _this = this
            if (!this.chart) {
                _this.chart = echarts.init(document.getElementById(_this.id))

                _this.chart.on('legendselectchanged', function (params) {
                    _this.$emit('legendselectchanged', params)
                });
                window.onresize = function() {
                    if (!_this.chart) {
                        return
                    }
                    _this.chart.resize()
                }
            }

            _this.chart.setOption(_this.setOption(_this.option))
            _this.$nextTick(()=>{
                _this.chart.resize();
            })

        },
        setOption(option) {
            const _this = this
            return Object.assign(_this.defaultOption, option)
        }
    },
    watch: {
        option: function() {
            this.initChart()
        }
    }
}
</script>