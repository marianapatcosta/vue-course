<template>
    <div class="component">
        <h3>You may edit the User here</h3>
        <p>Edit me!</p>
           <p>User Age: {{age}}</p>
        <button @click="editAge">Edit Age</button>
    </div>
</template>

<script>
import {eventBus} from '../main';
export default {
    props: {
        age: Number
    }, 
    methods: {
        editAge() {
            this.age = 30;
            //this.$emit('ageEdited', this.age)
            //eventBus.$emit('ageEdited', this.age)
            eventBus.changeAge(this.age)
        }
    }
}
</script>

<style scoped>
    div {
        background-color: lightgreen;
    }
</style>
