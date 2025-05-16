<template>
    <AdminLayout>
      <!--large screen-->
      <div class="pb-10 px-5">
        <h1 class="mb-3 text-gray-500">Featured Brokers</h1>
        <div
          class="flex justify-center items-center mb-3"
          v-if="loadingbrokers">
          <div class="loader"></div>
        </div> 
        <div
    
    class="flex justify-center items-center mb-3"
    v-if="loadingbrokers2">
    <div class="loader"></div>
  </div> 
        <!-- <div
          class="flex justify-center items-center mb-3 "
          v-if="loadingbrokers2"
        >
          <div class="loader"></div>
        </div> -->
        <hr class="text-gray-300 -mx-9" />
        <div class="flex justify-between w-10/10 ">
<div v-if="showPortfolio" class="popup-overlay ">
  <div class="flex w-20/10">
  <div class="popup-content">

    <h1 class="mb-3 text-xl font-semibold">Portfolio</h1>
    <div class="bg-white w-5/8  mb-3 shadow-sm pb-2 rounded-md">
      <img src="/portfolioimage.png" alt="" >
    <div class="flex w-2/3  mx-auto mt-5">
  <img src="/person.png" alt="">
  <h1 class="ml-4">Alice Johnson</h1>
    </div>
    <div class="flex w-11/11 px-1 mt-2 mb-2">
  <img src="/textIcon2.png" alt="" class="h-3 mt-1">
  <p class="ml-2 text-sm ">  {{ isExpanded ? fullDescription : shortDescription }}</p>
  
    </div>
    <div class="">
  
      <a href="" @click.prevent="toggleDescription2" class="text-blue-300 underline ml-5 ">{{ isExpanded ? 'See less' : 'See more' }}</a>
    </div>
    </div>
  </div>
  <div>
  <button @click="showPortfolio = false" class="mt-18 bg-red-500 rounded-full w-10 h-10  text-white  p-2 -ml-50"><i class="fa-solid fa-xmark"></i></button>
  
  </div>
</div>

</div>
    
<div class=" ">
  <div v-if="showDelivery" class="popup-overlay ">
    <div class="flex w-20/10">
      <div class="popup-content">
         <h1 class="mb-3 text-xl font-semibold ">Delivery</h1>
  <div class="bg-white w-11/11  px-3 py-5 mb-3 shadow-sm">
    <p class="mb-4 text-green-400 font-semibold text-right">{{ deliveries.deliveryStatus }}</p>
    <div class="flex justify-between ">
<div class="flex">
  <div class="flex jus">
    <img src="/person.png" alt="">
    <p class="ml-3">{{singleBroker.user.fullName}}</p>
  </div>
  <div class="flex ml-4">
    <img src="/Broker.png" alt="">
    <p>Alice Johnson</p>
  </div>

</div>

<div>

</div>
  </div>
  <div class="flex w-1/2 mx-auto mt-3">
  <img src="/location.png" alt="">
  <p>{{deliveries.location}}</p>
</div>
  <div class="w-1/3 mx-auto">

<!-- <button class="bg-[#E0F7FF] text-black px-2 py-1 rounded-md mt-5 w-10/10">Pending</button> -->
</div>
  </div>
      </div>
          <div>
<button @click="showDelivery = false" class="mt-18 bg-red-500 rounded-full w-10 h-10  text-white  p-2 mr-15"><i class="fa-solid fa-xmark"></i></button>

</div>
    </div>

    <!-- <h1 class="mb-3 text-xl font-semibold ">Delivery</h1> -->
  <!-- <div class="bg-white w-12/11  px-3 py-5 mb-3 shadow-sm">
    <p class="mb-4 text-green-400 font-semibold text-right">{{ deliveries.deliveryStatus }}</p>
    <div class="flex justify-between ">
<div class="flex">
  <div class="flex jus">
    <img src="/person.png" alt="">
    <p class="ml-3">{{singleBroker.user.fullName}}</p>
  </div>
  <div class="flex ml-4">
    <img src="/Broker.png" alt="">
    <p>Alice Johnson</p>
  </div>

</div>

<div>

</div>
  </div>
  <div class="flex w-1/2 mx-auto mt-3">
  <img src="/location.png" alt="">
  <p>{{deliveries.location}}</p>
</div>
  <div class="w-1/3 mx-auto">

<button class="bg-[#E0F7FF] text-black px-2 py-1 rounded-md mt-5 w-10/10">Pending</button>
</div>
  </div> -->
  </div>



</div>

        </div>
        <div class="flex justify-between w-10/11">



          <div v-if="showDeal" class="popup-overlay ">
