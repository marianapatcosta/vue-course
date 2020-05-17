<template>
<div>
    <h3>Some User Details</h3>
    <p>User loaded has ID: {{id}} </p>
    <router-link 
        tag="button" 
        :to="{ name: 'userEdit', params: { id: $route.params.id}, query: {locale: 'en', q: 100}, hash: '#data' }"
        class="btn btn-primary"
        >
        Edit User
        </router-link>
</div>
</template>
<script>
export default {
    props: ['id'],
    beforeRouteEnter(to, from, next) {
        if (true ) {
            next()            
        } else {
            next (false)
        }

    }
}
</script>