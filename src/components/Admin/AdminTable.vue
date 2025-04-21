<script setup>
// import { useCategoryStore } from "@/stores/category";
import { onMounted, ref } from "vue";
import axios from "axios";
// import CryptoJS from "crypto-js";

// const categoryStore = useCategoryStore();
// const { getAllCategories, deleteCategory, createCategory, updateCategory } =
//   // categoryStore;

const isAddOpen = ref(false);
const isEditOpen = ref(false);
const isDeleteConfirmOpen = ref(false);
const selectedCategory = ref(null);
const selectedCategoryId = ref(null);
const errorMessage = ref("");
const tempcustomers = ref(null);
const deliverys = ref([]);

// Loading states for each operation
const loading = ref({
  add: false,
  update: false,
  delete: false,
  fetch: true,
});

const categories = ref([]);
const deals = ref([]);
const customers = ref({});
let rowCounter = 1;

const formdata = ref({
  name: "",
  description: "",
  image: null,
  image_link: null,
});

const editFormData = ref({
  name: "",
  description: "",
});

// Cloudinary configuration
const uploadPreset = "ml_default";
const cloudName = "dzofoegwf";
const file = ref(null);
const uploaded = ref("");
const brokers = ref([]);
const buys = ref([]);
const previewImage = ref(null);
const rates = ref([]);
const selectedCustomer = ref(null);

onMounted(async () => {
  await fetchDeals();
});
onMounted(async () => {
  await fetchBroker();
});
onMounted(async () => {
  await fetchBuys();
});
onMounted(async () => {
  await fetchDelivery();
});
onMounted(async () => {
  await fetchRating();
});
onMounted(async () => {
  await fetchCustomers();
});

const showDetails = (customerId) => {
  // Check if the currently fetched broker's ID matches the clicked broker ID
  selectedCustomer.value = customers.value.find(customer => customer.customerId === customerId);
};

const fetchCustomers = async () => {
  try {
    const token = localStorage.getItem("token");

    const response = await axios.get('/api/customers', {
      headers: {
        Authorization: `Bearer ${token}`, 
      },
    });

    // Store the entire customer data
    customers.value = response.data; 

    // Associate buys with corresponding customers
    customers.value.forEach(customer => {
      customer.buys = buys.value[customer.customerId] || []; // Assign buys from the map
    });

    console.log("Fetched customers with buys:", customers.value);
  } catch (error) {
    console.error("Error fetching customers:", error);
  }
};

const fetchBroker = async () => {
  try {
    const token = localStorage.getItem("token");

    const response = await axios.get('/api/brokers', {
      headers: {
        Authorization: `Bearer ${token}`, 
      },
    });

    // Assuming response.data is an array of brokers
    brokers.value = response.data; // Adjust if response structure is different

    // If you need to modify pictures or identification cards
    const baseUrl = 'https://mybrokerapp.com/images/';
    brokers.value.forEach(broker => {
      broker.picture = baseUrl + broker.picture;
      broker.identificationCard = baseUrl + broker.identificationCard;
    });

    localStorage.setItem("brokers", JSON.stringify(brokers.value));
    console.log("brokers", brokers.value);
  } catch (error) {
    console.error("Error fetching brokers:", error);
  }
};
const fetchBuys = async () => {
  try {
    const token = localStorage.getItem("token");

    const response = await axios.get('/api/buys', {
      headers: {
        Authorization: `Bearer ${token}`, 
      },
    });

    // Assuming response.data is an array of buys
    const buysData = response.data; 

    // Create a mapping of customerId to their buys
    const buysMap = {};
    buysData.forEach(buy => {
      const customerId = buy.customerId; // Ensure buy has customerId
      if (!buysMap[customerId]) {
        buysMap[customerId] = [];
      }
      buysMap[customerId].push(buy); // Push the buy to the corresponding customer
    });

    buys.value = buysMap; // Store the mapping in a reactive variable
    localStorage.setItem("buys", JSON.stringify(buys.value));
    console.log("Buys map:", buys.value);
  } catch (error) {
    console.error("Error fetching buys:", error);
  }
};
let totalDelivery = 0; 
const fetchDelivery = async () => {
  try {
    const token = localStorage.getItem("token");

    const response = await axios.get('/api/delivery', {
      headers: {
        Authorization: `Bearer ${token}`, 
      },
    });

    deliverys.value = response.data[0]; 
  

    // Update totalCustomers based on the response
    totalDelivery = response.data.length; // Adjust based on actual data structure
    console.log("Total number of delivery:", totalDelivery);

    localStorage.setItem("delivery", JSON.stringify(deliverys.value));
    console.log("Fetched deliverys:", deliverys.value);
  } catch (error) {
    console.error("Error fetching delivery:", error);
  }
};

