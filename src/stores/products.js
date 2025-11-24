import { defineStore } from "pinia";
import { ref } from "vue";

export const useProductStore = defineStore('products', () => {
  const API = "http://127.0.0.1:8000"; 
  const products = ref([]);
  const productValue = ref();
  const error = ref('');
  const isLoadingDataset = ref(false);
  const isProcessing = ref(false);

  // ACTIONS
  const fetchProducts = async () => {
    isLoadingDataset.value = true;
    try {
      const res = await fetch(`${API}/products`);
      products.value = await res.json();
    } catch (e) {
      console.error('Error fetching all products:', e); 
      error.value = 'Failed to fetch all products information'; 
    } finally {
      isLoadingDataset.value = false;
    }
  };

  
  const insertProduct = async (newProduct) => {
    isProcessing.value = true; 
    const formattedProduct = {
      ...newProduct,
      name: capitalizeWords(newProduct.name),
      brand: capitalizeWords(newProduct.brand),
      type: capitalizeWords(newProduct.type),
      category: capitalizeWords(newProduct.category), 
    };

    try {
      const res = await fetch(`${API}/products/insert`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        }, 
        body: JSON.stringify(formattedProduct)
      });

      if(!res.ok) {
        const error = await res.text();
        alert('Add new product failed: ' + error);
        return;
      }

      const result = await res.json(); 
      if (result.success) {
        alert('Product added successfully!');
        window.location.reload();
      };
    } catch (e) {
      console.error('An error occured: ', e);
      alert('An error occured: ' + e);
    } finally {
      isProcessing.value = false;
    }
  };


  const updateProduct = async (productDetails) => {
    isProcessing.value = true;
    const formattedProduct = {
      ...productDetails,
      name: capitalizeWords(productDetails.name),
      brand: capitalizeWords(productDetails.brand),
      type: capitalizeWords(productDetails.type),
      category: capitalizeWords(productDetails.category), 
    };

    try {
      const res = await fetch(`${API}/products/update/${productDetails.product_id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        }, 
        body: JSON.stringify(formattedProduct)
      });

      if(!res.ok) {
        const error = await res.text();
        alert('Update product failed: ' + error);
        return;
      }

      const result = await res.json(); 
      if (result.success) {
        alert('Product updated successfully!');
        window.location.reload();
      };
    } catch (e) {
      console.error('An error occured: ', e);
      alert('An error occured: ' + e);
    } finally {
      isProcessing.value = false; 
    }
  };


  const deleteProduct = async (productId) => {
    isProcessing.value = true; 

    try {
      const res = await fetch(`${API}/products/delete/${productId}`, {
        method: 'DELETE'
      });

      if (!res.ok) {
        const error = await res.text();
        alert('Delete product failed: ' + error);
        return;
      }

      const result = await res.json(); 
      if (result.success) {
        alert('Product deleted successfully!');
        window.location.reload();
      } 
    } catch (e) {
      console.error('An error occured during deleting...', e);
      alert('An error occured during deleting...');
    } finally {
      isProcessing.value = false;
    }
  };


  const fetchSingleProduct = async (productId) => {
    isProcessing.value = true;

    try {
      const res = await fetch(`${API}/products/${productId}`, {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' }
      });

      const data = await res.json();
      if (!res.ok) { 
        const error = await res.text();
        alert('Fetch product failed: ' + data?.message);
        return;
      } 

      productValue.value = data;
    } catch (e) {
      console.error('An error occured during fetching...', e);
      alert('An error occured during fetching...'); 
    } finally {
      isProcessing.value = false;
    }
  };


  function capitalizeWords(str) {
    if (!str) return '';
    return str.toLowerCase().split(' ')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');
  }; 


  return { 
    products,
    productValue,
    error,
    isLoadingDataset, 
    isProcessing,
    fetchProducts,
    insertProduct,
    updateProduct,
    deleteProduct,
    fetchSingleProduct
  }
});
