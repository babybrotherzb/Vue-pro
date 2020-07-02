<template>
    <div>
        <el-calendar v-model="value"></el-calendar>
        <v-car></v-car>
    </div>
</template>

<script>
import vCar from './shopcar'
    export default {
        components:{
            vCar
        },
        data() {
            return {
                value: new Date()
            }
        }
    }
</script>

<style lang="less" scoped>

</style>