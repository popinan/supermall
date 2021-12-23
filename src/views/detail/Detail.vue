<template>
  <div>{{id}}</div>
</template>

<script>
export default {
    data () {
        return {
            id: null
        }
    },
    activated () {
        this.id= this.$route.query.id
    }
}
</script>

<style>

</style>