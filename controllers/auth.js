const db = require('../model/database');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs')

// res.render: 用於呈現View，並將呈現的HTML字符串發送給Client端

exports.register = (req, res) => {
    //* 抓取所有從表單發送之數據，將它們顯示至我們的終端
    // console.log(req.body);

    //* 將表單數據指派給變數
    const { username, password, confirm_password } = req.body;

    //* 執行 SQL Select
    db.query('SELECT username FROM account WHERE username = ?', [username], async (error, results) => {
        if (error) {
            console.log(error);
        }

        //* 若查詢的到表示資料庫內已有此帳號
        if (results.length > 0) {
            return res.render('register', {
                message: '此用戶名已被使用!'
            });
        }
        else if (password !== confirm_password) {
            return res.render('register', {
                message: '[密碼]需與[確認密碼]相符!'
            });
        }

        //* 明碼雜湊成暗碼
        let hashed_password = await bcrypt.hash(password, 10); // 雜湊10次，需等待雜湊時間，因此需設置async

        //* 將帳號、雜湊密碼存入資料庫中
        db.query('INSERT INTO account SET ?', { username: username, password: hashed_password }, (error, results) => {
            if (error) {
                console.log(error);
            }
            else {
                return res.render('register', {
                    message: '註冊成功!'
                });
            }
        });
    });
}

exports.login = async (req, res) => {
    //* 抓取所有從表單發送之數據，將它們顯示至我們的終端
    // console.log(req.body);

    //* 將表單數據指派給變數
    const { username, password } = req.body;

    //* 執行 SQL Select
    db.query('SELECT * FROM account WHERE username = ?', [username], async (error, results) => {
        if (error) {
            console.log(error);
        }

        //* 查詢不到帳號
        if (!results[0]) {
            return res.status(401).render('login', {
                message: '此用戶不存在!'
            });
        }

        //* 將前段輸入之密碼和資料庫中的密碼進行比對
        //* 若比對正確
        if (await bcrypt.compare(password, results[0].Password)) { // 需大寫
            //* 產生Token並存放在Cookie中
            const payload = {
                id: results[0].ID,
                username: results[0].UserName,
                permission: results[0].Permission
            };
            const token = jwt.sign(payload, process.env.JWT_SECRET, {
                expiresIn: process.env.JWT_EXPIRES // Token到期時長
            });
            const cookieOptions = {
                expiresIn: new Date( // Cookie到期時間
                    Date.now() + process.env.JWT_COOKIE_EXPIRES * 60 * 60 * 1000 // 以ms為單位
                ),
                httpOnly: true // 此cookie只能從server端訪問
            }

            //* 使API主動回傳Cookie
            res.cookie('JWT_token', token, cookieOptions);

            //* HTTP request已完成(200 OK)，導向主頁
            res.status(200).redirect("/");
        }
        else {
            return res.status(401).render('login', {
                message: '密碼錯誤!'
            });
        }
    });
}

exports.logout = (req, res) => {
    res.clearCookie('JWT_token');
    res.redirect("/");
}