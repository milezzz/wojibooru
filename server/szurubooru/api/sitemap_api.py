from typing import Dict, Optional
from szurubooru import rest
from szurubooru.func import auth, sitemap

def get_sitemap(
    ctx: rest.Context, _params: Optional[Dict[str, str]] = None
) -> rest.Response:
    """
    Serve the sitemap.xml file.
    """
    auth.verify_privilege(ctx.user, 'posts:list')
    return rest.Response(
        sitemap.generate_sitemap(),
        headers={'Content-Type': 'application/xml
