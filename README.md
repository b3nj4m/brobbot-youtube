# brobbot-youtube

A brobbot plugin for video searches.

```
brobbot youtube [me] <query>
```

Searches Google for videos matching `query`, and returns a random result.

## Configuration

### Referer

```bash
BROBBOT_YOUTUBE_REFERER=url
```

The referer URL to pass to the Google API (see https://developers.google.com/video-search/v1/jsondevguide).
