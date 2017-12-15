<template lang="pug">
    .col-lg-6.slider
        Control(
          @next="nextIMG",
          @prev="prevIMG"
          v-show="gallery.length > 2"
        )
        .slider-wrapper
            transition(name="wrapper")
                img(:src="curIMG")
</template>

<script>
    // import Wrapper from 'components/vue/single-slider/wrapper'
    import Control from 'components/vue/review-slider/control'
    import img1 from 'assets/img/s1.jpg'
    import img2 from 'assets/img/s2.jpg'
    import img3 from 'assets/img/s3.jpg'

    const singlePageGallery = [
      img1,
      img2,
      img3
    ];

  export default {
    name: "app",
    components: {
      Control
    },
    data() {
      return {
        curImgId: '',
        curIMG: '',
        // gallery: singleProductParam.singlePageGallery
        gallery: singlePageGallery
      }
    },
    methods: {
      nextIMG() {
        this.curImgId = (this.curImgId + 1) > (this.gallery.length - 1) ? 0 : this.curImgId + 1;
        this.curIMG = this.gallery[this.curImgId];
      },
      prevIMG() {
        this.curImgId = (this.curImgId - 1) < 0 ? (this.gallery.length - 1) : this.curImgId - 1;
        this.curIMG = this.gallery[this.curImgId]
      }
    },
    mounted() {
      this.curIMG = this.gallery[0];
      this.curImgId = 0;
    }
  }
</script>

<style lang="sass">
    .slider
        position: relative
        height: 473px
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
                float: right
                margin-right: 35px
            & .prev
                float: left
                margin-left: 35px
                transform: scale(-1, 1)
        &-wrapper
            position: relative
            z-index: 1
            height: 473px
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
</style>