<template lang="pug">
    .reviews-container.trans-slider-item
        .reviews-content
            span.reviews-author {{ review.author_name.replace(/<[^>]+>/g,'') }}
            p.reviews-review {{ review.content.rendered.replace(/<[^>]+>/g,'') }}
</template>

<script>
    export default {
      props: {
        review: {}
      }
    }
</script>