const fetchDeals = async () => {
  try {
    const token = localStorage.getItem("token");
    if (!token) {
      console.error("No token found in localStorage");
      return;
    }

    const response = await axios.get('/api/deals', {
  headers: {
    Authorization: `Bearer ${localStorage.getItem("token")}`,
  },
});

    deals.value = response.data[0]; 
    // tempdeals.value = { ...deals.value };
    console.log("deals",deals.value);
  } catch (error) {
    console.error("Error fetching deals:", error); 
  }
};
const fetchRating = async () => {
  try {
    const token = localStorage.getItem("token");


    const response = await axios.get('/api/views', {
  headers: {
    Authorization: `Bearer ${localStorage.getItem("token")}`,
  },
});

    rates.value = response.data[0]; 
    console.log("rate",rates.value);
  } catch (error) {
    console.error("Error fetching rate:", error); 
  }
};

const handleDelete = async (category) => {
  selectedCategory.value = category;
  isDeleteConfirmOpen.value = true;
};

const confirmDelete = async () => {
  if (selectedCategory.value) {
    loading.value.delete = true;
    try {
      await deleteCategory(selectedCategory.value.id);
      await fetchDeals();
    } finally {
      loading.value.delete = false;
      isDeleteConfirmOpen.value = false;
      selectedCategory.value = null;
    }
  }
};



const handleEdit = (category) => {
  selectedCategory.value = category;
  selectedCategoryId.value= category.id,
  editFormData.value = {
    name: category.name,
    description: category.description,
  };
  isEditOpen.value = true;
};



const toggleAddForm = () => {
  isAddOpen.value = !isAddOpen.value;
};

const closeEditForm = () => {
  isEditOpen.value = false;
  selectedCategory.value = null;
  errorMessage.value = ""; // Clear errors when closing
};

const closeDeleteConfirm = () => {
  isDeleteConfirmOpen.value = false;
  selectedCategory.value = null;
};

const onFileSelected = (event) => {
  file.value = event.target.files[0];
  if (file.value) {
    previewImage.value = URL.createObjectURL(file.value);
    uploadFile();
  } else {
    previewImage.value = null;
  }
};

const uploadFile = async () => {
  uploaded.value = "Uploading Wait a Sec...";
  if (!file.value) return;

  const timestamp = Math.floor(Date.now() / 1000);
  const params = {
    timestamp,
    upload_preset: uploadPreset,
  };

  const { signature } = generateSignature(params);

  const formData = new FormData();
  formData.append("file", file.value);
  formData.append("upload_preset", uploadPreset);
  formData.append("timestamp", timestamp);
  formData.append("signature", signature);
  formData.append("api_key", "734174595538154");

  try {
    const response = await axios.post(
      `https://api.cloudinary.com/v1_1/${cloudName}/upload`,
      formData
    );
    uploaded.value = "Photo Uploaded Successfully";
    formdata.value.image_link = response.data.secure_url;
  } catch (error) {
    uploaded.value = "Failed to upload photo";
    console.error("Error uploading file:", error.response.data);
  }
};

const generateSignature = (params) => {
  const apiSecret = "A5D7SF1aLxGmy_TUAao-iA5C3rM";
  const sortedParams =
    Object.entries(params)
      .sort()
      .map(([key, value]) => `${key}=${value}`)
      .join("&") + apiSecret;

  const signature = CryptoJS.SHA1(sortedParams).toString(CryptoJS.enc.Hex);
  return { signature };
};
</script>

