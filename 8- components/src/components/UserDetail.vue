<template>
    <div class="component">
        <h3>You may view the User Details here</h3>
        <p>Many Details</p>
        <p>User Name: {{switchName()}}</p>
        <p>User Age: {{userAge}}</p>
        <button @click="resetName">Reset Name</button>
        <button @click="resetFn()">Reset Name</button>
    </div>
</template>

<script>
import { eventBus } from '../main';
export default {
    props: {
        name: {
            type: String,
            default: 'Louis',
           
        },
        userAge: Number,
        resetFn: Function
    },
    methods: {
        switchName() {
            return this.name.split("").reverse().join("")
        },
        resetName() {
            this.name = 'David';
            this.$emit('nameWasReset', this.name);
        }
    },
    mounted () {
        eventBus.$on('ageEdited', (age) => {
            this.userAge = age
        })
    }
} 
</script>

<style scoped>
    div {
        background-color: lightcoral;
    }
</style>
