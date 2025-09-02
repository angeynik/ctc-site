<template>
    <div class="select-component" @click="navigate">
        <h1> AppEngineeringSystems</h1>
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

<style>

</style>