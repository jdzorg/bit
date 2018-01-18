<template lang="pug">
    transition(
      name="popup-trans"
    )
        .popup(:style="height", :class="bgClass")
            .popup-container.review-send
                .container
                    .row
                        .close(@click="$emit('close')")
                            span
                            span
                        transition(name="thxmsg",
                        mode="out-in")
                            slot
</template>

<script>
  export default {
    name: 'Popup',
    props: {
      height: {
        type: String
      },
      bgClass: {
        type: String,
        default: 'consult'
      }
    }
  }
</script>

<style lang="sass">
    .popup-trans
        &-enter-active, &-leave-active
            transition: .5s ease
        &-enter, &-leave-to
            opacity: 0
</style>