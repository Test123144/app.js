import express from "express";
import request from "request";
import qs from "qs";

const app = express();
const port = 3000;

// معلومات الحساب (مضمنة مباشرة في الكود)
const email = "123456789xdf4@gmail.com"; // استبدل بالإيميل الخاص بك
const password = "a12345"; // استبدل بالباسورد الخاص بك

// الرسالة الثابتة للتعليق
const commentText = "Test";

// إعدادات الإرسال
const sendCommentBool = true; // إذا كنت تريد إرسال التعليقات، قم بتعيينها إلى true
const count = 30; // عدد التعليقات في الدقيقة (لا تزيد عن 60)

// رابط API لإرسال التعليق
const commentUrl = "https://app.sanime.net/function/h10.php?page=addcmd";

// رابط API لتسجيل الدخول (إذا كان مطلوبًا)
const loginUrl = "https://app.sanime.net/function/h10.php?page=login";

// معرف الانمي (One Piece)
const animeId = "532"; // استبدل بمعرف الانمي الصحيح

// حساب الفاصل الزمني بين كل تعليق (بالثواني)
const minutes = 1 / count;
const theInterval = minutes * 60 * 1000;

// دالة تسجيل الدخول
function login(callback) {
    const loginData = {
        email: email,
        password: password
    };

    request({
        url: loginUrl,
        method: "POST",
        body: qs.stringify(loginData),
        headers: {
            "Content-Type": "application/x-www-form-urlencoded",
            "User-Agent": "IBRAHIMSEVEN"
        }
    }, function (error, response, body) {
        if (response.statusCode === 200) {
            console.log("تم تسجيل الدخول بنجاح!");
            callback(true);
        } else {
            console.log("فشل تسجيل الدخول:", response.statusCode);
            callback(false);
        }
    });
}

// دالة إرسال التعليق
function sendComment() {
    const commentData = {
        anime_id: animeId,
        comment: commentText,
        user_id: "12345", // إضافة معرف المستخدم (إذا كان مطلوبًا)
        session_token: "abc123" // إضافة رمز الجلسة (إذا كان مطلوبًا)
    };

    request({
        url: commentUrl,
        method: "POST",
        body: qs.stringify(commentData),
        headers: {
            "Content-Type": "application/x-www-form-urlencoded",
            "User-Agent": "IBRAHIMSEVEN"
        }
    }, function (error, response, body) {
        if (response.statusCode === 200) {
            console.log("تم إرسال التعليق بنجاح!");
        } else {
            console.log("فشل إرسال التعليق:", response.statusCode);
        }
    });
}

// بدء الإرسال
login(function (loggedIn) {
    if (loggedIn && sendCommentBool) {
        setInterval(function () {
            try {
                sendComment();
            } catch (error) {
                console.log(`حدث خطأ: ${error}`);
            }
        }, theInterval);
    }
});

// بدء السيرفر
app.listen(port, () => {
    console.log(`السيرفر يعمل على المنفذ ${port}`);
});
