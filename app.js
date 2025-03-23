import express from "express";
import request from "request";
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
            'User-Agent': 'IBRAHIMSEVEN',
        },
    }, function (error, response, body) {
        if (response && response.statusCode == 200) {
            console.log("Comment sent successfully");
        } else {
            console.log("Error sending comment:", error);
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
    console.log(`Server is running on port ${port}`);
});
