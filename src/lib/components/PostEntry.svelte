<script lang="ts">
	import type { Post } from "$lib/types";
  import { Modal, Button } from "carbon-components-svelte";

  export let post: Post;
  let open = false;

</script>

<div class="post">
  <p>{post.name}</p>
  <slot name="after" />
</div>

<!-- <style>
  .post {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 1rem;
    border-radius: 0.25rem;
    background-color: #f3f3f3;
    margin-bottom: 1rem;
  }
</style> -->
