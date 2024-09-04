import xml.etree.ElementTree as ET
from datetime import datetime
from typing import List, Tuple
from szurubooru import config, db, model
from szurubooru.func import posts, tags, pools, users

def generate_sitemap() -> str:
    """
    Generate a Google-compatible sitemap XML string containing all pages.
    
    Returns:
        str: The generated sitemap XML as a string.
    """
    root = ET.Element("urlset", xmlns="http://www.sitemaps.org/schemas/sitemap/0.9")

    # Add static pages
    static_pages = [
        "",  # Home page
        "login",
        "register",
        "help",
        "tags",
        "pools",
        "posts",
        "users",
    ]

    for page in static_pages:
        url = ET.SubElement(root, "url")
        loc = ET.SubElement(url, "loc")
        loc.text = f"{config.config['base_url']}/{page}"
        lastmod = ET.SubElement(url, "lastmod")
        lastmod.text = datetime.utcnow().strftime("%Y-%m-%d")

    # Add dynamic pages
    add_posts_to_sitemap(root)
    add_tags_to_sitemap(root)
    add_pools_to_sitemap(root)
    add_users_to_sitemap(root)

    return ET.tostring(root, encoding="unicode", method="xml")

def add_posts_to_sitemap(root: ET.Element) -> None:
    """
    Add all posts to the sitemap.
    
    Args:
        root (ET.Element): The root element of the sitemap XML.
    """
    for post in db.session.query(model.Post).order_by(model.Post.post_id):
        url = ET.SubElement(root, "url")
        loc = ET.SubElement(url, "loc")
        loc.text = f"{config.config['base_url']}/post/{post.post_id}"
        lastmod = ET.SubElement(url, "lastmod")
        lastmod.text = post.last_edit_time.strftime("%Y-%m-%d") if post.last_edit_time else post.creation_time.strftime("%Y-%m-%d")

def add_tags_to_sitemap(root: ET.Element) -> None:
    """
    Add all tags to the sitemap.
    
    Args:
        root (ET.Element): The root element of the sitemap XML.
    """
    for tag in db.session.query(model.Tag).order_by(model.Tag.tag_id):
        url = ET.SubElement(root, "url")
        loc = ET.SubElement(url, "loc")
        loc.text = f"{config.config['base_url']}/tags/{tag.first_name}"
        lastmod = ET.SubElement(url, "lastmod")
        lastmod.text = tag.last_edit_time.strftime("%Y-%m-%d") if tag.last_edit_time else tag.creation_time.strftime("%Y-%m-%d")

def add_pools_to_sitemap(root: ET.Element) -> None:
    """
    Add all pools to the sitemap.
    
    Args:
        root (ET.Element): The root element of the sitemap XML.
    """
    for pool in db.session.query(model.Pool).order_by(model.Pool.pool_id):
        url = ET.SubElement(root, "url")
        loc = ET.SubElement(url, "loc")
        loc.text = f"{config.config['base_url']}/pool/{pool.pool_id}"
        lastmod = ET.SubElement(url, "lastmod")
        lastmod.text = pool.last_edit_time.strftime("%Y-%m-%d") if pool.last_edit_time else pool.creation_time.strftime("%Y-%m-%d")

def add_users_to_sitemap(root: ET.Element) -> None:
    """
    Add all users to the sitemap.
    
    Args:
        root (ET.Element): The root element of the sitemap XML.
    """
    for user in db.session.query(model.User).order_by(model.User.user_id):
        url = ET.SubElement(root, "url")
        loc = ET.SubElement(url, "loc")
        loc.text = f"{config.config['base_url']}/user/{user.name}"
        lastmod = ET.SubElement(url, "lastmod")
        lastmod.text = user.last_login_time.strftime("%Y-%m-%d") if user.last_login_time else user.creation_time.strftime("%Y-%m-%d")

def update_sitemap() -> None:
    """
    Generate and save the sitemap to a file.
    """
    sitemap_content = generate_sitemap()
    with open(config.config['data_dir'] + '/sitemap.xml', 'w', encoding='utf-8') as f:
        f.write(sitemap_content)
