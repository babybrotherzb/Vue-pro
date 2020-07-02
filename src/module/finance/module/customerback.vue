<template>
    <div class="g-container customerback">
        <div class="title font_20">
            <span class="dot g-fl"></span>
            &ensp;客户回款数据
        </div>
        <div class="cleanfloat pd-20">
            <el-autocomplete
                v-model="state"
                :fetch-suggestions="querySearchAsync"
                placeholder="公司名称"
                @select="handleSelect"
            ></el-autocomplete>

            <el-button class="g-fr" @click="newBack" type="primary">新增回款</el-button>
        </div>

        <div class="th-gray-table">
            <el-table
                :data="tableData"
                style="width: 100%"
                >
                <el-table-column
                prop="complany"
                label="客户公司"
                >
                </el-table-column>
                <el-table-column
                prop="money"
                label="尚未核销金额"
                >
                </el-table-column>
                <el-table-column
                label="操作">
                <template slot-scope="scope">
                    <a @click="historyRecord">历史记录</a>
                </template>
                </el-table-column>
            </el-table>
        </div>

        <div class="pagination">
            <template>
                <el-pagination
                    @current-change="handleCurrentChange"
                    layout="total,prev, pager, next, jumper"
                    :total="total"
                    :current-page="listQuery.page"
                    :page-size="listQuery.page_size">
                </el-pagination>
            </template>
        </div>

        <el-dialog
            title="新增回款"
            :visible.sync="dialogVisible"
            width="30%"
            >
            <el-form ref="form" :model="form" label-width="80px">
                <el-form-item label="客户公司">
                    <el-input v-model="form.name"></el-input>
                </el-form-item>
                <el-form-item label="回款金额">
                    <el-input v-model="form.name"></el-input>
                </el-form-item>
                <el-form-item label="回款时间">
                    <el-input v-model="form.name"></el-input>
                </el-form-item>
                <el-form-item label="收款账户">
                    <el-input v-model="form.name"></el-input>
                </el-form-item>
                <el-form-item label="账户类型">
                    <el-input v-model="form.name"></el-input>
                </el-form-item>
                <el-form-item label="所属组">
                    <el-input v-model="form.name"></el-input>
                </el-form-item>
            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button @click="dialogVisible = false">取 消</el-button>
                <el-button type="primary" @click="dialogVisible = false">保 存</el-button>
            </span>
        </el-dialog>



        <el-dialog
            title="新增回款"
            :visible.sync="dialogVisible1"
            width="800px"
            >
            <div slot="title">
                <span>历史记录</span>
                <span>客户：北京一招科技有限公司</span>
            </div>
            <template>
                <el-tabs v-model="activeName" @tab-click="handleClick">
                    <el-tab-pane label="待核销资金变更" name="first">
                        <el-form :inline="true" :model="waitChange" class="demo-form-inline" size="mini">
                            <el-form-item label="类型">
                                <el-input v-model="waitChange.id" placeholder="排期ID"></el-input>
                            </el-form-item>
                            <el-form-item label="时间">
                                <el-date-picker
                                    v-model="waitChange.date"
                                    type="daterange"
                                    range-separator="至"
                                    start-placeholder="开始日期"
                                    end-placeholder="结束日期">
                                </el-date-picker>
                            </el-form-item>
                        </el-form>

                        <div class="th-gray-table">
                            <el-table
                                :data="tableData1"
                                style="width: 100%"
                                >
                                <el-table-column
                                prop="id_time"
                                label="流水号 | 时间"
                                >
                                </el-table-column>
                                <el-table-column
                                prop="money"
                                label="金额（元）"
                                >
                                </el-table-column>
                                <el-table-column
                                prop="type"
                                label="类型"
                                >
                                </el-table-column>
                                <el-table-column
                                prop="has_money"
                                label="剩余可核销金额（元）"
                                >
                                </el-table-column>
                                <el-table-column
                                prop="record"
                                label="备注">
                                </el-table-column>
                            </el-table>
                        </div>
                    </el-tab-pane>
                    <el-tab-pane label="核销记录" name="second">
                        <el-form :inline="true" :model="waitChange" class="demo-form-inline" size="mini">
                            <el-form-item label="ID">
                                <el-input v-model="waitChange.id" placeholder="排期ID"></el-input>
                            </el-form-item>
                            <el-form-item label="时间">
                                <el-date-picker
                                    v-model="waitChange.date"
                                    type="daterange"
                                    range-separator="至"
                                    start-placeholder="开始日期"
                                    end-placeholder="结束日期">
                                </el-date-picker>
                            </el-form-item>
                        </el-form>

                        <div class="th-gray-table">
                            <el-table
                                :data="tableData1"
                                style="width: 100%"
                                >
                                <el-table-column
                                prop="id_time"
                                label="操作时间"
                                >
                                </el-table-column>
                                <el-table-column
                                prop="money"
                                label="核销排期数"
                                >
                                </el-table-column>
                                <el-table-column
                                prop="type"
                                label="核销总额"
                                >
                                </el-table-column>
                                <el-table-column
                                prop="has_money"
                                label="核销人"
                                >
                                </el-table-column>
                                <el-table-column
                                prop="record"
                                type="expand"
                                label="操作">
                                    <template slot-scope="scope">
                                        <a>排期详情</a>
                                    </template>
                                    <template slot-scope="props">
                                        <div>
                                            e3242332
                                        </div>
                                    </template>
                                </el-table-column>
                            </el-table>
                        </div>
                    </el-tab-pane>
                    <el-tab-pane label="回款记录" name="third">
                        <el-form :inline="true" :model="waitChange" class="demo-form-inline" size="mini">
                            <el-form-item label="时间">
                                <el-date-picker
                                    v-model="waitChange.date"
                                    type="daterange"
                                    range-separator="至"
                                    start-placeholder="开始日期"
                                    end-placeholder="结束日期">
                                </el-date-picker>
                            </el-form-item>
                        </el-form>

                        <div class="th-gray-table">
                            <el-table
                                :data="tableData1"
                                style="width: 100%"
                                >
                                <el-table-column
                                prop="id_time"
                                label="流水号 | 时间"
                                >
                                </el-table-column>
                                <el-table-column
                                prop="money"
                                label="金额（元）"
                                >
                                </el-table-column>
                                <el-table-column
                                prop="type"
                                label="类型"
                                >
                                </el-table-column>
                                <el-table-column
                                prop="has_money"
                                label="剩余可核销金额（元）"
                                >
                                </el-table-column>
                                <el-table-column
                                prop="record"
                                label="备注">
                                </el-table-column>
                            </el-table>
                        </div>
                    </el-tab-pane>
                </el-tabs>
            </template>
            <span slot="footer" class="dialog-footer">
                <el-button @click="dialogVisible1 = false">取 消</el-button>
                <el-button type="primary" @click="dialogVisible1 = false">保 存</el-button>
            </span>
        </el-dialog>
    </div>
