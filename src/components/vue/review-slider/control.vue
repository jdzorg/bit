<template lang="pug">
    .control
        button.next(@click="$emit('next')")
        button.prev(@click="$emit('prev')")
</template>

<script>
    export default {
    }
</script>