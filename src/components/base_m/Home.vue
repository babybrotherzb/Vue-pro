<template>
    <div class="wrapper">
        <v-head></v-head>
        <div>
            <transition name="move" mode="out-in">
                <router-view></router-view>
            </transition>
        </div>
    </div>
</template>

<script>
    import vHead from './Header';
    export default {
        data() {
            return {
                
            }
        },
        components:{
            vHead
        },
        methods: {
            
        },
        mounted(){
            
        }
    
    }
</script>
<style lang="less">
</style>