</template>

<script>
    export default{
        data() {
            return {
                state: '',
                form:{
                    name:''
                },
                activeName:'first',
                dialogVisible:false,
                dialogVisible1:false,
                total:1,
                waitChange:{
                    id:'',
                    date:''
                },
                listQuery:{
                    page:1,
                    page_size:10
                },
                tableData:[
                    {
                        complany:'北京一招科技有限公司',
                        money:'￥8800.00',
                    },
                    {
                        complany:'北京一招科技有限公司',
                        money:'￥8800.00',
                    },
                    {
                        complany:'北京一招科技有限公司',
                        money:'￥8800.00',
                    },
                    {
                        complany:'北京一招科技有限公司',
                        money:'￥8800.00',
                    }
                ],
                tableData1:[
                    {
                        id_time:'66789882 | 2019-5-6 08:12:00',
                        money:'+8000.00',
                        type:'撤销回款排期',
                        has_money:'8800.00',
                        record:'撤销5个排期',
                    },
                    {
                        id_time:'66789882 | 2019-5-6 08:12:00',
                        money:'+8000.00',
                        type:'撤销回款排期',
                        has_money:'8800.00',
                        record:'撤销5个排期',
                    },
                    {
                        id_time:'66789882 | 2019-5-6 08:12:00',
                        money:'+8000.00',
                        type:'撤销回款排期',
                        has_money:'8800.00',
                        record:'撤销5个排期',
                    },
                    {
                        id_time:'66789882 | 2019-5-6 08:12:00',
                        money:'+8000.00',
                        type:'撤销回款排期',
                        has_money:'8800.00',
                        record:'撤销5个排期',
                    },
                    {
                        id_time:'66789882 | 2019-5-6 08:12:00',
                        money:'+8000.00',
                        type:'撤销回款排期',
                        has_money:'8800.00',
                        record:'撤销5个排期',
                    },
                ]
            }
        },
        methods: {
            querySearchAsync(queryString) {
                console.log(queryString)
            },
            handleSelect(){

            },
            handleCurrentChange(){

            },
            newBack(){
                this.dialogVisible=true;
            },
            handleClick(){

            },
            historyRecord(){
                this.dialogVisible1=true
            }

        },
        mounted () {
            
        },
        
    }
</script>

<style scoped lang='less' rel='stylesheet/less'>
    
    .customerback{
        overflow:hidden;
        .dot {
            width: 1px;
            height: 23px;
            background: #409eff;
            border-radius: 2px;
            border: 2px solid #409eff;
        }
        .font_20 {
            font-size: 20px;
            font-weight: 600;
        }
        .title{
            display:flex;
            align-items:center;
        }
        .cleanfloat:after{
            display: block;
            clear:both;
            height:0;
            content: "";
            visibility: hidden;
            overflow:hidden;
        }
        .pd-20{
            padding:20px 0;
        }
    }
    
</style>