<script lang='ts'>
  import { page } from "$app/stores";

  export let href: string | null | undefined = ''
  export let text = ''
  export let menuItem = false

  import { isSideNavOpen } from "./store";
  import { SideNavLink, SideNavMenuItem } from "carbon-components-svelte";

  let component = menuItem ? SideNavMenuItem : SideNavLink

  let _href = href ? href : href === null ? undefined : `/${text.toLowerCase().replace(" ", "-")}`;

  const click = () => {
    $isSideNavOpen = false;
  };
</script>

<svelte:component
  this={component}
  isSelected={`${$page.url.pathname}${$page.url.search}` === _href}
  {...$$restProps}
  on:click
  on:click={click}
  href={_href}
  bind:text
/>
