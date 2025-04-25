<script setup>
import { onMounted, ref } from "vue";
import axios from "axios";
const isAddOpen = ref(false);
const isEditOpen = ref(false);
const isDeleteConfirmOpen = ref(false);
const errorMessage = ref("");
const tempcustomers = ref(null);
const deliverys = ref([]);
const selectedCustomer = ref(null);
const buys = ref([]);

// Loading states for each operation
const loading = ref({
  add: false,
  update: false,
  delete: false,
  fetch: true,
});


const deals = ref([]);
const customers = ref({});
let rowCounter = 1;

const formdata = ref({
  name: "",
  description: "",
  image: null,
  image_link: null,
});


const uploadPreset = "ml_default";
const cloudName = "dzofoegwf";
const file = ref(null);
const uploaded = ref("");
const previewImage = ref(null);


onMounted(async () => {
  await fetchDeals();
});

onMounted(async () => {
  await fetchBuys();
});

onMounted(async () => {
  await fetchDelivery();
});

onMounted(async () => {
  await fetchCustomers();
});

const showDetails = (customerId) => {

  selectedCustomer.value = customers.value.find(customer => customer.customerId === customerId);
};
let totalCustomers = 0; 
const fetchCustomers = async () => {
  try {
    const token = localStorage.getItem("token");

    const response = await axios.get('https://trust-broker-backend-1.onrender.com/api/customers', {
      headers: {
        Authorization: `Bearer ${token}`, 
      },
    });

    customers.value = response.data; 
    totalCustomers = response.data.length;
    localStorage.setItem("totalCustomers", totalCustomers);
    localStorage.setItem("customers", JSON.stringify(customers.value));


    customers.value.forEach(customer => {
      customer.buys = buys.value[customer.customerId] || []; 
    });

    console.log("Fetched customers with buys:", customers.value);
  } catch (error) {
    console.error("Error fetching customers:", error);
  }
};

let totalDelivery = 0; 
const fetchDelivery = async () => {
  try {
    const token = localStorage.getItem("token");

    const response = await axios.get('https://trust-broker-backend-1.onrender.com/api/delivery', {
      headers: {
        Authorization: `Bearer ${token}`, 
      },
    });

    deliverys.value = response.data[0]; 
  

   
    totalDelivery = response.data.length;
    console.log("Total number of delivery:", totalDelivery);

    localStorage.setItem("delivery", JSON.stringify(deliverys.value));
    console.log("Fetched deliverys:", deliverys.value);
  } catch (error) {
    console.error("Error fetching delivery:", error);
  }
};
let totalDeals = 0; 
const fetchDeals = async () => {
  try {
    const token = localStorage.getItem("token");
    if (!token) {
      console.error("No token found in localStorage");
      return;
    }

    const response = await axios.get('https://trust-broker-backend-1.onrender.com/api/deals', {
  headers: {
    Authorization: `Bearer ${localStorage.getItem("token")}`,
  },
});

    deals.value = response.data; 
    totalDeals = response.data.length; 
    console.log("Total number of deals:", totalDeals);
    localStorage.setItem("deals", JSON.stringify(deals.value));
    localStorage.setItem("totalDeals", totalDeals);
    // tempdeals.value = { ...deals.value };
    console.log("deals",deals.value);
  } catch (error) {
    console.error("Error fetching deals:", error); 
  }
};



