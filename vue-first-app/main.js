const  eventBus = new Vue();

Vue.component('product-review', {
  template: `
    <form class="review-form" @submit.prevent="onSubmit">
      <p v-if="errors.length">
        <b>Please correct the following {{errors.length !== 1 ? "errors" : "error"}}:</b>
        <ul>
          <li v-for="error in errors">{{ error }}</li>
        </ul>
      </p>
      <p>
        <label for="name">Name:</label>
        <input id="name" v-model="name">
      </p>
      <p>
        <label for="review">Review:</label>
        <textarea id="review" v-model="review" ></textarea>
      </p>
      <p>
        <label for="rating">Rating:</label>
        <select id="rating" v-model.number="rating">
          <option>5</option>
          <option>4</option>
          <option>3</option>
          <option>2</option>
          <option>1</option>
        </select>
      </p>
      <p>
      <p>Would you recommend this product?</p>
        <label>Yes</label>
        <input type="radio" name="isRecommended" v-model="isRecommended" value="Yes"/>

        <label >No</label>
        <input type="radio" name="isRecommended" v-model="isRecommended" value="No"/>
      </p>
      <input type="submit" value="Submit"></input>
      </form>
  `,
  data() {
    return {
      name: null,
      review: null,
      rating: null,
      isRecommended: null,
      errors: []
    }
  },
  methods: {
    onSubmit() {
      this.errors = [];
      if (this.name && this.review && this.rating && this.isRecommended) {
        let productReview = {
          name: this.name,
          review: this.review,
          rating: this.rating,
          isRecommended: this.isRecommended
        };
        eventBus.$emit('review-submitted', productReview);
        // to reset after submitting
        this.name = null;
        this.review = null;
        this.rating = null; 
        this.isRecommended = null;       
      } else {
        if(!this.name) this.errors.push("Name required!");
        if(!this.review) this.errors.push("Review required!");
        if(!this.rating) this.errors.push("Rating required!");
        if(!this.isRecommended) this.errors.push("Recommend question required!");
      }
    }
  }
})

Vue.component('product-details', {
  props: {
    details: Array
    },
    template: `
        <div>    
            <p>Details:</p>
            <ul>
              <li v-for="detail in details">{{ detail }}</li>
            </ul>
        </div>`
})

Vue.component("product", {
    props: {
        premium: {
            type: Boolean,
            required: true
        }
    },
  template: ` 
      <div class="product">
        <div class="product-image">
          <img :src="image" />
          <a v-bind:href="link">Google</a>
        </div>

        <div class="product-info">
          <h1>{{ title }}</h1>
          <p v-if="inStock">In Stock</p>
         <!--  <p v-else-if="inventory <= 10 && inventory > 0">Almost sold out</p> -->
         <!--  <p v-else :style="{textDecoration: 'line-through'}">Out Stock</p> -->
          <p v-else :class="{strikeThroughText: !inStock}">Out Stock</p>
           
          <info-tabs :shipping="shipping" :details="details"></info-tabs>
          
          <p v-show="onSale">On Sale</p>
          <p>{{ description }}</p>
                  
          <p>Variant:</p>
          <div
            v-for="(variant, index) in variants"
            :key="variant.id"
            class="color-box"
            :style="{ backgroundColor: variant.variantColor}"
            @mouseover="updateImage(index)"
          ></div>

          <button v-on:click="addToCart()" 
                  :disabled="!inStock"
                  :class="{disabledButton: !inStock}"
            >
                  Add to Cart
          </button>
          <button @click="removeFromCart" 
                  :disabled="inventory === 0"
                  :class=" {disabledButton: inventory === 0}"
                  >
                  Remove from Cart
            </button>       
        </div>

        <product-tabs :reviews="reviews"></product-tabs>      
        </div>`,
  data() {
    return {
      brand: "Vue Mastery",
      product: "Socks",
      isPremium: false,
      description: "Impermeable socks!",
      selectedVariant: 0,
      link: "https://www.google.pt/",
      inventory: 14,
      onSale: true,
      details: ["80% cotton", "20% polyester", "Gender-neutral"],
      variants: [
        {
          variantId: "1233",
          variantColor: "green",
          variantImage: "./images/vmSocks.jpg",
          variantQuantity: 10
        },
        {
          variantId: "1258",
          variantColor: "blue",
          variantImage: "./images/vmSocks-blue.jpg",
          variantQuantity: 0
        }
      ],
      reviews: []     
    };
  },
  methods: {
    addToCart() {
      // onS is the name of the emitted event; we also emit the id to the parent
      this.$emit('add-to-cart', this.variants[this.selectedVariant].variantId);
    },
    updateImage(index) {
      this.selectedVariant = index;
    },
    removeFromCart() {
        this.$emit('remove-from-cart', this.selectedVariant);
    },
    isInStock() {
      return this.inventory === 0 ? false : true;
    }
  },
  // computer properties update every time a part that composes it changes; are cached until properties change -
  // more efficient as don t run every time we process
  computed: {
    title() {
      return `${this.brand} ${this.product}`;
    },
    image() {
      return this.variants[this.selectedVariant].variantImage;
    },
    inStock() {
      return this.variants[this.selectedVariant].variantQuantity > 0
        ? true
        : false;
    },
    onSaleString() {
      return this.onSale ? `${this.brand} ${this.product}` : undefined;
    },
    shipping() {
        return this.premium ? 'Free' : '$2.99';
    },   
  },
  mounted() {
    eventBus.$on('review-submitted', productReview => {
      this.reviews.push(productReview);
    })
  }
});

    
Vue.component('product-tabs', { 
  props: {
    reviews: {
      type: Array,
      required: true
    },
  },
  template: `
    <div> 
      <span 
        class="tab"
        :class="{ activeTab: selectedTab === tab }" 
        v-for="(tab, index) in tabs" 
        :key="index"
        @click="selectedTab = tab"
      >
        {{ tab }}
      </span>

      <div v-show="selectedTab === 'Reviews'">
     
        <p v-if="!reviews.length">There are no reviews yet!</p>
        <ul> 
          <li v-for="review in reviews">
            <p>{{review.name}}</p>
            <p>Rating: {{review.rating}}</p>
            <p>{{review.review}}</p>
          </li>
        </ul>
      </div>
      <product-review          
          v-show="selectedTab === 'Make a Review'"
          ></product-review>
    </div>`,
    data() {
      return {
        tabs: ['Reviews', 'Make a Review'],
        selectedTab: 'Reviews'       
      }
    }
});

Vue.component('info-tabs', {
  props: {
    shipping: String,
    details: Array
  },
  template: `
  <div>
    <span 
      class="tab"
      :class="{ activeTab: selectedTab === tab }" 
      v-for="(tab, index) in tabs"
      :key="index"
      @click="selectedTab = tab"
      >
        {{tab}} 
      </span>
    <p v-show="selectedTab === 'Shipping'">Shipping: {{shipping}}</p>

    <product-details :details=details
        v-show="selectedTab === 'Product Details'"
    ></product-details>
    </div>
  `,
  data () {
    return {
      tabs: ['Shipping', 'Product Details'],
      selectedTab: 'Shipping'
    }
  }
});

const app = new Vue({
  el: "#app",
  data: {
    isPremium: false,
    cart: []
  },
  computed: {
      
  },
  methods: {
      updateAddCart(id) {
        this.cart.push(id);
      },
      updateRemoveCart(index) {
        this.cart.splice(index, 1);
      },
  }
});
