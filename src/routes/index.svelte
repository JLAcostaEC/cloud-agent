<script lang="ts">
    import Welcome from "../lib/components/welcome/welcome.svelte";
    import Parallax from "$lib/components/parallax-content.svelte";
    import LineChart from "$lib/components/line-chart.svelte";
    import Astros from "$lib/components/astros/astros.svelte";
import Footer from "../lib/components/footer.svelte";

    let marginTop;
    $: marginTop = 128;
</script>
<Welcome bind:height={marginTop}/>
<Parallax bind:marginTop> 
    <LineChart dayIndex={0}/>
    <Astros dayIndex={0}/>
    <Footer/>
</Parallax>