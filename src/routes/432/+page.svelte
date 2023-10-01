<script>
	import { onMount } from 'svelte';

	onMount(() => {
		const audioCtx = new window.AudioContext();

		// create Oscillator node
		const oscillator = audioCtx.createOscillator();

		oscillator.type = 'sine';
		oscillator.frequency.setValueAtTime(432, audioCtx.currentTime); // value in hertz
		oscillator.start();
	});
</script>
