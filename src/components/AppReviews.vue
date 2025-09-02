<template>
    <div class="select-component" @click="navigate">
        <h1> App reviews </h1>
    </div>
</template>

<script>
export default {
        methods: {
        navigate() {
            this.$emit('navigate');
        }
    }
}
</script>

<style lang="css" src="@/assets/style.css"></style>