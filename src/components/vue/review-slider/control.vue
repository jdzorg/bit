<template lang="pug">
    .reviews-control
        .control.next(@click="$emit('next')")
        .control.prev(@click="$emit('prev')")
</template>

<script>
    export default {
    }
</script>