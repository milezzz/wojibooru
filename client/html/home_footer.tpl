<ul>
    <li>Posts: <%- ctx.postCount %></li>
    <span class='sep'></span>
    <li>DB Size: <%= ctx.makeFileSize(ctx.diskUsage) %></li>
    <span class='sep'></span>
    <li>Built on <a class='version' href='https://github.com/milezzz/szurubooru'>wojibooru</a><%- ctx.isDevelopmentMode ? ' (DEV MODE)' : '' %> from <%= ctx.makeRelativeTime(ctx.buildDate) %></li>
    <span class='sep'></span>
    <% if (ctx.canListSnapshots) { %><li><a href='<%- ctx.formatClientLink('history') %>'>History</a></li>
    <span class='sep'></span>
    <% } %>
</ul>
No ads! WojakDB runs 100% on user <a href='https://wojakdb.com/help/about/index#donate'>donations</a><br/>
<a href='https://creativecommons.org/licenses/by-nc/4.0/deed.en' target='_blank'><img src='/data/img/by-nc.svg' alt='CC BY-NC' title='CC BY-NC' class='cc_img'/></a>