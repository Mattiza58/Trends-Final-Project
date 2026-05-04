import LargeText from "../components/largetext";

const Perfomances = (() =>{
    return <div>
        <LargeText link = "Performances" />
        <iframe data-testid="embed-iframe" style= {{borderRadius:"12px"}} src="https://open.spotify.com/embed/track/4cgjA7B4fJBHyB9Ya2bu0t?utm_source=generator" width="100%" height="352" frameBorder="0" allowfullscreen="" allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture" loading="lazy"></iframe>
    </div>
})

export default Perfomances;