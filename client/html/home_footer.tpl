<ul>
    <li>Posts: <%- ctx.postCount %></li><span class='sep'>
    </span><li>DB Size: <%= ctx.makeFileSize(ctx.diskUsage) %></li><span class='sep'>
    </span><li>Built on <a class='version' href='https://github.com/milezzz/szurubooru'>wojibooru</a><%- ctx.isDevelopmentMode ? " (DEV MODE)" : "" %> from <%= ctx.makeRelativeTime(ctx.buildDate) %></li><span class='sep'>
    </span><% if (ctx.canListSnapshots) { %><li><a href='<%- ctx.formatClientLink('history') %>'>History</a></li><span class='sep'>
    </span><% } %>
</ul>
