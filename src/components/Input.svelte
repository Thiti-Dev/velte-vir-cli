<script lang="ts">
    import { onMount } from "svelte";
    import { CMDReader } from "../core/virtual-cmd/cmd-reader";


    import {historyLogs,userName} from "../store/main";

    let input;
    let currentInput: string = ''

    //cycle
    onMount(async() => {
        input.focus()
    })
    //--------
    // FUNCS
    function submitCmds(): void{
        const inputCMD: string = currentInput.trimEnd()
        if(inputCMD){
            CMDReader.executeCommand(inputCMD)
        }            
        currentInput = ''
    }
    const onKeyPress = (e:any) => {
        if(e.charCode === 13) submitCmds()
    }
    //------------------
</script>

<div class="container">

    {#each $historyLogs as log,i}
        {#if log.type === 'echo'}
        <div class="line_container">
            <span class="log_text grow_full">{@html log.text}</span>
        </div>
        {:else}
            <div class="wrapper">
                {@html log.text}
            </div>
        {/if}
    {/each}

    <div class="line_container">
        <div class="prefix">{$userName} -></div> 
        <input bind:this={input} bind:value={currentInput} on:keypress={onKeyPress} class="input"/>
    </div>
</div>

<style>
.container{
    width: 100%;
    height:100%;
    position: absolute;
    bottom: 0%;
    box-sizing: border-box;
    padding: 20px;
    background-color: black;
    overflow-y: auto;
}

.input{
    flex-grow: 1;
    background-color: transparent;
    border: none;
    outline: none;
    box-sizing: border-box;
    margin-left: 10px;
    caret-color: white;
    color: white;
}

.line_container{
    display: flex;
    flex-direction: row;
    justify-content: flex-end;
    height: auto;
}

.grow_full{
    flex-grow: 1;
}

.prefix{
    color: white;
}

.log_text{
    color: white;
    white-space: nowrap;
}

.wrapper > :global(.log_text) {
    color: white;
    white-space: nowrap;
}

.wrapper > :global(.grid-container) {
  display: grid;
  grid-template-columns: auto auto auto;
  padding: 10px;
  color: white;
}
.wrapper > :global(.grid-item) {
  background-color: rgba(255, 255, 255, 0.8);
  border: 1px solid rgba(0, 0, 0, 0.8);
  padding: 20px;
  font-size: 30px;
  text-align: center;

}
</style>