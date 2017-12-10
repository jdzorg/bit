<template lang="pug">
    transition(
      name="popup-trans"
    )
        .popup(:style="setPopUpHeight")
            .popup-container.review-send
                .container
                    .row
                        .close(@click="$emit('close')")
                            span
                            span
                        slot
</template>

<script>
  export default {
    name: 'Popup',
    computed: {
      setPopUpHeight() {
        return `height: ${document.documentElement.clientHeight}px`;
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