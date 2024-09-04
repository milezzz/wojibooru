<% if (ctx.canFavorite) { %>
    <% if (ctx.ownFavorite) { %>
        <a href class='remove-favorite'>
            <i class='fa-solid fa-heart red'></i>
    <% } else { %>
        <a href class='add-favorite'>
            <i class='fa-regular fa-heart red'></i>
    <% } %>
<% } else { %>
    <a class='add-favorite inactive'>
        <i class='fa-regular fa-heart red'></i>
<% } %>
    <span class='vim-nav-hint'>add to favorites</span>
</a>
<span class='value'><%- ctx.favoriteCount %></span>