<template>
    <div
      v-if="isEditOpen"
      class="fixed inset-0 bg-black/50 flex items-center justify-center z-50"
    >
      <div class="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
        <div class="flex justify-between items-center mb-4">
          <h3 class="text-lg font-bold text-darkBlue">Edit Category</h3>
          <button
            @click="closeEditForm"
            class="text-gray-600 hover:text-gray-800"
            :disabled="loading.update"
          >
            <svg
              class="w-5 h-5"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>
        <!-- Display error message if any -->
        <div
          v-if="
            errorMessage ||
            categoryStore.errors.name ||
            categoryStore.errors.description
          "
          class="mb-4 p-3 bg-red-100 text-red-700 rounded"
        >
          <p v-if="errorMessage">{{ errorMessage }}</p>
          <p v-if="categoryStore.errors.name">
            {{ categoryStore.errors.name[0] }}
          </p>
          <p v-if="categoryStore.errors.description">
            {{ categoryStore.errors.description[0] }}
          </p>
        </div>
        <div class="mb-4">
          <label
            for="edit-name"
            class="block text-gray-700 text-sm font-bold mb-1"
            >Name:</label
          >
          <input
            type="text"
            id="edit-name"
            v-model="editFormData.name"
            class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            :disabled="loading.update"
          />
        </div>
        <div class="mb-4">
          <label
            for="edit-description"
            class="block text-gray-700 text-sm font-bold mb-1"
            >Description:</label
          >
          <textarea
            id="edit-description"
            v-model="editFormData.description"
            class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            :disabled="loading.update"
          ></textarea>
        </div>
        <div class="flex justify-end space-x-2">
          <button
            @click="closeEditForm"
            class="px-4 py-2 text-gray-600 border rounded-md hover:bg-gray-100 transition duration-200"
            :disabled="loading.update"
          >
            Cancel
          </button>
          <button
            @click="handleUpdateCategory"
            class="px-4 py-2 text-white bg-blue-600 rounded-md hover:bg-blue-700 transition duration-200 flex items-center"
            :disabled="loading.update"
          >
            <span v-if="!loading.update">Update</span>
            <span v-else class="flex items-center">
              <svg
                class="animate-spin h-5 w-5 mr-2 text-white"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  class="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  stroke-width="4"
                ></circle>
                <path
                  class="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                ></path>
              </svg>
              Updating...
            </span>
          </button>
        </div>
      </div>
    </div>

    <!-- Delete Confirmation Pop-over Dialog -->
    <div
      v-if="isDeleteConfirmOpen"
      class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
    >
      <div class="bg-white p-6 rounded-lg shadow-lg w-full max-w-sm">
        <h3 class="text-lg font-bold text-darkBlue mb-4">Confirm Deletion</h3>
        <p class="text-sm text-gray-600 mb-4">
          Are you sure you want to delete the category "{{
            selectedCategory?.name
          }}"?
        </p>
        <div class="flex justify-end space-x-2">
          <button
            @click="closeDeleteConfirm"
            class="px-4 py-2 text-gray-600 border rounded-md hover:bg-gray-100 transition duration-200"
            :disabled="loading.delete"
          >
            Cancel
          </button>
          <button
            @click="confirmDelete"
            class="px-4 py-2 text-white bg-red-600 rounded-md hover:bg-red-700 transition duration-200 flex items-center"
            :disabled="loading.delete"
          >
            <span v-if="!loading.delete">Delete</span>
            <span v-else class="flex items-center">
              <svg
                class="animate-spin h-5 w-5 mr-2 text-white"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  class="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  stroke-width="4"
                ></circle>
                <path
                  class="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                ></path>
              </svg>
              Deleting...
            </span>
          </button>
        </div>
      </div>
    </div> 


  <div class="flex ml-20 -mt-6">

    <div class="flex flex-col items-center">
    <!-- Broker Information Section -->
    <div v-if="selectedCustomer" class="ml-40 mb-5">
  <p class="text-[22px]">Customer</p>
  <div class="w-96 h-[450px] pt-32 p-5 bg-[#57B4D3] shadow-2xl rounded-md font-semibold text-stone-200">
    <img :src="selectedCustomer.user.picture" alt="Customer Picture" class="-mt-26">
    <div class="flex">
      <p class="w-56">{{ selectedCustomer.user.fullName }}</p>
      <p>{{ selectedCustomer.user.sex }}</p>
    </div>
    <hr class="mt-2">
    <div class="flex mt-4 space-x-4">
      <p class="w-56">Email</p>
      <p>{{ selectedCustomer.user.email }}</p>
    </div>
    <div class="flex mt-4 space-x-4">
      <p class="w-56">Phone</p>
      <p>{{ selectedCustomer.user.phone }}</p>
    </div>
    <div class="flex mt-4 space-x-4">
      <p class="w-56">City</p>
      <p>{{ selectedCustomer.user.city }}</p>
    </div>
    <div class="flex mt-4 space-x-4">
      <p class="w-56">Subcity</p>
      <p>{{ selectedCustomer.user.subcity }}</p>
    </div>
    <div class="flex mt-4 space-x-4">
      <p class="w-56">Kebele</p>
      <p>{{ selectedCustomer.user.kebele }}</p>
    </div>
    <div class="flex mt-4 space-x-4">
      <p class="w-56">Identification Card</p>
      <img :src="selectedCustomer.user.identificationCard" alt="ID Card" class="w-20 h-auto">
    </div>
    <div class="flex mt-4 space-x-4">
      <p class="w-56">Buys Quantity</p>
      <p>{{ selectedCustomer.buys.length > 0 ? selectedCustomer.buys[0].quantity : 'N/A' }}</p>
    </div>
  </div>
