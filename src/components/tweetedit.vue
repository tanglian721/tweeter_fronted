<template>
    <div class="tweet-edit">
        <div v-if="ifedit" class="editarea">
            edit
        </div>
        <button @click="ifedit =! ifedit" >edit</button>
    </div>
</template>

<script>
    export default {
        name:'tweetedit',
        data() {
            return {
                ifedit: false
            }
        },
    }
</script>

<style lang="scss" scoped>
.tweet-edit{
    .editarea{
        box-sizing: border-box;
        width: 80%;
        min-height: 30vh;
        position: fixed;
        background-color: #fff;
        left: 10%;
        top: 30vh;
        border-radius: 30px;
        filter: drop-shadow(0 0 15px rgba(0, 0, 0, 0.788));
    }
}

</style>