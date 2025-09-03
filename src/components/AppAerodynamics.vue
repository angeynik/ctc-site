<template>
    <div class="landing-component" @click="navigate">
        <h1> AppAerodynamics </h1>
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