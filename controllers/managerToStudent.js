const db = require('../model/database');
//const token = require("token.js");
const e = require('express');

exports.search = (req, res) => {
    const {academicYear, department, email, name, phone, sex, studentID} = req.body;
    
    sql = 'SELECT * FROM student WHERE ';
    if(studentID!=''){
        sql+='S_ID='+'"'+studentID+'"'+' AND ';
    }
    if(department!='選擇系所'){
        sql+='S_Department='+'"'+department+'"'+' AND ';
    }
    if(name!=''){
        sql+='S_Name='+'"'+name+'"'+' AND ';
    }
    if(academicYear!='選擇學年度'){
        sql+='S_Academic_Year= '+'"'+academicYear+'"'+' AND ';
    }
    if(email!=''){
        sql+='S_Email Like '+'"%'+email+'%"'+' AND ';
    }
    if(phone!=''){
        sql+='S_Phone Like '+'"%'+phone+'%"'+' AND ';
    }
    if(sex!='選擇性別'){
        sql+='S_Sex= '+'"'+sex+'"'+' AND ';
    }
    if(sql == 'SELECT * FROM student WHERE '){
        sql = 'SELECT * FROM student'
    }else{
        sql = sql.substring(0, sql.length-4);
    }
    db.query(sql, (error, results) => {
        if (error) {
            res.render('error', {
                err_message: "資料庫錯誤"
            })
        }
        else {
            return res.render('manager_to_student', {
                message:results,
                searchSQL:sql
            });
        }
    })
}
exports.modify = (req, res) => {
    const {email, phone, studentID, searchSQL} = req.body;

    const sql = `UPDATE student SET S_Phone = '${phone}', S_Email = '${email}' WHERE S_ID = '${studentID}'`;

    db.query(sql, (error, results) => {
        if (error) {
            console.log(error)
            res.render('error')
        }
        else {
            db.query(searchSQL, (error, results) => {
                if (error) {
                    console.log(error)
                    res.render('error')
                }else {
                    return res.render('manager_to_student', {
                        message:results,
                        searchSQL:searchSQL
                    });
                }
            })
        }
    })
}

