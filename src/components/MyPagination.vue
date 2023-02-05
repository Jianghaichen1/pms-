// 公共组件分页
<template>
    <div style="text-align: center;margin:20px;">
        <el-pagination background layout="total,prev, pager, next,jumper" 
         :total="total" :page-size="pageSize" @current-change="changePage">
         <!-- @current-change点击事件 -->
        </el-pagination>
    </div>
</template>

<script>
    
    export default{
        props:{
            total:{
                type:Number,
                default:100
            },
            pageSize:{
                type:Number,
                default:10
            }
        },
        methods:{
            changePage(page){
                this.$emit('changePage',page)
            }
        }
    };
</script>

<style>
</style>