const express = require('express');
const axios = require('axios');

const app = express();
const port = 3000;

app.get('/ytdl', async (req, res) => {
    const url = req.query.url;

    if (!url) {
        return res.status(400).json({ error: 'URL parameter is required [ parameter /ytdl?url=yt here' });
    }

    const apiEndpoint = `https://www.acethinker.com/downloader/api/video_info.php?url=${encodeURIComponent(url)}&israpid=1&mp3=1`;

    try {
        const response = await axios.get(apiEndpoint, {
            headers: {
                'User-Agent': 'Mozilla/5.0',
                'Accept': 'application/json',
                'Accept-Language': 'en-US,en;q=0.9',
                'Connection': 'keep-alive',
                'Access-Control-Allow-Origin': '*',
                'alt-svc': 'h3=":443"; ma=86400',
                'Cache-Control': 'max-age=31536000, must-revalidate',
                'cf-apo-via': 'origin,nohtml',
                'CF-Cache-Status': 'MISS',
                'CF-Ray': '9069cc4cfb884ee4-MNL',
                'Content-Type': 'application/json',
                'Date': 'Thu, 23 Jan 2025 18:20:30 GMT',
                'Expires': 'Thu, 19 Nov 1981 08:52:00 GMT',
                'Last-Modified': 'Thu, 23 Jan 2025 18:20:30 GMT',
                'NEL': '{"success_fraction":0,"report_to":"cf-nel","max_age":604800}',
                'Pragma': 'no-cache',
                'Report-To': '{"endpoints":{"url":"https://a.nel.cloudflare.com/report/v4?s=HO4iH61%2BzLt4oLR8oe1kRZ89%2FXKYCZWWpzf5z1vesmQGhd%2B33Y6JdFPDdTyDn1AmVhFvr7U7osbw298p%2FIqTwln2jQoqQQFClaC6q3ZvNITy6rRaeVaQ8SY6grc7xhb9CqqjeA%3D%3D"},"group":"cf-nel","max_age":604800}',
                'Server': 'cloudflare',
                'Strict-Transport-Security': 'max-age=15552000; includeSubDomains; preload',
                'Transfer-Encoding': 'chunked',
                'Vary': 'Accept-Encoding',
                'X-Android-Received-Millis': '1737656429673',
                'X-Android-Response-Source': 'NETWORK 200',
                'X-Android-Selected-Protocol': 'http/1.1',
                'X-Android-Sent-Millis': '1737656428892',
                'X-Content-Type-Options': 'nosniff',
                'x-powered-by': 'PHP/8.1.19',
                'x-rocket-nginx-file': '/mnt/www/www.acethinker.com/wp-content/cache/wp-rocket/www.acethinker.com//downloader/api/video_info.php//index-https.html',
                'x-rocket-nginx-reason': 'File not cached',
                'x-rocket-nginx-serving-static': 'MISS'
            }
        });

        const data = response.data;

        if (data && data.videoMeta && data.links) {
            const title = data.videoMeta.title;
            const downloadUrl = data.links[0][0].url;

            res.json({
                url: downloadUrl,
                title: title,
                author: "Jonell Hutchin Magallanes"
            });
        } else {
            res.status(500).json({ error });
        }
    } catch (error) {
        console.error("Error occurred:", error);
        res.status(500).json({ error });
    }
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
