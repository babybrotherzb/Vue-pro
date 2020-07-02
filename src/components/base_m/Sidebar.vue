<template>
    <div class="sidebar" :style="{width:layout}">
        <slot name="content"></slot>
    </div>
</template>

<script>
     export default {
        props:{
            layout:{
                type:String,
                default:'300px'
            }
        }
    }    
</script>

<style scoped lang='less' rel='stylesheet/less'>
</style>
<style lang='less' rel='stylesheet/less'>
</style>