<div class="flex w-20/20">
  <div class="popup-content">
          <h1 class="mb-3 text-xl font-semibold">Deal</h1>
<div class="bg-white w-11/10  px-3 py-5 mb-3 shadow-sm">
<div class="flex justify-between">
  <div class="flex jus">
    <img src="/person.png" alt="">
    <p class="ml-3">{{singleBroker.user.fullName}}</p>
  </div>
  <div class="flex">
    <img src="/Broker.png" alt="">
    <p>Alice Johnson</p>
  </div>
</div>
<div class="flex justify-between mt-4">
  <div class="flex">
    <img src="/cart.png" alt="">
    <p>{{ deals.quantity }}</p>
  </div>
  <div class="flex">
    <img src="/laptop.png" alt="">
    <p>{{deals.productName}}</p>
  </div>
  <div class="flex">
    <img src="/expres.png" alt="">
    <p class="ml-2">{{deals.deliveryOption}}</p>
  </div>
</div>
<div class="flex justify-between mt-4">
  <div class="flex">
    <img src="/color.png" alt="">
    <p class="ml-2">{{deals.color}}</p>
  </div>
  <div class="flex">
    <img src="/creditCard.png" alt="">
    <p class="ml-3">{{ deals.paymentOption }}</p>
  </div>
  <div class="flex">
    <img src="/Xps.png" alt="">
    <p class="ml-3">{{ deals.productModel }}</p>
  </div>
</div>
<div class="w-1/3 mx-auto">

  <!-- <button class="bg-[#E0F7FF] text-black px-2 py-1 rounded-md mt-5 w-10/10">Pending</button> -->
</div>
</div>
  </div>
  <div><button @click="showDeal = false" class="mt-18 bg-red-500 rounded-full w-10 h-10  text-white  p-2 ml-5"><i class="fa-solid fa-xmark"></i></button>
</div>
</div>
        </div>


        </div>

     
    
      
      </div>
      <p v-if="errors" class="text-red-400 text-xl text-center font-semibold">
        {{ errors }}
      </p>
      <div class="px-3">
        <div class="flex justify-between ">
        
                    <div v-if="showReview" class="popup-overlay ">
   <div class="flex w-20/10">
    <div class="popup-content">
       <h1 class="mb-3 text-xl font-semibold">Review</h1>
    <div class="flex justify-between bg-white w-10/10  px-3 py-5 mb-3 shadow-sm">
    <img src="/star.png" alt="">
    <img src="/star.png" alt="">
    <img src="/star.png" alt="">
    <img src="/star.png" alt="">
  </div>
    </div>
    <div>
      <button @click="showReview = false" class="mt-17 bg-red-500 rounded-full w-10 h-10  text-white  p-2 "><i class="fa-solid fa-xmark"></i></button>

    </div>
   </div>
  </div>
          <div v-if="showSkills" class="popup-overlay ">
            <div class="flex w-20/10">
              <div class="popup-content">
         <h1 class="mb-3 text-xl font-semibold">Skills</h1>
          <div class="bg-white w-13/11  px-3 py-5 mb-3 shadow-sm">
<div class="flex justify-between">
<div>Communication Skill</div>
<div>{{skills.communicationSkill}}</div>
</div>
<div class="flex justify-between">
<div>Broking </div>
<div>{{ skills.brokingSkill }}</div>
</div>
<div class="flex justify-between">
<div>Work Done</div>
<div>{{skills.workDone}}</div>
</div>
<div class="flex justify-between">
<div>Work In Progress</div>
<div>{{ skills.workInProgress }}</div>
</div>
          </div>
              </div>
              <div>
                 <button @click="showSkills = false" class="mt-17 bg-red-500 rounded-full w-10 h-10  text-white  p-2 ml-5"><i class="fa-solid fa-xmark"></i></button>

              </div>
            </div>
 
        </div>
        <div  v-if="showSales" class="popup-overlay ">
          <div class="flex w-20/10">
<div class="popup-content">
       <h1 class="mb-3 text-xl font-semibold ">Sales</h1>
<div class="bg-white w-13/11 flex px-3 py-5 mb-3 justify-between shadow-sm">
<div class="flex">
  <img src="/cart.png" alt="">
  <p>5</p>
</div>
<div class="flex">
  <img src="/color.png" alt="">
  <p>Blue</p>
</div>
<div class="flex">
  <img src="/laptop.png" alt="">
  <p>Laptop</p>
