export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET');

  const { id } = req.query;
  if (!id || !/^[a-f0-9-]{36}$/.test(id)) {
    return res.status(400).json({ error: 'Invalid song ID' });
  }

  // Try Suno's internal clip API first
  try {
    const r = await fetch(`https://studio-api.suno.ai/api/clips/?ids=${id}`, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36',
        'Accept': 'application/json',
        'Referer': 'https://suno.com/',
      },
    });
    if (r.ok) {
      const data = await r.json();
      if (data && data.clips && data.clips.length > 0) {
        const clip = data.clips[0];
        return res.json({
          source: 'api',
          id: clip.id,
          title: clip.title,
          image_url: clip.image_url,
          audio_url: clip.audio_url,
          video_url: clip.video_url,
          created_at: clip.created_at,
          tags: clip.metadata?.tags || '',
          prompt: clip.metadata?.prompt || clip.metadata?.gpt_description_prompt || '',
          style: clip.metadata?.type || '',
          duration: clip.metadata?.duration,
          handle: clip.handle,
          display_name: clip.display_name,
          is_public: clip.is_public,
        });
      }
    }
  } catch (e) { /* fall through */ }

  // Fallback: scrape the song page for __NEXT_DATA__
  try {
    const r = await fetch(`https://suno.com/song/${id}`, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36',
        'Accept': 'text/html',
      },
    });
    if (r.ok) {
      const html = await r.text();
      const match = html.match(/<script id="__NEXT_DATA__" type="application\/json">([\s\S]*?)<\/script>/);
      if (match) {
        const nextData = JSON.parse(match[1]);
        const clip = nextData?.props?.pageProps?.clip || nextData?.props?.pageProps?.initialClip;
        if (clip) {
          return res.json({
            source: 'scrape',
            id: clip.id,
            title: clip.title,
            image_url: clip.image_url,
            audio_url: clip.audio_url,
            created_at: clip.created_at,
            tags: clip.metadata?.tags || '',
            prompt: clip.metadata?.prompt || clip.metadata?.gpt_description_prompt || '',
            style: clip.metadata?.type || '',
            duration: clip.metadata?.duration,
            handle: clip.handle,
            display_name: clip.display_name,
            is_public: clip.is_public,
          });
        }
      }

      // Try og: tags as last resort
      const ogTitle = html.match(/<meta property="og:title" content="([^"]+)"/)?.[1];
      const ogImage = html.match(/<meta property="og:image" content="([^"]+)"/)?.[1];
      const ogDesc = html.match(/<meta property="og:description" content="([^"]+)"/)?.[1];
      if (ogTitle) {
        return res.json({
          source: 'og',
          id,
          title: ogTitle,
          image_url: ogImage,
          prompt: ogDesc || '',
          tags: '',
        });
      }
    }
  } catch (e) { /* fall through */ }

  return res.status(404).json({ error: 'Song not found or private' });
}
