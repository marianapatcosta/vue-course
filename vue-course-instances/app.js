const vm1 = new Vue({

  data: {
    title: 'The VueJS Instance',
    showParagraph: false
  },
  methods: {
    show: function() {
      this.showParagraph = true;
      this.updateTitle('The VueJS Instance (Updated)');
      console.log(this.$refs.myButton.innerText = 'Test')
    },
    updateTitle: function(title) {
      this.title = title;
    }
  },
  computed: {
    lowercaseTitle: function() {
      return this.title.toLowerCase();
    }
  },
  watch: {
    title: function(value) {
      alert('Title changed, new value: ' + value);
    }
  }
}); 

vm1.$mount('#app')
 vm1.newProp  = 'New';
 vm1.$refs.heading.innerText = 'Something else'
 console.log(vm1)


setTimeout(() =>{
  vm1.title = 'Changed by the timer'
}, 3000)

const vm2 = new Vue({
  el: "#app1",
  data: {
    title: 'The Second VueJS Instance'
  },
  methods: {
    onChange(){
      vm1.title = 'Changed!'
    }
  }
})

const vm3 = new Vue({
  template:`<h1>Hello!</h1>`
})
/* vm3.$mount('#app3'); */

vm3.$mount();

document.getElementById('app3').appendChild(vm3.$el);

new Vue({
  el: "#app4",
  data: {
    title: 'title'
  },
  beforeCreate: function() {
  	console.log('beforeCreate()');
  },
  created: function() {
  	console.log('created()');
  },
  beforeMount: function() {
  	console.log('beforeMount()');
  },
  mounted: function() {
  	console.log('mounted()');
  },
  beforeUpdate: function() {
  	console.log('beforeUpdate()');
  },
  updated: function() {
  	console.log('updated()');
  },
  beforeDestroy: function() {
  	console.log('beforeDestroy()');
  },
  destroyed: function() {
  	console.log('destroyed()');
  },
  methods: {
  	destroy: function() {
    	this.$destroy();
    }
  }
})
