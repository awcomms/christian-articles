<script lang='ts'>
    export let data: PageData
	import Similar from "$lib/components/Similar.svelte";
	import type { PageData } from "./$types";


</script>

<Similar {...data} />