</div>
</div>
</div>
<div>
      <button @click="showSales = false" class="mt-17 bg-red-500 rounded-full w-10 h-10  text-white  p-2 ml-5"><i class="fa-solid fa-xmark"></i></button>

</div>
          </div>
   
        </div>
       
      <div v-if="showPopup" class="popup-overlay">
    <div class="popup-content">
      <div  @click="togglePortfolio()" class="bg-white rounded-sm h-10 w-20/12  text-center py-2 text-sm font-semibold cursor-pointer hover:scale-110">
        Portfolio
      </div>
      <div @click="toggleDelivery" class="bg-white mt-4 rounded-sm h-10 w-20/12 mx-auto text-center py-2 text-sm font-semibold cursor-pointer hover:scale-110">
        Delivery
      </div>
      <div @click="toggleDeals" class="bg-white mt-4 rounded-sm h-10 w-20/12 mx-auto text-center py-2 text-sm font-semibold cursor-pointer hover:scale-110">
        Deals
      </div>
      <div @click="toggleReview" class="bg-white mt-4 rounded-sm h-10 w-20/12 mx-auto text-center py-2 text-sm font-semibold cursor-pointer hover:scale-110">
        Review
      </div>
      <div @click="toggleSales" class="bg-white mt-4 rounded-sm h-10 w-20/12 mx-auto text-center py-2 text-sm font-semibold cursor-pointer hover:scale-110">
        Sales
      </div>
      <div @click="toggleSkills" class="bg-white mt-4 rounded-sm h-10 w-20/12 mx-auto text-center py-2 text-sm font-semibold cursor-pointer hover:scale-110">
        Skills
      </div>
      <button @click="showPopup = false" class="mt-4 bg-red-500 rounded-sm w-20/12 text-white  p-2">Close</button>
    </div>
  </div>
  <!-- <div>
  <div @click="togglePortfolio" class="bg-white rounded-sm h-10 w-2/3 mx-auto text-center py-2  text-sm font-semibold cursor-pointer hover:scale-110 ">
          Portfolio
          </div>
          <div @click="toggleDelivery" class="bg-white mt-4 rounded-sm h-10 w-2/3 mx-auto text-center py-2 text-sm font-semibold cursor-pointer hover:scale-110 ">
          Delivery
          </div>
          <div @click="toggleDeals" class="bg-white mt-4 rounded-sm h-10 w-2/3 mx-auto text-center py-2 text-sm font-semibold cursor-pointer hover:scale-110 ">
          Deals
          </div>
          <div @click="toggleReview" class="bg-white mt-4 rounded-sm h-10 w-2/3 mx-auto text-center py-2 text-sm font-semibold cursor-pointer hover:scale-110 ">
          Review
          </div>
          <div  @click="toggleSales" class="bg-white mt-4 rounded-sm h-10 w-2/3 mx-auto text-center py-2 text-sm font-semibold cursor-pointer hover:scale-110 " >
          Sales
          </div>
          <div class="bg-white mt-4 rounded-sm h-10 w-2/3 mx-auto text-center py-2 text-sm font-semibold cursor-pointer hover:scale-110" @click="toggleSkills">
          Skills
          </div>
         
        </div> -->
      </div>
      </div>

        <div
          v-if="brokers.length > 0"
          class="flex mt-5 text-xs bg-white py-3 font-bold rounded-md px-5 w-11/11" 
        >
        
          <div class="w-1/13">Name</div>
  
          <div class="w-1/11 ml-10">email</div>
  
          <div class="w-1/9 ml-20">category</div>
  
          <div class="w-1/11 ml-10">phone</div>
  
          <div class="w-1/8 ml-6">city</div>
  
          <div class="w-1/8">subcity</div>
  
          <div class="w-1/7">kebele</div>
  
          <div class="w-1/7">sex</div>

          <div class="w-1/7">buys</div>