</div>

    <!-- Customer Table Section -->
    <div class="overflow-x-auto w-[1000px] xl:col-span-2 px-4 pb-40">
  <div class="">
    <div class="min-w-[600px] max-w-[100%] rounded-lg shadow-md">
      <!-- Table Header -->
      <div class="grid grid-cols-7 bg-white uppercase font-bold">
        <div class="p-3 lg:py-5   text-sm text-black  left-0 bg-white z-10">No</div>
        <div class="p-3 lg:py-5 text-sm  text-black -ml-16 left-0 bg-white z-10">Customer</div>
        <div class="p-3 lg:py-5 text-sm  text-black -ml-16  left-0 bg-white z-10">Email</div>
        <div class="p-3 lg:py-5 text-sm text-black  left-0 bg-white z-10">Phone</div>
        <div class="p-3 lg:py-5 text-sm text-black  left-0 bg-white z-10">Delivery option</div>
        <div class="p-3 lg:py-5 text-sm text-black  left-0 bg-white z-10">Deal Status</div>
        <div class="p-3 lg:py-5 text-sm text-black  left-0 bg-white z-10">Action</div>
      </div>

      <!-- Table Body -->
      <div v-for="(customer, index) in customers" :key="customer.customerId" class="grid grid-cols-7 my-3 bg-white font-semibold lg:py-2 text-[14px]">
        <div class="p-3  text-[14px] text-black font-bold  left-0 bg-white z-10">
          {{ index + 1 }}
        </div>
        <div class="p-3 -ml-16 text-[14px] text-black font-bold   bg-white z-10">
          {{ customer.user.fullName }} <!-- Customer's full name -->
        </div>
        <div class="p-3 -ml-16 text-[14px] text-black font-bold">
          {{ customer.user.email }} <!-- Customer's email -->
        </div>
        <div class="p-3  text-[14px] text-black font-bold">
          {{ customer.user.phone }} <!-- Customer's phone -->
        </div>
        <div class="p-3 text-[14px] text-black font-bold">
          {{ customer.deals.length > 0 ? customer.deals[0].deliveryOption : 'N/A' }} <!-- Delivery Status -->
        </div>
        <div class="p-3 text-[14px] text-black font-bold">
          {{ customer.deals.length > 0 ? customer.deals[0].dealsStatus : 'N/A' }} <!-- Deal Status -->
        </div>
        <div class="p-3 text-[14px] flex gap-x-2 lg:gap-x-4 justify-center -ml-16">
          <p @click="showDetails(customer.customerId)" class="cursor-pointer text-[#57B4D3]">details</p>
          <button
            @click="handleDelete(customer)"
            class="text-red-500 hover:text-red-700 text-[14px] cursor-pointer transition duration-200"
            title="Delete"
            :disabled="loading.add || loading.update || loading.delete"
          >
            <svg xmlns="http://www.w3.org/2000/svg" class="size-5 lg:size-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5-4h4M4 7h16m-4 4v6m-4-6v6" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  </div>
</div>
    </div>
  </div>
</template>