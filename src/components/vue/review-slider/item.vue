<template lang="pug">
    .reviews-container.trans-slider-item(:data-index="revId")
        .reviews-content
            span.reviews-author {{ review.author_name | removeTags }}
            p.reviews-review {{ review.content.rendered | removeTags }}
</template>

<script>
    export default {
      name: 'Review',
      props: {
        review: {
            type: Object,
            required: true
        },
        revId: {
          type: Number,
          required: true
        }
      },
      filters: {
        removeTags(string) {
            return string.replace(/<[^>]+>/g,'')
        }
      },
      mounted() {
        this.$nextTick(() => {
            this.$emit('setCurId');
        })
      }
    }
</script>