<template lang="pug">
    .col-lg-6.slider
        Control(
          @next="nextIMG",
          @prev="prevIMG",
          v-show="gallery.length > 2"
        )
        .slider-wrapper
            <!--transition(name="wrapper")-->
            img(
              :src="curIMG.img",
              @click="openGallery(curIMG.id)"
            )
        lightbox(
          :images="gallery",
          ref="lightbox",
          :show-caption="false",
          :showThumbs="false",
          :showLightBox="false"
        )
</template>

<script>
    // import Wrapper from 'components/vue/single-slider/wrapper'
    import Control from 'components/vue/review-slider/control'
    import Lightbox from 'vue-image-lightbox'
    // import img1 from 'assets/img/s1.jpg'
    // import img2 from 'assets/img/s2.jpg'
    // import img3 from 'assets/img/s3.jpg'

    // const singlePageGallery = [
    //   {
    //     src: img1
    //   },
    //   {
    //     src: img2
    //   },
    //   {
    //     src: img3
    //   }
    // ];

  export default {
    name: "app",
    components: {
      Control, Lightbox
    },
    data() {
      return {
        curImgId: '',
        curIMG: {},
        gallery: singleProductParam.singlePageGallery
        // gallery: singlePageGallery
      }
    },
    methods: {
      nextIMG() {
        this.curImgId = (this.curImgId + 1) > (this.gallery.length - 1) ? 0 : this.curImgId + 1;
        this.curIMG = {
          id: this.curImgId,
          img: this.gallery[this.curImgId].src
        };
      },
      prevIMG() {
        this.curImgId = (this.curImgId - 1) < 0 ? (this.gallery.length - 1) : this.curImgId - 1;
        this.curIMG = {
          id: this.curImgId,
          img: this.gallery[this.curImgId].src
        };
      },
      openGallery(index) {
        this.$refs.lightbox.showImage(index)
      }
    },
    mounted() {
      this.curImgId = 0;
      this.curIMG = {
        id: this.curImgId,
        img: this.gallery[this.curImgId].src
      };
    }
  }
</script>

<style lang="sass">
    .slider
        @media (max-width: 768px)
            height: auto
        position: relative
        height: 485px
        & .control
            position: absolute
            z-index: 2
            width: 100%
            top: 50%
            left: 0
            transform: translateY(-50%)
            & button
                width: 42px
                height: 42px
                border: none
                background:
                    image: url(../../../assets/img/ico-controll-arrow.png)
                    size: 100% 100%
                    repeat: no-repeat
            & .next
                @media(max-width: 992px)
                    margin-right: 0
                float: right
                margin-right: 35px
            & .prev
                @media(max-width: 992px)
                    margin-left: 0
                float: left
                margin-left: 35px
                transform: scale(-1, 1)
        &-wrapper
            @media (max-width: 768px)
                height: auto
            position: relative
            z-index: 1
            height: 485px
            margin:
                left: -15px
                right: -15px
            overflow: hidden
            & img
                width: 100%
                height: 100%
    .wrapper
        &-enter-active, &-leave-to
            transition: .5s ease
        &-enter, &-leave-to
            opacity: 0
            transform: translateY(30px)
    .vue-lb-container
        z-index: 100
</style>