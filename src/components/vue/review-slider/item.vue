<template lang="pug">
    .reviews-container.trans-slider-item
        .reviews-content
            span.reviews-author {{ review.author_name | removeTags }}
            p.reviews-review {{ review.content.rendered | removeTags }}
</template>

<script>
    export default {
      name: 'Review',
      props: {
        review: {}
      },
      filters: {
        removeTags(string) {
            return string.replace(/<[^>]+>/g,'')
        }
      }
    }
</script>