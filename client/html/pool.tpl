<div class='content-wrapper' id='pool'>
    <h1><%- ctx.pool.first_name %></h1>
    <nav class='buttons'><!--
        --><ul><!--
            --><li data-name='summary'><a href='<%- ctx.formatClientLink('pool', ctx.pool.id) %>'>Summary</a></li><!--
            --><% if (ctx.canEditAnything) { %><!--
                --><li data-name='edit'><a href='<%- ctx.formatClientLink('pool', ctx.pool.id, 'edit') %>'>Edit</a></li><!--
            --><% } %><!--
            --><% if (ctx.canMerge) { %><!--
                --><li data-name='merge'><a href='<%- ctx.formatClientLink('pool', ctx.pool.id, 'merge') %>'>Merge with&hellip;</a></li><!--
            --><% } %><!--
            --><% if (ctx.canDelete) { %><!--
                --><li data-name='delete'><a href='<%- ctx.formatClientLink('pool', ctx.pool.id, 'delete') %>'>Delete</a></li><!--
            --><% } %><!--
        --></ul><!--
    --></nav>
    <div class='pool-content-holder'></div>
</div>
