const interval = (60 / count) * 1000; // الفاصل الزمني بين كل تعليق

app.get('/', (req, res) => {
  res.send('Welcome to my server!');
});

function sendComment() {
    let body = {
        email: email,
        password: password,
        comment: btoa(unescape(encodeURIComponent(message))),
        animeId: 532 // معرف الأنمي (One Piece)
    };

    request({
        url: "https://app.sanime.net/function/h10.php?page=addcmd",
        method: "POST",
        body: qs.stringify(body),
        headers: {
            "Content-Type": "application/x-www-form-urlencoded",
            'User-Agent': 'Mozilla/5.0 (iPhone; CPU iPhone OS 15_8_3 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/15E148',
            'Referer': 'https://ios.sanime.net/',
            'Origin': 'https://ios.sanime.net',
            'Accept-Language': 'ar',
            'Accept-Encoding': 'gzip, deflate, br',
        },
    }, function (error, response, body) {
        if (error) {
            console.log("Error sending comment:", error);
            return;
        }

        if (response && response.statusCode === 200) {
            console.log("Comment sent successfully. Response:", body);
            // تحقق من محتوى الاستجابة لمعرفة إذا كان التعليق تم قبوله
            try {
                const jsonResponse = JSON.parse(body);
                if (jsonResponse.success) {
                    console.log("Comment was accepted by the server.");
                } else {
                    console.log("Comment was not accepted. Server response:", jsonResponse);
                }
            } catch (e) {
                console.log("Failed to parse server response:", e);
            }
        } else {
            console.log("Failed to send comment. Status code:", response.statusCode);
        }
    });
}

setInterval(function() {
    try {
        sendComment();
    } catch (error) {
        console.log(`Error: ${error}`);
    }
}, interval);

app.listen(port, () => {
    con
