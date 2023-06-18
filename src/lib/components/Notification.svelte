<script lang="ts">
	import { ToastNotification } from "carbon-components-svelte";
	import type { ToastNotificationProps } from "carbon-components-svelte/types/Notification/ToastNotification.svelte";
    export let level: number, props: ToastNotificationProps

</script>

<div class="all" style="z-index: {level};">
    <ToastNotification on:close {...props} />
</div>

<style lang="sass">
    .all
        position: absolute
        top: 4px
        right: 4px
</style>