const handleDelete = async (customer) => {
  selectedCustomer.value = customer; 
  isDeleteConfirmOpen.value = true; 
};
const deleteCustomer = async (customerId) => {
  const token = localStorage.getItem("token"); 
  try {
    await axios.delete(`https://trust-broker-backend-1.onrender.com/api/customers/${customerId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  } catch (error) {
    console.error("Error deleting customer:", error);
    throw error; 
  }
};
const confirmDelete = async () => {
  if (selectedCustomer.value) {
    loading.value.delete = true;
    try {
     
      await deleteCustomer(selectedCustomer.value.customerId);
    
      await fetchCustomers(); 

    } catch (error) {
      console.error("Error deleting customer:", error); 
      alert("there was an error deleting the customer");
    } finally {
      loading.value.delete = false; 
      isDeleteConfirmOpen.value = false;
      selectedCustomer.value = null;
    }
  }
};

const closeDeleteConfirm = () => {
  isDeleteConfirmOpen.value = false;
  selectedCustomer.value = null;
};
</script>

<template>
    <!-- Delete Confirmation Pop-over Dialog -->
    <div
      v-if="isDeleteConfirmOpen"
      class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
    >
      <div class="bg-white p-6 rounded-lg shadow-lg w-full max-w-sm">
        <h3 class="text-lg font-bold text-darkBlue mb-4">Confirm Deletion</h3>
        <p class="text-sm text-gray-600 mb-4">
          Are you sure you want to delete this customer "{{
            selectedCustomer?.user.fullName
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
    <img 
  :src="selectedCustomer.user.picture ? selectedCustomer.user.picture : 'path/to/placeholder.jpg'" 
  alt="Customer Picture" 
  class="-mt-26"
/>
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
      <div class="sticky">
  <div class="min-w-[600px] max-w-[100%] rounded-lg shadow-md">
    <!-- Table Header -->
    <div class="grid grid-cols-7 bg-white uppercase font-bold">
      <div class="p-3 lg:py-5 text-[12px] text-black bg-white z-10">No</div>
      <div class="p-3 lg:py-5 text-[12px] text-black -ml-16 bg-white z-10">Customer</div>
      <div class="p-3 lg:py-5 text-[12px] text-black bg-white -ml-14 z-10 w-48">Email</div> <!-- Adjusted width -->
      <div class="p-3 lg:py-5 text-[12px] text-black bg-white ml-1 z-10">Phone</div>
      <div class="p-3 lg:py-5 text-[12px] text-black bg-white -ml-1 z-10">Delivery option</div>
      <div class="p-3 lg:py-5 text-[12px] text-black bg-white z-10">Deal Status</div>
      <div class="p-3 lg:py-5 text-[12px] text-black ml-8 bg-white z-10">Action</div>
    </div>

    <!-- Table Body -->
    <div v-for="(customer, index) in customers" :key="customer.customerId" class="grid grid-cols-7 my-3 bg-white font-semibold lg:py-2 text-[10px]">
      <div class="p-3 text-[12px] text-black bg-white z-10">
        {{ index + 1 }}
      </div>
      <div class="p-3 text-[12px] text-black -ml-16 bg-white z-10">
        {{ customer.user.fullName }} 
      </div>
      <div class="p-3 text-[12px] text-black -ml-14 bg-white z-10 w-48">
        {{ customer.user.email }} 
      </div> <!-- Adjusted width -->
      <div class="p-3 text-[12px] text-black bg-white z-10">
        {{ customer.user.phone }}
      </div>
      <div class="p-3 text-[12px] text-black bg-white z-10">
        {{ customer.deals.length > 0 ? customer.deals[0].deliveryOption : 'N/A' }}
      </div>
      <div class="p-3 text-[12px] text-black bg-white z-10">
        {{ customer.deals.length > 0 ? customer.deals[0].dealsStatus : 'N/A' }} 
      </div>
      <div class="p-3 text-[12px] flex gap-x-2 lg:gap-x-4 justify-center bg-white z-10">
        <p @click="showDetails(customer.customerId)" class="cursor-pointer text-[#57B4D3]">details</p>
        <button
          @click="handleDelete(customer)"
          class="text-red-500 hover:text-red-700 text-[10px] cursor-pointer transition duration-200"
          title="Delete"
          :disabled="loading.add || loading.update || loading.delete"
        >
          <svg xmlns="http://www.w3.org/2000/svg" class="size-5 lg:size-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
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