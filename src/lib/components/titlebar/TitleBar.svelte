<script lang="ts">
    import { Flex } from "@xl-soft/xl-ui"
    import { title as t } from "../../stores"
    export let title = "XLauncher Dashboard"
    import TitleBarButton from "./TitleBarButton.svelte";
    t.set(title)
</script>

<svelte:head>
    <title>{$t}</title>
</svelte:head>

<!-- titlebar -->
<Flex width="100%" height="30px" direction="row" align="center" justify="space-between" style="background-color: var(--theme-bg-color-600); position: absolute; top: 0px" gap="0px">
    <!-- dragbar -->
    <Flex width="calc(100% - 90px)" height="100%" direction="row" justify="flex-start" style="padding: 0px 25px; -webkit-app-region: drag; color: var(--neutral-0)">
        {$t}
    </Flex>
    <!-- controls -->
    <Flex width="90px" height="100%" direction="row" justify="flex-end" gap="0px">
        <TitleBarButton icon="navigation_minimize" action="minimize"/>
        <TitleBarButton icon="edit_frame" action="maximize"/>
        <TitleBarButton icon="navigation_close" action="close"/>
    </Flex>
</Flex>