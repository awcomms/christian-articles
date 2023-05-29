<script lang="ts">
	/** Set the feedback text shown after clicking the button */
	export let feedback = 'Copied!';

	/** Set the timeout duration (ms) to display feedback text */
	export let feedbackTimeout = 2000;

	/** Set the title and ARIA label for the copy button */
	export let iconDescription = 'Copy to clipboard';

	export let onclick: () => Promise<void>;
	export let icon: ConstructorOfATypedSvelteComponent;

	import { createEventDispatcher, onMount } from 'svelte';

	const dispatch = createEventDispatcher();

	let animation: 'fade-in' | 'fade-out' | undefined = undefined;
	let timeout: NodeJS.Timeout | undefined = undefined;

	onMount(() => {
		return () => clearTimeout(timeout);
	});
</script>

<button
	type="button"
	aria-live="polite"
	class:bx--copy-btn={true}
	class:bx--copy={true}
	class:bx--copy-btn--animating={animation}
	class:bx--copy-btn--fade-in={animation === 'fade-in'}
	class:bx--copy-btn--fade-out={animation === 'fade-out'}
	aria-label={iconDescription}
	title={iconDescription}
	{...$$restProps}
	on:click
	on:click={async () => {
		if (onclick) {
			await onclick();
			dispatch('ran');
		}
		if (animation === 'fade-in') return;
		animation = 'fade-in';
		timeout = setTimeout(() => {
			animation = 'fade-out';
		}, feedbackTimeout);
	}}
	on:animationend
	on:animationend={({ animationName }) => {
		if (animationName === 'hide-feedback') {
			animation = undefined;
		}
	}}
>
	<svelte:component this={icon} class="bx--snippet__icon" />
	<span aria-hidden="true" class:bx--assistive-text={true} class:bx--copy-btn__feedback={true}>
		{feedback}
	</span>
</button>
