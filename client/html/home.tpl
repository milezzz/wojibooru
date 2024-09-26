<div class='content-wrapper transparent' id='home'>
    <div class='messages'></div>
    <header>
        <h2><%- ctx.name %> Project™</h2>
        <p>Largest image board of HD Wojaks on teh interwebz. See <a href="<%- ctx.formatClientLink('posts') %>" class="button">all images&nbsp;<i class="fa-solid fa-images"></i></a>&nbsp;&nbsp;<span class='sep'>or</span></p>
    </header>
    <% if (ctx.canListPosts) { %>
        <form class='horizontal'>
            <%= ctx.makeTextInput({name: 'search-text', placeholder: 'enter some tags'}) %>
            <input type='submit' value='Search'/>
            <span class='sep'>or</span>
                See <a href='/tags/query=sort%3Ausages' alt='All Tags'>all tags&nbsp;<i class="fa-solid fa-tags"></i></a>
        <br />
        <div class='hot-tags'>
        <span class='sep'>or</span>
            <i class="fa-solid fa-fire orange"></i>&nbsp;Hot Tags: <a href='/posts/query=head'>head</a>, <a href='/posts/query=hair'>hair</a>, <a href='/posts/query=clothes'>clothes</a>, <a href='/posts/query=accessory'>accessory</a>, <a href='/posts/query=fullbody'>fullbody</a>, <a href='/posts/query=trad'>trad</a>, <a href='/posts/query=twink'>twink</a>, <a href='/posts/query=soyjak'>soyjak</a>, <a href='/posts/query=doomer'>doomer</a>, <a href='/posts/query=plapjak'>plapjak</a>, <a href='/posts/query=crypto'>crypto</a>
        </div>
        </form>
        <br />
    <% } %>
    
    <div class='post-info-container'></div>
    <footer class='footer-container'></footer>
</div>
