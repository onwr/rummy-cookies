const API_BASE_URL = 'http://localhost:3000/api';

// API istekleri için yardımcı fonksiyonlar
const apiRequest = async (endpoint, options = {}) => {
  const url = `${API_BASE_URL}${endpoint}`;
  
  const config = {
    credentials: 'include', // Cookie'leri dahil et
    headers: {
      'Content-Type': 'application/json',
      ...options.headers,
    },
    ...options,
  };

  // JWT token varsa header'a ekle
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  try {
    const response = await fetch(url, config);
    
    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      const errorMessage = errorData.message || errorData.details || `HTTP error! status: ${response.status}`;
      throw new Error(errorMessage);
    }
    
    return await response.json();
  } catch (error) {
    console.error('API request error:', error);
    throw error;
  }
};

// GET isteği
export const apiGet = (endpoint, params = {}) => {
  const queryString = new URLSearchParams(params).toString();
  const url = queryString ? `${endpoint}?${queryString}` : endpoint;
  return apiRequest(url, { method: 'GET' });
};

// POST isteği
export const apiPost = (endpoint, data = {}) => {
  return apiRequest(endpoint, {
    method: 'POST',
    body: JSON.stringify(data),
  });
};

// PUT isteği
export const apiPut = (endpoint, data = {}) => {
  return apiRequest(endpoint, {
    method: 'PUT',
    body: JSON.stringify(data),
  });
};

// DELETE isteği
export const apiDelete = (endpoint) => {
  return apiRequest(endpoint, { method: 'DELETE' });
};

// Auth API servisleri
export const authAPI = {
  // Kullanıcı kayıt
  register: (userData) => apiPost('/auth/register', userData),
  
  // Kullanıcı giriş
  login: (credentials) => apiPost('/auth/login', credentials),
  
  // Profil getir
  getProfile: () => apiGet('/auth/profile'),
  
  // Profil güncelle
  updateProfile: (profileData) => apiPut('/auth/profile', profileData),
  
  // Şifre değiştir
  changePassword: (passwordData) => apiPut('/auth/change-password', passwordData),
  
  // Çıkış
  logout: () => apiPost('/auth/logout'),
};

// Ürün API servisleri
export const productAPI = {
  // Tüm ürünleri getir
  getAll: (params = {}) => apiGet('/products', params),
  
  // Öne çıkan ürünleri getir
  getFeatured: (params = {}) => apiGet('/products/featured', params),
  
  // Çok satan ürünleri getir
  getBestsellers: (params = {}) => apiGet('/products/bestsellers', params),
  
  // Yeni ürünleri getir
  getNew: (params = {}) => apiGet('/products/new', params),
  
  // ID ile ürün getir
  getById: (id, params = {}) => apiGet(`/products/${id}`, params),
  
  // Slug ile ürün getir
  getBySlug: (slug, params = {}) => apiGet(`/products/slug/${slug}`, params),
};

// Kategori API servisleri
export const categoryAPI = {
  // Tüm kategorileri getir
  getAll: (params = {}) => apiGet('/categories', params),
  
  // Kategori özeti getir
  getSummary: (params = {}) => apiGet('/categories/summary', params),
  
  // ID ile kategori getir
  getById: (id, params = {}) => apiGet(`/categories/${id}`, params),
  
  // Slug ile kategori getir
  getBySlug: (slug, params = {}) => apiGet(`/categories/slug/${slug}`, params),
  
  // Kategoriye ait ürünleri getir
  getProducts: (id, params = {}) => apiGet(`/categories/${id}/products`, params),
};

// Sepet API servisleri
export const cartAPI = {
  // Sepete ürün ekle
  add: (itemData) => apiPost('/cart/add', itemData),
  
  // Sepeti getir
  get: (params = {}) => apiGet('/cart', params),
  
  // Ürün miktarını güncelle
  updateQuantity: (data) => apiPost('/cart/update-quantity', data),
  
  // Ürünü sepetten kaldır
  remove: (data) => apiPost('/cart/remove', data),
  
  // Sepeti temizle
  clear: () => apiPost('/cart/clear'),
};

// Favoriler API servisleri
export const wishlistAPI = {
  // Favorilere ürün ekle
  add: (data) => apiPost('/wishlist/add', data),
  
  // Favorilerden ürün çıkar
  remove: (data) => apiPost('/wishlist/remove', data),
  
  // Favorileri listele
  get: (params = {}) => apiGet('/wishlist', params),
  
  // Favorileri temizle
  clear: () => apiPost('/wishlist/clear'),
  
  // Ürün favorilerde mi kontrol et
  checkStatus: (productId) => apiGet(`/wishlist/check?product_id=${productId}`),
};

// Sipariş API servisleri
export const orderAPI = {
  // Sipariş oluştur
  create: (orderData) => apiPost('/orders', orderData),
  
  // Kullanıcı siparişlerini getir
  getUserOrders: (params = {}) => apiGet('/orders', params),
  
  // Sipariş detayını getir
  getById: (id) => apiGet(`/orders/${id}`),
  
  // Sipariş durumunu güncelle (admin)
  updateStatus: (id, statusData) => apiPut(`/orders/${id}/status`, statusData),
  
  // Sipariş iptal et
  cancel: (id) => apiDelete(`/orders/${id}`),
};

// Özel sipariş API servisleri
export const customOrderAPI = {
  // Özel sipariş oluştur
  create: (orderData) => apiPost('/custom-orders', orderData),
  
  // Kullanıcı özel siparişlerini getir
  getUserOrders: (params = {}) => apiGet('/custom-orders', params),
  
  // Özel sipariş detayını getir
  getById: (id) => apiGet(`/custom-orders/${id}`),
  
  // Durum güncelle (admin)
  updateStatus: (id, statusData) => apiPut(`/custom-orders/${id}/status`, statusData),
};

// Yorum API servisleri
export const reviewAPI = {
  // Yorum ekle
  add: (reviewData) => apiPost('/reviews', reviewData),
  
  // Ürün yorumlarını getir
  getProductReviews: (productId, params = {}) => 
    apiGet(`/reviews/product/${productId}`, params),
  
  // Kullanıcı yorumlarını getir
  getUserReviews: (params = {}) => apiGet('/reviews/user', params),
  
  // Yorum güncelle
  update: (id, reviewData) => apiPut(`/reviews/${id}`, reviewData),
  
  // Yorum sil
  delete: (id) => apiDelete(`/reviews/${id}`),
  
  // Yorum onayla (admin)
  approve: (id) => apiPut(`/reviews/${id}/approve`),
};

// Health check
export const healthCheck = () => apiGet('/health');

export default {
  auth: authAPI,
  products: productAPI,
  categories: categoryAPI,
  cart: cartAPI,
  orders: orderAPI,
  customOrders: customOrderAPI,
  reviews: reviewAPI,
  healthCheck,
};
