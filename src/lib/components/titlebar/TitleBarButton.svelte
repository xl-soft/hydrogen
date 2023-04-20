<script>
    import { Icon } from "@xl-soft/xl-ui"
    export let icon = "shape_circle", action = "default"
    const { ipcRenderer } = require('electron')
    function ipc(action) {
        ipcRenderer.send(String(action))
    }
</script>

<div 
    class="xlauncher-titlebar-controls-button" 
    on:click={() => ipc(action)} 
    on:keypress={() => ipc(action)} 
    role="button"
    tabindex="0"
    action={action}
>
    <Icon name={icon} size="10px" color="light"/>
</div>

<style>
    .xlauncher-titlebar-controls-button {
        width: 30px;
        height: 30px;
        display: flex;
        justify-content: center;
        align-items: center;
        background-color: var(--theme-bg-color-600);
        cursor: pointer;
    }

    .xlauncher-titlebar-controls-button:hover {
        background-color: var(--theme-bg-color-700);
    }

    .xlauncher-titlebar-controls-button:hover[action="close"] {
        background-color: var(--red-900);
    }
</style>