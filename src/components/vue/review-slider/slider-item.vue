<template lang="pug">
    .reviews-container
        .reviews-avatar
            img(:src="review.author_avatar_urls['96']")
        .reviews-content
            span.reviews-author {{ review.author_name }}
            p.reviews-review {{ review.content.rendered }}
</template>

<script>
    export default {
      props: {
        review: {
          type: Object,
          required: true
        }
      }
    }
</script>