<!-- 
          <div class="w-1/7">location</div> -->
  
          <div class="w-1/13">actions</div>
        </div>
        
     
  
      <div v-for="broker in brokers" :key="broker.id" class="px-3 pb-3 bg-white " >
        <div class="flex bg-white py-3 mt-3 text-xs rounded-md px-2" >
        <div class="break-words max-w-[80px] w-1/7">{{ broker.user.fullName }}</div>
  
          <div class="w-1/10 ml-3">  {{ broker.user.email }} </div>
  
          <div class="py-2 px-4 w-1/5 ml-10 -mt-2">
   
            {{ broker.category.catigoryName }}
          </div>
          <div class="w-1/6">{{ broker.user.phone }}</div>
  
          <div class="w-1/7">{{ broker.user.city }}</div>
  
          <div class="w-1/10 ml-3">{{ broker.user.subcity }}</div>
  
          <div class="w-1/6 ml-12">{{ broker.user.kebele }}</div>
  
          <div class="break-words  w-1/6">
            {{ broker.user.sex }}
          </div>
          <div class="break-words max-w-[120px] w-1/6">
            {{ broker.user.buys }}
          </div>
     
         <div class="flex justify-between w-1/9 ml-6">
            <div class=" hover:scale-130 cursor-pointer shadow-md h-8 relative"   @click="toggleShowDetails(broker.user.email); showPopup = !showPopup">
              <img src="/view.png" alt="" class="hover:text-yellow-400 "/>
          
            </div>
         
            <div class="relative hover:scale-130 cursor-pointer shadow-md h-8"  @click=" fetchSingleBroker(broker.user.email) ">
              <img src="/approve.png" alt="" class="hover:text-yellow-400 "/>
            </div>
      <div v-if="confirmApproved" class="popup-overlay2">
              <div class=" bg-gray-100 w-1/2 rounded-md text-black shadow-md shadow-gray-200 ">

                <div class="popup-content">
                  <p class="text-xl font-serif">are you sure you want to approve this broker</p>
                  <div class="flex">

                    <button @click="approveBrokerStatus(broker.brokerId)" class="px-2 py-2 bg-green-800 mt-5 w-1/3  mx-auto text-white">Continue</button>
                    <button @click="confirmApproved=false" class="px-2 py-2 bg-red-800 mt-5 w-1/3 ml-30 mx-auto text-white">Cancle</button>
                  </div>
                </div>
              </div>
  </div>
         
            <div class="relative hover:scale-130 cursor-pointer shadow-md h-8" >
              <img src="/ban.png" alt="" class="hover:text-yellow-400 "/>
            </div>
          </div>
     
        </div>
      </div>
  
 
    </AdminLayout>
  </template>
  
  <script>
  import AdminLayout from "@/layout/AdminLayout.vue";
  import { defineComponent, onMounted, ref } from "vue";

  import axios from "axios";
  
  export default {
    components: {
      AdminLayout,
   
    },
    setup() {
      const brokers = ref([]);
      const singleampany = ref("");
      const images = ref([]);
      const socialMediaLinks = ref({});
      const loadingbrokers = ref(true);
      const loadingbrokers2 = ref(false);
      const loadingbrokers3 = ref({});
      const loadingbrokers4 = ref({})
      const errors = ref("");
      const showDetails = ref(false);
      const showSkills  = ref(false);
      const showPortfolio = ref(false);
      const showDeal = ref(false);
      const showSales = ref(false);
      const showDelivery  = ref(false);
      const showReview = ref(false);
      const skills = ref([]);
      const deal = ref([])
      const deals = ref([]);
      const singleBroker = ref([]);
      const showSingleBroker = ref(false)
      const delivery = ref([]);
      const deliveries = ref([])
      const showPopup = ref(false);
      const isExpanded = ref(false)
      const confirmApproved = ref(false);
      const shortDescription = ref( 'My investment philosophy centers around a disciplined approach to risk management.')
       const fullDescription = ref( 'My investment philosophy centers around a disciplined approach to risk management and strategic asset allocation. I believe in diversifying assets to mitigate risks and ensure long-term growth.')
  const toggleSkills = async(id)=>{
     showPopup.value = false
    
    console.log('skill', skills.value)

 
showSkills.value = true
  }
  const toggleSales = async(id)=>{
     showPopup.value = false
  
showSales.value = true
  }
  const toggleDelivery = async(id)=>{
     showPopup.value = false
    window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
      console.log('deliveries',deliveries.value)
showDelivery.value = !showDelivery.value
  }
  const toggleDetails = async(id)=>{
     showPopup.value = false
showDetails.value = true
  }
  const toggleDeals = async(id)=>{
     showPopup.value = false
    // window.scrollTo({
    //     top: 0,
    //     behavior: "smooth",
    //   });
      console.log('deals',deals.value)
showDeal.value = true
  }
  const toggleReview = async(id)=>{
     showPopup.value = false

showReview.value = true
  }
  const togglePortfolio = async ()=>{
    showPopup.value = false
    window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
showPortfolio.value = true
  }
  const toggleShowDetails = async (id) => {
    // loadingbrokers2.value = true
    showSkills.value = false
    showSales.value  = false
    showDetails.value = false
    showDeal.value = false
    showReview.value  = false
    showPortfolio.value = false
    showDelivery.value = false
    window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    const response = await axios.get(`https://trust-broker-backend-1.onrender.com/api/brokers/${id}`);
    singleBroker.value = response.data;
    showSingleBroker.value = true
    console.log('single broker',singleBroker.value)
   // console.log('responese',response.data)
    skills.value = response.data.skills
    deal.value = response.data.deals
    delivery.value= response.data.delivery
    delivery.value = delivery.value.map((delivery)=>{
      deliveries.value = delivery
      console.log('deliveries',delivery)
    })
    console.log('delivery',delivery.value)
   // console.log('alldeal',deal.value)
    deal.value = deal.value.map((deal)=>{
     deals.value = deal
     console.log('deals',deal)

    })
    console.log('dealll',deals.value)
    // console.log('deals', deals.value)
    console.log('skill', skills.value)
//showDetails.value = !showDetails.value
// loadingbrokers2.value = false
  };
  const toggleDescription2 = ()=>{
    isExpanded.value = !isExpanded.value;
  }
      const getImageUrl = (image) => {
        return `https://trust-broker-backend-1.onrender.com/${image}`;
      };
      const getSocialMediaUrl = (link) => {
        return `https://trust-broker-backend-1.onrender.com/${link}`;
      };
      const showFullDescription = (campany) => {
        campany.showFullDescription = true;
  }

      const toggleDescription = (campany) => {
         showPopup.value = false
        campany.showFullDescription = !campany.showFullDescription; 
      };
     const fetchBrokers = async () => {
  try {
    const response = await axios.get(`https://trust-broker-backend-1.onrender.com/api/brokers/`);
    brokers.value = response.data;
    console.log("brokers", brokers.value);
    
    // Stringify the brokers object before saving to local storage
    localStorage.setItem('brokers', JSON.stringify(brokers.value));
    
    console.log("brokers stored in localStorage", brokers.value);
    loadingbrokers.value = false;
  } catch (error) {
    console.log("Errors", error);
    loadingbrokers.value = false;
    errors.value = error;
  }
}
const fetchSingleBroker = async (id) => {
  confirmApproved.value = true;
  try {
    const response = await axios.get(`https://trust-broker-backend-1.onrender.com/api/brokers/${id}`);
    singleBroker.value = response.data;
    console.log("single campany", singleBroker.value);
  } catch (error) {
    console.log("Errors", error);
  }
}
 const  approveBrokerStatus = async(id)=>{

   const response = await axios.put(
          `https://trust-broker-backend-1.onrender.com/api/brokers/${id}`,
          {

            "approved": true,
            "user":{
              ...singleBroker.value.user,
            },
          }
        );
        confirmApproved.value = false
        console.log("response", response.data);
   }
      onMounted(() => {
 localStorage.getItem('brokers')
        fetchBrokers();
  
   
      });
      return {
        //chartData,
        fetchBrokers,
        brokers,
        toggleDescription,
       // fetchSingleBroker,
        singleampany,
        images,
        socialMediaLinks,
        //getImageUrl,
        loadingbrokers,
        loadingbrokers2,
        errors,
        //approveCampany,
       // rejectCampany,
        loadingbrokers3,
        loadingbrokers4,
        showDetails,
        toggleShowDetails,
        showSkills,
        showPortfolio,
        showDeal,
        showDelivery,
        showReview,
        showSales,
        toggleSkills,
        toggleSales,
        toggleDelivery,
        toggleDetails,
        toggleDeals,
        toggleReview,
        togglePortfolio,
        skills,
        deals,
        deal,
        singleBroker,
        delivery,
        deliveries,
        showSingleBroker,
        showPopup,
        isExpanded,
        shortDescription,
        fullDescription,
        approveBrokerStatus,
        toggleDescription2,
        fetchSingleBroker,
        confirmApproved
            };
    },
  };
  </script>
  
  <style>
  .loader {
    border: 8px solid #f3f3f3; 
    border-top: 8px solid #3498db; 
    border-radius: 50%;
    width: 60px; 
    height: 60px; 
    animation: spin 1s linear infinite; 
  }
  .loader2 {
    border: 8px solid #f3f3f3; 
    border-top: 8px solid #3498db; 
    border-radius: 50%;
    width: 20px; 
    height: 20px; 
    animation: spin 1s linear infinite; 
  }
  .popup-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  padding-left: 700px;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
}
 .popup-overlay2 {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  padding-left: 500px;
  bottom: 0;
  background: rgba(0, 0, 0, 0.01);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
}
.popup-content {
  /* background: white; */
  padding: 30px;
  border-radius: 8px;
  /* box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1); */
}
  @keyframes spin {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }
  </style>
  