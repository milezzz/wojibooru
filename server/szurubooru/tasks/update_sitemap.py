import schedule
import time
from szurubooru.func import sitemap

def update_sitemap_job():
    """
    Periodic job to update the sitemap.
    """
    sitemap.update_sitemap()

def run_sitemap_updater():
    """
    Run the sitemap updater as a background task.
    """
    schedule.every(6).hours.do(update_sitemap_job)

    while True:
        schedule.run_pending()
        time.sleep(1)
