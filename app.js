import express from "express";
import axios from "axios";
import qs from "qs";

const app = express();
const port = 3000;
const message = "Test"; // الرسالة التي تريد إرسالها
const email = "123456789xdf4@gmail.com"; // البريد الإلكتروني
const password = "a12345"; // كلمة المرور
const count = 30; // عدد التعليقات في الدقيقة
const interval = (60 / count) * 1000; // الفاصل الزمني بين كل تعليق

app.get('/', (req, res) => {
  res.send('Welcome to my server!');
});

async function sendComment() {
    let body = {
        email: email,
        password: password,
        comment: btoa(unescape(encodeURIComponent(message))),
        animeId: 532 // معرف الأنمي (One Piece)
    };

    try {
        const response = await axios.post(
            "https://app.sanime.net/function/h10.php?page=addcmd",
            qs.stringify(body),
            {
                headers: {
                    "Content-Type": "application/x-www-form-urlencoded",
                    'User-Agent': 'Mozilla/5.0 (iPhone; CPU iPhone OS 15_8_3 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/15E148',
                    'Referer': 'https://ios.sanime.net/',
                    'Origin': 'https://ios.sanime.net',
                    'Accept-Language': 'ar',
                    'Accept-Encoding': 'gzip, deflate, br',
                },
            }
        );

        if (response.status === 200) {
            console.log("Comment sent successfully. Response:", response.data);
            if (response.data.success) {
                console.log("Comment was accepted by the server.");
            } else {
                console.log("Comment was not accepted. Server response:", response.data);
            }
        }
    } catch (error) {
        console.log("Error sending comment:", error.message);
    }
}

setInterval(sendComment, interval);

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
