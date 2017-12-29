<template lang="pug">
    .hidden-xs.control
        button.next(@click="$emit('next')")
        button.prev(@click="$emit('prev')")
</template>

<script>
    export default {
      name: 'Control'
    }
</script>