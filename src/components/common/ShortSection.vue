<template>
  <div class="my-10">
    <div class="text-center title mb-5 font-bold text-xl md:text-2xl lg:text-3xl">{{ title }}</div>
    <swiper
      :key="data.length"
      slidesPerView = "3.2"
      spaceBetween = "8" 
      :breakpoints = "{
        '420': {
          slidesPerView: data.length > 3 ? 3.2 : 3,
          spaceBetween: 16,
          },
      }"
      class = "mySwiper"
    >
      <swiper-slide
        v-for="(item, index) in data" 
        :key="item"
        >
        <div class="overflow-hidden rounded-lg aspect-ratio-9-16">
          <video 
            controls
            :src="item.url"
          >
          </video>
        </div>
      </swiper-slide>
    </swiper>
  </div>
</template>
<script setup>
  import { Swiper, SwiperSlide } from 'swiper/vue';
  import { ref, defineProps } from 'vue';
  import 'swiper/css';
  const onSwiper = (swiper) => {
    console.log(swiper);
  };
  const onSlideChange = () => {
    console.log('slide change');
  };
  const props = defineProps({
    data: {
    type: Array,
    required: true,
    default: () => ([])
    },
    title: {
      type: String,
    }
  })

</script>

<style scoped lang="scss">
.aspect-ratio-9-16 {
    position: relative;
    width: 100%; 
    aspect-ratio: 9 / 16;
    background: rgba(0,0,0,0.875);
}
.aspect-ratio-9-16 video {
    width: 100%;
    height: 100%;
}
.title {
  position: relative;
  &::before  {
    content: ""; 
    position: absolute; 
    border-bottom: 2px solid var(--vp-home-hero-name-color);
    width: 40px;
    left:  calc(50% - 20px);
    bottom: -4px;
  }
  @media (min-width: 768px){
    &::before  {
      border-bottom: 3px solid var(--vp-home-hero-name-color);
    }
  }
  @media (min-width: 992px){
    &::before  {
      border-bottom: 5px solid var(--vp-home-hero-name-color);

    }
  }
}
</style>