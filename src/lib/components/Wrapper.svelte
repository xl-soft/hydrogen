<script>
    import { Main, Flex } from "@xl-soft/xl-ui"
    import TitleBar from "$lib/components/titlebar/TitleBar.svelte";
    const { ipcRenderer } = require('electron')
    let theme = 'dark'
    ipcRenderer.send(`theme-${theme}`)
    ipcRenderer.on(`theme-set`, theme => theme = theme)
    export let title
</script>

<Main theme={theme} accent="sky">
    <div class="xlauncher">
        <Flex width="100%" height="100%" style="position: relative;" direction="column">
            <slot/>
        </Flex>
    </div>
    <TitleBar title={title}/>
</Main>

<style>
    .xlauncher {
        width: 100%;
        height: 100%;
        padding: 25px;
        padding-top: 55px;
    }
</style>