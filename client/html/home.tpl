<div class='content-wrapper transparent' id='home'>
    <div class='messages'></div>
    <header>
        <h2>The <%- ctx.name %> Project</h2>
        <p>Only the finest HD Wojaks</p>
    </header>
    <% if (ctx.canListPosts) { %>
        <form class='horizontal'>
            <%= ctx.makeTextInput({name: 'search-text', placeholder: 'enter some tags'}) %>
            <input type='submit' value='Search'/>
            <span class=sep>or</span>
            <a href='<%- ctx.formatClientLink('posts') %>'>browse all posts</a>
        </form>
    <% } %>
    <div class='post-info-container'></div>
    <footer class='footer-container'></footer>
</div>
