import { defineStore } from "pinia";
import { computed, ref } from "vue";

export const useCartItemStore = defineStore('cart-items', () => {
  const API = "http://127.0.0.1:8000";  
  const error = ref(''); 
  const isLoadingCartItems = ref(false);
  const isWorking = ref(false);
  const cartItems = ref([]);
  const cartLength = computed(() => {
    return cartItems.value.reduce((total, item) => total + item.quantity, 0);
  });

  
  // ACTIONS
  const fetchCartItems = async (userId) => {
    isLoadingCartItems.value = true;
    try { 
      const res = await fetch(`${API}/cart/items/${userId}`, {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' }
      });

      cartItems.value = await res.json();
    } catch (e) {
      console.error('Error fetching cart items:', e); 
      error.value = 'Failed to fetch cart items'; 
    } finally {
      isLoadingCartItems.value = false;
    }
  };
 

  const insertCartItem = async (userId, productId, color, size) => {
    isWorking.value = true;  

    if (!color || !size || !userId || !productId) {
      alert('Invalid cart item.');
      return;
    };

    const cartRequest = { userId, productId, color, size };

    try {
      const res = await fetch(`${API}/cart/items/insert`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        }, 
        body: JSON.stringify(cartRequest)
      });

      if(!res.ok) {
        const error = await res.text();
        alert('Add new cart item failed: ' + error);
        return;
      };

    } catch (e) {
      console.error('An error occured: ', e);
      alert('An error occured: ' + e);
    } finally {
      isWorking.value = false;
    }
  };


  const actionCartQuantity = async (userId, cartId, action) => { 
    if (!cartId || !action || !userId) {
      console.error('Invalid action/data.');
      return false;
    } else {
      console.log(action)
    };

    try {
      const res = await fetch(`${API}/cart/items/action`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        }, 
        body: JSON.stringify({userId, cartId, action})
      });

      if(!res.ok) {
        const errorText = await res.text();
        console.error('Action failed: ' + errorText);
        return false;
      };

      const data = await res.json();
      
      if (data) {
        const cartIndex = cartItems.value.findIndex(c => c.cart_id === cartId);
        if (cartIndex !== -1) {
          cartItems.value[cartIndex] = {
            ...cartItems.value[cartIndex], 
            quantity: data.quantity
          };
        };
      };

      return true;

    } catch (e) {
      console.error('An error occured: ', e);
      return false;
    } 
  };
 

  const removeCartItem = async (cartId) => {
    isWorking.value = true; 

    try {
      const res = await fetch(`${API}/cart/items/delete/${cartId}`, {
        method: 'DELETE'
      });

      if (!res.ok) {
        const error = await res.text();
        alert('Delete cart item failed: ' + error);
        return;
      };
      
    } catch (e) {
      console.error('An error occured during removing...', e);
      alert('An error occured during removing...');
    } finally {
      isWorking.value = false;
    }
  }; 



  return { 
    error,
    cartLength,
    isLoadingCartItems,  
    isWorking,
    cartItems,
    fetchCartItems,
    insertCartItem,
    actionCartQuantity,
    removeCartItem
  }
});